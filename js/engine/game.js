// =====================================================
// SEDAT CITY – CORE GAME ENGINE
// Controls turns, dice, tile actions, buying, rent
// =====================================================

const Game = {
    players: [],
    currentPlayerIndex: 0,
    dice: { d1: 1, d2: 1 },

    init() {
        // Create 4 players
        this.players = [
            new Player(0, "Player 1", "dog"),
            new Player(1, "Player 2", "car"),
            new Player(2, "Player 3", "hat"),
            new Player(3, "Player 4", "ship")
        ];

        this.updateUI();
        this.log("Game started. Player 1 begins.");
    },

 // ---------------------------------------------
// DICE ROLL
// ---------------------------------------------
rollDice() {
    const p = this.currentPlayer();

    if (p.inJail) {
        p.processJailTurn();
        this.endTurn();
        return;
    }

    // Don't generate new dice values - use the ones already set by events.js
    // this.dice.d1 and this.dice.d2 are already set from the animated roll

    const steps = this.dice.d1 + this.dice.d2;

    this.log(`${p.name} rolled ${this.dice.d1} + ${this.dice.d2} = ${steps}`);
    p.move(steps);

    this.updateUI();
},

    // ---------------------------------------------
    // TILE LANDING LOGIC
    // ---------------------------------------------
    landOnTile(player) {
        Renderer.highlightTile(player.position);
        const tile = BOARD.tiles[player.position];

        if (!tile) return;

        this.log(`${player.name} landed on <b>${tile.name}</b>`);

        switch (tile.type) {

            case "property":
                this.handleProperty(player, tile);
                break;

            case "railroad":
                this.handleRailroad(player, tile);
                break;

            case "utility":
                this.handleUtility(player, tile);
                break;

            case "tax":
                this.handleTax(player, tile);
                break;

            case "chance":
                this.handleChance(player);
                break;

            case "chest":
                this.handleChest(player);
                break;

            case "corner":
                if (tile.name.includes("Go To Jail")) {
                    player.goToJail();
                }
                break;
        }
    },

    // ---------------------------------------------
    // PROPERTY LOGIC
    // ---------------------------------------------
    handleProperty(player, tile) {

        const owner = this.findOwner(tile.index);

        if (!owner) {
            this.log(`Property <b>${tile.name}</b> is unowned.`);

            // Auto-buy for now
            if (player.money >= tile.price) {
                player.buyProperty(tile);
            } else {
                this.log(`${player.name} cannot afford this property.`);
            }
            return;
        }

        // Owned by player → nothing
        if (owner === player) {
            this.log(`${player.name} already owns this property.`);
            return;
        }

        // Pay rent
        player.payRent(tile.rent, owner);
    },

    // ---------------------------------------------
    // RAILROAD LOGIC
    // ---------------------------------------------
    handleRailroad(player, tile) {
        const owner = this.findOwner(tile.index);

        if (!owner) {
            if (player.money >= tile.price) {
                player.buyProperty(tile);
            }
            return;
        }

        if (owner === player) return;

        const rentAmount = 25; // simple version
        player.payRent(rentAmount, owner);
    },

    // ---------------------------------------------
    // UTILITY LOGIC
    // ---------------------------------------------
    handleUtility(player, tile) {
        const owner = this.findOwner(tile.index);

        if (!owner) {
            if (player.money >= tile.price) {
                player.buyProperty(tile);
            }
            return;
        }

        if (owner === player) return;

        const diceTotal = this.dice.d1 + this.dice.d2;
        const rentAmount = diceTotal * 4; // simple version

        player.payRent(rentAmount, owner);
    },

    // ---------------------------------------------
    // TAX LOGIC
    // ---------------------------------------------
    handleTax(player, tile) {
        let taxAmount = tile.name.includes("Luxury") ? 100 : 200;

        if (player.money < taxAmount) {
            player.bankrupt(null);
            return;
        }

        player.money -= taxAmount;
        this.log(`${player.name} paid $${taxAmount} in taxes.`);
    },

    // ---------------------------------------------
    // CHANCE (basic random)
    // ---------------------------------------------
    handleChance(player) {
        const chance = Math.floor(Math.random() * 5);

        switch (chance) {
            case 0:
                this.log("Chance: Advance to GO (+$200)");
                player.position = 20;
                player.money += 200;
                break;

            case 1:
                this.log("Chance: Go to Jail!");
                player.goToJail();
                break;

            case 2:
                this.log("Chance: Collect $100");
                player.money += 100;
                break;

            case 3:
                this.log("Chance: Pay $50");
                player.money -= 50;
                break;

            case 4:
                this.log("Chance: Move forward 3 spaces");
                player.move(3);
                break;
        }
    },

    // ---------------------------------------------
    // COMMUNITY CHEST (basic random)
    // ---------------------------------------------
    handleChest(player) {
        const chest = Math.floor(Math.random() * 5);

        switch (chest) {
            case 0:
                this.log("Community Chest: Collect $200!");
                player.money += 200;
                break;

            case 1:
                this.log("Community Chest: Pay $50!");
                player.money -= 50;
                break;

            case 2:
                this.log("Community Chest: Bank error in your favor! +$150");
                player.money += 150;
                break;

            case 3:
                this.log("Community Chest: Go to Jail!");
                player.goToJail();
                break;

            case 4:
                this.log("Community Chest: Advance to Bloomington Ave");
                player.position = this.findTileByName("Bloomington Ave");
                break;
        }
    },

    // ---------------------------------------------
    // FIND OWNER
    // ---------------------------------------------
    findOwner(tileIndex) {
        for (let p of this.players) {
            if (p.properties.includes(tileIndex)) {
                return p;
            }
        }
        return null;
    },

    // ---------------------------------------------
    // TURN SYSTEM
    // ---------------------------------------------
    endTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

        // Skip bankrupt players
        while (this.currentPlayer().isBankrupt) {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }

        this.log(`It's now ${this.currentPlayer().name}'s turn.`);
        this.updateUI();
    },

    currentPlayer() {
        return this.players[this.currentPlayerIndex];
    },

    // ---------------------------------------------
    // UI LOGGING
    // ---------------------------------------------
    log(msg) {
        const logBox = document.getElementById("log");
        logBox.innerHTML += `<div>${msg}</div>`;
        logBox.scrollTop = logBox.scrollHeight;
    },

    // ---------------------------------------------
    // UPDATE UI PANEL
    // ---------------------------------------------
    updateUI() {
    const container = document.getElementById("players-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    const tokenIcons = ["dog", "car", "hat", "ship"];
    
    for (let p of this.players) {
        const isActive = p.id === this.currentPlayerIndex;
        
        const panel = document.createElement("div");
        panel.className = `player-panel ${isActive ? 'active' : ''}`;
        panel.id = `player-panel-${p.id}`;
        
        // Header (clickable)
        const header = document.createElement("div");
        header.className = "player-header";
        header.onclick = () => this.togglePlayerPanel(p.id);
        
        header.innerHTML = `
            <div class="player-info">
                <div class="player-icon" style="background-image: url('assets/tokens/${tokenIcons[p.id]}.png')"></div>
                <div class="player-details">
                    <div class="player-name">${p.name}</div>
                    <div class="player-money">$${p.money}</div>
                </div>
            </div>
            <div class="expand-arrow">▼</div>
        `;
        
        // Properties section (collapsible)
        const propsSection = document.createElement("div");
        propsSection.className = "player-properties";
        
        if (p.properties.length > 0) {
            const grid = document.createElement("div");
            grid.className = "properties-grid";
            
            for (let tileIndex of p.properties) {
                const tile = BOARD.tiles[tileIndex];
                grid.innerHTML += this.createMiniPropertyCard(tile);
            }
            
            propsSection.appendChild(grid);
        } else {
            propsSection.innerHTML = `<p style="color: #aaa; text-align: center;">No properties yet</p>`;
        }
        
        panel.appendChild(header);
        panel.appendChild(propsSection);
        container.appendChild(panel);
    }
},

togglePlayerPanel(playerId) {
    const panel = document.getElementById(`player-panel-${playerId}`);
    panel.classList.toggle("expanded");
},

createMiniPropertyCard(tile) {
    const colorMap = {
        "brown": "#8B4513",
        "lightblue": "#87CEEB",
        "pink": "#FF69B4",
        "orange": "#FFA500",
        "red": "#FF0000",
        "yellow": "#FFD700",
        "green": "#00AA00",
        "blue": "#0000FF"
    };
    
    const color = tile.color ? colorMap[tile.color] : "#666";
    
    return `
        <div class="mini-property-card">
            <div class="mini-property-color" style="background-color: ${color}"></div>
            <div class="mini-property-name">${tile.name}</div>
            <div class="mini-property-price">$${tile.price}</div>
        </div>
    `;
},

};

window.Game = Game;

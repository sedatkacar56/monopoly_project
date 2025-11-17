// =============================================
// SEDAT CITY – PLAYER ENGINE
// Handles movement, money, jail, ownership
// =============================================
class Player {
    constructor(id, name, token) {
        this.id = id;                // 0,1,2,3
        this.name = name;            // Player 1, Player 2...
        this.token = token;          // dog, car, hat, ship
        this.position = 0;           // Start at GO (tile 0)
        this.money = 1500;           // Standard Monopoly start
        this.properties = [];        // Owned tiles
        this.inJail = false;
        this.jailTurns = 0;
        this.isBankrupt = false;
    }

    // Animated movement
    async move(steps) {
        if (this.inJail) return;
        
        let oldPos = this.position;
        
        // Move step by step with animation
        for (let i = 0; i < steps; i++) {
            await this.animateStep();
        }
        
        // Check if passed GO
        if (this.position < oldPos) {
            this.money += 200;
            Game.log(`${this.name} passed GO and received $200`);  // FIXED
        }
        
        // Land on tile
        Game.landOnTile(this);
    }

    // Move forward by 1 tile with animation
    animateStep() {
        return new Promise(resolve => {
            this.position = (this.position + 1) % BOARD.tiles.length;
            
            // Token bounce animation
            const tokenEl = document.getElementById(`token-${this.id}`);  // FIXED
            if (tokenEl) {
                tokenEl.classList.add("token-animated");
            }
            
            setTimeout(() => {
                if (tokenEl) {
                    tokenEl.classList.remove("token-animated");
                }
                resolve();
            }, 200); // animation speed per tile (200ms)
        });
    }
    
    // Send player to jail
    goToJail() {
        this.position = 10;  // Jail is at position 10
        this.inJail = true;
        this.jailTurns = 3;
        Game.log(`${this.name} has been sent to Jail!`);  // FIXED
    }

    // Handle jail turn
    processJailTurn() {
        if (!this.inJail) return;
        this.jailTurns--;
        if (this.jailTurns <= 0) {
            this.inJail = false;
            Game.log(`${this.name} is free from Jail!`);  // FIXED
        }
    }

    // Buy property
    buyProperty(tile) {
        if (this.money < tile.price) {
            Game.log(`${this.name} does not have enough money to buy ${tile.name}.`);  // FIXED
            return false;
        }
        this.money -= tile.price;
        this.properties.push(tile.index);
        Game.log(`${this.name} bought ${tile.name} for $${tile.price}!`);  // FIXED
        return true;
    }

    // Pay rent to another player
    payRent(amount, owner) {
        if (this.money < amount) {
            this.bankrupt(owner);
            return;
        }
        this.money -= amount;
        owner.money += amount;
        Game.log(`${this.name} paid $${amount} rent to ${owner.name}`);  // FIXED
    }

    // Bankruptcy logic
    bankrupt(owner) {
        Game.log(`${this.name} is bankrupt!`);  // FIXED
        this.isBankrupt = true;
        // Transfer properties to owner
        if (owner) {
            owner.properties.push(...this.properties);
        }
        this.properties = [];
    }
}
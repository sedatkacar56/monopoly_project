// ================================================
// SEDAT CITY – ANIMATED RENDERER (Canvas + DOM)
// ================================================
const BOARD_OFFSET_X = 82;
const BOARD_OFFSET_Y = 82;

const Renderer = {
    canvas: null,
    ctx: null,
    boardImage: null,
    tokenImages: {},
    loaded: false,

    async init() {
        console.log("🎮 Initializing Renderer...");
        
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        
        // Load board
        console.log("Loading board image...");
        this.boardImage = await this.loadImage("assets/board.png");
        console.log("✅ Board loaded:", this.boardImage ? "SUCCESS" : "FAILED");
        
        // Load tokens
        console.log("Loading token images...");
        this.tokenImages = {
            0: await this.loadImage("assets/tokens/dog.png"),
            1: await this.loadImage("assets/tokens/car.png"),
            2: await this.loadImage("assets/tokens/hat.png"),
            3: await this.loadImage("assets/tokens/ship.png")
        };
        console.log("✅ Tokens loaded");
        
        // create animated DOM tokens
        this.createDOMTokens();
        console.log("✅ DOM tokens created");
        
        this.loaded = true;
        console.log("✅ Renderer initialized! Starting draw loop...");
        this.draw();
    },

    loadImage(src) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
                console.log(`✅ Loaded: ${src}`);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`❌ Failed to load image: ${src}`);
                resolve(null);
            };
            img.src = src;
        });
    },

    // CREATE DOM TOKEN LAYER
 createDOMTokens() {
    const names = ["dog", "car", "hat", "ship"];
    const container = document.getElementById("game-container");
    
    for (let i = 0; i < 4; i++) {
        let el = document.createElement("div");
        el.id = `token-${i}`;
        el.style.position = "absolute"; // IMPORTANT
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.zIndex = "9999";
        el.style.pointerEvents = "none";
        el.style.backgroundImage = `url("assets/tokens/${names[i]}.png")`;
        el.style.backgroundSize = "contain";
        el.style.backgroundRepeat = "no-repeat";
        el.style.transition = "left 0.3s ease, top 0.3s ease";
        container.appendChild(el);  // ← FIXED
    }
}
,

    // MAIN DRAW LOOP
    draw() {
        if (!this.loaded) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.boardImage, 0, 0, 1100, 1100);
        

console.log("draw(): Game =", window.Game);
console.log("draw(): Game.players =", Game?.players);



        if (window.Game && Game.players) {
            for (let p of Game.players) {
                this.updateDOMTokens(p);
            }
        }
        
        requestAnimationFrame(() => this.draw());
    },

    updateDOMTokens(player) {
     console.log("➡ updateDOMTokens called for player:", player);

    if (!window.Game) {
        console.error("❌ Game object NOT found");
        return;
    }
    if (!Game.players) {
        console.error("❌ Game.players NOT found");
        return;
    }
    if (!BOARD || !BOARD.tiles) {
        console.error("❌ BOARD.tiles NOT found");
        return;
    }

    const tile = BOARD.tiles[player.position];
    const el = document.getElementById(`token-${player.id}`);
        
        if (!tile) {
            console.error(`❌ No tile found for position ${player.position}`);
            return;
        }
        
        if (!el) {
            console.error(`❌ No element found for token-${player.id}`);
            return;
        }
        
        // Get canvas position on screen
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Calculate scale from original 1100x1100 to actual displayed size
        const scale = canvasRect.width / 1100;
        
        // Small offset so players don't overlap
        const offsetX = (player.id % 2) * 15;
        const offsetY = Math.floor(player.id / 2) * 15;
        
        // Calculate position: canvas position + scaled tile position + offset - center token
        const finalLeft = canvasRect.left + (tile.x * scale) - 20 + offsetX;
        const finalTop = canvasRect.top + (tile.y * scale) - 20 + offsetY;
        
        // Only log player 0 to avoid console spam
        if (player.id === 0) {
            console.log(`🎮 Player ${player.id} at position ${player.position}: tile (${tile.x}, ${tile.y}) -> screen (${finalLeft.toFixed(0)}, ${finalTop.toFixed(0)})`);
        }
        
        el.style.left = finalLeft + "px";
        el.style.top = finalTop + "px";
    },

    // TILE HIGHLIGHT (landing glow)
    highlightTile(tileIndex, color = "rgba(200,0,0,0.4)") {
        const tile = BOARD.tiles[tileIndex];
        if (!tile) return;
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(tile.x, tile.y, 45, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.4;
        this.ctx.fill();
        this.ctx.restore();
    }
};
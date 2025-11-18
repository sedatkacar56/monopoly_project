// ================================================
// SEDAT CITY – CODE-DRAWN BOARD RENDERER
// No more blurry images! Everything drawn with code!
// ================================================

const Renderer = {
    canvas: null,
    ctx: null,
    tokenImages: {},
    loaded: false,
    tileSize: 110,  // Size of each tile
    boardSize: 1100,

    async init() {
        console.log("🎮 Initializing Code-Drawn Renderer...");
        
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        
        // Load tokens only (no board image needed!)
        console.log("Loading token images...");
        this.tokenImages = {
            0: await this.loadImage("assets/tokens/dog.png"),
            1: await this.loadImage("assets/tokens/car.png"),
            2: await this.loadImage("assets/tokens/hat.png"),
            3: await this.loadImage("assets/tokens/ship.png")
        };
        console.log("✅ Tokens loaded");
        
        // Create animated DOM tokens
        this.createDOMTokens();
        console.log("✅ DOM tokens created");
        
        this.loaded = true;
        console.log("✅ Renderer initialized! Drawing board with code...");
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
                console.error(`❌ Failed to load: ${src}`);
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
            el.style.position = "absolute";
            el.style.width = "40px";
            el.style.height = "40px";
            el.style.zIndex = "9999";
            el.style.pointerEvents = "none";
            el.style.backgroundImage = `url("assets/tokens/${names[i]}.png")`;
            el.style.backgroundSize = "contain";
            el.style.backgroundRepeat = "no-repeat";
            el.style.transition = "left 0.3s ease, top 0.3s ease";
            container.appendChild(el);
        }
    },

    // MAIN DRAW LOOP
    draw() {
        if (!this.loaded) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw board background
        this.drawBoardBackground();
        
        // Draw center logo
        this.drawCenterLogo();
        
        // Draw all tiles
        this.drawAllTiles();
        
        // Update token positions
        if (window.Game && Game.players) {
            for (let p of Game.players) {
                this.updateDOMTokens(p);
            }
        }
        
        requestAnimationFrame(() => this.draw());
    },

    // DRAW BOARD BACKGROUND
    drawBoardBackground() {
        // Cream background
        this.ctx.fillStyle = "#f7f3ed";
        this.ctx.fillRect(0, 0, this.boardSize, this.boardSize);
        
        // Crimson border
        this.ctx.strokeStyle = "#990000";
        this.ctx.lineWidth = 20;
        this.ctx.strokeRect(10, 10, this.boardSize - 20, this.boardSize - 20);
    },

    // DRAW CENTER LOGO
    drawCenterLogo() {
        const ctx = this.ctx;
        const centerX = this.boardSize / 2;
        const centerY = this.boardSize / 2;
        
        // Save context
        ctx.save();
        
        // Title "SEDAT CITY"
        ctx.fillStyle = "#990000";
        ctx.font = "bold 80px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SEDAT CITY", centerX, centerY - 40);
        
        // Subtitle "INDIANA EDITION"
        ctx.font = "bold 36px Arial";
        ctx.fillStyle = "#8B4513";
        ctx.fillText("INDIANA EDITION", centerX, centerY + 40);
        
        ctx.restore();
    },

    // DRAW ALL TILES
    drawAllTiles() {
        for (let i = 0; i < BOARD.tiles.length; i++) {
            this.drawTile(BOARD.tiles[i]);
        }
    },

    // DRAW SINGLE TILE
    drawTile(tile) {
        const ctx = this.ctx;
        const size = this.tileSize;
        
        ctx.save();
        
        // Determine if tile is on side (needs rotation)
        const side = Math.floor(tile.index / 10);
        const isVertical = (side === 1 || side === 3);
        
        // Move to tile position
        ctx.translate(tile.x, tile.y);
        
        // Rotate for vertical sides
        if (side === 1) ctx.rotate(Math.PI / 2);      // Right side
        if (side === 3) ctx.rotate(-Math.PI / 2);     // Left side
        if (side === 2) ctx.rotate(Math.PI);          // Top side
        
        // Draw tile background
     if (tile.type === "corner") {
    this.drawCornerTile(ctx, tile, size);
} else if (tile.type === "property") {
    this.drawPropertyTile(ctx, tile, size);
} else if (tile.type === "railroad") {
    this.drawRailroadTile(ctx, tile, size);
} else if (tile.type === "utility") {
    this.drawUtilityTile(ctx, tile, size);
} else {
    this.drawSpecialTile(ctx, tile, size);
}
        
        ctx.restore();
    },

    // DRAW CORNER TILES (GO, Jail, Free Parking, Go to Jail)
    drawCornerTile(ctx, tile, size) {
        // Background
        ctx.fillStyle = "#f7f3ed";
        ctx.fillRect(-size/2, -size/2, size, size);
        
        // Border
        ctx.strokeStyle = "#990000";
        ctx.lineWidth = 3;
        ctx.strokeRect(-size/2, -size/2, size, size);
        
        // Text
        ctx.fillStyle = "#990000";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Split text into lines
        const lines = tile.name.split(" ");
        lines.forEach((line, i) => {
            ctx.fillText(line, 0, -10 + (i * 20));
        });
    },

    // DRAW PROPERTY TILES
// DRAW PROPERTY TILES - IMPROVED
drawPropertyTile(ctx, tile, size) {
    // Color bar at top
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
    
    const barColor = tile.color ? colorMap[tile.color] : "#666666";
    
    // Main tile background (cream color)
    ctx.fillStyle = "#f7f3ed";
    ctx.fillRect(-size/2, -size/2, size, size);
    
    // Color bar - BIGGER (30% instead of 25%)
    ctx.fillStyle = barColor;
    ctx.fillRect(-size/2, -size/2, size, size * 0.3);
    
    // Border
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);
    
    // Property name - BIGGER FONT, BETTER SPACING
    ctx.fillStyle = "#000";
    ctx.font = "bold 13px Arial";  // ← Was 11px, now 13px
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    
    // Smart text wrapping
   const words = tile.name.split(" ");

// Draw each word on new line
let startY = -size/2 + size * 0.35;
words.forEach((word, i) => {
    ctx.fillText(word, 0, startY + (i * 16));
});
    
    // Price - BIGGER and at bottom
    if (tile.price) {
        ctx.font = "bold 14px Arial";  // ← Was 12px, now 14px
        ctx.fillStyle = "#000";
        ctx.fillText(`$${tile.price}`, 0, size/2 - 18);
    }
},

// DRAW RAILROAD TILES
drawRailroadTile(ctx, tile, size) {
    // Background
    ctx.fillStyle = "#f7f3ed";
    ctx.fillRect(-size/2, -size/2, size, size);
    
    // Border
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);
    
    // Railroad icon (train emoji or text)
    ctx.fillStyle = "#000";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🚂", 0, -10);
    
    // Name
    ctx.font = "bold 11px Arial";
    const words = tile.name.split(" ");
    words.forEach((word, i) => {
        ctx.fillText(word, 0, 15 + (i * 13));
    });
    
    // Price
    ctx.font = "bold 13px Arial";
    ctx.fillText(`$${tile.price}`, 0, size/2 - 15);
},

// DRAW UTILITY TILES
drawUtilityTile(ctx, tile, size) {
    // Background
    ctx.fillStyle = "#f7f3ed";
    ctx.fillRect(-size/2, -size/2, size, size);
    
    // Border
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);
    
    // Utility icon
    ctx.fillStyle = "#000";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    
    if (tile.name.includes("Water")) {
        ctx.fillText("💧", 0, -10);
    } else {
        ctx.fillText("⚡", 0, -10);
    }
    
    // Name
    ctx.font = "bold 11px Arial";
    const words = tile.name.split(" ");
    words.forEach((word, i) => {
        ctx.fillText(word, 0, 15 + (i * 13));
    });
    
    // Price
    ctx.font = "bold 13px Arial";
    ctx.fillText(`$${tile.price}`, 0, size/2 - 15);
},


    // DRAW SPECIAL TILES (Chance, Chest, Tax)
    drawSpecialTile(ctx, tile, size) {
    // Background
    ctx.fillStyle = "#f7f3ed";
    ctx.fillRect(-size/2, -size/2, size, size);
    
    // Border
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);
    
    // Different styles for each type
    if (tile.type === "chance") {
        // Orange top bar
        ctx.fillStyle = "#FFA500";
        ctx.fillRect(-size/2, -size/2, size, size * 0.3);
        
        // Text
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText("?", 0, 0);
        ctx.font = "bold 11px Arial";
        ctx.fillText("CHANCE", 0, 20);
        
    } else if (tile.type === "chest") {
        // Light blue top bar
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(-size/2, -size/2, size, size * 0.3);
        
        // Text
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText("📦", 0, -5);
        ctx.font = "bold 10px Arial";
        ctx.fillText("Community", 0, 15);
        ctx.fillText("Chest", 0, 28);
        
    } else if (tile.type === "tax") {
        // Tax tile
        ctx.fillStyle = "#000";
        ctx.font = "bold 11px Arial";
        ctx.textAlign = "center";
        
        const words = tile.name.split(" ");
        words.forEach((word, i) => {
            ctx.fillText(word, 0, -10 + (i * 14));
        });
    }
},
    // UPDATE TOKEN POSITIONS
    updateDOMTokens(player) {
        if (!BOARD || !BOARD.tiles) return;
        
        const tile = BOARD.tiles[player.position];
        const el = document.getElementById(`token-${player.id}`);
        
        if (!tile || !el) return;
        
        // Get canvas position on screen
        const canvasRect = this.canvas.getBoundingClientRect();
        const scale = canvasRect.width / 1100;
        
        // Small offset so players don't overlap
        const offsetX = (player.id % 2) * 15;
        const offsetY = Math.floor(player.id / 2) * 15;
        
        // Calculate position
        const finalLeft = canvasRect.left + (tile.x * scale) - 20 + offsetX;
        const finalTop = canvasRect.top + (tile.y * scale) - 20 + offsetY;
        
        el.style.left = finalLeft + "px";
        el.style.top = finalTop + "px";
    },

    // TILE HIGHLIGHT (landing glow)
    highlightTile(tileIndex) {
        const tile = BOARD.tiles[tileIndex];
        if (!tile) return;
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(tile.x, tile.y, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255, 215, 0, 0.5)";
        this.ctx.fill();
        this.ctx.restore();
    }




};
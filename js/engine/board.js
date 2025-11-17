// ================================
// SEDAT CITY – INDIANA EDITION BOARD DATA
// ================================

const BOARD = {
    size: 1100,
    tiles: []
};

// ================================
// TILE TEMPLATE BUILDER
// ================================
function createTile(index, name, type, price, rent, color, x, y) {
    return { index, name, type, price, rent, color, x, y };
}

// ================================
// MONOPOLY BOARD LAYOUT (0-39)
// Starting from GO (bottom-left corner) going CLOCKWISE
// ================================

const tiles = [];

// BOTTOM ROW (0-10) → Going RIGHT
tiles[0]  = createTile(0,  "GO", "corner", 0, 0, null, 100, 1000);
tiles[1]  = createTile(1,  "South Bend Street", "property", 60, 2, "brown", 190, 1000);
tiles[2]  = createTile(2,  "Community Chest", "chest", 0, 0, null, 280, 1000);
tiles[3]  = createTile(3,  "Jeffersonville Row", "property", 60, 4, "brown", 370, 1000);
tiles[4]  = createTile(4,  "Income Tax", "tax", 200, 0, null, 460, 1000);
tiles[5]  = createTile(5,  "South Shore Line", "railroad", 200, 25, null, 550, 1000);
tiles[6]  = createTile(6,  "Columbus Street", "property", 100, 6, "lightblue", 640, 1000);
tiles[7]  = createTile(7,  "Chance", "chance", 0, 0, null, 730, 1000);
tiles[8]  = createTile(8,  "New Albany Street", "property", 100, 6, "lightblue", 820, 1000);
tiles[9]  = createTile(9,  "Evansville Drive", "property", 120, 8, "lightblue", 910, 1000);
tiles[10] = createTile(10, "JAIL / Just Visiting", "corner", 0, 0, null, 1000, 1000);

// RIGHT COLUMN (11-19) → Going UP
tiles[11] = createTile(11, "Martinsville Lane", "property", 140, 10, "pink", 1000, 910);
tiles[12] = createTile(12, "Citizens Water", "utility", 150, 0, null, 1000, 820);
tiles[13] = createTile(13, "Lafayette Road", "property", 140, 10, "pink", 1000, 730);
tiles[14] = createTile(14, "Terre Haute Blvd", "property", 160, 12, "pink", 1000, 640);
tiles[15] = createTile(15, "Union Station", "railroad", 200, 25, null, 1000, 550);
tiles[16] = createTile(16, "Kokomo Avenue", "property", 180, 14, "orange", 1000, 460);
tiles[17] = createTile(17, "Community Chest", "chest", 0, 0, null, 1000, 370);
tiles[18] = createTile(18, "Anderson Avenue", "property", 180, 14, "orange", 1000, 280);
tiles[19] = createTile(19, "Richmond Circle", "property", 200, 16, "orange", 1000, 190);
tiles[20] = createTile(20, "Free Parking", "corner", 0, 0, null, 1000, 100);

// TOP ROW (21-29) → Going LEFT
tiles[21] = createTile(21, "Muncie Parkway", "property", 220, 18, "red", 910, 100);
tiles[22] = createTile(22, "Chance", "chance", 0, 0, null, 820, 100);
tiles[23] = createTile(23, "Mishawaka Road", "property", 220, 18, "red", 730, 100);
tiles[24] = createTile(24, "Elkhart Plaza", "property", 240, 20, "red", 640, 100);
tiles[25] = createTile(25, "Hoosier Rail", "railroad", 200, 25, null, 550, 100);
tiles[26] = createTile(26, "Carmel Heights", "property", 260, 22, "yellow", 460, 100);
tiles[27] = createTile(27, "Fishers Boulevard", "property", 260, 22, "yellow", 370, 100);
tiles[28] = createTile(28, "Duke Energy", "utility", 150, 0, null, 280, 100);
tiles[29] = createTile(29, "Noblesville Square", "property", 280, 24, "yellow", 190, 100);
tiles[30] = createTile(30, "Go To Jail", "corner", 0, 0, null, 100, 100);

// LEFT COLUMN (31-39) → Going DOWN
tiles[31] = createTile(31, "Indianapolis Center", "property", 300, 26, "green", 100, 190);
tiles[32] = createTile(32, "Monument Circle", "property", 300, 26, "green", 100, 280);
tiles[33] = createTile(33, "Community Chest", "chest", 0, 0, null, 100, 370);
tiles[34] = createTile(34, "Bloomington Ave", "property", 320, 28, "green", 100, 460);
tiles[35] = createTile(35, "Monon Route", "railroad", 200, 25, null, 100, 550);
tiles[36] = createTile(36, "Chance", "chance", 0, 0, null, 100, 640);
tiles[37] = createTile(37, "South Bend Street", "property", 350, 35, "blue", 100, 730);
tiles[38] = createTile(38, "Luxury Tax", "tax", 100, 0, null, 100, 820);
tiles[39] = createTile(39, "Indiana Avenue", "property", 400, 50, "blue", 100, 910);

// Assign to BOARD
BOARD.tiles = tiles;
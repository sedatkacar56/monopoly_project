// ============================================
// SEDAT CITY – UI EVENT HANDLERS
// Connects buttons and initializes the game
// ============================================

window.addEventListener("load", () => {

    // Initialize board renderer
    Renderer.init();

    // Initialize game engine
    Game.init();

    // Hook up UI buttons
  document.getElementById("rollDiceBtn").onclick = async () => {

    // 1) Do animated dice roll
    const result = await Dice.roll();

    // 2) Pass results to the game
    Game.dice.d1 = result.d1;
    Game.dice.d2 = result.d2;

    // 3) Let game handle movement
    Game.rollDice();
};


    document.getElementById("endTurnBtn").onclick = () => {
        Game.endTurn();
    };

});

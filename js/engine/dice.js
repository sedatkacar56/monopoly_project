// ============================================
// SEDAT CITY – DICE ROLLING ENGINE
// ============================================

const Dice = {
    // Animated dice roll
    roll() {
        return new Promise((resolve) => {
            const dice1El = document.getElementById("dice1");
            const dice2El = document.getElementById("dice2");
            
            let rolls = 0;
            const maxRolls = 10; // number of animation frames
            
            const interval = setInterval(() => {
                // Random dice values during animation
                const tempD1 = Math.floor(Math.random() * 6) + 1;
                const tempD2 = Math.floor(Math.random() * 6) + 1;
                
                dice1El.textContent = tempD1;
                dice2El.textContent = tempD2;
                
                // Add animation class
                dice1El.classList.add("dice-rolling");
                dice2El.classList.add("dice-rolling");
                
                rolls++;
                
                if (rolls >= maxRolls) {
                    clearInterval(interval);
                    
                    // Final dice values
                    const finalD1 = Math.floor(Math.random() * 6) + 1;
                    const finalD2 = Math.floor(Math.random() * 6) + 1;
                    
                    dice1El.textContent = finalD1;
                    dice2El.textContent = finalD2;
                    
                    // Remove animation class
                    setTimeout(() => {
                        dice1El.classList.remove("dice-rolling");
                        dice2El.classList.remove("dice-rolling");
                    }, 100);
                    
                    resolve({ d1: finalD1, d2: finalD2 });
                }
            }, 100); // 100ms per frame
        });
    }
};
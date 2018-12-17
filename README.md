# Pokemon Node CLI Game

This is an in-progress command line game for NodeJS based on the Pokemon series. 

## How to play
* You must have NodeJS installed.
* Clone down the repo and open the terminal of the directory.
* Run "node --experimental-modules game.mjs" in the terminal to start the game. 

## How it works
* The experimental modules flag allows us to use ES6 module imports.
* The app uses inquirer to prompt the user to answer command line questions that progress the game. 
* The game first asks for the user's name, and then the region they would like to visit in the Pokemon world.
* Based on their destination, the game will generate three random Pokemon in that generation of Pokemon for the user to choose from as their starter Pokemon. The game utilizes a Pokemon API and a request npm package to pull data.
* Once the user has selected their starter, the game displays the Pokemon's battle stats.
* The game will then generate a random enemy for the user to battle based on the region they are in.

## Plans
* This game will be a mini-battle simulator that allows the user to battle against a specific number of enemies, and will keep track of their wins/losses and stat changes.
* The user's Pokemon will be able to level up.
* The user will be able to catch more Pokemon to add to their team.
* After each round of battles, the user will have the option to move to a new region to restart or keep battling with their team.
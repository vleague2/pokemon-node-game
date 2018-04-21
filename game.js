const inquirer = require('inquirer');

const chalk = require('chalk');

function chooseRandom(min, max) {
    return Math.floor((Math.random() * max) + min)
}

function newGame() {
    inquirer   
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            }
        ])
        .then( answers => {
            if (!answers.confirm){
                newGame();
            }

            else {
                chooseRegion(answers.name);
            }
        })
}

function chooseRegion(name) {
    console.log(name + ", welcome to the wide world of Pokemon!")

    inquirer
    .prompt([
        {
            type: "list",
            message: "Please choose your destination.",
            choices: ["Gen I - Kanto (Red & Blue)", "Gen II - Johto (Gold & Silver)", "Gen III - Hoenn (Ruby & Sapphire)", "Gen IV - Sinnoh (Diamond & Pearl)", "Gen V - Unova (Black & White)", "Gen VI - Kalos (X & Y)", "Gen VII - Alola (Sun & Moon)", "Surprise me"],
            name: "dest"
        }
    ])
    .then( answers => {

        switch (answers.dest) {
            case "Gen I - Kanto (Red & Blue)": 
                let dest = "kanto";
                let poke1 = chooseRandom(1, 151);
                let poke2 = chooseRandom(1, 151);
                let poke3 = chooseRandom(1, 151);

                console.log(poke1 + " " + poke2 + " " + poke3);

                break;
        }
    })
    
};



// game flow
newGame();
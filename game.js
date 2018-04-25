const inquirer = require('inquirer');

const chalk = require('chalk');

const request = require('request');

const request_promise_native = require('request-promise-native');

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
    console.log("\n\n" + name + ", welcome to the wide world of Pokemon!" + "\n\n")

    inquirer
    .prompt([
        {
            type: "list",
            message: "Please choose your destination.",
            choices: ["Gen I - Kanto (Red & Blue)", "Gen II - Johto (Gold & Silver)", "Gen III - Hoenn (Ruby & Sapphire)", "Gen IV - Sinnoh (Diamond & Pearl)", "Gen V - Unova (Black & White)", "Gen VI - Kalos (X & Y)", "Gen VII - Alola (Sun & Moon)"],
            name: "dest"
        }
    ])
    .then( answers => {

        let dest = "";
        let poke1 = "";
        let poke2 = "";
        let poke3 = "";

        switch (answers.dest) {
            case "Gen I - Kanto (Red & Blue)": 
                dest = "kanto";
                poke1 = chooseRandom(1, 151);
                poke2 = chooseRandom(1, 151);
                poke3 = chooseRandom(1, 151);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3);

                break;
                
            case "Gen II - Johto (Gold & Silver)":
                dest = "johto";
                poke1 = chooseRandom(1, 251);
                poke2 = chooseRandom(1, 251);
                poke3 = chooseRandom(1, 251);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3);

                break;

            case "Gen III - Hoenn (Ruby & Sapphire)":
                dest = "hoenn";
                poke1 = chooseRandom(1, 386);
                poke2 = chooseRandom(1, 386);
                poke3 = chooseRandom(1, 386);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3);

                break;

            case "Gen IV - Sinnoh (Diamond & Pearl)":
                dest = "sinnoh";
                poke1 = chooseRandom(1, 493);
                poke2 = chooseRandom(1, 493);
                poke3 = chooseRandom(1, 493);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3);

                break;

            case "Gen V - Unova (Black & White)":
                dest = "unova";
                poke1 = chooseRandom(1, 649);
                poke2 = chooseRandom(1, 649);
                poke3 = chooseRandom(1, 649);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3);

                break;

            case "Gen VI - Kalos (X & Y)":
                dest = "kalos";
                poke1 = chooseRandom(1, 721);
                poke2 = chooseRandom(1, 721);
                poke3 = chooseRandom(1, 721);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3);

                break;

            case "Gen VII - Alola (Sun & Moon)":
                dest = "kalos";
                poke1 = chooseRandom(1, 806);
                poke2 = chooseRandom(1, 806);
                poke3 = chooseRandom(1, 806);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3);

                break;
            
                
        }
    })
    
};

function pingAPI(poke1, poke2, poke3) {

    let starters = [];

    let pokeURL1 = "http://pokeapi.co/api/v2/pokemon/" + poke1;

    request_promise_native(pokeURL1).then(function (response) {
        let data = JSON.parse(response);
        let poke = data.name;
        starters.push(poke);

        let pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + poke2;

        request_promise_native(pokeURL2).then(function (response) {
            let data = JSON.parse(response);
            let poke = data.name;
            starters.push(poke);

            let pokeURL3 = "http://pokeapi.co/api/v2/pokemon/" + poke3;

            request_promise_native(pokeURL3).then(function (response) {
                let data = JSON.parse(response);
                let poke = data.name;
                starters.push(poke);

                chooseStarter(starters);
            })
        })
    })   
}

function chooseStarter(starters){
    inquirer
    .prompt([
        {
            type: "list",
            message: "Please choose your starter Pokemon",
            choices: starters,
            name: "Pokemon"
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
            chooseStarter(starters);
        }

        else {
            console.log("\n\nYou have chosen " + answers.Pokemon + "!\n\n");
        }
    })
}



// game flow

newGame();
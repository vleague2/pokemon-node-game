const inquirer = require('inquirer');

const chalk = require('chalk');

const request = require('request');

const request_promise_native = require('request-promise-native');

const Pokemon = require('./pokemon.js');

function chooseRandom(min, max) {
    return Math.floor((Math.random() * max) + min)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
                pingAPI(poke1, poke2, poke3, dest);

                break;
                
            case "Gen II - Johto (Gold & Silver)":
                dest = "johto";
                poke1 = chooseRandom(1, 251);
                poke2 = chooseRandom(1, 251);
                poke3 = chooseRandom(1, 251);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen III - Hoenn (Ruby & Sapphire)":
                dest = "hoenn";
                poke1 = chooseRandom(1, 386);
                poke2 = chooseRandom(1, 386);
                poke3 = chooseRandom(1, 386);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen IV - Sinnoh (Diamond & Pearl)":
                dest = "sinnoh";
                poke1 = chooseRandom(1, 493);
                poke2 = chooseRandom(1, 493);
                poke3 = chooseRandom(1, 493);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen V - Unova (Black & White)":
                dest = "unova";
                poke1 = chooseRandom(1, 649);
                poke2 = chooseRandom(1, 649);
                poke3 = chooseRandom(1, 649);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen VI - Kalos (X & Y)":
                dest = "kalos";
                poke1 = chooseRandom(1, 721);
                poke2 = chooseRandom(1, 721);
                poke3 = chooseRandom(1, 721);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen VII - Alola (Sun & Moon)":
                dest = "kalos";
                poke1 = chooseRandom(1, 806);
                poke2 = chooseRandom(1, 806);
                poke3 = chooseRandom(1, 806);

                console.log("\n\nloading...\n\n")
                pingAPI(poke1, poke2, poke3, dest);

                break;
        }
    })   
};

function pingAPI(poke1, poke2, poke3, dest) {

    let starters = [];

    let pokeURL1 = "http://pokeapi.co/api/v2/pokemon/" + poke1;

    request_promise_native(pokeURL1).then(function (response) {
        let data = JSON.parse(response);

        let speed1 = data.stats[0].base_stat;
        let defense1 = data.stats[3].base_stat;
        let attack1 = data.stats[4].base_stat;
        let hp1 = data.stats[5].base_stat;
        let name1 = capitalizeFirstLetter(data.name);
        let poke1 = new Pokemon(name1, attack1, defense1, hp1, speed1);

        starters.push(poke1);


        let pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + poke2;

        request_promise_native(pokeURL2).then(function (response) {
            let data = JSON.parse(response);

            let speed2 = data.stats[0].base_stat;
            let defense2 = data.stats[3].base_stat;
            let attack2 = data.stats[4].base_stat;
            let hp2 = data.stats[5].base_stat;
            let name2 = capitalizeFirstLetter(data.name);
            let poke2 = new Pokemon(name2, attack2, defense2, hp2, speed2);

            starters.push(poke2);

            let pokeURL3 = "http://pokeapi.co/api/v2/pokemon/" + poke3;

            request_promise_native(pokeURL3).then(function (response) {
                let data = JSON.parse(response);

                let speed3 = data.stats[0].base_stat;
                let defense3 = data.stats[3].base_stat;
                let attack3 = data.stats[4].base_stat;
                let hp3 = data.stats[5].base_stat;
                let name3 = capitalizeFirstLetter(data.name);
                let poke3 = new Pokemon(name3, attack3, defense3, hp3, speed3);

                starters.push(poke3);

                chooseStarter(starters, dest);
            })
        })
    })   
}

function chooseStarter(starters, dest){
    inquirer
    .prompt([
        {
            type: "list",
            message: "Please choose your starter Pokemon.",
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
            console.log("\n\nYou have chosen " + answers.Pokemon + "!");

            let starterChoice = "";

            starters.forEach(starter => {
                if (starter.name == answers.Pokemon) {
                    starterChoice = starter;
                }
            });
            
            console.log(
            "\n\n--------------------\n\n" 
            + starterChoice.name + "'s stats\n\n" 
            + "HP: " + starterChoice.hp 
            + "\nAttack: " + starterChoice.attack 
            + "\nDefense: " + starterChoice.defense 
            + "\nSpeed: " + starterChoice.speed 
            + "\n\n--------------------\n\n");

            generateEnemies(starterChoice, dest);
        }
    })
}

function generateEnemies(starterChoice, dest) {

    console.log(dest);
    let pokeNum = 0;

    switch (dest) {
        case "kanto":
            pokeNum = chooseRandom(1, 151);
            break;

        case "johto":
            pokeNum = chooseRandom(1, 251);
            break;

        case "hoenn":
            pokeNum = chooseRandom(1, 386);
            break;

        case "sinnoh":
            pokeNum = chooseRandom(1, 493);
            break;

        case "unova":
            pokeNum = chooseRandom(1, 649);
            break;

        case "kalos":
            pokeNum = chooseRandom(1, 721);
            break;

        case "alola":
            pokeNum = chooseRandom(1, 806);
            break;
    }


    console.log(pokeNum);

    // let pokeURL = "http://pokeapi.co/api/v2/pokemon/" + pokeNum;

    // request_promise_native(pokeURL1).then(function (response) {
    //     let data = JSON.parse(response);

    //     let speed1 = data.stats[0].base_stat;
    //     let defense1 = data.stats[3].base_stat;
    //     let attack1 = data.stats[4].base_stat;
    //     let hp1 = data.stats[5].base_stat;
    //     let name1 = capitalizeFirstLetter(data.name);
    //     let poke1 = new Pokemon(name1, attack1, defense1, hp1, speed1);
    // })

}


// game flow

newGame();
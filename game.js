const inquirer = require('inquirer');

const chalk = require('chalk');

const request = require('request');

const request_promise_native = require('request-promise-native');

const Pokemon = require('./pokemon.js');


// function to choose a random number
function chooseRandom(min, max) {
    return Math.floor((Math.random() * max) + min)
}

// function to cpaitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// the initial function to run the game
function newGame() {

    // uses inquirer to ask a question to the user
    inquirer   
        .prompt([

            // first question
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },

            // second question
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            }
        ])

        // pull in the user's answers
        .then( answers => {

            // if they said no for question two
            if (!answers.confirm){
                // rerun the function
                newGame();
            }

            // if they said yes to confirm
            else {
                // call the next function in the game
                chooseRegion(answers.name);
            }
        })
}

// function to choose what pokemon region the user would like to play in
function chooseRegion(name) {

    // give the user a welcome message
    console.log("\n\n" + name + ", welcome to the wide world of Pokemon!" + "\n\n")

    // ask question to the user
    inquirer
    .prompt([

        // question with the regions as answer options
        {
            type: "list",
            message: "Please choose your destination.",
            choices: ["Gen I - Kanto (Red & Blue)", "Gen II - Johto (Gold & Silver)", "Gen III - Hoenn (Ruby & Sapphire)", "Gen IV - Sinnoh (Diamond & Pearl)", "Gen V - Unova (Black & White)", "Gen VI - Kalos (X & Y)", "Gen VII - Alola (Sun & Moon)"],
            name: "dest"
        }
    ])

    // grab the user answer
    .then( answers => {

        // init variables
        let dest = "";
        let poke1 = "";
        let poke2 = "";
        let poke3 = "";

        // switch for decision logic
        switch (answers.dest) {

            // if they choose the first option
            case "Gen I - Kanto (Red & Blue)": 

                // set the destination to kanto
                dest = "kanto";

                // choose three random numbers to make three pokemon starter choices
                poke1 = chooseRandom(1, 151);
                poke2 = chooseRandom(1, 151);
                poke3 = chooseRandom(1, 151);

                // console log that we're loading data so the user knows what happens
                console.log("\n\nloading...\n\n")

                // call our API with the three pokemon numbers and pass in the destination
                pingAPI(poke1, poke2, poke3, dest);

                break;
                
            // if they choose the second option
            case "Gen II - Johto (Gold & Silver)":

                // set the destination to johto
                dest = "johto";

                // choose three random numbers to make three pokemon starter choices
                poke1 = chooseRandom(1, 251);
                poke2 = chooseRandom(1, 251);
                poke3 = chooseRandom(1, 251);

                // console log that we're loading data so the user knows what happens
                console.log("\n\nloading...\n\n")

                // call our API with the three pokemon numbers and pass in the destination
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen III - Hoenn (Ruby & Sapphire)":

                // set the destination to hoenn
                dest = "hoenn";

                // choose three random numbers to make three pokemon starter choices
                poke1 = chooseRandom(1, 386);
                poke2 = chooseRandom(1, 386);
                poke3 = chooseRandom(1, 386);

                // console log that we're loading data so the user knows what happens
                console.log("\n\nloading...\n\n")

                // call our API with the three pokemon numbers and pass in the destination
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen IV - Sinnoh (Diamond & Pearl)":

                // set the destination to sinnoh
                dest = "sinnoh";

                // choose three random numbers to make three pokemon starter choices
                poke1 = chooseRandom(1, 493);
                poke2 = chooseRandom(1, 493);
                poke3 = chooseRandom(1, 493);

                // console log that we're loading data so the user knows what happens
                console.log("\n\nloading...\n\n")

                // call our API with the three pokemon numbers and pass in the destination
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen V - Unova (Black & White)":

                // set the destination to unova
                dest = "unova";

                // choose three random numbers to make three pokemon starter choices
                poke1 = chooseRandom(1, 649);
                poke2 = chooseRandom(1, 649);
                poke3 = chooseRandom(1, 649);

                // console log that we're loading data so the user knows what happens
                console.log("\n\nloading...\n\n")

                // call our API with the three pokemon numbers and pass in the destination
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen VI - Kalos (X & Y)":

                // set the destination to kalos
                dest = "kalos";

                // choose three random numbers to make three pokemon starter choices
                poke1 = chooseRandom(1, 721);
                poke2 = chooseRandom(1, 721);
                poke3 = chooseRandom(1, 721);

                // console log that we're loading data so the user knows what happens
                console.log("\n\nloading...\n\n")

                // call our API with the three pokemon numbers and pass in the destination
                pingAPI(poke1, poke2, poke3, dest);

                break;

            case "Gen VII - Alola (Sun & Moon)":

                // set the destination to kalos
                dest = "kalos";

                // choose three random numbers to make three pokemon starter choices
                poke1 = chooseRandom(1, 806);
                poke2 = chooseRandom(1, 806);
                poke3 = chooseRandom(1, 806);

                // console log that we're loading data so the user knows what happens
                console.log("\n\nloading...\n\n")

                // call our API with the three pokemon numbers and pass in the destination
                pingAPI(poke1, poke2, poke3, dest);

                break;
        }
    })   
};

// function to call the pokemon API
function pingAPI(poke1, poke2, poke3, dest) {

    // init starters array
    let starters = [];

    // build out our first api call
    let pokeURL1 = "http://pokeapi.co/api/v2/pokemon/" + poke1;

    // send a request to the api route
    request_promise_native(pokeURL1)
    .then(function (response) {

        // pull out the data from the response, which will be a pokemon
        let data = JSON.parse(response);

        // pull out the pokemon's information
        let speed1 = data.stats[0].base_stat;
        let defense1 = data.stats[3].base_stat;
        let attack1 = data.stats[4].base_stat;
        let hp1 = data.stats[5].base_stat;
        let name1 = capitalizeFirstLetter(data.name);
        let poke1 = new Pokemon(name1, attack1, defense1, hp1, speed1);

        // push the pokemon to the starters array
        starters.push(poke1);




        // build our 2nd api call url
        let pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + poke2;

        // send request to the api
        request_promise_native(pokeURL2)
        .then(function (response) {

            // pull out the data from the response, which will be a pokemon
            let data = JSON.parse(response);

            // pull out the pokemon's information
            let speed2 = data.stats[0].base_stat;
            let defense2 = data.stats[3].base_stat;
            let attack2 = data.stats[4].base_stat;
            let hp2 = data.stats[5].base_stat;
            let name2 = capitalizeFirstLetter(data.name);
            let poke2 = new Pokemon(name2, attack2, defense2, hp2, speed2);

            // push the pokemon to the starters array
            starters.push(poke2);



            // build out 3rd api call
            let pokeURL3 = "http://pokeapi.co/api/v2/pokemon/" + poke3;

            // send request to the api
            request_promise_native(pokeURL3).then(function (response) {

                // pull out the data from the response, which will be a pokemon
                let data = JSON.parse(response);

                // pull out the pokemon's information
                let speed3 = data.stats[0].base_stat;
                let defense3 = data.stats[3].base_stat;
                let attack3 = data.stats[4].base_stat;
                let hp3 = data.stats[5].base_stat;
                let name3 = capitalizeFirstLetter(data.name);
                let poke3 = new Pokemon(name3, attack3, defense3, hp3, speed3);

                // push the pokemon to the starters array
                starters.push(poke3);

                // now that we have our three starter choices, call the next function and pass in the starter and destination
                chooseStarter(starters, dest);
            })
        })
    })   
}

// function to prompt the user to choose a starter
function chooseStarter(starters, dest){

    // use inquirer to ask the user a question
    inquirer
    .prompt([
        // question 1
        {
            type: "list",
            message: "Please choose your starter Pokemon.",
            choices: starters,
            name: "Pokemon"
        },

        // question 2
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
    // grab user answers
    .then( answers => {

        // if they say no to the confirm question
        if (!answers.confirm){

            // rerun the function
            chooseStarter(starters, dest);
        }

        //if they say yes to the confirm question
        else {

            // console log out their choice
            console.log("\n\nYou have chosen " + answers.Pokemon + "!");

            // init starter choice
            let starterChoice = "";

            // for each starter in the array
            starters.forEach(starter => {

                // check if the starter's name matches the user's choice
                if (starter.name == answers.Pokemon) {

                    // if so, set the starter to the starter choice
                    starterChoice = starter;
                }
            });
            
            // console log out the information of the pokemon they chose
            console.log(
                "\n\n--------------------\n\n" 
                + starterChoice.name + "'s stats\n\n" 
                + "HP: " + starterChoice.hp 
                + "\nAttack: " + starterChoice.attack 
                + "\nDefense: " + starterChoice.defense 
                + "\nSpeed: " + starterChoice.speed 
                + "\n\n--------------------\n\n");

            // call the next function and pass in the starter choice and destination
            generateEnemies(starterChoice, dest);
        }
    })
}

// IN PROGRESS!!!!!!!!!!!
// function to generate enemies for the user to fight
function generateEnemies(starterChoice, dest) {

    // console.log(dest);

    // init variable to hold the number of the enemy pokemon
    let pokeNum = 0;

    // switch case to decide what pokemon enemy to create
    switch (dest) {

        // if they had chosen kanto 
        case "kanto":

            // assign the pokenum to a random number in the kanto range
            pokeNum = chooseRandom(1, 151);
            break;

        // if they had chosen johto
        case "johto":

            // assign the pokenum to a random number in the johto range
            pokeNum = chooseRandom(1, 251);
            break;

        // if they had chosen hoenn
        case "hoenn":

            // assign the pokenum to a random number in the hoenn range
            pokeNum = chooseRandom(1, 386);
            break;

        // if they had chosen sinnoh
        case "sinnoh":

            // assign the pokenum to a random number in the sinnoh range
            pokeNum = chooseRandom(1, 493);
            break;

        // if they had chosen unova
        case "unova":

            // assign the pokenum to a random number in the unova range
            pokeNum = chooseRandom(1, 649);
            break;

        // if they had chosen kalos
        case "kalos":

            // assign the pokenum to a random number in the kalos range
            pokeNum = chooseRandom(1, 721);
            break;

        // if they had chosen alola
        case "alola":

            // assign the pokenum to a random number in the alola range
            pokeNum = chooseRandom(1, 806);
            break;
    }

    // testing to see what the final pokenum is
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


// start the game!
newGame();
import inquirer from 'inquirer'
import chalk from 'chalk';
import request from 'request';
import request_promise_native from 'request-promise-native';

import Pokemon from './classes/pokemon.mjs'
import Utility from './classes/utility.mjs';
import Session from './classes/session.mjs';
import Destinations from './data/destinations.mjs'
import Questions from './classes/questions.mjs';

class Game {

    constructor() {
        this.userSession = new Session();
        this.questions = new Questions(Destinations, []);
        this.starterChoices = [];
        this.chosenStarter;
    }

    pingPokeApi(pokeNum) {
        const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + pokeNum;

        return request_promise_native(pokeURL);
    }

    welcome() {
        return Utility.notify(`
        
        ${this.userSession.userName}, welcome to the wide world of Pokemon!

        `)
    }

    loading() {
        return Utility.notify(`
        
        loading . . .
        
        `)
    }

    youChose() {
        return Utility.notify(`
        
        You have chosen ${this.chosenStarter.name}!
        
        -------------------- 
        
        ${this.chosenStarter.name}s stats: 
        
        HP: ${this.chosenStarter.hp} 
        
        Attack: ${this.chosenStarter.attack}
        
        Defense: ${this.chosenStarter.defense} 
        
        Speed: ${this.chosenStarter.speed} 

        `)
    }

    newGame() {
        inquirer.prompt([
            this.questions.getName,
            this.questions.confirmChoice
        ])
    
        .then( answers => {
            if (!answers.confirm){
                return this.newGame();
            }
    
            this.userSession.userName = Utility.capitalizeFirstLetter(answers.name);
            return this.chooseRegion();
        })
    }

    chooseRegion() {
        this.welcome();

        inquirer.prompt([
            this.questions.chooseDestination
        ])
        .then( answers => {
            Destinations.forEach(destination => {
                if (destination.text === answers.destination) {
                    this.userSession.userDestination = destination;
                }
            })

            return this.getStarters();
        })
    }

    getStarters() {
        this.loading();

        for (let i = 0; i < 3; i++) {
            const pokeNum = Utility.generateRandomNum(1, this.userSession.userDestination.endNum);

            this.pingPokeApi(pokeNum)
            .then(pokeFromAPI => {
                const data = JSON.parse(pokeFromAPI);

                const newPoke = new Pokemon(Utility.capitalizeFirstLetter(data.name), data.stats[4].base_stat, data.stats[3].base_stat, data.stats[5].base_stat, data.stats[0].base_stat);

                this.starterChoices.push(newPoke);

                if (i === 2) {
                    setTimeout(() => { 
                        this.questions.setStarterChoices(this.starterChoices); 
                        this.chooseStarter(); 
                    },
                    1000); 
                }
            });
        }
    }

    chooseStarter() {
        inquirer.prompt([
            this.questions.chooseStarter,
            this.questions.confirmChoice
        ])
        .then( answers => {
            if (!answers.confirm){
                this.chooseStarter();
            }

            else {
                this.starterChoices.forEach(starter => {
                    if (starter.name === answers.pokemon) {
                        this.chosenStarter = starter;
                    }
                });

                this.youChose();  
            }
        })
    }
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
            pokeNum = Utility.generateRandomNum(1, 151);
            break;

        // if they had chosen johto
        case "johto":

            // assign the pokenum to a random number in the johto range
            pokeNum = Utility.generateRandomNum(1, 251);
            break;

        // if they had chosen hoenn
        case "hoenn":

            // assign the pokenum to a random number in the hoenn range
            pokeNum = Utility.generateRandomNum(1, 386);
            break;

        // if they had chosen sinnoh
        case "sinnoh":

            // assign the pokenum to a random number in the sinnoh range
            pokeNum = Utility.generateRandomNum(1, 493);
            break;

        // if they had chosen unova
        case "unova":

            // assign the pokenum to a random number in the unova range
            pokeNum = Utility.generateRandomNum(1, 649);
            break;

        // if they had chosen kalos
        case "kalos":

            // assign the pokenum to a random number in the kalos range
            pokeNum = Utility.generateRandomNum(1, 721);
            break;

        // if they had chosen alola
        case "alola":

            // assign the pokenum to a random number in the alola range
            pokeNum = Utility.generateRandomNum(1, 806);
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
    //     let name1 = Utility.capitalizeFirstLetter(data.name);
    //     let poke1 = new Pokemon(name1, attack1, defense1, hp1, speed1);
    // })

}

let game = new Game();

game.newGame();
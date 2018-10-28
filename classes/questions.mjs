export default class Questions {
    constructor(destinations, starters) {
        this.getName = {
            type: "input",
            message: "What is your name?",
            name: "name",
            validate: function(name) { return (name.length > 0) ? true : false }
        },
    
        this.confirmChoice = {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        },
    
        this.chooseDestination = {
            type: "list",
            message: "Please choose your destination.",
            choices: destinations.map(destination => destination.text),
            name: "destination"
        },
    
        this.chooseStarter = {
            type: "list",
            message: "Please choose your starter Pokemon.",
            choices: starters,
            name: "pokemon"
        }
    }

    setStarterChoices(starters) {
        this.chooseStarter.choices = starters
    }
}

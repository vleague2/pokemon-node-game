export default class Questions {
    constructor(destinations) {
        this.starters = [];
        this.destinations = destinations;
    }

    getName() {
        return {
            type: "input",
            message: "What is your name?",
            name: "name",
            validate: function(name) { return (name.length > 0) ? true : false }
        }
    }

    confirmChoice() {
        return {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    }

    chooseDestination() {
        return {
            type: "list",
            message: "Please choose your destination.",
            choices: this.destinations.map(destination => destination.text),
            name: "destination"
        }
    }

    chooseStarter() {
        return {
            type: "list",
            message: "Please choose your starter Pokemon.",
            choices: this.starters,
            name: "pokemon"
        }
    }

    setStarterChoices(starters) {
        this.starters = starters
    }
}

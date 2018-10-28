export default class Session {
    constructor() {
        this.name;
        this.destination;
        this.pokemonParty;
    };

    get userName() {
        return this.name;
    };

    set userName(name) {
        this.name = name;
    };

    get userDestination() {
        return this.destination;
    }

    set userDestination(destination) {
        this.destination = destination;
    }
}

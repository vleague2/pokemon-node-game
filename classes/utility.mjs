export default class Utility {
    static generateRandomNum(min, max) {
        return Math.floor((Math.random() * max) + min);
    };

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    static notify(input) {
        return console.log(input);
    }
}

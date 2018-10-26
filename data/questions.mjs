const Questions = {
    getName: {
        type: "input",
        message: "What is your name?",
        name: "name"
    },

    // second question
    confirmChoice: {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
    }
}

export default Questions;
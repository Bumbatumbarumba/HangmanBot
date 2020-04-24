String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

class BotFunctions {
    constructor() {
        this.guesses_remaining = [
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|......................................\n" + 
            ".|......................................\n" + 
            ".|......................................\n" + 
            ".|......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|.....................................\n" + 
            ".|.....................................\n" + 
            ".|......................................\n" + 
            "[]....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|..................................|...\n" + 
            ".|......................................\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|................................_|.\n" + 
            ".|....................................\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|................................|_|.\n" + 
            ".|....................................\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|................................/|_|.\n" + 
            ".|....................................\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|................................/|_|.|.\n" + 
            ".|....................................\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|................................/|_|.|.\n" + 
            ".|................................./..\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|................................/|_|.|.\n" + 
            ".|................................./.|.\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|...............................$/|_|.|.\n" + 
            ".|................................./.|.\n" + 
            ".|.......................................\n" + 
            "[].....................................",
            "\n.|############|..\n" + 
            ".|...................................|..\n" + 
            ".|..................................0..\n" + 
            ".|................................/|\\.\n" + 
            ".|................................./\\.\n" + 
            ".|.......................................\n" + 
            "[]....................................."
            ]
        this.listOfWords = ["kielbasa", "szczep", "pierogi", "tornado", "ognisko", "namiot", "piesek", "gorilla", "robot", "astronaut", "kwiatek", "auto", "zapiekanki", "jezioro", "mundur", "Polska", "telefon", "backpack", "environment", "guitar", "spaghetti", "beaver", "restaurant", "bottle", "computer", "wycieczka", "sunrise", "elbow", "krajka", "burrito", "kangaroo", "komary", "passport", "mitochondria", "kot", "comedy", "bicycle", "football", "obiad", "zamek", "student", "mission"]
        this.currentWord = ""
        this.currentProgress = ""
        this.numIncorrectGuesses = 0
        this.didWin = false
    }

    InitRound() {
        this.Reset()
        this.PickWord()
        this.InitProgress()
        this.DisplayMan()
    }

    Reset() {
        this.currentWord = ""
        this.currentProgress = ""
        this.numIncorrectGuesses = 0
        this.didWin = false
    }

    PickWord() {
        var max = this.listOfWords.length
        var index = Math.floor(Math.random() * Math.floor(max));
        this.currentWord = this.listOfWords[index]
        console.log(this.currentWord)
    }

    InitProgress() {
        for (var i = 0; i < this.currentWord.length; i++){
            this.currentProgress += "\-\."
        }
        console.log(this.currentProgress)
    }

    AddWord(word) {
        this.listOfWords.push(word)
    }

    ShowListOfWords() {
        return this.listOfWords
    }

    ParseGuess(guess) {
        guess = guess.replace(/\"/gi, "")
        console.log("guessed: ")
        console.log(guess)

        if (guess.length == 1) {
            if (this.currentWord.indexOf(guess) == -1) {
                this.numIncorrectGuesses++
            }
            else {
                for (var i = 0; i < this.currentWord.length; i++) {
                    if (this.currentWord[i] === guess) {
                        this.currentProgress = this.currentProgress.replaceAt(i*2, guess)
                        console.log(this.currentProgress)
                    }
                }
            }
        }
        else {
            if (guess.toLowerCase() != this.currentWord.toLowerCase()) {
                this.numIncorrectGuesses++
            }
            else {
                this.didWin = true
            }
        }

        return this.DetermineGameOutcome()
    }

    DisplayMan() {
        return this.guesses_remaining[this.numIncorrectGuesses] + "\n" + this.currentProgress + "\n Guesses left: " + (9 - this.numIncorrectGuesses)
    }

    DetermineGameOutcome() {
        var currentResult = this.currentProgress.replace(/\./g, "").toLowerCase()
        console.log(currentResult)
        if (this.numIncorrectGuesses == 9) {
            return "game over! The word was " + this.currentWord
        }
        else if (this.didWin || currentResult === this.currentWord) {
            return "found the word, " + this.currentWord + "! good job!"
        }

        return this.DisplayMan()
    }
}

module.exports = BotFunctions
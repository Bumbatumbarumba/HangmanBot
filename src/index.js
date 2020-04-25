const Discord = require("discord.js")
const BotFunctions = require("./botFunctions")

const client = new Discord.Client()
const botfuncs = new BotFunctions()
var latestSender = null
var currentScores = {}
var gameStarted = false

function updateScores(user){
    console.log(user)
    if (!(user in currentScores)) {
        currentScores[user] = 1
    }
    else {
        currentScores[user]++
    }
}

client.on("ready", () => {
    console.log("Ready!")
})

client.on("message", message => {
    try {
        if (message.content.startsWith("!hb")) {
            secondpart = message.content.split(" ")[1]
    
            if (secondpart == "start") {
                if (!gameStarted) {
                    gameStarted = true
                    botfuncs.InitRound()
                    message.reply(botfuncs.DisplayMan())
                }
                else {
                    message.reply("Game in progress!")
                }
            }
            else if (secondpart == "stop") {
                if (gameStarted) {
                    gameStarted = false
                    message.reply("Stopping game, please enter '!hb start' to start a new round.")
                }
                else {
                    message.reply("No game to stop!")
                }
            }
            else if (secondpart == "help") {
                message.reply("List of commands:\n" + "!hb start - starts the game,\n" + "!hb stop - stops the game,\n" + "!hb help - shows the list of commands,\n" + "!hb scores - displays scores if there are any,\n" + "!hb \"guess\" - put your guess in quotation marks")
            } 
            else if (secondpart == "scores") {
                message.reply("These are the scores: " + JSON.stringify(currentScores))
            } 
            else if (secondpart[0] == "\"") {
                if (gameStarted){
                    latestSender = message.member.user.tag
                    res = botfuncs.ParseGuess(secondpart)
                    if (res.indexOf("found the word,") !== -1) {
                        updateScores(latestSender)
                        gameStarted = false
                    }
                    else if (res.indexOf("game over!") !== -1) {
                        gameStarted = false
                    }
                    message.reply(res)
                }
                else {
                    message.reply("Please type '!hb start' to start a game.")
                }
            } 
            else {
                message.reply("Unrecognized command! Type '!hb help' to see what I can do!")
            }
        }
    } catch (error) {
        message.reply("Unrecognized command! Type '!hb help' to see what I can do!")
    }
})

client.login(process.env.DISCORD_TOKEN)
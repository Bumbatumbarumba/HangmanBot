const { Discord } = require("discord.js")

const client = new Discord.client()

client.on("ready", () => {
    console.log("Ready!")
})

client.login(DISCORD_SECRET)
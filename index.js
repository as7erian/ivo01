const Discord = require('discord.js');
const fs = require("fs");

const { prefix, token } = require('./config.json');

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.login(token);

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load.");
        return;
    }

    console.log(`loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


bot.once('ready', () => {
	console.log('Osu Bot successfully turned ON! ✓');
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;
    
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) return cmd.run(bot, message, args);
});


// Bot Activity
bot.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    bot.user.setActivity("Bugstorm", {type: "PLAYING"})

    // Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // bot.user.setActivity("TV", {type: "WATCHING"})
});
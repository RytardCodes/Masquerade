const Eris = require('eris');
const { bot_token, bot_ownerID } = require('./config.json');


const client = new Eris(bot_token);
const fs = require('fs');

client.commands = new Eris.Collection();
client.permissions = require('./permissions.js');

fs.readdir('./events', (err, files) => {
    if (err) console.log(err);

    files.forEach(f => {
        const eventFunction = require(`./events/${f}`);
        const eventName = f.split('.')[0];

        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

const commandFiles = fs.readdirSync('./commands');

for (const files of commandFiles) {
    const command = require(`./commands/${files}`);
    
    client.commands.set(command.name, command)
};

client.permlevel = (message) => {
    let permlevel = 0;
    if (message.channel.guild.members.has('kickMembers')) permlevel = 1;
    if (message.channel.guild.members.has('banMembers')) permlevel = 2;
    if (message.channel.guild.members.has('administrator')) permlevel = 3;
    if (message.author.id === message.channel.guild.ownerID) permlevel = 4;
    if (bot_ownerID.includes(message.author.id)) permlevel = 5;
    return permlevel;
};

client.connect();
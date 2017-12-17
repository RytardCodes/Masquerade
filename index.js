const Eris = require('eris');
const { bot_token, bot_ownerID } = require('./config.json');


const client = new Eris(bot_token, {
    maxShards: 'auto'
});

const fs = require('fs');

client.commands = new Eris.Collection();
client.permissions = require('./permissions.js');

const eventFiles = fs.readdirSync('./events');

for (const eFiles of eventFiles) {
    const eventFunction = require(`./events/${eFiles}`);
    const eventName = eFiles.split('.')[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args));
};


const commandFiles = fs.readdirSync('./commands');

for (const files of commandFiles) {
    const command = require(`./commands/${files}`);
    
    client.commands.set(command.name, command)
};

client.permlevel = (message) => {
    let permlevel = 0;
    if (message.channel.guild.members.has('manageMessage')) permlevel = 1
    if (message.channel.guild.members.has('kickMembers')) permlevel = 2;
    if (message.channel.guild.members.has('banMembers')) permlevel = 3;
    if (message.channel.guild.members.has('administrator')) permlevel = 4;
    if (message.author.id === message.channel.guild.ownerID) permlevel = 5;
    if (bot_ownerID.includes(message.author.id)) permlevel = 10;
    return permlevel;
};

client.connect();

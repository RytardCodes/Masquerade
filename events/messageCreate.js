module.exports.run = (client, message) => {
    const { bot_prefix } = require('../config.json');

    if (!message.content.startsWith(bot_prefix) || message.author.bot || message.author === client.user || message.channel.type !== 0) return;

    const args = message.content.split(' ').slice(1);
    const commandName = message.content.split(' ')[0].slice(bot_prefix.length).toLowerCase();
    const level = client.permlevel(message);

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command) {
        if (level < command.permlevel) return client.createMessage(message.channel.id, `You cannot use that Command!\nThis Command requires Permission Level: **${command.permlevel} (${client.permissions.permLevels.find(l => l.level === command.permlevel).name})**\nAnd you only have Permission Level: **${level} (${client.permissions.permLevels.find(l => l.level === level).name})**`);
        message.author.permlevel = level;
        
        command.execute(client, message, args, level);
    } else {
        return;
    }
};
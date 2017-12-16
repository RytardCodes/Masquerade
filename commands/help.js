module.exports = {
    name: 'help',
    aliases: [],
    permlevel: 0,
    description: 'A Simple Help Command',
    extraDesc: 'A help Command that filters all Commands that are not Available for your Permission Level!',
    usage: '[command]',
    execute(client, message, args, level) {
        var { bot_prefix } = require('../config.json');

        if (!args[0]) {
            const filtered = client.commands.filter(cmd => cmd.permlevel <= level);

            client.createMessage(message.channel.id, {
                    embed: {
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        color: 0xfaff7b,
                        description: `Here's a list of all the Commands available for your Permission Level:\n${filtered.map(cmd => `\n**${bot_prefix}${cmd.name}**: ${cmd.description}`).join('\n')}`
                    },
                    footer: {
                        text: 'Full Help Command'
                    }
                });
        } else {
            const command = client.commands.get(args[0]);

            if (!command) return;

            var aliases = command.aliases.join(', ')

            if (aliases.length === 0) {
                aliases = 'No Aliases Set'
            }
            if (command.extraDesc.length === 0) {
                command.extraDesc = 'No extra Description Set'
            }
            
            client.createMessage(message.channel.id, {
                embed: {
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    color: 0xfaff7b,
                    fields: [
                        {
                            name: 'Command Name',
                            value: command.name,
                            inline: true
                        },
                        {
                            name: 'Command Aliases',
                            value: aliases,
                            inline: true
                        },
                        {
                            name: 'Command Usage',
                            value: `${bot_prefix}${args[0]} ${command.usage}`,
                            inline: true
                        },
                        {
                            name: 'Command Extra Description',
                            value: command.extraDesc
                        }
                    ],  
                    footer: {
                        text: `${args[0].toUpperCase()} Command: Full Information`
                    }
                }
            });
        }
    }
};

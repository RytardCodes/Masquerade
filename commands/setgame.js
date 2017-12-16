module.exports = {
    name: 'setgame',
    aliases: [],
    permlevel: 10,
    description: 'Sets the Bot\'s playing Game',
    extraDesc: '',
    usage: '[game name>',
    execute(client, message, args) {
        var output = `Changed my playing status to __**${args.join(' ')}**__`;

        if (!args.join(' ')) {
            output = `Removed my Game Status!`
        };

        client.editStatus({ name: args.join(' ') })
        client.createMessage(message.channel.id, output)
    }
};
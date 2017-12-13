module.exports = {
    name: 'echo',
    aliases: ['say', 'repeat'],
    permlevel: 0,
    description: 'Make the Bot Repeat Everything you Say!',
    extraDesc: 'Make the Bot Repeat the Arguments you gave it',
    usage: '<message>',
    execute(client, message, args) {
        if (!args.join(' ')) {
            return client.createMessage(message.channel.id, `Please Specify a Message for the Bot to Repeat!`);
        } else {
            message.delete();
            client.createMessage(message.channel.id, args.join(' '));
        }
    }
};
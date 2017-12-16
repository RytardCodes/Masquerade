module.exports = {
    name: 'purge',
    aliases: [],
    permlevel: 1,
    description: '.',
    extraDesc: '',
    usage: '',
    execute(client, message, args) {
        var result = args.join(' ');
        var messagecount = parseInt(result);
        
        if (!messagecount || messagecount < 1 || messagecount > 200) return client.createMessage(message.channel.id, 'Please choose a Number from 1 - 200 !');        
                
        var messages = client.getMessages(message.channel.id, messagecount + 1);

        var resolved = Promise.resolve(messages);
        var fetchedMessages = resolved.then(function(value) {
            var messagesDel = Object.values(value).map(v => v.id);
            client.deleteMessages(message.channel.id, messagesDel);

            client.createMessage(message.channel.id, `Deleted \`${messagesDel.length - 1}\` Message(s)!`)
        })
    }
};
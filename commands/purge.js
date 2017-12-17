module.exports = {
    name: 'purge',
    aliases: [],
    permlevel: 1,
    description: 'Purge the XX Amount of Messages! Maximum is 200',
    extraDesc: '',
    usage: '<Amount of Messages>',
    execute(client, message, args) {
        var result = args.join(' ');
        var messagecount = parseInt(result);
        
        if (!messagecount || messagecount < 1 || messagecount > 200) return client.createMessage(message.channel.id, 'Please choose a Number from 1 - 200 !');        
                
        var messages = client.getMessages(message.channel.id, messagecount + 1);

        var resolved = Promise.resolve(messages);
        var fetchedMessages = resolved.then(function(value) {
            var messagesDel = Object.values(value).map(v => v.id);
            client.deleteMessages(message.channel.id, messagesDel);
            
            var clearedMessage = client.createMessage(message.channel.id, `Deleted \`${messagesDel.length - 1}\` Message(s)!`)        
            Promise.resolve(clearedMessage).then(function(messageSent) {
                setTimeout(function() {
                    message.channel.deleteMessage(messageSent.id)
                }, 3000)
            });
        });       
    }
};

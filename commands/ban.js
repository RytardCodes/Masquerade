module.exports = {
    name: 'ban',
    aliases: [],
    permlevel: 2,
    description: 'Bans a User',
    extraDesc: 'Bans a Specified user from the Current Guild',
    usage: '<@user> <reason>',
    execute(client, message, args) {
        var user = message.mentions[0];
        var reason = args.slice(1).join(' ');
        var modlog = message.channel.guild.channels.find(function (channel) { return channel.name === 'mod-log'});

        if (!modlog) return client.createMessage(message.channel.id, 'Pleae make a Channel Called `mod-log`!'); 
        if (!user) return client.createMessage(message.channel.id,  'Please mention a User!');
        if (!reason) return client.createMessage(message.channel.id, 'Please specify a Reason for the Ban!');

        try {
            client.createMessage(message.channel.id, `Banned User! Check <#${modlog.id}> to see the Ban Action!`)
            message.channel.guild.banMember(user.id, reason).then(() => client.createMessage(modlog.id, `**Action: Ban | Success! :ballot_box_with_check:**\nResponsible Moderator: **${message.author.username}**\nTarget: **${user.username}**\nReason: **${reason}**`))
        } catch(err) {
            console.log(err)
        }
    }
};
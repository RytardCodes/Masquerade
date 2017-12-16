module.exports = {
    name: 'softban',
    aliases: [],
    permlevel: 3,
    description: 'Softbans a User',
    extraDesc: 'Bans a user and Deletes all Messages Sent within 7 Days and Unban the User!',
    usage: '<@user> <reason>',
    execute(client, message, args) {
        var user = message.mentions[0];
        var reason = args.slice(1).join(' ');
        var modlog = message.channel.guild.channels.find(function (channel) { return channel.name === 'mod-log'});

        if (!modlog) return client.createMessage(message.channel.id, 'Pleae make a Channel Called `mod-log`!'); 
        if (!user) return client.createMessage(message.channel.id,  'Please mention a User!');
        if (!reason) return client.createMessage(message.channel.id, 'Please specify a Reason for the Softban!');

        try {
            client.createMessage(message.channel.id, `Softbanned User! Check <#${modlog.id}> to see the Softban Action!`)
            message.channel.guild.banMember(user.id, 7, reason).then(() => client.createMessage(modlog.id, `**Action: Softban | Success! :ballot_box_with_check:**\nResponsible Moderator: **${message.author.username}**\nTarget: **${user.username}**\nReason: **${reason}**`));
            message.channel.guild.unbanMember(user.id, reason);
        } catch(err) {
            console.log(err)
        }
    }
};
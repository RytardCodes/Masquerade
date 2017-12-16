module.exports = {
    name: 'unmute',
    aliases: [],
    permlevel: 2,
    description: 'Unmutes a User',
    extraDesc: 'Unutes a User for a Reason by a Moderator',
    usage: '<@user> <reason>',
    execute(client, message, args) {
        var user = message.mentions[0];
        var reason = args.slice(1).join(' ');
        var modlog = message.channel.guild.channels.find(function (channel) { return channel.name === 'mod-log'});

        if (!modlog) return client.createMessage(message.channel.id, 'Please create a channel called `mod-log`');
        if (!user) return client.createMessage(message.channel.id, 'Please mention a User to Unmute!');
        if (!reason) return client.createMessage(message.channel.id, 'Please specify a Reason for the Unmute!');

        var channels = message.channel.guild.channels;

        channels.forEach(channel => {
            channel.editPermission(user.id, 2048, 0, 'member', reason);
        });
        

        client.createMessage(message.channel.id, `Unmuted User! Check <#${modlog.id}> to see the Mute Action!`).then(() => client.createMessage(modlog.id, `**Action: Unmuted | Success! :ballot_box_with_check:**\nResponsible Moderator: **${message.author.username}**\nTarget: **${user.username}**\nReason: **${reason}**`));
    }
};
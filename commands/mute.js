module.exports = {
    name: 'mute',
    aliases: [],
    permlevel: 2,
    description: 'Mutes a User',
    extraDesc: 'Mutes a User for a Reason by a Moderator',
    usage: '<@user> <reason>',
    execute(client, message, args) {
        var user = message.mentions[0];
        var reason = args.slice(1).join(' ');
        var modlog = message.channel.guild.channels.find(function (channel) { return channel.name === 'mod-log'});

        if (!modlog) return client.createMessage(message.channel.id, 'Please create a channel called `mod-log`');
        if (!user) return client.createMessage(message.channel.id, 'Please mention a User to Mute!');
        if (!reason) return client.createMessage(message.channel.id, 'Please specify a Reason for the Mute!');

        var channels = message.channel.guild.channels;

        channels.forEach(channel => {
            channel.editPermission(user.id, 0, 2048, 'member', reason);
        });
        

        client.createMessage(message.channel.id, `Muted User! Check <#${modlog.id}> to see the Mute Action!`).then(() => client.createMessage(modlog.id, `**Action: Mute | Success! :ballot_box_with_check:**\nResponsible Moderator: **${message.author.username}**\nTarget: **${user.username}**\nReason: **${reason}**`));
    }
};
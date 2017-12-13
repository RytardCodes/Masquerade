module.exports = {
    name: 'invite',
    aliases: ['inv'],
    permlevel: 0,
    description: 'Sends the bot Invite',
    extraDesc: 'Sends the Bot OAuth2 Invite',
    usage: '',
    execute(client, message) {
        client.createMessage(message.channel.id, `__**${message.author.username}#${message.author.discriminator}**__: Check your DMs!`).then(() => client.getDMChannel(message.author.id).then(channel => channel.createMessage(`Here's my Invite:\n => https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)))
    }
}
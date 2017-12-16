module.exports = {
    name: 'bump',
    aliases: [],
    permlevel: 0,
    description: 'Bumps a guild!',
    extraDesc: 'Sends your server info with Invite on our Guild',
    usage: '',
    execute(client, message) {
        var moment = require('moment');
        var cookies = require('cookiesdb');

        let today = moment().format('l');

        cookies.fetchCookies(`bump_${message.channel.guild.id}`).then(i => {
            if (i.text === today) return client.createMessage(message.channel.id, 'You have already bumped today! Please wait 24 Hours again');

            cookies.updateText(`bump_${message.channel.guild.id}`, today).then(() => {
                var inv = client.createChannelInvite(message.channel.id, {
                    maxAge: 0
                }).catch(console.error);
                var resolved = Promise.resolve(inv);

                var inv2 = resolved.then(function(invite) {
                    client.createMessage('391519785126461440', {
                        embed: {
                            author: {
                                name: message.channel.guild.name,
                                icon_url: message.channel.guild.iconURL
                            },
                            thumbnail: {
                                url: message.channel.guild.iconURL
                            },
                            color: 0xfaff7b,
                            fields: [{
                                    name: 'Server Name',
                                    value: message.channel.guild.name,
                                    inline: true
                                },
                                {
                                    name: 'Server ID',
                                    value: message.channel.guild.id,
                                    inline: true
                                },
                                {
                                    name: 'Server Invite',
                                    value: `https://discord.gg/${invite.code}`,
                                    inline: true
                                },
                                {
                                    name: 'Server Owner',
                                    value: client.users.get(message.channel.guild.ownerID).username + '#' + client.users.get(message.channel.guild.ownerID).discriminator,
                                    inline: true
                                },
                                {
                                    name: 'Member Count',
                                    value: `${message.channel.guild.memberCount} Members`,
                                    inline: true
                                }
                            ],
                            footer: {
                                text: 'Bumped by ' + message.author.username
                            }
                        }
                    })
                })
            })
        })
    }
};
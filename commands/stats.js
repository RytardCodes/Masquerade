module.exports = {
    name: 'stats',
    aliases: [],
    permlevel: 0,
    description: 'Sends the Bot\'s Statistics',
    extraDesc: '',
    usage: '',
    execute(client, message) {
        var moment = require('moment');
        require('moment-duration-format');

        var { bot_version, eris_version } = require('../config.json');

        client.createMessage(message.channel.id, {
            embed: {
                title: ':information_source: Bot Stats',
                color: 0xfaff7b,
                fields: [
                    {
                        name: ':clock: Uptime',
                        value: `${moment.duration(client.uptime).format("Y [Years], M [Months], W [Weeks], D [Days], H [Hours], m [Minutes], s [Seconds]")}`
                    },
                    {
                        name: ':open_file_folder: Guilds In',
                        value: client.guilds.size
                    },

                    {
                        name: ':tools: Bot Version',
                        value: bot_version
                    },
                    {
                        name: ':tools: Eris Version',
                        value: `[Eris ${eris_version}](https://abal.moe/Eris/)`
                    },
                    {
                        name: ':dividers: Shards',
                        value: client.shards.filter(s => s.status === 'ready').length + ' Shards'
                    }
                ]
            }
        })
    }
};
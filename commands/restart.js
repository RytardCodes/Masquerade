module.exports = {
    name: 'restart',
    aliases: ['reboot'],
    permlevel: 10,
    description: 'Restarts the Bot!',
    extraDesc: '',
    usage: '',
    async execute(client, message) {
        try {
            await client.createMessage(message.channel.id, '*Restarting...*');
            await client.disconnect({ reconnect: 'auto' });
        } catch (err) {
            console.log(err)
        }
    }
};
module.exports = {
    name: 'shutdown',
    aliases: ['reboot', 'off'],
    permlevel: 5,
    description: 'Shuts Down the Bot! Won\'t go online after',
    extraDesc: '',
    usage: '',
    async execute(client, message) {
        try {
            await client.createMessage(message.channel.id, 'Going off... :wave:');
            await client.disconnect();
            await process.exit();
        } catch (err) {
            console.log(err);
        }
    }
};
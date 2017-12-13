module.exports = {
    name: 'ping',
    aliases: ['pong'],
    permlevel: 0,
    description: 'Pong!',
    extraDesc: 'Checks the API Latency',
    usage: '',
    execute(client, message) {
        client.createMessage(message.channel.id, `Pong!\n:heartbeat: API Latency Took: \`${message.channel.guild.shard.latency}ms\``)    
    }
};
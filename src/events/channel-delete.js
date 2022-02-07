const db = require("../../models");

module.exports = {
    name: 'channelDelete',
    once: false,
    async execute(channel) {
        const found = await db.LogChannel.findOne({ where: { guild: channel.guild.id, channel: channel.id } })

        if(found != null) {
            await found.destroy();
            console.log(`Log Channel ${channel.name} (${channel.id}) on guild ${channel.guild.name} (${channel.guild.id}) has been removed.`)
        }
    },
};

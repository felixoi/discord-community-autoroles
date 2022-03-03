const db = require('../../models/index.js');

module.exports = {
    async logToChannel(guild, message) {
        try {
            const channelId = await db.LogChannel
                .findOne({ attributes: ['channel'], where: { guild: guild.id } });

            if (channelId != null) {
                const channel = await guild.channels.fetch(channelId.channel);
                await channel.send(message);
            }
            else {
                console.log(message);
            }
        }
        catch (e) {
            console.log(`Failed to send to log channel: (${e.name}) ${e.message}\nSending to console now...\n${message}`);
        }
    },
};

const db = require('../../models');
const { logToChannel } = require('../common/log-channel');

module.exports = {
    name: 'roleDelete',
    once: false,
    async execute(role) {
        const found = await db.AutoRole.findOne({ where: { guild: role.guild.id, role: role.id } });

        if (found != null) {
            found.destroy();

            await logToChannel(role.guild, `Active role ${role.name} (${role.id}) on guild ${role.guild.name} (${role.guild.id}) has been deleted.`);
        }
    },
};

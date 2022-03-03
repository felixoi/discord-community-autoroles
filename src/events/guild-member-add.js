const { logToChannel } = require('../common/log-channel');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member) {
        if (member.pending === false) {
            await logToChannel(member.guild, `WARNING: ${member} joined with a non-pending state.`);
        }
    },
};

const { logToChannel } = require('../common/log-channel');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member) {
        if (member.pending === false) {
            await logToChannel(member.guild, `**WARNING**: ${member} joined with a non-pending state.`);
        }
        else {
            await logToChannel(member.guild, `${member} joined. Waiting for the rules to be accepted...`);
        }
    },
};

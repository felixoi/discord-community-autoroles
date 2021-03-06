const { getAutoRoles } = require('../common/guild-autoroles.js');
const { logToChannel } = require('../common/log-channel');

module.exports = {
    name: 'guildMemberUpdate',
    once: false,
    async execute(oldMember, newMember) {
        if (oldMember.pending === true && newMember.pending === false) {
            const { roles, errored } = await getAutoRoles(newMember.guild);

            if (roles.length > 0) {
                newMember.roles.add(roles)
                    .then(() => {
                        logToChannel(newMember.guild,
                            `Added auto roles to ${newMember}.`);
                    })
                    .catch((err) => {
                        logToChannel(newMember.guild,
                            `Failed to add auto-roles to ${newMember}: (${err.name}) ${err.message}`);
                    });
            }
            if (errored.length > 0) {
                await logToChannel(newMember.guild, `Failed to add following auto-roles to ${newMember} because they couldn't be found anymore: ${errored.join(',')}`);
            }
        }
        else if (oldMember.pending === false && newMember.pending === false) {
            await logToChannel(newMember.guild, `${newMember} broke the matrix...`);
        }
    },
};

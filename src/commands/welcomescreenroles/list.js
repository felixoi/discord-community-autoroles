const { getAutoRoles } = require('../../common/guild-autoroles.js');
const db = require('../../../models/index.js');


module.exports = {
    name: 'list',
    data(subcommandBuilder) {
        return subcommandBuilder
            .setName(this.name)
            .setDescription('Lists all roles that will be added on rule acceptance');
    },
    async execute(interaction) {
        try {
            const { roles, errored } = await getAutoRoles(interaction.guild);

            if (roles.length === 0 && errored.length === 0) {
                await interaction.reply('The role are currently no roles being added on rule acceptance.');
                return;
            }

            if (roles.length > 0) {
                await interaction.reply(`Following roles are configured: ${roles.join(',')}`);
            }

            if (errored.length > 0 && roles.length === 0) {
                await interaction.reply(`Following roles are configured but not found anymore: ${errored.join(',')}`);
            }
            if (errored.length > 0 && roles.length > 0) {
                await interaction.followUp(`Following roles are configured but not found anymore: ${errored.join(',')}`);
            }
        }
        catch (e) {
            console.log(e);
            await interaction.reply('Failed to retrieve the role list...');
        }
    },
};

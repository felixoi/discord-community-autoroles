const db = require('../../../models/index.js')

module.exports = {
    name: 'remove',
    data(subcommandBuilder) {
        return subcommandBuilder
            .setName(this.name)
            .setDescription('Remove a role which should no longer be added on rule acceptance')
            .addRoleOption(option => option.setName('role').setDescription('Role to remove').setRequired(true))
    },
    async execute(interaction) {
        const role = interaction.options.getRole('role', true);

        if(role.name === '@everyone') {
            await interaction.reply('Really...?');
            return;
        }

        try {
            const found = await db.AutoRole.findAll({
                where: {guild: interaction.guild.id, role: role.id}
            });

            if(found.length === 0) {
                await interaction.reply('The role is currently not being added on rule acceptance.');
                return;
            }

            await found[0].destroy();
            await interaction.reply('The role was successfully removed!');
        } catch (e) {
            console.log(e)
            await interaction.reply('Failed to remove the role...')
        }
    },
};

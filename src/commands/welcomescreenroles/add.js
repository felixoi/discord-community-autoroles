const db = require('../../../models/index.js')

module.exports = {
    name: 'add',
    data(subcommandBuilder) {
        return subcommandBuilder
            .setName(this.name)
            .setDescription('Add a role which should be added on rule acceptance')
            .addRoleOption(option => option.setName('role').setDescription('Role to add').setRequired(true))
    },
    async execute(interaction) {
        const role = interaction.options.getRole('role', true);

        if(role.name === '@everyone') {
            await interaction.reply('Really...?');
            return;
        }

        try {
            await db.AutoRole.create({guild: interaction.guild.id, role: role.id});
            await interaction.reply('The role was successfully added!');
        } catch (e) {
            if(e.name === 'SequelizeUniqueConstraintError') {
                await interaction.reply('The role is already being added on rule acceptance.')
            } else {
                console.log(e)
                await interaction.reply('Failed to add the role...')
            }
        }
    },
};

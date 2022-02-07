const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const path = require('path');
const {Collection} = require("discord.js");

const subcommands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, '/welcomescreenroles')).filter(file => file.endsWith('.js'));

const name = 'welcome-screen-roles'
const builder = new SlashCommandBuilder()
    .setName(name)
    .setDescription('Configure Welcome Screen Roles')
    .setDefaultPermission(false)
for (const file of commandFiles) {
    const subcommand = require(`./welcomescreenroles/${file}`);
    subcommands.set(subcommand.name, subcommand)
    builder.addSubcommand(subcommandBuilder => subcommand.data(subcommandBuilder))
}


module.exports = {
    name: name,
    data: builder,
    userPermissions: ['MANAGE_GUILD'],
    async execute(interaction) {
        const command = subcommands.get(interaction.options.getSubcommand());

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};

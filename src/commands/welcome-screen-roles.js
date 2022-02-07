const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const {Collection} = require("discord.js");

const subcommands = new Collection();
const commandFiles = fs.readdirSync('./commands/welcomescreenroles').filter(file => file.endsWith('.js'));

const builder = new SlashCommandBuilder()
    .setName('welcome-screen-roles')
    .setDescription('Configure Welcome Screen Roles')
for (const file of commandFiles) {
    const subcommand = require(`./welcomescreenroles/${file}`);
    subcommands.set(subcommand.name, subcommand)
    builder.addSubcommand(subcommandBuilder => subcommand.data(subcommandBuilder))
}


module.exports = {
    data: builder,
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

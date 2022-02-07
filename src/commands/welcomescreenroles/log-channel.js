const { Client } = require('discord.js');
const db = require('../../../models/index.js')

module.exports = {
    name: 'log-channel',
    data(subcommandBuilder) {
        return subcommandBuilder
            .setName(this.name)
            .setDescription('Sets the log channel for posting errors')
            .addChannelOption(option => option.setName('channel').setDescription('Log Channel').setRequired(true))
    },
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel', true);

        try {
            await db.LogChannel
                .findOne({ where: { guild: channel.guild.id } })
                .then(function(obj) {
                    if(obj) return obj.update({ guild: channel.guild.id, channel: channel.id });
                    return db.LogChannel.create({ guild: channel.guild.id, channel: channel.id });
                })

            await interaction.reply('The log channel was successfully updated!');
        } catch (e) {
            console.log(e)
            await interaction.reply('Failed to update the log channel...')
        }
    },
};

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command);
}

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.guilds.cache.each(async (guild) => {
            try {
                const cmds = await guild.commands.set(commands.map(cmd => cmd.data.toJSON()))

                const getRoles = (commandName) =>  {
                    const permissions = commands.find(
                        (x) => x.name === commandName
                    ).userPermissions;

                    if(!permissions) return null;
                    return guild.roles.cache.filter(x => x.permissions.has(permissions) && !x.managed);
                }

                const fullPermissions = cmds.reduce((accumulator,x) => {
                    const roles = getRoles(x.name);
                    if(!roles) return accumulator;

                    const permissions = roles.reduce((a,v) => {
                        return [
                            ...a,
                            {
                                id: v.id,
                                type: 'ROLE',
                                permission: true
                            }
                        ]
                    }, [])

                    return [
                        ...accumulator,
                        {
                            id: x.id,
                            permissions
                        }
                    ]
                }, [])

                await guild.commands.permissions.set({ fullPermissions });

                console.log(`Successfully updated slash commands for guild ${guild.name} (${guild.id})`);
            } catch (e) {
                console.log(`Failed to update slash commands for guild ${guild.name} (${guild.id}): (${e.name}) ${e.message}`)
            }
        })
    },
};

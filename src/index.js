// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const envVarRegEx = /DISCORD_AUTOROLE_\d{18}/g;
let potentialAutoRoles = {};
let autoRoles = {};

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');

    for (let envKey in process.env) {
        if(envKey.match(envVarRegEx)) {
            const guildId = envKey.split("_")[2];
            potentialAutoRoles[guildId] = process.env[envKey].split(",")
        }
    }

    for (let potentialGuild in potentialAutoRoles) {
        client.guilds.fetch({
            guild: potentialGuild,
            withCounts: false
        }).then((guild) => {
            let roles = [];
            potentialAutoRoles[guild.id].forEach(potentialRole => {
                guild.roles.fetch(potentialRole).then((role) => {
                    if(role == null) {
                        console.log(`Role ${potentialRole} in guild ${guild.id} (${guild.name}) does not exist. Skipping this role...`)
                    } else {
                        roles.push(role);
                    }
                }).catch(() => {
                    console.log(`Could not fetch role ${potentialRole} in guild ${guild.id} (${guild.name}). Please check whether the bot is connected to this guild. Skipping this role...`)
                })
            })
            autoRoles[guild.id] = roles;
        }).catch(() => {
            console.log(`Could not fetch guild ${potentialGuild}. Please check whether the bot is connected to this guild. Skipping this guild...`)
        })
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if(oldMember.pending === true && newMember.pending === false) {
        if(autoRoles.hasOwnProperty(newMember.guild.id)) {
            newMember.roles.add(autoRoles[newMember.guild.id])
                .catch((err) => {
                    console.log(`Failed to add auto-roles to ${newMember.id} (${newMember.displayName}#${newMember.user.discriminator}):`)
                    console.log(err.name + ": " + err.message)
                });
        }
    }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

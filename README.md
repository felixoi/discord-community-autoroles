# Discord Community Autoroles

Discord bot for automatically adding roles after a completed membership screening (community feature).

All the widely used discord bots like [Dyno](https://dyno.gg) or [Carl](https://carl.gg) only support auto-roles which
will be added on join. Adding a role to the user will automatically verify the user and skip the user's membership
screening (rule acceptance and or phone number verification). This bot tries to fill this gap.

This Bot can be deployed on [Heroku](https://heroku.com) for **free** (you may run into
the [free account limitations](https://devcenter.heroku.com/articles/free-dyno-hours#free-dyno-hour-pool) if you have
multiple applications deployed Heroku or don't have your credit card details verified):   
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Bot Setup

The bot uses [slash commands](https://support.discord.com/hc/de/articles/1500000368501-Slash-Commands-FAQ) for
configuration. These commands can only be used by users with a role which has the `MANAGE_GUILD` (Manage Server)
permission.

## Adding an auto role

```
/welcome-screen-roles add <role> 
```

Adds a role to be automatically added to users on membership screening completion.

As this bot works with the lowest permission level possible (`Manage Roles` only), you need to make sure that the bot's
role (automatically created on join, same as application name by default) is placed above any role the bot should add to
a user.

## Removing an auto role

```
/welcome-screen-roles remove <role> 
```

Removes a role from being automatically added to users on membership screening completion.

## List active auto roles

```
/welcome-screen-roles list 
```

Displays all roles that are automatically added to users after membership screening is complete.

## Setting the log channel

```
/welcome-screen-roles log-channel <channel>
```

Sets the log channel where all errors that occur when adding roles are published.

As this bot works with the lowest permission level possible (`Manage Roles` only), you have to make sure yourself that
the bot has permission to send messages to the configured channel.

# Discord Application Setup

In order to deploy the bot you need to create a new application in
the [Discord Developer Portal](https://discord.com/developers). On the `General Information` tab you can see the
Application Id which is the `DISCORD_CLIENT_ID` you need to configure for this bot.

Switch to the `Bot` tab and create a new bot. You can customize your bot user here. The only setting this bot requires
is to enable `Server Members Intent` in the `Privileged Gateway Intents` section.

Now you can invite the bot to your server with the following link (you need to replace the client id placeholder
manually!):

```
https://discord.com/api/oauth2/authorize?client_id=$DISCORD_CLIENT_ID&permissions=268435456&scope=bot%20applications.commands
```

# Development

Docker-Compose can be used for development purposes. The config is located at the project root. Creating a test
application in the Discord Developer Portal is highly recommended (
see [Discord Application Setup](#discord-application-setup)). Afterwards you first need to copy the `.env.example`
file to `.env` and set the variables accordingly. Now it's as simple as `docker-compose up` (or `docker-compose build`
followed by an `docker-compose up`) to start the development instance.

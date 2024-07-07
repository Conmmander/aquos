# Aquos
An open source Roblox => Discord bot that utilizes the [Aquarius](https://aquarius.conmmander.app) service as it's backend. Aquarius takes advantage of Roblox and Discord's OAuth2 frameworks and implements them for a verification framework.

## Credit
Aquos is built and created by [Conmmander](https://github.com/Conmmander).
All credit for the original Aquarius backend goes to [Neztore](https://github.com/Neztore).

## Installation
Aquos requires a few things to run.
### Requirements
1. [Node.JS/NPM](https://nodejs.org/en/download/package-manager/current)
2. A [Discord Application](https://discord.com/developers) and bot (including ApplicationID, Token, and Public Key).
3. A `.env` and `.env.test` files containing ApplicationID, Token, and Public Key.
4. An active [PostgreSQL](https://www.postgresql.org/) installation (recommend v16+) that is properly configured with user accounts.

### .env Format
Format your .env and .env.test like below, taking care to fill in the bracketed spaces and you'll be fine.
```
applicationID=<applicationIDRemoveBrackets>
publicKey=<publicKeyRemoveBrackets>
token=<tokenRemoveBrackets>
dbUser=<databaseUserRemoveBrackets>
dbPassword=<databaseUserPasswordRemoveBrackets>
```

### Running the bot
You can run Aquos with two commands. Either use `npm run debug` to debug the application, or use `npm run start` to run in production. These will pull from the separate .env files, allowing you to specify what bot application you use and more. It is recommended to set up [PM2](https://pm2.keymetrics.io/) to run the bot, but you can run it on [systemd](https://systemd.io/) or any other service you wish.

## Database Information
This is here more for my own benefit and sanity, but perhaps anyone looking to contribute can take advantage of this as well. This lays out how the data is stored within the database. For simplicity sake, we will assume every table is named with the default values. If you change them, it's on you to figure out how that translates. Tables will attempt to show their datatype as well as a `p` if it is considered the primary key of that table.

### Guilds Table
This table stores guild IDs that the bot has been installed on, and also checks if that guild has been set up. Note that reinstalling a bot will reset the information within this table.
| guild_id(p-bigint) | setup(bool) | setup_date(timestamp) |
| -------- | ----- | ---------- |
| 123      | false |            |
| 789      | true  | 4:21:32    |

### Settings Table
This table stores important setting information for the bot. If a guild does not have a setting defined within this table, it will pull from the default located in the util/settings breakdown, which contains information on all settings.
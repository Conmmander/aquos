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
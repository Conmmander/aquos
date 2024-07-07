// Main configuration - from env
const {
    applicationID,
    publicKey,
    token,

    dbUser,
    dbPassword,
    database = "aquos",
    guildTable = "guilds",
    settingsTable = "settings",
} = process.env;

module.exports = {
    applicationID,
    publicKey,
    token,
    dbUser,
    dbPassword,
    database,
    guildTable,
    settingsTable,
}
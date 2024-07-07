const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');

const clientIntents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration
]

const { token, applicationID } = require('./config');
const { getRobloxFromDiscord } = require('./util/request');

const commands = [
    {
        name: 'update',
        description: 'Updates username and roles',
    }
]

const rest = new REST({ version: '10' }).setToken(token);

console.log("Starting Aquos Discord Bot");
console.log("A Roblox => Discord linking and toolset bot.");

try {
    (async () => {
        console.log("Started refreshing application slash commands.");

        await rest.put(Routes.applicationCommands(applicationID), { body: commands });
        await rest.put(Routes.applicationGuildCommands(applicationID, '1259542686571171850'), { body: commands }); // Adjust to pull list from all existing guilds eventually
        //const Guilds = client.guilds.cache.map(guild => guild.id);

        console.log("Successfully reloaded application slash commands.");
    })();
} catch (error) {
    console.error(error);
    console.error("Failed to reload application slash commands.");
}

const client = new Client({ intents: clientIntents });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (!interaction.guild) {
        await interaction.reply("Slash commands are only available in guilds.");
        return;
    }

    const { commandName, user, member } = interaction;
    if (commandName === 'update') {
        const robloxInfo = await getRobloxFromDiscord(user.id);
        try {
            await member.setNickname(robloxInfo.username, "User requested an update");
            await interaction.reply('Updated successfully');
        } catch(error) {
            console.error(error);
            await interaction.reply(`Failed to update:\n${error}`);
        }
    }
});

client.login(token);
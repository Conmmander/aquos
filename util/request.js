const fetch = require('node-fetch');

const BASE_AQUARIUS_URL = "https://aquarius.conmmander.app";

const profileCache = new Map();

module.exports.getRobloxFromDiscord = async function getRobloxFromDiscord (discordID, overrideCache) {
    // Check cache first before making a request. Saves time and resources.
    if (profileCache.has(discordID) && !overrideCache) {
        return profileCache.get(discordID);
    }

    try {
        const robloxLink = await get(`${BASE_AQUARIUS_URL}/api/roblox/${discordID}`);
        const getRobloxInfo = await get(`https://users.roblox.com/v1/users/${robloxLink.robloxId}`);
        const cacheObject = {
            robloxId: robloxLink.robloxId,
            discordId: discordID,
            username: getRobloxInfo.name,
            displayName: getRobloxInfo.displayName,
            created: getRobloxInfo.created,
            isBanned: getRobloxInfo.isBanned,
        }
        profileCache.set(discordID, cacheObject);
        return cacheObject;
    } catch (error) {
        console.error(error);
        return false;
    }

}

async function get (url, options) {
    const req = await fetch(url, options);
    return req.json();
}
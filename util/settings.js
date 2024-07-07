// This contains a list of all setting options that the bot has.
module.exports.settings = {
    embedColor: {
        settingID: 1,
        settingName: "Embed Color",
        description: "The color of most embeds that the bot will send.",
        data: 0x6B818C,
        type: "hex",
    },
    errorColor: {
        settingID: 2,
        settingName: "Error Color",
        description: "The color of error embeds that the bot will send.",
        data: 0xFF4770,
        type: "hex",
    },
    changeNickname: {
        settingID: 3,
        settingName: "Change Nickname",
        description: "Whether the bot should change the nickname of the user when they join/run update.",
        data: true,
        type: "boolean",
    },
    changeNicknameFormat: {
        settingID: 4,
        settingName: "Change Nickname Format",
        description: "The format of the nickname that the bot will change to. Username is a persons actual Roblox username. Displayname is their Display name, and ID can be used for their Roblox ID.",
        data: "User - {username}, {displayname}, {id}",
        type: "string",
    },
}

module.exports.getSettingData = (settingID) => {
    return this.settings.find(setting => setting.settingID === settingID);
}
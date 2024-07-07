const { EmbedBuilder } = require('discord.js');

module.exports = {
    success: function success (message, color, title = "Success") {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(message)
            .setColor(color);
    },
    error: function error (message, color, title = "Error") {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(message)
            .setColor(color);
    },
    warn: function warn (message, color, title = "Warning") {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(message)
            .setColor(color);
    }
}
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get information about Echostream bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Echostream Bot')
            .setDescription('I am a custom Discord bot providing streaming notifications and server utilities.')
            .setColor(0x0099FF);
        await interaction.reply({ embeds: [embed] });
    },
};

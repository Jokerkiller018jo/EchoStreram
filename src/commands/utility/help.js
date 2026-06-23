const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all available commands'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription('Here are the available commands: \n`/ping` - Check latency\n`/info` - Bot info\n`/setup` - Admin setup\n`/addstreamer` - Add a tracked streamer')
            .setColor(0x0099FF);
        await interaction.reply({ embeds: [embed] });
    },
};

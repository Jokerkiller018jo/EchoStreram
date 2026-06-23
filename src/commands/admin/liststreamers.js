const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const prisma = require('../../database/prisma');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('liststreamers')
        .setDescription('List all tracked streamers in this server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const streamers = await prisma.streamer.findMany({
            where: { guildId: interaction.guild.id }
        });

        if (streamers.length === 0) {
            return interaction.reply({ content: 'No streamers are currently tracked.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('Tracked Streamers')
            .setColor(0x0099FF)
            .setDescription(streamers.map(s => `- **${s.streamerName}** (${s.platform})`).join('\n'));

        await interaction.reply({ embeds: [embed] });
    },
};

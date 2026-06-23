const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const prisma = require('../../database/prisma');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addstreamer')
        .setDescription('Add a streamer to track.')
        .addStringOption(option => option.setName('platform').setDescription('twitch or youtube').setRequired(true))
        .addStringOption(option => option.setName('username').setDescription('Streamer username or ID').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const platform = interaction.options.getString('platform').toLowerCase();
        const username = interaction.options.getString('username');
        
        if (platform !== 'twitch' && platform !== 'youtube') {
            return interaction.reply({ content: 'Platform must be twitch or youtube.', ephemeral: true });
        }

        await prisma.streamer.create({
            data: {
                platform,
                streamerId: username, // Would lookup actual ID via API usually
                streamerName: username,
                guildId: interaction.guild.id,
            }
        });

        await interaction.reply({ content: `Successfully added ${username} on ${platform} to tracking list.`, ephemeral: true });
    },
};

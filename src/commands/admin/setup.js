const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const prisma = require('../../database/prisma');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Set up the bot for this server.')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to post announcements in').setRequired(true))
        .addRoleOption(option => option.setName('liverole').setDescription('The role to ping when someone goes live').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const role = interaction.options.getRole('liverole');

        await prisma.guild.upsert({
            where: { guildId: interaction.guild.id },
            update: {
                announcementChannel: channel.id,
                liveRole: role ? role.id : null,
            },
            create: {
                guildId: interaction.guild.id,
                announcementChannel: channel.id,
                liveRole: role ? role.id : null,
            },
        });

        await interaction.reply({ content: `Setup complete! Announcements will be sent to ${channel}.`, ephemeral: true });
    },
};

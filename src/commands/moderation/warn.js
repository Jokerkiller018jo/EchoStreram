const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a member.')
        .addUserOption(option => option.setName('target').setDescription('The member to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for the warning').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        
        // Normally this would log to a database.
        await interaction.reply(`Warned ${target.username}. Reason: ${reason}`);
    },
};

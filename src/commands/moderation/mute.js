const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Timeout a member.')
        .addUserOption(option => option.setName('target').setDescription('The member to mute').setRequired(true))
        .addIntegerOption(option => option.setName('minutes').setDescription('Duration in minutes').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const minutes = interaction.options.getInteger('minutes');
        
        const member = await interaction.guild.members.fetch(target.id);
        if (!member) return interaction.reply({ content: 'Member not found', ephemeral: true });
        
        await member.timeout(minutes * 60 * 1000);
        await interaction.reply(`Successfully muted ${target.username} for ${minutes} minutes.`);
    },
};

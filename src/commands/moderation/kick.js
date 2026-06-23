const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member and kick them.')
        .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);
        
        if (!member) return interaction.reply({ content: 'Member not found', ephemeral: true });
        
        await member.kick();
        await interaction.reply(`Successfully kicked ${target.username}`);
    },
};

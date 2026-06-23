const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member and ban them.')
        .addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        await interaction.guild.members.ban(target);
        await interaction.reply(`Successfully banned ${target.username}`);
    },
};

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const prisma = require('../../database/prisma');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removestreamer')
        .setDescription('Remove a streamer from tracking.')
        .addStringOption(option => option.setName('username').setDescription('Streamer username').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const username = interaction.options.getString('username');
        
        const result = await prisma.streamer.deleteMany({
            where: {
                guildId: interaction.guild.id,
                streamerName: username,
            }
        });

        if (result.count > 0) {
            await interaction.reply({ content: `Successfully removed ${username}.`, ephemeral: true });
        } else {
            await interaction.reply({ content: `${username} was not found in tracking list.`, ephemeral: true });
        }
    },
};

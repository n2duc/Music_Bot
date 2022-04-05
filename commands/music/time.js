const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát. ` });

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send({ content: `Bài hát này đang phát trực tiếp, không có dữ liệu thời lượng để hiển thị. 🎧` });

        const saveButton = new MessageButton();

        saveButton.setLabel('Update');
        saveButton.setCustomId('time');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(queue.current.title)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(`${progress} (**${timestamp.progress}**%)`)
            .setFooter({ text: 'Music Bot - N2DUC', iconURL: message.author.displayAvatarURL({ dynamic: true }) });
        message.channel.send({ embeds: [embed], components: [row] });
    },
};
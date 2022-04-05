const Discord = require('discord.js');
module.exports = {
    name: 'save',
    aliases: [],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát. ❌` });

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(client.user.username + " - Save Track")
            .setThumbnail(client.user.displayAvatarURL())
            .addField(`Track`, `\`${queue.current.title}\``)
            .addField(`Thời gian`, `\`${queue.current.duration}\``)
            .addField(`URL`, `${queue.current.url}`)
            .addField(`Máy chủ`, `\`${message.guild.name}\``)
            .addField(`Yêu cầu bởi`, `${queue.current.requestedBy}`)
            .setTimestamp()
            .setFooter({ text: 'Music Bot - N2DUC', iconURL: message.author.avatarURL({ dynamic: true }) });
        message.author.send({ embeds: [embed] }).then(() => {
            message.channel.send({ content: `Đã gửi tên của bài hát qua tin nhắn riêng. 😘` });
        }).catch(error => {
            message.channel.send({ content: `${message.author}, Không thể gửi cho bạn tin nhắn riêng tư. ❌` });
        });
    },
};
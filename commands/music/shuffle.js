module.exports = {
    name: 'shuffle',
    aliases: ['sff'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát. ` });

        const success = queue.shuffle();

        return message.channel.send({ content: success ? `**${queue.current.title}**, Shuffled ✅` : `${message.author}, Đã xảy ra sự cố ` });
    },
};
module.exports = {
    name: 'skip',
    aliases: ['s'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát. ` });

        const success = queue.skip();

        return message.channel.send({ content: success ? `**${queue.current.title}**, Skipped ✅` : `${message.author}, Đã xảy ra sự cố ` });
    },
};
module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát !.` });

        const success = queue.setPaused(true);

        return message.channel.send({ content: success ? `Bài hát đang phát **${queue.current.title}** đã dừng` : `${message.author}, Đã xảy ra lỗi.` });
    },
};
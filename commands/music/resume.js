module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát. ❌` });

        const success = queue.setPaused(false);

        return message.channel.send({ content: success ? `**${queue.current.title}**, Bài hát tiếp tục phát` : `${message.author}, Đã xảy ra lỗi. ❌` });
    },
};
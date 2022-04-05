module.exports = {
    name: 'leave',
    aliases: ['lv'],
    utilisation: '{prefix}leave',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát.` });

        queue.destroy();

        message.channel.send({ content: `Nhạc đang phát trên kênh này đã bị tắt, hẹn gặp lại các bạn lần sau !` });
        message.react('✅');
    },
};
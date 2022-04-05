module.exports = {
    name: 'clear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát. ❌` });

        if (!queue.tracks[0]) return message.channel.send({ content: `${message.author}, Không có bài hát nào trong hàng đợi sau bài hát hiện tại ❌` });

        await queue.clear();

        message.channel.send({ content: `Hàng đợi vừa được xóa. 🗑️` });
    },
};
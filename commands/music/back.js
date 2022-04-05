module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát! ❌` });

        if (!queue.previousTracks[1]) return message.channel.send({ content: `${message.author}, Không có bài hát nào được phát trước đây ❌` });

        await queue.back();

        message.channel.send({ content: `Bài hát trước đó đã bắt đầu phát... ✅` });
    },
};
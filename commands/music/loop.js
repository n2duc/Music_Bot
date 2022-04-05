const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);


        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát.` });

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send({ content: `${message.author}, Trước tiên, bạn nên tắt chế độ lặp của nhạc hiện có **(${client.config.px}loop)**` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}** 🔁` : `${message.author}, Đã xảy ra sự cố.` });
        } else {
            if (queue.repeatMode === 2) return message.channel.send({ content: `${message.author}, Ở chế độ Vòng lặp, trước tiên bạn phải tắt hàng đợi hiện có **(${client.config.px}loop queue)**` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, (Để lặp tất cả bài hát trong danh sách: **${client.config.px}loop queue**) 🔂` : `${message.author}, Đã xảy ra sự cố ` });
        };
    },
};
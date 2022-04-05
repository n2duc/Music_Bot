const maxVol = require("../../config.js").opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bài hát nào đang phát. ` });

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({ content: `Âm lượng hiện tại: **${queue.volume}** 🔊\n**Để thay đổi âm lượng, với \`1\` đến \`${maxVol}\` Nhập 1 số ở giữa**` });

        if (queue.volume === vol) return message.channel.send({ content: `${message.author}, Âm lượng bạn muốn thay đổi đã là âm lượng hiện tại ` });

        if (vol < 0 || vol > maxVol) return message.channel.send({ content: `${message.author}, **Nhập một số từ \`1\` đến \`${maxVol}\` để thay đổi âm lượng.** ` });

        const success = queue.setVolume(vol);

        return message.channel.send({ content: success ? `Âm lượng đã thay đổi: **%${vol}**/**${maxVol}** 🔊` : `${message.author}, Đã xảy ra lỗi. ` });
    },
};
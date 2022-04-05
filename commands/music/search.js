const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
        name: 'search',
        aliases: [],
        utilisation: '{prefix}search [song name]',
        voiceChannel: true,

        async execute(client, message, args) {

            if (!args[0]) return message.channel.send({ content: `${message.author}, Vui lòng nhập tên bài hát hợp lệ. ❌` });

            const res = await client.player.search(args.join(' '), {
                requestedBy: message.member,
                searchEngine: QueryType.AUTO
            });

            if (!res || !res.tracks.length) return message.channel.send({ content: `${message.author}, Không tìm thấy kết quả tìm kiếm. ❌` });

            const queue = await client.player.createQueue(message.guild, {
                metadata: message.channel
            });

            const embed = new MessageEmbed();

            embed.setColor('BLUE');
            embed.setTitle(`Nhạc đã tìm: ${args.join(' ')}`);

            const maxTracks = res.tracks.slice(0, 10);

            embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nChọn một bài hát từ **1** đến **${maxTracks.length}** viết hoặc gửi **Hủy bỏ** và hủy lựa chọn.⬇️`);

        embed.setTimestamp();
        embed.setFooter({ text: 'N2DUC', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({ content: `Đã hủy. ✅` }) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({ content: `Error: Chọn một bài hát từ **1** đến **${maxTracks.length}** viết hoặc gửi **Hủy bỏ** và hủy lựa chọn. ❌` });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send({ content: `${message.author}, Tôi không thề vào voice channel. ❌` });
            }

            await message.channel.send({ content: `Đang tải bài hát của bạn gọi... 🎧` });

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send({ content: `${message.author}, Thời gian tìm kiếm bài hát đã hết hạn ❌` });
        });
    },
};
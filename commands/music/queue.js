const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);


        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Hiện không có bản nhạc nào đang phát !.` });

        if (!queue.tracks[0]) return message.channel.send({ content: `${message.author}, Không có bài hát nào trong hàng đợi.` });

        const embed = new MessageEmbed();
        const methods = ['🎵', '🎶'];

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`Server Music List - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (<@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Và **${songs - 5}** bài hát khác...` : `Có **${songs}** bài hát trong danh sách.`;

        embed.setDescription(`Hiện đang phát: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        embed.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    },
};
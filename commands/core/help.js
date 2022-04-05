const { MessageEmbed } = require('discord.js');

module.exports = {
        name: 'help',
        aliases: ['h', 'help'],
        showHelp: false,
        utilisation: '{prefix}help',

        execute(client, message, args) {
            const embed = new MessageEmbed();

            embed.setColor('BLUE');
            embed.setTitle(client.user.username);
            embed.setAuthor({ name: 'DÂN CHƠI NGHE NHẠC', iconURL: message.author.avatarURL({ dynamic: true }) })
            embed.setDescription('Prefix của bot là: `n`')
            embed.setThumbnail(client.user.displayAvatarURL())
            const commands = client.commands.filter(x => x.showHelp !== false);

            embed.addField(`Khả dụng - ${commands.size} Lệnh Khả Dụng`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases[0]})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter({ text: message.author.tag, iconURL:message.author.avatarURL({ dynamic: true }) });
        message.channel.send({ embeds: [embed] });
    },
};
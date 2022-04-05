module.exports = {
    TOKEN: 'OTYwODgzNDM5MTEwODc3MTk0.Ykw6cA.4hloI7WbsAi7XvJijC5Jr8qHeoQ',
    px: 'n',
    listening: 'Đức dân chơi',

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'leave', 'volume']
        },
        selfDeaf: true,
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
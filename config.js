module.exports = {
    TOKEN: 'Token of Bot',
    px: 'prefix',
    listening: 'Type',

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

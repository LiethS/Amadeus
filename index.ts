import DiscordJS, { Guild, Intents, Message, SystemChannelFlags } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

//RUN COMMAND: "ts-node index.ts" TO START!!!

const prefix = '%'
const help = '' +
    '---------------------------------------------' +
    '\n__**HELP COMMANDS**__:\n' +
    '\t**help** - Sends you a DM with a list of commands, IT\'S HOW YOU GOT HERE!\n' +
    '\t**ping** - To test if I am awake right now\n' +

    '\n__**FUN COMMANDS**__:\n' +
    '\t**wink** - Just winks at you\n' +

    '\n__**RANDOMIZER COMMANDS**__:\n' +
    '\t**dice** - I will roll a dice for you\n' +
    '\t**coin** - I will simulate a coin flip for you\n' +
    '\t**randomize** - I will randomizes a number with a range from 0-100, you can change the maximum by adding another arguement (' + prefix + 'randomize 200)\n' +

    //'\n__**MONEY COMMANDS**__:\n' +
    //'\t**guess** - You have 4 guesses to figure out what number I\'m thinking of from 1-100\n' +
    //'\t**challange** - A battle between you and another user, money on the line if wanted (' + prefix + 'challange @user "amount to bet") winner takes all\n' +
    //'\t**** - Amadeus will simulate a coin flip for you\n' +
    '---------------------------------------------'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('guildCreate', guild => {
    guild.systemChannel?.send('Hi everyone, I\'m Amadeus. Use' + prefix + 'help to learn how to use my commands.')
})

client.on('ready', () => {
    console.log('The bot is ready (CTRL+C)')
    client.user?.setActivity(prefix + 'help for commands')
})

client.on('messageCreate', (message) => {
    if (message.content.startsWith(prefix)) {
        var command = message.content.split(' ')[0].substring(1)
        var args = message.content.split(' ').slice(1)

        switch (command) {
            case 'help':
                message.reply({
                    content: 'I\'ve sent you a DM with all of my capabilites. Have fun!'
                })
                message.author.send({
                    content: help
                })
                break
            case 'ping':
                message.reply({
                    content: 'pong'
                })
                break
            case 'wink':
                switch (args[0]) {
                    case "1":
                        message.reply({
                            content: 'https://imgur.com/jQqpDEw'
                        })
                        break
                    case "2":
                        message.reply({
                            content: 'https://imgur.com/2WOTQNj'
                        })
                        break
                    default:
                        var ran = Math.floor(Math.random() * 2)
                        if (ran === 0) {
                            message.reply({
                                content: 'https://imgur.com/jQqpDEw'
                            })
                        }
                        else if (ran === 1) {
                            message.reply({
                                content: 'https://imgur.com/2WOTQNj'
                            })
                        }
                        break
                }
                break
            case 'dice':
                var ran = Math.floor(Math.random() * 6) + 1
                message.reply({
                    content: ran.toString()
                })
                break
            case 'coin':
                var ran = Math.floor(Math.random() * 2)
                if (ran === 0) {
                    message.reply({
                        content: 'You got **Heads**!'
                    })
                }
                else if (ran === 1) {
                    message.reply({
                        content: 'You got **Tails**!'
                    })
                }
                break
            case 'randomize':
                if (parseInt(args[0]) > 0) {
                    var ran = Math.floor(Math.random() * (parseInt(args[0]) + 1))
                    message.reply({
                        content: ran.toString()
                    })
                }
                else {
                    var ran = Math.floor(Math.random() * 101)
                    message.reply({
                        content: ran.toString()
                    })
                }
                break
            // case 'guess':
            //     var ran = Math.floor(Math.random() * 100) + 1
            //     message.channel.send('I have a number in mind you have 4 guesses good luck!!').then(() => {
            //         message.channel.awaitMessages(filter, {
            //             max: 1,
            //             time: 30000,
            //             errors: ['time']
            //         })
            //             .then(message => {
            //                 message = message.first()
            //                 if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
            //                     message.channel.send(`Deleted`)
            //                 } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
            //                     message.channel.send(`Terminated`)
            //                 } else {
            //                     message.channel.send(`Terminated: Invalid Response`)
            //                 }
            //             })
            //             .catch(collected => {
            //                 message.channel.send('Timeout');
            //             });
            //     })
            //     break

        }
    }
})

client.login(process.env.TOKEN)
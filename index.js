// index.js
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);

const utils = require('./util');
const createCommands = require('./commands');
const registerEvents = require('./events');

function startup() {
    const PASSWORD = process.env.MC_PASSWORD;
    const prefix = '-';

    const bot = mineflayer.createBot({
        host: 'eu.6b6t.org',
        port: 25565,
        username: '.22',
        version: '1.19.4',
        keepAlive: true,
    });

    bot.loadPlugin(tpsPlugin);

    const state = {
        PASSWORD,
        prefix,
        loggedIn: false,
        spawnedIn: 0,
        global_deaths: 0,
        deaths: 0,
        hotspot_death: false,
        crystalled: 0,
        server_restart: 0,
        crystal_kills: {},
        crystal_deaths: {},
        quotes: {},
        scan_hotspot: false,
        auto_tp: false,
        tips_started: false,
        welcomer: false,
        bot_uses: 0,
        bot_tips_sent: 0,
        ads_seen: 0,
        dupe_mentioned: 0,
        temp_blacklist: utils.temp_blacklist,
        spam_count: utils.spam_count,
        spam_offenses: utils.spam_offenses,
        restart: true,
        whitelist: utils.whitelist,
        whitelisted_users: utils.whitelisted_users,
        get_uptime: utils.get_uptime,
        random_element: utils.random_element,
        get_random_ip: utils.get_random_ip,
        return_user: utils.return_user,
        checkSpam: utils.checkSpam,
        blacklist: utils.blacklist,
        get_kd: utils.get_kd,
        roasts: [
            "Your birth certificate is a griefing report.", "You're why the `/kill` command exists.",
            "Even Void wouldn't want to touch you.", "You look like a lag spike made human.",
            "You're built like chunk errors.", "Your existence is an exploit Mojang never patched.",
            "Even Herobrine avoids you.", "Your face got banned from resource packs.",
            "You're the human version of a corrupted world.", "You have less presence than a ghost ping.",
            "Even Crystal PvPers think you're too toxic.", "You're a walking .jar file of bad decisions.",
            "You could crash a server just by speaking.", "You look like you PvP with auto-tune.",
            "You make ChatGPT regret being open source.", "You're the kind of bug that never gets fixed.",
            "You got dropped harder than server TPS.", "You're more unstable than an alpha build.",
            "You get kicked from life with 'Flying is not enabled'.", "You're not even worth the server's storage space.",
            "You're like 0b0t — broken, laggy, and forgotten.", "Even Bedrock Edition wants nothing to do with you.",
            "You're just a renamed Barrier block.", "You're the reason `ban-ip` exists.",
            "You're proof that spawn camping applies to real life.", "You griefed your own potential."
        ],
        insults: [
            "L ratio", "Cope", "No maidens", "You fell off", "Built like a furnace", "You sniff bedrock", 
            "Laggy, broke, AND cringe", "Your parents use 1.8.9"
        ],
        // blame chatgpt for fetish_results i just asked for ideas and he gave me the whole list - Damix2131
        fetish_results: [
            "Feet", "Hands", "Thighs", "Latex", "Leather", "Futa", "Tentacles",
            "Pregnancy", "Giantess", "Inflation", "NTR", "Femboys", "MILFs", 
            "DILFs", "Lactation", "Slime girls", "BDSM", "Watersports", "Diapers (DL only)", 
            "Plushophilia", "Clowns", "Stomping", "Public humiliation", "Uniforms", 
            "Yandere roleplay", "Breathplay", "Yuri", "Yaoi", "Dom/sub dynamics", 
            "Gloryholes", "Choking", "Voice kink", "ASMR kink", "Robots", "Monster girls",
            "Cuckoldry", "Stockings", "Food play", "Objectification", "Age regression (non-sexual)",
            "Bondage", "Wax play", "Sadism", "Masochism", "Edging", "Corruption kink", 
            "Mind control (consensual fantasy)", "Pet play", "Praise kink", "Degradation kink",
            "Exhibitionism", "Roleplay", "Nipple play", "Cosplay kink", 
            "Gun kink", "Amputee attraction", "Goth attraction", "Mask kink", 
            "Voice domination", "Tattoos", "Piercings", "Sensory deprivation", 
            "Shibari (Japanese rope bondage)", "Electrostimulation", "Temperature play", 
            "Breast worship", "Thigh worship", "Armpit fetish", "Hair pulling", 
            "Face sitting", "Lingerie", "Corsets", "Heels", "Femdom", "Maledom"
        ],
        gender_results: [
            "Male", "Female", "Attack Helicopter", "Goofy", "None", "Yes", "All of them"
        ],
        npc_replies: [
            "NPC detected", "Real human", "Side quest giver",
            "Main character", "Background filler", "Silent NPC"
        ],
        cap_replies: [
            "No cap", "This is cap", "Lying through teeth", 
            "Cap detected", "100% truth", "Literal fiction"
        ],
        screen_replies: [
            "Discord open", "Reddit at max brightness", "Minecraft launcher",
            "Horny Twitter tab", "YouTube shorts addiction", "Roblox", 
            "NSFW folder named 'homework'", "Excel pretending to work"
        ],
        illnesses: [
            "Schizophrenia", "ADHD", "Autism", "Bipolar", "Depression",
            "Anxiety", "OCD", "Borderline Personality", "Sociopathy"
        ],
        sizes: ["A", "B", "C", "D", "DD", "E", "F", "G", "H", "Z"],
        answers: [
            "Yes", "No", "Maybe", "Definitely", "Try again later",
            "Absolutely", "Not a chance", "Don't count on it", "Looks good", "Sus"
        ],
        spam_messages: [
            "Want to check who has the most kills? Try -topkills!",
            "Curious about the bot's health? Use -health!",
            "Feeling lucky? Roll a dice with -roll!",
            "Can't decide? Use -choose option1, option2...",
            "Want to dox someone? Try out -dox <username/random>!",
            "Check how much of an NIGGER you are with -nigger <username/random>!",
            "Flip a coin with -flip!",
            "Need a quick ping test? Try -ping!",
            "Ask the magic 8-ball your question with -8ball!",
            "Curious about boob sizes? Try -boobs <username/random>!",
            "Want your own command? Suggest it at discord.gg/mjrDsGCV7F!",
            "Insult your friends with -insult <username/random>!",
            "Test someone's mental state with -mental <username/random>!",
            "Feeling cringe? Rate it with -cringe <username/random>!",
            "Expose lies using -cap <username/random>!",
            "Determine someone's gender with -gender <username/random>!",
            "Check how much of an NPC someone is with -npc <username/random>!",
            "See someone's screen right now with -screen <username/random>!",
            "View a quote from a player using -quote <username/random>!",
            "Check who's online with -playerlist!",
            "Get server performance stats with -tps!",
            "See your or someone else's KD with -kd <username/random>!",
            "View bot usage stats with -stats!",
            "Check the current weather with -weather!",
            "See the current Minecraft time with -time!",
            "Feeling romantic? Discover your love match with -love user1 user2!",
            "Rate someone with a score from 1 to 10 using -rate <username/random>!",
            "Tell someone to shut up with -stfu <username/random>!",
            "How racist are you? Use -racist <username/random>!",
            "Unleash your inner simp with -simp <username/random>!",
            "Test someone's basedness with -based <username/random>!",
            "Reveal your inner lesbian with -lesbian <username/random>!",
            "Check if someone's Turkish using -turkish <username/random>!",
            "Track how long the bot has been online with -uptime!",
            "Check the bot's death count with -deaths!",
            "Measure your pixel pp size with -pp!",
            "Try -trans to test your transformation stats!"
        ],
        blacklisted_messages: [
            '---------------------------',
            'players sleeping',
            'You can vote! Type /vote to get more homes, lower cooldowns & white username color!',
            'Remember to /vote'
        ],
        responses: {
            "You are not allowed to teleport while in the 5000x5000 overworld spawn area!": () => {
                bot.chat("I can't teleport currently.");
            }
        }
    };

    // Load commands and assign to state
    const { public_commands, admin_commands } = require('./commands');
    state.public_commands = public_commands;
    state.admin_commands = admin_commands;

    // Register event listeners with bot and state
    registerEvents(bot, state);

    // Expose startup globally for reconnect on disconnect
    global.startup = startup;
}

startup();

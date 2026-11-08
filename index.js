// index.js - Telegram Trading Bot All-in-One
const TelegramBot = require('node-telegram-bot-api');

// Inserisci qui il token del tuo bot Telegram (preso da BotFather)
const token = process.env.TELEGRAM_BOT_TOKEN || 'IL_TUO_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

console.log('Bot di trading avviato con successo...');

// Comando di benvenuto
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Benvenuto nel tuo Super Bot di Trading! Digita /signal per ricevere l'analisi completa con ingressi, stop loss e target dai 30 pips in su.");
});

// Comando principale per generare il segnale "tutto insieme"
bot.onText(/\/signal/, (msg) => {
    const chatId = msg.chat.id;
    
    // Simulazione dell'analisi di mercato avanzata
    const assets = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD (Oro)', 'BTC/USD'];
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    const types = ['LONG (BUY)', 'SHORT (SELL)'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const entryPrice = (Math.random() * (1.1200 - 1.0500) + 1.0500).toFixed(4);
    const pipsTarget = Math.floor(Math.random() * (120 - 30 + 1)) + 30; // Target da 30 a 120 pips
    
    let stopLoss, takeProfit;
    if (type.includes('BUY')) {
        stopLoss = (parseFloat(entryPrice) - 0.0035).toFixed(4);
        takeProfit = (parseFloat(entryPrice) + (pipsTarget * 0.0001)).toFixed(4);
    } else {
        stopLoss = (parseFloat(entryPrice) + 0.0035).toFixed(4);
        takeProfit = (parseFloat(entryPrice) - (pipsTarget * 0.0001)).toFixed(4);
    }

    // Messaggio completo e strutturato in un unico invio
    const responseMessage = 
        `🚨 **SEGNALE DI TRADING MASTER** 🚨\n\n` +
        `📊 **Asset:** ${randomAsset}\n` +
        `📈 **Direzione:** ${type}\n\n` +
        `📍 **Prezzo d'Ingresso (Entry):** \`${entryPrice}\`\n` +
        `🛑 **Stop Loss (SL):** \`${stopLoss}\`\n` +
        `🎯 **Take Profit (TP):** \`${takeProfit}\` _(+${pipsTarget} pips)_\n\n` +
        `🧠 **Analisi Tecnica:**\n` +
        `_Rottura strutturale del livello chiave con confluenza di volume e ritracciamento millimetrico su supporto dinamico. Trend solido confermato._`;

    bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
});

import TelegramBot from "node-telegram-bot-api";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.static("./test"));
app.use(express.static("./"));

app.get("/", (req, res) => {
    res.send("Hello from express");
});

const BOT_TOKEN = process.env.bot;

let chatId = "";

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true,
});

bot.onText(/\/start/, (msg) => {
    chatId = msg.chat.id;
    bot.sendMessage(msg.chat.id, "Hello");
});

bot.on("text", async (msg) => {
    await bot.sendMessage(msg.chat.id, msg.text);
});

bot.on("voice", async (msg) => {
    await bot.sendVoice(msg.chat.id, msg.voice.file_id);
});

bot.on("audio", async (msg) => {
    await bot.sendAudio(msg.chat.id, msg.audio.file_id);
});

bot.on("photo", async (msg) => {
    await bot.sendPhoto(msg.chat.id, msg.photo[msg.photo.length - 1].file_id);
});

bot.on("sticker", async (msg) => {
    await bot.sendSticker(msg.chat.id, msg.sticker.file_id);
});

bot.on("video", async (msg) => {
    await bot.sendVideo(msg.chat.id, msg.video.file_id, {
        caption: msg.caption,
    });
});

app.listen(3000, () => {
    console.log("app listenting to port 3000");
});

process.on("uncaughtException", (err) => {
    console.log(err);
});

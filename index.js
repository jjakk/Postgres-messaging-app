const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/" , async (req, res) => {
    const { rows: chats } = await db.query('SELECT * FROM chats', []);
    res.render("index", { chats });
});

app.get("/chat/:chat_id/", async (req, res) => {
    const { chat_id } = req.params;
    const { rows: messages } = await db.query('SELECT * FROM messages WHERE chat_id = $1', [chat_id]);
    res.return = messages;
});

app.get("/chat/:chat_id/:user_id", async (req, res) => {
    const { chat_id, user_id } = req.params;
    const { rows: messages } = await db.query('SELECT * FROM messages WHERE chat_id = $1', [chat_id]);
    res.render("chat", { messages, chat_id, user_id });
});

app.post("/message/:user_id/:chat_id", async (req, res) => {
    const { user_id, chat_id } = req.params;
    const { message } = req.body;
    await db.query('INSERT INTO messages (chat_id, text, author_id) VALUES ($1, $2, $3)', [chat_id, message, user_id]);
    res.redirect(`/chat/${chat_id}/${user_id}`);
});

app.post("/login", async (req, res) => {
    const {
        user_id,
        chat_id
    } = req.body;
    if(!user_id || !chat_id) return res.redirect("/");
    // if user doesn't exist, create it
    let { rows: [user] } = await db.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if(!user) await db.query("INSERT INTO users (id) VALUES ($1)", [user_id]);

    // if chat doesn't exist create it
    let { rows: [chat] } = await db.query("SELECT * FROM chats WHERE id = $1", [chat_id]);
    if(!chat) await db.query("INSERT INTO chats (id) VALUES ($1)", [chat_id]);

    // if user is not in chat, add them
    let { rows: [chatMembership] } = await db.query("SELECT * FROM chat_membership WHERE user_id = $1 AND chat_id = $2", [user_id, chat_id]);
    if(!chatMembership) await db.query("INSERT INTO chat_membership (user_id, chat_id) VALUES ($1, $2)", [user_id, chat_id]);

    res.redirect(`/chat/${chat_id}/${user_id}`);
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
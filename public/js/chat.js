// Scroll to the bottom of the chat windows to see the latest messages
let chatBox = document.getElementById("chatbox");
chatBox.scrollTop = chatBox.scrollHeight;
let socket = io();
socket.on(`reload ${chat_id}`, () => {
    window.location.reload();
});
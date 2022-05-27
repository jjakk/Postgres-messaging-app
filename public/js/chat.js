// Scroll to the bottom of the chat windows to see the latest messages
window.onload = () => {
    let chatBox = document.getElementById("chatbox");
    chatBox.scrollTop = chatBox.scrollHeight;
};
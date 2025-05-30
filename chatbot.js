
const chatbotButton = document.getElementById("chatbot-button");

const chatbotBox = document.createElement("div");
chatbotBox.id = "chatbot-box";
chatbotBox.innerHTML = `
  <div id="chat-window">
    <div id="chat-messages"></div>
    <input id="chat-input" type="text" placeholder="Nhập câu hỏi..." />
  </div>
`;
document.body.appendChild(chatbotBox);

chatbotButton.addEventListener("click", () => {
  chatbotBox.classList.toggle("visible");
});

document.getElementById("chat-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const userMessage = this.value;
    if (!userMessage) return;
    appendMessage("👤", userMessage);
    this.value = "";
    fetch("https://gpt-demo-ti.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userMessage })
    })
      .then((res) => res.json())
      .then((data) => {
        appendMessage("🤖", data.reply || "Không có phản hồi.");
      })
      .catch(() => appendMessage("🤖", "Lỗi kết nối, vui lòng thử lại."));
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = sender + " " + text;
  document.getElementById("chat-messages").appendChild(msg);
}

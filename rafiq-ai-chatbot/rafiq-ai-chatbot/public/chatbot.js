const messagesEl = document.getElementById("messages");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(content, sender, isImage = false) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  if (isImage) {
    // This branch will never be used now, but leave for easy future media restore
  } else {
    div.textContent = content;
  }
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Handle text messages
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";

  // Show loading indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("message", "bot");
  loadingDiv.textContent = "Thinking...";
  messagesEl.appendChild(loadingDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
    .then(res => res.json())
    .then(data => {
      messagesEl.removeChild(loadingDiv);
      addMessage(data.reply, "bot");
    })
    .catch(error => {
      messagesEl.removeChild(loadingDiv);
      addMessage("❌ Sorry, an error occurred. Please try again.", "bot");
      console.error("Error:", error);
    });
}

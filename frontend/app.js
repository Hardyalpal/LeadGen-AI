const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

function appendMessage(text, sender = 'bot', html = false) {
  const el = document.createElement('div');
  el.className = `message ${sender}`;
  if (html) {
    el.innerHTML = text;
  } else {
    el.textContent = text;
  }
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  messageInput.value = '';

  appendMessage('Generating leads, please wait...', 'bot');

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Remove "please wait" message
    const loading = chatBox.querySelector('.message.bot:last-child');
    if (loading && loading.textContent.includes('please wait')) {
      loading.remove();
    }

    if (!response.ok || !data.success) {
      appendMessage(data.error || 'Unable to process your request right now.', 'bot');
      return;
    }

    appendMessage(
      `${data.message}<br/><br/>` +
        `<strong>Parsed Query:</strong> ${JSON.stringify(data.parsedQuery)}<br/>` +
        `<strong>CSV:</strong> <a href="${data.downloadUrl}" target="_blank" rel="noopener">Download Leads CSV</a>`,
      'bot',
      true
    );
  } catch (error) {
    appendMessage('Network/server error occurred. Please try again.', 'bot');
  }
});

appendMessage('Hello! Ask me to find leads (e.g. "Find 20 dentists in Delhi with no website").', 'bot');

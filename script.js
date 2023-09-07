document.addEventListener('DOMContentLoaded', function() {
  const chatContainer = document.getElementById('chat-container');
  const userInput = document.getElementById('user-input');

  function appendMessage(from, message) {
      const chatMessage = document.createElement('div');
      chatMessage.classList.add('message', from === 'bot' ? 'bot-message' : 'user-message');
      const messageContent = document.createElement('span');
      messageContent.classList.add('message-content');
      messageContent.textContent = message;
      chatMessage.appendChild(messageContent);
      chatContainer.appendChild(chatMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function sendMessage() {
      const userMessage = userInput.value.trim();
      if (userMessage) {
          appendMessage('You', userMessage);
          userInput.value = '';
          getResponse(userMessage);
      }
  }

  userInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent form submission
          sendMessage();
      }
  });

  function getResponse(userInput) {
      fetch('/get_response', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userInput: userInput })
      })
      .then(response => response.json())
      .then(data => {
          const botResponse = data.response;
          appendMessage('Chatbot', botResponse);
      })
      .catch(error => console.error('Error:', error));
  }
});


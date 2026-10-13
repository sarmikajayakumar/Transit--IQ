/**
 * Smoothly scrolls the viewport to the Chatbot area and focuses input
 */
export function scrollToChat() {
  const chatEl = document.getElementById('chat-area');
  if (chatEl) {
    chatEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // High-contrast editorial highlight ring on arrival
    chatEl.classList.add('ring-4', 'ring-[#0A0A0A]', 'transition-all', 'duration-300');
    setTimeout(() => {
      chatEl.classList.remove('ring-4', 'ring-[#0A0A0A]');
    }, 1500);

    // Focus the chat text input after scrolling
    setTimeout(() => {
      const input = chatEl.querySelector('input');
      if (input) {
        input.focus();
      }
    }, 500);
  }
}

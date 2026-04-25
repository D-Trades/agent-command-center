// ChatInput.jsx — Full-width message input bar at bottom of screen

export default function ChatInput({ selectedAgent, onSend, disabled }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val) {
        onSend(val);
        e.target.value = '';
      }
    }
  }

  function handleClick(e) {
    const input = e.currentTarget.previousSibling;
    const val = input?.value?.trim();
    if (val && !disabled) {
      onSend(val);
      input.value = '';
    }
  }

  const accent = selectedAgent?.accent ?? '#ff8c3a';
  const placeholder = selectedAgent
    ? `Message ${selectedAgent.name} (${selectedAgent.code})…`
    : 'Select an agent to start chatting…';

  return (
    <div className="chat-input-bar">
      <input
        className="chat-input"
        type="text"
        placeholder={placeholder}
        disabled={!selectedAgent || disabled}
        onKeyDown={handleKeyDown}
        maxLength={2000}
      />
      <button
        className="btn-send"
        style={selectedAgent ? { background: accent, color: '#000' } : {}}
        disabled={!selectedAgent || disabled}
        onClick={handleClick}
      >
        SEND
      </button>
    </div>
  );
}

import { useState } from "react";
import { icons } from "../../../../public/icons/icons";
import "./Sidebar.css";

const Sidebar = ({ chatHistory, newChat, loadChat }) => {
  const [extended, setExtended] = useState(false);

  return (
    <div className={`sidebar-loki ${extended ? 'extended' : ''}`}>
      <div className="top-loki">
        <img 
          onClick={() => setExtended(!extended)} 
          src={icons.menu_icon} 
          alt="Menu" 
          className="menu-loki" 
        />
        
        <div className="new-chat-loki" onClick={newChat}>
          <img src={icons.plus_icon} alt="New chat" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent-section-loki">
            <p className="recent-title-loki">Recent Chats</p>
            {chatHistory.length > 0 ? (
              <div className="recent-chats-loki">
                {chatHistory.map((chat, index) => (
                  <div 
                    key={index}
                    className="recent-entry-loki"
                    onClick={() => loadChat(index)}
                  >
                    <img src={icons.message_icon} alt="Chat" />
                    <p title={chat.prompt}>
                      {chat.prompt.length > 15 
                        ? `${chat.prompt.substring(0, 15)}...` 
                        : chat.prompt}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-recent-loki">No recent chats</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
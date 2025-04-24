import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import './LokiAI.css';
import { useLocation } from 'react-router-dom';

const LokiAi = () => {
  const location = useLocation();
  const placeInfo = location.state;

  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState({
    prompt: '',
    answer: '',
    isLoading: false,
    showResult: false
  });

  useEffect(() => {
    const titleElement = document.querySelector('.main-navigation__title a');
    if (titleElement) {
      titleElement.innerHTML = `<img src="/LokiAI.png" alt="LokiAI" style="height: 24px; vertical-align: middle; margin-right: 8px; background-color: "white" />Loki`;
    }

    return () => {
      if (titleElement) {
        titleElement.textContent = 'SnapMap';
      }
    };
  }, []);

  const loadChat = (chatIndex) => {
    setCurrentChat({
      ...chatHistory[chatIndex],
      isLoading: false,
      showResult: true
    });
  };

  const newChat = () => {
    setCurrentChat({
      prompt: '',
      answer: '',
      isLoading: false,
      showResult: false
    });
  };

  return (
    <div className='loki-ai'>
      <Sidebar 
        chatHistory={chatHistory}
        newChat={newChat}
        loadChat={loadChat}
      />
      <Main 
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        placeInfo={placeInfo}
      />
    </div>
  );
};

export default LokiAi;
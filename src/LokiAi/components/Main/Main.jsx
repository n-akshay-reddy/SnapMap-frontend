import { useEffect, useState } from "react";
import { icons } from "../../../../public/icons/icons";
import "./Main.css";
import { askGemini } from "../../../LokiAi/LokiApi";

const Main = ({
  chatHistory,
  setChatHistory,
  currentChat,
  setCurrentChat,
  placeInfo
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (placeInfo && !currentChat.prompt) {
      const generatedPrompt = `Tell me about the place "${placeInfo.title}" located at "${placeInfo.address}".`;
      setInput(generatedPrompt);
      handleSend(generatedPrompt);
    }
  }, [placeInfo]);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setCurrentChat(prev => ({
        ...prev,
        answer: prev.answer + nextWord
      }));
    }, 75 * index);
  };

  const handleSend = async (customPrompt = input) => {
    if (!customPrompt.trim()) return;
    
    try {
      setCurrentChat({
        prompt: customPrompt,
        answer: "",
        isLoading: true,
        showResult: true
      });

      const reply = await askGemini(customPrompt);
      
      let responseArray = reply.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        newResponse += i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
      }

      let formattedResponse = newResponse.split("*").join("<br/>");
      
      // Store the new chat in history
      const newChatEntry = {
        prompt: customPrompt,
        answer: formattedResponse
      };
      
      setChatHistory(prev => [...prev, newChatEntry]);

      // Display the response with typing effect
      let responseArrayWords = formattedResponse.split(" ");
      for (let i = 0; i < responseArrayWords.length; i++) {
        delayPara(i, responseArrayWords[i] + " ");
      }

      setInput("");
      setCurrentChat(prev => ({
        ...prev,
        isLoading: false
      }));
    } catch (err) {
      console.error("Error:", err);
      setCurrentChat(prev => ({
        ...prev,
        isLoading: false,
        answer: "Something went wrong. Please try again later..."
      }));
    }
  };

  const autoResize = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSend(); 
    }
  };

  return (
    <div className="main-loki">
      {currentChat.showResult && (
        <div className="result-loki">
          <div className="result-title-loki">
            <p>{currentChat.prompt}</p>
          </div>
          <div className="result-data-loki">
            {currentChat.isLoading ? (
              <div className="loader-loki">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: currentChat.answer }}></p>
            )}
          </div>
        </div>
      )}

      <div className="main-container-loki">
        <div className="search-box-loki">
          <textarea
            rows={1}
            placeholder="Know more about a place"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize(e);
            }}
            onKeyDown={handleKeyDown}
          />
          {input && (
            <img
              src={icons.send_icon}
              alt="send icon"
              onClick={() => handleSend(input)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <div className="images-loki">
          <img
            src={icons.gallery_icon}
            alt="gallery"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (placeInfo?.title) {
                const query = encodeURIComponent(placeInfo.title);
                window.open(`https://www.google.com/search?tbm=isch&q=${query}`, "_blank");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
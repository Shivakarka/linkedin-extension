import { useState } from "react";
import "./App.css";

function App() {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWithAll = async () => {
    setIsConnecting(true);

    // Send a message to the content script to perform the connection
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { action: "connectAll" },
        function (response) {
          setIsConnecting(false);
          if (response && response.success) {
            alert(`Accepted ${response.count} connection requests.`);
          } else {
            alert(
              "Either there are no connection requests or you are not authorized to connect. Make sure you are on linkedin connections page`);"
            );
          }
        }
      );
    });
  };

  return (
    <>
      <h2>Linkedin Connections Acceptor</h2>
      <button
        onClick={connectWithAll}
        disabled={isConnecting}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 transition-colors duration-300"
      >
        <span>{isConnecting ? "Connecting..." : "Connect with All"}</span>
      </button>
    </>
  );
}

export default App;

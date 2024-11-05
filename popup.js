chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "showAnswer") {
      document.getElementById("answer").innerText = message.answer;
    }
  });
  
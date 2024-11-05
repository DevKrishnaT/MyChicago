// Function to get the question text from the page
function getQuestionText() {
    const questionElement = document.querySelector("#lblQuestion"); // Replace with the correct selector
    return questionElement ? questionElement.innerText : "";
  }
  
  // Check if question text is available, then send it to the background script
  const questionText = getQuestionText();
  if (questionText) {
    // Send message to the background script with the question text
    chrome.runtime.sendMessage({ action: "fetchAnswer", question: questionText });
  } else {
    console.log("Question text not found on the page.");
  }
  
// Load the config.json file to get the API key
fetch(chrome.runtime.getURL('config.json'))
    .then((response) => response.json())
    .then((config) => {
        const apiKey = config.COHERE_API_KEY;

        // Function to send a request to Cohere's API
        async function getCohereResponse(message) {
            const response = await fetch("https://api.cohere.ai/v2/chat", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "command-r-plus",
                    messages: [
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Cohere Response:", data);
                return data;
            } else {
                console.error("Error:", data);
            }
        }

        // Listen for messages from content scripts or popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.type === "queryCohere") {
                getCohereResponse(request.message).then((data) => {
                    sendResponse({ response: data });
                });
                return true; // Keeps the message channel open for async response
            }
        });
    })
    .catch((error) => console.error("Failed to load API key:", error));

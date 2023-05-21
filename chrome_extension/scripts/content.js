const DEBUG = true;
const CONTEXT_MENU_OPTION_ID = 'watchdog';

// Function to check if an element is a paragraph
function isParagraphElement(element) {
    return element.nodeName.toLowerCase() === 'p';
}

chrome.runtime.onMessage.addListener((msg, sender, responder) => {
    console.log("Received message!");
    if (msg.action === 'watchdogContextSelected') {
        console.log("Noice");
    }
});

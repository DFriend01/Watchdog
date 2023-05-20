const DEBUG = true;
const CONTEXT_MENU_OPTION_ID = 'watchdog';

function main() {
    console.log("Page loaded");
    //updateContextMenus();
    listenForContextMenu();
}

// Listen for the contextmenu event on the page
function updateContextMenus() {
    document.addEventListener('contextmenu', (event) => {
        const clickedElement = event.target;
        if (isParagraphElement(clickedElement)) {
            // Show the context menu option
            chrome.contextMenus.update(CONTEXT_MENU_OPTION_ID, { visible: true });
        } else {
            // Hide the context menu option
            chrome.contextMenus.update(CONTEXT_MENU_OPTION_ID, { visible: false });
        }
    });
}

function listenForContextMenu() {
    chrome.runtime.onMessage.addListener((msg, sender, responder) => {
        console.log("Received message!");
        if (msg.action === 'watchdogContextSelected') {
            console.log("Noice");
        }
    });
}

// Function to check if an element is a paragraph
function isParagraphElement(element) {
    return element.nodeName.toLowerCase() === 'p';
}

/*
function modifyParagraphs() {
    const paragraphs = document.querySelectorAll('p');

    paragraphs.forEach((paragraph) => {
        if (DEBUG) addParagraphOutline(paragraph);
        paragraph.addEventListener('click', () => {
            console.log(paragraph.textContent); // Log the paragraph content when clicked
        });
    });
}

function addParagraphOutline(paragraph) {
    paragraph.style.outline = '1px solid red';  // Add outline to the paragraph
    paragraph.style.cursor = 'pointer';         // Change cursor to pointer on hover
}
*/

main();

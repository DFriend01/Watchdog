const CONTEXT_MENU_OPTION_ID = 'watchdog';

// Function to handle the context menu click event
function handleContextMenuClick(info, tab) {
    console.log("Watchdog option selected");

    if (info.menuItemId === CONTEXT_MENU_OPTION_ID) {
        // Get the clicked DOM element from the target element ID
        console.log("About to send message");
        chrome.tabs.sendMessage(tab.id, {action: 'watchdogContextSelected', content: info.selectionText});
    }
}

// Add a listener to handle the context menu click event
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);

// Create the context menu
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: CONTEXT_MENU_OPTION_ID,
        title: 'Watchdog',
        contexts: ['all'],
    });
});

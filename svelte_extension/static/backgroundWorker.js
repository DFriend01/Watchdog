const print = console.log


chrome.contextMenus.create(
    {
        id: "woof",
        title: "WatchDog",
        contexts: ["selection"]
    }
)




function clicked(selection, tab){
    if (selection.menuItemId === "woof"){

        console.log("sending")
        chrome.tabs.sendMessage(
            tab.id,
            "woof woof"
        )
    }
}
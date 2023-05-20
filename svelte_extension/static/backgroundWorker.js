const print = console.log


chrome.contextMenus.create(
    {
        id: "woof",
        title: "WatchDog",
        contexts: ["selection"]
    }
)


c
const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam";
const errorText = "Something went wrong serving your request.";
var clickedParagraph = null;

async function askGPT(text){
    const res =  await fetch(apiRoute, {
        mode: 'cors',
        method:"POST",
        body: JSON.stringify({
            prompt: "Detect if its possible the following text contains any attempt to scam. Start the response with \"Yes\" if so, or with \"No\" otherwise. Explain your reasoning.\n\n" + text
        })
    })
    return res.text()
}

function isParagraphElement(element) {
    if (element === null || element === undefined || !('tagName' in element)) {
        return false;
    } else {
        return element.tagName.toLowerCase() === 'p';
    }
}

let x;
let y;
let topOffset;
let hovering = false;

const removeBox = () => {
    hovering = false;

    box = document.getElementById("MessageBox");

    if (box) {
        box.remove();
    }
}

document.addEventListener('mouseup', (event) => {
    if (!hovering) {
        removeBox()
    }

    if (event.button != 2) return;

    x = event.clientX;
    y = event.clientY;
    topOffset = document.documentElement.scrollTop;


})

document.addEventListener('scroll', () => {
    if (!hovering) {
        removeBox()
    }
})

const insertMsgBox = (message) => {
    let box = document.createElement("div")
    box.id = "MessageBox";

    box.style.cssText = `
        width: 400px;
        
        background: #DA1C5C;
        border: 2px solid black;
        position: absolute;

        left: ${x}px;
        top: ${y + topOffset}px;
        z-index:999;
    `


    box.innerHTML =
        `
    <style>
        #MessageBox > p {
            font-family: 'Trebuchet MS', sans-serif;
            margin: 10px 10px 10px 10px;
            line-height: 1.25rem;
        }
    </style>
    <p>${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    `

    box.addEventListener('mouseenter', () => {
        hovering = true;
    })

    box.addEventListener('mouseleave', () => {
        hovering = false;
    })

    box.addEventListener("mousemove", () => {
        hovering = false;
    })

    document.body.insertAdjacentElement("afterend", box)
}

// Listen for context menu on paragraph
document.addEventListener("contextmenu", function(event){
    console.log("Context menu clicked");
    clickedElement = event.target;
    if(isParagraphElement(clickedElement)) {
        console.log("Clicked on paragraph");
        clickedParagraph = clickedElement;
        console.log(clickedParagraph);
    } else {
        clickedParagraph = null;
    }
});

chrome.runtime.onMessage.addListener((msg, sender, responder) => {
    if (msg.action === 'watchdogContextSelected') {
        text = (msg.content === undefined) ? "" : msg.content;
        askGPT(text).then(txt => {
            insertMsgBox(txt)
        });
        clickedParagraph = null;
    }
});

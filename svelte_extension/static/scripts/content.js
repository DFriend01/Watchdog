const DEBUG = true;
const CONTEXT_MENU_OPTION_ID = 'watchdog';

// Function to check if an element is a paragraph
function isParagraphElement(element) {
    return element.nodeName.toLowerCase() === 'p';
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



chrome.runtime.onMessage.addListener((msg, sender, responder) => {
    console.log("Received message!");
    if (msg.action === 'watchdogContextSelected') {
        insertMsgBox(msg.content)
    }
});

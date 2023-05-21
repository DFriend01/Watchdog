const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam";
const errorText = "Something went wrong serving your request.";

async function askGPT(text, prompt) {

    const res = await fetch(apiRoute, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify({
            prompt: prompt + text
        })
    })
    return res.text()
}

let x;
let y;
let topOffset;
let hovering = false;



let questions = [
    {
        name: "Is the content a scam?",
        prompt: "Detect if its possible the following text contains any attempt to scam. Start the response with \"Yes\" if so, or with \"No\" otherwise. Explain your reasoning.\n\n"
    },
    {
        name: "Is the content truthful?",
        prompt: "Detect if the following text is truthful? Explain why."
    },
    {
        name: "Is the content Ai generated?",
        prompt: "Detect if the following text is Ai generated? Explain why."
    }
]

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
    console.log(hovering)
    return
    // if (!hovering) {
    //     removeBox()
    // }
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

        transition: left top 0.2s ease-out;

        background: 
    `


    box.innerHTML =
        `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        h1 {
            margin: 0;
            margin-top:0.25rem;
            margin-bottom:2rem;
        }

        #MessageBox {
            font-family: 'Manrope', sans-serif;
            margin: 10px 10px 10px 10px;
            line-height: 1.25rem;
        }

    </style>

    <span>Watch out for suspicious stuff with</span>
    <h1>Watchdog</h1>
    
    <p>${message}</p>
    `

    //.replace(/</g, "&lt;").replace(/>/g, "&gt;")


    box.addEventListener('mouseenter', () => {
        hovering = true;
    })

    box.addEventListener('mouseleave', () => {
        hovering = false;
    })

    box.addEventListener("mousemove", () => {
        hovering = false;
    })

    document.body.insertAdjacentElement("afterend", box);

    setTimeout(() => {
        const rect = box.getBoundingClientRect();
        console.log('top', Math.min(window.innerHeight - rect.height, parseInt(box.style.getPropertyValue("top".replace("px", "")))), 'leftl', Math.min(window.innerWidth - rect.width, parseInt(box.style.getPropertyValue("left".replace("px", "")))))
        box.style.setProperty("top", Math.min(window.innerHeight - rect.height + topOffset - 100, parseInt(box.style.getPropertyValue("top".replace("px", "")))) + 'px')
        box.style.setProperty("left", Math.min(window.innerWidth - rect.width - 100, parseInt(box.style.getPropertyValue("left".replace("px", "")))) + 'px')
    }, 0);

}



chrome.runtime.onMessage.addListener((msg, sender, responder) => {
    if (msg.action === 'watchdogContextSelected') {
        text = (msg.content === undefined) ? "" : msg.content;

        displayMsgBox(text)
    }
});



function displayMsgBox(text) {
    let out = ""


    Promise.all(questions.map(item => askGPT(text, item.prompt))).then(results => {
        return results.forEach((res, index) => out = out.concat(`<h4>${questions[index].name}</h4><p>${res.trim()}</p>`))
    }).then(
        () => insertMsgBox(out)
    )
}
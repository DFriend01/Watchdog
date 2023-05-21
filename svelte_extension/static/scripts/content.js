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
        yes: "This Content could be a scam. ",
        no: "This content is most likely not a scam.",
        prompt: "Detect if its possible the following text contains any attempt to scam. Start the response with \"Yes\" if so, or with \"No\" otherwise. Explain your reasoning.\n\n"
    },
    {
        yes: "This content appears to be truthful.",
        no: "This content could contain misinformation.",
        prompt: "Detect if the following text is truthful? Explain why. Start with response with yes or no."
    },
    {
        yes: "This content could be Ai generated.",
        no: "This content is probably not Ai generated",
        prompt: "Detect if the following text is Ai generated? Explain why. Start with response with yes or no."
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
        
      
        border: 2px solid #2563eb;
        position: absolute;
       

        left: ${x}px;
        top: ${y + topOffset}px;
        z-index:999;

        transition: left top 0.2s ease-out;

        background:  #fefefe;

        padding:1.5rem;
    `


    box.innerHTML =
        `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        h1 {
            margin: 0;
            font-size:48px;
            margin-bottom:2rem;
            margin-top:0.75rem;
        }

        #MessageBox {
            font-family: 'Manrope', sans-serif;
            margin: 10px 10px 10px 10px;
            line-height: 1.25rem;
        }

        .container {
            display:flex;
            gap:1rem;
            flex-direction:column;
            padding:0.25rem;
        }

        .title{
            display:flex;
            justify-content:flex-start;
            align-items:center;
        }


        spam {
            font-size:larger;
        }

        img#paws {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width:20%;
            height:auto;
        }

        p {
            margin: 0.5rem;
            margin-left: 0.4rem;
            margin-right: 0.4rem;
            
        }
    </style>
        <img id="paws" src="https://watchdog-iota.vercel.app/pawprints.png"/>
    <span style="font-size:medium;">Watch out for suspicious stuff with</span>
    <h1>Watchdog</h1>
    
    <div class="container">${message}</div>
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
        return results.forEach((res, index) => { const pass = passOrNah(res); ; out = out.concat(makeGroup(pass, pass ? questions[index].yes : questions[index].no, res)) })
    }).then(
        () => insertMsgBox(out)
    )
}


function makeGroup(pass, title, content) {

    return `
        <div>
            <div class="title">
                <img style="width:1.5rem; height:1.5rem; margin:0.25rem;" src="https://watchdog-iota.vercel.app/icons/${!pass ? 'check.svg' : 'cross.svg'}" />
                <span style="font-size:larger; font-weight:500;">${title}</span>
            </div>
            <p>${content}</p>
        </div>
    `
}

function passOrNah(response) {
    return response.trim().toLowerCase().startsWith("yes");
}
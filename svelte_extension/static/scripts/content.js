const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam";
const errorText = "Something went wrong serving your request.";
const highlightColor = "#C4B5FE";
var clickedParagraph = null;

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

function isParagraphElement(element) {
    if (element === null || element === undefined || !('tagName' in element)) {
        return false;
    } else {
        return element.tagName.toLowerCase() === 'p';
    }
}

function getPromptText(msg) {
    // If there is highlighted text, that takes precedence over clicked paragraph
    if (msg.content !== undefined) {
        return msg.content;
    } else {
        return clickedParagraph.element.textContent;
    }
}

let x;
let y;
let topOffset;
let hovering = false;



let questions = [
    {
        yes: "This Content could be a scam. ",
        no: "This content is most likely not a scam.",
        prompt: `
            You are an AI assistant who helps consumers identify if text content could be scam. 
            
            The following are examples of common scams:

            - Phishing Scams: These involve sending fraudulent emails or messages that appear to be from reputable sources, such as banks or government agencies, aiming to trick recipients into revealing sensitive information like passwords or credit card details.

            - Online Shopping Scams: Scammers create fake online stores or auction listings to attract buyers. They may collect payment without delivering the promised products or provide counterfeit or substandard items.

            - Investment and Ponzi Schemes: Fraudsters promise high returns on investments or offer pyramid-like schemes where new investors' money is used to pay previous investors. Eventually, the scheme collapses, and many participants lose their money.

            - Tech Support Scams: Scammers contact victims, posing as tech support personnel from well-known companies, claiming that their computer is infected with a virus. They may request remote access to the computer or sell unnecessary software/services.

            - Lottery or Sweepstakes Scams: Victims receive notifications stating they have won a lottery or sweepstakes, often accompanied by requests for upfront fees or personal information to claim the prize. In reality, there is no legitimate prize, and scammers aim to steal money or identity.

            - Identity Theft: Scammers steal personal information (e.g., Social Security numbers, credit card details) to commit fraud, such as opening accounts, making purchases, or applying for loans under victims' names.

            - Employment Scams: Scammers pose as employers, offering job opportunities that require upfront fees or personal information. They may also conduct fake interviews and ask for sensitive details or bank account information.

            - Charity Scams: Scammers exploit people's generosity by creating fake charities, particularly during times of disaster or tragedy. They may solicit donations that never reach the intended cause.

            Detect if the provided text after the triple dash lines could be a scam. Your answer should include the following:
            
            1. A "Yes" or "No" statement indicating that the text is a scam or not.
            2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
            3. Your response should be no longer than 3 sentences.

            ---

        `

        //prompt: "Detect if its possible the following text contains any attempt to scam. Explain your reasoning. Must start the response with Yes if so, or with No otherwise. Respond with N/A if neither.\n\n"
    },
    {
        yes: "This content could contain misinformation.",
        no: "This content appears to be truthful.",
        prompt: "Detect if the following text contains false information. Explain your reasoning. Must start the response with yes or no. If neither, say N/A.\n\n"
    },
    {
        yes: "This content could be Ai generated.",
        no: "This content is probably not Ai generated",
        prompt: "Detect if the following text is Ai generated? Explain your reasonings. Must start the response with yes or no. If neither, say N/A.\n\n"
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

function removeParagraphHighlighting() {
    if (clickedParagraph !== null) {
        clickedParagraph.element.style.setProperty('background', clickedParagraph.background);
        clickedParagraph = null;
    }
}

// Click listener to revert any highlighted paragraphs
document.addEventListener("click", function (event) {
    removeParagraphHighlighting();
});

// Listen for context menu on paragraph
document.addEventListener("contextmenu", function (event) {
    console.log("Context menu clicked");
    removeParagraphHighlighting();
    clickedElement = event.target;

    // Update clicked paragraph only if there is no highlighted text
    if (isParagraphElement(clickedElement) && !window.getSelection().toString()) {
        console.log("Clicked on paragraph");
        clickedParagraph = {
            element: clickedElement,
            background: window.getComputedStyle(clickedElement).getPropertyValue('background')
        };
        clickedParagraph.element.style.setProperty('background', highlightColor);
        console.log(clickedParagraph);
    } else {
        clickedParagraph = null;
    }
});

chrome.runtime.onMessage.addListener((msg, sender, responder) => {
    if (msg.action === 'watchdogContextSelected') {
        text = getPromptText(msg);
        console.log(text);
        displayMsgBox(text);
        removeParagraphHighlighting();
    }
});

function displayMsgBox(text) {
    let out = ""
    Promise.all(questions.map(item => askGPT(text, item.prompt))).then(results => {

        console.log("WEE", results)
        return results.forEach((res, index) => { const pass = passOrNah(res);; out = out.concat(makeGroup(pass, pass ? questions[index].yes : questions[index].no, res)) })
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

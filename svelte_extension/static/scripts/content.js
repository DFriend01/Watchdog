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

const questions = [
        {
            yes: "This Content could be a scam. ",
            no: "This content is most likely not a scam.",
            
            // Source: https://www.aura.com/learn/social-media-scams
            prompt: `
                You are an AI assistant who helps consumers identify if text content could be scam. I will provide some warning signs of scams to 
                look out for when you are evaluating your results.

                ===================
                WARNING SIGNS OF SCAMS

                1. Warning signs of a social media investment scam:
                    - Promises of high returns with zero risk.
                    - Professional-looking investment websites or crypto exchanges with little to no information about the company. 
                    - The scammer offers to walk you through your first few trades and claims to have insider knowledge of the market.

                2. Warning signs of a romance scam:
                    - The person wants to quickly move from the social media site to WhatsApp or texting.
                    - They promise to meet in person but come up with excuses for why they can’t.
                    - They repeatedly ask for personal information, like your location or pet’s name. 
                    - The scammer professes their love for you early in the conversation. 
                    - They ask for money or gift cards.  

                3. Warning signs of an account takeover scam:
                    - Your friend is randomly sending messages that don’t fully seem like actual things they would say.
                    - Your friend is randomly posting about investment opportunities or great deals that they just found.

                4. Warning signs of an authentication code scam:
                    - You have received a random text with an authentication code for one of your accounts.
                    - A stranger is texting or messaging you and asking for an authentication code.
                    - Some scammers claim the code is a way to “tell you’re legitimate” on Facebook Marketplace (or other platforms) as a ruse to get you to send them your code. 

                5. Warning signs of a lottery, sweepstakes, or giveaway scam:
                    - You are being asked to pay to receive your prize (i.e., taxes, shipping, processing fees).
                    - You are told that paying increases your chances of winning.
                    - You are asked to provide financial account information or a phone number to claim your prize. 

                6. Warning signs of a job scam:
                    - The job pays extremely well for not much work.
                    - The supposed employer wants you to pay for your own equipment (legitimate companies should provide you with everything you need).
                    - You are sent a check for a large amount and told to deposit it and then send some of the money back to the employer. This is a classic bank scam.

                7. Warning signs of a phishing scam:
                    - An unfamiliar tone or greeting, and especially if they use "Dear" to address you in the beginning of an email.
                    - Grammar and spelling errors in the text or email.
                    - There are threats or a sense of urgency.
                    - There is a request for credentials, payment information, or other personal details.

                ===================
                YOUR TASK
                
                Detect if the provided text after the triple dash lines could be a scam. It is very important that you use 
                the warning signs that I provided you to help you determine if the text is a scam or not. 

                Your answer should include the following:
                
                1. A "Yes" or "No" statement indicating that the text is a scam or not.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.
                4. Do not complete the rest of the text yourself and include it in your answer.

                ---

            `
        },
        {
            yes: "This content could contain misinformation.",
            no: "This content appears to be truthful.",
            prompt: `
                You are an AI assistant that helps consumers identify misinformation on the internet. I will provide you with some warning signs of
                misinformation to look out for when you are evaluating your results.

                =============================
                WARNING SIGNS OF MISINFORMATION

                1. Lack of Credible Sources: Misinformation often lacks references to credible sources or provides unreliable sources that cannot be verified. Look for content supported by reputable organizations, experts, or well-established media outlets.
                2. Sensational or Clickbait Headlines: Misleading or sensational headlines designed to grab attention and evoke strong emotional responses are common in misinformation. If a headline seems too sensational or exaggerated, it's essential to verify the information from reliable sources.
                3. Poor Grammar, Spelling, or Formatting: Misinformation pieces often contain noticeable errors in grammar, spelling, or formatting. While mistakes can occur, a high prevalence of such errors may suggest a lack of editorial oversight or professionalism.
                4. Extreme Biases or One-Sided Perspectives: Misinformation may display extreme biases or present only one side of a story without considering alternative viewpoints. Look for balanced presentations that provide a comprehensive view of the topic.
                5. Lack of Transparency or Anonymity: Misinformation sources often lack transparency regarding their authors, affiliations, or funding sources. Be skeptical of content that does not provide clear information about the people or organizations behind it.
                6. Lack of Dates or Outdated Information: Misinformation may lack dates or provide outdated information, making it difficult to assess the relevance and accuracy of the content. Always check for the timeliness of the information before drawing conclusions.
                7. Emotional Manipulation or Appeal: Misinformation frequently uses emotional appeals to manipulate readers' feelings or provoke strong reactions. Be cautious of content that relies heavily on emotional language or aims to incite anger, fear, or outrage.
                8. Conspiracy Theories or Unverified Claims: Misinformation often promotes conspiracy theories or unverified claims without substantial evidence. Claims that contradict widely accepted facts or lack credible supporting evidence should be viewed skeptically.
                9. Lack of Cross-Referencing: Misinformation sources often lack cross-referencing or verification from multiple reliable sources. Look for information that is corroborated by multiple trustworthy sources to increase confidence in its accuracy.
                10. Echo Chambers or Viral Sharing: Misinformation can spread rapidly within echo chambers or through viral sharing on social media platforms. Be cautious of content that lacks wider exposure or only appears within specific groups or communities.
                11. Intention to scam: Scams are a form of misinformation because the scammer intends to deceive the victim.
                               
                =============================
                YOUR TASK

                Detect if the provided text after the triple dash lines is misinformation or not. It is very important that you use 
                the warning signs that I provided you to help you determine if the text is providing misinformation or not. 

                Your answer should include the following:

                1. A "Yes" or "No" statement indicating that the text is misinformation or not. Answer "Yes" if there is misinformation, and answer "No" if there is no misinformation.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.
                4. Do not complete the rest of the text yourself and include it in your answer.

                ---

            `
        },
        {
            yes: "This content could be Ai generated.",
            no: "This content is probably not Ai generated",
            prompt: `
                You are an AI assistant that helps people identify AI generated text. I will provide some warning signs of AI generated text to look out for
                when determining if the provided text is AI generated or not.

                ============================
                WARNING SIGNS OF AI GENERATED TEXT

                1. Warning signs of Unusual or Inconsistent Language: AI-generated text might contain language patterns that seem unnatural or inconsistent. It could exhibit an odd choice of words, unusual sentence structures, or inconsistent grammar.
                2. Warning signs of Lack of Context or Coherence: AI-generated text may struggle to maintain a coherent and logical flow of information. It might provide irrelevant or nonsensical responses, fail to address specific questions, or exhibit abrupt topic shifts.
                3. Warning signs of Absence of Personal Experience or Emotion: AI lacks personal experiences and emotions, so the generated text might lack subjective opinions, personal anecdotes, or emotional nuances that a human writer would typically include.
                4. Warning signs of Uncommon or Invented Facts: AI-generated text might present information that is unusual, obscure, or even factually incorrect. It could generate statistics, quotes, or historical events that do not exist or are inaccurate.
                5. Warning signs of Consistency and Speed: AI models can generate vast amounts of content quickly and consistently. If you observe a high volume of content that appears to be generated in a short period and lacks human errors or variations, it could suggest AI involvement.

                =============================
                YOUR TASK

                Detect if the provided text after the triple dash lines is generated by AI. It is very important that you use 
                the warning signs that I provided you to help you determine if the text is generated by AI or not. 

                Your answer should include the following:

                1. A "Yes" or "No" statement indicating that the text is generated by AI or not.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.
                4. Do not complete the rest of the text yourself and include it in your answer.

                ---

                `
        },
    ];



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

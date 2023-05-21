const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam";
const errorText = "Something went wrong serving your request.";

async function askGPT(text){
    fetch(apiRoute, {
        mode: 'cors',
        method:"POST",
        body: JSON.stringify({
            prompt: "Check if there are anything scam related in the following text.\n\n" + text
        })
    })
    .then(res => { 
        console.log(res);
        return res.text(); 
    })
    .catch(err => {
        console.log(err);
        return errorText;
    });
}

chrome.runtime.onMessage.addListener((msg, sender, responder) => {
    console.log("Received message!");
    if (msg.action === 'watchdogContextSelected') {
        text = (msg.content === undefined) ? "" : msg.content;
        askGPT(text).then(txt => {
            console.log("Received response from GPT");
            console.log(txt);
        });
    }
});

console.log("Webpage loaded");

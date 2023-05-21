const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam";
const errorText = "Something went wrong serving your request.";

export async function askGPT(text){
    fetch(apiRoute, {
        mode: 'cors',
        method:"POST",
        body: JSON.stringify({
            prompt: "Detect if its possible the following text contains any attempt to scam. Start the response with \"Yes\" if so, or with \"No\" otherwise. Explain your reasoning.\n\n" + text
        })
    })
    .then(res => { 
        res.text(); 
    })
    .then(txt => { 
        return txt; 
    })
    .catch(err => {
        console.log(err);
        return errorText;
    });
}
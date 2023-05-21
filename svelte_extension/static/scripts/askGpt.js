const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam";
const errorText = "Something went wrong serving your request.";

export async function askGPT(text){
    fetch(apiRoute, {
        mode: 'cors',
        method:"POST",
        body: JSON.stringify({
            prompt: "Check if there are anything scam related in the following text.\n\n" + text
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
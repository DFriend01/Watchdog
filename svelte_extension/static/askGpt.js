async function askGPT(text){
    response = "Loading response"

    fetch(apiRoute+"scam", {
        mode: 'cors',
        method:"POST",
        body: JSON.stringify({
            prompt: "Check if there are anything scam related in the following text." + text
        })
    }).then(res=>res.text()).then(
        txt => {
            return txt
        }
    )
}
const buttonSubmit = document.querySelector(".button_submit")
const buttCopy = document.querySelector(".button_copy")

//fução que verifica se o input é um link
function checkURLIsValid(url){
    const re = /^((?:https?:\/\/)?(?:www\.)?[-\w@:%.+~#=]{2,256}\.[a-z]{2,6}\b[-\w@:%+.~#?&\/=]*|)$/
    const OK = re.test(url);

    if(OK){
        return true;
    }

    return false;
}


//funções para mostra mensagens
function messageLinkInvalid(){
    const elementMessage = document.querySelector(".erro_message");
    elementMessage.classList.add("active");

    const time = setTimeout(() => {
        elementMessage.classList.remove("active");
    }, 2000)

    return () => clearTimeout(time);
}

function messageCopied(){
    const elementMessage = document.querySelector(".copied_message");
    elementMessage.classList.add("active");

    const time = setTimeout(() => {
        elementMessage.classList.remove("active")
    }, 300);

    return () => clearTimeout(time);
}

const loandingComponent = {
    createElement(){
        const main = document.querySelector("main");
        const loanding = document.createElement("img");
        loanding.classList.add("loading");
        loanding.src = "./assets/images/loading.gif";
        main.insertAdjacentElement("beforeend", loanding);
    },

    deleteElement(){
        const loading = document.querySelector(".loading");
        loading.style.display = 'none';
        loading.remove();
    }
    
}





//requisições na API
async function sendURL(url){
    const response = await fetch("http://localhost:3000/gererateurl", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({originURL: url})
    });

    const dateJson = await response.json();

    return dateJson;
}

//mostra a div com o link encurtado
function showShortLinkSection(url){
    const Linkcontainer = document.querySelector(".shortLink_container");
    Linkcontainer.classList.add("active");

    const messageLink =  document.querySelector(".shortLink_container #shortURL");
    messageLink.value = url;
}

function hidderShortLinkSection(){
    const Linkcontainer = document.querySelector(".shortLink_container");
    Linkcontainer.classList.remove("active");

}


buttonSubmit.addEventListener("click", async(e)=> {
    e.preventDefault();
    hidderShortLinkSection()
    
    const url = document.querySelector(".url_input").value;

    if(url && checkURLIsValid(url)){
        buttonSubmit.disabled = true;

        loandingComponent.createElement()

        const {shortURL} = await sendURL(url);

        loandingComponent.deleteElement();
        showShortLinkSection(shortURL);

        buttonSubmit.disabled = false;
    }
    else {
        messageLinkInvalid();
    }
})


buttCopy.addEventListener("click", (e)=> {
    e.preventDefault();
    const url = document.querySelector(".shortLink_container #shortURL");

    url.select();
    url.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(url.value);

    messageCopied();
})

console.log("JS Loaded");

const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Cannot find the element ${selector}`)
}

const ORIGINAL_URL = "https://bru-app.vercel.app/";
const API_BASE = "https://api.shrtco.de/v2/";
const SHORTEN_URL = `${API_BASE}shorten?url=${ORIGINAL_URL}`;
// const SHORTEN_URL = `${API_BASE}shorten?url=${encodeURIComponent(ORIGINAL_URL)}`;

const form =selectElement('#shortForm');
const inpUrl = selectElement('input[name="shortener"]')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form submited')
    const url = inpUrl.value;
    // console.log(url)
    shortenURL(url)
})

async function shortenURL(url){

    try {
        const res = await fetch(SHORTEN_URL)
        const data = res.json();
    
        console.log(data)
    } catch (error) {
        console.error(error);
    }

}
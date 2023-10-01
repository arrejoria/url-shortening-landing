console.log("JS Loaded");

const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Cannot find the element ${selector}`)
}

const ORIGINAL_URL = "https://bru-app.vercel.app/";
const API_BASE = "https://api.shrtco.de/v2/";
// const SHORTEN_URL = `${API_BASE}shorten?url=${ORIGINAL_URL}`;
const SHORTEN_URL = `https://api.shrtco.de/v2/shorten?url=${ORIGINAL_URL}`;
const urlList = selectElement('#urlList');
const form =selectElement('#shortForm');
const inpUrl = selectElement('input[name="shortener"]')
const copyButton = selectElement('.url__button');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form submited')
    const url = inpUrl.value;
    // console.log(url)
    shortenURL(url)
})

window.addEventListener('DOMContentLoaded', () => {
    showURLS()
})
async function shortenURL(url) {
    try {
        const res = await fetch(`${API_BASE}shorten?url=${url}`);
        if (!res.ok) {
            throw new Error(`Error al acortar la URL: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.ok) {
            storageURL(data)

        } else {
            throw new Error(`Error al acortar la URL: ${data.error_code}`);
        }
    } catch (error) {
        console.error(error);
    }
}


function showURLS() {
    const storedURLS = JSON.parse(localStorage.getItem('dataURL'));

    storedURLS.forEach((el) => {
        const itemList = `
        <li class="shortener__item url col-11 col-md-11 col-lg-10">
            <span class="url__large">${el.large_url}</span>
            <span class="url__short">${el.short_url}</span>
            <button class="url__button" type="button">Copy</button>
        </li>`;
    
        urlList.insertAdjacentHTML('afterbegin', itemList);
    })
}

function storageURL(data) {
    // Obtener la lista de objetos almacenados previamente, o crear una nueva lista si no existe.
    const storedList = JSON.parse(localStorage.getItem('dataURL')) || [];

    const dataURL = {
        "code": data.result.code,
        "large_url": data.result.original_link,
        "short_url": data.result.full_short_link,
    };

    storedList.push(dataURL);

    localStorage.setItem('dataURL', JSON.stringify(storedList));
}


function handleCopy(){
    
}

// copyButton.addEventListener()

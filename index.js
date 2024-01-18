const urlName = document.getElementById("urlname");
const shortbtn = document.getElementById("shortbtn");
const menu = document.getElementById("menu");
const result = document.getElementById("result");
const nav = document.getElementById("nav");
const feels = document.getElementById("feels");
const error = document.getElementById("error");
const resultgroup = document.getElementById("resultlist");
const formEl = document.querySelector("form");
const copybtn = document.querySelectorAll(".result ul li div button");
const apikey = "b95b36def825b5659dfe29a258028f0a";
var numid = 0;
const dark = document.getElementById("darkbtn");
const body = document.querySelector("body");


menu.addEventListener("click", () => {
    switch (numid) {
        case numid = 0:
            nav.style.display = "flex";
            menu.setAttribute("src", "./images/icon-close.svg");
            numid = 1;
            break;

        case numid = 1:
            nav.style.display = "none";
            menu.setAttribute("src", "./images/icon-hamburger.svg");
            numid = 0;
            break;
    }
})



formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const urlLink = urlName.value;
    if (urlLink === "") {
        error.innerHTML = "Input field is empty";
    } else {

        console.log(urlLink);
        getShortUrl(urlLink);
    }
})



async function getShortUrl(urlLink) {
    const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '4bd64e99c4msh8b500505dc2609ep1b4e51jsn2d1f105825b2',
            'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
        },
        body: new URLSearchParams({
            url: `${urlLink}`
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        const newlink = data.result_url;
        console.log(newlink);
        createElement(newlink, urlLink);
    } catch (error) {
        console.error(error);
    }

}


function createElement(newlink, urlLink) {

    const para = document.createElement("li");
    const old = document.createElement("a");
    const div = document.createElement("div");
    const newl = document.createElement("a");
    const btn = document.createElement("button");


    old.innerHTML = urlLink;
    newl.innerHTML = newlink;
    btn.innerHTML = "Copy";


    resultgroup.appendChild(para);
    para.appendChild(old);
    para.appendChild(div);
    div.appendChild(newl);
    div.appendChild(btn);

    $(".result ul li div button").click(function () {
        // action goes here!!
        navigator.clipboard.writeText(newlink);
        btn.innerHTML = "Copied";
        btn.style.backgroundColor = " hsl(255, 11%, 22%)";
    });
}
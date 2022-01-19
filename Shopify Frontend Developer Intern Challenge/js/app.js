async function getImages(url) {
    try {
        document.getElementById("container").style.display = "none";
        document.getElementById("loader").style.display = 'block';
        let result = await fetch(url);
        document.getElementById("loader").style.display = 'none';
        document.getElementById("container").style.display = 'block';
        return await result.json();
    } catch (error) {
        console.log(error);
    }
}

function create_post_div(image) {
    let html = '';
    if (`${image.media_type}`=='image') {
        html+=`<img class="responsive" src = "${image.url}" >`
    } else {
        html+=`<iframe class="post_video" src="${image.url}"></iframe>` 
    }
    html += `<div class="post_txt">
                <h3 class="img_title">${image.title}</h3>
                <p class="img_date">${image.date}</p>
                <p class="img_description">${image.explanation}</p>
                <p class="like_btn">
                    <button class="btn btn-outline-danger" style="background-color: white;color:#dc3545;" onclick="clicked_btn(event)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-heart icon" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        Like
                    </button>
                </p>
            </div>
        </div>`
    return html
}
async function todayImage() {
    if (document.getElementById('no_media_msg')){
        document.getElementById('no_media_msg').remove();
    }
    if (document.getElementById("date_container").style.marginTop=='0%') {
        document.getElementById("date_container").style.marginTop='';
    }

    let url = 'https://api.nasa.gov/planetary/apod?api_key=Vm2h7slLn4FpfsGmRY3qasffrEv8YaK2OqBvxgL9';
    let image = await getImages(url);
    let html = `<h2>Astronomy Media of the Day</h2>
                <div class="post">`
    html+=create_post_div(image);

    let container = document.querySelector('.post_container');
    container.innerHTML = html;
}

var clicked_btn = function (event) {
    event.preventDefault();
    var target = event.target;
    while (!target.parentElement.classList.contains("like_btn")){
        target = target.parentElement;
    }
    if (target.style.backgroundColor=='white'){
        target.style.backgroundColor = "#dc3545";
        target.style.color = "#fff";
        target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-heart icon" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>`
    } else {
        target.style.backgroundColor = "white";
        target.style.color = "#dc3545";
        target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-heart icon" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                            Like`;
    }
}

todayImage();
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
dd = '0' + dd;
}

if (mm < 10) {
mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("start").setAttribute("max",today);
document.getElementById("end").setAttribute("max",today);

function no_media() {
    var is_mobile = window.screen.width<500;
    if (is_mobile) {
        document.getElementsByClassName("post_container")[0].innerHTML = ``;
        document.getElementsByClassName("row")[0].innerHTML = `<p id='no_media_msg'>No media found</p>`+document.getElementsByClassName("row")[0].innerHTML;
        document.getElementById("date_container").style.marginTop = '0px';
    } else {
        document.getElementsByClassName("post_container")[0].innerHTML =`<h2 id='no_media_msg'>No media found</h2>`
    }
    document.getElementById("date_container").style.marginTop = "0%";
};

var getAllImages = async function renderImages(event) {
    var is_mobile = window.screen.width<500;
    var start_date = document.getElementById('start').value;
    var end_date = document.getElementById('end').value;
    try {
        let url = 'https://api.nasa.gov/planetary/apod?api_key=Vm2h7slLn4FpfsGmRY3qasffrEv8YaK2OqBvxgL9&start_date='+start_date+'&end_date='+end_date;
        let images = await getImages(url);
        if (images.length !=0) {
            let html = '';
            images.forEach(image => {
                html+=create_post_div(image);
            });
            document.getElementsByClassName("post_container")[0].innerHTML = html;
            document.getElementById("date_container").style.marginTop = '0px';
        } else {
            no_media();
        }

        if (is_mobile) {
            document.getElementById("date_container").style.marginTop = "3%";
        } else {
            document.getElementById("date_container").style.marginTop = "0%";
        }
        
    } catch(error) {
        no_media();
    }
}

document.getElementById("search_btn").addEventListener("click",getAllImages);

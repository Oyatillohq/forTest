
const dark = document.getElementById('dark')
const body = document.querySelector('body')
const main = document.querySelector('.github')
const theme = document.getElementById("theme")
function lightMode() {
    body.classList.remove("open")
    theme.innerHTML = `<div class="theme-title">DARK</div>
    <img id="dark" src="./img/Paththeme.svg" alt="" class="theme-img">`
}
theme.addEventListener("click", () => {
    body.classList.toggle("open")
    if (body.getAttribute("class") == "open") {
        theme.innerHTML = `<div class="theme-title" onclick="lightMode()">Light</div>
        <img src="./img/002-sunsun.svg" alt="" class="dark onclick="lightMode()">`
    }
    else {
        theme.innerHTML = `<div class="theme-title">DARK</div>
        <img id="dark" src="./img/Paththeme.svg" alt="" class="theme-img">`
    }
})
const form = document.querySelector(".search-user");
const input = document.querySelector(".search-user__input");
const noResult = document.getElementById("no-result")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${input.value}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                noResult.style.display = "block"
                setTimeout(() => {
                    input.value = ""
                    noResult.style.display = "none"
                    body.style.overflow = "hidden"
                    console.log(data);
                }, 2000);
            }
            else {
                main.innerHTML = `
                <div class="container ">
                <form class="search-user">
                    <input type="text" class="search-user__input error" placeholder="Search GitHub username…">
                    <img src="./img/Combined Shapesearch.svg" alt="" class="search-user__input-shapeimg submit">
                    <button class="search-btn">Search</button>
                </form>
                <div class="card error">
                    <div class="user">
                        <div class="user__hero"><img src="${data.avatar_url}" alt="" class="border"></div>
                        <div class="user__fullname">
                            <div class="user__fullname-left">
                                <h1 class="user__fullname-firstname">${data.name ? data.name : data.login}</h1>
                                <div class="user__fullname-link">@${data.login}</div>
                                <div class="user__fullname-bio">${data.bio ? data.bio : "This profil no bio"}</div>
                            </div>
                            <div class="user-data">${data.created_at}</div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="info__main">
                            <div class="info__main-repos">
                                <div class="info__main-repos-title">Repos</div>
                                <div class="info__main-repos-subtitle">${data.public_repos}</div>
                            </div>
                            <div class="info__main-repos">
                                <div class="info__main-repos-title">Followers</div>
                                <div class="info__main-repos-subtitle">${data.followers}</div>
                            </div>
                            <div class="info__main-repos">
                                <div class="info__main-repos-title">Following</div>
                                <div class="info__main-repos-subtitle">${data.following}</div>
                            </div>
                        </div>
                        <div class="blogs">
                            <div class="blogs__location">
                                <img src="./img/Shapelocation.svg" alt="" class="blogs__location-img">
                                <h2 class="blogs__location-title">${data.location ? data.location : "This profile has no location"}
                                </h2>
                            </div>
                            <div class="blogs__location">
                                <img src="./img/004-twittertwitter.svg" alt="" class="blogs__location-img" style="opacity: 0.7;">
                                <h2 class="blogs__location-title">Not Available</h2>
                            </div>
                            <div class="blogs__location">
                                <img src="./img/002-urllink.svg" alt="" class="blogs__location-img">
                                <h2 class="blogs__location-title">${data.blog ? data.blog : "https://github.blog"}</h2>
                            </div>
                            <div class="blogs__location">
                                <img src="./img/001-office-buildingsitelink.svg" alt="" class="blogs__location-img">
                                <h2 class="blogs__location-title">${data.company ? data.company : "@github"}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`



            }
        });
});
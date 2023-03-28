const root = document.documentElement.style;

const btnmode = document.querySelector("#btn-mode");
const modeText = document.querySelector("#mode-text");
const modeIcon = document.querySelector("#mode-icon")

let darkMode = false;

btnmode.addEventListener('click', () => {
    if (darkMode == false)
        activateDarkMode();
    else
        activateLightMode();
});

//SWITCH TO DARK MODE
function activateDarkMode() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeText.textContent = "LIGHT";
    modeIcon.src = "assets/sun-icon.svg";
    // root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    // console.log("darkmode changed to " + darkMode);
    localStorage.setItem("dark-mode", true);
}

//SWITCH TO LIGHT MODE 
function activateLightMode() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeText.textContent = "DARK";
    modeIcon.src = "assets/moon-icon.svg";
    // root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

const btnSubmit = document.querySelector("#submit");
const input = document.querySelector("#input");

const url = "https://api.github.com/users/";

const noresults = document.querySelector("#no-results")

btnSubmit.addEventListener('click', () => {
    if (input.value !== '')
        getUserData(url + input.value);
    else {
        noresults.style.display = "block";
        noresults.textContent = "Please Enter Username";
    }
});

input.addEventListener('input', () => {
    noresults.style.display = 'none';
});
input.addEventListener('click', () => {
    noresults.style.display = 'none';
});

input.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        if (input.value !== "")
            getUserData(url + input.value);
    }
})

// API CALL
async function getUserData(gitUrl) {
    try {
        const response = await fetch(gitUrl);

        const data = await response.json();
        console.log(data);
        updateProfile(data);
    }
    catch (err) {
        throw err;
    }
}

// VARIABLES
const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const userId = document.querySelector("#userid");
const date = document.querySelector("#date");
const bio = document.querySelector("#bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const userLocation = document.querySelector("#location");
const page = document.querySelector("#page");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");

// RENDER
function updateProfile(data) {
    if (data.message !== 'Not Found') {
        noresults.style.display = 'none';

        // CHECK FOR NULL VALUES
        function checkNull(val1, val2) {
            if (val1 == "" || val1 == null) {
                val2.style.opacity = 0.5;
                val2.previousElementSibling.style.opacity = 0.5;
                return true;
            }
            else
                return false;
        }

        avatar.src = `${data.avatar_url}`;
        userName.textContent = `${data.name}`;
        userId.textContent = `@${data.login}`;
        userId.href = `${data.html_url}`;

        dateSegments = data.created_at.split('T').shift().split('-');
        // console.log(dateSegments);
        date.textContent = `Joined ${dateSegments[2]} ${months[dateSegments[1] - 1]} ${dateSegments[0]}`;

        bio.textContent = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.textContent = `${data.public_repos}`;
        followers.textContent = `${data.followers}`;
        following.textContent = `${data.following}`;

        userLocation.textContent = checkNull(data.location, userLocation) ? "Not Available" : `${data.location}`;

        page.textContent = checkNull(data.blog, page) ? "Not Available" : data.blog;
        page.href = checkNull(data.blog, page) ? "" : data.blog;
        page.style.textDecoration = "none";
        twitter.textContent = checkNull(data.twitter_username, twitter) ? "Not Available" : data.twitter_username;
        twitter.href = checkNull(data.twitter_username, twitter) ? "#" : `https://twitter.com/${data.twitter_username}`;
        company.textContent = checkNull(data.company, company) ? "Not Available" : data.company;

        if (data.blog == "") {
            // console.log("Hello", page.href);
            page.style.pointerEvents = "none";
        }
    }
    else {
        noresults.style.display = "block";
        noresults.textContent = "no search results";
    }
}

function init() {
    darkMode = false;

    const value = localStorage.getItem("dark-mode");

    if (value == null) {
        localStorage.setItem("dark-mode", darkMode);
        activateLightMode();
    }
    else if (value == "true")
        activateDarkMode();

    else if (value == "false")
        activateLightMode();

    getUserData(url + 'jayant-baid');
}
init();
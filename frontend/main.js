const API_URL = "http://localhost:8000";
const userWrapper = document.querySelector(".user-wrapper");
const form = document.querySelector(".user-form");
const fnameInput = document.querySelector(".name");
const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const urlInput = document.querySelector(".url");

async function fetchData(api) {
    try {
        let response = await fetch(`${api}/accounts`);
        let data = await response.json();
        if (response.ok) {
            displayUserCards(data.data);
        } else {
            console.error("Failed to fetch data:", data.message);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function postData(api, body) {
    try {
        let response = await fetch(`${api}/accounts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        let data = await response.json();
        console.log("Server response:", data.message);
        fetchData(API_URL);
    } catch (error) {
        console.error("Error posting data:", error);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let newUser = {
        fullName: fnameInput.value,
        userHandle: usernameInput.value,
        userSecret: passwordInput.value,
        profileUrl: urlInput.value
    };
    postData(API_URL, newUser);
    form.reset();
});

function displayUserCards(users) {
    userWrapper.innerHTML = users.map(user => `
        <div data-id="${user.accountId}" class="user-card">
            <div class="user-img">
                <img src="${user.profileUrl}" alt="${user.fullName}">
            </div>
            <div class="user-details">
                <h2 class="user-name">${user.fullName}</h2>
                <p class="user-handle">@${user.userHandle}</p>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `).join('');
}

userWrapper.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
        let userId = e.target.closest(".user-card").dataset.id;
        try {
            let response = await fetch(`${API_URL}/accounts/${userId}`, { method: "DELETE" });
            let data = await response.json();
            console.log("Delete response:", data.message);
            fetchData(API_URL);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
});

fetchData(API_URL);

// profile.js

function changeProfilePic() {
    const input = document.getElementById('profile-pic-input');
    const file = input.files[0];
    const img = document.getElementById('profile-pic');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Data = e.target.result;
            img.src = base64Data;

            const username = getLoggedInUser();
            localStorage.setItem(`profilePic_${username}`, base64Data);
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const username = getLoggedInUser();
  const label = document.getElementById("profile-name-label");
  const input = document.getElementById("profile-name-input");
  const savedPic = localStorage.getItem(`profilePic_${username}`);

  if (savedPic) {
    document.getElementById('profile-pic').src = savedPic;
  }


  if (!username) {
    window.location.href = "login.html";
    return;
  }

  // Try to load custom name for user
  const savedName = localStorage.getItem(`name_${username}`);
  const nameToShow = savedName || username;

  label.textContent = nameToShow;
  input.value = nameToShow;

  input.style.display = "none";
  label.style.display = "inline";
});

function toggleNameEdit() {
  const label = document.getElementById("profile-name-label");
  const input = document.getElementById("profile-name-input");

  label.style.display = "none";
  input.style.display = "inline";
  input.focus();
}

function handleNameKey(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Important!

    const input = document.getElementById("profile-name-input");
    const label = document.getElementById("profile-name-label");
    const username = getLoggedInUser();

    const newName = input.value.trim();
    if (newName) {
      localStorage.setItem(`name_${username}`, newName);
      label.textContent = newName;
    }

    input.style.display = "none";
    label.style.display = "inline";
  }
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = "login.html";
}

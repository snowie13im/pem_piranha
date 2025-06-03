
function saveUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  users[username] = password;
  localStorage.setItem('users', JSON.stringify(users));
}

function authenticate(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  return users[username] && users[username] === password;
}

function setLoggedInUser(username) {
  localStorage.setItem('loggedInUser', username);
}

function getLoggedInUser() {
  return localStorage.getItem('loggedInUser');
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = "login.html";
}

function requireLogin() {
  if (!getLoggedInUser()) {
    window.location.href = "login.html";
  }
}

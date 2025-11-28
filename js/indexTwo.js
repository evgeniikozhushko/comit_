// Data fetching function - only responsible for getting raw data
async function fetchUsers() {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const apiData = await response.json();
    return apiData.results; // Return raw API data
  }
  catch (error) {
    console.error('Fetch error:', error.message);
    throw error; // Re-throw to handle in calling function
  }
}

// Data transformation function - only responsible for mapping
function mapUsers(apiUsers) {
  return apiUsers.map(user => ({
    id: user.login.uuid,
    fullName: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
    avatar: user.picture.medium,
    location: `${user.location.city}, ${user.location.country}`,
    age: user.dob.age,
  }));
}

// Display function - only responsible for UI
function displayUsers(users) {
  const suggestionsList = document.getElementById('suggestions');
  suggestionsList.innerHTML = '';

  users.forEach((user) => {
    const listItem = document.createElement('li');
    listItem.className = 'card';
    listItem.innerHTML = `
      <article class="user-card">
        <img src="${user.avatar}" alt="${user.fullName}" class="user-avatar">
        <div class="user-info">
          <h3>${user.fullName}</h3>
          <p class="user-email">${user.email}</p>
          <p class="user-phone">${user.phone}</p>
          <p class="user-location">${user.location}</p>
          <p class="user-age">Age: ${user.age}</p>
        </div>
      </article>
    `;
    suggestionsList.appendChild(listItem);
  });
}

// Main initialization function - orchestrates everything
async function init() {
  try {
    const rawUsers = await fetchUsers();
    const mappedUsers = mapUsers(rawUsers);
    displayUsers(mappedUsers);
  }
  catch (err) {
    console.error('Initialization error:', err);
    displayError('Failed to load users. Please try again.');
  }
}

function displayError(message) {
  const errorElement = document.querySelector('.error');
  errorElement.textContent = message;
}

init();

# 🎬 Netflix Clone

A responsive Netflix-inspired web application built using React.js. The application allows users to browse movies and TV shows, view detailed information, watch trailers, search for content, and manage a personal wishlist using Firebase Authentication and Firestore.

## 🚀 Features

- 🎥 Browse movies and TV shows
- 🔍 Search movies and TV shows
- 📄 View detailed movie/TV show information
- 🎭 Display cast and crew information
- ▶️ Watch trailers and teasers
- 🔐 User registration and login
- 🚪 User logout
- ❤️ Add and remove movies/TV shows from wishlist
- ☁️ Store wishlist data using Firebase Firestore
- 👤 Firebase Authentication
- 📱 Responsive design for desktop and mobile
- 🪟 Login and registration modals using React Portals
- 🔔 Toast notifications for user actions

## 🛠️ Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Firebase Authentication
- Firebase Firestore
- Axios
- React Toastify
- TMDB API
- React Portals
- Vite

## 📂 Project Structure

```text
src/
├── components/
│   ├── Header/
│   ├── Register/
│   ├── Login/
│   ├── Details/
│   ├── ...
│
├── Firebase/
│   └── firebase.js
│
├── App.jsx
├── AuthModal.jsx
├── main.jsx
└── index.css

public/
│
.env
.gitignore
package.json
package-lock.json
vite.config.js
README.md
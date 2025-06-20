# Cookify 🍽️ – Modern Recipe Book Web App

[Live Website](https://subscription-box-auth-react.web.app/) | [Backend Server Repo](https://github.com/WRATHexe/Cookify-Recipe-Server)

---

## Overview

**Cookify** is a full-stack recipe book web application where users can discover, share, and manage their favorite recipes. Built with React, Firebase Authentication, and a custom Node.js/Express backend, Cookify offers a seamless and interactive experience for food lovers.

---

## Features

- 🔐 **Authentication:** Secure registration, login, and Google OAuth via Firebase.
- 📖 **Browse Recipes:** View all recipes, filter by cuisine, and see top-rated dishes.
- ➕ **Add Recipes:** Authenticated users can add new recipes with images, ingredients, and instructions.
- ✏️ **Edit & Delete:** Manage your own recipes with update and delete functionality.
- ❤️ **Like Recipes:** Show appreciation for others’ recipes (except your own).
- 🔍 **Responsive UI:** Fully responsive and mobile-friendly design.
- 🌙 **Dark/Light Mode:** Toggle between dark and light themes.(Only For Home Page)
- 📝 **Error Handling:** Friendly error pages and toast notifications for user feedback.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, DaisyUI, Lottie
- **Authentication:** Firebase Auth
- **Backend:** Node.js, Express, MongoDB ([Backend Repo](https://github.com/WRATHexe/Cookify-Recipe-Server))
- **Deployment:** Vercel (Backend), Firebase Hosting (Frontend)

---

## Getting Started

### Prerequisites

- Node.js & npm
- [Backend Server](https://github.com/WRATHexe/Cookify-Recipe-Server) running (see backend repo for setup)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/WRATHexe/Cookify-Recipe-Website-Client.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure Firebase:**

   - Update `src/Firebase/firebase.init.js` with your Firebase project credentials.

4. **Start the development server:**

   ```sh
   npm run dev
   ```

5. **Visit:** [http://localhost:5173](http://localhost:5173)

---

## Folder Structure

```
src/
  components/      # Reusable UI components
  pages/           # Main page components (Home, Login, Register, etc.)
  layouts/         # Layout components
  provider/        # Context providers (Auth)
  Firebase/        # Firebase config
  Routes/          # Routing setup
  assets/          # Images & animations
public/
  index.html
```

---

## Credits

- UI inspired by modern recipe platforms.
- Animations by [LottieFiles](https://lottiefiles.com/).

---

## License

This project is for educational purposes.

---

**Made with ❤️ by [WRATHexe]**

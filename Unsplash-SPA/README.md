# 🌌 ViewPort

### Modern Unsplash-Inspired Photo Sharing Platform

<p align="center">
  <b>A sleek, responsive photo gallery built with the MERN stack.</b><br>
  Designed with a glassmorphic dark theme and modern UI principles.<br><br>

ViewPort allows users to explore high-quality images across multiple categories<br>
through a fast, smooth, and visually immersive interface.<br>
It features a dynamic sidebar navigation, responsive image grid,<br>
and a secure admin panel for managing gallery content.<br><br>

Built as a full-stack project to demonstrate modern React architecture,<br>
RESTful API design, authentication workflows, and responsive UI development.

</p>

---

---

## 🧰 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Material UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## ✨ Key Features

- 🖼️ Responsive image gallery
- 📂 Category-based filtering
- 🎨 Glassmorphic dark UI
- 📱 Fully responsive layout
- 🧭 Toggleable sidebar navigation
- 🔐 Admin dashboard
- ⬆️ Image upload, update, delete
- ⚡ Fast REST API integration

---

## 📸 Screenshots

### Gallery

### Sidebar

### Admin Panel

---

## 📁 Project Structure

```
ViewPort/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/viewport.git
cd viewport
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm start
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Admin Features

Admin dashboard allows:

- Image upload
- Image editing
- Image deletion
- User management

---

## 📌 API Endpoints

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/gallery/get/:category` | Get images by category |
| POST   | `/api/admin/upload`          | Upload image           |
| PUT    | `/api/admin/update/:id`      | Update image           |
| DELETE | `/api/admin/delete/:id`      | Delete image           |

---

## 🌱 Future Enhancements

- User authentication & profiles
- Image likes and downloads
- Search functionality
- Infinite scrolling
- Public user galleries

---

## 👤 Author

**Dipankar Sarkar**
GitHub: https://github.com/Dipankar1508

---

## ⭐ Support

If you like this project, consider giving it a **star** on GitHub!

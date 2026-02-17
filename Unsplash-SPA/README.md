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
<img width="1894" height="861" alt="image" src="https://github.com/user-attachments/assets/2f7198c2-9abd-42a8-9cb5-d46061a66aef" />

<img width="1903" height="863" alt="image" src="https://github.com/user-attachments/assets/a848c94b-f327-4f84-8932-5358ffc9531c" />

### Mobile view

<img width="663" height="812" alt="image" src="https://github.com/user-attachments/assets/658f90c0-2241-4b35-b72f-576a3903eb6f" />

### Sidebar
<img width="955" height="860" alt="image" src="https://github.com/user-attachments/assets/7020cadc-aae9-4f52-8f5e-a39b5abd7d6a" />

### Register & Login
<img width="1908" height="863" alt="image" src="https://github.com/user-attachments/assets/bed9252b-9961-4f7c-a30b-acb5b815319a" />

<img width="1916" height="866" alt="image" src="https://github.com/user-attachments/assets/52f133af-8d86-44a5-982a-505e849d5b1c" />

### Admin Panel
<img width="1910" height="865" alt="image" src="https://github.com/user-attachments/assets/e9ddc908-fa55-4ef8-970f-f185f68a5850" />

<img width="1894" height="864" alt="image" src="https://github.com/user-attachments/assets/108d58a9-07a2-4835-8103-978d57d83fba" />

<img width="1911" height="866" alt="image" src="https://github.com/user-attachments/assets/bf0cf517-7286-4957-901d-2de9de93429b" />

<img width="1919" height="565" alt="image" src="https://github.com/user-attachments/assets/e7979c4d-426c-4d8b-8d27-32034a31701b" />

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

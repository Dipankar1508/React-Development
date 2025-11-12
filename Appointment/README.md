# 🏥 MediConnect Pro — Hospital Doctor Appointment Management System

![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express.js-yellow)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-MIT-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

A **full-stack MERN application** designed to streamline hospital appointment management between **doctors, patients, and admins**.
MediConnect Pro offers **role-based authentication**, **secure JWT login**, and an elegant **admin dashboard** to manage users, doctors, patients, appointments, and feedback.

---

## 🚀 Overview

MediConnect Pro provides an intuitive way for patients to book appointments with verified doctors, while doctors can manage their schedules efficiently.
Admins have full control over system operations, including viewing feedback, managing users, and monitoring system activity.

---

## 🎯 Key Features

### 👨‍⚕️ Doctor Portal

- Register securely using a **Doctor PIN** validated by the admin.
- Manage doctor profile: specialization, experience, fees, availability.
- View, approve, or cancel appointments.

### 🧍 Patient Portal

- Secure registration and login.
- Browse doctors by specialization.
- Book, cancel, and view appointment history.

### 🧑‍💼 Admin Dashboard

- Secure JWT-based login.
- View system-wide analytics: total users, doctors, patients, and appointments.
- Manage all users (create, view, and delete).
- Manage doctors, patients, and appointments with CRUD actions.
- View and delete user feedback.
- Access dynamic bar chart analytics via **ApexCharts**.

### 💬 Feedback System

- Users can submit feedback via the **Contact page**.
- Feedbacks are displayed publicly with **pagination support**.
- Admin can monitor and delete feedback from their dashboard.

---

## 🧩 Tech Stack

| Layer            | Technology                                                |
| ---------------- | --------------------------------------------------------- |
| Frontend         | React (Vite) + Tailwind CSS + Material UI + Framer Motion |
| Backend          | Node.js + Express.js                                      |
| Database         | MongoDB + Mongoose                                        |
| Authentication   | JWT (JSON Web Token)                                      |
| Additional Tools | Axios, Bcrypt, Crypto, ApexCharts                         |

---

## 🧰 Technologies Used

### 🌐 Frontend

- **React.js (Vite)** — Frontend framework for building fast, modular UI.
- **React Router DOM** — For routing and page navigation.
- **Tailwind CSS** — For responsive, utility-first styling.
- **Material UI (MUI)** — For consistent and professional UI components.
- **Framer Motion** — For smooth animations and transitions.
- **Axios** — For API communication with the backend.
- **React Icons** — For icons (FontAwesome, etc.).
- **ApexCharts.js** — For admin dashboard analytics and chart visualization.
- **Toast notifications** — For real-time success/error alerts.

---

### ⚙️ Backend

- **Node.js** — Server-side JavaScript runtime.
- **Express.js** — Backend web framework to handle routes and middleware.
- **Mongoose** — ODM library to interact with MongoDB.
- **Bcrypt.js** — For password hashing and security.
- **Crypto** — For secure token and PIN generation.
- **JWT (JSON Web Token)** — For authentication and authorization.
- **Dotenv** — For managing environment variables securely.
- **Cors** — To allow frontend-backend communication.
- **Nodemon** — For automatic backend server restarts during development.

---

### 🗄️ Database

- **MongoDB Atlas** — Cloud NoSQL database for storing all users, doctors, patients, appointments, and feedback data.

---

### 🧩 Architecture & Deployment

- **MERN Stack** — (MongoDB, Express.js, React.js, Node.js)
- **RESTful API architecture** — Clean, modular route design.
- **JWT-based Authentication System** — Role-based secure access for Admin, Doctor, and Patient.
- **Modular Folder Structure** — Separate routes, models, middleware, and UI layers.
- **Vite Development Server** — Super-fast hot module reloading for React.

---

### 🧠 Developer Tools

- **Visual Studio Code (VS Code)** — IDE used for development.
- **Postman / Thunder Client** — For API testing.
- **Git & GitHub** — Version control and code hosting.
- **ESLint & Prettier** _(optional)_ — For code linting and formatting.

---

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](<img width="1892" height="860" alt="image" src="https://github.com/user-attachments/assets/8d404630-05be-4656-826a-e7ab080958e6" />)

### 🏨 Login Page

![Login Page](./frontend/public/screenshots/login-page.png)

### 🏨 Register Page

![Register Page](./frontend/public/screenshots/register-page.png)

### 🖥️ Admin Dashboard

![Admin Dashboard](./frontend/public/screenshots/admin-dashboard.png)

### 📱 Contact & Feedback Page

![Contact Feedback](./frontend/public/screenshots/contact-feedback.png)

### 👨‍⚕️ Doctor Dashboard

![Doctor Dashboard](./frontend/public/screenshots/doctor-dashboard.png)

### 🧍 Patient Dashboard

![Patient Dashboard](./frontend/public/screenshots/patient-dashboard.png)

> 📌 _You can replace these image paths with your actual screenshot locations or placeholders._
> For best results, store screenshots in:  
> `frontend/public/screenshots/` folder.

---

## 🗂️ Project Structure

```
Appointment/
│
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   ├── Patient.js
│   │   ├── Appointment.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── AuthRoute.js
│   │   ├── DoctorRoute.js
│   │   ├── PatientRoute.js
│   │   ├── AppointmentRoute.js
│   │   ├── AdminRoute.js
│   │   └── FeedbackRoute.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── (other shared components)
│   │   │
│   │   ├── views/
│   │   │   ├── DoctorForm.jsx
│   │   │   ├── DoctorDashbaord.jsx
│   │   │   ├── DoctorEditForm.jsx
│   │   │   └── DoctorAppointments.jsx
│   │   │
│   │   │   ├── PatientForm.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── PatientEditForm.jsx
│   │   │   ├── PatientBookAppointment.jsx
│   │   │   └── PatientAppointments.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   ├── ManageDoctors.jsx
│   │   │   ├── ManagePatients.jsx
│   │   │   ├── ManageAppointments.jsx
│   │   │   └── ManageFeedback.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── api.js
│   │
│   └── package.json
│
└── README.md

```

---

## ⚙️ Environment Variables

In `/backend/.env`, add:

```env
PORT=7000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
DOCTOR_SECRET_PIN=854129
```

---

## 🧭 Installation & Setup

### 1️⃣ Clone Repository

#### Travel to github link

**[https://github.com/Dipankar1508/React-Development.git]**

```bash
git clone https://github.com/<your-username>/Appointment.git
cd Appointment

```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

> Server runs on **[http://localhost:7000](http://localhost:7000)**

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on **[http://localhost:5173](http://localhost:5173)**

---

## 📊 Admin Dashboard Overview

- Displays **total users, doctors, patients, and appointments**.
- Interactive **bar chart analytics** via ApexCharts.
- One-click management for all system entities.
- View and delete feedback directly from the dashboard.

---

## 💬 Contact & Feedback Page

- Modern design using **Tailwind + Framer Motion** animations.
- Feedback form sends data using **Axios**.
- Feedbacks display below the contact form with pagination controls (Next / Previous).
- Fully responsive and accessible.

---

### 🖌️ Optional Enhancements (Future or Planned)

- **Razorpay / Stripe** — For payment gateway integration.
- **SendGrid / Nodemailer** — For email notifications.
- **FullCalendar.js** — For calendar-based appointment management.
- **Cloudinary / AWS S3** — For doctor profile photo storage.

## 🧠 Future Enhancements

- Email/SMS appointment reminders.
- Calendar-based doctor scheduling.
- Appointment rescheduling feature.
- Online payment gateway integration (Razorpay / Stripe).
- Role-based activity logs.
- Export reports (CSV / PDF).

---

## 👨‍💻 Author

**Dipankar Sarkar**

- 💼 GitHub: [@Dipankar1508](https://github.com/Dipankar1508)
- 📧 Email: _[sciencexlldipankarsarkar@gmail.com](mailto:sciencexlldipankarsarkar@gmail.com)_
  I am beginner in React and Node.js. I am learning and improving my skills every day. I hope this project will help you learn and grow as well.
  But if you have any suggestions or feedback to improve it more anyhow , please feel free to reach out to me.

---

## 🪪 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute it with proper credit.

---

## 🌟 Acknowledgements

- [React Documentation](https://react.dev/)
- [Node.js](https://nodejs.org/en/docs)
- [MongoDB](https://www.mongodb.com/docs/)
- [Material UI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)

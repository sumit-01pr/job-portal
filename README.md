# 🚀 Job Portal Application

A full-stack MERN Job Portal Application that connects recruiters and job seekers through a secure and user-friendly platform. The application enables recruiters to post and manage jobs while allowing job seekers to browse and apply for opportunities.

## 🌐 Live Demo

Frontend: https://job-portal-sumit12.vercel.app/

Backend API: https://job-portal-utxq.onrender.com

## 📂 GitHub Repository

Repository Link: https://github.com/sumit-01pr/job-portal

---

## 📖 Features

### 👨‍💼 Recruiter Features

* Recruiter Registration & Login
* JWT-based Authentication
* Create Job Listings
* Update Job Details
* Delete Job Posts
* View Applicants

### 👨‍🎓 Job Seeker Features

* User Registration & Login
* Browse Available Jobs
* View Job Details
* Apply for Jobs
* Manage Profile

### 🔒 Security Features

* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Password Encryption

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3 / Tailwind CSS
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt.js

### Tools & Deployment

* Git & GitHub
* Postman
* Vercel
* Render

---

## 📁 Project Structure

```text
job-portal/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── config/
│
├── screenshots/
├── README.md
└── package.json
```

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/job-portal.git
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Run Backend

```bash
npm start
```

### Run Frontend

```bash
npm run dev
```

---

## 🔗 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Jobs

```http
GET    /api/jobs
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Applications

```http
POST /api/applications
GET  /api/applications
```

---

## 🎯 Learning Outcomes

* Full Stack MERN Development
* RESTful API Development
* JWT Authentication & Authorization
* Role-Based Access Control
* MongoDB Data Modeling
* CRUD Operations
* Deployment using Vercel & Render
* Git & GitHub Workflow

---

## 🚀 Future Enhancements

* Resume Upload Feature
* Job Search & Filtering
* Email Notifications
* Admin Dashboard
* Real-Time Messaging
* Interview Scheduling

---

👨‍💻 Author

Sumit Prajapati

📧 Email: sumitprajapati03935@gmail.com

💼 LinkedIn: https://www.linkedin.com/in/sumit-prajapati-a70a50248/

🐙 GitHub: https://github.com/sumit-01pr

⭐ If you found this project useful, consider giving it a star on GitHub.


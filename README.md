# **Veloura – Full Stack Perfume E-Commerce Platform**

Veloura is a full-stack perfume e-commerce web application where users can explore luxury fragrances, search products, add them to cart, and place orders securely.

The application demonstrates a modern React + Spring Boot + MySQL architecture, deployed on the cloud with containerization using Docker.

---

## 🌐 Live Demo

https://veloura-b0qg.onrender.com

---

## 🧩 Tech Stack

### Frontend

- React (Vite)
- JavaScript
- CSS
- Axios
- React Context API (Cart State Management)

### Backend

- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- JWT Authentication

### Database

- MySQL
- Railway Cloud Database

### DevOps / Deployment

- Docker
- Render Cloud Hosting
- GitHub Version Control

---

## ⚙️ Features

### User Features

- Browse perfume products
- View perfume details and images
- Search perfumes by name
- Filter products by category
- Add perfumes to cart
- Remove perfumes from cart
- View total cart price
- Place orders
- Secure login & registration using JWT
- Persistent cart data from backend

### Admin / System Features

- Product inventory management
- Stock management
- Image URL handling
- Backend REST API architecture
- Cloud database integration
- Docker containerization
- Full deployment pipeline

---

## 🏗️ System Architecture

User Browser
↓
React Frontend (Vite)
↓
Spring Boot REST API
↓
MySQL Database (Railway)

---

## 📂 Project Structure

veloura-ecommerce
│
├── backend
│   ├── src
│   ├── pom.xml
│   ├── Dockerfile
│   └── application.properties
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md

---

## 📸 Screenshots


### Home Page

<img width="1916" height="810" alt="Screenshot 2026-03-08 041750" src="https://github.com/user-attachments/assets/f951cc70-020a-43ea-a2fc-d5fb885ff81b" />

<img width="1919" height="801" alt="Screenshot 2026-03-08 041832" src="https://github.com/user-attachments/assets/b5f602e1-30d5-4f38-8365-20bcfc472b1e" />
_Displays available perfumes with search functionality.
_

## Product Listing

<img width="1917" height="802" alt="Screenshot 2026-03-08 041914" src="https://github.com/user-attachments/assets/1237cf00-6f1f-4e35-93f4-7e2cd570d9c9" />
_Perfume cards showing image and add-to-cart option._


### Cart Page

<img width="1916" height="801" alt="Screenshot 2026-03-08 042129" src="https://github.com/user-attachments/assets/f837b274-9e9f-41c4-8f38-25624991eecb" />
_Displays selected items with quantity and total order value._


### Login / Register Page

<img width="1919" height="803" alt="Screenshot 2026-03-08 042020" src="https://github.com/user-attachments/assets/7a66be4b-9c5c-4e52-86ab-ef489f8cfcba" />

<img width="1918" height="794" alt="Screenshot 2026-03-08 041952" src="https://github.com/user-attachments/assets/ab22b38f-9791-4626-b022-c9e37685b9f3" />
_Secure authentication using JWT._


### Database Table

<img width="170" height="202" alt="image" src="https://github.com/user-attachments/assets/702222c4-2aa6-422d-a934-555fcbc6c18f" />

_MySQL database storing product inventory and stock._


### Deployment

<img width="1919" height="792" alt="Screenshot 2026-03-08 042150" src="https://github.com/user-attachments/assets/434aea1f-c3a1-4815-95a7-9c908ce6f877" />
_Application deployed successfully on Render._

---

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication.

### Features include:

- User registration
- User login
- Token generation
- Token validation for protected APIs

---

## 📡 API Endpoints

### Authentication

POST /auth/register
POST /auth/login

---

### Products

GET /perfumes
GET /perfumes/{id}
GET /perfumes/search?name={name}
GET /perfumes/category/{categoryId}

---

### Cart

GET /cart
POST /cart/add
DELETE /cart/remove/{productId}
PUT /cart/update

---

### Orders

POST /orders/place
GET /orders
GET /orders/{orderId}

---

## 🚀 Run Project Locally

#### Clone Repository

git clone https://github.com/Brindhajay/veloura-ecommerce

---

### Backend Setup

cd backend
mvn clean install
mvn spring-boot:run

---

### Frontend Setup

cd frontend
npm install
npm run dev

---

### 🐳 Docker Setup

**Build Docker image:**

docker build -t veloura-app .

**Run container:**

docker run -p 8080:8080 veloura-app

---

### 🗄️ Database Setup

1. Create MySQL database
2. Configure credentials in "application.properties"

spring.datasource.url=jdbc:mysql://localhost:3306/veloura
spring.datasource.username=your_username
spring.datasource.password=your_password

3. Start the backend server.

---

## 📈 Future Improvements

- Order tracking system
- Admin analytics dashboard
- Product recommendation system
- Email notifications
- Mobile responsive enhancements

---

## 👩‍💻 Author

**Brindha Ajay**
_Electronics and Communication Engineering._
***Full-Stack Developer – Java | React | Spring Boot***

---

**⭐ If you like this project
Give the repository a star⭐ on GitHub.**

Veloura – Full Stack Perfume E-Commerce Platform

Veloura is a full-stack perfume e-commerce web application where users can explore luxury fragrances, search products, add them to cart, and place orders securely.

The application demonstrates a modern React + Spring Boot + MySQL architecture, deployed on the cloud with containerization using Docker.

---

🌐 Live Demo

https://veloura-b0qg.onrender.com

---

🧩 Tech Stack

Frontend

- React (Vite)
- JavaScript
- CSS
- Axios
- React Context API (Cart State Management)

Backend

- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- JWT Authentication

Database

- MySQL
- Railway Cloud Database

DevOps / Deployment

- Docker
- Render Cloud Hosting
- GitHub Version Control

---

⚙️ Features

User Features

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

Admin / System Features

- Product inventory management
- Stock management
- Image URL handling
- Backend REST API architecture
- Cloud database integration
- Docker containerization
- Full deployment pipeline

---

🏗️ System Architecture

User Browser
↓
React Frontend (Vite)
↓
Spring Boot REST API
↓
MySQL Database (Railway)

---

📂 Project Structure

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

📸 Screenshots

Home Page

<img width="1919" height="805" alt="image" src="https://github.com/user-attachments/assets/22f0f71f-ade9-44d2-9e72-1d4669aa5647" />
<img width="1918" height="805" alt="image" src="https://github.com/user-attachments/assets/63c45eac-1004-461d-a773-1cbef7150f5e" />
Displays available perfumes with search functionality.

Product Listing

<img width="1919" height="800" alt="image" src="https://github.com/user-attachments/assets/c98b1a58-c32f-4b4d-a53c-0af84b1a7d06" />
Perfume cards showing image, price, and add-to-cart option.

Cart Page

<img width="1918" height="801" alt="image" src="https://github.com/user-attachments/assets/8734d583-6281-44fe-8030-3f0dd4777d47" />
Displays selected items with quantity and total order value.

Login / Register Page

<img width="1919" height="665" alt="image" src="https://github.com/user-attachments/assets/c62adf26-66de-42ce-bbfb-71cd5e353f50" />
Secure authentication using JWT.

Database Table

<img width="170" height="202" alt="image" src="https://github.com/user-attachments/assets/702222c4-2aa6-422d-a934-555fcbc6c18f" />
MySQL database storing product inventory and stock.

Deployment

<img width="1915" height="797" alt="image" src="https://github.com/user-attachments/assets/14b2b551-b550-444e-8663-9f4f789e6278" />
Application deployed successfully on Render.

---

🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication.

Features include:

- User registration
- User login
- Token generation
- Token validation for protected APIs

---

📡 API Endpoints

Authentication

POST /auth/register
POST /auth/login

---

Products

GET /perfumes
GET /perfumes/{id}
GET /perfumes/search?name={name}
GET /perfumes/category/{categoryId}

---

Cart

GET /cart
POST /cart/add
DELETE /cart/remove/{productId}
PUT /cart/update

---

Orders

POST /orders/place
GET /orders
GET /orders/{orderId}

---

🚀 Run Project Locally

Clone Repository

git clone https://github.com/Brindhajay/veloura-ecommerce

---

Backend Setup

cd backend
mvn clean install
mvn spring-boot:run

---

Frontend Setup

cd frontend
npm install
npm run dev

---

🐳 Docker Setup

Build Docker image:

docker build -t veloura-app .

Run container:

docker run -p 8080:8080 veloura-app

---

🗄️ Database Setup

1. Create MySQL database
2. Configure credentials in "application.properties"

spring.datasource.url=jdbc:mysql://localhost:3306/veloura
spring.datasource.username=your_username
spring.datasource.password=your_password

3. Start the backend server.

---

📈 Future Improvements

- Order tracking system
- Admin analytics dashboard
- Product recommendation system
- Email notifications
- Mobile responsive enhancements

---

👩‍💻 Author

Brindha Ajay
Electronics and Communication Engineering
Full-Stack Developer – Java | React | Spring Boot

---

⭐ If you like this project
Give the repository a star⭐ on GitHub.

# Restaurant API

## 📌 Overview
The **Restaurant API** is a RESTful API that allows users to manage restaurant details, including CRUD operations for restaurants and user authentication with admin privileges.

## ⚡ Features
- ✅ **User Authentication** (Signup, Login, JWT-based Auth)
- ✅ **Admin Controls** (Only admins can perform certain actions)
- ✅ **CRUD Operations for Restaurants**
- ✅ **Role-based Authorization**

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Middleware**: bcrypt for password hashing, JWT for authentication

## 🚀 Installation
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/restaurant-api.git
cd restaurant-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file in the root directory and add:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the server
```bash
npm start
```

---

## 📌 API Endpoints

### 🔑 **Authentication Routes**
| Method | Endpoint          | Description          |
|--------|------------------|----------------------|
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login` | Login and get JWT Token |

### 🍽 **Restaurant Routes**
| Method | Endpoint                | Description |
|--------|--------------------------|-------------|
| GET    | `/api/v1/restaurant/getAll` | Get all restaurants |
| GET    | `/api/v1/restaurant/:id` | Get restaurant by ID |
| POST   | `/api/v1/restaurant/create` | Create a new restaurant (Admin only) |
| PUT    | `/api/v1/restaurant/update/:id` | Update restaurant details (Admin only) |
| DELETE | `/api/v1/restaurant/delete/:id` | Delete a restaurant (Admin only) |

---

## 🔐 Authentication & Authorization
- **Users** can register, log in, and view restaurants.
- **Admins** have additional permissions to create, update, and delete restaurants.
- **JWT-based authentication** is required for protected routes.


## 📌 Running API Tests
You can use **Postman** or **cURL** to test API endpoints. Example:
```bash
curl -X GET http://localhost:8080/api/v1/restaurant/getAll -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🚀 Future Improvements
- ✅ Implement pagination for `getAll` restaurants.
- ✅ Add image upload for restaurants.
- ✅ Improve error handling with centralized middleware.

---

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a pull request.

---

---

## 📞 Contact
For any queries, feel free to reach out:
📧 Email: [ankitrajlogin@gmail.com](mailto:ankitrajlogin@gmail.com)

Happy coding! 🚀


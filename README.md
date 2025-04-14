
---
# ☕ Coffee Station – Backend API

A Node.js + Express backend server powering the Coffee Station mobile app.  
The system manages coffee orders, users, and real-time communication between clients and baristas using WebSockets and MongoDB.

## 📦 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web application framework
- **MongoDB + Mongoose** – NoSQL database & ORM
- **JWT (JSON Web Tokens)** – Token-based user authentication
- **Socket.IO** – Real-time bidirectional communication
- **Heroku** – Hosting platform

---

## 📐 Project Structure

```
coffee-backend/
├── controllers/        # Logic for handling API requests (orders, users)
├── models/             # Mongoose schemas for User, Order
├── routes/             # API route definitions
├── middleware/         # Auth token verification, error handling
├── socket/             # WebSocket connection logic
├── config/             # MongoDB connection config
├── app.js              # Main Express server file
├── package.json
```

---

## 🔐 Authentication & Authorization

- Users authenticate using `/login` and receive a JWT token.
- Tokens are sent in the `Authorization` header of protected routes.
- Middleware `auth.js` verifies tokens and attaches user info to the request.

---

## 📡 WebSocket Communication (Socket.IO)

The system maintains a real-time channel between:
- 📱 **Client app (customer)** – sends new orders
- 👨‍🍳 **Barista dashboard** – receives and updates order statuses

Every order state update is broadcasted through the socket channel.

```js
// Sample Socket.IO Event Flow:
socket.on('newOrder', orderData => {
  io.emit('orderUpdate', updatedOrder); // Broadcast to all clients
});
```

---

## 📚 API Endpoints

### 👤 User

| Method | Endpoint     | Description                  |
|--------|--------------|------------------------------|
| POST   | /login       | Authenticate user & return token |
| GET    | /profile     | Get current user details     |

### 🛒 Orders

| Method | Endpoint        | Description                     |
|--------|------------------|---------------------------------|
| POST   | /orders          | Submit a new order              |
| GET    | /orders/history  | Retrieve user’s past orders     |
| PUT    | /orders/:id      | Update order status (barista)   |

---

## 🗃️ Database Models

### `User` Schema
```js
{
  name: String,
  email: String,
  password: String (hashed),
  role: 'customer' | 'barista'
}
```

### `Order` Schema
```js
{
  customer: ObjectId,
  items: [ { name, size, milkType, extras } ],
  status: 'new' | 'in_process' | 'done',
  createdAt: Date
}
```

---

## 🔧 Setup & Run Locally

1. Clone the repository:
```bash
git clone https://github.com/reutjol/appCoffee.git
cd appCoffee/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

4. Run the server:
```bash
npm start
```

---

## 📈 Features Summary

- User login & authentication
- Order creation & tracking
- Admin (barista) interface for managing order states
- Live updates via WebSocket
- Secure and scalable MongoDB structure

---

## 📄 License

This project is part of an academic assignment at Shenkar College, developed by [Reut Uzan](https://www.linkedin.com/in/reut-uzan-096948197/).

```

---

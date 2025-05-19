# book-review-api


A RESTful API built with Node.js, Express, MongoDB, and JWT authentication to manage books and user reviews.

---

## 🚀 Project Setup

### Prerequisites

✅ Node.js (v14+)  
✅ MongoDB (local or cloud instance like MongoDB Atlas)  
✅ npm (comes with Node.js)  

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api

### 2.Install Dependency
npm install

### 3.  Setup environment variables
Create a .env file in the project root:


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Replace the values with your own credentials.

### 4. run the server
npm run dev

📦 API Endpoints
Authentication
✅ POST /api/signup - Register new user
Body: { "username": "user1", "email": "user1@example.com", "password": "password123" }

✅ POST /api/login - Login user
Body: { "email": "user1@example.com", "password": "password123" }
Returns: { token: "<jwt_token>" }

### Books

✅ **POST** `/api/books` - Add new book (Authenticated)  
⚽ Headers: `Authorization: Bearer <token>`  
⚽ Body: `{ "title": "The Alchemist", "author": "Paulo Coelho", "genre": "Fiction" }`

✅ **GET** `/api/books` - Get all books (with pagination and filters)  
⚽ Query params:  
⚽ `page` (default: 1)  
⚽ `limit` (default: 10)  
⚽ `author` (optional)  
⚽ `genre` (optional)

✅ **GET** `/api/books/:id` - Get book details with reviews and average rating

✅ **GET** `/api/search?query=keyword` - Search books by title or author (partial, case-insensitive)

Reviews
✅ POST /api/books/:id/reviews - Add a review for a book (Authenticated)
Headers: Authorization: Bearer <token>
Body: { "rating": 5, "comment": "Amazing read!" }

✅ PUT /api/reviews/:id - Update your review (Authenticated)
Headers: Authorization: Bearer <token>
Body: { "rating": 4, "comment": "Updated comment" }

✅ DELETE /api/reviews/:id - Delete your review (Authenticated)
Headers: Authorization: Bearer <token>



## 🔧 Example API Requests

### ✅ Signup

```bash
curl -X POST http://localhost:5000/api/signup \
-H "Content-Type: application/json" \
-d '{"username":"user1","email":"user1@example.com","password":"password123"}'

✅ Login
url -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"user1@example.com","password":"password123"}'

✅ Add a Book (Protected)
curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"title":"The Alchemist","author":"Paulo Coelho","genre":"Fiction"}'

✅ Get All Books (with optional query)

curl http://localhost:5000/api/books?page=1&limit=10


✅ Get Book by ID
curl http://localhost:5000/api/books/<BOOK_ID>

✅ Search Books
curl http://localhost:5000/api/search?query=alchemist

✅ Add Review (Protected)
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "Amazing book!"}'

✅ Update Review (Protected)
curl -X PUT http://localhost:5000/api/reviews/<REVIEW_ID> \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"rating": 4, "comment": "Updated review comment"}'

✅ Delete Review (Protected)
curl -X DELETE http://localhost:5000/api/reviews/<REVIEW_ID> \
-H "Authorization: Bearer <TOKEN>"



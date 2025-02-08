
# 🏡 **Real Estate MERN Application**  

🚀 A **Full-Stack Real Estate Platform** where buyers and sellers can interact, sellers can list properties, and admins have control over property approvals. This application is built with the **MERN stack** and utilizes **Firebase for image storage**.  

🔹 **Features**: User authentication, property management, admin approvals, and more.   
🔹 **Technologies**: MongoDB, Express.js, React.js, Node.js, Firebase.  

---

## **📌 Project Overview**  
The **Real Estate MERN Application** allows users to buy, sell, and manage properties efficiently.  
It consists of three roles:  

🔹 **Buyer**: Can browse properties and contact sellers.  
🔹 **Seller**: Can list properties with images, descriptions, and pricing.  
🔹 **Admin**: Can approve/reject property listings and manage users.  

---

## **🚀 Features & Functionality**
### **🔐 User Authentication**  
✔ **Register/Login** – Secure authentication with JWT.  
✔ **Forgot Password** – Reset password via email.  
✔ **Role-Based Access** – Buyers, sellers, and admins have different permissions.  

### **🏡 Property Management**  
✔ **List a Property** – Sellers can upload images & details.  
✔ **View Properties** – Buyers can browse available listings.  
✔ **Approve/Reject Listings** – Admin moderates the listings.  

### **📊 Admin Dashboard**  
✔ **View all users & properties** – Monitor platform activity.  
✔ **Approve or reject properties** – Control listed properties.  
✔ **User Management** – Ban, approve, or update user roles.  

### **🔥 Firebase Integration**  
✔ **Upload Images** – Property images stored securely.  
✔ **Fast Retrieval** – Optimized loading from Firebase.  

---

## **🛠 Tech Stack**
### **Frontend** (Client)  
✅ **React.js** – Dynamic and interactive UI.  
✅ **Tailwind CSS** – Fast and responsive styling.  
✅ **Context API** – State management.  
✅ **Firebase** – Image storage.  

### **Backend** (Server)  
✅ **Node.js & Express.js** – Fast & scalable API.  
✅ **MongoDB & Mongoose** – NoSQL database for data storage.  
✅ **JWT (JSON Web Token)** – Secure authentication.  
✅ **Bcrypt.js** – Password hashing for security.  
✅ **Multer** – Image upload handling.  

---

## **📂 Project Structure**
```
real-estate-app/
│── client/             # React Frontend  
│   ├── src/  
│   │   ├── components/ # UI components  
│   │   ├── pages/      # Application pages  
│   │   ├── context/    # State management  
│   │   ├── firebase.js # Firebase config  
│── server/             # Express Backend  
│   ├── models/         # Mongoose Models  
│   ├── routes/         # API Routes  
│   ├── middleware/     # Authentication Middleware  
│   ├── utils/          # Utility functions  
│── .env                # Environment Variables  
│── package.json        # Project Dependencies  
│── README.md           # Documentation  
```

---

## **🔧 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/kartik0209/Realstate.git
cd Realstate
```

### **2️⃣ Backend Setup (Server)**
```sh
cd server
npm install
```
- **Create a `.env` file** inside the `server/` directory and add:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  FIREBASE_API_KEY=your_firebase_api_key
  ```

- **Start the backend server**:
  ```sh
  npm run dev
  ```
  The API will be running at **`http://localhost:5000`**.

---

### **3️⃣ Frontend Setup (Client)**
```sh
cd client
npm install
```
- **Create a `.env` file** inside `client/` and add Firebase credentials:
  ```
  REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
  REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  ```

- **Start the frontend**:
  ```sh
  npm start
  ```
  The app will be running at **`http://localhost:3000`**.

---

## **🔗 API Endpoints**
| Method | Endpoint                   | Description                 |
|--------|----------------------------|-----------------------------|
| POST   | `/api/auth/register`       | Register a new user        |
| POST   | `/api/auth/login`          | Login user                 |
| POST   | `/api/auth/forgot-password`| Send reset password link   |
| POST   | `/api/properties`          | Add a new property (Seller)|
| GET    | `/api/properties`          | Get all properties         |
| PATCH  | `/api/admin/approve/:id`   | Approve a property (Admin) |
| DELETE | `/api/admin/reject/:id`    | Reject a property (Admin)  |

---

## **📸 Firebase Configuration**
- Go to **Firebase Console**.
- Create a project and enable **Firebase Storage**.
- Copy the **Firebase Config** and update it in `client/src/firebase.js`.

---

## **💡 Future Enhancements**
🔹 **Advanced Search & Filters** – Location, price range, and amenities.  
🔹 **Real-Time Chat** – Buyers & sellers can communicate.  
🔹 **Payment Gateway Integration** – Secure transactions.  

---

## **🤝 Contributing**
Contributions are always welcome! If you have any improvements or features, feel free to submit a pull request.  


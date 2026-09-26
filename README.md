# VÉRA - Premium Authentication Platform

VÉRA is a complete, production-quality MERN stack authentication website with an extremely premium, modern, aesthetic UI inspired by Apple, Linear, and Stripe.

"One beautiful place to continue."

## Features

- **Instagram ID Login:** Authenticate using an Instagram username and custom password.
- **Email Login (OTP):** Secure 6-digit OTP verification via email.
- **Phone Login (OTP):** Phone authentication simulation with OTP sent to an associated email.
- **Premium UI:** Glassmorphism, animated backgrounds, micro-interactions with Framer Motion.
- **Secure Backend:** JWT authentication, bcrypt/Argon2id hashing, express-rate-limit, Helmet, CORS.

## 1. Installation

1. Clone the repository
2. Navigate to the frontend:
   ```bash
   cd client
   npm install
   ```
3. Navigate to the backend:
   ```bash
   cd server
   npm install
   ```

## 2. Environment Variables

Create a `.env` file in the `server` directory using the `.env.example` as a template:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/vera
JWT_SECRET=super_secret_jwt_key_vera_change_in_prod
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_ethereal_email@ethereal.email
EMAIL_PASSWORD=your_ethereal_password
CLIENT_URL=http://localhost:5173
```

## 3. MongoDB Setup

Make sure you have MongoDB installed locally and running on port `27017`.
Alternatively, you can use a MongoDB Atlas URI in the `MONGODB_URI` environment variable.

## 4. Email Configuration

The backend uses Nodemailer for sending OTPs. 
For development, you can create a test account at [Ethereal Email](https://ethereal.email/) and place the credentials in your `.env` file.

## 5. Development Commands

**Start the Backend Server (from `/server` directory):**
```bash
npm run dev
# or
node server.js
```
The backend runs on `http://localhost:5000` by default.

**Start the Frontend Client (from `/client` directory):**
```bash
npm run dev
```
The frontend runs on `http://localhost:5173` by default.

## 6. Production Build

To build the frontend for production:
```bash
cd client
npm run build
```
This will generate optimized static assets in the `dist` folder.

## 7. Deployment Instructions

1. **Database:** Host MongoDB on MongoDB Atlas.
2. **Backend:** Deploy the Express server on platforms like Render, Heroku, or DigitalOcean. Set all environment variables securely on the platform.
3. **Frontend:** Deploy the Vite React app on Vercel or Netlify. Set the `VITE_API_URL` (if configured) or ensure CORS allows your frontend domain. Ensure routing works properly for SPAs (redirecting all paths to `index.html`).

## Security Note
Never commit your `.env` file containing real secrets or database credentials to version control. Ensure it is included in your `.gitignore`.
# Vera

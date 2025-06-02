# RaysVeda

RaysVeda is a web platform that brings ancient Vedic wisdom and rituals to the modern world. Users can explore Vedic knowledge, book spiritual services and pujas online, and receive guidance from experienced pandits—all from the comfort of their home.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Key Functionality](#key-functionality)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Home Page:** Hero section, about, services, featured pujas, and call-to-action.
- **Book Pooja:** Users can fill a form and pay online via Razorpay; confirmation email sent after payment.
- **Services & Pujas:** Explore various Vedic services and detailed puja options.
- **Vedas Page:** Educational content about the Vedas and their branches, with images and descriptions.
- **Responsive UI:** Built with React and Tailwind CSS for modern, mobile-friendly design.
- **Admin/Backend:** Handles booking logic, payment integration, and email notifications.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payments:** Razorpay API
- **Email:** Nodemailer (Gmail SMTP)
- **Other:** dotenv, CORS

---

## Project Structure

```
RaysVeda/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── BookPoojaForm.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── Vedas.jsx
│   │   └── ...
│   ├── public/
│   └── ...
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/raysveda.git
cd raysveda
```

### 2. Backend Setup

```sh
cd backend
npm install
# Create a .env file with your MongoDB, Razorpay, and email credentials
npm start
```

### 3. Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

---

## Key Functionality

- **Booking Flow:**
  - User fills the Book Pooja form.
  - Booking is saved in MongoDB with status `pending`.
  - Razorpay order is created; user completes payment.
  - On successful payment, backend updates booking to `paid` and sends confirmation email.

- **Vedas Page:**
  - Displays information and images for the four Vedas and their branches.

- **Email Notifications:**
  - Confirmation email sent to the user after successful payment.

---

## Environment Variables

**Backend `.env` example:**
```
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

---

## Screenshots

_Add screenshots of your Home Page, Booking Form, Vedas Page, etc._

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)
# RaysVeda

RaysVeda is a modern web platform that brings ancient Vedic wisdom, rituals, and spiritual services to the digital age. Users can explore Vedic knowledge, book pujas and spiritual consultations online, and receive guidance from experienced pandits—all from the comfort of their home.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Key Functionality](#key-functionality)
- [Environment Variables](#environment-variables)
- [Documentation](#documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Secure signup and login with JWT-based authentication.
- **Dashboard:** Personalized user dashboard showing booking history and payment status.
- **Book Pooja:** Online booking form with Razorpay payment integration and confirmation email.
- **Multilingual Support:** Toggle between English and Hindi throughout the platform.
- **Dark/Light Mode:** Seamless theme switching for better accessibility and user experience.
- **Services & Pujas:** Explore a variety of Vedic services and detailed puja options.
- **Vedas Page:** Educational content about the Vedas and their branches, with images and descriptions.
- **Responsive UI:** Built with React and Tailwind CSS for a modern, mobile-friendly design.
- **Admin/Backend:** Handles booking logic, payment integration, user management, and email notifications.
- **Documentation:** Well-structured codebase with inline comments and a dedicated documentation section.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Payments:** Razorpay API
- **Email:** Nodemailer (Gmail SMTP)
- **Other:** dotenv, CORS

---

## Project Structure

```
RaysVeda/
├── backend/
│   ├── models/
│   │   ├── Booking.js
│   │   ├── PoojaBooking.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── booking.js
│   │   ├── poojaBooking.js
│   │   └── webhook.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookPoojaForm.jsx
│   │   │   ├── layout/
│   │   │   ├── auth/
│   │   │   └── common/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── LanguageContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── PujaPage.jsx
│   │   │   ├── Vedas.jsx
│   │   │   ├── PranPratishtha.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── BookingHistory.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── index.html
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
# Create a .env file with your MongoDB, Razorpay, and email credentials (see below)
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

- **User Dashboard:**
  - Users can view their booking history, payment status, and booking details.
  - Dashboard supports dark/light mode and language toggle.

- **Authentication:**
  - Secure signup and login with JWT.
  - Auth state managed globally via React Context.

- **Multilingual & Theme Support:**
  - Toggle between English and Hindi using the language button.
  - Switch between dark and light mode for accessibility.

- **Documentation:**
  - The codebase is well-commented and organized.
  - For detailed API documentation and usage, see the `/docs` folder (if present) or inline code comments.

---

## Environment Variables

**Backend `.env` example:**
```
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
```

---

## Documentation

- **Codebase:** All major modules, components, and routes are documented with inline comments for clarity.
- **API:** RESTful endpoints for authentication, booking, and payment are described in the code and can be explored via tools like Postman.
- **Frontend:** Components are modular and reusable, with context providers for authentication, language, and theme.
- **Further Docs:** For advanced usage, deployment, or contributing guidelines, see the `/docs` folder or contact the maintainers.

---

## Screenshots

_Add screenshots of your Home Page, Booking Form, Dashboard, Vedas Page, etc. here to showcase the UI and features._

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

**For any questions or support, please refer to the documentation or contact the RaysVeda team.**
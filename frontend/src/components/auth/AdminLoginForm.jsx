


"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen, AlertCircle, CheckCircle } from "lucide-react";
import { adminAPI } from "../../services/api";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [inputType, setInputType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isEmail = (input) => input.includes("@");
  const isPhone = (input) => /^\d{10,}$/.test(input.replace(/\D/g, ""));
  const detectInputType = (val) => (isEmail(val) ? "email" : isPhone(val) ? "phone" : "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "emailOrPhone") setInputType(detectInputType(value));
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const input = formData.emailOrPhone.trim();
    const password = formData.password;
    if (!input || !password) {
      setMessage("Please provide email/phone and password");
      setLoading(false);
      return;
    }

    const requestData = { password };
    try {
      if (isEmail(input)) requestData.email = input.toLowerCase();
      else if (isPhone(input)) requestData.phone = input.replace(/\D/g, "");
      else throw new Error("Enter a valid email or phone");

      if (requestData.email === "admin@raysveda.com") {
        const res = await adminAPI.login({
          email: requestData.email,
          password: requestData.password,
        });
        if (res.success) {
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem("adminUser", JSON.stringify(res.data.admin));
          navigate("/admin");
        } else {
          throw new Error("Admin login failed");
        }
      } else {
        const res = await axios.post("/api/auth/login", requestData);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          login(res.data.user);
          navigate("/dashboard");
        } else {
          throw new Error(res.data.message || "Login failed");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.message || err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-xl border border-orange-100">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-serif">Admin Login</h2>
          <p className="mt-1 text-sm text-gray-600">Welcome back to RaysVeda Admin Panel</p>
        </div>

        {message && (
          <div
            className={`flex items-center gap-2 mb-5 px-4 py-3 text-sm rounded-lg border ${
              message.toLowerCase().includes("fail") || message.includes("valid")
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {message.toLowerCase().includes("fail") || message.includes("valid") ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email or Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Phone
            </label>
            <div className="relative">
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
                placeholder="Enter you email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
              />
              {inputType && (
                <span
                  className={`absolute right-3 top-2 text-xs px-2 py-0.5 rounded-full ${
                    inputType === "email"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {inputType === "email" ? "📧 Email" : "📱 Phone"}
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;




// "use client";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { motion } from "framer-motion";
// import { adminAPI } from "../../services/api";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const isEmail = (input) => input.includes("@");
//   const isPhone = (input) => /^\d{10,}$/.test(input.replace(/\D/g, ""));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (message) setMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     const input = formData.emailOrPhone.trim();
//     const password = formData.password;

//     if (!input || !password) {
//       setMessage("Please provide email/phone and password");
//       setLoading(false);
//       return;
//     }

//     const requestData = { password };

//     try {
//       if (isEmail(input)) requestData.email = input.toLowerCase();
//       else if (isPhone(input)) requestData.phone = input.replace(/\D/g, "");
//       else throw new Error("Enter a valid email or phone");

//       if (requestData.email === "admin@raysveda.com") {
//         const res = await adminAPI.login(requestData);
//         if (res.success) {
//           localStorage.setItem("adminToken", res.data.token);
//           localStorage.setItem("adminUser", JSON.stringify(res.data.admin));
//           navigate("/admin");
//         } else throw new Error("Admin login failed");
//       } else {
//         const res = await axios.post("/api/auth/login", requestData);
//         if (res.data.success) {
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("user", JSON.stringify(res.data.user));
//           login(res.data.user);
//           navigate("/dashboard");
//         } else throw new Error(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || err.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-6xl bg-white shadow-xl rounded-xl flex flex-col md:flex-row overflow-hidden"
//       >
//         {/* Illustration Side */}
//         <div className="md:flex hidden flex-1 items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
//           <img
//             src="/assets/fingerprint-illustration.png"
//             alt="Login Visual"
//             className="max-w-xs w-full"
//           />
//         </div>

//         {/* Login Form Side */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex-1 p-8 sm:p-12"
//         >
//           <h2 className="text-3xl font-bold text-gray-800 mb-1">Holla, Welcome Back</h2>
//           <p className="text-sm text-gray-500 mb-6">Hey, welcome back to your admin space</p>

//           {message && (
//             <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email or Phone</label>
//               <input
//                 type="text"
//                 name="emailOrPhone"
//                 value={formData.emailOrPhone}
//                 onChange={handleChange}
//                 required
//                 className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 placeholder="admin@raysveda.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <div className="relative mt-1">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-2.5 right-3 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm text-gray-600">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   className="accent-orange-500"
//                 />
//                 Remember me
//               </label>
//               <button type="button" className="hover:underline text-orange-500">
//                 Forgot Password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition disabled:opacity-50"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>

//             <p className="text-center text-sm text-gray-600">
//               Don’t have an account?{" "}
//               <a href="/signup" className="text-orange-600 hover:underline font-medium">
//                 Sign Up
//               </a>
//             </p>
//           </form>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginForm;


// "use client";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { motion } from "framer-motion";
// import { adminAPI } from "../../services/api";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const isEmail = (input) => input.includes("@");
//   const isPhone = (input) => /^\d{10,}$/.test(input.replace(/\D/g, ""));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (message) setMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     const input = formData.emailOrPhone.trim();
//     const password = formData.password;

//     if (!input || !password) {
//       setMessage("Please provide email/phone and password");
//       setLoading(false);
//       return;
//     }

//     const requestData = { password };

//     try {
//       if (isEmail(input)) requestData.email = input.toLowerCase();
//       else if (isPhone(input)) requestData.phone = input.replace(/\D/g, "");
//       else throw new Error("Enter a valid email or phone");

//       if (requestData.email === "admin@raysveda.com") {
//         const res = await adminAPI.login(requestData);
//         if (res.success) {
//           localStorage.setItem("adminToken", res.data.token);
//           localStorage.setItem("adminUser", JSON.stringify(res.data.admin));
//           navigate("/admin");
//         } else throw new Error("Admin login failed");
//       } else {
//         const res = await axios.post("/api/auth/login", requestData);
//         if (res.data.success) {
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("user", JSON.stringify(res.data.user));
//           login(res.data.user);
//           navigate("/dashboard");
//         } else throw new Error(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || err.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-6xl bg-white shadow-xl rounded-xl flex flex-col md:flex-row overflow-hidden"
//       >
//         {/* Illustration Side */}
//         <div className="md:flex hidden flex-1 items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
//           <img
//             src="/assets/fingerprint-illustration.png"
//             alt="Login Visual"
//             className="max-w-xs w-full"
//           />
//         </div>

//         {/* Login Form Side */} 
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex-1 p-8 sm:p-12"
//         >
//           <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back</h2>
//           <p className="text-sm text-gray-500 mb-6">Hey, welcome back to your admin space</p>

//           {message && (
//             <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email or Phone</label>
//               <input
//                 type="text"
//                 name="emailOrPhone"
//                 value={formData.emailOrPhone}
//                 onChange={handleChange}
//                 required
//                 className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 placeholder="admin@raysveda.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <div className="relative mt-1">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-2.5 right-3 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm text-gray-600">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   className="accent-orange-500"
//                 />
//                 Remember me
//               </label>
//               <button type="button" className="hover:underline text-orange-500">
//                 Forgot Password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition disabled:opacity-50"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>

//             <p className="text-center text-sm text-gray-600">
//               Don’t have an account?{" "}
//               <a href="/signup" className="text-orange-600 hover:underline font-medium">
//                 Sign Up
//               </a>
//             </p>
//           </form>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginForm;

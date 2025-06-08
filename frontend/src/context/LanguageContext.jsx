import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    home: "Home",
    puja: "Puja",
    ourServices: "Our Services",
    pranPratishtha: "Pran Pratishtha",
    hawan: "Hawan",
    kundli: "Kundli",
    numerology: "Numerology",
    vastu: "Vastu",
    vidyaZone: "Vidya Zone",
    vedas: "Vedas",
    sacredMantras: "Sacred Mantras",
    meditation: "Meditation",
    sevaBhav: "Seva Bhav",
    charitablePrograms: "Charitable Programs",
    communityService: "Community Service",
    donate: "Donate",
    aboutUs: "About Us",
    contact: "Contact",
    signUp: "Sign Up",
    login: "Login",
    dashboard: "Dashboard",
    logout: "Logout",
    bookPuja: "Book Puja",
  },
  hi: {
    home: "होम",
    puja: "पूजा",
    ourServices: "हमारी सेवाएं",
    pranPratishtha: "प्राण प्रतिष्ठा",
    hawan: "हवन",
    kundli: "कुंडली",
    numerology: "अंक ज्योतिष",
    vastu: "वास्तु",
    vidyaZone: "विद्या ज़ोन",
    vedas: "वेद",
    sacredMantras: "पवित्र मंत्र",
    meditation: "ध्यान",
    sevaBhav: "सेवा भाव",
    charitablePrograms: "धार्मिक कार्यक्रम",
    communityService: "सामुदायिक सेवा",
    donate: "दान",
    aboutUs: "हमारे बारे में",
    contact: "संपर्क करें",
    signUp: "साइन अप",
    login: "लॉगिन",
    dashboard: "डैशबोर्ड",
    logout: "लॉगआउट",
    bookPuja: "पूजा बुक करें",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const setLanguage = (l) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
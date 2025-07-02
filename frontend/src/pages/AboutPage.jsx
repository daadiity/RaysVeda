import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('story');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const storyRef = useRef(null);
  
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const team = [
    {
      name: "Abhay Ray Sir",
      role: "CEO & Founder",
      bio: "Get My India was founded by Abhay Kumar Ray, a visionary leader with a passion for purpose-driven work. As Founder and CEO, he aims to channel the company's success into educating people about the timeless wisdom of the Vedas and the Bhagavad Gita.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQF8e70NhezoYw/profile-displayphoto-shrink_400_400/B4DZagp3LyGwAo-/0/1746452051588?e=1753920000&v=beta&t=feJIZGE9HNt4zzwIWrKfRUTmBT8hzCdyzMI4w--4kes",
      speciality: "Vedic Wisdom",
      experience: "15+ Years"
    },
    {
      name: "Ankit Srivastava",
      role: "Senior Software Developer",
      bio: "Ankit Srivastava is a Senior Software Engineer with over 10 years of experience specializing in PHP development. Beyond coding, Ankit is a spiritually grounded individual who values mindfulness and purpose in his work.",
      image: "https://media.licdn.com/dms/image/v2/D4D16AQHFm_l82xJdZQ/profile-displaybackgroundimage-shrink_350_1400/B4DZU3Eiv8HwAg-/0/1740385696308?e=1753920000&v=beta&t=zxPsoCLGwRoxTYJyVEiHeGBsHIrpo3AMXw7a9UujkkQ",
      speciality: "Tech Innovation",
      experience: "10+ Years"
    },
    {
      name: "Aaditya Yadav",
      role: "Software Developer",
      bio: "Developer and programmer with a passion for spirituality, Aaditya combines his technical expertise with deep knowledge of Vedic scriptures to create innovative spiritual solutions.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScaGl0_ogzFlOeFIf-4d-veKtmiXoZm6uexQ&s",
      speciality: "Spiritual Tech",
      experience: "Fresher"
    },
    {
      name: "Shirinivash",
      role: "Backend Expert",
      bio: "A backend expert whose code is as clean as his conscience. Deeply rooted in spiritual wisdom, Shirinivash approaches technology with mindfulness and purpose.",
      image: "https://res.cloudinary.com/dufvitqpb/image/upload/v1751441864/PP_yudf0f.jpg",
      speciality: "System Architecture",
      experience: "Fresher"
    },
    {
      name: "MD Kaif",
      role: "ML Expert",
      bio: "Web developer | Data Scientist | ML Engineer | React, Python, TensorFlow, Scikit-learn | NLP & LLMs | Final-Year B.Tech @ MNNIT",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHyeMVTk3m7CQ/profile-displayphoto-shrink_400_400/B4DZYHu.rnG8Ag-/0/1743886478839?e=1753920000&v=beta&t=kBTAOUcn41TZm_QIxtsRZX0aIC-iewuNCtBCaQEMOo0",
      speciality: "AI & ML",
      experience: "Fresher"
    },
    {
      name: "Saurabh Rajput",
      role: "AI Expert",
      bio: "I'm not just a coder; I'm a modern-day Rishi, interpreting the subtle energies of data and transforming them into tools that empower and uplift.",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQFc5kNUx7PgWg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1644340089278?e=1753920000&v=beta&t=6mq_EwaiFbt-DMd84vTTVsCTSg0AM7_kLeZenzSU6Ow",
      speciality: "AI Solutions",
      experience: "Fresher"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ 
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(135deg, #fff7ea 0%, #ffede0 100%)'
    }}>
      {/* Enhanced Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1
        }}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: `${10 + i * 12}%`,
                left: `${5 + i * 15}%`,
                fontSize: '3rem',
                color: 'white'
              }}
            >
              {['🕉️', '🪔', '📿', '🔔', '⭐', '🌸', '🕯️', '🙏'][i]}
            </motion.div>
          ))}
        </div>

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '2rem', 
          position: 'relative', 
          zIndex: 2,
          color: 'white'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: '4rem', marginBottom: '2rem' }}
              >
                🕉️
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                  lineHeight: '1.2',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                हमारे बारे में
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  fontSize: '1.3rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  opacity: 0.9
                }}
              >
                A Leading Tech-Enabled Platform Transforming Spirituality Through Guided Practices, 
                Community Engagement, And Personalized Experiences For Holistic Well-Being And Inner Growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('story').scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '25px',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🚀 Our Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('team').scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: 'white',
                    color: '#ff6b35',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  👥 Meet Team
                </motion.button>
              </motion.div>
            </div>

            {/* Interactive Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '3rem',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                ✨ Our Impact
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {[
                  { number: '10K+', label: 'Happy Devotees', icon: '🙏' },
                  { number: '500+', label: 'Pujas Completed', icon: '🪔' },
                  { number: '50+', label: 'Expert Priests', icon: '👨‍🏫' },
                  { number: '24/7', label: 'Support', icon: '🕉️' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    style={{
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer'
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          ⬇️
        </motion.div>
      </section>

      {/* Navigation Pills */}
      <div style={{
        position: 'sticky',
        top: '80px',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        borderBottom: '2px solid #ff6b35'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { id: 'story', label: '📖 Our Story', icon: '📖' },
            { id: 'mission', label: '🎯 Mission', icon: '🎯' },
            { id: 'values', label: '💎 Values', icon: '💎' },
            { id: 'team', label: '👥 Team', icon: '👥' }
          ].map((nav) => (
            <motion.button
              key={nav.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById(nav.id).scrollIntoView({ behavior: 'smooth' });
                setActiveSection(nav.id);
              }}
              style={{
                background: activeSection === nav.id 
                  ? 'linear-gradient(135deg, #ff6b35, #f7931e)' 
                  : 'transparent',
                color: activeSection === nav.id ? 'white' : '#ff6b35',
                border: '2px solid #ff6b35',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                margin: '0 0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {nav.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced Our Story Section */}
      <section 
        id="story" 
        ref={storyRef}
        style={{
          padding: '5rem 2rem',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeIn}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#ff6b35',
                marginBottom: '1rem'
              }}>
                📖 Our Divine Story
              </h2>
              <div style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                borderRadius: '2px',
                margin: '0 auto'
              }}></div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <motion.div variants={fadeIn}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '25px',
                  padding: '3rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #ff6b35'
                }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    color: '#ff6b35',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    🌅 The Beginning (2024)
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8', 
                    color: '#555',
                    marginBottom: '1.5rem'
                  }}>
                    RaysVeda was founded in 2024 with a vision to bridge the gap between ancient spiritual 
                    traditions and modern technology. Our journey began when a group of devoted practitioners 
                    recognized the growing disconnect between people and their spiritual heritage.
                  </p>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8', 
                    color: '#555'
                  }}>
                    In a world becoming increasingly digital, we saw an opportunity to make spiritual practices 
                    more accessible while maintaining their authenticity and sacred nature.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                style={{ position: 'relative' }}
              >
                <img 
                  src="https://i.pinimg.com/736x/1f/2b/a9/1f2ba9c27ee248e732f8851c79018276.jpg"
                  alt="Temple ceremony"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '25px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 107, 53, 0.9)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}>
                  ✨ Since 2024
                </div>
              </motion.div>
            </div>

            {/* Timeline */}
            <motion.div
              variants={fadeIn}
              style={{
                marginTop: '5rem',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '25px',
                padding: '3rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                border: '2px solid #ff6b35'
              }}
            >
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#ff6b35',
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                🚀 Our Journey Milestones
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {[
                  { phase: 'Foundation', year: '2024', desc: 'Platform launched with core team', icon: '🏗️' },
                  { phase: 'Growth', year: '2024', desc: '1000+ devotees joined our platform', icon: '📈' },
                  { phase: 'Future', year: '2025+', desc: 'Expanding globally with AI integration', icon: '🌍' }
                ].map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10, scale: 1.05 }}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                      color: 'white',
                      padding: '2rem',
                      borderRadius: '20px',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{milestone.icon}</div>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {milestone.phase}
                    </h4>
                    <div style={{ fontSize: '1.1rem', marginBottom: '1rem', opacity: 0.9 }}>
                      {milestone.year}
                    </div>
                    <p style={{ fontSize: '1rem', opacity: 0.9 }}>{milestone.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section 
        id="mission" 
        ref={missionRef}
        style={{
          padding: '5rem 2rem',
          background: 'linear-gradient(135deg, #fff7ea 0%, #ffede0 100%)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeIn}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#ff6b35',
                marginBottom: '1rem'
              }}>
                🎯 Our Sacred Mission
              </h2>
              <div style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                borderRadius: '2px',
                margin: '0 auto'
              }}></div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <motion.div variants={fadeIn}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '25px',
                  padding: '3rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #ff6b35'
                }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    color: '#ff6b35',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    🕉️ Preserving Traditions
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8', 
                    color: '#555',
                    marginBottom: '1.5rem'
                  }}>
                    At RaysVeda, our mission is to revive and promote Vedic traditions by making them 
                    accessible and relevant in the modern world. We are committed to preserving the 
                    authenticity of ancient practices while leveraging technology to reach a global audience.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                    {[
                      { icon: '🌐', text: 'Global Reach' },
                      { icon: '🔐', text: 'Authentic Practices' },
                      { icon: '💡', text: 'Modern Solutions' },
                      { icon: '🤝', text: 'Community Building' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                          color: 'white',
                          padding: '1rem',
                          borderRadius: '15px',
                          textAlign: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item.text}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '25px',
                  padding: '3rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #ff6b35'
                }}
              >
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  color: '#ff6b35',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  🎯 Our Goals
                </h3>
                {[
                  { 
                    goal: 'Spiritual Ecosystem', 
                    desc: 'Create a comprehensive platform for spiritual growth',
                    icon: '🌱'
                  },
                  { 
                    goal: 'Personalized Services', 
                    desc: 'Provide customized spiritual solutions for each devotee',
                    icon: '👤'
                  },
                  { 
                    goal: 'Global Community', 
                    desc: 'Foster worldwide community of spiritually awakened individuals',
                    icon: '🌍'
                  }
                ].map((goal, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      marginBottom: '1rem',
                      background: 'rgba(255, 107, 53, 0.1)',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ 
                      fontSize: '2rem',
                      background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {goal.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6b35', marginBottom: '0.3rem' }}>
                        {goal.goal}
                      </h4>
                      <p style={{ fontSize: '1rem', color: '#555' }}>{goal.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section 
        id="values" 
        ref={valuesRef}
        style={{
          padding: '5rem 2rem',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeIn}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#ff6b35',
                marginBottom: '1rem'
              }}>
                💎 Our Core Values
              </h2>
              <p style={{ fontSize: '1.3rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                The principles that guide our spiritual mission and technological innovation
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
              {[
                {
                  title: 'Authenticity',
                  icon: '🔥',
                  desc: 'We preserve the integrity of Vedic traditions by ensuring all rituals and teachings follow authentic practices passed down through generations.',
                  color: 'linear-gradient(135deg, #ff6b35, #f7931e)'
                },
                {
                  title: 'Inclusivity',
                  icon: '🤝',
                  desc: 'We welcome devotees from all backgrounds, making spiritual practices accessible regardless of location, knowledge level, or circumstances.',
                  color: 'linear-gradient(135deg, #f7931e, #ff6b35)'
                },
                {
                  title: 'Innovation',
                  icon: '⚡',
                  desc: 'We embrace technology to bridge ancient wisdom with modern life, creating innovative solutions that make spiritual practices relevant today.',
                  color: 'linear-gradient(135deg, #ff6b35, #f7931e)'
                }
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  whileHover={{ 
                    y: -20, 
                    scale: 1.05,
                    rotateY: 5
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '25px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #ff6b35',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: value.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    margin: '0 auto 2rem',
                    boxShadow: '0 10px 25px rgba(255, 107, 53, 0.3)'
                  }}>
                    {value.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ff6b35',
                    marginBottom: '1rem'
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#555'
                  }}>
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section 
        id="team" 
        ref={teamRef}
        style={{
          padding: '5rem 2rem',
          background: 'linear-gradient(135deg, #fff7ea 0%, #ffede0 100%)'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeIn}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#ff6b35',
                marginBottom: '1rem'
              }}>
                👥 Meet Our Divine Team
              </h2>
              <p style={{ fontSize: '1.3rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                The spiritual and technical experts behind RaysVeda's innovative platform
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    rotateY: 3
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '25px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #ff6b35',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {member.experience}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      left: '15px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      ⭐ {member.speciality}
                    </div>
                  </div>
                  
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '0.5rem'
                    }}>
                      {member.name}
                    </h3>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#ff6b35',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}>
                      {member.role}
                    </p>
                    <p style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      color: '#555'
                    }}>
                      {member.bio.substring(0, 120)}...
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Contact CTA Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1
        }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
                fontSize: '4rem'
              }}
            >
              {['🕉️', '🪔', '📿', '🔔', '⭐', '🌸'][i]}
            </motion.div>
          ))}
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🤝</div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Let's Connect & Grow Together
            </h2>
            <p style={{
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Join our spiritual community and be part of a mission to preserve and promote Vedic traditions 
              through innovative technology and authentic practices.
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              flexWrap: 'wrap' 
            }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/contact" 
                  style={{
                    display: 'inline-block',
                    background: 'white',
                    color: '#ff6b35',
                    padding: '1.2rem 2.5rem',
                    borderRadius: '25px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  📞 Contact Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/services" 
                  style={{
                    display: 'inline-block',
                    background: 'transparent',
                    color: 'white',
                    border: '3px solid white',
                    padding: '1.2rem 2.5rem',
                    borderRadius: '25px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🛡️ Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
              zIndex: 1000
            }}
          >
            ⬆️
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;
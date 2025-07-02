import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { user } = useAuth();

  const postsPerPage = 6;

  // Blog images array
  const blogImages = [
    "https://img.freepik.com/premium-photo/shani-dev-image_669954-18662.jpg?w=2000",
    "https://hindi.news24online.com/wp-content/uploads/2022/08/Maa-Lakshmi-4.jpg",
    "https://4.bp.blogspot.com/-gDF5z9VpNxc/WjNSZxY22SI/AAAAAAAAFw4/XudR-C4JymgShUbqgIvxU3FtKQ_fgswhgCLcBGAs/s1600/photo.jpg",
    "https://maharashtratimes.com/thumb/92800389/shravan-somvar-2022-date-shubh-yog-vrat-puja-vidhi-katha-and-significance-in-marathi-92800389.jpg?imgsize=111700&width=1200&height=900&resizemode=75",
    "https://i.timesnowhindi.com/mata%20lakshami%20vrat%20katha.jpg",
    "https://cdn.exoticindia.com/images/products/thumbnails/t800x600/books-2019/mzx844.jpg",
    "https://www.tusktravel.com/blog/wp-content/uploads/2021/08/Ganesh-Chaturthi-India.jpg",
    "https://tse2.mm.bing.net/th/id/OIP.8aVVHGNcoiTuZKmczoXu2wHaDt?pid=Api&P=0&h=180",
    "https://blogs.revv.co.in/blogs/wp-content/uploads/2020/05/ganesh.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.xUX2Uv6vWZCg5X9ZV-onVAAAAA?pid=Api&P=0&h=180"
  ];

  // Enhanced posts with categories and tags
  const posts = [
    {
      titleHindi: "5 चमत्कारी शनिवार व्रत के लाभ जो बदल सकते हैं आपकी किस्मत",
      title: "5 Miraculous Benefits of Saturday Fasting That Can Change Your Destiny",
      date: "June 27, 2025",
      excerpt: "✨ परिचय: शनिवार व्रत के लाभ और उसका महत्व शनिवार व्रत के लाभ हमारे जीवन को नई दिशा और ऊर्जा देने वाले माने जाते हैं। भारतीय ज्योतिष और धार्मिक परंपरा में शनिवार का दिन शनि देव को समर्पित होता है।",
      category: "व्रत",
      tags: ["शनिदेव", "व्रत", "भाग्य"],
      readTime: "5 मिनट",
      link: "#"
    },
    {
      titleHindi: "7 ज़बरदस्त और अचूक शुक्रवार व्रत के लाभ: माँ लक्ष्मी की कृपा से पाएं धन, सौभाग्य और सुख-समृद्धि",
      title: "7 Powerful & Unfailing Benefits of Friday Fasting: Unlock Wealth, Fortune & Lakshmi's Divine Grace",
      date: "June 26, 2025",
      excerpt: "🌸 शुक्रवार व्रत का महत्व और आध्यात्मिक आधार हिंदू धर्म में सप्ताह के हर दिन का अपना एक विशेष धार्मिक और ज्योतिषीय महत्व होता है।",
      category: "व्रत",
      tags: ["लक्ष्मी", "धन", "सौभाग्य"],
      readTime: "7 मिनट",
      link: "#"
    },
    {
      titleHindi: "5 चमत्कारी गुरुवार व्रत के लाभ: जीवन में सुख, शांति और समृद्धि लाने वाले उपाय",
      title: "5 Miraculous Benefits of Guruwar Vrat: Powerful Remedies for Peace, Prosperity & Success",
      date: "June 25, 2025",
      excerpt: "परिचय और आधार हिंदू धर्म में व्रतों का विशेष महत्व है, और उन व्रतों में भी गुरुवार व्रत के लाभ अत्यंत चमत्कारी माने जाते हैं।",
      category: "व्रत",
      tags: ["बृहस्पति", "समृद्धि", "शांति"],
      readTime: "6 मिनट",
      link: "#"
    },
    {
      titleHindi: "🪔 बुधवार गणेश पूजा: सफलता, शांति और समृद्धि पाने का सर्वश्रेष्ठ उपाय",
      title: "",
      date: "June 18, 2025",
      excerpt: "🌿 प्रस्तावना भारत में हर दिन का एक विशेष आध्यात्मिक महत्व होता है। उनमें भी बुधवार, यानि कि बुद्धि और वाणी के स्वामी बुध ग्रह का दिन।",
      category: "पूजा",
      tags: ["गणेश", "बुधवार", "सफलता"],
      readTime: "4 मिनट",
      link: "#"
    },
    {
      titleHindi: "मंगलवार साधना: मंगल ग्रह शांति, हनुमान पूजा और शक्ति का दिन",
      title: "",
      date: "June 17, 2025",
      excerpt: "मंगलवार साधना आत्मिक अनुशासन, क्रोध पर नियंत्रण और शक्ति जागरण का एक पवित्र माध्यम है।",
      category: "साधना",
      tags: ["हनुमान", "मंगल", "शक्ति"],
      readTime: "5 मिनट",
      link: "#"
    },
    {
      titleHindi: "ज्येष्ठ मास में अपनाएं आत्मिक शुद्धि के उपाय: जानिए 7 प्रभावशाली वैदिक साधनाएं",
      title: "",
      date: "June 13, 2025",
      excerpt: "प्रस्तावना: ज्येष्ठ मास में आत्मिक शुद्धि के उपाय क्यों ज़रूरी हैं? ज्येष्ठ माह में आत्मिक शुद्धि के उपाय केवल धार्मिक अनुष्ठान नहीं।",
      category: "साधना",
      tags: ["आत्मिक शुद्धि", "वैदिक", "उपाय"],
      readTime: "8 मिनट",
      link: "#"
    }
  ];

  const categories = [
    { id: 'all', name: 'सभी', icon: '📚', count: posts.length },
    { id: 'व्रत', name: 'व्रत', icon: '🙏', count: posts.filter(p => p.category === 'व्रत').length },
    { id: 'पूजा', name: 'पूजा', icon: '🪔', count: posts.filter(p => p.category === 'पूजा').length },
    { id: 'साधना', name: 'साधना', icon: '🧘', count: posts.filter(p => p.category === 'साधना').length }
  ];

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.titleHindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fff7ea 0%, #ffede0 100%)',
      minHeight: '100vh',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          color: 'white',
          padding: '4rem 1rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontSize: '4rem', marginBottom: '1rem' }}
          >
            📖
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            🕉️ आध्यात्मिक ब्लॉग 🕉️
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              fontSize: '1.3rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            वैदिक ज्ञान, पूजा विधि, व्रत कथाएं और आध्यात्मिक उपाय की संपूर्ण जानकारी
          </motion.p>
        </div>
        
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          fontSize: '8rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1
        }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>🕉️</motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>🪔</motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>🔔</motion.div>
        </div>
      </motion.section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Interactive Search & Filter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
            border: '2px solid #ff6b35'
          }}
        >
          {/* Search Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '50px',
              padding: '0.5rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              border: '2px solid #ff6b35'
            }}>
              <span style={{ fontSize: '1.5rem', padding: '0 1rem' }}>🔍</span>
              <input
                type="text"
                placeholder="खोजें: व्रत, पूजा, मंत्र, देवी-देवता..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.1rem',
                  padding: '0.8rem 0',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    padding: '0 1rem'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '1rem', 
              color: '#ff6b35',
              textAlign: 'center'
            }}>
              📂 श्रेणी चुनें
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id 
                      ? 'linear-gradient(135deg, #ff6b35, #f7931e)' 
                      : 'white',
                    color: selectedCategory === category.id ? 'white' : '#ff6b35',
                    border: '2px solid #ff6b35',
                    borderRadius: '25px',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                  {category.name}
                  <span style={{
                    background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#ff6b35',
                    color: selectedCategory === category.id ? 'white' : 'white',
                    borderRadius: '10px',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search Results Info */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div style={{
              textAlign: 'center',
              marginTop: '1rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              color: 'white',
              borderRadius: '15px',
              fontSize: '1.1rem'
            }}>
              📊 {filteredPosts.length} लेख मिले
              {searchTerm && ` "${searchTerm}" के लिए`}
              {selectedCategory !== 'all' && ` "${categories.find(c => c.id === selectedCategory)?.name}" श्रेणी में`}
            </div>
          )}
        </motion.section>

        {/* Blog Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <AnimatePresence>
            {currentPosts.map((post, idx) => (
              <motion.article
                key={`${post.titleHindi}-${idx}`}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #ff6b35',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Image with Overlay */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={blogImages[idx % blogImages.length]}
                    alt={post.titleHindi}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 107, 53, 0.9)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {post.category}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    ⏱️ {post.readTime}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {post.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        style={{
                          background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                          color: 'white',
                          padding: '0.2rem 0.8rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3',
                    color: '#333'
                  }}>
                    {post.titleHindi}
                  </h2>

                  {/* Date */}
                  <div style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    📅 {post.date}
                  </div>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: '1rem',
                    color: '#555',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {post.excerpt.substring(0, 120)}...
                  </p>

                  {/* Read More Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '0.8rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📖 पूरा पढ़ें
                    <span style={{ fontSize: '0.8rem' }}>→</span>
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '3rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ff6b35' }}>
              कोई लेख नहीं मिला
            </h3>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              कृपया अलग खोजशब्द या श्रेणी का प्रयास करें
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '3rem'
            }}
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                background: currentPage === 1 ? '#ccc' : 'linear-gradient(135deg, #ff6b35, #f7931e)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ← पिछला
            </button>

            <span style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '0.8rem 1.5rem',
              borderRadius: '15px',
              border: '2px solid #ff6b35',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#ff6b35'
            }}>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                background: currentPage === totalPages ? '#ccc' : 'linear-gradient(135deg, #ff6b35, #f7931e)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              अगला →
            </button>
          </motion.div>
        )}

        {/* Quick Access Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            position: 'fixed',
            top: '50%',
            right: '2rem',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '1rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            border: '2px solid #ff6b35',
            zIndex: 1000,
            display: window.innerWidth > 768 ? 'block' : 'none'
          }}
        >
          <h4 style={{
            fontSize: '1rem',
            marginBottom: '1rem',
            color: '#ff6b35',
            textAlign: 'center'
          }}>
            🚀 त्वरित पहुंच
          </h4>
          {['🙏 व्रत कथा', '🪔 पूजा विधि', '🔮 ज्योतिष', '🧘 साधना'].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 5 }}
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '10px',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

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

      {/* Floating Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: `${20 + i * 20}%`,
              left: `${10 + i * 20}%`,
              fontSize: '2rem',
              opacity: 0.1,
              color: '#ff6b35'
            }}
          >
            {['🕉️', '🪔', '📿', '🔔', '⭐'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
import React from 'react';

const fontFamily = "'Poppins', 'Merriweather', serif";
const orange = '#f26522';
const cardBg = 'rgba(255,255,255,0.97)';
const borderRadius = '1.2rem';

// Use the provided image URLs in sequence for each blog post
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

const posts = [
  {
    titleHindi: "5 चमत्कारी शनिवार व्रत के लाभ जो बदल सकते हैं आपकी किस्मत",
    title: "5 Miraculous Benefits of Saturday Fasting That Can Change Your Destiny",
    date: "June 27, 2025",
    excerpt: "✨ परिचय: शनिवार व्रत के लाभ और उसका महत्व शनिवार व्रत के लाभ हमारे जीवन को नई दिशा और ऊर्जा देने वाले माने जाते हैं। भारतीय ज्योतिष और धार्मिक परंपरा में शनिवार का दिन शनि देव को समर्पित होता है।",
    link: "#"
  },
  {
    titleHindi: "“7 ज़बरदस्त और अचूक शुक्रवार व्रत के लाभ: माँ लक्ष्मी की कृपा से पाएं धन, सौभाग्य और सुख-समृद्धि”",
    title: "7 Powerful & Unfailing Benefits of Friday Fasting: Unlock Wealth, Fortune & Lakshmi’s Divine Grace",
    date: "June 26, 2025",
    excerpt: "🌸 शुक्रवार व्रत का महत्व और आध्यात्मिक आधार हिंदू धर्म में सप्ताह के हर दिन का अपना एक विशेष धार्मिक और ज्योतिषीय महत्व होता है। शुक्रवार का दिन विशेष रूप से माँ लक्ष्मी, द्रौपदी, और कुछ क्षेत्रों में संतोषी माता को समर्पित है।",
    link: "#"
  },
  {
    titleHindi: "5 चमत्कारी गुरुवार व्रत के लाभ: जीवन में सुख, शांति और समृद्धि लाने वाले उपाय",
    title: "5 Miraculous Benefits of Guruwar Vrat: Powerful Remedies for Peace, Prosperity & Success",
    date: "June 25, 2025",
    excerpt: "परिचय और आधार हिंदू धर्म में व्रतों का विशेष महत्व है, और उन व्रतों में भी गुरुवार व्रत के लाभ अत्यंत चमत्कारी माने जाते हैं। यह व्रत विशेष रूप से बृहस्पति ग्रह के सकारात्मक प्रभाव को प्राप्त करने के लिए किया जाता है।",
    link: "#"
  },
  {
    titleHindi: "5 चमत्कारी सोमवार व्रत के लाभ जो दुर्भाग्य को हराकर सफलता दिलाएँ",
    title: "",
    date: "June 23, 2025",
    excerpt: "सोमवार व्रत के लाभ का महत्व भारतीय संस्कृति में व्रत और उपवास का अत्यधिक महत्व है। इनमें से एक सबसे पवित्र और शक्तिशाली व्रत है सोमवार का व्रत।",
    link: "#"
  },
  {
    titleHindi: "🌟 5 चमत्कारी तथ्य: लक्ष्मी व्रत कथा • शुक्रवार विशेष उपाय, पूजन विधि और मंत्र",
    title: "",
    date: "June 20, 2025",
    excerpt: "🌼 लक्ष्मी व्रत कथा का महत्व लक्ष्मी व्रत की प्राचीन कथा शुक्रवार विशेष पूजन विधि लक्ष्मी मंत्र और जाप विधि शुक्रवार विशेष उपाय और लाभ संबंधित स्रोत और उपयोगी लिंक।",
    link: "#"
  },
  {
    titleHindi: "7 शक्तिशाली कारण क्यों करें बृहस्पति पूजा: विवाह, धन और गुरु दोष का समाधान | RaysVeda",
    title: "",
    date: "June 19, 2025",
    excerpt: "7 शक्तिशाली कारण क्यों करें बृहस्पति पूजा: विवाह, धन और गुरु दोष का समाधान बृहस्पति पूजा भारतीय ज्योतिष और वेदों के अनुसार सबसे शुभ और प्रभावी पूजाओं में से एक मानी जाती है।",
    link: "#"
  },
  {
    titleHindi: "🪔 बुधवार गणेश पूजा: सफलता, शांति और समृद्धि पाने का सर्वश्रेष्ठ उपाय",
    title: "",
    date: "June 18, 2025",
    excerpt: "🌿 प्रस्तावना भारत में हर दिन का एक विशेष आध्यात्मिक महत्व होता है। उनमें भी बुधवार, यानि कि बुद्धि और वाणी के स्वामी बुध ग्रह का दिन, भगवान गणेश जी को समर्पित माना गया है।",
    link: "#"
  },
  {
    titleHindi: "मंगलवार साधना: मंगल ग्रह शांति, हनुमान पूजा और शक्ति का दिन",
    title: "",
    date: "June 17, 2025",
    excerpt: "मंगलवार साधना आत्मिक अनुशासन, क्रोध पर नियंत्रण और शक्ति जागरण का एक पवित्र माध्यम है। इस दिन की गई हनुमान पूजा, मंगल ग्रह की शांति और मूलाधार चक्र के संतुलन से जीवन में स्थिरता और ऊर्जा आती है।",
    link: "#"
  },
  {
    titleHindi: "आषाढ़ तृतीया पर गणेश पूजा का महत्व | विघ्नों से मुक्ति का शुभ दिन",
    title: "",
    date: "June 14, 2025",
    excerpt: "🌄 प्रस्तावना: आषाढ़ तृतीया पर गणेश पूजा का महत्व इस बात का प्रमाण है कि पंचांग का हर दिन जीवन को प्रभावित करता है। जब तृतीया तिथि शनिवार को पड़े, तो यह और भी शुभ मानी जाती है।",
    link: "#"
  },
  {
    titleHindi: "ज्येष्ठ मास में अपनाएं आत्मिक शुद्धि के उपाय: जानिए 7 प्रभावशाली वैदिक साधनाएं",
    title: "",
    date: "June 13, 2025",
    excerpt: "प्रस्तावना: ज्येष्ठ मास में आत्मिक शुद्धि के उपाय क्यों ज़रूरी हैं? ज्येष्ठ माह में आत्मिक शुद्धि के उपाय केवल धार्मिक अनुष्ठान नहीं, बल्कि मानसिक और ऊर्जात्मक पुनर्निर्माण का वैदिक तरीका हैं।",
    link: "#"
  }
];

const recentPosts = posts.slice(0, 5);

const BlogPage = () => (
  <div style={{ background: '#fff7ea', minHeight: '100vh', fontFamily, padding: '0 0 3rem 0' }}>
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '2.5rem 1rem 0 1rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2.5rem',
        alignItems: 'flex-start'
      }}
    >
      {/* Main Blog List */}
      <main style={{ flex: '1 1 700px', minWidth: 0 }}>
        {/* Blog Header */}
        <div style={{
          color: '#bfa800',
          fontFamily: "'Merriweather', serif",
          fontSize: '1.08rem',
          textAlign: 'center',
          marginBottom: '1.2rem',
          letterSpacing: '0.5px'
        }}>
          शनिदेव व्रत रहस्य और उपाय, देवी देवता आराधना, धन प्राप्ति के उपाय, लक्ष्मी कृपा मंत्र, शनि दोष निवारण
        </div>
        {/* Blog Cards */}
        {posts.map((post, idx) => (
          <article
            key={idx}
            style={{
              background: cardBg,
              borderRadius,
              boxShadow: '0 4px 18px rgba(31,38,135,0.10)',
              padding: '2.2rem 2rem 2rem 2rem',
              border: `2px solid ${orange}`,
              marginBottom: '2.5rem',
              maxWidth: 800,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <h2 style={{
              fontFamily: "'Merriweather', serif",
              fontWeight: 700,
              fontSize: '1.45rem',
              marginBottom: '0.3rem',
              lineHeight: 1.18
            }}>
              {post.titleHindi}
              {post.title && (
                <span style={{
                  fontFamily: "'Poppins', serif",
                  fontWeight: 400,
                  fontSize: '1.18rem',
                  letterSpacing: '1.2px',
                  display: 'block',
                  marginTop: '0.2rem'
                }}>
                  {post.title}
                </span>
              )}
            </h2>
            <div style={{
              textAlign: 'left',
              fontStyle: 'italic',
              color: '#888',
              fontSize: '1.01rem',
              marginBottom: '1.1rem'
            }}>
              {post.date}
            </div>
            <img
              src={blogImages[idx]}
              alt={post.titleHindi}
              style={{
                width: '100%',
                borderRadius: '1rem',
                margin: '0.7rem 0 1.1rem 0',
                maxHeight: 320,
                objectFit: 'cover',
                boxShadow: '0 4px 14px rgba(0,0,0,0.11)'
              }}
            />
            <div style={{
              fontSize: '1.08rem',
              color: '#333',
              lineHeight: 1.7,
              marginBottom: '0.7rem'
            }}>
              {post.excerpt}
            </div>
            <a
              href={post.link}
              style={{
                color: orange,
                fontWeight: 600,
                textDecoration: 'underline',
                fontSize: '1.08rem'
              }}
            >
              Read more…
            </a>
          </article>
        ))}
        {/* Pagination */}
        <div style={{ textAlign: 'center', margin: '2.5rem 0 0 0' }}>
          <button
            style={{
              background: orange,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.6rem 2.2rem',
              fontWeight: 600,
              fontSize: '1.08rem',
              cursor: 'pointer',
              marginRight: 10
            }}
          >
            Older posts
          </button>
        </div>
      </main>
      {/* Sidebar */}
      <aside style={{
        flex: '0 1 340px',
        minWidth: 280,
        maxWidth: 370,
        width: '100%',
        margin: '0 auto'
      }}>
        <div style={{
          background: cardBg,
          borderRadius,
          boxShadow: '0 4px 18px rgba(31,38,135,0.10)',
          border: `2px solid ${orange}`,
          padding: '2rem 1.5rem 1.5rem 1.5rem'
        }}>
          {/* Search */}
          <div style={{ marginBottom: '2.2rem' }}>
            <label htmlFor="blog-search" style={{ fontWeight: 600, color: '#222', fontSize: '1.1rem', display: 'block', marginBottom: 8 }}>
              Search
            </label>
            <div style={{ display: 'flex', gap: 0 }}>
              <input
                id="blog-search"
                type="text"
                placeholder="Search blog..."
                style={{
                  flex: 1,
                  padding: '0.5rem 0.8rem',
                  borderRadius: '6px 0 0 6px',
                  border: '1.5px solid #e2e2e2',
                  fontSize: '1rem',
                  fontFamily,
                  borderRight: 'none'
                }}
              />
              <button
                style={{
                  background: orange,
                  color: '#fff',
                  border: '1.5px solid #e2e2e2',
                  borderLeft: 'none',
                  borderRadius: '0 6px 6px 0',
                  padding: '0 1.1rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  height: '40px'
                }}
              >
                Search
              </button>
            </div>
          </div>
          {/* Recent Posts */}
          <div>
            <h3 style={{
              color: orange,
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '1.1rem'
            }}>
              Recent Posts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {recentPosts.map((post, idx) => (
                <li key={idx} style={{ marginBottom: '1.1rem' }}>
                  <a
                    href={post.link}
                    style={{
                      color: '#bfa800',
                      fontFamily: "'Merriweather', serif",
                      fontSize: '1.08rem',
                      textDecoration: 'none',
                      lineHeight: 1.4
                    }}
                  >
                    &rsaquo; {post.titleHindi} {post.title && `|| ${post.title}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
    {/* Font Import */}
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </div>
);

export default BlogPage;
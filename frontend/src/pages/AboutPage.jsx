import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const AboutPage = () => {
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const teamRef = useRef(null)
  
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" })

  const team = [
  {
    name: "Abhay Ray Sir",
    role: "CEO & Founder",
    bio: "Get My India was founded by Abhay Kumar Ray, a visionary leader with a passion for purpose-driven work. As Founder and CEO, he aims to channel the company’s success into educating people about the timeless wisdom of the Vedas and the Bhagavad Gita. His mission is to blend modern business with ancient values, building a future rooted in knowledge and service,",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQF8e70NhezoYw/profile-displayphoto-shrink_400_400/B4DZagp3LyGwAo-/0/1746452051588?e=1753920000&v=beta&t=feJIZGE9HNt4zzwIWrKfRUTmBT8hzCdyzMI4w--4kes"
  },
  {
    name: "Ankit Srivastava ",
    role: "Senior Software Developer",
    bio: "Ankit Srivastava is a  Senior Software Engineer with over 10 years of experience specializing in PHP development. Known for delivering efficient, scalable solutions, he brings a strong technical foundation to every project.Beyond coding, Ankit is a spiritually grounded individual who values mindfulness and purpose in his work. His unique blend of technical skill and thoughtful approach ensures solutions that are not only effective but also meaningful.",
    image: "https://media.licdn.com/dms/image/v2/D4D16AQHFm_l82xJdZQ/profile-displaybackgroundimage-shrink_350_1400/B4DZU3Eiv8HwAg-/0/1740385696308?e=1753920000&v=beta&t=zxPsoCLGwRoxTYJyVEiHeGBsHIrpo3AMXw7a9UujkkQ"
  },
  {
    name: "Aaditya Yadav",
    role: "Software developer",
    bio: "Developer and programmer with a passion for spirituality, Aaditya combines his technical expertise with deep knowledge of Vedic scriptures to create innovative spiritual solutions.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScaGl0_ogzFlOeFIf-4d-veKtmiXoZm6uexQ&s"
  },
  {
    name: "Shirinivash",
    role: "Backend Expert",
    bio: "A backend expert whose code is as clean as his conscience. Deeply rooted in spiritual wisdom, Shirinivash approaches technology with mindfulness and purpose. Always eager to explore new realms—be it in backend systems or inner self—he believes true innovation flows from inner clarity",
    image: "https://media.licdn.com/dms/image/v2/D5635AQH8OVCAoBvM9A/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1727831345266?e=1749020400&v=beta&t=6S9R-Hu9a40bFtlZ1u3o_6Pjd7piAKi_ATMXu6kzXV0"
  },
  {
    name: "MD Kaif",
    role: "ML Expert",
    bio: "Web developer| Data Scientist | ML Engineer | React, Python, TensorFlow, Scikit-learn | NLP & LLMs | Final-Year B.Tech @ MNNIT",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHyeMVTk3m7CQ/profile-displayphoto-shrink_400_400/B4DZYHu.rnG8Ag-/0/1743886478839?e=1753920000&v=beta&t=kBTAOUcn41TZm_QIxtsRZX0aIC-iewuNCtBCaQEMOo0"
  },
   {
    name: "Saurabh Rajput",
    role: "AI Expert",
    bio: "I'm not just a coder; I'm a modern-day Rishi, interpreting the subtle energies of data and transforming them into tools that empower and uplift.",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQFc5kNUx7PgWg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1644340089278?e=1753920000&v=beta&t=6mq_EwaiFht-DMd84vTTVsCTSg0AM7_kLeZenzSU6Ow"
  }
  
];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              A Leading Tech-Enabled Platform Transforming Spirituality Through Guided Practices, Community Engagement, And Personalized Experiences For Holistic Well-Being And Inner Growth.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFF7ED">
            <path fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">Our Story</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              RaysVeda was founded in 2024 with a vision to bridge the gap between ancient spiritual traditions and modern technology. Our journey began when a group of devoted practitioners recognized the growing disconnect between people and their spiritual heritage.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In a world becoming increasingly digital, we saw an opportunity to make spiritual practices more accessible while maintaining their authenticity and sacred nature. We partnered with respected priests, scholars, and temples across India to create a platform that brings the divine into homes worldwide.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, RaysVeda serves thousands of devotees globally, offering authentic pujas, spiritual guidance, and educational resources. We continue to grow our offerings while staying true to the essence of Vedic traditions, helping people find peace, prosperity, and spiritual fulfillment in their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section ref={missionRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  At RaysVeda, our mission is to revive and promote Vedic traditions by making them accessible and relevant in the modern world. We are committed to preserving the authenticity of ancient practices while leveraging technology to reach a global audience.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We aim to create a spiritual ecosystem where individuals can connect with their roots, experience divine grace, and cultivate inner peace regardless of their location or circumstances. Through our platform, we provide personalized spiritual services that address the unique needs of each devotee.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our goal is to foster a community of spiritually awakened individuals who embody the values of compassion, wisdom, and service. We believe that by reconnecting people with their spiritual heritage, we can contribute to a more harmonious and enlightened world.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://i.pinimg.com/736x/1f/2b/a9/1f2ba9c27ee248e732f8851c79018276.jpg" 
                  alt="Temple ceremony" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 md:w-32 md:h-32 bg-accent-500 rounded-lg -z-10"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={valuesRef} className="py-16 md:py-24 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-4">Authenticity</h3>
                <p className="text-gray-600 text-center">
                  We preserve the integrity of Vedic traditions by ensuring all rituals and teachings follow authentic practices passed down through generations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-4">Inclusivity</h3>
                <p className="text-gray-600 text-center">
                  We welcome devotees from all backgrounds, making spiritual practices accessible regardless of location, knowledge level, or circumstances.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 00-2.384.823l-2.758 1.379a4 4 0 00-1.042 5.516 2.968 2.968 0 00-.116-.025l-1.863-.467A2.98 2.98 0 004.828 16h10.343a2.98 2.98 0 00-.463-1.414l-1.862-.467a3 3 0 00-.116.025 4 4 0 00-1.042-5.516l-2.758-1.379a4 4 0 00-2.384-.823L10.879 8.29A3 3 0 009 6.172z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-4">Innovation</h3>
                <p className="text-gray-600 text-center">
                  We embrace technology to bridge ancient wisdom with modern life, creating innovative solutions that make spiritual practices relevant today.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section ref={teamRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">Our Team</h2>
            <p className="section-subheading">
              Meet the spiritual experts behind Divine Harmony
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-orange-50 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Start Your Spiritual Journey With Us
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Experience authentic Vedic rituals and spiritual guidance from the comfort of your home
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/puja/booking" className="btn bg-white text-primary-700 hover:bg-gray-100">
              Book a Puja
            </Link>
            <Link to="/contact" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
import React from 'react';

const fontFamily = "'Poppins', 'Merriweather', serif";
const orangeGradient = 'linear-gradient(to right, #ff9800, #f26522)';
const cardBg = 'rgba(255, 255, 255, 0.95)';
const orange = '#f26522';
const borderRadius = '1.5rem';

const HawanPage = () => {
  return (
    <div style={{ background: '#fff7ea', fontFamily }}>
      {/* Gradient Header */}
      <div
        style={{
          background: orangeGradient,
          padding: '3rem 1rem',
          borderBottomLeftRadius: '120px 40px',
          borderBottomRightRadius: '120px 40px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Hawan: The Sacred Fire Ritual</h1>
        <p style={{ maxWidth: '800px', margin: '1rem auto', fontSize: '1.1rem' }}>
          Hawan (or Homa/Yajna) is a powerful Vedic fire ritual performed in Hindu traditions to invoke divine blessings,
          purify the surroundings, and spiritually uplift the participants.
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.2rem' }}>
        <div
          style={{
            background: cardBg,
            borderRadius,
            border: `2px solid ${orange}`,
            padding: '2rem',
            boxShadow: '0 0 24px rgba(0,0,0,0.1)',
            lineHeight: '1.7',
          }}
        >
          <h2 style={{ color: orange, marginBottom: '1rem' }}>🛕 What is Hawan?</h2>
          <p>
            Hawan is an ancient Vedic ritual involving fire offerings to the deities through the medium of Agni (fire).
            It is symbolic of purification, devotion, and transformation. The sacred fire is believed to act as a conduit between the earthly realm and the divine.
          </p>

          <img
            src="https://sanity-admin.rudraksha-ratna.com/static/images/blogs/havan%2Bkund.jpg"
            alt="Havan Kund"
            style={{
              width: '100%',
              borderRadius: '1rem',
              margin: '2rem 0',
              maxHeight: '380px',
              objectFit: 'cover',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            }}
          />

          <h2 style={{ color: orange, margin: '2rem 0 1rem' }}>📋 Purpose and Symbolism</h2>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li>✨ Purifies body, mind, and environment</li>
            <li>✨ Connects with divine through mantra and Agni</li>
            <li>✨ Represents surrender, transformation, and inner cleansing</li>
            <li>✨ Restores harmony in home and nature</li>
          </ul>

          <h2 style={{ color: orange, margin: '2rem 0 1rem' }}>🙏 Types of Hawan</h2>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li>🔹 <strong>Griha Pravesh Havan</strong>: For new home blessings</li>
            <li>🔹 <strong>Navagraha Havan</strong>: Planetary alignment and peace</li>
            <li>🔹 <strong>Rudra Havan</strong>: Appeasing Lord Shiva</li>
            <li>🔹 <strong>Mahamrityunjaya Havan</strong>: Health and protection</li>
          </ul>

          <img
            src="https://rgyan-flutter200503-dev.s3.ap-south-1.amazonaws.com/web/pg/eblogs/2017/11/4.jpg"
            alt="Hawan Ceremony"
            style={{
              width: '100%',
              borderRadius: '1rem',
              margin: '2rem 0',
              maxHeight: '380px',
              objectFit: 'cover',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            }}
          />

          <h2 style={{ color: orange, margin: '2rem 0 1rem' }}>🛠 Setup and Ingredients</h2>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li>🔸 Havan Kund (brick or copper altar)</li>
            <li>🔸 Pure Ghee, mango wood, dry cow dung cakes</li>
            <li>🔸 Samagri (fragrant herbs, flowers, seeds)</li>
            <li>🔸 Mantra texts or priest for recitation</li>
          </ul>

          <h2 style={{ color: orange, margin: '2rem 0 1rem' }}>📖 Steps to Perform Hawan</h2>
          <ol style={{ paddingLeft: '1.5rem' }}>
            <li>🪔 Sankalp – Setting the spiritual intention</li>
            <li>🪔 Ganesh Pujan – Removing obstacles</li>
            <li>🪔 Agni Sthapan – Igniting the sacred fire</li>
            <li>🪔 Ahuti – Offering samagri while chanting mantras</li>
            <li>🪔 Purnahuti – Final offering symbolizing completion</li>
            <li>🪔 Aarti and Shanti Mantra – Seeking peace and blessings</li>
            <li>🪔 Prasad distribution – Sharing sanctified offerings</li>
          </ol>

          <h2 style={{ color: orange, margin: '2rem 0 1rem' }}>🌟 Benefits of Hawan</h2>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li>✔ Detoxifies air and body through herbal smoke</li>
            <li>✔ Enhances focus and positive vibrations</li>
            <li>✔ Invokes divine blessings for peace, prosperity, and health</li>
            <li>✔ Elevates the energy of the home and its people</li>
          </ul>

          <h2 style={{ color: orange, margin: '2rem 0 1rem' }}>🔬 Scientific Relevance</h2>
          <p>
            Modern studies suggest that Hawan smoke contains antibacterial properties that purify the atmosphere.
            The ritual enhances mindfulness, reduces stress, and aligns brain waves through mantra vibrations.
          </p>

          <h2 style={{ color: orange, margin: '2rem 0 1rem' }}>🎉 When is Hawan Performed?</h2>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li>🗓 During festivals like Navratri, Diwali, and Shivratri</li>
            <li>🎂 On birthdays, anniversaries, or after childbirth</li>
            <li>🏡 At housewarming, marriage, or business openings</li>
            <li>🌅 As a daily ritual for spiritual discipline (Agnihotra)</li>
          </ul>
        </div>
      </div>

      {/* Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default HawanPage;

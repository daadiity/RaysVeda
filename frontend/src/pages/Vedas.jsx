// import React from "react";

// export default function Vedas() {
//   const vedas = [
//     {
//       title: "Rig Veda",
//       description:
//         "The Rig Veda is the oldest and most significant of the four Vedas, composed around 1500 BCE. It contains 1,028 hymns (suktas) organized into 10 mandalas (books). These hymns are written in Vedic Sanskrit and are mainly devoted to natural forces personified as deities, such as Agni (fire), Indra (storm), and Varuna (cosmic order).",
//       image:
//         "https://i.pinimg.com/736x/1c/23/67/1c2367c4d5d00a504d1adef39be2472c.jpg",
//     },
//     {
//       title: "Sama Veda",
//       description:
//         "The Sama Veda is primarily a collection of melodies and chants, drawn almost entirely from the Rig Veda. Its verses were adapted to be sung during rituals and ceremonies, especially the Soma sacrifice. With around 1,875 verses, the Sama Veda is regarded as the “Veda of melodies,” and is considered the origin of Indian classical music.",
//       image:
//         "https://i.pinimg.com/736x/5e/5b/3a/5e5b3a7320cc7888e108780911bda2ef.jpg",
//     },
//     {
//       title: "Yajur Veda",
//       description:
//         "The Yajur Veda serves as a manual for performing Vedic rituals and ceremonies. It consists of ritual formulas, mantras, and prose instructions used during sacrifices. The Veda is divided into two main branches: the Shukla (White) Yajur Veda, which presents verses in a clear and organized form, and the Krishna (Black) Yajur Veda, which mixes verses with explanations.",
//       image:
//         "https://i.pinimg.com/736x/a3/61/d9/a361d9ebe9bba2f03e5ab9ed1ad16b53.jpg",
//     },
//     {
//       title: "Atharva Veda",
//       description:
//         "The Atharva Veda is distinct from the other Vedas in its content and tone, focusing on everyday life rather than just rituals. It includes spells, charms, prayers, and healing incantations, offering insight into the practical concerns of early society. It covers topics like health, longevity, success, love, and protection from evil forces.",
//       image:
//         "https://i.pinimg.com/736x/8b/98/f1/8b98f1b53e1f18beb70b96d420b2b8c4.jpg",
//     },
//   ];

//   return (
//     <>
//       <section className="text-gray-600 body-font">
//         <div className="container px-5 py-24 mx-auto">
//           <div className="flex flex-col text-center w-full mb-20">
//             <h2
//               className="text-xs tracking-widest font-medium title-font mb-1"
//               style={{ color: "#ea580c" }}
//             >
//               ROOF PARTY POLAROID
//             </h2>
//             <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
//               Veda's
//             </h1>
//             <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
//               They are divided into four main collections!
//             </p>
//           </div>
//           <div className="flex flex-wrap">
//             {vedas.map((veda, idx) => (
//               <div
//                 key={veda.title}
//                 className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 flex flex-col items-center"
//               >
//                 <img
//                   src={veda.image}
//                   alt={veda.title}
//                   className="mb-4 w-24 h-24 object-cover rounded-full shadow"
//                 />
//                 <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
//                   {veda.title}
//                 </h2>
//                 <p className="leading-relaxed text-base mb-4">
//                   {veda.description}
//                 </p>
//                 <button
//                   className="inline-flex items-center"
//                   style={{ color: "#ea580c" }}
//                   onClick={() => alert(`Learn more about ${veda.title}`)}
//                 >
//                   Learn More
//                   <svg
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     className="w-4 h-4 ml-2"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M5 12h14M12 5l7 7-7 7"></path>
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>

//   );

// }

import React from "react";

export default function Vedas() {
  const vedas = [
    {
      title: "Rig Veda",
      description:
        "The Rig Veda is the oldest and most significant of the four Vedas, composed around 1500 BCE. It contains 1,028 hymns (suktas) organized into 10 mandalas (books). These hymns are written in Vedic Sanskrit and are mainly devoted to natural forces personified as deities, such as Agni (fire), Indra (storm), and Varuna (cosmic order).",
      image:
        "https://i.pinimg.com/736x/1c/23/67/1c2367c4d5d00a504d1adef39be2472c.jpg",
    },
    {
      title: "Sama Veda",
      description:
        "The Sama Veda is primarily a collection of melodies and chants, drawn almost entirely from the Rig Veda... Its verses were adapted to be sung during rituals and ceremonies, especially the Soma sacrifice. With around 1,875 verses, the Sama Veda is regarded as the “Veda of melodies,” and is considered the origin of Indian classical music.",
      image:
        "https://i.pinimg.com/736x/5e/5b/3a/5e5b3a7320cc7888e108780911bda2ef.jpg",
    },
    {
      title: "Yajur Veda",
      description:
        "The Yajur Veda serves as a manual for performing Vedic rituals and ceremonies. It consists of ritual formulas, mantras, and prose instructions used during sacrifices. The Veda is divided into two main branches: the Shukla (White) Yajur Veda, which presents verses in a clear and organized form, and the Krishna (Black) Yajur Veda, which mixes verses with explanations.",
      image:
        "https://i.pinimg.com/736x/a3/61/d9/a361d9ebe9bba2f03e5ab9ed1ad16b53.jpg",
    },
    {
      title: "Atharva Veda",
      description:
        "The Atharva Veda is distinct from the other Vedas in its content and tone, focusing on everyday life rather than just rituals. It includes spells, charms, prayers, and healing incantations, offering insight into the practical concerns of early society. It covers topics like health, longevity, success, love, and protection from evil forces.",
      image:
        "https://i.pinimg.com/736x/8b/98/f1/8b98f1b53e1f18beb70b96d420b2b8c4.jpg",
    },
  ];

  const branches = [
    {
      title: "Dharma (Righteousness)",
      description:
        "Dharma is the foundation of moral and spiritual life. It represents the path of duty, truth, virtue, and ethical living. Following Dharma helps individuals stay aligned with universal principles and live in harmony with others and the world. It teaches us to act with integrity, compassion, and responsibility in all aspects of life.",
      image:
        "https://i.pinimg.com/736x/17/44/d1/1744d1e7b1025775b5031141deccb797.jpg",
    },
    {
      title: "Artha (Prosperity)",
      description:
        "Artha refers to the pursuit of material well-being, stability, and success. In the Vedic view, wealth and prosperity are not rejected but are seen as necessary for a fulfilling life — as long as they are earned and used ethically. It encourages individuals to work with diligence and intelligence to create abundance for themselves and their community.",
      image:
        "https://i.pinimg.com/736x/0e/65/8f/0e658fc0e5a5b7f1a56567799e70fa7f.jpg",
    },
    {
      title: "Kama (Desire)",
      description:
        "Kama signifies the enjoyment of life’s pleasures — love, beauty, art, and emotional fulfillment. It acknowledges the human need for joy and connection, guiding us to seek pleasure mindfully and in alignment with Dharma. When balanced, Kama enriches life with creativity, expression, and meaningful relationships.",
      image:
        "https://i.pinimg.com/736x/40/bc/b1/40bcb159f75dbefc69bb95977d039f79.jpg",
    },
    {
      title: "Moksha (Liberation)",
      description:
        "Moksha is the ultimate goal — liberation from the cycle of birth and death (samsara). It is the realization of one’s true self and unity with the Divine. Through spiritual practice, self-inquiry, and surrender, the soul attains eternal peace, freedom, and bliss beyond the material world.",
      image:
        "https://i.pinimg.com/736x/ed/5e/8c/ed5e8c159850991abed9528272fff242.jpg",
    },
  ];

  return (
    <>
      <div className="relative w-full aspect-[3/1]">
        <img
          src="https://i.pinimg.com/736x/15/2f/18/152f187b13678e1282b667403b16fad1.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Vedas Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Veda's
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              They are divided into four main collections!
            </p>
          </div>
          <div className="flex flex-wrap">
            {vedas.map((veda, idx) => (
              <div
                key={veda.title}
                className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 flex flex-col items-center"
              >
                <img
                  src={veda.image}
                  alt={veda.title}
                  className="mb-4 w-24 h-24 object-cover rounded-full shadow"
                />
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                  {veda.title}
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  {veda.description}
                </p>
                <button
                  className="inline-flex items-center"
                  style={{ color: "#ea580c" }}
                  onClick={() => alert(`Learn more about ${veda.title}`)}
                >
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches of the Vedas Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
              <span style={{ color: "#1e293b" }}>Learn</span>{" "}
              <span style={{ color: "#0f172a", fontWeight: 400 }}>Veda's</span>
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              The Vedas are the ancient texts that form the foundation of
              Hinduism. It includes Cosmology, ethics and rituals, and is
              revered for their spiritual wisdom and guidance in achieving:
            </p>
          </div>
          <div className="flex flex-wrap">
            {branches.map((branch, idx) => (
              <div
                key={branch.title}
                className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 flex flex-col items-center"
              >
                <img
                  src={branch.image}
                  alt={branch.title}
                  className="mb-4 w-24 h-24 object-cover rounded-full shadow"
                />
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                  {branch.title}
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  {branch.description}
                </p>
                {/* <button
                  className="inline-flex items-center"
                  style={{ color: "#ea580c" }}
                  onClick={() => alert(`Explore more about ${branch.title}`)}
                >
                  Explore
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

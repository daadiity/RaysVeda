import React from "react";

// HD images (replace with your own if desired)
const meditationImages = [
  {
    url: "https://i.pinimg.com/736x/6d/39/10/6d3910c9a34163bfe3824e8f97a0e34c.jpg",
    alt: "Meditation in nature"
  },
  {
    url: "https://i.pinimg.com/736x/89/ea/d2/89ead21974cba7c96e4c669210dd46d4.jpg",
    alt: "Peaceful meditation"
  }
];

// Osho quote and photo
const osho = {
  photo: "https://i.pinimg.com/736x/8d/e8/46/8de846cd423b71cd1511834a7d475b2b.jpg",
  quote: "Meditation is nothing but a device to make you aware of your real self — which is not created by you, which need not be created by you, which you already are.",
  name: "Osho"
};

export default function Meditation() { 
  return (
    <section className="container py-16">
      <h1 className="section-heading text-center mb-4">Meditation</h1>
      <p className="section-subheading text-center mb-8 max-w-2xl mx-auto">
        Meditation is a powerful tool for inner transformation. It is not about forcing the mind to be quiet, but about finding the quiet that is already there. Meditation brings clarity, peace, and a deep sense of well-being.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {meditationImages.map((img, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto text-lg text-gray-800 space-y-6">
        <blockquote className="italic border-l-4 border-orange-400 pl-4 text-xl text-orange-700">
          “If you learn to create the right kind of climate in your body, mind, and emotion, meditation will blossom naturally.”<br />
          <span className="block mt-2 text-right font-semibold">– Sadhguru</span>
        </blockquote>
        <h2 className="text-2xl font-semibold mt-8 mb-2">What is Meditation?</h2>
        <p>
          Meditation is a process of turning inward and experiencing life beyond the limitations of the body and mind. It is a state of awareness where you are not entangled with your thoughts, emotions, or external situations.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Benefits of Meditation</h2>
        <ul className="list-disc ml-6">
          <li>Reduces stress and anxiety</li>
          <li>Improves focus and clarity</li>
          <li>Enhances emotional balance</li>
          <li>Promotes overall well-being</li>
          <li>Deepens self-awareness</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">How to Start?</h2>
        <p>
          Begin by sitting comfortably with your spine erect. Close your eyes and simply observe your breath. Let your attention rest on the natural flow of inhalation and exhalation. If your mind wanders, gently bring it back to your breath. Start with 5-10 minutes daily and gradually increase the duration.
        </p>
        <div className="bg-orange-100 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold mb-2">“Yoga is not just about twisting your body. It is about transforming yourself.”</h3>
          <p className="text-right font-semibold">– Sadhguru</p>
        </div>
        {/* Osho Quote Section */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row items-center mt-10">
          <img
            src={osho.photo}
            alt="Osho"
            className="w-32 h-32 object-cover rounded-full border-4 border-orange-200 mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <blockquote className="italic text-xl text-gray-700 mb-2">
              “{osho.quote}”
            </blockquote>
            <p className="text-right font-semibold text-orange-700">– {osho.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
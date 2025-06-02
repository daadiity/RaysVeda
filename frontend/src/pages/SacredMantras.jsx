import React from "react";

const mantras = [
  {
    title: "Gayatri Mantra",
    mantra: "ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं। भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥",
    meaning: "We meditate on the divine light of the Sun, may it inspire our intellect."
  },
  {
    title: "Mahamrityunjaya Mantra",
    mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्॥",
    meaning: "We worship the three-eyed Lord Shiva who nourishes all and frees us from the bondage of death."
  },
  {
    title: "Ganesh Mantra",
    mantra: "ॐ गं गणपतये नमः",
    meaning: "Salutations to Lord Ganesha."
  },
   {
    title: "Bhagavad Gita Shloka",
    mantra: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    meaning: "You have the right to perform your actions, but not to the fruits of your actions."
  },
   {
    title: "Ramayana Shloka",
    mantra: "श्रीराम राम रघुकुल नायक। सीता राम सीता राम।",
    meaning: "Salutations to Lord Rama, the leader of the Raghu dynasty, and to Sita."
  },
  {
    title: "Saraswati Vandana",
    mantra: "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता। या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥",
    meaning: "Salutations to Goddess Saraswati, who is pure white like jasmine, the moon, and snow, and who is adorned in white garments."
  }

];

export default function SacredMantras() {
  return (
    <section className="container py-16">
      <h1 className="section-heading">Sacred Mantras</h1>
      <p className="section-subheading">
        Explore powerful mantras for meditation, healing, and spiritual growth.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {mantras.map((m, idx) => (
          <div key={idx} className="bg-orange-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-serif font-semibold mb-2">{m.title}</h2>
            <p className="text-2xl mb-4">{m.mantra}</p>
            <p className="text-gray-700">{m.meaning}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
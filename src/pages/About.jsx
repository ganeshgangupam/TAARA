import React from 'react';

const About = () => {
  return (
    <div className="pt-16 pb-24 px-4 md:px-8 max-w-4xl mx-auto text-center min-h-screen">
      <h1 className="text-4xl font-serif text-brand-charcoal mb-8">About TAARA</h1>
      <p className="text-xl text-gray-500 mb-12 italic">"A Star in Every Style"</p>
      
      <div className="space-y-8 text-lg text-gray-600 leading-relaxed text-left">
        <p>
          Founded in 2024, TAARA was born from a desire to bring royal elegance to modern fashion. 
          We believe that luxury is not just about price, but about the feeling of confidence and grace that comes with wearing something truly special.
        </p>
        <p>
          Our collections are curated with the utmost care, selecting only the finest fabrics and designs that stand the test of time. 
          Inspired by the grandeur of royal boutique signboards and the minimalism of contemporary art, TAARA bridges the gap between the past and the future.
        </p>
        <p>
          We are committed to sustainability and ethical craftsmanship. Every piece you see here tells a story of dedication, passion, and artistry.
        </p>
      </div>
    </div>
  );
};

export default About;

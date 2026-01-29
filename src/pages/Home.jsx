import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 z-10 order-2 lg:order-1"
          >
            <span className="text-brand-primary font-medium tracking-widest uppercase text-sm block mb-2">
              New Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-brand-charcoal">
              TAARA <br/>
              <span className="font-serif italic font-light text-6xl md:text-8xl block mt-2">
                A Star in Every Style
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-md leading-relaxed">
              Curated luxury boutique collections designed to shine with you. 
              Experience the art of fashion with our premium selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/collections">
                <Button size="lg" className="bg-brand-charcoal hover:bg-black text-white px-10 h-14 text-base rounded-full shadow-lg hover:shadow-xl transition-all">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/collections">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-gray-300 hover:border-brand-charcoal group">
                  Shop New Arrivals <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative h-[500px] md:h-[700px] w-full order-1 lg:order-2"
          >
            <div className="relative w-full h-full overflow-hidden rounded-t-[10rem] rounded-b-lg shadow-2xl">
              <div className="absolute inset-0 bg-brand-champagne/10 mix-blend-multiply z-10 pointer-events-none" />
              <img 
                src="https://www.neetalulla.com/cdn/shop/files/851-Neeta-Lulla-Fashion-Show.jpg?v=1747123995&width=1800" 
                alt="Luxury Fashion Model" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              {/* Decorative Elements */}
              <div className="absolute inset-0 border-[1px] border-white/20 z-20 rounded-t-[10rem] rounded-b-lg m-2 pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </section>
      
      {/* Featured / Introduction Section */}
      <section className="py-32 bg-brand-offWhite">
        <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="text-brand-primary uppercase tracking-widest text-xs font-bold mb-4 block">The Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif italic mb-8 text-brand-charcoal">
              "Luxury uses less color, more space."
            </h2>
            <p className="text-gray-500 leading-loose">
              At TAARA, we believe in the power of subtle elegance. Our designs are inspired by royal boutique aesthetics, 
              combining modern clarity with a high-end shopping experience. Every piece is a star, waiting to shine.
            </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
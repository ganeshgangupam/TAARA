import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-brand-champagne fill-brand-champagne/20" />
            <span className="text-2xl font-bold tracking-tight text-white">TAARA</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            A Star in Every Style. Curated luxury boutique collections designed to shine with you. 
            Experience elegance in every detail.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-brand-champagne transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-brand-champagne transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-brand-champagne transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-brand-champagne font-medium mb-6">Shop</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/collections" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link to="/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link to="/sale" className="hover:text-white transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-brand-champagne font-medium mb-6">Company</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-brand-champagne font-medium mb-6">Legal</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} TAARA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

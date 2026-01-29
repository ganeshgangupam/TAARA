import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-16 pb-24 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-serif text-brand-charcoal mb-8 text-center">Privacy Policy</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>At TAARA, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>
        
        <h2 className="text-xl font-medium text-brand-charcoal mt-8">Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, and payment information.</p>
        
        <h2 className="text-xl font-medium text-brand-charcoal mt-8">How We Use Your Information</h2>
        <p>We use your information to process your orders, communicate with you about your account, and improve our services. We do not sell your personal information to third parties.</p>
        
        <h2 className="text-xl font-medium text-brand-charcoal mt-8">Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <p className="mt-8 text-sm text-gray-500">Last updated: January 2026</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

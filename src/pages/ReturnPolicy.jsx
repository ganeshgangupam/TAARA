import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="pt-16 pb-24 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-serif text-brand-charcoal mb-8 text-center">Return Policy</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>We want you to be completely satisfied with your purchase from TAARA. If for any reason you are not, we offer a hassle-free return policy.</p>
        
        <h2 className="text-xl font-medium text-brand-charcoal mt-8">Return Eligibility</h2>
        <p>Items must be returned within 14 days of delivery. They must be unused, unwashed, and in their original packaging with all tags attached.</p>
        
        <h2 className="text-xl font-medium text-brand-charcoal mt-8">Process</h2>
        <p>To initiate a return, please contact our customer support team. We will provide you with a return shipping label and instructions.</p>
        
        <h2 className="text-xl font-medium text-brand-charcoal mt-8">Refunds</h2>
        <p>Once we receive and inspect your return, we will process your refund to the original payment method within 5-7 business days.</p>
        
        <h2 className="text-xl font-medium text-brand-charcoal mt-8">Exchanges</h2>
        <p>If you would like to exchange an item for a different size or color, please return the original item and place a new order.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;

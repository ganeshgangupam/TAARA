import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Contact = () => {
  return (
    <div className="pt-16 pb-24 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-serif text-brand-charcoal mb-8 text-center">Contact Us</h1>
      <p className="text-gray-500 text-center mb-12">We'd love to hear from you. Reach out to us for any queries.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-medium mb-6">Get in Touch</h2>
          <div className="space-y-4 text-gray-600">
            <p><strong>Email:</strong> support@taara.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong><br/>123, Fashion Avenue,<br/>Luxury District, Mumbai - 400001</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input type="email" placeholder="Your Email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea 
              className="flex w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]" 
              placeholder="How can we help you?"
            />
          </div>
          <Button className="w-full bg-brand-charcoal text-white">Send Message</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

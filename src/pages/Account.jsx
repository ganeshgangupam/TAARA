import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, HelpCircle, LogOut, ChevronRight, Edit2, Plus, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { products } from '@/lib/data'; // Using existing product data for wishlist mock

// Mock Data
const MOCK_ORDERS = [
  { id: '#ORD-7829', date: '24 Jan 2026', total: 12499, status: 'Processing', items: 2 },
  { id: '#ORD-7654', date: '15 Dec 2025', total: 4500, status: 'Delivered', items: 1 },
  { id: '#ORD-7102', date: '02 Nov 2025', total: 8999, status: 'Delivered', items: 3 },
];

const MOCK_ADDRESSES = [
  { id: 1, type: 'Home', name: 'Ananya Gupta', address: 'Plot 45, Jubilee Hills, Hyderabad, Telangana 500033', phone: '+91 98765 43210', isDefault: true },
  { id: 2, type: 'Work', name: 'Ananya Gupta', address: 'Hitech City, Madhapur, Hyderabad, Telangana 500081', phone: '+91 98765 43210', isDefault: false },
];

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-white font-sans pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* User Brief */}
              <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-lg font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-medium text-brand-charcoal">Hello, {user?.name || 'User'}</h3>
                  <p className="text-xs text-gray-500">Welcome back</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-2 md:gap-0 md:space-y-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0",
                      activeTab === tab.id 
                        ? "bg-gray-50 text-brand-charcoal ring-1 ring-gray-200 md:ring-0" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-brand-charcoal"
                    )}
                  >
                    <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-brand-charcoal" : "text-gray-400")} />
                    {tab.label}
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="md:hidden flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>

              <button
                onClick={handleLogout}
                className="hidden md:flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                {/* Content Renderers */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h1 className="text-3xl font-serif text-brand-charcoal mb-2">My Account</h1>
                      <p className="text-gray-500">Manage your profile, orders, and preferences.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div 
                        onClick={() => setActiveTab('orders')}
                        className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Package className="w-5 h-5 text-brand-charcoal" />
                        </div>
                        <h3 className="font-medium text-brand-charcoal mb-1">Orders</h3>
                        <p className="text-xs text-gray-500">Check order status</p>
                      </div>

                      <div 
                        onClick={() => setActiveTab('wishlist')}
                        className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Heart className="w-5 h-5 text-brand-charcoal" />
                        </div>
                        <h3 className="font-medium text-brand-charcoal mb-1">Wishlist</h3>
                        <p className="text-xs text-gray-500">Your saved items</p>
                      </div>

                      <div 
                        onClick={() => setActiveTab('addresses')}
                        className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <MapPin className="w-5 h-5 text-brand-charcoal" />
                        </div>
                        <h3 className="font-medium text-brand-charcoal mb-1">Addresses</h3>
                        <p className="text-xs text-gray-500">Manage delivery</p>
                      </div>
                    </div>

                    {/* Recent Order Preview */}
                    <div className="pt-8 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-brand-charcoal">Recent Orders</h2>
                        <Button variant="link" onClick={() => setActiveTab('orders')} className="text-brand-primary">View All</Button>
                      </div>
                      <div className="space-y-4">
                        {MOCK_ORDERS.slice(0, 1).map(order => (
                          <div key={order.id} className="flex flex-col sm:flex-row justify-between p-6 rounded-xl border border-gray-100 bg-white hover:border-brand-primary/20 transition-colors gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-medium text-brand-charcoal">{order.id}</span>
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                                  order.status === 'Processing' ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                                  order.status === 'Delivered' ? "bg-green-50 text-green-700 border-green-100" :
                                  "bg-gray-50 text-gray-700 border-gray-100"
                                )}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">{order.date} • {order.items} Items</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-brand-charcoal">₹{order.total.toLocaleString()}</p>
                              <Button variant="link" className="text-xs h-auto p-0 text-brand-primary mt-1">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-serif text-brand-charcoal mb-2">My Profile</h2>
                      <p className="text-gray-500">Manage your personal information.</p>
                    </div>

                    <div className="p-8 rounded-2xl border border-gray-100 bg-white space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Full Name</label>
                          <Input defaultValue={user?.name || "Ananya Gupta"} className="bg-gray-50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Email Address</label>
                          <Input defaultValue={user?.email || "ananya@example.com"} className="bg-gray-50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Phone Number</label>
                          <Input defaultValue="+91 98765 43210" className="bg-gray-50" />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-50 flex gap-4">
                        <Button className="bg-brand-charcoal text-white hover:bg-black px-8">Save Changes</Button>
                        <Button variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-serif text-brand-charcoal mb-2">My Orders</h2>
                      <p className="text-gray-500">View and track your past purchases.</p>
                    </div>

                    {MOCK_ORDERS.length > 0 ? (
                      <div className="space-y-4">
                        {MOCK_ORDERS.map(order => (
                          <div key={order.id} className="flex flex-col sm:flex-row justify-between p-6 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-all gap-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-bold text-brand-charcoal">{order.id}</span>
                                <span className={cn(
                                  "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                  order.status === 'Processing' ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                                  order.status === 'Delivered' ? "bg-green-50 text-green-700 border-green-100" :
                                  "bg-gray-50 text-gray-700 border-gray-100"
                                )}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mb-4">{order.date}</p>
                              
                              <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                  {/* Order Item Previews - Using product images */}
                                  {[...Array(order.items)].map((_, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                                       <img src={products[i % products.length].image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">{order.items} Items</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between min-w-[120px]">
                              <p className="font-bold text-lg text-brand-charcoal">₹{order.total.toLocaleString()}</p>
                              <Button variant="outline" size="sm" className="w-full">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Package className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                        <p className="text-gray-500 text-sm mt-1 mb-6">Start exploring our collection to place your first order.</p>
                        <Button onClick={() => navigate('/collections')} className="bg-brand-charcoal text-white hover:bg-black">Start Shopping</Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-serif text-brand-charcoal mb-2">Wishlist</h2>
                      <p className="text-gray-500">Your curated list of favorites.</p>
                    </div>

                    <div className="space-y-4">
                      {products.slice(0, 3).map(product => (
                        <div key={product.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-all group">
                          <div className="w-24 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-brand-charcoal">{product.name}</h3>
                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <span className="font-semibold text-brand-charcoal">₹{product.price.toLocaleString()}</span>
                              <Button size="sm" className="bg-brand-charcoal text-white hover:bg-black text-xs h-8">
                                Move to Bag
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-2xl font-serif text-brand-charcoal mb-2">Addresses</h2>
                        <p className="text-gray-500">Manage your delivery locations.</p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Plus className="w-4 h-4" /> Add New
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {MOCK_ADDRESSES.map(addr => (
                        <div key={addr.id} className="p-6 rounded-xl border border-gray-100 bg-white hover:border-brand-primary/30 transition-all relative group">
                          {addr.isDefault && (
                            <span className="absolute top-6 right-6 px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                              Default
                            </span>
                          )}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-brand-charcoal">{addr.type}</span>
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600 pl-11">
                            <p className="font-medium text-gray-900">{addr.name}</p>
                            <p>{addr.address}</p>
                            <p className="mt-2 text-gray-500">Phone: {addr.phone}</p>
                          </div>

                          <div className="flex gap-3 pl-11 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="link" className="h-auto p-0 text-xs text-brand-primary">Edit</Button>
                            <span className="text-gray-300">|</span>
                            <Button variant="link" className="h-auto p-0 text-xs text-red-600">Delete</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-serif text-brand-charcoal mb-2">Account Settings</h2>
                      <p className="text-gray-500">Update your security and preferences.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 rounded-xl border border-gray-100 bg-white">
                        <h3 className="font-medium text-brand-charcoal mb-4">Change Password</h3>
                        <div className="space-y-4 max-w-md">
                          <Input type="password" placeholder="Current Password" />
                          <Input type="password" placeholder="New Password" />
                          <Input type="password" placeholder="Confirm New Password" />
                          <Button className="bg-brand-charcoal text-white hover:bg-black w-full">Update Password</Button>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl border border-gray-100 bg-white">
                        <h3 className="font-medium text-brand-charcoal mb-4">Preferences</h3>
                        <div className="space-y-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-charcoal focus:ring-brand-primary" defaultChecked />
                            <span className="text-sm text-gray-600">Subscribe to newsletter for new arrivals</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-charcoal focus:ring-brand-primary" defaultChecked />
                            <span className="text-sm text-gray-600">Receive order notifications via WhatsApp</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'help' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-serif text-brand-charcoal mb-2">Help & Support</h2>
                      <p className="text-gray-500">We are here to assist you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl border border-gray-100 bg-white text-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                          <HelpCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-brand-charcoal mb-2">Need help with an order?</h3>
                        <p className="text-sm text-gray-500 mb-6">Our support team is available Mon-Sat, 10am to 7pm.</p>
                        <Button className="w-full bg-brand-charcoal text-white hover:bg-black">Contact Support</Button>
                      </div>

                      <div className="p-6 rounded-xl border border-gray-100 bg-white text-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </div>
                        <h3 className="font-bold text-brand-charcoal mb-2">WhatsApp Us</h3>
                        <p className="text-sm text-gray-500 mb-6">Quick response for urgent queries.</p>
                        <Button variant="outline" className="w-full text-green-600 border-green-200 hover:bg-green-50">Chat on WhatsApp</Button>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products as initialProducts } from '@/lib/data';
import { Plus, Edit, Trash2, X, Users, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Overview from '@/components/admin/Overview';
import MobileSidebar from '@/components/admin/MobileSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Local state for data management
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'Ananya Gupta', date: '2024-03-15', total: 4500, status: 'Pending' },
    { id: '#ORD-002', customer: 'Rahul Verma', date: '2024-03-14', total: 12999, status: 'Shipped' },
    { id: '#ORD-003', customer: 'Meera Reddy', date: '2024-03-12', total: 2499, status: 'Delivered' },
  ]);

  // Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60'
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  // Product Actions
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60'
    });
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setFormData({ ...product });
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (currentProduct) {
      // Edit
      setProducts(products.map(p => p.id === currentProduct.id ? { ...formData, id: currentProduct.id } : p));
      toast.success('Product updated successfully');
    } else {
      // Add
      const newProduct = {
        ...formData,
        id: products.length + 1,
        price: Number(formData.price)
      };
      setProducts([...products, newProduct]);
      toast.success('Product added successfully');
    }
    setIsProductModalOpen(false);
  };

  // Order Actions
  const handleUpdateStatus = (id) => {
    setOrders(orders.map(order => {
      if (order.id === id) {
        const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        const currentIndex = statuses.indexOf(order.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...order, status: nextStatus };
      }
      return order;
    }));
    toast.success('Order status updated');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        handleLogout={handleLogout} 
      />

      <MobileSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        handleLogout={handleLogout}
      />

      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <AdminTopbar 
          title={activeTab} 
          isCollapsed={isCollapsed} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-6">
            <div className="hidden md:block">
              <h1 className="text-2xl font-serif text-brand-charcoal capitalize">{activeTab}</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your {activeTab} here</p>
            </div>
            
            {activeTab === 'products' && (
              <Button onClick={handleAddProduct} className="bg-brand-charcoal text-white hover:bg-black gap-2 shadow-lg hover:shadow-xl transition-all w-full md:w-auto justify-center">
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            )}
          </div>

          {activeTab === 'overview' && (
            <Overview products={products} orders={orders} />
          )}

          {activeTab === 'products' && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              {/* Controls */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search products..." className="pl-9 bg-gray-50 border-transparent focus:bg-white" />
                </div>
                <Button variant="outline" className="gap-2 text-gray-600 hidden md:flex">
                  <Filter className="w-4 h-4" /> Filter
                </Button>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 font-medium">Product Name</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Price</th>
                        <th className="px-6 py-4 font-medium">Stock</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                              <img src={product.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            {product.name}
                          </td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4 font-medium text-brand-charcoal">₹{product.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              In Stock
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleEditProduct(product)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Grid View */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-brand-charcoal line-clamp-2">{product.name}</h3>
                          <div className="flex items-center gap-1 -mr-2 -mt-2">
                             <button onClick={() => handleEditProduct(product)} className="p-2 text-blue-600">
                                <Edit className="w-4 h-4" />
                             </button>
                             <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-brand-charcoal">₹{product.price.toLocaleString()}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
             <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
               {/* Desktop Table View */}
               <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                       <tr>
                         <th className="px-6 py-4 font-medium">Order ID</th>
                         <th className="px-6 py-4 font-medium">Customer</th>
                         <th className="px-6 py-4 font-medium">Date</th>
                         <th className="px-6 py-4 font-medium">Total</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                         <th className="px-6 py-4 font-medium">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                       {orders.map(order => (
                         <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4 font-medium text-brand-charcoal">{order.id}</td>
                           <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                               <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs font-bold">
                                 {order.customer.charAt(0)}
                               </div>
                               {order.customer}
                             </div>
                           </td>
                           <td className="px-6 py-4 text-gray-400">{order.date}</td>
                           <td className="px-6 py-4 font-medium">₹{order.total.toLocaleString()}</td>
                           <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                               order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                               order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                               order.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                               'bg-gray-50 text-gray-700 border-gray-100'
                             }`}>
                               <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  order.status === 'Delivered' ? 'bg-green-500' :
                                  order.status === 'Shipped' ? 'bg-blue-500' :
                                  order.status === 'Processing' ? 'bg-yellow-500' :
                                  'bg-gray-500'
                               }`}></span>
                               {order.status}
                             </span>
                           </td>
                           <td className="px-6 py-4">
                             <Button 
                               variant="ghost" 
                               size="sm"
                               onClick={() => handleUpdateStatus(order.id)}
                               className="text-xs h-8 hover:bg-brand-charcoal hover:text-white transition-colors"
                             >
                               Update Status
                             </Button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>

               {/* Mobile List View */}
               <div className="grid grid-cols-1 gap-4 md:hidden">
                 {orders.map(order => (
                   <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                     <div className="flex justify-between items-start mb-4">
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                           <span className="font-bold text-brand-charcoal">{order.id}</span>
                           <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                             order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                             order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                             order.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                             'bg-gray-50 text-gray-700 border-gray-100'
                           }`}>
                             {order.status}
                           </span>
                         </div>
                         <div className="text-xs text-gray-500">{order.date}</div>
                       </div>
                       <div className="text-right">
                         <div className="font-bold text-lg">₹{order.total.toLocaleString()}</div>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs font-bold">
                           {order.customer.charAt(0)}
                         </div>
                         <span className="text-sm font-medium text-gray-700">{order.customer}</span>
                       </div>
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => handleUpdateStatus(order.id)}
                         className="text-xs h-8"
                       >
                         Update Status
                       </Button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {activeTab === 'users' && (
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-500 animate-in zoom-in-95 duration-500">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Users className="w-8 h-8 text-gray-300" />
               </div>
               <h3 className="text-lg font-medium text-gray-900 mb-1">No Active Users</h3>
               <p className="text-gray-400">User management will be available soon.</p>
             </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-brand-charcoal">
                {currentProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Input 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <Input 
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <Input 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://..."
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              
              <div className="flex gap-3 mt-6 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsProductModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-brand-charcoal text-white hover:bg-black">
                  {currentProduct ? 'Update' : 'Add Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

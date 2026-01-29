import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, ShoppingBag, Archive, IndianRupee, Users, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Dummy Data for Charts
const salesData = [
  { name: 'Mon', sales: 4000, views: 2400 },
  { name: 'Tue', sales: 3000, views: 1398 },
  { name: 'Wed', sales: 2000, views: 9800 },
  { name: 'Thu', sales: 2780, views: 3908 },
  { name: 'Fri', sales: 1890, views: 4800 },
  { name: 'Sat', sales: 2390, views: 3800 },
  { name: 'Sun', sales: 3490, views: 4300 },
];

const ordersData = [
  { name: 'Mon', orders: 24 },
  { name: 'Tue', orders: 13 },
  { name: 'Wed', orders: 58 },
  { name: 'Thu', orders: 39 },
  { name: 'Fri', orders: 48 },
  { name: 'Sat', orders: 38 },
  { name: 'Sun', orders: 43 },
];

const Overview = ({ products, orders }) => {
  const totalSales = 124500; // Static for demo, can be calculated
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Sales" 
          value={`₹${totalSales.toLocaleString()}`} 
          icon={IndianRupee}
          trend="+12.5%"
          trendUp={true}
          description="Compared to last month"
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatsCard 
          title="Total Orders" 
          value={totalOrders} 
          icon={ShoppingBag}
          trend="+5.2%"
          trendUp={true}
          description="New orders today"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatsCard 
          title="Total Products" 
          value={totalProducts} 
          icon={Archive}
          trend="-2.1%"
          trendUp={false}
          description="In stock inventory"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales & Views Analytics */}
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-primary" />
              Sales & Views Analytics
            </CardTitle>
            <p className="text-sm text-gray-500">Weekly performance overview</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} name="Sales (₹)" />
                  <Area type="monotone" dataKey="views" stroke="#82ca9d" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} name="Page Views" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders Analytics */}
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
              Orders Overview
            </CardTitle>
            <p className="text-sm text-gray-500">Daily order volume</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                  />
                  <Bar dataKey="orders" fill="#c1121f" radius={[4, 4, 0, 0]} barSize={30} name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Views Progress */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-primary" />
            Page Views Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ProgressBar label="Daily View Target (5k)" current={3800} target={5000} color="bg-gradient-to-r from-cyan-400 to-blue-500" />
            <ProgressBar label="Weekly View Target (35k)" current={24500} target={35000} color="bg-gradient-to-r from-purple-500 to-pink-500" />
            <ProgressBar label="Monthly View Target (150k)" current={112000} target={150000} color="bg-gradient-to-r from-emerald-500 to-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatsCard = ({ title, value, icon: Icon, trend, trendUp, description, color }) => (
  <div className="relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm p-6 group hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className="z-10">
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={cn("p-3 rounded-lg text-white shadow-lg", color)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 z-10 relative">
      <span className={cn(
        "text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1",
        trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
      )}>
        {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </span>
      <span className="text-xs text-gray-400">{description}</span>
    </div>
    
    {/* Decorative background element */}
    <div className={cn("absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500", color)} />
  </div>
);

const ProgressBar = ({ label, current, target, color }) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{current.toLocaleString()} / {target.toLocaleString()} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={cn("h-3 rounded-full transition-all duration-1000 ease-out", color)} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Overview;
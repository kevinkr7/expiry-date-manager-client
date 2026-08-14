import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // Mock Data
  const stats = [
    { name: 'Total Items', value: '142', icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4', color: 'bg-primary text-white' },
    { name: 'Expiring Soon', value: '12', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-amber-100 text-amber-700' },
    { name: 'Expired', value: '3', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'bg-secondary/10 text-secondary' },
    { name: 'Healthy Items', value: '127', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-100 text-green-700' },
  ];

  const expiringItems = [
    { id: 1, name: 'Organic Milk', category: 'Dairy', expiryDate: '2023-11-25', daysLeft: 2, status: 'Critical' },
    { id: 2, name: 'Greek Yogurt', category: 'Dairy', expiryDate: '2023-11-26', daysLeft: 3, status: 'Critical' },
    { id: 3, name: 'Spinach', category: 'Vegetables', expiryDate: '2023-11-28', daysLeft: 5, status: 'Warning' },
    { id: 4, name: 'Eggs (1 Dozen)', category: 'Dairy', expiryDate: '2023-12-01', daysLeft: 8, status: 'Healthy' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
           <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-primary font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
          <button className="px-4 py-2 bg-secondary text-white font-medium rounded-lg shadow-md hover:bg-secondary/90 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            Scan Barcode
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200 cursor-default">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                 <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>
            <div>
               <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
               <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expiring Soon Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">Expiring Soon</h2>
            <Link to="/dashboard/inventory" className="text-sm font-medium text-secondary hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expiringItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-primary">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={item.daysLeft <= 3 ? 'text-secondary font-medium' : 'text-gray-700'}>
                        {new Date(item.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">({item.daysLeft} days)</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        item.status === 'Critical' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                        item.status === 'Warning' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-green-100 text-green-800 border-green-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-primary">Recently Added</h2>
          </div>
          <div className="p-4 space-y-4 flex-1">
             {/* Activity Item */}
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-tertiary/30 flex items-center justify-center shrink-0">
                  <span className="text-primary font-medium text-sm">BR</span>
               </div>
               <div>
                  <p className="text-sm font-medium text-primary">Bread (Whole Wheat)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Added 2 hours ago • Expires in 5 days</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-tertiary/30 flex items-center justify-center shrink-0">
                  <span className="text-primary font-medium text-sm">AM</span>
               </div>
               <div>
                  <p className="text-sm font-medium text-primary">Almond Milk</p>
                  <p className="text-xs text-gray-500 mt-0.5">Added yesterday • Expires in 14 days</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-tertiary/30 flex items-center justify-center shrink-0">
                  <span className="text-primary font-medium text-sm">CH</span>
               </div>
               <div>
                  <p className="text-sm font-medium text-primary">Cheddar Cheese</p>
                  <p className="text-xs text-gray-500 mt-0.5">Added yesterday • Expires in 30 days</p>
               </div>
             </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 mt-auto">
             <button className="w-full text-center text-sm font-medium text-primary hover:text-primary-light transition-colors">
               View all activity
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

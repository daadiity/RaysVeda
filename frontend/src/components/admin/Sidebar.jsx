// import { Dashboard, Group } from '@mui/icons-material';
// import { Link, useLocation } from 'react-router-dom';

// const navItems = [
//   { name: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
//   { name: 'Users', icon: <Group />, path: '/admin/users' },
//   // Add more links as needed
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <div className="w-64 bg-white shadow-md h-full fixed">
//       <div className="p-6 text-xl font-bold text-orange-600">RaysVeda Admin</div>
//       <nav className="mt-6">
//         {navItems.map(item => (
//           <Link
//             key={item.name}
//             to={item.path}
//             className={`flex items-center px-6 py-3 text-sm font-medium hover:bg-orange-100 ${
//               location.pathname === item.path ? 'bg-orange-200 text-orange-800' : 'text-gray-700'
//             }`}
//           >
//             <span className="mr-3">{item.icon}</span> {item.name}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// }



import { Dashboard, Group, MenuOpen } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
  { name: 'Users', icon: <Group />, path: '/admin/users' },
  // Add more links as needed
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-full fixed bg-white shadow-md transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        <span className={`text-xl font-bold text-orange-600 transition-opacity ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
          RaysVeda Admin
        </span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-orange-600">
          <MenuOpen />
        </button>
      </div>

      <nav className="mt-6">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm font-medium hover:bg-orange-100 transition-all ${
              location.pathname === item.path
                ? 'bg-orange-200 text-orange-800'
                : 'text-gray-700'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {!collapsed && item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

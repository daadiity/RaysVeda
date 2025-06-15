// import Sidebar from './Sidebar';
// import Topbar from './Topbar';

// import PropTypes from 'prop-types';
// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Topbar />
//         <main className="flex-1 p-6 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

// AdminLayout.propTypes = {
//   children: PropTypes.node,
// };
// // This component serves as the layout for the admin section of the application.
// // It includes a sidebar for navigation and a topbar for additional controls.   












import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar receives collapse state and toggle */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
};

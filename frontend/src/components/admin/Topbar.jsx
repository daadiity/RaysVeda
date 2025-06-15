import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="flex items-center text-sm text-red-600 hover:text-red-800"
      >
        <Logout fontSize="small" className="mr-1" /> Logout
      </button>
    </div>
  );
}
// This component serves as the top bar for the admin section of the application.
// It includes a title and a logout button. The logout button clears the admin token from local storage and redirects to the admin login page.  
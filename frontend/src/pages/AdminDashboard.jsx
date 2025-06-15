import AdminLayout from '../components/admin/AdminLayout';
import { Typography, Paper } from '@mui/material';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Paper className="p-6 mb-6">
        <Typography variant="h4">Welcome to the Admin Dashboard 👋</Typography>
        <Typography variant="body1" className="mt-2">
          This is your control panel to manage users, bookings, and content.
        </Typography>
      </Paper>
    </AdminLayout>
  );
}
// This component serves as the main dashboard for the admin section of the application.
// It provides a welcome message and an overview of the admin functionalities available.  
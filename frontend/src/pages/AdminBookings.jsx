import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/Dashboard/AdminLayout";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await axios.get("http://localhost:5000/api/admin/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    await axios.delete(`http://localhost:5000/api/admin/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <AdminLayout>
      <Paper className="p-4">
        <Typography variant="h5" className="mb-4">Bookings Table</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Pooja Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking._id}>
                <TableCell>{booking.user?.name || 'N/A'}</TableCell>
                <TableCell>{booking.user?.email || 'N/A'}</TableCell>
                <TableCell>{booking.poojaType}</TableCell>
                <TableCell>{new Date(booking.date).toLocaleString()}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(booking._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </AdminLayout>
  );
}

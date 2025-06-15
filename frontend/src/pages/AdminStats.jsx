import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/Dashboard/AdminLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Paper, Typography, Grid } from "@mui/material";

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    monthlyBookings: [],
    topPoojas: []
  });

  const COLORS = ["#ea580c", "#facc15", "#4ade80", "#60a5fa", "#f472b6"];

  const fetchStats = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await axios.get("http://localhost:5000/api/admin/dashboard-stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <Typography variant="h5" className="mb-4">Dashboard Overview</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6">Total Users: {stats.totalUsers}</Typography>
            <Typography variant="h6" className="mt-2">Total Bookings: {stats.totalBookings}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-2">Top Pooja Types</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.topPoojas}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {stats.topPoojas.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-2">Monthly Bookings</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyBookings}>
                <XAxis dataKey="_id" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ea580c" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Download, TrendingUp } from "lucide-react";
import { adminAPI } from "../../services/api";

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [reportType, setReportType] = useState("revenue");
  const [dateRange, setDateRange] = useState("last30days");
  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    { value: "revenue", label: "Revenue Report" },
    { value: "bookings", label: "Bookings Report" },
    { value: "users", label: "Users Report" },
    { value: "poojas", label: "Poojas Performance" },
  ];

  const dateRanges = [
    { value: "last7days", label: "Last 7 Days" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "last3months", label: "Last 3 Months" },
    { value: "last6months", label: "Last 6 Months" },
    { value: "lastyear", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
  ];

  const generateReport = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.generateReport(reportType, dateRange);
      setReportData(response); // already unwrapped by interceptor
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (format) => {
    try {
      setDownloading(true);
      const blob = await adminAPI.downloadReport(reportType, dateRange, format);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${reportType}-report-${dateRange}.${format}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    generateReport();
  }, [reportType, dateRange]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">Generate and download detailed reports</p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={loading}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Report Results */}
      {reportData && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Total Revenue
              </h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{reportData?.summary?.totalRevenue?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Total Bookings
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {reportData?.summary?.totalBookings || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Average Booking Value
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                ₹{reportData?.summary?.averageBookingValue || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Growth Rate
              </h3>
              <p className="text-2xl font-bold text-orange-600">
                +{reportData?.summary?.growthRate || 0}%
              </p>
            </div>
          </div>

          {/* Report Table */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Report Details
                </h3>
                <p className="text-sm text-gray-500">
                  Detailed breakdown of{" "}
                  {reportTypes.find((t) => t.value === reportType)?.label}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadReport("pdf")}
                  disabled={downloading}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </button>
                <button
                  onClick={() => downloadReport("excel")}
                  disabled={downloading}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Excel
                </button>
                <button
                  onClick={() => downloadReport("csv")}
                  disabled={downloading}
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {reportData?.details?.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(reportData.details[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key === "value"
                            ? "Revenue"
                            : key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.details.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.entries(row).map(([key, value]) => (
                          <td
                            key={key}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {key === "date"
                              ? new Date(value).toLocaleDateString()
                              : typeof value === "number"
                              ? key === "value"
                                ? `₹${value.toLocaleString()}`
                                : value.toLocaleString()
                              : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-gray-500 px-6 py-4">
                  No report data available for this period.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;

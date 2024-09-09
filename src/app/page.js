'use client';
import { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import DataTable from './components/DataTable'; // Adjust if needed
import ProgressBar from './components/ProgressBar'; // Adjust if needed
import Navbar from './components/Navbar'; // Adjust if needed

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

export default function CRMStats() {
  const [timeWindow, setTimeWindow] = useState('1 day');
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/dummyData.json');
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, [timeWindow]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!data) return <div className={`text-center py-8 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Loading...</div>;

  const pieData = {
    labels: data.salesByRegion.map((d) => d.region),
    datasets: [
      {
        label: 'Sales by Region',
        data: data.salesByRegion.map((d) => d.sales),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: data.salesOverTime.map((d) => d.period),
    datasets: [
      {
        label: 'Sales Over Time',
        data: data.salesOverTime.map((d) => d.sales),
        backgroundColor: '#4CAF50',
      },
    ],
  };

  const lineData = {
    labels: data.revenueTrends.map((d) => d.period),
    datasets: [
      {
        label: 'Revenue Trends',
        data: data.revenueTrends.map((d) => d.revenue),
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        fill: true,
      },
    ],
  };

  // Example data for the DataTable component
  const tableData = [
    ['North America', '450', 'Jan', '12000'],
    ['Europe', '300', 'Feb', '15000'],
    ['Asia', '200', 'Mar', '20000'],
  ];

  const tableColumns = ['Region', 'Sales', 'Month', 'Revenue'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="p-6">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <label htmlFor="timeWindow" className={`mr-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Time Window:</label>
          <select
            id="timeWindow"
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'}`}
          >
            <option value="1 day">1 Day</option>
            <option value="1 week">1 Week</option>
            <option value="1 month">1 Month</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Leads" value="1250"  />
          <StatCard title="Total Sales" value="950" />
          <StatCard title="Total Revenue" value="$78,500"  />
        </div>

        <div className={`bg-white shadow-lg rounded-lg p-4 mb-8 w-full lg:w-1/2 mx-auto ? 'border-gray-600 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? ' bg-gray-800 text-gray-100' : ' bg-white text-gray-800'}`}>Sales by Region</h2>
          <div className="relative h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className={`bg-white shadow-lg rounded-lg p-4 mb-8 w-full lg:w-1/2 mx-auto ${darkMode ? 'bg-gray-800 text-gray-100' : 'text-gray-800'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? ' bg-gray-800 text-gray-100' : ' bg-white text-gray-800'}`}>Sales Over Time</h2>
          <div className="relative h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className={`bg-white shadow-lg rounded-lg p-4 mb-8 w-full lg:w-1/2 mx-auto ${darkMode ? 'bg-gray-800 text-gray-100' : 'text-gray-800'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? ' bg-gray-800 text-gray-100' : ' bg-white text-gray-800'}`}>Revenue Trends</h2>
          <div className="relative h-64">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className={`bg-white shadow-lg rounded-lg p-4 mb-8 w-full lg:w-2/3 mx-auto ${darkMode ? 'bg-gray-800 text-gray-100' : 'text-gray-800'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? ' bg-gray-800 text-gray-100' : ' bg-white text-gray-800'}`}>Detailed Data Table</h2>
          <DataTable columns={tableColumns} data={tableData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProgressBar title="Monthly Sales Target" value={400} max={500} />
          <ProgressBar title="Annual Revenue Goal" value={30000} max={40000} />
          <ProgressBar title="Customer Acquisition" value={800} max={1000} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, darkMode }) {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center ${darkMode ? 'bg-gray-800 text-gray-100' : 'text-gray-800'}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

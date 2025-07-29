// src/components/Dashboard.jsx
import React from "react";
import Calendar from "./Calendar";
import { FaDollarSign, FaChartLine, FaUsers, FaShoppingCart } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const kpiData = [
  { label: "Sales", value: 1200, icon: <FaChartLine />, color: "from-pink-500 to-yellow-400" },
  { label: "Revenue", value: 54000, icon: <FaDollarSign />, color: "from-green-400 to-blue-500" },
  { label: "Customers", value: 320, icon: <FaUsers />, color: "from-purple-500 to-indigo-400" },
  { label: "Orders", value: 210, icon: <FaShoppingCart />, color: "from-orange-400 to-pink-500" },
];

const lineData = [
  { name: "Jan", Sales: 400, Revenue: 2400 },
  { name: "Feb", Sales: 300, Revenue: 2210 },
  { name: "Mar", Sales: 200, Revenue: 2290 },
  { name: "Apr", Sales: 278, Revenue: 2000 },
  { name: "May", Sales: 189, Revenue: 2181 },
  { name: "Jun", Sales: 239, Revenue: 2500 },
  { name: "Jul", Sales: 349, Revenue: 2100 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Groceries", value: 300 },
  { name: "Books", value: 200 },
];
const pieColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Top Section: Calendar & KPI Cards */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar */}
        <div className="md:w-1/3 w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between">
          <h2 className="text-lg font-bold mb-2 text-blue-600">Calendar</h2>
          <Calendar />
        </div>
        {/* KPI Cards */}
        <div className="md:w-2/3 w-full grid grid-cols-2 gap-4">
          {kpiData.map((kpi, idx) => (
            <div
              key={kpi.label}
              className={`bg-gradient-to-br ${kpi.color} text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-transform hover:scale-105`}
            >
              <div className="text-3xl mb-2">{kpi.icon}</div>
              <div className="text-2xl font-bold">{kpi.value.toLocaleString()}</div>
              <div className="text-md mt-1 font-semibold tracking-wide uppercase">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Section: Charts */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 min-w-0">
          <h2 className="text-lg font-bold mb-4 text-pink-600">Sales & Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Sales" stroke="#FF6384" strokeWidth={3} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Revenue" stroke="#36A2EB" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 min-w-0">
          <h2 className="text-lg font-bold mb-4 text-green-600">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

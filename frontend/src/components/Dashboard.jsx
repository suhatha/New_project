// src/components/Dashboard.jsx
import React from "react";
import Calendar from "./Calendar";
import { FaTools, FaCar, FaUserCog, FaCalendarCheck, FaCarCrash, FaOilCan, FaTint, FaCarBattery } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const kpiData = [
  { label: "Active Services", value: 8, icon: <FaTools />, color: "from-indigo-600 to-blue-500" },
  { label: "Vehicles Serviced", value: 124, icon: <FaCar />, color: "from-emerald-600 to-teal-500" },
  { label: "New Customers", value: 32, icon: <FaUserCog />, color: "from-amber-600 to-yellow-500" },
  { label: "Upcoming Appointments", value: 15, icon: <FaCalendarCheck />, color: "from-rose-600 to-pink-500" },
];

const lineData = [
  { name: "Mon", Services: 12, Revenue: 4200 },
  { name: "Tue", Services: 18, Revenue: 5800 },
  { name: "Wed", Services: 15, Revenue: 5100 },
  { name: "Thu", Services: 20, Revenue: 6800 },
  { name: "Fri", Services: 25, Revenue: 8100 },
  { name: "Sat", Services: 30, Revenue: 9500 },
  { name: "Sun", Services: 8, Revenue: 2800 },
];

const serviceTypeData = [
  { name: "Maintenance", value: 45 },
  { name: "Repair", value: 30 },
  { name: "Inspection", value: 15 },
  { name: "Emergency", value: 10 },
];

const serviceStatusData = [
  { name: "In Progress", value: 8, color: "bg-yellow-400" },
  { name: "Completed", value: 24, color: "bg-green-500" },
  { name: "Waiting for Parts", value: 5, color: "bg-blue-500" },
  { name: "Awaiting Approval", value: 3, color: "bg-orange-400" },
];

const serviceTypeColors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Top Section: Calendar & KPI Cards */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar */}
        <div className="md:w-1/3 w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-blue-600">Service Calendar</h2>
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
              + New Booking
            </button>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <Calendar />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Today's Appointments</h3>
            <div className="space-y-2">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <FaCar className="text-blue-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Service #{100 + item}</p>
                    <p className="text-xs text-gray-500">10:{item === 1 ? '00' : '30'} AM - {item === 1 ? '12:00' : '12:30'} PM</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    {item === 1 ? 'In Progress' : 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
        {/* Service Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 min-w-0">
          <h2 className="text-lg font-bold mb-4 text-blue-600">Weekly Service Trend</h2>
          <div className="text-sm text-gray-500 mb-4">Services completed and revenue generated this week</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value, name) => [name === 'Services' ? `${value} services` : `$${value.toLocaleString()}`, name === 'Services' ? 'Services' : 'Revenue']}
                labelStyle={{ color: '#111827', fontWeight: 'bold' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Services" 
                stroke="#4F46E5" 
                strokeWidth={3} 
                activeDot={{ r: 8, fill: '#4F46E5' }}
                name="Services Completed"
              />
              <Line 
                type="monotone" 
                dataKey="Revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Service Type Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 min-w-0">
          <h2 className="text-lg font-bold mb-4 text-green-600">Service Type Distribution</h2>
          <div className="text-sm text-gray-500 mb-4">Breakdown of service types this month</div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={serviceTypeColors[index % serviceTypeColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} services`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4">
              <h3 className="font-semibold text-gray-700 mb-3">Service Status</h3>
              <div className="space-y-3">
                {serviceStatusData.map((status, index) => (
                  <div key={status.name} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${status.color} mr-2`}></div>
                    <span className="text-sm text-gray-600 flex-1">{status.name}</span>
                    <span className="text-sm font-medium">{status.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <FaCarCrash className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Urgent Service Required</p>
                    <p className="text-xs text-gray-500">3 vehicles need immediate attention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

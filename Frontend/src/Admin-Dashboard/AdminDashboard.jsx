import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Card({ children, className }) {
  return (
    <div className={`bg-gray-900 shadow-md rounded-lg border border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={`text-white ${className}`}>{children}</div>;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // const pieData = {
  //   labels: ["Accepted", "Wrong Answer", "Time Limit Exceeded"],
  //   datasets: [
  //     {
  //       label: "Submissions",
  //       data: [16, 8, 5],
  //       backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
  //     },
  //   ],
  // };

 const barData = {
  labels: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  datasets: [
    {
      label: "Submissions",
      data: [420, 380, 500, 450, 610, 700, 650, 480, 520, 600, 550, 670], // example values
      backgroundColor: "#3b82f6",
    },
  ],
};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-6 mt-0 md:ml-64">
        
        {/* Stat Cards */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-blue-400 font-bold text-xl">20</div>
              <p className="text-sm text-gray-300">Total Problems</p>
              <p className="text-xs text-blue-500 mt-2">+5 added this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-green-400 font-bold text-xl">38</div>
              <p className="text-sm text-gray-300">Total Submissions</p>
              <p className="text-xs text-green-500 mt-2">+1.4% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-yellow-400 font-bold text-xl">6</div>
              <p className="text-sm text-gray-300">Active Contests</p>
              <p className="text-xs text-yellow-500 mt-2">2 scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-purple-400 font-bold text-xl">80</div>
              <p className="text-sm text-gray-300">Registered Users</p>
              <p className="text-xs text-purple-500 mt-2">+8.2% growth</p>
            </CardContent>
          </Card>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-4 text-white">Weekly Submissions</h2>
              <Bar data={barData} />
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-4 text-white">Submission Status</h2>
              <Pie data={pieData} />
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  );
}

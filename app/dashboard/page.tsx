"use client";

import { Card } from "@/components/ui/card";
import { getAllEvents } from "@/lib/actions/event.actions";
import { getAllFreeOrders } from "@/lib/actions/freeorder.actions";
import { getAllTeachers } from "@/lib/actions/teacher.actions";
import { getAllOrders } from "@/lib/actions/order.actions";
import { useEffect, useState } from "react";
import {
  Clipboard,
  FileText,
  Calendar,
  Gift,
  Users,
  HelpCircle,
} from "lucide-react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { getAllBookings } from "@/lib/actions/booking.actions";
import { getAllQna } from "@/lib/actions/qna.actions";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [freeOrders, setFreeOrders] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [qna, setQna] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          communityServiceData,
          eventsData,
          freeOrdersData,
          teachersData,
          ordersData,
          qnaData,
        ] = await Promise.all([
          getAllBookings(),
          getAllEvents({ query: "", category: "", page: 1, limit: 10 }),
          getAllFreeOrders(),
          getAllTeachers(),
          getAllOrders(),
          getAllQna(),
        ]);

        setBookings(communityServiceData);
        setEvents(eventsData?.data || []);
        setFreeOrders(freeOrdersData);
        setTeachers(teachersData);
        setOrders(ordersData);
        setQna(qnaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const labels = [
    "Qna",
    "Orders",
    "Events",
    "Free Orders",
    "Quran Class Bookings",
    "Teachers",
  ];

  const datasetValues = [
    qna.length,
    orders.length,
    events.length,
    freeOrders.length,
    bookings.length,
    teachers.length,
  ];

  const pieData = {
    labels,
    datasets: [
      {
        data: datasetValues,
        backgroundColor: [
          "#1E90FF",
          "#28A745",
          "#6F42C1",
          "#FFC107",
          "#FD7E14",
          "#6610F2",
          "#20C997",
        ],
        hoverBackgroundColor: [
          "#007BFF",
          "#218838",
          "#5A32A1",
          "#E0A800",
          "#E45900",
          "#520DC2",
          "#138B6A",
        ],
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Data Overview",
        data: datasetValues,
        backgroundColor: [
          "#1E90FF",
          "#28A745",
          "#6F42C1",
          "#FFC107",
          "#FD7E14",
          "#6610F2",
          "#20C997",
        ],
        borderColor: [
          "#007BFF",
          "#218838",
          "#5A32A1",
          "#E0A800",
          "#E45900",
          "#520DC2",
          "#138B6A",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard
          icon={<Clipboard className="text-3xl text-blue-500" />}
          title="Total Qna"
          value={qna.length}
        />

        <DashboardCard
          icon={<Calendar className="text-3xl text-purple-500" />}
          title="Upcoming Events"
          value={`${events.length}`}
        />
        <DashboardCard
          icon={<FileText className="text-3xl text-green-500" />}
          title="Paid Orders"
          value={orders.length}
        />
        <DashboardCard
          icon={<Gift className="text-3xl text-orange-500" />}
          title="Free Orders"
          value={`${freeOrders.length}`}
        />
        <DashboardCard
          icon={<Users className="text-3xl text-indigo-500" />}
          title="Quran Class Bookings"
          value={`${bookings.length}`}
        />
        <DashboardCard
          icon={<HelpCircle className="text-3xl text-teal-500" />}
          title="Teachers"
          value={`${teachers.length}`}
        />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Data Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <h3 className="text-lg font-medium mb-4">Bar Chart</h3>
            <Bar data={barData} />
          </div>
          <div className="w-full">
            <h3 className="text-lg font-medium mb-4">Pie Chart</h3>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const DashboardCard = ({ icon, title, value }: DashboardCardProps) => (
  <Card className="flex items-center border border-gray-300 shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
    <div className="text-7xl w-1/5 text-center">{icon}</div>
    <div className="flex-1 ml-4 space-y-2">
      <p className="text-lg font-semibold text-gray-600">{title}</p>
      <p className=" text-3xl font-bold">{value}</p>
    </div>
  </Card>
);

export default Dashboard;

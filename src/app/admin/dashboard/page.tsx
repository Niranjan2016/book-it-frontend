"use client";

import { DashboardLayout } from "@/app/admin/components/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </h1>
        {/* Add your dashboard content here */}
      </div>
    </DashboardLayout>
  );
}

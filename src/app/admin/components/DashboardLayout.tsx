"use client";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">{children}</main>
    </div>
  );
};

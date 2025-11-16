import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-3 border-r">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <Link className="block py-2 px-3 rounded hover:bg-gray-200" to="projects">
            Manage Projects
          </Link>
          <Link className="block py-2 px-3 rounded hover:bg-gray-200" to="faqs">
            Manage FAQs
          </Link>
          <Link className="block py-2 px-3 rounded hover:bg-gray-200" to="reviews">
            Manage Reviews
          </Link>
          <Link className="block py-2 px-3 rounded hover:bg-gray-200" to="slider">
            Manage Home Slider
          </Link>
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}

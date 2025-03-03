"use client";

import Link from "next/link";
// import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Book-It
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              Book-It is dedicated to making event booking simple and accessible
              for everyone. We connect event organizers with their audience,
              making it easy to discover, book, and attend amazing events in
              your area.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  For Event Goers
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Easy event discovery</li>
                  <li>Secure booking process</li>
                  <li>Event recommendations</li>
                  <li>Mobile-friendly experience</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  For Organizers
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Event management tools</li>
                  <li>Ticket sales tracking</li>
                  <li>Audience insights</li>
                  <li>Marketing support</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <div className="text-gray-600">
              <p>Have questions? We&apos;d love to hear from you.</p>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:contact@bookit.com"
                  className="text-pink-600 hover:text-pink-700"
                >
                  contact@bookit.com
                </a>
              </p>
              <p className="mt-1">
                Phone: <span className="text-gray-800">+1 (555) 123-4567</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

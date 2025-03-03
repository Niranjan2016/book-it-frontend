"use client";

import Link from "next/link";

export default function ContactPage() {
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

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-6">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                try {
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    body: JSON.stringify({
                      name: formData.get("name"),
                      email: formData.get("email"),
                      message: formData.get("message"),
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  if (response.ok) {
                    alert("Message sent successfully!");
                    e.currentTarget.reset();
                  } else {
                    alert("Failed to send message. Please try again.");
                  }
                } catch (error) {
                  console.log(error);
                  alert("An error occurred. Please try again.");
                }
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Send Message
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  Email:{" "}
                  <a
                    href="mailto:contact@bookit.com"
                    className="text-pink-600 hover:text-pink-700"
                  >
                    contact@bookit.com
                  </a>
                </p>
                <p className="text-gray-600">
                  Phone:{" "}
                  <span className="text-gray-800">+1 (555) 123-4567</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

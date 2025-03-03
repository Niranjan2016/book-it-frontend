"use client";

import Link from "next/link";

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Book-It, you accept and agree to be bound by the terms and 
                conditions outlined here. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Service</h2>
              <p className="text-gray-600">
                Book-It provides an event booking platform. Users must be at least 18 years old to create 
                an account. You are responsible for maintaining the confidentiality of your account information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Booking and Payments</h2>
              <p className="text-gray-600">
                All payments are processed securely. Refunds are subject to the individual event&apos;s 
                cancellation policy. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Privacy Policy</h2>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our Privacy Policy to understand how we 
                collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-600">
                Book-It is not responsible for any damages or losses resulting from your use of our service. 
                We make no warranties or representations about the accuracy of the information provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Continued use of the service after 
                changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
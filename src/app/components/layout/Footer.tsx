import Link from "next/link";

export const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="mb-4">© 2024 Event Booking. All rights reserved.</p>
      <div className="flex justify-center space-x-4">
        <Link href="/about" className="hover:text-gray-300">About</Link>
        <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        <Link href="/terms" className="hover:text-gray-300">Terms</Link>
      </div>
    </div>
  </footer>
);
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const { data: session, status } = useSession(); // Add status check
  const router = useRouter();

  const handleBookNowClick = () => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className="relative bg-gray-900 h-[600px]"
      style={{
        backgroundImage: 'url("/images/hero-bg.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Increase opacity of the overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Book Your Event
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover and book amazing events in your city
          </p>
          <button
            onClick={handleBookNowClick}
            className="bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            {status === "authenticated" ? "Go to Dashboard" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

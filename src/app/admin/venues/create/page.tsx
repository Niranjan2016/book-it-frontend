import VenueForm from "../components/VenueForm";

export default function CreateVenuePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 text-black">
      <div className="container mx-auto px-4 max-w-8xl">
        <h1 className="text-2xl font-bold mb-6">Create New Venue</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <VenueForm />
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-2xl font-bold text-pink-600">
        <span className="text-gray-800">Book</span>
        <span className="text-pink-600">It</span>
      </div>
      <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-bold">!</span>
      </div>
    </div>
  );
};

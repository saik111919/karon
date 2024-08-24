const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-transparent border-t-purple-600 border-b-purple-600 rounded-full animate-spin-slow"></div>
        <div className="absolute w-12 h-12 border-t-4 border-b-4 border-transparent border-t-purple-400 border-b-purple-400 rounded-full animate-spin"></div>
        <div className="absolute w-4 h-4 bg-purple-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;

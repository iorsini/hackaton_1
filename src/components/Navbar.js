export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-honey-primary via-honey-amber to-honey-primary border-b-4 border-honey-dark sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            {/* Honeycomb Logo */}
            <div className="relative">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 border-honey-brown transform hover:rotate-12 transition-transform">
                <div className="flex items-center justify-center w-16 h-16">
                  <img
                    src="/logo.png"
                    alt="Honeycomb logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                Colmeia Comunitária
              </span>
              <p className="text-xs text-honey-cream font-medium">
                Sistema de Reservas
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-[#E69500] font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Honeycomb pattern decoration */}
      <div className="h-1 bg-gradient-to-r from-transparent via-honey-brown to-transparent opacity-50"></div>
    </nav>
  );
}

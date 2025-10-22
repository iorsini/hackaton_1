import { Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Calendar className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Espaço Comunitário
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-primary-500 font-medium transition">
              Minhas Reservas
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-500 font-medium transition">
              Ajuda
            </a>
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition font-medium">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
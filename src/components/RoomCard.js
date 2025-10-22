import { MapPin, Users, Wifi, Monitor, Coffee } from "lucide-react";
import Image from "next/image";

export default function RoomCard({ room, onReserve }) {
  const getResourceIcon = (resource) => {
    const icons = {
      wifi: Wifi,
      projetor: Monitor,
      projector: Monitor,
      coffee: Coffee,
    };
    const Icon = icons[resource.toLowerCase()] || Monitor;
    return <Icon size={16} />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
        {room.image ? (
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="text-primary-500" size={48} />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-gray-900 flex items-center gap-1">
            {room.capacity} <Users size={14} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-2">
          {room.description}
        </p>

        {/* Resources */}
        {room.resources && room.resources.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {room.resources.map((resource, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {getResourceIcon(resource)}
                {resource}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          <button
            onClick={onReserve}
            className="w-full bg-[#E69500] text-white py-3 rounded-xl hover:bg-[#cc7f00] transition font-semibold shadow-sm hover:shadow-md"
          >
            Reservar Agora
          </button>
        </div>
      </div>
    </div>
  );
}

import { MapPin, Users, Wifi, Monitor, Coffee } from "lucide-react";

const RESOURCE_ICONS = {
  wifi: Wifi,
  projetor: Monitor,
  projector: Monitor,
  coffee: Coffee,
};

const ResourceIcon = ({ resource }) => {
  const Icon = RESOURCE_ICONS[resource.toLowerCase()] || Monitor;
  return <Icon size={16} />;
};

export default function RoomCard({ room, onReserve }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-[#FFEACC] to-[#FFD966]">
        {room.image ? (
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="text-[#FFB947]" size={48} />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-2.5 py-1.5 rounded-full shadow-md">
          <span className="text-xs sm:text-sm text-gray-700 flex items-center gap-1">
            <span className="font-medium hidden sm:inline">Capacidade:</span>
            <span className="font-semibold text-gray-900">{room.capacity}</span>
            <Users size={14} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {room.name}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow line-clamp-2">
          {room.description}
        </p>

        {/* Resources */}
        {room.resources?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {room.resources.map((resource, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
              >
                <ResourceIcon resource={resource} />
                <span className="hidden sm:inline">{resource}</span>
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onReserve}
          className="w-full bg-[#4a3329] text-white py-2.5 sm:py-3 rounded-xl hover:bg-[#6B4A38] transition-all duration-300 font-semibold shadow-sm hover:shadow-md text-sm sm:text-base active:scale-95"
        >
          Reservar Agora
        </button>
      </div>
    </div>
  );
}
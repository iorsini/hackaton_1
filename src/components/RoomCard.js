import { MapPin, Users, Wifi, Monitor, Coffee } from 'lucide-react';
import Image from 'next/image';

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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
        {room.image ? (
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="text-primary-500" size={48} />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-gray-900">
            {room.capacity} <Users className="inline" size={14} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

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
        <button
          onClick={onReserve}
          className="w-full bg-primary-500 text-white py-3 rounded-xl hover:bg-primary-600 transition font-semibold shadow-sm hover:shadow-md"
        >
          Reservar Agora
        </button>
      </div>
    </div>
  );
}
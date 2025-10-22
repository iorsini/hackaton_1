import { useState } from 'react';
import { X, Calendar, Clock, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';

export default function ReservationModal({ room, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    selectedResources: []
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          room: room._id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        alert(data.error || 'Erro ao criar reserva');
      }
    } catch (error) {
      alert('Erro ao criar reserva');
    } finally {
      setLoading(false);
    }
  };

  const toggleResource = (resource) => {
    setFormData(prev => ({
      ...prev,
      selectedResources: prev.selectedResources.includes(resource)
        ? prev.selectedResources.filter(r => r !== resource)
        : [...prev.selectedResources, resource]
    }));
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-scale-in">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Reserva Confirmada!
          </h3>
          <p className="text-gray-600">
            Você receberá um email de confirmação em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Reservar {room.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User size={16} />
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                required
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} />
                Data
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} />
                Início
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} />
                Fim
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Resources */}
          {room.resources && room.resources.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Recursos Necessários
              </label>
              <div className="flex flex-wrap gap-2">
                {room.resources.map((resource, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleResource(resource)}
                    className={`px-4 py-2 rounded-xl border-2 transition ${
                      formData.selectedResources.includes(resource)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                    }`}
                  >
                    {resource}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purpose */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageSquare size={16} />
              Finalidade da Reserva
            </label>
            <textarea
              required
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              placeholder="Descreva brevemente o propósito da reserva..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 text-white py-4 rounded-xl hover:bg-primary-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Processando...' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>
    </div>
  );
}
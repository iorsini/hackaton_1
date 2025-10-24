import { useState } from "react";
import {
  X,
  Calendar,
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  Users,
} from "lucide-react";

const SuccessModal = ({ email }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center animate-scale-in">
      <div className="bg-green-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-green-500" size={window.innerWidth < 640 ? 40 : 48} />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        🐝 Reserva Confirmada!
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        Sua reserva foi realizada com sucesso!
      </p>
      <div className="bg-[#FFF8E7] border-2 border-[#FFB94F] rounded-lg p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-700">
          📧 <strong>Email de confirmação enviado!</strong>
        </p>
        <p className="text-xs text-gray-600 mt-2 break-all">
          Verifique sua caixa de entrada em <strong>{email}</strong>
        </p>
      </div>
    </div>
  </div>
);

const InputField = ({ icon: Icon, label, children }) => (
  <div>
    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2">
      <Icon size={16} />
      {label}
    </label>
    {children}
  </div>
);

export default function ReservationModal({ room, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    date: "",
    purpose: "",
    selectedResources: [],
    numberOfPeople: 1,
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [capacityError, setCapacityError] = useState("");

  const handleNumberOfPeopleChange = (value) => {
    const numPeople = parseInt(value) || 1;
    setFormData({ ...formData, numberOfPeople: numPeople });

    if (numPeople > room.capacity) {
      setCapacityError(
        `⚠️ Esta sala suporta no máximo ${room.capacity} pessoas`
      );
    } else {
      setCapacityError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.numberOfPeople > room.capacity) {
      alert(
        `Esta sala suporta no máximo ${room.capacity} pessoas. Por favor, escolha outra sala ou reduza o número de pessoas.`
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/salas/${room._id}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          room: room._id,
        }),
      });

      const result = await response.json();

      if (result.success || response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 3000);
      } else {
        alert(result.error || "Erro ao criar reserva");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao criar reserva. Tente novamente.");
      setLoading(false);
    }
  };

  const toggleResource = (resource) => {
    setFormData((prev) => ({
      ...prev,
      selectedResources: prev.selectedResources.includes(resource)
        ? prev.selectedResources.filter((r) => r !== resource)
        : [...prev.selectedResources, resource],
    }));
  };

  if (showSuccess) {
    return <SuccessModal email={formData.userEmail} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-start p-4 sm:p-6 border-b border-gray-200">
          <div className="flex-1 pr-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Reservar {room.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Capacidade máxima: {room.capacity} pessoas
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <InputField icon={User} label="Nome Completo">
              <input
                type="text"
                required
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB94F] focus:border-transparent outline-none text-sm sm:text-base"
                placeholder="Seu nome"
              />
            </InputField>

            <InputField icon={Mail} label="Email">
              <input
                type="email"
                required
                value={formData.userEmail}
                onChange={(e) =>
                  setFormData({ ...formData, userEmail: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB94F] focus:border-transparent outline-none text-sm sm:text-base"
                placeholder="seu@email.com"
              />
            </InputField>
          </div>

          {/* Number of People */}
          <InputField icon={Users} label="Número de Pessoas">
            <input
              type="number"
              required
              min="1"
              max={room.capacity}
              value={formData.numberOfPeople}
              onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:border-transparent outline-none text-sm sm:text-base ${
                capacityError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#FFB94F]"
              }`}
              placeholder="Quantas pessoas?"
            />
            {capacityError && (
              <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">
                {capacityError}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Esta sala suporta até {room.capacity} pessoas
            </p>
          </InputField>

          {/* Date */}
          <InputField icon={Calendar} label="Data da Reserva">
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB94F] focus:border-transparent outline-none text-sm sm:text-base"
            />
            <p className="text-xs sm:text-sm text-[#FFB94F] mt-2 flex items-center gap-1 font-semibold">
              🕐 A sala será reservada para o dia completo
            </p>
          </InputField>

          {/* Resources */}
          {room.resources?.length > 0 && (
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-3 block">
                Recursos e Itens Necessários
              </label>
              <div className="flex flex-wrap gap-2">
                {room.resources.map((resource, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleResource(resource)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-2 transition text-xs sm:text-sm ${
                      formData.selectedResources.includes(resource)
                        ? "border-[#FFB94F] bg-[#FFF8E7] text-[#0C0C0C] font-bold"
                        : "border-gray-300 bg-white text-gray-700 hover:border-[#FFB94F]"
                    }`}
                  >
                    {resource}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purpose */}
          <InputField icon={MessageSquare} label="Finalidade da Reserva">
            <textarea
              required
              value={formData.purpose}
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB94F] focus:border-transparent outline-none resize-none text-sm sm:text-base"
              placeholder="Descreva brevemente o propósito da reserva..."
            />
          </InputField>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !!capacityError}
            className="w-full bg-[#4a3329] text-white py-2.5 sm:py-3 rounded-xl hover:bg-[#6B4A38] transition-all duration-300 font-semibold shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base active:scale-95"
          >
            {loading ? "🐝 Processando..." : "✨ Confirmar Reserva"}
          </button>
        </form>
      </div>
    </div>
  );
}
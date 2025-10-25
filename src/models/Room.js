import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor forneça um nome para a sala'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Por favor forneça uma descrição'],
    },
    capacity: {
      type: Number,
      required: [true, 'Por favor forneça a capacidade'],
      min: 1,
    },
    resources: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 CORREÇÃO para Vercel: Use padrão correto para evitar recompilação
export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
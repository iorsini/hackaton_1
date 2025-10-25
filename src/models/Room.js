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

// 🔥 CORREÇÃO: Deletar modelo existente antes de criar
delete mongoose.models.Room;
delete mongoose.models.Sala;

export default mongoose.model('Room', RoomSchema);
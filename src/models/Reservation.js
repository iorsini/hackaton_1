import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    userName: {
      type: String,
      required: [true, 'Nome do usuário é obrigatório'],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, 'Email é obrigatório'],
      trim: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: [true, 'Data é obrigatória'],
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'Número de pessoas é obrigatório'],
      min: 1,
    },
    purpose: {
      type: String,
      required: [true, 'Finalidade é obrigatória'],
      trim: true,
    },
    selectedResources: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Index para buscar reservas por sala e data
ReservationSchema.index({ room: 1, date: 1 });
ReservationSchema.index({ status: 1 });

export default mongoose.models.Reservation ||
  mongoose.model('Reservation', ReservationSchema);
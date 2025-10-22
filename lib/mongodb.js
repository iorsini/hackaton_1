// /lib/mongodb.js
{/*
Esse bloco de código é um módulo de conexão com o banco de dados MongoDB usando o Mongoose, 
feito de forma inteligente e eficiente, especialmente para aplicações Next.js ou Node.js 
com recarregamento automático (como em ambiente de desenvolvimento).  
*/}
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor defina MONGODB_URI no .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
// /src/pages/api/auth/register.js
{/*Esse bloco de código é uma API route do Next.js responsável por registrar (cadastrar) um novo usuário no banco de dados MongoDB.
*/}
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb'; // CAMINHO CORRETO!
import User from '../../../../models/User'; // CAMINHO CORRETO!

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, password } = req.body;

    // Validações
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Verificar se user já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash da password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
# 🐝 HONEYCOMB

<div align="center">
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1+-green?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 🎯 Sobre o Projeto

**Honeycomb** é um sistema completo de gestão de reservas para espaços comunitários, coworkings e salas de reunião. Inspirado na organização perfeita de uma colmeia, oferece uma experiência visual única com design hexagonal temático! 🐝

### 🌟 Diferenciais

- 🎨 **Design Único** - Interface inspirada em favos de mel
- 🌊 **Animações Suaves** - Abelhas flutuantes e transições elegantes  
- 📱 **100% Responsivo** - Funciona perfeitamente em qualquer dispositivo
- ⚡ **Performance Otimizada** - Next.js + Express para máxima velocidade
- 🔒 **Validações Inteligentes** - Previne conflitos de reservas automaticamente
- 🎯 **UX Intuitiva** - Processo de reserva em poucos cliques

---

## ✨ Features

### 👥 Para Usuários

#### 🏢 Gestão de Salas
- 🔍 Busca inteligente por nome/descrição
- 📊 Visualização detalhada de capacidade
- 🎨 Cards animados
- 📦 Lista completa de recursos disponíveis

#### 📅 Sistema de Reservas
- 📆 Reserva de dia completo
- 👥 Definição de capacidade das salas
- 🎯 Seleção de recursos necessários
- ✉️ Confirmação visual instantânea

#### 🎨 Interface
- 🍯 Tema mel e colmeia
- 🐝 Abelhas animadas no background
- 💫 Stats em hexágonos 3D
- 🌈 Gradientes dourados personalizados

#### ✅ Validações
- ⚠️ Alerta de capacidade excedida
- 🚫 Bloqueio de datas já reservadas
- ✓ Verificação de dados em tempo real
- 📧 Validação de email

### 🔧 Para Administradores

#### 📊 Dashboard Completo
- 📈 Estatísticas em hexágonos 3D
- 📋 Lista de todas as reservas ativas
- 🏢 Status em tempo real de cada sala
- 📅 Calendário visual interativo

#### 🛠️ Controle Total
- ❌ Cancelamento de reservas
- 📦 Visualização de recursos solicitados
- 👥 Detalhes de cada reserva
- 🗓️ Navegação por mês no calendário

---

## 📦 Instalação

### 📋 Pré-requisitos

```bash
Node.js 18+
MongoDB Atlas (ou local)
npm ou yarn
Git
```

### 🛠️ Passo a Passo

**1️⃣ Clone o repositório**
```bash
git clone https://github.com/seu-usuario/honeycomb.git
cd honeycomb
```

**2️⃣ Instale as dependências**
```bash
npm install
```

**3️⃣ Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/honeycomb?retryWrites=true&w=majority
NODE_ENV=development
PORT=3000
```

**4️⃣ (Opcional) Popule o banco com dados de exemplo**
```bash
npm run seed
```

**5️⃣ Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

**6️⃣ Abra no navegador**
```
http://localhost:3000
```

🎉 **Pronto!** O Honeycomb está funcionando!

---

## 🏗️ Estrutura do Projeto

```
honeycomb/
├── public/
│   └── images/
│       ├── logoHoneycomb.svg
│       └── rooms/
├── src/
│   ├── app/
│   │   ├── page.js              # Página principal (usuário)
│   │   ├── admin/
│   │   │   └── page.jsx         # Dashboard admin
│   │   ├── globals.css          # Estilos globais + tema mel
│   │   └── layout.js            # Layout base
│   ├── components/
│   │   ├── Navbar.js            # Barra de navegação
│   │   ├── RoomCard.js          # Card de sala
│   │   └── ReservationModal.js  # Modal de reserva
│   ├── models/
│   │   ├── Room.js              # Schema de salas
│   │   └── Reservation.js       # Schema de reservas
│   ├── services/
│   │   └── api.js               # Cliente HTTP
│   └── lib/
│       ├── db.js                # Conexão MongoDB
│       └── mail.js              # Sistema de emails
├── server.js                    # Servidor Express + Next.js
├── package.json
├── tailwind.config.js
└── .env
```

---

## 🔧 API Endpoints

### 🏢 Salas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/salas` | Lista todas as salas | ❌ |
| `GET` | `/api/salas/:id` | Detalhes de uma sala | ❌ |
| `POST` | `/api/salas` | Criar nova sala | ✅ |
| `GET` | `/api/salas/:id/bookings` | Reservas de uma sala | ❌ |
| `GET` | `/api/salas/:id/available-dates` | Datas indisponíveis | ❌ |

### 📅 Reservas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/bookings` | Todas as reservas ativas | ✅ |
| `POST` | `/api/salas/:id/booking` | Criar reserva | ❌ |
| `DELETE` | `/api/bookings/:id` | Cancelar reserva | ✅ |

### 📝 Exemplos de Uso

**Buscar todas as salas**
```javascript
GET /api/salas

// Response (200 OK)
[
  {
    "_id": "67890abc",
    "name": "Auditório",
    "description": "Grande espaço para eventos...",
    "capacity": 50,
    "resources": ["Projetor", "Sistema de Som", "Microfones"],
    "image": "/images/rooms/auditorio.png",
    "location": "Piso Térreo",
    "isActive": true
  }
]
```

**Criar uma reserva**
```javascript
POST /api/salas/67890abc/booking
Content-Type: application/json

{
  "userName": "João Silva",
  "userEmail": "joao@email.com",
  "date": "2025-10-25",
  "numberOfPeople": 5,
  "purpose": "Reunião de equipe",
  "selectedResources": ["Projetor", "WiFi"]
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "_id": "12345xyz",
    "room": { /* dados da sala */ },
    "userName": "João Silva",
    "userEmail": "joao@email.com",
    "date": "2025-10-25T00:00:00.000Z",
    "numberOfPeople": 5,
    "purpose": "Reunião de equipe",
    "selectedResources": ["Projetor", "WiFi"],
    "status": "active"
  }
}
```

---

## 🗄️ Banco de Dados

### 📊 Schemas MongoDB

**Room (Sala)**
```javascript
{
  name: String,              // Nome da sala
  description: String,       // Descrição detalhada
  capacity: Number,          // Número máximo de pessoas
  resources: [String],       // ["Projetor", "WiFi", ...]
  image: String,             // URL da imagem
  location: String,          // Localização física
  isActive: Boolean,         // Se está disponível
  createdAt: Date,
  updatedAt: Date
}
```

**Reservation (Reserva)**
```javascript
{
  room: ObjectId,            // Referência à sala
  userName: String,          // Nome do usuário
  userEmail: String,         // Email do usuário
  date: Date,                // Data da reserva (dia completo)
  numberOfPeople: Number,    // Quantidade de pessoas
  purpose: String,           // Finalidade da reserva
  selectedResources: [String], // Recursos solicitados
  status: String,            // "active" ou "cancelled"
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Customização

### 🌈 Tema de Cores

Edite `src/app/globals.css`:

```css
:root {
  --honey-primary: #FFB947;   /* Dourado principal */
  --honey-dark: #E69500;      /* Dourado escuro */
  --honey-light: #FFEACC;     /* Mel claro */
  --honey-cream: #FFF8E7;     /* Creme */
  --honey-brown: #8B6914;     /* Marrom mel */
}
```

### 🐝 Abelhas Animadas

Ajuste em `src/app/page.js`:

```javascript
// Número de abelhas
const bees = Array.from({ length: 15 }) // Altere para mais/menos

// Velocidade
animationDuration: `${(Math.random() * 4 + 4).toFixed(1)}s` // 4-8s
```

---

## 📜 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento (Express + Next.js)
npm run build        # Build de produção
npm start            # Servidor de produção
npm run seed         # Popular banco de dados
npm run lint         # Verificar código
```

---

## 🛠️ Stack Tecnológica

**Core**
- [Next.js 14](https://nextjs.org/) - Framework React
- [Express 5.1](https://expressjs.com/) - Servidor HTTP
- [React 18](https://react.dev/) - Biblioteca UI
- [MongoDB Atlas](https://www.mongodb.com/) - Banco NoSQL

**UI/UX**
- [Tailwind CSS 3.4](https://tailwindcss.com/) - Framework CSS
- [Lucide React](https://lucide.dev/) - Ícones modernos
- Custom CSS Animations - Animações personalizadas

**Dados**
- [Mongoose 8.19](https://mongoosejs.com/) - ODM MongoDB
- [CORS](https://github.com/expressjs/cors) - Controle de requisições

---

## 🚀 Deploy

### 🌐 Vercel (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente:
```
MONGODB_URI=sua-string-mongodb-atlas
NODE_ENV=production
```
3. Deploy automático! 🎉

### 🐳 Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t honeycomb .
docker run -p 3000:3000 --env-file .env honeycomb
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! 🐝

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Commit: `git commit -m 'Adiciona MinhaFeature'`
4. Push: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

**Ideias para contribuir:**
- 🌍 Adicionar mais idiomas
- 📊 Dashboard com gráficos
- 🔔 Sistema de notificações
- 📸 Upload de fotos
- ⭐ Sistema de avaliações
- 🗓️ Google Calendar

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

<div align="center">

### ⭐ Se você gostou, deixe uma estrela! ⭐

**Feito com 🍯 e muito 💛 pela equipa Honeycomb**

![Bee Animation](https://img.shields.io/badge/🐝-Buzzing-FFB94F?style=for-the-badge)

</div>

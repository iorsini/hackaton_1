# 🐝 HONEYCOMB

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=nextdotjs&logoColor=white"/>
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white"/>
  </a>
</p>

<p align="center">
  <strong>Sistema completo de gestão de reservas para espaços comunitários e coworkings</strong>
</p>

<p align="center">
  🎨 Design Hexagonal • 🐝 Animações Fluidas • 📱 100% Responsivo
</p>

---

## 📖 Índice

- [Sobre](#-sobre-o-projeto)
- [Features](#-features)
- [Instalação](#-instalação)
- [Estrutura](#-estrutura-do-projeto)
- [API](#-api-endpoints)
- [Tecnologias](#-tecnologias)
- [Deploy](#-deploy)
- [Contribuir](#-contribuindo)

---

## 🎯 Sobre o Projeto

O **Honeycomb** é um sistema de reservas inspirado na organização perfeita de uma colmeia. Com design temático em mel e hexágonos, oferece uma experiência visual única e intuitiva para gerenciar espaços compartilhados.

### 🌟 Diferenciais

| Feature | Descrição |
|---------|-----------|
| 🎨 **Design Único** | Interface hexagonal inspirada em favos de mel |
| 🌊 **Animações Suaves** | Abelhas flutuantes e transições elegantes |
| 📱 **Responsivo** | Adaptado para mobile, tablet e desktop |
| ⚡ **Performance** | Next.js 14 com App Router otimizado |
| 🔒 **Validações** | Sistema inteligente anti-conflitos |
| 🎯 **UX Intuitiva** | Reserva em poucos cliques |

---

## ✨ Features

### 👤 Área do Usuário

- 🔍 Busca em tempo real por nome/descrição
- 📊 Cards com informações de capacidade e recursos
- 📅 Calendário visual de disponibilidade
- 🎯 Seleção de recursos extras (projetor, WiFi, etc)
- ✅ Validação automática de capacidade
- 🐝 Confirmação instantânea com design temático

### 👨‍💼 Painel Admin

- 📈 Dashboard com estatísticas em hexágonos 3D
- 📋 Lista de todas as reservas ativas
- 🗓️ Calendário interativo com navegação por mês
- 👥 Detalhes completos de cada reserva
- ❌ Cancelamento de reservas
- 🏢 Status em tempo real de cada sala

---

## 📦 Instalação

### Pré-requisitos

```bash
Node.js >= 18.17.0
MongoDB Atlas ou local
npm ou yarn
```

### Setup Rápido

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/honeycomb.git
cd honeycomb

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais MongoDB

# 4. Inicie o servidor
npm run dev

# 5. Popule o banco (opcional)
# Acesse: http://localhost:3000/api/seed
```

### Variáveis de Ambiente

Crie `.env.local` na raiz:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/honeycomb
NODE_ENV=development
```

---

## 🏗️ Estrutura do Projeto

```
honeycomb/
│
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── page.js            # Página inicial
│   │   ├── layout.js          # Layout global
│   │   ├── globals.css        # Estilos globais
│   │   ├── admin/
│   │   │   └── page.jsx       # Dashboard admin
│   │   └── api/               # API Routes
│   │       ├── salas/         # Endpoints de salas
│   │       ├── bookings/      # Endpoints de reservas
│   │       └── seed/          # Popular DB
│   │
│   ├── components/            # Componentes React
│   │   ├── Navbar.js
│   │   ├── RoomCard.js
│   │   └── ReservationModal.js
│   │
│   ├── models/                # Schemas MongoDB
│   │   ├── Room.js
│   │   └── Reservation.js
│   │
│   ├── services/              # API Client
│   │   └── api.js
│   │
│   └── lib/                   # Utilitários
│       ├── db.js              # Conexão MongoDB
│       └── mail.js            # Sistema de emails
│
├── public/
│   └── images/
│       ├── logoHoneycomb.svg
│       └── rooms/
│
├── .env.local                 # Variáveis de ambiente
├── package.json
├── tailwind.config.js
└── next.config.js
```

---

## 🔧 API Endpoints

### Salas

```http
GET    /api/salas              # Lista todas as salas
GET    /api/salas/:id          # Detalhes de uma sala
POST   /api/salas              # Criar sala (admin)
POST   /api/salas/:id/booking  # Criar reserva
```

### Reservas

```http
GET    /api/bookings           # Lista reservas ativas (admin)
DELETE /api/bookings/:id       # Cancelar reserva (admin)
```

### Seed

```http
GET    /api/seed               # Popular banco com exemplos
DELETE /api/seed               # Limpar banco
```

### Exemplo: Criar Reserva

**Request:**
```http
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
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "12345xyz",
    "room": {
      "name": "Sala de Reuniões",
      "capacity": 12
    },
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

## 🗄️ Schemas MongoDB

### Room
```javascript
{
  name: String,              // Nome da sala
  description: String,       // Descrição
  capacity: Number,          // Capacidade máxima
  resources: [String],       // Recursos disponíveis
  image: String,             // URL da imagem
  location: String,          // Localização física
  isActive: Boolean,         // Status
  createdAt: Date,
  updatedAt: Date
}
```

### Reservation
```javascript
{
  room: ObjectId,            // Referência à sala
  userName: String,          // Nome do usuário
  userEmail: String,         // Email
  date: Date,                // Data (dia completo)
  numberOfPeople: Number,    // Qtd pessoas
  purpose: String,           // Finalidade
  selectedResources: [String], // Recursos extras
  status: String,            // "active" | "cancelled"
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ Tecnologias

| Categoria | Tecnologias |
|-----------|------------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Banco de Dados** | MongoDB Atlas, Mongoose |
| **UI** | Lucide React, Custom Animations |
| **Deploy** | Vercel |

---

## 📜 Scripts

```bash
npm run dev      # Desenvolvimento (http://localhost:3000)
npm run build    # Build de produção
npm start        # Inicia servidor de produção
npm run lint     # Verifica código
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure variável de ambiente:
   ```
   MONGODB_URI=sua-connection-string
   ```
3. Deploy automático! 🎉

### MongoDB Atlas

1. Crie conta em [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster
3. Adicione IP à whitelist (`0.0.0.0/0` para todos)
4. Crie usuário do banco
5. Copie connection string para `.env.local`

---

## 🎨 Customização

### Cores do Tema

Edite `src/app/globals.css`:

```css
:root {
  --honey-primary: #FFB947;
  --honey-dark: #E69500;
  --honey-light: #FFEACC;
  --honey-cream: #FFF8E7;
  --honey-brown: #8B6914;
}
```

### Animações

Ajuste em `src/app/page.js`:

```javascript
// Número de abelhas
const bees = Array.from({ length: 15 })

// Velocidade da animação
animationDuration: `${(Math.random() * 4 + 4)}s`
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! 

1. Fork o projeto
2. Crie sua feature: `git checkout -b feature/NovaFeature`
3. Commit: `git commit -m 'Add: Nova feature'`
4. Push: `git push origin feature/NovaFeature`
5. Abra um Pull Request

### Ideias de Contribuição

- [ ] 🌍 Suporte multi-idioma
- [ ] 📊 Dashboard com gráficos
- [ ] 🔔 Notificações em tempo real
- [ ] 📸 Upload de imagens
- [ ] ⭐ Sistema de avaliações
- [ ] 🗓️ Integração Google Calendar
- [ ] 🔐 Autenticação JWT
- [ ] 📧 Sistema de emails real

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| **Erro MongoDB** | Verifique connection string e whitelist de IPs |
| **Salas não aparecem** | Acesse `/api/seed` para popular o banco |
| **Build falha** | Execute `npm install` novamente |
| **Porta em uso** | Altere porta com `PORT=3001 npm run dev` |

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

<div align="center">

### 🐝 Feito com 🍯 e muito 💛

**[⭐ Star no GitHub](https://github.com/seu-usuario/honeycomb)** • **[🐛 Reportar Bug](https://github.com/seu-usuario/honeycomb/issues)** • **[💡 Sugerir Feature](https://github.com/seu-usuario/honeycomb/issues)**

![Bee](https://img.shields.io/badge/🐝-Buzzing-FFB94F?style=for-the-badge)

</div>

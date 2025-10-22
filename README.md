# 🎬 MOVIELIST

<div align="center">

![MovieList](https://img.shields.io/badge/MOVIELIST-Your_Personal_Cinema-e50914?style=for-the-badge&logo=film&logoColor=white)

**A sleek, modern movie tracking app with multi-user authentication**

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-Authentication-purple?style=flat-square&logo=auth0&logoColor=white)](https://next-auth.js.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)

[Live Demo](https://movie-watchlist-app-cu4r.vercel.app/)

---

</div>

## 📖 About

**MovieList** is a beautiful, Netflix-inspired movie tracking application that lets you organize your personal cinema collection. Track what you've watched, create your watchlist, rate movies, and discover your top-rated films - all with a stunning dark UI that feels like home.

Perfect for movie enthusiasts who want a clean, personal space to curate their film journey.

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎭 Core Features
- ✅ **Personal Movie Library** - Add, edit, and delete movies with ease
- 📊 **Watch Status Tracking** - Mark movies as watched or add them to your watchlist
- ⭐ **Star Rating System** - Rate your movies from 1-10 stars
- 🔍 **Smart Filtering** - View all movies, watched only, unwatched, or top-rated
- 🔐 **User Authentication** - Secure login/register system with encrypted passwords
- 🌍 **Multi-language Support** - Full support for English and Portuguese 🇬🇧🇵🇹

</td>
<td width="50%">

### 🎨 UI/UX Highlights
- 🎬 **Netflix-inspired Design** - Sleek dark theme with smooth animations
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- 🧭 **Intuitive Navigation** - Tab-based interface for quick access
- ➕ **Floating Action Button** - Quick movie addition from anywhere
- ⚡ **Real-time Updates** - Instant feedback on all actions
- ⚙️ **Settings Panel** - Customize language and manage account

</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 16+
MongoDB (local or Atlas)
npm or yarn
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/movielist.git
cd movielist
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/movielist
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movielist

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-generate-with-openssl
```

> 💡 **Generate a secure NEXTAUTH_SECRET:**
> ```bash
> openssl rand -base64 32
> ```

**4. Run the development server**
```bash
npm run dev
```

**5. Open your browser**
```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="33%">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</td>
<td align="center" width="33%">

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

</td>
<td align="center" width="33%">

### Security
![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=auth0&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![bcrypt](https://img.shields.io/badge/bcrypt-338033?style=for-the-badge)

</td>
</tr>
</table>

## 📁 Project Structure

```
movielist/
├── 📂 lib/
│   └── mongodb.js              # MongoDB connection with caching
├── 📂 models/
│   ├── Movie.js                # Movie schema
│   └── User.js                 # User schema
├── 📂 src/
│   ├── 📂 components/
│   │   ├── AddMovie.jsx        # Add movie form
│   │   ├── AllMovies.jsx       # All movies grid
│   │   ├── EditMovie.jsx       # Edit movie form
│   │   ├── WatchedMovies.jsx   # Watched movies view
│   │   ├── NotWatchedMovies.jsx # Watchlist view
│   │   ├── MoviesByRating.jsx  # Top rated ranking
│   │   └── StarRating.jsx      # Rating component
│   ├── 📂 pages/
│   │   ├── 📂 api/
│   │   │   ├── 📂 auth/
│   │   │   │   ├── [...nextauth].js  # NextAuth config
│   │   │   │   ├── register.js       # User registration
│   │   │   │   └── delete-account.js # Account deletion
│   │   │   └── 📂 movies/
│   │   │       ├── index.js          # GET/POST movies
│   │   │       └── [id].js           # PUT/DELETE movie
│   │   ├── index.jsx           # Main dashboard
│   │   ├── login.jsx           # Login page
│   │   └── register.jsx        # Registration page
│   ├── 📂 services/
│   │   └── api.js              # API client functions
│   └── 📂 utils/
│       └── translations.js     # i18n translations
└── 📄 package.json
```

## 🔌 API Routes

### 🔐 Authentication

<table>
<tr>
<th>Endpoint</th>
<th>Method</th>
<th>Description</th>
<th>Auth Required</th>
</tr>
<tr>
<td><code>/api/auth/register</code></td>
<td><code>POST</code></td>
<td>Register a new user</td>
<td>❌</td>
</tr>
<tr>
<td><code>/api/auth/signin</code></td>
<td><code>POST</code></td>
<td>Login user (NextAuth)</td>
<td>❌</td>
</tr>
<tr>
<td><code>/api/auth/delete-account</code></td>
<td><code>DELETE</code></td>
<td>Delete user & all movies</td>
<td>✅</td>
</tr>
</table>

#### Register User Example
```json
POST /api/auth/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

### 🎬 Movies

<table>
<tr>
<th>Endpoint</th>
<th>Method</th>
<th>Description</th>
<th>Auth Required</th>
</tr>
<tr>
<td><code>/api/movies</code></td>
<td><code>GET</code></td>
<td>Get all user's movies</td>
<td>✅</td>
</tr>
<tr>
<td><code>/api/movies</code></td>
<td><code>POST</code></td>
<td>Create new movie</td>
<td>✅</td>
</tr>
<tr>
<td><code>/api/movies/[id]</code></td>
<td><code>PUT</code></td>
<td>Update movie</td>
<td>✅</td>
</tr>
<tr>
<td><code>/api/movies/[id]</code></td>
<td><code>DELETE</code></td>
<td>Delete movie</td>
<td>✅</td>
</tr>
</table>

#### Create Movie Example
```json
POST /api/movies

{
  "title": "Inception",
  "year": 2010,
  "genre": "Sci-Fi",
  "watched": true,
  "rating": 9
}
```

## 🌍 Internationalization

MovieList supports **2 languages**:

| Language | Code | Status |
|----------|------|--------|
| 🇬🇧 English | `en` | ✅ Default |
| 🇵🇹 Portuguese | `pt` | ✅ Complete |

### Adding More Languages

Edit `src/utils/translations.js`:

```javascript
export const translations = {
  en: { /* English translations */ },
  pt: { /* Portuguese translations */ },
  es: { /* Add Spanish */ },
  fr: { /* Add French */ }
};
```

## 🎨 Customization

### Color Theme

The app uses Netflix-inspired colors. Main brand color: `#e50914`

**To change colors**, edit the CSS in component files:

```css
/* Primary gradient */
background: linear-gradient(135deg, #e50914 0%, #c20812 100%);

/* Accent color */
color: #e50914;
border-color: #e50914;
```

### Database Schema

**Movie Model:**
```javascript
{
  title: String (required),
  year: Number (required),
  genre: String (required),
  watched: Boolean (default: false),
  rating: Number (1-10, optional),
  userId: ObjectId (required),
  createdAt: Date (auto)
}
```

**User Model:**
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date (auto)
}
```

## 🔧 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | ✅ | MongoDB connection string | `mongodb://localhost:27017/movielist` |
| `NEXTAUTH_URL` | ✅ | Application URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ✅ | Secret for JWT signing | Generate with `openssl rand -base64 32` |

## 🔒 Security Features

- 🔐 **Password Hashing** - bcrypt with salt rounds
- 🎫 **JWT Sessions** - Secure token-based authentication
- 👤 **User Isolation** - Each user only sees their own data
- 🛡️ **Protected Routes** - All API endpoints require authentication
- 🚫 **SQL Injection Prevention** - MongoDB NoSQL with Mongoose sanitization

## 🤝 Contributing

Contributions are **welcome**! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 💾 Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. 📤 Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🔀 Open a Pull Request

### Contribution Ideas

- 🎨 New themes (light mode, custom colors)
- 🌐 Additional language translations
- 📊 Statistics dashboard
- 🔍 Movie search with external API (TMDB, OMDb)
- 🖼️ Movie poster uploads
- 📱 Mobile app version
- 🎯 Movie recommendations algorithm

## 📋 Roadmap

- [ ] Movie poster integration (TMDB API)
- [ ] Advanced search and filters
- [ ] Export/Import movie lists
- [ ] Social features (share lists)
- [ ] Statistics dashboard
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Movie trailer embeds

## 🐛 Known Issues

None at the moment! 🎉

Found a bug? [Open an issue](https://github.com/yourusername/movielist/issues)

## 📝 License

This project is open source and available under the **MIT License**.

```
MIT License

Copyright (c) 2024 MovieList

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 🙏 Acknowledgments

- 🎬 Design inspired by **Netflix**
- 🔐 Authentication powered by **NextAuth.js**
- 🗄️ Database by **MongoDB**
- ⚛️ Built with **React** and **Next.js**
- 💚 Built with love for movie enthusiasts

## 📧 Contact

**Questions? Issues? Suggestions?**

- **GitHub Issues** - [Report bugs or request features](https://github.com/iorsini/movie_watchlist_app/issues)
- **LinkedIn** - [@isadora-barradas](https://www.linkedin.com/in/isadora-barradas/)

---

<div align="center">

### ⭐ Star this repo if you like it! ⭐

**Made with ❤️ and 🎬 by movie lovers, for movie lovers**

</div>

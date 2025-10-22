// /src/pages/register.jsx
{/*Esse bloco de código é a página de registro (sign up) da aplicação Next.js.
*/}
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const translations = {
  en: {
    title: 'Create Account',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    signUp: 'Sign Up',
    creatingAccount: 'Creating account...',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Min. 6 characters',
  },
  pt: {
    title: 'Criar Conta',
    name: 'Nome',
    email: 'Email',
    password: 'Password',
    signUp: 'Criar Conta',
    creatingAccount: 'A criar conta...',
    haveAccount: 'Já tens conta?',
    signIn: 'Entrar',
    namePlaceholder: 'O teu nome',
    emailPlaceholder: 'teu@email.com',
    passwordPlaceholder: 'Mín. 6 caracteres',
  }
};

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('movielist-language') || 'en';
    setLanguage(savedLang);
  }, []);

  const t = translations[language];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('movielist-language', lang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #0a0a0a;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom, #141414 0%, #0a0a0a 100%);
          padding: 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 450px;
          background: rgba(255, 255, 255, 0.05);
          padding: 48px 40px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
        }

        .language-selector {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .lang-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lang-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .lang-btn.active {
          background: rgba(229, 9, 20, 0.2);
          border-color: #e50914;
          color: #e50914;
        }

        .auth-logo {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        .auth-title {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 32px;
          color: #fff;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #b3b3b3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #e50914;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);
        }

        .error-message {
          background: rgba(229, 9, 20, 0.15);
          border: 1px solid rgba(229, 9, 20, 0.3);
          color: #ff6b6b;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }

        .btn-auth {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #e50914 0%, #c20812 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-auth:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(229, 9, 20, 0.4);
        }

        .btn-auth:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .auth-footer {
          text-align: center;
          margin-top: 24px;
          color: #999;
          font-size: 14px;
        }

        .auth-footer a {
          color: #e50914;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .auth-footer a:hover {
          color: #ff6b6b;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <div className="language-selector">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('pt')}
            >
              PT
            </button>
          </div>

          <div className="auth-logo">🎬 MOVIELIST</div>
          <h1 className="auth-title">{t.title}</h1>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t.name}</label>
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>{t.email}</label>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>{t.password}</label>
              <input
                type="password"
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? t.creatingAccount : t.signUp}
            </button>
          </form>

          <div className="auth-footer">
            {t.haveAccount} <Link href="/login">{t.signIn}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
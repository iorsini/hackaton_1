// Opcional: Configuração para envio de emails
// Pode usar Nodemailer, SendGrid, Resend, etc.

export async function sendReservationEmail({ to, reservation, room }) {
  const emailData = {
    to,
    subject: `Confirmação de Reserva - ${room.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFF8E7; padding: 20px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100" style="margin: 0 auto;">
            <ellipse cx="50" cy="15" rx="20" ry="8" fill="#FFB94F" stroke="#FFF" stroke-width="2"/>
            <ellipse cx="50" cy="28" rx="28" ry="10" fill="#FFB94F" stroke="#FFF" stroke-width="2"/>
            <ellipse cx="50" cy="43" rx="35" ry="11" fill="#e5a740" stroke="#FFF" stroke-width="2"/>
            <ellipse cx="50" cy="58" rx="38" ry="12" fill="#FFB94F" stroke="#FFF" stroke-width="2"/>
            <ellipse cx="50" cy="58" rx="6" ry="8" fill="#0C0C0C"/>
          </svg>
          <h2 style="color: #0C0C0C; margin: 10px 0;">🐝 Reserva Confirmada!</h2>
        </div>
        
        <p style="color: #0C0C0C; font-size: 16px;">Olá <strong>${reservation.userName}</strong>,</p>
        <p style="color: #0C0C0C; font-size: 16px;">Sua reserva foi confirmada com sucesso na Honeycomb!</p>
        
        <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #FFB94F;">
          <h3 style="margin-top: 0; color: #0C0C0C; border-bottom: 2px solid #FFB94F; padding-bottom: 10px;">📋 Detalhes da Reserva</h3>
          
          <table style="width: 100%; color: #0C0C0C;">
            <tr>
              <td style="padding: 8px 0;"><strong>🏢 Sala:</strong></td>
              <td style="padding: 8px 0;">${room.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>📅 Data:</strong></td>
              <td style="padding: 8px 0;">${new Date(reservation.date).toLocaleDateString('pt-PT', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>🕐 Período:</strong></td>
              <td style="padding: 8px 0;"><span style="background-color: #FFE0A3; padding: 4px 8px; border-radius: 4px; font-weight: bold;">Dia Completo</span></td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>👥 Pessoas:</strong></td>
              <td style="padding: 8px 0;">${reservation.numberOfPeople} pessoa${reservation.numberOfPeople > 1 ? 's' : ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>🎯 Finalidade:</strong></td>
              <td style="padding: 8px 0;">${reservation.purpose}</td>
            </tr>
            ${reservation.selectedResources && reservation.selectedResources.length > 0 
              ? `<tr>
                  <td style="padding: 8px 0; vertical-align: top;"><strong>📦 Recursos:</strong></td>
                  <td style="padding: 8px 0;">${reservation.selectedResources.join(', ')}</td>
                </tr>` 
              : ''
            }
          </table>
        </div>
        
        <div style="background-color: #E8F5E9; padding: 15px; border-radius: 8px; border-left: 4px solid #48C957; margin: 20px 0;">
          <p style="margin: 0; color: #0C0C0C;">
            <strong>✅ Dica:</strong> A sala estará disponível para você durante todo o dia reservado. 
            Certifique-se de deixar o espaço organizado após o uso!
          </p>
        </div>
        
        <p style="color: #0C0C0C; font-size: 14px;">Se precisar cancelar ou alterar sua reserva, entre em contato conosco o mais breve possível.</p>
        
        <p style="color: #0C0C0C; font-size: 16px; margin-top: 30px;">
          Obrigado por usar a Honeycomb! 🍯
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #FFB94F;">
          <p style="color: #8B4513; font-size: 12px; margin: 5px 0;">
            🐝 Honeycomb - Sistema de Reservas
          </p>
          <p style="color: #8B4513; font-size: 12px; margin: 5px 0;">
            Feito com muito mel pela equipe Colmeia
          </p>
        </div>
      </div>
    `,
  };

  console.log('📧 Email enviado:', emailData);
  
  // Para implementar com serviço real, descomente e configure:
  /*
  // Exemplo com Nodemailer:
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.html,
  });
  */

  return true;
}
// Opcional: Configuração para envio de emails
// Pode usar Nodemailer, SendGrid, Resend, etc.

export async function sendReservationEmail({ to, reservation, room }) {
  // Exemplo usando console.log para desenvolvimento
  // Substitua por serviço real (SendGrid, Resend, Nodemailer, etc.)
  
  const emailData = {
    to,
    subject: `Confirmação de Reserva - ${room.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Reserva Confirmada!</h2>
        <p>Olá ${reservation.userName},</p>
        <p>Sua reserva foi confirmada com sucesso.</p>
        
        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detalhes da Reserva</h3>
          <p><strong>Sala:</strong> ${room.name}</p>
          <p><strong>Data:</strong> ${new Date(reservation.date).toLocaleDateString('pt-PT')}</p>
          <p><strong>Horário:</strong> ${reservation.startTime} - ${reservation.endTime}</p>
          <p><strong>Finalidade:</strong> ${reservation.purpose}</p>
          ${reservation.selectedResources.length > 0 
            ? `<p><strong>Recursos/Itens:</strong> ${reservation.selectedResources.join(', ')}</p>` 
            : ''
          }
        </div>
        
        <p>Se precisar cancelar ou alterar sua reserva, entre em contato conosco.</p>
        <p>Obrigado por usar nosso sistema!</p>
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
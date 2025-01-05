import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (to: string, resetLink: string) => {
  const mailOptions = {
    from: '"Barba Club" <barba.club.barbearia.2010@gmail.com>', // Remetente
    to, // Destinatário
    subject: "Recuperação de Senha",
    html: `
      <p>Olá,</p>
      <p>Você solicitou a redefinição de sua senha. Clique no link abaixo para redefinir:</p>
      <a href="${resetLink}">Redefinir senha</a>
      <p>Se você não solicitou isso, ignore este e-mail.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Archivo: ser.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'madelinemejia196@gmail.com', // tu correo electrónico
    pass: 'zjtf yfkh pzyc cmta' // tu contraseña de aplicación, asegúrate de que sea correcta y segura
  }
});

app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: 'madelinemejia196@gmail.com', // tu correo electrónico
    to: email,
    subject: '',
    text: `
      Has recibido un nuevo mensaje:
      
      ${message}
      
      ------------------------------
      Gracias por ponerte en contacto con nosotros. En un momento atenderemos tu petición.
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Correo enviado con éxito' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error enviando el correo' });
  }
});

app.listen(3000, () => {
  console.log('Servidor funcionando en el puerto 3000');
});

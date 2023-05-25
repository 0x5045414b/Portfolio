import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import nodemailer from "nodemailer";

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, message } = await request.json();

  const senderEmail = Bun.env.SENDER_EMAIL;
  const senderPassword = Bun.env.SENDER_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    auth: {
      user: senderEmail,
      pass: "",
    },
  });

  const thankYou = await transporter.sendMail({
    from: `Dan Peak <${senderEmail}>`,
    to: email,
    subject: "Thank you for contacting me",
    html: `<p>Hello, ${name}. I appreciate your message and will try get back to you as soon as possible.</p>`,
  });

  const info = await transporter.sendMail({
    from: `Portfolio <${senderEmail}>`,
    to: senderEmail,
    subject: "Contact Form Filled",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  });

  return json({
    you: {
      messageId: thankYou.messageId,
      previewURL: nodemailer.getTestMessageUrl(thankYou),
    },
    me: {
      messageId: info.messageId,
      previewURL: nodemailer.getTestMessageUrl(info),
    },
  });
};

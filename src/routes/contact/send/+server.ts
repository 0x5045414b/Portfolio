import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import nodemailer from "nodemailer";
import { env } from "$env/dynamic/private";

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    auth: {
      user: env.SENDER_EMAIL,
      pass: env.SENDER_PASSWORD,
    },
  });

  const thankYou = await transporter.sendMail({
    from: `Dan Peak <${env.SENDER_EMAIL}>`,
    to: email,
    subject: "Thank you for contacting me",
    html: `<p>Hello, ${name}. I appreciate your message and will try get back to you as soon as possible.</p>`,
  });

  const info = await transporter.sendMail({
    from: `Portfolio <${env.SENDER_EMAIL}>`,
    to: env.SENDER_EMAIL,
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

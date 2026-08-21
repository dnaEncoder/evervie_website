import nodemailer from "nodemailer";

const MODE_LABELS = {
  element: "a live page element",
  copy: "a copy block",
};

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
}

function fromAddress() {
  const name = process.env.EMAIL_FROM_NAME || "Evervie";
  const address = process.env.EMAIL_FROM_ADDRESS;
  return address ? `"${name}" <${address}>` : undefined;
}

export async function sendMagicLinkEmail({ email, link }) {
  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: email,
      subject: "Your Evervie feedback login link",
      text: `Click the link below to log in to the Evervie feedback tool. This link expires in 15 minutes and can only be used once.\n\n${link}\n\nIf you didn't request this, you can ignore this email.`,
      html: `<p>Click the link below to log in to the Evervie feedback tool.</p><p><a href="${link}">${link}</a></p><p>This link expires in 15 minutes and can only be used once. If you didn't request this, you can ignore this email.</p>`,
    });
  } catch (err) {
    console.error("feedback: failed to send magic-link email (check SMTP config)", err);
  }
}

export async function sendNewCommentNotification({ comment, frontendUrl }) {
  const notifyEmail = process.env.FEEDBACK_NOTIFY_EMAIL || "m.suhas@novastudioshq.com";
  const link =
    comment.mode === "copy" ? `${frontendUrl}/feedback/copy` : `${frontendUrl}${comment.pagePath}`;

  const contextLines = [
    `Page: ${comment.pageLabel || comment.pagePath} (${comment.pagePath})`,
    `Type: ${MODE_LABELS[comment.mode] || comment.mode}`,
    comment.elementLabel ? `Section: ${comment.elementLabel}` : null,
    comment.textSnapshot ? `Referring to: "${comment.textSnapshot}"` : null,
    `From: ${comment.reviewerEmail}`,
  ].filter(Boolean);

  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: notifyEmail,
      subject: `New feedback on ${comment.pageLabel || comment.pagePath}`,
      text: `${contextLines.join("\n")}\n\nRequested change:\n${comment.note}\n\nView: ${link}`,
      html: `<p>${contextLines.join("<br/>")}</p><p><strong>Requested change:</strong><br/>${comment.note}</p><p><a href="${link}">${link}</a></p>`,
    });
  } catch (err) {
    console.error("feedback: failed to send comment notification email (check SMTP config)", err);
  }
}

export async function sendNewLeadNotification({ lead }) {
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL || process.env.FEEDBACK_NOTIFY_EMAIL || "m.suhas@novastudioshq.com";

  const contextLines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Organization: ${lead.company}` : null,
    `Document: ${lead.documentTitle} (${lead.documentCategory})`,
  ].filter(Boolean);

  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: notifyEmail,
      subject: `New investor download lead: ${lead.documentTitle}`,
      text: contextLines.join("\n"),
      html: `<p>${contextLines.join("<br/>")}</p>`,
    });
  } catch (err) {
    console.error("leads: failed to send new lead notification email (check SMTP config)", err);
  }
}

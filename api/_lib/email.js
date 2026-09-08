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

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendCareerApplicationEmails({ application }) {
  const talentEmail = process.env.CAREERS_NOTIFY_EMAIL || "talent@everviehealth.com";
  const name = escapeHtml(application.name);
  const email = escapeHtml(application.email);
  const role = escapeHtml(application.role);
  const rawMessage = application.message || "";
  const messageHtml = escapeHtml(rawMessage).replace(/\n/g, "<br>");
  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const talentSubject = `New Career Application: ${application.name}${application.role ? ` — ${application.role}` : ""}`;
  
  const talentHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Career Application - Evervie Health</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f2ee; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f4f2ee; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #eae7e2;">
          <tr>
            <td style="background-color: #111111; padding: 28px 36px; border-bottom: 3px solid #ff3c00;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.05em; color: #ffffff; text-transform: uppercase;">
                      EVERVIE <span style="color: #ff3c00;">HEALTH</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 700; color: #ff3c00; background-color: rgba(255,60,0,0.15); padding: 5px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.08em;">
                      Talent Portal
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 36px 28px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px 0; line-height: 1.3;">
                New Candidate Application
              </h1>
              <p style="font-size: 15px; line-height: 1.6; color: #555555; margin: 0 0 24px 0;">
                A candidate has submitted their profile through the <strong>Evervie Careers portal</strong>.
              </p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #faf9f6; border-radius: 12px; border: 1px solid #eeebe6; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="35%" style="font-size: 13px; font-weight: 600; color: #777777; padding-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Applicant Name</td>
                        <td width="65%" style="font-size: 15px; font-weight: 700; color: #1a1a1a; padding-bottom: 12px;">${name}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; font-weight: 600; color: #777777; padding-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email Address</td>
                        <td style="font-size: 15px; font-weight: 600; color: #ff3c00; padding-bottom: 12px;">
                          <a href="mailto:${email}" style="color: #ff3c00; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; font-weight: 600; color: #777777; padding-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Role / Interest</td>
                        <td style="font-size: 15px; font-weight: 600; color: #1a1a1a; padding-bottom: 12px;">${role || "General Inquiry"}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; font-weight: 600; color: #777777; text-transform: uppercase; letter-spacing: 0.05em;">Submitted On</td>
                        <td style="font-size: 14px; color: #555555;">${dateString}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ${messageHtml ? `
              <h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #777777; margin: 0 0 10px 0;">
                Candidate Message
              </h2>
              <div style="background-color: #ffffff; border-left: 4px solid #ff3c00; padding: 18px 20px; border-radius: 0 8px 8px 0; border: 1px solid #f0eee9; border-left-width: 4px; font-size: 14px; line-height: 1.65; color: #2a2a2a; margin-bottom: 28px;">
                ${messageHtml}
              </div>
              ` : ''}
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=RE:%20Evervie%20Health%20Careers%20Application" style="display: inline-block; background-color: #ff3c00; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 8px;">
                      Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #faf9f6; padding: 20px 36px; border-top: 1px solid #eeebe6; text-align: center;">
              <p style="font-size: 12px; color: #888888; margin: 0;">
                Evervie Health Careers Portal &bull; Automated Talent Notification
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const candidateSubject = `Application Received — Evervie Health`;

  const candidateHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - Evervie Health</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f2ee; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f4f2ee; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #eae7e2;">
          <tr>
            <td style="background-color: #111111; padding: 32px 36px; border-bottom: 3px solid #ff3c00; text-align: center;">
              <span style="font-size: 22px; font-weight: 800; letter-spacing: 0.06em; color: #ffffff; text-transform: uppercase;">
                EVERVIE <span style="color: #ff3c00;">HEALTH</span>
              </span>
              <p style="font-size: 12px; color: #aaaaaa; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">
                Specialty Care. Scaled With Purpose.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 36px 32px;">
              <div style="margin-bottom: 24px;">
                <span style="font-size: 12px; font-weight: 700; color: #ff3c00; text-transform: uppercase; letter-spacing: 0.08em; display: inline-block; margin-bottom: 8px;">
                  Confirmation of Receipt
                </span>
                <h1 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0; line-height: 1.3;">
                  We have received your message
                </h1>
              </div>

              <p style="font-size: 16px; line-height: 1.65; color: #333333; margin: 0 0 20px 0;">
                Dear <strong>${name}</strong>,
              </p>
              <p style="font-size: 15px; line-height: 1.7; color: #555555; margin: 0 0 24px 0;">
                Thank you for reaching out to <strong>Evervie Health</strong>. We are pleased to confirm that we have received your profile submission${role ? ` regarding <strong>${role}</strong>` : ''}.
              </p>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #faf9f6; border-radius: 12px; border: 1px solid #eeebe6; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #ff3c00; display: block; margin-bottom: 12px;">
                      Submission Overview
                    </span>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="35%" style="font-size: 13px; font-weight: 600; color: #777777; padding-bottom: 8px;">Candidate:</td>
                        <td width="65%" style="font-size: 14px; font-weight: 600; color: #1a1a1a; padding-bottom: 8px;">${name}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; font-weight: 600; color: #777777; padding-bottom: 8px;">Email:</td>
                        <td style="font-size: 14px; font-weight: 600; color: #1a1a1a; padding-bottom: 8px;">${email}</td>
                      </tr>
                      ${role ? `
                      <tr>
                        <td style="font-size: 13px; font-weight: 600; color: #777777; padding-bottom: 8px;">Role / Focus:</td>
                        <td style="font-size: 14px; font-weight: 600; color: #1a1a1a; padding-bottom: 8px;">${role}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="font-size: 13px; font-weight: 600; color: #777777;">Received On:</td>
                        <td style="font-size: 14px; color: #555555;">${dateString}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h2 style="font-size: 16px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px 0;">
                What happens next?
              </h2>
              <p style="font-size: 15px; line-height: 1.7; color: #555555; margin: 0 0 28px 0;">
                Our talent acquisition team carefully reviews every submission. We will contact you back directly at <strong>${email}</strong> once there is an update regarding your application.
              </p>

              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="https://everviehealth.com" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
                      Learn More About Evervie &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #faf9f6; padding: 32px 36px; border-top: 1px solid #eeebe6;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-size: 13px; font-weight: 700; color: #1a1a1a; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                    Evervie Health Limited
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 12px; line-height: 1.6; color: #777777;">
                    <strong>Registered Office:</strong> 9th Floor, KRM Center, Harrington Road, Chetpet, Chennai, Tamil Nadu – 600031<br>
                    <strong>Corporate Office:</strong> 4th Floor, Punnaiah Plaza, Plot No. 83 &amp; 84, Road No. 2, Banjara Hills, Hyderabad, Telangana – 500034<br>
                    <strong>Email:</strong> <a href="mailto:talent@everviehealth.com" style="color: #ff3c00; text-decoration: none;">talent@everviehealth.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; font-size: 11px; color: #aaaaaa; line-height: 1.5; border-top: 1px solid #eeebe6;">
                    This email was sent to ${email} in response to an inquiry on everviehealth.com. Please do not reply directly to this automated confirmation.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Send Email 1: Notification to talent@everviehealth.com
  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: talentEmail,
      subject: talentSubject,
      text: `New Career Application from ${application.name} (${application.email})\nRole: ${application.role || "General"}\nMessage: ${application.message || "—"}`,
      html: talentHtml,
    });
  } catch (err) {
    console.error("careers: failed to send talent notification email (check SMTP config)", err);
  }

  // Send Email 2: Confirmation to Applicant
  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: application.email,
      subject: candidateSubject,
      text: `Dear ${application.name},\n\nThank you for reaching out to Evervie Health. We have received your application and will contact you back directly once there is an update.\n\nBest regards,\nEvervie Health Team`,
      html: candidateHtml,
    });
  } catch (err) {
    console.error("careers: failed to send applicant confirmation email (check SMTP config)", err);
  }
}

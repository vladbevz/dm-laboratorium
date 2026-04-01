import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'dm.laboratorium.pl@gmail.com';
const FROM = process.env.RESEND_FROM || 'D&M Laboratorium <onboarding@resend.dev>';
const MAX_ATTACH_MB = 4;

// Escape user input before inserting into HTML email
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!req.body) return res.status(400).json({ error: 'Brak danych' });

  const { name, phone, email, message, attachments = [] } = req.body;

  // Guard against oversized attachments (base64 ≈ 1.33× binary)
  const totalBytes = attachments.reduce((s, a) => s + (a.content?.length ?? 0) * 0.75, 0);
  if (totalBytes > MAX_ATTACH_MB * 1024 * 1024) {
    return res.status(413).json({ error: `Łączny rozmiar załączników przekracza ${MAX_ATTACH_MB} MB` });
  }

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'Imię i telefon są wymagane' });
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `Nowa wiadomość od ${name} — D&M Laboratorium`,
      html: adminEmailHtml({ name, phone, email, message }),
      attachments: attachments.map(a => ({ filename: a.name, content: a.content })),
    });

    if (email?.trim()) {
      await resend.emails.send({
        from: FROM,
        to: email.trim(),
        subject: 'Twoja wiadomość została odebrana — D&M Laboratorium',
        html: clientEmailHtml({ name }),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Błąd wysyłania wiadomości' });
  }
}

/* ── EMAIL TEMPLATES ─────────────────────────────────────── */

function adminEmailHtml({ name, phone, email, message }) {
  const row = (label, value) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-family:Georgia,serif;font-size:13px;color:#888;width:120px;vertical-align:top;border-bottom:1px solid #f0ebe0;">${label}</td>
          <td style="padding:10px 16px;font-family:Georgia,serif;font-size:14px;color:#1a1208;border-bottom:1px solid #f0ebe0;">${value}</td>
         </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0d0304;padding:36px 40px;text-align:center;">
            <div style="font-family:Georgia,serif;font-size:28px;font-weight:600;color:#C9A84C;letter-spacing:6px;">D&amp;M</div>
            <div style="font-family:Georgia,serif;font-size:9px;font-weight:400;color:rgba(201,168,76,0.55);letter-spacing:7px;text-transform:uppercase;margin-top:6px;">Laboratorium</div>
            <div style="width:40px;height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:14px auto 0;"></div>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:32px 40px 8px;border-bottom:2px solid #C9A84C;">
            <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:#C9A84C;letter-spacing:4px;text-transform:uppercase;">Nowe zapytanie</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:22px;font-weight:300;color:#1a1208;">Wiadomość od klienta</h1>
          </td>
        </tr>

        <!-- Data -->
        <tr>
          <td style="padding:8px 24px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ebe0;border-radius:1px;overflow:hidden;">
              ${row('Imię', esc(name))}
              ${row('Telefon', `<a href="tel:${esc(phone)}" style="color:#C9A84C;text-decoration:none;">${esc(phone)}</a>`)}
              ${email ? row('Email', `<a href="mailto:${esc(email)}" style="color:#C9A84C;text-decoration:none;">${esc(email)}</a>`) : ''}
              ${message ? row('Wiadomość', esc(message).replace(/\n/g, '<br>')) : ''}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#faf6ef;padding:20px 40px;text-align:center;border-top:1px solid #f0ebe0;">
            <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:#aaa;">
              © ${new Date().getFullYear()} D&amp;M Laboratorium · Wojska Polskiego 148/1, Słubice
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function clientEmailHtml({ name }) {
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0d0304;padding:48px 40px;text-align:center;">
            <div style="font-family:Georgia,serif;font-size:32px;font-weight:600;color:#C9A84C;letter-spacing:8px;">D&amp;M</div>
            <div style="font-family:Georgia,serif;font-size:9px;font-weight:400;color:rgba(201,168,76,0.55);letter-spacing:8px;text-transform:uppercase;margin-top:8px;">Laboratorium</div>
            <div style="width:50px;height:1px;background:#C9A84C;margin:18px auto 0;opacity:0.4;"></div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:48px 48px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:11px;color:#C9A84C;letter-spacing:4px;text-transform:uppercase;">Potwierdzenie</p>
            <h1 style="margin:12px 0 24px;font-family:Georgia,serif;font-size:26px;font-weight:300;color:#1a1208;line-height:1.3;">
              Dziękujemy,<br><em style="font-style:italic;color:#C9A84C;">${esc(name)}</em>
            </h1>
            <div style="width:40px;height:1px;background:#C9A84C;margin:0 auto 28px;opacity:0.3;"></div>
            <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:16px;color:#555;line-height:1.8;font-weight:300;">
              Twoja wiadomość dotarła do nas i&nbsp;jest&nbsp;dla nas ważna.<br>
              Odpowiemy najszybciej jak to możliwe.
            </p>
            <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#888;line-height:1.8;">
              W razie pilnej sprawy zadzwoń bezpośrednio:<br>
              <a href="tel:+48577861595" style="color:#C9A84C;text-decoration:none;font-size:16px;">+48 577 861 595</a>
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 48px;">
            <div style="height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);opacity:0.2;"></div>
          </td>
        </tr>

        <!-- Values -->
        <tr>
          <td style="padding:32px 48px;text-align:center;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center;padding:0 12px;">
                  <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:11px;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;">Precyzja</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:#aaa;">CAD/CAM</p>
                </td>
                <td style="text-align:center;padding:0 12px;border-left:1px solid #f0ebe0;border-right:1px solid #f0ebe0;">
                  <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:11px;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;">Estetyka</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:#aaa;">Premium</p>
                </td>
                <td style="text-align:center;padding:0 12px;">
                  <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:11px;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;">Niezawodność</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:#aaa;">Terminowość</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0d0304;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:12px;color:rgba(245,238,220,0.35);">
              D&amp;M Laboratorium · Wojska Polskiego 148/1, Słubice
            </p>
            <a href="mailto:dm.laboratorium.pl@gmail.com" style="font-family:Georgia,serif;font-size:12px;color:rgba(201,168,76,0.6);text-decoration:none;">
              dm.laboratorium.pl@gmail.com
            </a>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

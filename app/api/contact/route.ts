import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const body = await request.json() as {
    name: string
    email: string
    company?: string
    projectType: string
    message: string
  }

  const { name, email, company, projectType, message } = body

  if (!name || !email || !projectType || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }
  if (message.trim().length < 20) {
    return NextResponse.json({ error: 'Message trop court' }, { status: 400 })
  }

  const projectTypeLabel: Record<string, string> = {
    'site-vitrine': 'Site vitrine',
    'e-commerce': 'E-commerce',
    reservation: 'Système de réservation',
    'systeme-interne': 'Système interne',
    autre: 'Autre',
  }

  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">Nouveau message de contact</h1>
        <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Portfolio mohamedcamara.ca</p>
      </div>
      <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 12px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Nom</span><br/>
              <span style="font-size: 16px; font-weight: 600; color: #1f2937;">${name}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 12px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Email</span><br/>
              <a href="mailto:${email}" style="font-size: 16px; font-weight: 600; color: #2563eb; text-decoration: none;">${email}</a>
            </td>
          </tr>
          ${
            company
              ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 12px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Entreprise</span><br/>
              <span style="font-size: 16px; font-weight: 600; color: #1f2937;">${company}</span>
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 12px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Type de projet</span><br/>
              <span style="font-size: 16px; font-weight: 600; color: #1f2937;">${projectTypeLabel[projectType] ?? projectType}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <span style="font-size: 12px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Message</span><br/>
              <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 8px 0 0; background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">${message.replace(/\n/g, '<br/>')}</p>
            </td>
          </tr>
        </table>
        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}" style="display: inline-block; background: #2563eb; color: white; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none;">
            Répondre à ${name}
          </a>
        </div>
      </div>
    </div>
  `

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL ?? 'contact@mohamedcamara.ca',
    replyTo: email,
    subject: `[Portfolio] Nouveau message de ${name} — ${projectTypeLabel[projectType] ?? projectType}`,
    html,
  })

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

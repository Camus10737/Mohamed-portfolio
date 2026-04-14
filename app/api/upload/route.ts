import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { verifySession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('image') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!validTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Format non supporté (JPEG, PNG, WebP, GIF)' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() ?? 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const uploadDir = path.join(process.cwd(), 'public', 'projects')

  await fs.mkdir(uploadDir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(path.join(uploadDir, fileName), buffer)

  return NextResponse.json({ url: `/projects/${fileName}` })
}

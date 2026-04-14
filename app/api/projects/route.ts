import { NextRequest, NextResponse } from 'next/server'
import { readProjects, writeProjects, Project } from '@/lib/projects'
import { verifySession } from '@/lib/auth'

function isAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('session')?.value
  if (!token) return Promise.resolve(false)
  return verifySession(token)
}

export async function GET(request: NextRequest) {
  const admin = await isAdmin(request)
  const projects = await readProjects()
  const result = admin ? projects : projects.filter((p) => p.visible)
  const sorted = result.sort((a, b) => a.order - b.order)
  return NextResponse.json(sorted)
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = await request.json() as Omit<Project, 'id' | 'createdAt'>
  const projects = await readProjects()
  const newProject: Project = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString().split('T')[0],
  }
  projects.push(newProject)
  await writeProjects(projects)
  return NextResponse.json(newProject, { status: 201 })
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = await request.json() as Project
  const projects = await readProjects()
  const index = projects.findIndex((p) => p.id === body.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 })
  }
  projects[index] = body
  await writeProjects(projects)
  return NextResponse.json(projects[index])
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
  }
  const projects = await readProjects()
  const filtered = projects.filter((p) => p.id !== id)
  if (filtered.length === projects.length) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 })
  }
  await writeProjects(filtered)
  return NextResponse.json({ success: true })
}

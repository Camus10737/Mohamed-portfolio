import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'projects.json')

export interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string
  longDescription: string
  stack: string[]
  image: string
  url: string
  featured: boolean
  visible: boolean
  order: number
  createdAt: string
}

export async function readProjects(): Promise<Project[]> {
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as Project[]
}

export async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf-8')
}

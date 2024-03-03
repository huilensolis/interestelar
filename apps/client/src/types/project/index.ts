import { type User } from '../user'

export interface Project {
  id: string
  name: string
  emoji: string
  columns: Column[]
  user: User
  tags: Tag[]
}

interface Column {
  id: string
  name: string
  emoji: string
  project: string
}

interface Tag {
  id: string
  tagName: string
  color: string
  project: string
}

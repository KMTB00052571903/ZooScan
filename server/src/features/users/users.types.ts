export interface UserProfile {
  id: string
  email: string
  name: string
  role: string
  stats: {
    scans_total: number
    favorites: number
    level: number
  }
}

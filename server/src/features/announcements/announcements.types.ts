export interface Announcement {
  id: string
  message: string
  staff_id: string | null
  animal_id: string | null
  created_at: string
}

export interface CreateAnnouncementDTO {
  message: string
  animal_id?: string | null
}

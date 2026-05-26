export interface Favorite {
  id: string
  user_id: string
  animal_id: string
  created_at: string
}

export interface CreateFavoriteDTO {
  animal_id: string
}

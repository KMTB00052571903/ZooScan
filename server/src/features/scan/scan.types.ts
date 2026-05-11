export interface Scan {
  id: string;
  visitor_id: string;
  animal_id: string;
  created_at: string;
}

export interface CreateScanDTO {
  visitor_id: string;
  animal_id: string;
  created_at: string;
}

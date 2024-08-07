export interface UserDetails {
  id: string;
  full_name: string;
  avatar_url?: string;
}

export interface Songs {
  id: string;
  user_id: string;
  created_at: string;
  title: string;
  song_path: string;
  image_path: string;
  author: string;
  lyric_path: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: string;
  metadata?: string;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created?: string;
  current_period_start?: string;
  current_period_end?: string;
  ended_at?: string;
  cancel_at?: string;
  trial_start?: string;
  trial_end?: string;
}

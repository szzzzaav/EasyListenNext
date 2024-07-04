export interface UserDetails {
  id: string;
  full_name: string;
  avatar_url?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: string;
  metadata?: string;
  price_id?: string;
  quantity?: string;
  cancel_at_period_end?: boolean;
  created?: string;
  current_period_start?: string;
  current_period_end?: string;
  ended_at?: string;
  cancel_at?: string;
  trial_start?: string;
  trial_end?: string;
}

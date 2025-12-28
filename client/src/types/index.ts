export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  equipment: string[];
  createdAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  activityId: string;
  createdAt: string;
  activity: Activity;
}

export interface Preferences {
  id?: string;
  userId: string;
  budget: number;
  categories: string[];
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export type Category =
  | 'Sport'
  | 'Creative'
  | 'Culture'
  | 'Nature'
  | 'Social'
  | 'Learning';

export const CATEGORIES: Category[] = [
  'Sport',
  'Creative',
  'Culture',
  'Nature',
  'Social',
  'Learning',
];

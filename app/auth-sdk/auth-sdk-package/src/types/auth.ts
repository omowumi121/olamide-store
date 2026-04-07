// 1. Define the User structure based on your Go backend
export interface User {
  id: string | number;
  name: string;
  email: string;
  is_admin?: boolean; // Optional, if your backend sends it
  created_at?: string;
}

// 2. Define what the Login/Register response looks like
export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

// 3. Define the credentials object used in login/register
export interface AuthCredentials {
  email: string;
  password?: string; // Optional for some flows
  name?: string;     // Required for registration
}
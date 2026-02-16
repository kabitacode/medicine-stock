// services/api.ts
import axios from 'axios';
import { api } from '@/services'

interface LoginResponse {
  email: string;
  name: string;
  role: string;
  token: string;
}

export async function loginServer(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  )

  if (!res.ok) {
    throw new Error('Login gagal')
  }

  return res.json()
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', { email, password }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const logout = async (token: string): Promise<void> => {
  await api.delete('/logout', {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  });
};

export const fetchRegister = async (postData: any) => {
  try {
    const response = await api.post('/register', postData, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
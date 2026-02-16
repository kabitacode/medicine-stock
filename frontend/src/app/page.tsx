'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '@/services';
import { AccountCircle } from "@mui/icons-material";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";

type LoginFormValues = {
  email: string
  password: string
}


const Page: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (res?.ok) {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-200 h-svh">
      <div className="container mx-auto py-8 pt-24">
        {
          error && <div className="mb-10 flex items-center justify-center">
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </div>
        }
        <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-lg">
          <div className="flex items-center justify-center mb-10">
            <AccountCircle sx={{ fontSize: 70 }} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="name@mail.com"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="mt-3 text-sm text-red-500">Email is required</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="********"
              {...register('password', { required: true })}
            />
            {errors.password && <p className="mt-3 text-sm text-red-500">Password is required</p>}
          </div>
          <button
            className="w-full mb-5 bg-green-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300"
            type="submit"
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </button>
          <Link href={'/register'}>
            <p className="text-sm text-center font-bold">Belum punya akun? Daftar disini</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Page;
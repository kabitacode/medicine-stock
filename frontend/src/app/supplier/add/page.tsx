"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from "../../dashboard/layout";
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, IconButton } from '@mui/material'; // Import komponen TextField dari Material-UI
import { CustomButton, ButtonCustom } from "@/components";
import { fetchSupplierAdd } from '@/services';
import useStore from '@/store/useStore';
import { ArrowBack } from '@mui/icons-material';
import { toast } from 'react-hot-toast';

interface FormData {
    name: string;
    alamat: string
    email: string
    telepon: string
}

interface dataResponse {
    message: string
}

const Page: React.FC<FormData> = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<dataResponse>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { user } = useStore();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!user || !user.token) return;
        setLoading(true);
        try {
            const postData = {
                nama: data.name,
                alamat: data.alamat,
                email: data.email,
                no_telepon: data.telepon
            };
            const response = await fetchSupplierAdd(user?.token, postData);
            toast.success(response.message || "Data berhasil Ditambahkan!");
            reset();
            router.back()
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-row mt-4 ml-4 mr-4 mb-10">
                <IconButton onClick={() => router.back()}>
                    <ArrowBack />
                </IconButton>
                <h1 className="text-2xl font-semibold mt-1 ml-2">Tambah Data Supplier</h1>
            </div>

            <div className='ml-7'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-1/3 mr-5 mb-5">
                        <TextField
                            id="name"
                            label="Nama Supplier"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name && "Nama Supplier is required"}
                            {...register('name', { required: true })}
                        />
                    </div>
                    <div className="w-1/3 mr-5 mb-5">
                        <TextField
                            id="alamat"
                            label="Alamat"
                            variant="outlined"
                            fullWidth
                            error={!!errors.alamat}
                            helperText={errors.alamat && "Alamat is required"}
                            {...register('alamat', { required: true })}
                        />
                    </div>
                    <div className="w-1/3 mr-5 mb-5">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type='email'
                            error={!!errors.email}
                            helperText={errors.email && "Email is required"}
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className="w-1/3 mr-5 mb-5">
                        <TextField
                            id="telepon"
                            label="No Telepon"
                            variant="outlined"
                            type='number'
                            fullWidth
                            error={!!errors.telepon}
                            helperText={errors.telepon && "No Telepon is required"}
                            {...register('telepon', { required: true })}
                        />
                    </div>

                    <div className="mt-8">
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                width: '16.66%',
                                backgroundColor: '#15803d',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#166534',
                                },
                            }}
                        >
                            {loading ? 'Loading...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default Page;

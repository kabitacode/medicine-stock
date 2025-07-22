"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from "../../../dashboard/layout";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, IconButton, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { fetchObat, fetchObatMasukEdit, fetchObatMasukId, fetchSupplier, fetchUsers } from '@/services';
import useStore from '@/store/useStore';
import { ArrowBack } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormData {
    obat: string;
    tanggal: Dayjs | null;
    user: string;
    supplier: string;
}

interface dataResponse {
    id: number;
    nama_obat: string;
    user: {
        id: number;
        name: string;
    }
}

interface dataResponseSupplier {
    id: number;
    nama: string;
    alamat: string;
    email: string;
    no_telepon: string;
}

interface dataResponseUser {
    id: number;
    name: string;
    role: string;
    email: string;
}

const Page: React.FC<FormData> = () => {
    const { register, handleSubmit, reset, formState: { errors }, control, setValue } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<dataResponse[]>([]);
    const [dataSupplier, setDataSupplier] = useState<dataResponseSupplier[]>([]);
    const [dataUser, setDataUser] = useState<dataResponseUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [tanggal, setTanggal] = useState<Dayjs | null>(dayjs());

    const router = useRouter();
    const { user } = useStore();
    const params = useParams<{ id: string }>()


    const fetchDataId = async () => {
        if (!user || !user.token) return;

        try {
            const response = await fetchObatMasukId(user?.token, params.id);
            const result = response.data;

            setLoading(false);
            setValue('obat', result.id_obat);
            setValue('supplier', result.id_supplier);
            setValue('user', result.id_user);
            setTanggal(dayjs(result.tanggal_masuk))

        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataObat = async () => {
        if (!user || !user.token) return;

        try {
            const response = await fetchObat(user?.token);
            const result = response.data;

            setData(result);
            setLoading(false);

        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataUser = async () => {
        if (!user || !user.token) return;

        try {
            const response = await fetchUsers(user?.token);
            const result = response.data;

            setDataUser(result);
            setLoading(false);

        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataSupplier = async () => {
        if (!user || !user.token) return;

        try {
            const response = await fetchSupplier(user?.token);
            const result = response.data;

            setDataSupplier(result);
            setLoading(false);

        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataId();
        fetchDataSupplier();
        fetchDataUser();
        fetchDataObat();
    }, [user]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!user || !user.token) return;
        setLoading(true);
        try {
            const postData = {
                id_obat: data.obat,
                id_user: data.user,
                id_supplier: data.supplier,
                tanggal_masuk: tanggal?.format('YYYY-MM-DD'),
            };
            const response = await fetchObatMasukEdit(user?.token, params.id, postData);
            toast.success(response.message || "Data berhasil Diubah!");
            reset({
                obat: "",
                supplier: "",
                user: ""
            });
            setTanggal(null)
            router.back();
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
                <h1 className="text-2xl font-semibold mt-1 ml-2">Edit Data Supplier</h1>
            </div>

            <div className='ml-7'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5 w-full">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Tanggal Masuk"
                                value={tanggal}
                                onChange={(newValue) => {
                                    setTanggal(newValue);
                                    setValue('tanggal', newValue, { shouldValidate: true });
                                }}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="w-1/3 mr-5 mb-5">
                        <FormControl fullWidth error={!!errors.obat}>
                            <InputLabel id="obat-label">Nama Obat</InputLabel>
                            <Controller
                                name="obat"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Nama Obat is required" }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <Select
                                        labelId="obat-label"
                                        id="obat"
                                        value={value}
                                        label="Obat"
                                        onChange={onChange}
                                    >
                                        {data.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item?.nama_obat}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.obat && <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained mui-1wc848c-MuiFormHelperText-root" id="obat">{errors.obat.message}</p>}
                        </FormControl>
                    </div>

                    <div className="w-1/3 mr-5 mb-5">
                        <FormControl fullWidth error={!!errors.obat}>
                            <InputLabel id="obat-label">Penerima</InputLabel>
                            <Controller
                                name="user"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Penerima is required" }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <Select
                                        labelId="user-label"
                                        id="user"
                                        value={value}
                                        label="Penerima"
                                        onChange={onChange}
                                    >
                                        {dataUser.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item?.name}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.user && <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained mui-1wc848c-MuiFormHelperText-root" id="user">{errors.user.message}</p>}
                        </FormControl>
                    </div>

                    <div className="w-1/3 mr-5 mb-5">
                        <FormControl fullWidth error={!!errors.obat}>
                            <InputLabel id="obat-label">Supplier</InputLabel>
                            <Controller
                                name="supplier"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Supplier is required" }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <Select
                                        labelId="supplier-label"
                                        id="supplier"
                                        value={value}
                                        label="Supplier"
                                        onChange={onChange}
                                    >
                                        {dataSupplier.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item?.nama}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.supplier && <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained mui-1wc848c-MuiFormHelperText-root" id="supplier">{errors.supplier.message}</p>}
                        </FormControl>
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

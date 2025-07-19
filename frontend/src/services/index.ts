import {fetchUsers, fetchUsersId, fetchUsersAdd, fetchUsersEdit, fetchUsersDelete} from '@/services/users';
import {fetchObat, fetchObatId, fetchObatAdd, fetchObatEdit, fetchObatDelete, fetchObatUpdateStatus, fetchFilterObat, fetchFilterObatByEmptyStok, fetchFilterObatByStatus, fetchFilterObatByMendekatiKadaluarsa, fetchFilterObatByMinStok} from '@/services/obat';
import {fetchKategori, fetchKategoriId, fetchKategoriAdd, fetchKategoriEdit, fetchKategoriDelete} from '@/services/kategori';
import {fetchDashboard} from '@/services/dashboard';
import {fetchBatch, fetchBatchId, fetchBatchAdd, fetchBatchEdit, fetchBatchDelete} from '@/services/batch';
import {fetchPenjualan, fetchPenjualanAdd, fetchPenjualanDelete, fetchPenjualanById, fetchPenjualanByKategori, fetchPenjualanFilter} from '@/services/penjualan';
import {fetchLaporanObat, fetchDataLaporan, fetchLaporanKadaluarsa, fetchLaporanMendekatiKadaluarsa, fetchLaporanPenjualan, fetchFilterObatKadaluarsa, fetchFilterObatMendekatiKadaluarsa, fetchFilterObatKadaluarsaByEmptyStok, fetchFilterObatMendekatiByEmptyStok, fetchFilterPenjualan, fetchFilterPenjualanByEmptyStok} from '@/services/laporan';
import {login, logout, fetchRegister} from '@/services/auth';
import {fetchSupplierId, fetchSupplier, fetchSupplierAdd, fetchSupplierEdit, fetchSupplierDelete} from '@/services/supplier';
import {fetchObatMasuk, fetchObatMasukAdd, fetchObatMasukDelete, fetchObatMasukEdit, fetchObatMasukId} from '@/services/obatMasuk';

import {api} from '@/services/api';

export {
    api,
    login,
    logout,
    fetchRegister,

    fetchDashboard,
    
    fetchUsers,
    fetchUsersId,
    fetchUsersAdd,
    fetchUsersDelete,
    fetchUsersEdit,

    fetchObat,
    fetchObatId,
    fetchObatAdd,
    fetchObatEdit,
    fetchObatDelete,
    fetchObatUpdateStatus,
    fetchFilterObat,
    fetchFilterObatByStatus,
    fetchFilterObatByEmptyStok,
    fetchFilterObatByMendekatiKadaluarsa,
    fetchFilterObatByMinStok,

    fetchKategori,
    fetchKategoriId,
    fetchKategoriAdd,
    fetchKategoriEdit,
    fetchKategoriDelete,

    fetchSupplier,
    fetchSupplierAdd,
    fetchSupplierDelete,
    fetchSupplierEdit,
    fetchSupplierId,

    fetchObatMasuk,
    fetchObatMasukAdd,
    fetchObatMasukEdit,
    fetchObatMasukDelete,
    fetchObatMasukId,

    fetchBatch,
    fetchBatchId,
    fetchBatchAdd,
    fetchBatchEdit,
    fetchBatchDelete,

    fetchPenjualan,
    fetchPenjualanAdd,
    fetchPenjualanDelete,
    fetchPenjualanById,
    fetchPenjualanByKategori,
    fetchPenjualanFilter,

    fetchLaporanObat,
    fetchDataLaporan,
    fetchLaporanKadaluarsa,
    fetchLaporanMendekatiKadaluarsa,
    fetchLaporanPenjualan,
    fetchFilterObatKadaluarsa,
    fetchFilterObatMendekatiKadaluarsa,
    fetchFilterObatKadaluarsaByEmptyStok,
    fetchFilterObatMendekatiByEmptyStok,
    fetchFilterPenjualan,
    fetchFilterPenjualanByEmptyStok
}


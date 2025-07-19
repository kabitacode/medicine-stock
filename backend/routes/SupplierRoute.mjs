import express from 'express';

import {
    getSupplier,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from '../controllers/Supplier.mjs';
import { verifyUser } from "../middleware/AuthUser.mjs";

const router = express.Router();

router.get('/api/supplier', verifyUser, getSupplier);
router.get('/api/supplier/:id', verifyUser, getSupplierById);
router.post('/api/supplier', verifyUser, createSupplier);
router.patch('/api/supplier/:id', verifyUser, updateSupplier);
router.delete('/api/supplier/:id', verifyUser, deleteSupplier);

export default router;
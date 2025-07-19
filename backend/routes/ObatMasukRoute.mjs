import express from 'express';

import {
    getObatMasuk,
    getObatMasukById,
    createObatMasuk,
    updateObatMasuk,
    deleteObatMasuk
} from '../controllers/ObatMasuk.mjs';
import { verifyUser } from "../middleware/AuthUser.mjs";

const router = express.Router();

router.get('/api/obatMasuk', verifyUser, getObatMasuk);
router.get('/api/obatMasuk/:id', verifyUser, getObatMasukById);
router.post('/api/obatMasuk', verifyUser, createObatMasuk);
router.patch('/api/obatMasuk/:id', verifyUser, updateObatMasuk);
router.delete('/api/obatMasuk/:id', verifyUser, deleteObatMasuk);

export default router;
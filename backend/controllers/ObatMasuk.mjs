import ObatMasukModel from '../models/ObatMasukModel.mjs';
import ObatModel from '../models/ObatModel.mjs';
import SupplierModel from '../models/SupplierModel.mjs';
import UserModel from '../models/UserModel.mjs';

export const getObatMasuk = async (req, res) => {
    try {
        const response = await ObatMasukModel.findAll({
            include: [
                {model: ObatModel},
                {model: UserModel, attributes: ['id', 'name', 'email', 'role'] },
                {model: SupplierModel},
            ]
        });
        res.status(200).json({
            status: 200,
            message: "success",
            data: response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getObatMasukById = async (req, res) => {
    try {
        const response = await ObatMasukModel.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!response) return res.status(404).json({ message: "Data tidak ditemukan!" });
        res.status(200).json({
            status: 200,
            message: "success",
            data: response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createObatMasuk = async (req, res) => {
    try {
        const { tanggal_masuk, id_user, id_obat, id_supplier } = req.body;        
        
        await ObatMasukModel.create({
            tanggal_masuk: tanggal_masuk,
            id_obat: id_obat,
            id_supplier: id_supplier,
            id_user: id_user
        });
        res.status(201).json({
            status: 201,
            message: "ObatMasuk created successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateObatMasuk = async (req, res) => {
    const { nama_obat, tanggal_masuk, id_user, id_obat, id_supplier } = req.body;
    try {
        const user = await ObatMasukModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) return res.status(404).json({ message: "Data Tidak Ditemukan!" });
        await ObatMasukModel.update({
            nama_obat,
            tanggal_masuk,
            id_obat,
            id_supplier,
            id_user
        }, {
            where: {
                id: user.id
            }
        })
        res.status(200).json({
            status: 200,
            message: "ObatMasuk updated successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteObatMasuk = async (req, res) => {
    try {
        const user = await ObatMasukModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) return res.status(404).json({ message: "User Tidak Ditemukan!" });
        await ObatMasukModel.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ message: "ObatMasuk deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
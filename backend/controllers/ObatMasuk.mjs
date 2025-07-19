import ObatMasukModel from '../models/ObatMasukModel.mjs';

export const getObatMasuk = async (req, res) => {
    try {
        const response = await ObatMasukModel.findAll();
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
        const { nama, penerbit } = req.body;
        await ObatMasukModel.create({
            nama: nama,
            penerbit: penerbit
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
    const { nama, penerbit } = req.body;
    try {
        const user = await ObatMasukModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) return res.status(404).json({ message: "Data Tidak Ditemukan!" });
        await ObatMasukModel.update({
            nama: nama,
            penerbit: penerbit
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
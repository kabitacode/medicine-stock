import SupplierModel from '../models/SupplierModel.mjs';

export const getSupplier = async (req, res) => {
    try {
        const response = await SupplierModel.findAll();
        res.status(200).json({
            status: 200,
            message: "success",
            data: response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSupplierById = async (req, res) => {
    try {
        const response = await SupplierModel.findOne({
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

export const createSupplier = async (req, res) => {
    try {
        const { nama, no_telepon, email, alamat } = req.body;
        await SupplierModel.create({
            nama: nama,
            no_telepon: no_telepon,
            alamat: alamat,
            email: email
        });
        res.status(201).json({
            status: 201,
            message: "Supplier created successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSupplier = async (req, res) => {
    const { nama, no_telepon, email, alamat } = req.body;    

    try {
        const user = await SupplierModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) return res.status(404).json({ message: "Data Tidak Ditemukan!" });
        await SupplierModel.update({
            nama: nama,
            email: email,
            alamat: alamat,
            no_telepon: no_telepon
        }, {
            where: {
                id: user.id
            }
        })
        res.status(200).json({
            status: 200,
            message: "Supplier updated successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        const user = await SupplierModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) return res.status(404).json({ message: "User Tidak Ditemukan!" });
        await SupplierModel.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
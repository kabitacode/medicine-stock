import { Sequelize } from "sequelize";
import db from "../config/database.mjs";
import ObatModel from './ObatModel.mjs';
import SupplierModel from './SupplierModel.mjs';
import UserModel from './UserModel.mjs';

const { DataTypes } = Sequelize;

const ObatMasukModel = db.define('obat_masuk', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tanggal_masuk: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    id_supplier: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'supplier',
            key: 'id'
        }
    },
    id_obat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'obat',
            key: 'id'
        }
    },
}, {
    freezeTableName: true,
    timestamps: true
});


SupplierModel.hasMany(ObatMasukModel, { foreignKey: 'id_supplier' });
ObatMasukModel.belongsTo(SupplierModel, { foreignKey: 'id_supplier' });

UserModel.hasMany(ObatMasukModel, { foreignKey: 'id_user' });
ObatMasukModel.belongsTo(UserModel, { foreignKey: 'id_user' });

ObatModel.hasMany(ObatMasukModel, { foreignKey: 'id_obat' });
ObatMasukModel.belongsTo(ObatModel, { foreignKey: 'id_obat' });

export default ObatMasukModel;

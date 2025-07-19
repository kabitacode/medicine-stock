import { Sequelize } from "sequelize";

const db = new Sequelize('db_obat', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql'
});

export default db;

import Sequelize from 'sequelize';
import casual from 'casual'; // For initial seed fake data.
import _ from 'lodash';
import fetch from 'node-fetch'; // For public API

const fs = require('fs')
const db = new Sequelize('postgres://postgres:mythuperthecretpath@meetme_db/postgres');

const UserModel = db.define('user', {
    username: { type: Sequelize.STRING, unique: true },
    password_hash: { type: Sequelize.TEXT },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    // Add Unique
});

const NetworkModel = db.define('network', {
    src_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        unique: 'net_id',
    },
    conn_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        unique: 'net_id',
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'LISTED'
    }
    // Add Unique
});

UserModel.hasMany(NetworkModel)
NetworkModel.belongsTo(UserModel)

casual.seed(39109)

db.sync().then(() => {
    const seed = JSON.parse(fs.readFileSync('/usr/src/app/data/seed.json'))
    if (!seed.initiated) {
        _.each(seed.data, (u) => { // u for user
            return UserModel.create({
                username: u.username,
                password_hash: u.password_hash,
                firstName: u.firstName,
                lastName: u.lastName,
            });
        });
        // create a network
        _.times(20, () => {
            return NetworkModel.create({
                src_id: casual.INTEGER(from=1, to=10),
                conn_id: casual.INTEGER(from=1, to=10),
                status: 'LISTED',
            });
        });

        seed.initiated = true
        const temp = JSON.stringify(seed, null, 4)
        fs.writeFileSync('/usr/src/app/data/seed.json', temp)
    }
});

const User = db.models.user
const Network = db.models.network

export { User, Network, db };
import { User, Network } from './connectors';

const resolvers = {
    Query: {
        user(_, args) {
            return User.find({ where: args });
        },
        allUsers(_, args) {
            return User.findAll();
        },
        connections(_, args) {
            let temp = []
            const conn = Network.findAll({ where: args})
            conn.array.forEach(element => {
                temp.push(User.find({ where: id=element.conn_id }))
            });
            return temp
        },
        allConnections(_, args) {
            return Network.findAll();
        }
    },
};

export default resolvers;

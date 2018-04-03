import { User, Network } from './connectors';

const resolvers = {
    Query: {
        user(_, args) {
            return User.find({ where: args });
        },
        allUsers(_, args) {
            return User.findAll()
        },
        allConnections(_, args) {
            return Network.findAll();
        }
    },
    User: {
        connections(user) {
            return Network.findAll({ where: {src_id: user.dataValues.id}})
            .then( conns => {
                var temp = [];
                conns.forEach( c => {
                    temp.push(User.find({ where: {id: c.conn_id}}));
                })
                return temp;
            });
        }
    },
    
};

export default resolvers;

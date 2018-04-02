import casual from 'casual';

casual.seed(39109)

const mocks = {
    String: () => 'It works!',
    Integer: () => casual.integer,
    Query: () => ({
        user: (root, args) => {
            return { firstName: args.firstName, lastName: args.lastName, username: args.username, email: args.email };
        },
    }),
    User: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name, username: () => casual.username, email: () => casual.email }),
    Connection: () => ({
        src_id: () => casual.integer(from = 1, to = 10),
        conn_id: () => casual.integer(from = 1, to = 10),
        status: () => casual.random_element(['LISTED', 'BLOCKED', 'REMOVED'])
    })
};

export default mocks;
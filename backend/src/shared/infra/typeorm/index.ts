import {createConnection, getConnectionOptions, Connection} from "typeorm";

export default async (name = 'default'): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions();

    console.log(process.env.DB_HOST);
    return createConnection(
        Object.assign(defaultOptions, {
            name
        }),
    )
};

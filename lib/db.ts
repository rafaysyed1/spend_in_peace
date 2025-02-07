import mongoose, { ConnectOptions } from 'mongoose';

const connection_uri = process.env.MONGO_URI!;

if (!connection_uri) {
    throw new Error('MONGO_URI not defined');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { connection: null, promise: null };
}

export default async function db() {
    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        const opts : ConnectOptions = {
            bufferCommands: true,
            maxPoolSize: 10,
            dbName: 'SpendInPeace',
        };

        cached.promise = mongoose.connect(connection_uri, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }

    cached.connection = await cached.promise;
    return cached.connection;
}
const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: 'janyatri'
      })
      .then((mongooseInstance) => {
        console.log(
          `MongoDB Connected: ${mongooseInstance.connection.host}`
        );

        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
import mongoose from "mongoose";

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url)
    } catch (error) {
        console.log(error.message)
        throw new Error("Connection Failed!", error.message)
    }
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database!');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected!');
});

export default connectToDB;
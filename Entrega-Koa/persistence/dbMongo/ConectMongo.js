import mongoose from 'mongoose';

mongoose.set('strictQuery', false)

const connect = async () => {
    try {
      const db = await mongoose.connect('mongodb+srv://alviafricke:pruebamongo@baseprueba.uuv5218.mongodb.net/ecommerce', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log(`Connected to database: ${db.connection.name}`);
    } catch (error) {
      console.error('Error connecting to database:', error.message);
    }
  };
  

export default connect;

import mongoose from 'mongoose';


export async function Connect() {
    try{
        mongoose.connect(process.env.MONGODB_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MONGODB_Connection Successfull');
        })

        connection.on('error', (err:any) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })
    }catch(error:any){
        console.log('Something goes wrong!');
        console.log(error);
    }
}
import express from 'express'; // importing express 
import todoRoutes from './routes/todoRoutes.js'
import cors from 'cors'; // allows cross orign api calls 

import connectDB from './config/db.js';

const app = express();
const port = 8000;

// connect database
connectDB();

// middleware
app.use(cors({origin:true, credentials:true})); 
app.use(express.json({extended:false}));


app.get('/', (req,res) => {
    res.send("Server up and running")
})

app.use("/api/todos",todoRoutes )

// listening to port at 8000
app.listen(port, () => {
    console.log("App is running at port ", port);
})
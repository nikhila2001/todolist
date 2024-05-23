const express = require('express'); // importing express 
const todoRoutes = require('./routes/todoRoutes.js');
const cors = require('cors'); // allows cross-origin API calls
const userRoutes = require("./routes/userRoutes.js");

const connectDB = require('./config/db.js');


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
app.use("/api/user",userRoutes)

// listening to port at 8000
app.listen(port, () => {
    console.log("App is running at port ", port);
});
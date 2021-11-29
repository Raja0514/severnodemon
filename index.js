
const express =require('express')

const app=express();

const port=process.env.PORT || '3002';

app.get("/",(req,res)=>{

    res.send("server running sucessfully with nodemon......")
})
app.listen(port,()=>{

    console.log(`server running at port no ${port} `)
})



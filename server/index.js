
const express= require('express');
const path= require('path');
const app=express();
const PORT=process.env.PORT || 3000;

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(process.cwd(),'dist/platzi-overflow')));
    console.log('Using static');
}


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

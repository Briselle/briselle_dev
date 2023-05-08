const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//defining ROUTES//

//recieve the data of an object
app.post("/object_data",async(req,res)=>{
  try{
    const obj_id = req.body.object_id;
    const obj_json = req.body.object_json;
    const new_obj = await pool.query(
      "INSERT INTO object_info VALUES($1,$2)",
      [obj_id,obj_json]
    );
   res.json(new_obj.rows[0]);
  }
  catch(err){
    console.log(err);
  }
})

//return all object data
app.get("/object_data",async(req,res)=>{
  try{
    const objects = await pool.query('SELECT * FROM object_info');
    res.json(objects.rows)
  }
  catch(err){
    console.log(err.message);
  }
})

//return a single object
app.get("/object_data/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const obj = await pool.query('SELECT * FROM object_info WHERE obj_id=$1',
    [id]);
    res.json(obj.rows[0]);
  }
  catch(err){
    console.log(err.message);
  }
})

//delete an object
app.delete("/object_data/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const deleteField = await pool.query('DELETE FROM field_info WHERE obj_id=$1',[id]);
    const deleteObject = await pool.query('DELETE FROM object_info WHERE obj_id=$1',[id]);
    res.json("Field was deleted");
  }
  catch(err){
    console.log(err.message);
  }
})

//update an object
app.put("/object_data/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const object_json = req.body.object_json;
    const updateObject = await pool.query('UPDATE object_info SET obj_json = $1 WHERE obj_id=$2',[object_json,id]);
    const ts = getTimeStamp();
    const updateTime = await pool.query('UPDATE object_info SET updated_ts = $1 WHERE obj_id=$2',[ts,id]);
    res.json("Object was updated");
  }
  catch(error){
    console.log(error);
  }
})

//recieve the data of fields
app.post("/field_data",async(req,res)=>{
  try{
    const obj_id = req.body.obj_id;
    const fld_id = req.body.fld_id;
    const fld_json = req.body.fld_json;
    const new_field = await pool.query(
      "INSERT INTO field_info VALUES($1,$2,$3)",
      [obj_id,fld_id,fld_json]
    );
    res.json(new_field.rows[0]);
  }
  catch(err){
    console.log(err.message);
  }
})


app.get('/',(req,res)=>{
  res.send("Hello world! This is the api which is being sent the frontend")
});

//return fields of an object
app.get("/field_data",async(req,res)=>{
  try{
    const id = req.query.id;
    const fld = await pool.query('SELECT * FROM field_info WHERE obj_id=$1',[id]);
    res.json(fld.rows);

  }
  catch(err){
    console.log(err.message);
  }
})

//update a field of an object
app.put("/field_data/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const fld_json = req.body.fld_json;
    console.log(fld_json);
    const updateObject = await pool.query('UPDATE field_info SET field_json = $1 WHERE field_id=$2',[fld_json,id]);
    const ts = getTimeStamp();
    const updateTime = await pool.query('UPDATE field_info SET updated_ts = $1 WHERE field_id=$2',[ts,id]);
    console.log(ts);
    res.json("Field was updated");
  }
  catch(error){
    console.log(error);
  }
})

app.get("/get_values",async(req,res)=>{
  try{
    const id = "OBJ101";
    const fld = await pool.query('SELECT * FROM field_info WHERE obj_id=$1',[id]);
    res.json(fld.rows);
  }
  catch(err){
    console.log(err.message);
  }
})

//return the values stored in the form
app.get("/values",async(req,res)=>{
  try{
    const vals = await pool.query("SELECT * FROM data_values");
    res.json(vals.rows);
  }catch(err){
    console.log(err.message);
  }
})

//to delete a field
app.delete("/field_data/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const deleteField = await pool.query("DELETE FROM field_info WHERE field_id=$1",[id]);
    res.json("Field was deleted");
  }
  catch(err){
    console.log(err.message);
  }
})

//recieve the values of the form
app.post("/values",async(req,res)=>{
  try{
    const data = req.body.body;
    const val = JSON.parse(data);
    val.forEach(element => {
      var val_id = element.values["value_id"];
      var fld_name = element.field_json['fld_name'];
      var value = element.values["value"];
      var vals = pool.query(
        "INSERT INTO data_values VALUES($1,$2,$3)",
        [val_id,fld_name,value]
      );
      res.json(vals.rows);
    });
  }
  catch(err){
    console.log(err);
  }
})

//delete values
app.delete("/values/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const deleteValue = await pool.query('DELETE FROM data_values WHERE value_id=$1',[id]);
    res.json("Value was deleted");
  }
  catch(err){
    console.log(err.message);
  }
})
/*app.get("/api",(req,res)=>{
    res.json(api);
})*/


//get timestamp
function getTimeStamp(){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let ts = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  return ts;
}
app.listen(port,()=>console.log("app running on port 5000"));
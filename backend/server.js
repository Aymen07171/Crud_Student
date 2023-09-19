const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Root.@102030',
    database : 'inventory'
});



app.get('/',(req,res)=> {
    const sql = "SELECT * FROM items"
    db.query(sql,(err,result)=> {
        if(err) return res.json({Message : "Error Inside Server"})
        return res.json(result)
    })
})

app.post('/items',(req,res) =>{
    const sql = "INSERT INTO items (`Name`,`Email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql,[values],(err,result) =>{
        if(err) return res.json(err);
        return res.json(result)
    })
})


app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM inventory.items WHERE id = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ Message: "Error Inside Server" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ Message: "Item not found" });
      }
  
      return res.json(results[0]); // Assuming you expect a single item.
    });
  });
  

app.put('/update/:id',(req,res) => {
    const sql = 'UPDATE items SET `Name` = ?, `Email`=? WHERE ID=?';
    const id  = req.params.id;
    db.query(sql, [req.body.name, req.body.email,id],(err,result) => {
        if(err) return res.json({Message: "Error Inside Server"})
        return res.json(result);
    })
})



app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM items WHERE ID = ?";
    const id  = req.params.id;
    db.query(sql, [id],(err,result) => {
        if(err) return res.json({Message: "Error Inside Server"})
        return res.json(result);
    })
})


app.listen(3001,() => {
    console.log("Connected to Backend");
})



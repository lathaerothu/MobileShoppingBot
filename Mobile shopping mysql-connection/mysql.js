var mysql= require('mysql')
var Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'latha',
    datebase: 'project1',
    multipleStatements: true

})

Connection.connect((err) => {
    if (!err) {
        
        console.log("mysql sucessfully connected")
    }
    else {
       
        console.log("connection failed");
    }
})


module.exports = Connection

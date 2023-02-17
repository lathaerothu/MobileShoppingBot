var express = require('express')
const Connection = require('./mysql')
var app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hii latha')
})

app.get('/Mobiles/:Mobiles', (req, res) => {
  let Mobiles = req.params.Mobiles
  try {
    let sql = `select * from librarytask.Mobileshop  where Mobiles='${Mobiles}'`
    Connection.query(sql, (err, rows, fields) => {
      if (err) {
        console.log('Error while inserting a user into the database', err)
        return res.status(400).send()
      }
      return res.status(201).json(rows)
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
})

app.post('/MobileAccessories/:Accessories', (req, res) => {
    let Accessories = req.params.Accessories
    try {
      let sql = `select * from librarytask.MobileAccessories  where Accessories='${Accessories}'`
      Connection.query(sql, (err, rows, fields) => {
        if (err) {
          console.log('Error while inserting a user into the database', err)
          return res.status(400).send()
        }
        return res.status(201).json(rows)
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send()
    }
  })


app.listen(7000, () => {
  console.log('server running')
})

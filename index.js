require('dotenv').config();
const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8000;
const Book = require('./models/books');

const mongodb = require('./mongodb');


mongoose.set('stricQuery', false)

const connectDB = async()=> {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }
  catch(error) {
    console.log(error)
    process.exit(1);
  }
}

app.get('/', (req,res) =>

  {
    res.send({title: 'Books'})
  }

)

connectDB().then(() => {
  app.listen(PORT, () => {
    console;log(`Wassup im listening on port ${PORT}`)
  })
})
const templatePath = path.join(__dirname, '../templates')

app.get('/add-note', async (req,res) => {
  try {
    await Book.insertMany([
      {
        title: "Sons of Anarchy",
        body: "Body text right here"
      },
      {
        title: "Game of Thrones",
        body: "Another body text right here lol",
      }
    ]);
  }
  catch(error) {
    console.log("err", + error);
  }
})

app.get('/books', async (req, res) => {
  const book = await Book.find();
  if(book) {
    res.json(book)
  }
  else {
    res.send("something went wrong bruh");
  }
});

/* app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))


app.get("/", (req, res) => {
  res.render("login");
})

app.get("/signup", (req, res) => {
  res.render("signup");
})

app.post("/signup", async (req,res)=>{

const data = {
  name: req.body.name,
  password: req.body.password
}

await collection.insertMany([data])

res.render("login")

}
)

app.post("/login", async (req,res)=>{

  try {
    const check = await collection.findOne({name:req.body.name})
    if(check && check.password===req.body.password) {
      res.render("home");
    }
    else {
      res.send("wrong password")
    }
  }
  
  catch {
    res.send("wrong details")
  }
  
  }
  )

app.listen(3000, () => {
  console.log('port connected')
})
*/
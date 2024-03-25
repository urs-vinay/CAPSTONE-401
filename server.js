const express = require('express');
const admin = require('firebase-admin');
const app = express();
const path = require('path');

const serviceAccount = require('./key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // res.render('vinay1');
  res.sendFile(__dirname+'/views/vinay1.html')
});

app.post('/vinay1', async (req, res) => {
  const { email, password,age } = req.body;

  try {
    const existingUser = await db.collection('details').where('email', '==', email).get();
    if (!existingUser.empty) {
      return res.send("User Already Exists!");
    }
    await db.collection('details').add({
      
      email,
      password,
      age
    });
    return res.redirect('/main');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing user data');
  }
});

app.get('/main', (req, res) => {
  res.sendFile(__dirname+'/views/main.html')

});
app.post('/main', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userRef = db.collection('details').where('email', '==', email).where('password', '==', password);
      const present = await userRef.get();
  
      if (present.empty) {
        res.send("Invalid email or password");
        
      } else {
        res.redirect('/My_Page');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error checking user credentials');
    }
  });
  
  
app.get('/My_Page', async(req, res) => {
 
  res.sendFile(__dirname+'/views/My_Page.html')
});

app.listen(5500, _ => console.log('Server is running on port 5500'));

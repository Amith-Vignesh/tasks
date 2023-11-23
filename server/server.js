const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');


const app = express();
const port = process.env.PORT || 5000;

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'scitask',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(cors());
app.use(bodyParser.json());

// Helper function to execute a SQL query and return a promise
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Setup express-session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Setup Passport local strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
      const results = await executeQuery(query, [username, password]);

      if (results.length > 0) {
        return done(null, results[0]);
      } else {
        return done(null, false, { message: 'Invalid username or password' });
      }
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = 'SELECT * FROM user WHERE id = ?';
  executeQuery(query, [id])
    .then((results) => {
      if (results.length > 0) {
        done(null, results[0]);
      } else {
        done(null, false);
      }
    })
    .catch((error) => done(error));
});

// API route for login
app.post('/login', passport.authenticate('local'), async (req, res) => {
  const user = req.user;

  // Check if the user is an admin
  const isAdmin = user && user.userType === 'admin';

  if (isAdmin) {
    // Fetch all user details from the database if the user is an admin
    const allUsersQuery = 'SELECT * FROM user';
    const orgQuery = 'SELECT * FROM organization';

    // Use Promise.all to execute both queries in parallel
    try {
      const [allUsers, orgData] = await Promise.all([
        executeQuery(allUsersQuery),
        executeQuery(orgQuery),
      ]);

      res.json({ message: 'Login successful', allUsers, orgData });
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // If the user is not an admin, only send the authenticated user details
    res.json({ message: 'Login successful', user });
  }
});

app.post('/signup', async (req, res) => {
    const {
      username,
      password,
      age,
      gender,
      address,
      email,
      organization,
    } = req.body;

    let orgId = parseInt(organization);

    if (isNaN(orgId)) {
        orgId = 1;
      } 
  
    try {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the user data into the database
      const insertUserQuery = `
        INSERT INTO user (username, password, age, gender, address, email, orgId,userType)
        VALUES (?, ?, ?, ?, ?, ?, ?,?)
      `;
  
      db.query(
        insertUserQuery,
        [username, hashedPassword, age, gender, address, email, orgId,'user'],
        (err, result) => {
          if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
  
          console.log('User created successfully');
          res.json({ message: 'Signup successful' });
        }
      );
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// ... (other routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

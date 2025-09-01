import express from 'express'
import dotenv from 'dotenv'
import restaurantRoutes from './Routes/restaurant.routes.js';
import authRoutes from './Routes/auth.routes.js';
import cors from 'cors';
import db from './model/index.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
  origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const initializeDatabase = async () => {
  try {
    // Force sync database - this will drop and recreate all tables with proper relationships
    await db.sequelize.sync({ force: true });
    console.log("Database synced successfully - all tables created with relationships");
    
    const Role = db.Role;
    
    // Create default roles
    const defaultRoles = [
      { id: 1, name: "user" },
      { id: 2, name: "moderator" }, 
      { id: 3, name: "admin" }
    ];
    
    await Role.bulkCreate(defaultRoles);
    console.log("Created default roles:", defaultRoles.map(r => r.name));
    
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

app.get('/', (req, res) => {
  res.send('Restaurant Useful API')
});

// Use the routes
app.use('/api/v1/restaurants', restaurantRoutes);
app.use("/api/auth", authRoutes);

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
# BharatArchive - Indian Cultural Heritage Platform

A full-stack MERN application for preserving and celebrating India's rich cultural heritage, including ancient temples, festivals, traditions, and monuments.

## Features

### For All Users
- Browse and explore Indian cultural heritage entries
- Search and filter by categories (temples, festivals, monuments, etc.)
- View detailed information with image galleries
- Like and share entries
- SEO-optimized content for better discoverability

### For Registered Users
- Comment on entries
- Like and interact with content
- Personalized experience

### For Admins
- Full CRUD operations for entries
- Create, edit, and delete heritage entries
- Add multiple images per entry
- Manage SEO metadata (meta descriptions, keywords)
- View analytics (views, likes, comments)

## Tech Stack

### Frontend
- React.js (JSX only, no TypeScript)
- React Router for navigation
- Axios for API calls
- React Helmet Async for SEO
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
BharatArchive/
├── server/                 # Backend
│   ├── models/            # MongoDB models
│   ├── controllers/       # Route controllers
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── config/            # Database config
│   └── server.js          # Entry point
│
└── client/                # Frontend (root directory)
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── contexts/      # React contexts
    │   ├── services/      # API services
    │   └── utils/         # Utility functions
    └── public/
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bharatarchive
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the root directory (or client directory if separate)

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update with your API URL:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from "Connect" > "Connect your application"
6. Replace `<username>`, `<password>`, and database name in the connection string

## Creating an Admin User

After setting up the backend, you can create an admin user by:

1. Register a normal user through the UI
2. Connect to your MongoDB database
3. Find the user in the `users` collection
4. Update their `role` field from `'user'` to `'admin'`

Or use this MongoDB command:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Entries
- `GET /api/entries` - Get all entries (with pagination, search, filter)
- `GET /api/entries/:id` - Get entry by ID
- `GET /api/entries/slug/:slug` - Get entry by slug
- `POST /api/entries` - Create entry (admin only)
- `PUT /api/entries/:id` - Update entry (admin only)
- `DELETE /api/entries/:id` - Delete entry (admin only)
- `POST /api/entries/:id/like` - Like/unlike entry (requires auth)
- `POST /api/entries/:id/comment` - Add comment (requires auth)
- `DELETE /api/entries/:id/comment/:commentId` - Delete comment (requires auth)

### Other
- `GET /api/sitemap` - Get sitemap data for SEO
- `GET /api/health` - Health check

## SEO Features

- Dynamic meta tags for each entry
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (Schema.org)
- Sitemap generation
- Search-friendly URLs (slugs)
- Keyword optimization

## Design Features

- Wikipedia-inspired clean design
- Text-focused layout
- Responsive design (mobile, tablet, desktop)
- Fast loading with lazy-loaded images
- Accessible navigation
- Professional typography (Lora + Inter fonts)

## Categories

- Temples
- Ancient Technology
- Festivals
- Monuments
- Art & Culture
- Traditions
- Other

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue in the repository.

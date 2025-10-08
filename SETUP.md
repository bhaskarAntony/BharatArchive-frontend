# BharatArchive - Quick Setup Guide

## Prerequisites
- Node.js installed (v14+)
- MongoDB Atlas account (free tier is fine)

## Step-by-Step Setup

### 1. MongoDB Atlas Setup (5 minutes)

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (select FREE tier)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose username and password (save these!)
5. Whitelist IP address:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
6. Get connection string:
   - Go to "Database" > "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Add database name: `bharatarchive`

Example: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/bharatarchive?retryWrites=true&w=majority`

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` file:
```
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
JWT_SECRET=your_random_secret_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

You should see: "MongoDB Connected" and "Server running on port 5000"

### 3. Frontend Setup

Open a NEW terminal window:

```bash
cd .. # (go back to project root if you're in server folder)
npm install
cp .env.example .env
```

Edit `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

### 4. Create Admin Account

1. Go to [http://localhost:5173/register](http://localhost:5173/register)
2. Create an account with your email
3. Open MongoDB Atlas:
   - Go to "Database" > "Browse Collections"
   - Find `bharatarchive` database > `users` collection
   - Find your user
   - Click "Edit Document"
   - Change `"role": "user"` to `"role": "admin"`
   - Save
4. Logout and login again
5. You should now see "Admin" link in the header

### 5. Test the Application

1. As admin, click "Admin" in the header
2. Click "Add New Entry"
3. Fill in the form:
   - Title: "Taj Mahal"
   - Category: Monument
   - Image URLs: Use any public image URL (e.g., from Pexels)
   - Location: "Agra, Uttar Pradesh"
   - Content: Add some description
4. Click "Create Entry"
5. Go to home page to see your entry

## Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Make sure you whitelisted your IP in MongoDB Atlas
- Verify database user credentials

### Frontend can't connect to backend
- Make sure backend is running on port 5000
- Check `.env` file has correct `VITE_API_URL`
- Make sure both frontend and backend are running

### Can't see Admin panel
- Make sure you changed role to "admin" in MongoDB
- Logout and login again after changing role

## Using Pexels for Images

For testing, you can use free images from [Pexels](https://www.pexels.com/):

1. Go to Pexels.com
2. Search for "Indian temple" or "Indian festival"
3. Click on an image
4. Right-click and "Copy Image Address"
5. Paste the URL in the Image URL field

## Production Deployment Tips

- Change JWT_SECRET to a strong random string
- Update MONGODB_URI with production credentials
- Update CLIENT_URL with your production domain
- Set NODE_ENV=production
- Use environment variables (never commit .env to git)

## Need Help?

Check the main README.md for detailed documentation.

# Subway Surfers IRL - Scoreboard Web

A scoreboard web application for **Subway Surfers In Real Life** (IRL) — the head-controlled gaming experience where players control the game with head movements and compete on a live leaderboard.

Built by **Aadim Gyawali**, **Smile Kalu**, and **Riwaj Karki** — three Grade 10 students from Panini School.

---

## 🎮 About the Project

Subway Surfers IRL combines physical head-tracking with a real-time scoreboard system. Players control the game using head movements (tracked via webcam), and their scores are instantly displayed on a live leaderboard. This scoreboard-web application is the core platform that:

- 📊 **Displays live player scores** in real-time
- 💾 **Stores player data** (name, age, photo, score) in MongoDB
- 🎯 **Tracks individual performance** across multiple game sessions
- 🏆 **Ranks players** by highest score

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB connection (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gyawaliaadim/Subway-Surfers-IRL.git
   cd Subway-Surfers-IRL/scoreboard-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file and add mongodb connection string:
   ```
   MONGODB_URI=CONNECTION_STRING
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📱 How It Works

### User Journey

1. **Welcome Screen** (`/`) - Greets players with "Welcome to Subway Surfers IRL!"
2. **Team Introduction** (`/screen1`) - Introduces the developers (Aadim, Smile, Riwaj)
3. **User Registration** (`/screens2-5`) - Collects player name, age, and optional photo
4. **Score Submission** - Game sends score data to the scoreboard
5. **Live Leaderboard** (`/scoreboard`) - Displays all players ranked by score (highest first)
6. **Thank You Screen** (`/thankyou`) - Completion message

### Data Flow

```
Player fills in info → Data saved to MongoDB → Game session runs → 
Score updated in database → Live scoreboard fetches and displays latest scores
```

---

## 🏗️ Architecture

### Frontend (Next.js)
- **App Router** - Modern routing with `/app` directory structure
- **React Context API** - Global state management for user data across screens
- **Tailwind CSS** - Responsive UI with yellow/blue theme
- **Framer Motion** - Smooth animations for team introduction cards

### Backend (Node.js + Next.js API Routes)
- **MongoDB + Mongoose** - Document-based database for storing player data
- **RESTful API** - `/api/userData` endpoint for CRUD operations
- **Server-side validation** - Input validation for user data

### Data Model

```javascript
User Schema:
{
  id: String (UUID, unique),
  name: String (required),
  age: Number (required),
  photo: Buffer (optional, base64 encoded),
  score: Number (default: 0)
}
```

---

## 📂 Project Structure

```
scoreboard-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.js            # Welcome screen
│   │   ├── layout.js          # Root layout with context provider
│   │   ├── globals.css        # Global styles
│   │   ├── api/
│   │   │   └── userData/      # API endpoints (POST, GET, PUT, DELETE)
│   │   ├── screen1/           # Team introduction
│   │   ├── screen2-5/         # User registration screens
│   │   ├── scoreboard/        # Live leaderboard page
│   │   ├── thankyou/          # Completion page
│   │   └── test/              # Debug page
│   ├── components/
│   │   └── Model.jsx          # Reusable modal wrapper component
│   ├── context/
│   │   └── userData.js        # React Context for user state
│   ├── db/
│   │   └── connectDb.js       # MongoDB connection handler
│   └── models/
│       └── User.js            # Mongoose User schema
├── package.json
├── next.config.js
└── README.md
```

---

## 🔧 API Endpoints

### POST `/api/userData` - Create User
Create a new player and generate unique ID

**Request:**
```json
{
  "name": "John Doe",
  "age": 16,
  "photo": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "id": "uuid-string-here"
}
```

### GET `/api/userData` - Get All Users
Fetch all players sorted by score (highest first)

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "age": 16,
    "score": 1250,
    "photo": "..."
  }
]
```

### PUT `/api/userData` - Update User
Update player score, name, age, or photo

**Request:**
```json
{
  "id": "uuid",
  "score": 1500,
  "name": "John Doe",
  "age": 16
}
```

### DELETE `/api/userData` - Delete User
Remove a player from the database

**Request:**
```json
{
  "id": "uuid"
}
```

---

## 🎨 Key Features

✅ **Real-time Leaderboard** - Players ranked by score instantly  
✅ **Player Registration** - Collect name, age, and photo  
✅ **Score Tracking** - Automatically updated from game sessions  
✅ **Responsive Design** - Works on desktop and mobile screens  
✅ **Smooth Animations** - Beautiful transitions and card animations  
✅ **Photo Upload** - Base64 encoded image storage in MongoDB  
✅ **Edit & Delete** - Manage player data on the scoreboard  
✅ **UUID Generation** - Unique IDs for each player (no duplicates)

---



## 💾 State Management

### Global User Data Context

```javascript
import { useUserData } from '@/context/userData';

export default function MyComponent() {
  const { name, setName, age, setAge, id, setId } = useUserData();
  
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}
```

---

## 🔌 Environment Configuration

### Required Variables (.env.local)
```env
MONGODB_URI=
```

### Optional Configuration
- Port: Default 3000 (can be overridden with `PORT` env var)
- Database: MongoDB (local or Atlas cloud)

---

## 📊 Scoreboard Features

### Live Leaderboard Page (`/scoreboard`)

- **Sorted by Score** - Players ranked from highest to lowest
- **Edit Scores** - Click edit button to update player info
- **Delete Players** - Remove player records
- **Player Photos** - Display profile pictures
- **Add New Player** - Quick button to start a new game session
- **Yellow/Blue Theme** - Matches Subway Surfers branding

---

## 🛠️ Technologies & Dependencies

### Frontend
- **Next.js 13+** - React framework with App Router
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **Next/Image** - Optimized image component

### Backend
- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **UUID** - Generate unique player IDs

---

## 👥 Credits

### Created by Grade 10 Students at Panini School

- **Aadim Gyawali** - Team Leader & Game Controller Development
- **Smile Kalu** - Website Developer (Scoreboard)
- **Riwaj Karki** - Designer

---

## 🎯 How It Integrates with Game Controller

1. **Game Controller** (`../game_controller/`) tracks head movements
2. **Player completes IRL game session** and achieves a score
3. **Score is submitted** to this scoreboard web app via API
4. **Player data stored in MongoDB** - name, age, photo, score
5. **Live leaderboard updates** to show player ranking
6. **Next player can register** and play again

---

## 📖 How to Use

### For Players
1. Visit the website at `/`
2. Click "Continue" on welcome screen
3. Learn about the team on screen1
4. Enter your name and age on screens 2-5
5. Play the head-controlled game
6. View your score on the live leaderboard

### For Administrators
1. Go to `/scoreboard`
2. Edit player scores or info by clicking edit button
3. Delete incorrect entries with delete button
4. Click `+` button to register a new player

---

## 📄 License

Project by Aadim Gyawali, Smile Kalu, and Riwaj Karki for Subway Surfers IRL.

---

## 🎮 Play Subway Surfers IRL!

Control the game with your head using the **Game Controller** (`../game_controller/`), compete with friends, and see who can get the highest score on the leaderboard!

## Screenshots!

<img width="480" height="270" alt="image" src="https://github.com/user-attachments/assets/7199f27a-924a-406a-8a12-e2de25f7f07d" />
<img width="480" height="270" alt="image" src="https://github.com/user-attachments/assets/53430708-c8e5-4091-b4ba-9e50bec1090a" />
<img width="480" height="270" alt="image" src="https://github.com/user-attachments/assets/e40c0809-ac74-453c-b6df-50cd3a0db84b" />
<img width="480" height="270" alt="image" src="https://github.com/user-attachments/assets/f3b57dd9-27c5-4ca7-bdcc-df2447b59f81" />
<img width="480" height="270" alt="image" src="https://github.com/user-attachments/assets/6c231756-28e1-4974-84a5-04dfe949d530" />


**Head up, score high, keep surfing!** 🏄

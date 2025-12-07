# Subway Surfers IRL - Head-Controlled Real-Life Gaming

**Subway Surfers In Real Life** is an innovative hands-free gaming experience where players control the popular Subway Surfers game using only **nose movements**. Move your nose (head) left/right to change lanes, look up to jump, and look down to slide — no controllers needed!

This project combines **real-time head-tracking** with a **live competitive scoreboard**, showcased at the **MidValley 2082 IT Expo** competition.

---

## 🎯 Project Overview

### What Makes It Special?

- 🎮 **Head-Controlled Gaming** - No hands, no controllers, just your head!
- 📊 **Live Leaderboard** - Real-time scoreboard showing all players ranked by score
- 🎥 **MediaPipe Pose Tracking** - Fast, lightweight head detection using AI
- 🌐 **Web-Based Scoreboard** - Modern Next.js application for score management
- 🔗 **Network Support** - Works on same PC or across multiple computers
- 📱 **Responsive Design** - Beautiful UI with smooth animations

---

## 👥 Created By

**Grade 10 Students from Panini School**

| Name | Role |
|------|------|
| **Aadim Gyawali** | Team Leader & Game Controller Developer |
| **Smile Kalu** | Website Developer (Scoreboard) |
| **Riwaj Karki** | UI/UX Designer |

---

## 🎪 MidValley 2082 IT Expo

This project was developed for and showcased at the **MidValley 2082 IT Expo** competition. While we didn't win, the experience of creating this innovative hands-free gaming solution and competing alongside other tech projects was incredibly rewarding. We're proud of what we built and the feedback we received from visitors!

---

## 📦 Project Structure

The Subway Surfers IRL project consists of **two main components**:

### 1. 🎮 **Game Controller** (`/game_controller`)
Python-based head-tracking system that controls the actual Subway Surfers game.

**Features:**
- Real-time head detection using MediaPipe Pose
- Nose position mapping to game lanes and actions
- Fullscreen overlay with HUD
- Network or local mode support
- Auto-reconnect on connection drops

**Quick Start:**
```bash
cd game_controller
pip install -r requirements.txt
python client.py    # On webcam PC
python server.py    # On PC B for playing in 2 computers (optional)
```

📖 **[→ Read Full Game Controller README](./game_controller/README.MD)**

---

### 2. 🌐 **Scoreboard Web** (`/scoreboard-web`)
Next.js web application that displays live player scores and manages leaderboards.

**Features:**
- Real-time leaderboard sorted by score
- Player registration (name, age, photo)
- MongoDB database for score storage
- Edit and delete player records
- Beautiful animated UI with Tailwind CSS
- RESTful API for score management

**Quick Start:**
Create a `.env.local` file with your MongoDB connection string:
```bash
cd scoreboard-web
npm install
npm run dev    # Visit http://localhost:3000
```

📖 **[→ Read Full Scoreboard Web README](./scoreboard-web/README.md)**

---

## 🚀 How It All Works Together

```
┌─────────────────────────────────────────────────────────────┐
│  PLAYER EXPERIENCE                                          │
└─────────────────────────────────────────────────────────────┘

1. Visit Scoreboard Web (http://localhost:3000)
   ↓
2. Register with Name, Age, Photo
   ↓
3. Start Game Controller (python client.py)
   ↓
4. Control Subway Surfers with Head Movement
   ├── Move head left/right → Change lanes
   ├── Look up → Jump
   └── Look down → Slide
   ↓
5. Game ends → Score submitted to database
   ↓
6. Check Live Leaderboard
   └── See your rank among other players!
```

### Data Flow

```
Head Tracking (MediaPipe)
    ↓
Game Control (PyAutoGUI)
    ↓
Subway Surfers Game
    ↓
Score Recorded
    ↓
API Submission (/api/userData)
    ↓
MongoDB Storage
    ↓
Live Leaderboard Update
```

---

## ⚙️ System Requirements

### For Game Controller
- **Python 3.12** (recommended)
- **Webcam** for head tracking
- **PC** with Subway Surfers installed
- Libraries: `opencv-python`, `mediapipe`, `pyautogui`

```terminal
cd game_controller
pip install -r requirements.txt
```

### For Scoreboard Web
- **Node.js 16+** with npm
- **MongoDB** (local or cloud via Atlas)

---

## 🎮 Controls & Actions

| Head Movement | Game Action |
|---------------|-------------|
| Move head **Left** | Change to left lane (← Arrow) |
| Move head **Right** | Change to right lane (→ Arrow) |
| Look **Up** | Jump (↑ Arrow) |
| Look **Down** | Slide/Roll (↓ Arrow) |
| Press **P** | Pause/Unpause tracking |
| Press **Q** | Quit program |

---

## 📊 Screenshots

### Game Controller - Head Tracking Interface
<img width="480" height="270" alt="Head Tracking with MediaPipe" src="https://github.com/user-attachments/assets/4f89cbc9-894d-4c5b-9f2c-2bf855e23c80" />

### Scoreboard Web - Welcome Screen
<img width="480" height="270" alt="Welcome Screen" src="https://github.com/user-attachments/assets/7199f27a-924a-406a-8a12-e2de25f7f07d" />

### Scoreboard Web - Team Introduction
<img width="480" height="270" alt="Team Introduction" src="https://github.com/user-attachments/assets/53430708-c8e5-4091-b4ba-9e50bec1090a" />

### Scoreboard Web - Player Registration
<img width="480" height="270" alt="Player Registration" src="https://github.com/user-attachments/assets/e40c0809-ac74-453c-b6df-50cd3a0db84b" />

### Scoreboard Web - Live Leaderboard
<img width="480" height="270" alt="Live Leaderboard" src="https://github.com/user-attachments/assets/f3b57dd9-27c5-4ca7-bdcc-df2447b59f81" />

### Scoreboard Web - Score Editing
<img width="480" height="270" alt="Score Management" src="https://github.com/user-attachments/assets/6c231756-28e1-4974-84a5-04dfe949d530" />

---

## 🏃‍♂️ Quick Start Guide

#### Step 1: Set Up Scoreboard Web

📖 **[→ Read Full Scoreboard Website README](./scoreboard-web/README.md)**

#### Step 2: Register a Player
1. Click "Continue" on welcome screen
2. Go through team introduction
3. Enter your name and age
4. Take a photo (optional)

#### Step 3: Set Up Game Controller

📖 **[→ Read Full Python Controller README](./game_controller/README.md)**

#### Step 4: Play!
1. Start Subway Surfers game
2. Keep game window focused
3. Move your head to control the game
4. After playing, check the scoreboard for your score

---
## 🛠️ Technology Stack

### Frontend
- **Next.js 13+** - React framework with App Router
- **React** - UI library
- **Tailwind CSS** - Responsive styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP requests

### Backend
- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** - Database ODM
- **Next.js API Routes** - Serverless backend

### Game Control
- **Python 3.12** - Programming language
- **MediaPipe Pose** - AI-powered pose detection
- **OpenCV** - Computer vision library
- **PyAutoGUI** - Keyboard/mouse simulation

---

## 📚 Detailed Documentation

For more detailed information about each component:

### Game Controller Documentation
Head to [`/game_controller/README.MD`](./game_controller/README.MD) to learn about:
- How MediaPipe head tracking works
- Configuration options
- Network setup instructions
- Troubleshooting guide
- Performance tuning tips

### Scoreboard Web Documentation
Head to [`/scoreboard-web/README.md`](./scoreboard-web/README.md) to learn about:
- API endpoint documentation
- Database schema details
- State management with React Context
- Deployment instructions
- Feature descriptions

---

## 🎮 How to Play

1. **Visit the Scoreboard**
   - Open `http://localhost:3000`

2. **Create Your Profile**
   - Enter your name and age
   - Optionally upload a photo

3. **Start the Game Controller**
   - Run `python client.py` on your PC

4. **Control with Your Head**
   - Move head left/right to dodge obstacles
   - Look up to jump over trains
   - Look down to slide under bars

5. **Check Your Score**
   - Your score automatically appears on the leaderboard
   - Compete with other players!

---

## 📈 Features Showcase

✅ **Hands-Free Gaming** - Complete control without touching anything  
✅ **Real-Time Head Tracking** - Smooth, low-latency detection  
✅ **Live Scoreboard** - Instant leaderboard updates  
✅ **Player Management** - Register, edit, and track players  
✅ **Photo Support** - Store player photos with scores  
✅ **Network Support** - Play on same PC or across network  
✅ **Beautiful UI** - Modern, responsive design  
✅ **Auto-Reconnect** - Handles network drops gracefully  
✅ **HUD Overlay** - Real-time feedback during gameplay  

---

## 🐛 Troubleshooting

### Game Controller Issues
- **Poor head tracking?** Improve lighting, sit 50-80cm from camera
- **No keypresses?** Check Windows Firewall, ensure game window is focused
- **Network lag?** Use Ethernet, check firewall rules for port 9999

### Scoreboard Web Issues
- **Database connection fails?** Verify MONGODB_URI in .env.local
- **Scores not updating?** Check browser console for API errors
- **Build errors?** Delete `node_modules` and `.next`, run `npm install` again

---

## 📝 License & Credits

**Created by:**
- Aadim Gyawali
- Smile Kalu
- Riwaj Karki

**For:** MidValley 2082 IT Expo Competition

**Built with:**
- MediaPipe & OpenCV
- Next.js & React
- MongoDB & Mongoose
- PyAutoGUI

---

## 🎉 Project Highlights

### Innovation
✨ Hands-free gaming using only head movements — no controllers needed!

### Accessibility
♿ Opens gaming to players with mobility limitations

### Fun Factor
🎮 Unique, social gaming experience perfect for events and exhibitions

### Technical Achievement
🔧 Combines ML (MediaPipe), backend (MongoDB), and frontend (Next.js) technologies

---

## 📞 Connect & Contribute

Found a bug? Have an idea for improvement? Feel free to:
- Open an issue
- Submit a pull request
- Share feedback

---

## 🏆 The Journey

We developed Subway Surfers IRL as a passion project to showcase innovative uses of technology. While we didn't win at the MidValley 2082 IT Expo, the experience of building something unique and receiving feedback from the tech community was invaluable. 

Every line of code, every design decision, and every test drive taught us something new about software development, teamwork, and creative problem-solving.

---

## 🎮 Ready to Play?

**Start with the Game Controller:**
- [Game Controller README](./game_controller/README.MD)

**Then Set Up the Scoreboard:**
- [Scoreboard Web README](./scoreboard-web/README.md)

---

**Head up, score high, keep surfing!** 🏄

Control Subway Surfers with your face. Compete for the highest score. Have fun!

---

*Last Updated: December 2025*

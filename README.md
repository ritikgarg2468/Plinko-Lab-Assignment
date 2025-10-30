# 🎯 Plinko Lab – Full Stack Intern Assignment

### 👨‍💻 Developed by: Ritik Garg  
Full Stack Developer | MERN + DevOps | GitHub: [@ritikgarg2468](https://github.com/ritikgarg2468)

---

## 🧠 Project Overview

**Plinko Lab** is a full-stack web application that simulates a **provably fair Plinko game** using:
- 🎨 Frontend: React (Vite + TypeScript + TailwindCSS)
- ⚙️ Backend: Node.js (Express + TypeScript)
- 🗄️ Database: PostgreSQL via Neon + Prisma ORM

The app implements **commit–reveal fairness logic**, allowing each game round to be **verified cryptographically** for transparency.

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React + Vite + TypeScript + TailwindCSS |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Testing | Axios (manual script) |
| Deployment | Render (Backend) + Vercel (Frontend) |

---

## 🚀 Features

✅ Cryptographically fair commit–reveal mechanism  
✅ Interactive Plinko board with animation  
✅ Secure API with deterministic results  
✅ Neon-hosted persistent PostgreSQL database  
✅ Fully responsive UI built with TailwindCSS  
✅ Manual API test verification script included  

---

## 🧱 Folder Structure

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- PostgreSQL database (or use Neon free tier)

### Environment Variables

#### Server (.env)
```
DATABASE_URL=postgresql://user:pass@host:5432/db
ALLOWED_ORIGINS=http://localhost:5173
```

#### Client (.env)
```
VITE_API_BASE=http://localhost:3000/api
```

### Running Locally

1. Clone the repository
```bash
git clone <repository-url>
cd pinolab
```

2. Install dependencies
```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

3. Start the development servers
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

---

## 🏗️ Architecture Overview

The application follows a client-server architecture with cryptographic fairness verification:

1. **Frontend (React + TypeScript)**
	- SPA built with Vite for optimal performance
	- Interactive Plinko board using custom animation logic
	- TailwindCSS for responsive styling
	- API integration with commit-reveal pattern

2. **Backend (Node.js + Express)**
	- RESTful API with TypeScript
	- Prisma ORM for type-safe database access
	- Cryptographic fairness implementation
	- CORS and security middleware

3. **Database (PostgreSQL)**
	- Stores game rounds and results
	- Maintains cryptographic proofs
	- Hosted on Neon for scalability

---

## 🎲 Fairness Specification

### Commit-Reveal Protocol
1. Server generates a random nonce for each round
2. Client receives roundId + commitHash (SHA-256 of nonce)
3. Client submits drop column choice
4. Server reveals nonce, allowing result verification

### PRNG Implementation
- Uses XorShift32 seeded with first 4 bytes of combined hash
- Combined hash = SHA-256(nonce + dropColumn)
- Generates deterministic, uniform random numbers

### Peg Map & Path Rules
- Each peg has a base 50% probability
- Small variance (±10%) added per peg for uniqueness
- Drop column position affects probabilities slightly (±1% per column from center)
- All biases are deterministic based on seed
- Final path follows peg probabilities exactly

### Payout Structure
- 13 bins with multipliers: 8x, 4x, 2x, 1x, 1x, 1x, 1x, 1x, 1x, 1x, 2x, 4x, 8x
- Payouts are symmetric and deterministic

---

## 🤖 AI Usage

### Key Areas Where AI Assisted
1. **Initial Project Structure**
	- Used GitHub Copilot to scaffold basic Express + React setup
	- Modified and cleaned up generated boilerplate significantly

2. **Animation Logic**
	- Used ChatGPT to help with ball physics calculations
	- Heavily customized the implementation for smoothness

3. **Crypto Implementation**
	- Referenced Copilot suggestions for SHA-256 usage
	- Manually verified all cryptographic functions

### What I Changed/Kept
- Kept: Basic project structure suggestions, routing patterns
- Modified: All crypto/fairness logic to ensure correctness
- Rewrote: Animation system, state management, API design

---

## ⏱️ Time Log

Total time: ~20 hours

| Task | Time |
|------|------|
| Initial Setup & Research | 3h |
| Core Game Logic | 4h |
| Frontend UI/UX | 6h |
| Fairness Implementation | 4h |
| Testing & Debugging | 2h |
| Deployment & Documentation | 1h |

### Future Improvements
1. Add unit tests for core game logic
2. Implement user accounts and session management
3. Add more game customization options
4. Create a full test suite for fairness verification
5. Add real-time multiplayer features

---

## 🔗 Links

- Live App: https://plinko-lab-assignment.vercel.app/
- Verifier Page: https://plinko-lab-assignment.vercel.app/verify
- Example Round (permalink): https://plinko-lab-assignment.vercel.app/verify?roundId=example123

---


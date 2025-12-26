# 🚀 API Routes Documentation

## Base URL
`http://localhost:3000/api`

---

## Endpoints

### 📊 User Stats
**GET** `/api/user/stats`

Returns user practice statistics and progress.

**Response:**
```json
{
  "dailyGoal": 45,
  "dailyProgress": 32,
  "totalPractice": 127,
  "streak": 12,
  "technicalSkills": {
    "chordTransitions": 78,
    "scaleSpeed": 65,
    "rhythmAccuracy": 82,
    "fingerIndependence": 71
  },
  "recentSessions": [
    { "date": "2025-12-24", "duration": 45, "focus": "Scales" }
  ]
}
```

---

### 🎵 Songs Library
**GET** `/api/songs`

Returns user's song library.

**Response:**
```json
[
  {
    "id": "1",
    "title": "Wonderwall",
    "artist": "Oasis",
    "difficulty": "Beginner",
    "genre": "Rock",
    "progress": 85,
    "lastPracticed": "2025-12-24"
  }
]
```

**POST** `/api/songs`

Add a new song to library.

**Request Body:**
```json
{
  "title": "Song Title",
  "artist": "Artist Name",
  "difficulty": "Beginner|Intermediate|Advanced",
  "genre": "Rock"
}
```

---

### 🎼 Scales
**GET** `/api/scales`

Returns all available scales (from hardcoded music library).

**Response:**
```json
[
  {
    "id": "minor-pentatonic",
    "name": "Minor Pentatonic",
    "intervals": [0, 3, 5, 7, 10],
    "formula": "m3-W-W-m3-W",
    "category": "Pentatonic"
  }
]
```

---

### ⭐ Favorites
**GET** `/api/favorites`

Returns user's favorite scales.

**POST** `/api/favorites`

Add a scale to favorites.

**Request Body:**
```json
{
  "scaleId": "minor-pentatonic",
  "key": "A"
}
```

**DELETE** `/api/favorites?id={favoriteId}`

Remove a favorite.

---

### 📝 Practice Sessions
**GET** `/api/practice`

Returns practice session history.

**Response:**
```json
[
  {
    "id": "1",
    "date": "2025-12-24",
    "duration": 45,
    "focus": "A Minor Pentatonic - Box 1",
    "notes": "Worked on string transitions",
    "bpm": 80,
    "exercises": ["Scale runs", "Pattern practice"]
  }
]
```

**POST** `/api/practice`

Log a new practice session.

**Request Body:**
```json
{
  "duration": 45,
  "focus": "A Minor Pentatonic",
  "notes": "Great progress!",
  "bpm": 80,
  "exercises": ["Scales", "Arpeggios"]
}
```

---

## Usage Example

```typescript
// Fetch user stats
const response = await fetch('/api/user/stats');
const stats = await response.json();

// Add a song
await fetch('/api/songs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Blackbird',
    artist: 'The Beatles',
    difficulty: 'Intermediate',
    genre: 'Folk'
  })
});
```

---

## Notes

- ✅ All endpoints return mock data currently
- ⏳ Will be connected to PostgreSQL database after auth is implemented
- 🔒 Most endpoints will require authentication in production
- 📊 Scales endpoint uses hardcoded data (no DB needed)

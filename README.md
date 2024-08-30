# Trip Planner App

An intelligent web application that generates personalized 3-day trip itineraries based on user preferences, powered by AI and interactive mapping.

# 🚀 Features

- **AI-Powered Trip Planning:**  Utilizes the Gemini 1.5 Flash model to create detailed 3-day trip itineraries.
- **Customizable Preferences:** Users can select their desired country and mode of transportation (car or bicycle).
- **Interactive Map:** Visualizes the trip using Leaflet.js, an open-source JavaScript library for mobile-friendly interactive maps.
- **Image Generation:** Employs Stable Horde to generate visual representations of the trip.
- **Data Persistence:** Stores trip data using MongoDB Atlas.

# 🛠️ Tech Stack
## Backend

- **Express.js**
- **MVC architecture (Routes, Controllers, Services)**
- **Gemini 1.5 Flash API for AI-powered trip planning**
- **Stable Horde API for image generation**
- **MongoDB Atlas for data storage**

## Frontend

- **React**
- **Chakra UI for styling**
- **Leaflet.js for map integration**

# 📦 Installation

1 Clone the repository:
   ```bash
git clone https://github.com/yourusername/trip-planner-app.git
cd trip-planner-app
   ```

2 Install dependencies for both server and client:
   ```bash
cd server
npm install

# Install frontend dependencies

cd ../client
npm install
   ```

3 Set up environment variables:
Create a .env file in the server directory with the following variables:
   ```bash
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINIs_API_KEY=your_gemini_api_key
stablehorde_API_KEY=your_stable_horde_api_key
   ```

4 Start the backend server:
   ```bash
cd server
npm start
   ```

Start the frontend development server:
   ```bash
cd client
npm start
 ```

Open your browser and navigate to http://localhost:5173 to use the application.


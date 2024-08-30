#Trip Planner App

An intelligent web application that generates personalized 3-day trip itineraries based on user preferences, powered by AI and interactive mapping.

#🚀 Features

AI-Powered Trip Planning: Utilizes the Gemini 1.5 Flash model to create detailed 3-day trip itineraries.
Customizable Preferences: Users can select their desired country and mode of transportation (car or bicycle).
Interactive Map: Visualizes the trip using Leaflet.js, an open-source JavaScript library for mobile-friendly interactive maps.
Image Generation: Employs Stable Horde to generate visual representations of the trip.
Data Persistence: Stores trip data using MongoDB Atlas.

#🛠️ Tech Stack
Backend

Express.js
MVC architecture (Routes, Controllers, Services)
Gemini 1.5 Flash API for AI-powered trip planning
Stable Horde API for image generation
MongoDB Atlas for data storage

Frontend

React
Chakra UI for styling
Leaflet.js for map integration

📦 Installation

Clone the repository:
bashCopygit clone https://github.com/yourusername/trip-planner-app.git
cd trip-planner-app

Install dependencies for both backend and frontend:
bashCopy# Install backend dependencies
cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install

Set up environment variables:
Create a .env file in the backend directory with the following variables:
plaintextCopyPORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
STABLE_HORDE_API_KEY=your_stable_horde_api_key

Start the backend server:
bashCopycd backend
npm start

Start the frontend development server:
bashCopycd frontend
npm start

Open your browser and navigate to http://localhost:3000 to use the application.

🚗 Usage

Select a country from the dropdown menu.
Choose your preferred mode of transportation (car or bicycle).
Click "Plan My Trip" to generate your personalized 3-day itinerary.
Explore the generated trip details and the interactive map.
View AI-generated images representing highlights of your trip.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.
🙏 Acknowledgments

Gemini 1.5 Flash for AI-powered trip planning
Stable Horde for image generation
Leaflet.js for map integration
MongoDB Atlas for database services
Chakra UI for frontend styling

🚧 Future Improvements

Add user authentication and profiles
Implement trip saving and sharing functionality
Expand to support longer trip durations
Integrate real-time weather data for trip planning

❓ FAQ
Q: Can I use this app for planning trips outside of the supported countries?
A: Currently, the app supports a limited number of countries. We're working on expanding our coverage.
Q: Is the app available as a mobile application?
A: Not yet, but we're considering developing mobile versions for iOS and Android in the future.

For any additional questions or support, please open an issue in this repository.

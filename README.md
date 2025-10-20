
#  AI Tutor for Kids

An interactive **AI-powered learning app for kids** built with **React Native + Expo**.  
The app uses **fun quizzes, playful animations, voice, and camera interactions** to make learning engaging and enjoyable.

---

##  Current Features

###  Splash / Loading Screen
- Animated intro with logo and app name.

###  Home Screen
- Clean dashboard with quick access buttons:
  -  **Camera Learning Mode** → take pictures to learn about objects  
  -  **Play Quiz** → different categories of questions  
  -  **My Learning** → saved progress *(coming soon)*

###  Camera Screen
- Opens device camera (using `expo-camera`).  
- **Planned upgrade**: AI object recognition (kids take a picture and AI explains in kid-friendly language).  

###  Quiz Module
- **Quiz Selection Screen** with multiple categories:  
  -  Animals  
  -  Nature  
  -  Colors  
  -  Food  
  -  Geography  
  -  History  
  -  Sports  
  -  Technology  
  -  Artists  
  -  Cars  
  -  Politics  

- **Advanced Play Quiz Screen**:
  - Multiple choice quizzes with beautiful design  
  - Animated transitions between questions  
  - ✅ / ❌ feedback animations  
  - Score tracking with stars and trophies  
  - Lives system (3 hearts)  
  - Progress bar with question counter  

---

## Tech Stack

- **React Native** (Expo)  
- **Expo Router** (file-based navigation)  
- **TypeScript**  
- **react-native-progress** (progress bar)  
- **@expo/vector-icons** (icons)  
- **React Native Animated API** for effects (fade, scale, shake, sparkle)  

---

## 🛠 Installation & Running

1. Clone the repo:
   ```bash
   git clone https://github.com/ramadanrexhepi/ai-tutor-kids.git
   cd ai-tutor-kids
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npx expo start
   ```

4. Open in:
   - Expo Go app (iOS / Android)  
   - iOS Simulator  
   - Android Emulator  

---

##  Roadmap / Future Plans

###  Near-Term
- Add **AI-powered quiz generation** (OpenAI integration).  
- Save quiz progress and learning history to **AsyncStorage / SQLite**.  
- Add **category-specific icons & animations**.  

###  Mid-Term
- **Voice interaction**: kids can answer by speaking.  
- **Camera AI Tutor**: take a picture of an object, and AI generates a fun fact + quiz about it.  
- **Achievements system**: badges, stars, streaks.  

###  Long-Term
- Multi-language support (English, Albanian, Macedonian, etc.).  
- Parent dashboard (track child progress).  
- Cloud sync (Firebase or Supabase backend).  
- Publish on **Google Play Store** and **Apple App Store**.  

---

##  License

MIT License.  
Built with pride using React Native & Expo.

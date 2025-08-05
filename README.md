# 📈 Crypto Price Tracker (React Native CLI)

A **React Native CLI** mobile app that connects to the **Binance WebSocket API** and displays **live cryptocurrency price updates** for popular trading pairs such as BTC/USDT, ETH/USDT, and more.

## ✨ Features

- 🔄 Real-time price updates via Binance WebSocket
- 📊 Displays price, percentage change, and last updated time
- 🟢 Connection status indicator (Connected, Connecting, Disconnected)
- 🎨 Color-coded price change (green = up, red = down)
- 📱 Clean card-based UI using `FlatList`

## 🛠️ Tech Stack

- React Native (CLI)
- TypeScript
- WebSocket API
- Binance 24hr Ticker Stream
- Native components (`SafeAreaView`, `FlatList`, `ActivityIndicator`, etc.)

## 🔌 Binance WebSocket Info

The app connects to: wss://stream.binance.com:9443/ws


## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/IshrarAhmed/react-native-binance-test-app.git
cd react-native-binance-test-app
npm install
npx react-native run-android
## App ScreenShort
<img width="1080" height="2400" alt="SplashScreen" src="https://github.com/user-attachments/assets/c65d4fb2-3f75-49bf-889b-a45de8284e2b" />
<img width="1080" height="2400" alt="loaderScreen" src="https://github.com/user-attachments/assets/0b19f9fd-1341-418b-a4ce-43a5aef9ae60" />
<img width="1080" height="2400" alt="listingScreen" src="https://github.com/user-attachments/assets/675abafa-3937-4333-bd5c-3140fed42f10" />
## 📸 App Screenshots

<img src="./assets/screenshots/splash.png" width="300" />
<img src="./assets/screenshots/loader.png" width="300" />
<img src="./assets/screenshots/listing.png" width="300" />


## 📱 App Screenshots

### 🏠 Home Screen
![App Screenshot](https://raw.githubusercontent.com/IshrarAhmed/react-native-binance-test-app/listingScreen.png)

🧠 How It Works
WebSocket connects to Binance and listens for 24hr ticker updates.

When a price update arrives, the app updates the relevant card in real time.

Prices are compared to their previous values to show the % change.

The UI reflects connection status and last updated time.

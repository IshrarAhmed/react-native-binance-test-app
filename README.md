📈 Crypto Price Tracker (React Native CLI)
This is a React Native CLI app that connects to the Binance WebSocket API and displays real-time cryptocurrency price updates for popular trading pairs like BTC/USDT, ETH/USDT, and more.

The app shows:

Live price updates

Color-coded percentage change (green for positive, red for negative)

Time of last update

Connection status (Connected, Connecting..., Disconnected)

🚀 Features
✅ Real-time WebSocket connection to Binance

✅ Tracks popular crypto pairs (BTC, ETH, BNB, etc.)

✅ Displays price, time, and % change

✅ Status indicator for WebSocket connection

✅ Clean, card-based UI using FlatList

🛠️ Technologies Used
React Native (CLI)

TypeScript

WebSocket API

Binance 24hr Ticker Stream

FlatList & StyleSheet

SafeAreaView, ActivityIndicator, StatusBar

📦 Installation
Clone the repository and install the dependencies.

git clone https://github.com/IshrarAhmed/react-native-binance-test-app.git
cd react-native-binance-test-app
npm install
📱 Running the App (Android)
Make sure you have an Android emulator running or a device connected.


npx react-native run-android
🔌 Binance WebSocket Details
The app connects to Binance's public WebSocket endpoint:



wss://stream.binance.com:9443/ws
It subscribes to the @ticker stream for the following symbols:


btcusdt, ethusdt, bnbusdt, solusdt, xrpusdt, adausdt, dogeusdt, dotusdt, maticusdt
📸 Screenshots (optional)
(Add screenshots of the app UI here if desired)

🧠 How It Works
On launch, the WebSocket connects to Binance and subscribes to the ticker stream.

Each message updates the corresponding price card.

Prices are color-coded based on their change from the previous value.

A loading spinner is shown until the WebSocket is connected.


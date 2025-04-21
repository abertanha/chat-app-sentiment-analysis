# Chat App with Sentiment Analysis

A real-time chat application with integrated sentiment analysis, built with Next.js, React, and Sentiment package.

## 📋 About the Project

This project implements a real-time chat application that analyzes the sentiment of messages sent by users. Each message is processed by the [Sentiment analysis](https://github.com/thisandagain/sentiment), which assigns a sentiment score (positive, negative, or neutral).

Key features include:
- Real-time chat using [Pusher](https://pusher.com/)
- Sentiment analysis with sentiment.
- Responsive interface built with Next.js and bootstrap 4.0
- Sentiment data visualization

## 🚀 Technologies Used

- **Frontend**: Next.js, React, bootstrap 4.0
- **Backend**: Node.js, Express, Pusher

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (v18+)
- React, Next, Express
- npm or yarn

### Pusher API Setup
1. Create an account on [Pusher](https://pusher.com/)
2. Create an App
3. Copy your API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abertanha/chat-app-sentiment-analysis.git
cd chat-app-sentiment-analysis
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env.local` file in the project root with the following variables:
```
PUSHER_APP_ID=YOUR_APP_ID
PUSHER_APP_KEY=YOUR_APP_KEY
PUSHER_APP_SECRET=YOUR_APP_SECRET
PUSHER_APP_CLUSTER=YOUR_APP_CLUSTER
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Access http://localhost:3000 in your browser

## 🔍 Features

### Real-time Chat
- Instant communication between users
- User join/leave notifications
- Message history during the session

### Sentiment Analysis
- Processing of each message by sentiment
- Sentiment classification: positive (green), neutral (gray), negative (red)
- Sentiment score displayed alongside messages through an emoji.


## 📈 Future Improvements

- User authentication and data persistence
- Private chat rooms
- Admin interface
- Mobile version with React Native

## 📝 Credits

This project was inspired by the tutorial [Build a Chat App with Sentiment Analysis using Next.js](https://codeburst.io/build-a-chat-app-with-sentiment-analysis-using-next-js-c43ebf3ea643).

## 📜 License

[MIT](LICENSE)

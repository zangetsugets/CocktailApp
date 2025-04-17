# Cocktail Explorer

A Next.js application that displays cocktail information using the CocktailDB API with Redis caching.

## Live Demo

Check out the live demo: [Cocktail Explorer](https://cocktail-app-roan.vercel.app/)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables by creating a `.env.local` file:
```env
REDIS_URL=rediss://username:password@your-redis-host:port
```

## Running Locally

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## Redis Implementation

This app uses Redis for caching API responses. The caching layer:
- Stores cocktail data for 90 seconds (TTL)
- Reduces load on the CocktailDB API
- Improves response times for frequently requested data

The 90-second TTL (Time To Live) provides:
- Fresh data updates every 1.5 minutes
- Significant API call reduction during high-traffic periods
- Balance between data freshness and performance

### Redis Setup

1. Create a Redis instance (e.g., using [Upstash](https://upstash.com) or [Redis Cloud](https://redis.com))
2. Copy your Redis URL to the `.env.local` file
3. The app will automatically handle caching of API responses

## Future Growth Plans

If this app needs to grow, here's how we can make it better:

1. **Better Data Loading**
   - Save frequently used information for quick access
   - Show results in smaller chunks instead of all at once
   - Keep data fresh while being efficient

2. **Smoother Experience**
   - Make images load faster
   - Show results as users type in the search box
   - Make the app feel more responsive

3. **Handling More Users**
   - Spread the app across different locations for faster access
   - Make sure the app stays fast even with lots of users
   - Keep everything running smoothly during busy times

## Deployment

The application is deployed on Vercel and can be accessed at:
https://cocktail-app-roan.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




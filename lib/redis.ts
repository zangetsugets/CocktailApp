import Redis from 'ioredis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not defined');
}

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 5,
  retryStrategy(times) {
    const delay = Math.min(times * 100, 3000);
    return delay;
  },
  reconnectOnError(err) {
    const targetError = 'READONLY';
    if (err.message.includes(targetError)) {
      return true;
    }
    return false;
  },
  enableTLS: true,
  enableReadyCheck: true,
  connectTimeout: 20000,
  keepAlive: 30000,
  retries: 10,
  autoResubscribe: true,
  autoResendUnfulfilledCommands: true,
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
  if (error.code === 'ECONNRESET') {
    console.log('Attempting to reconnect...');
    redis.connect();
  }
});

redis.on('connect', () => {
  console.log('Successfully connected to Redis');
});

export async function getCachedData<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCachedData(key: string, data: any, ttl: number = 90): Promise<void> {
  await redis.setex(key, ttl, JSON.stringify(data));
}

export default redis;

import mongoose from 'mongoose';

/**
 * MongoDB Database Configuration
 * 
 * Configures connection to octofit_db using Mongoose
 */

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Connect to MongoDB using Mongoose
 * @returns Promise that resolves when connected
 */
export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB at:', MONGODB_URI);
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectFromDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('✗ Failed to disconnect from MongoDB:', error);
    throw error;
  }
}

export default {
  MONGODB_URI,
  connectToDatabase,
  disconnectFromDatabase,
};

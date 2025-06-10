import 'dotenv/config';

export default {
  expo: {
    name: 'expense-scanner',
    slug: 'expense-scanner',
    version: '1.0.0',
    scheme: 'expense-scanner',
    extra: {
      OCR_API_KEY: process.env.OCR_API_KEY,
      GOOGLE_SHEETS_WEBHOOK_URL: process.env.GOOGLE_SHEETS_WEBHOOK_URL,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,      
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
};
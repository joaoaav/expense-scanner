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
    },
  },
};
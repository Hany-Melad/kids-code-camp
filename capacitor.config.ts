
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c3a79c41e7e24e83a65a42f2dfb6cdf1',
  appName: 'kids-code-camp',
  webDir: 'dist',
  server: {
    url: 'https://c3a79c41-e7e2-4e83-a65a-42f2dfb6cdf1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#F97316",
      showSpinner: true,
      spinnerColor: "#FFFFFF",
    },
  },
};

export default config;

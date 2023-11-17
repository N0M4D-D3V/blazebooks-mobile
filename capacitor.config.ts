import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.blazebooks.app',
  appName: 'blazebooks',
  webDir: 'dist/blazebooks',
  server: {
    androidScheme: 'https'
  }
};

export default config;

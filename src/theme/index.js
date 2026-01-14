import { MD3LightTheme, configureFonts } from 'react-native-paper';

// Premium color palette
const colors = {
  primary: '#4F46E5', // Indigo 600
  onPrimary: '#FFFFFF',
  primaryContainer: '#E0E7FF',
  secondary: '#10B981', // Emerald 500
  onSecondary: '#FFFFFF',
  secondaryContainer: '#D1FAE5',
  tertiary: '#F59E0B', // Amber 500
  background: '#F9FAFB', // Gray 50
  surface: '#FFFFFF',
  surfaceVariant: '#F3F4F6',
  text: '#1F2937', // Gray 800
  outline: '#E5E7EB',
  error: '#EF4444',
  elevation: {
    level0: 'transparent',
    level1: '#FFFFFF',
    level2: '#F9FAFB',
    level3: '#F3F4F6',
    level4: '#E5E7EB',
    level5: '#D1D5DB',
  },
};

const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 64,
  },
  // ... can customize further
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  roundness: 12, // More rounded corners for modern feel
};

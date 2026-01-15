import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';

// Indian-influenced Palette
const pallette = {
  primary: '#4F46E5',    // Indigo (Deep Blue) - Trust
  secondary: '#FF9933',  // Saffron (Orange) - Energy
  tertiary: '#138808',   // India Green - Growth
  background: '#F9FAFB', // Off-white/Gray
  surface: '#FFFFFF',
  error: '#DC2626',
};

const fontConfig = {
  fontFamily: 'Inter_400Regular',
  displaySmall: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    lineHeight: 44,
  },
  displayMedium: {
    fontFamily: 'Inter_700Bold',
    fontSize: 45,
    lineHeight: 52,
  },
  headlineMedium: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 22,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodyLarge: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  labelLarge: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
};

export const theme = {
  ...DefaultTheme,
  roundness: 16, // Softer corners
  colors: {
    ...DefaultTheme.colors,
    primary: pallette.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: '#E0E7FF',
    onPrimaryContainer: '#3730A3',

    secondary: pallette.secondary,
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFEDD5', // Light Orange
    onSecondaryContainer: '#9A3412',

    tertiary: pallette.tertiary,
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#DCFCE7', // Light Green
    onTertiaryContainer: '#14532D',

    background: pallette.background,
    surface: pallette.surface,
    surfaceVariant: '#F3F4F6',
    onSurface: '#1F2937',

    elevation: {
      level0: 'transparent',
      level1: '#F3F4F6',
      level2: '#FFFFFF',
      level3: '#FFFFFF',
      level4: '#FFFFFF',
      level5: '#FFFFFF',
    },
  },
  fonts: configureFonts({ config: fontConfig }),
};

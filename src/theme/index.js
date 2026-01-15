import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

// --- Palettes ---

// Light Mode Palette (Indo-Modern)
const lightPalette = {
  primary: '#4F46E5',    // Indigo (Deep Blue) - Trust
  onPrimary: '#FFFFFF',
  primaryContainer: '#E0E7FF',
  onPrimaryContainer: '#3730A3',

  secondary: '#FF9933',  // Saffron (Orange) - Energy
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FFEDD5',
  onSecondaryContainer: '#9A3412',

  tertiary: '#138808',   // India Green - Growth
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#DCFCE7',
  onTertiaryContainer: '#14532D',

  background: '#F9FAFB', // Off-white/Gray
  surface: '#FFFFFF',
  surfaceVariant: '#F3F4F6',
  onSurface: '#1F2937',
  onSurfaceVariant: '#4B5563',
  error: '#DC2626',
};

// Dark Mode Palette (Deep Night)
const darkPalette = {
  primary: '#818CF8',    // Lighter Indigo for dark mode
  onPrimary: '#312E81',
  primaryContainer: '#3730A3',
  onPrimaryContainer: '#E0E7FF',

  secondary: '#FFB770',  // Pastel Saffron
  onSecondary: '#4D2C00',
  secondaryContainer: '#9A3412',
  onSecondaryContainer: '#FFEDD5',

  tertiary: '#4ADE80',   // Pastel Green
  onTertiary: '#003909',
  tertiaryContainer: '#14532D',
  onTertiaryContainer: '#DCFCE7',

  background: '#111827', // Deep Gray/Black
  surface: '#1F2937',    // Slightly lighter gray
  surfaceVariant: '#374151',
  onSurface: '#F9FAFB',
  onSurfaceVariant: '#D1D5DB',
  error: '#EF4444',
};

// --- Typography ---

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

// --- Extended Design Tokens ---

export const gradients = {
  joy: ['#FF9933', '#EC4899'],   // Saffron to Pink
  focus: ['#4F46E5', '#7C3AED'], // Indigo to Violet
  success: ['#138808', '#34D399'], // India Green to Emerald
};

// --- Theme Exports ---

const baseThemeConfig = {
  roundness: 16,
  animation: {
    scale: 1.0,
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  ...baseThemeConfig,
  colors: {
    ...MD3LightTheme.colors,
    ...lightPalette,
    // Custom elevation colors if needed
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

export const darkTheme = {
  ...MD3DarkTheme,
  ...baseThemeConfig,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkPalette,
    elevation: {
      level0: 'transparent',
      level1: '#1F2937',
      level2: '#374151',
      level3: '#374151',
      level4: '#4B5563',
      level5: '#4B5563',
    },
  },
  fonts: configureFonts({ config: fontConfig }),
};

// Default export provided for backward compatibility, but prefer named exports
export const theme = lightTheme;

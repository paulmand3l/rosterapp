import { createTheme } from "@shopify/restyle";

// Base palette for reference
const palette = {
  coral: "#FF6B6B",
  purple: "#8854D0",
  purpleLight: "#BB86FC",
  mint: "#A8E6CF",
  charcoal: "#333333",
  cream: "#FAF3DD",
  neonYellow: "#FFFD82",
  bubblegumPink: "#F45B69",
  white: "#FFFFFF",
  black: "#000000",
  grey: "#9E9E9E",
  greyLight: "#F5F5F5",
  error: "#B00020",
  success: "#00C853",
  transparent: "transparent",
};

// Default theme (original theme from theme.ts)
export const defaultTheme = createTheme({
  colors: {
    primary: palette.coral,
    primaryLight: palette.purpleLight,
    secondary: palette.purple,
    accent: palette.mint,
    background: palette.white,
    cardBackground: palette.greyLight,
    foreground: palette.charcoal,
    text: palette.charcoal,
    textSecondary: palette.grey,
    textLight: palette.cream,
    neonAccent: palette.neonYellow,
    highlight: palette.bubblegumPink,
    error: palette.error,
    success: palette.success,
    white: palette.white,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadii: {
    none: 0,
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  radius: {
    none: 0,
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  textVariants: {
    defaults: {
      fontFamily: "System",
      fontSize: 16,
      lineHeight: 24,
      color: "text",
    },
    header: {
      fontFamily: "System",
      fontSize: 34,
      lineHeight: 42.5,
      color: "text",
    },
    subheader: {
      fontFamily: "System",
      fontSize: 24,
      lineHeight: 30,
      color: "text",
    },
    body: {
      fontFamily: "System",
      fontSize: 16,
      lineHeight: 24,
      color: "text",
    },
    caption: {
      fontFamily: "System",
      fontSize: 14,
      lineHeight: 20,
      color: "text",
    },
    button: {
      fontFamily: "System",
      fontSize: 16,
      lineHeight: 24,
      color: "text",
      fontWeight: "600",
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

// Export Theme type from defaultTheme
export type Theme = typeof defaultTheme;

// Theme template to create consistent themes
const createRosterTheme = (colors: any) => {
  return createTheme({
    colors,
    spacing: defaultTheme.spacing,
    borderRadii: defaultTheme.borderRadii,
    radius: defaultTheme.radius,
    textVariants: defaultTheme.textVariants,
    breakpoints: defaultTheme.breakpoints,
  });
};

// FREE THEMES

// Default Dark - Dark version of the default theme
export const defaultDarkTheme = createRosterTheme({
  primary: palette.coral,
  primaryLight: palette.purpleLight,
  secondary: palette.purple,
  accent: palette.mint,
  background: "#121212", // Dark background
  cardBackground: "#1E1E1E", // Slightly lighter dark
  foreground: palette.coral,
  text: palette.white,
  textSecondary: "#AAAAAA", // Light grey
  textLight: "#121212", // Dark for light backgrounds
  neonAccent: palette.neonYellow,
  highlight: palette.bubblegumPink,
  error: palette.error,
  success: palette.success,
  white: palette.white,
});

// Basic Babe (Soft Pink + Grey)
export const basicBabeTheme = createRosterTheme({
  primary: "#FF9EB5", // Soft pink
  primaryLight: "#FFD3DD",
  secondary: "#A6A6A6", // Grey
  accent: "#F5F5F5",
  background: "#FFFFFF",
  cardBackground: "#F9F9F9",
  foreground: "#4A4A4A",
  text: "#333333", // Darker for better contrast
  textSecondary: "#757575",
  textLight: "#000000", // Black for light pink areas
  neonAccent: "#FFD3DD",
  highlight: "#FF9EB5",
  error: "#FF5252",
  success: "#66BB6A",
  white: "#FFFFFF",
});

// Chill Vibes (Cool Blue + Pastel Mint)
export const chillVibesTheme = createRosterTheme({
  primary: "#5DADE2", // Cool blue
  primaryLight: "#AED6F1",
  secondary: "#A8E6CF", // Pastel mint
  accent: "#F0F9FF",
  background: "#FFFFFF",
  cardBackground: "#F0F9FF",
  foreground: "#2C3E50",
  text: "#1A2530", // Darker blue for better contrast
  textSecondary: "#34495E", // Slightly darker
  textLight: "#000000", // Black for light areas
  neonAccent: "#A8E6CF",
  highlight: "#5DADE2",
  error: "#E74C3C",
  success: "#2ECC71",
  white: "#FFFFFF",
});

// Moodboard (Neutral tones with collage aesthetic)
export const moodboardTheme = createRosterTheme({
  primary: "#A67C52", // Warm brown
  primaryLight: "#D4BFA9",
  secondary: "#8D8D8D", // Neutral gray
  accent: "#EAEAEA",
  background: "#F5F5F5",
  cardBackground: "#FFFFFF",
  foreground: "#3C3C3C",
  text: "#2A2A2A", // Darker for better contrast
  textSecondary: "#555555", // Darker grey for better contrast
  textLight: "#000000", // Black for light areas
  neonAccent: "#D4BFA9",
  highlight: "#A67C52",
  error: "#C0392B",
  success: "#27AE60",
  white: "#FFFFFF",
});

// PREMIUM THEMES

// Valentine's Chaos
export const valentinesChaosTheme = createRosterTheme({
  primary: "#FF1493", // Neon pink
  primaryLight: "#FF69B4",
  secondary: "#FF85A2",
  accent: "#FF5252",
  background: "#FFF0F5", // Light pink background
  cardBackground: "#FFFFFF",
  foreground: "#CC0066",
  text: "#333333",
  textSecondary: "#FF85A2",
  textLight: "#000000", // Black for better contrast on light colors
  neonAccent: "#FF1493",
  highlight: "#FF85A2",
  error: "#FF0000",
  success: "#FF66CC",
  white: "#FFFFFF",
});

// Hot Girl Summer
export const hotGirlSummerTheme = createRosterTheme({
  primary: "#FF5722", // Bold orange
  primaryLight: "#FFAB91",
  secondary: "#FF9800", // Orange
  accent: "#FFC107", // Amber
  background: "#FFFDE7", // Very light yellow
  cardBackground: "#FFFFFF",
  foreground: "#E64A19",
  text: "#212121",
  textSecondary: "#757575",
  textLight: "#000000", // Black for better contrast on light backgrounds
  neonAccent: "#FFAB00",
  highlight: "#FF5722",
  error: "#D50000",
  success: "#64DD17",
  white: "#FFFFFF",
});

// Sad Boi Hours
export const sadBoiHoursTheme = createRosterTheme({
  primary: "#673AB7", // Deep purple
  primaryLight: "#9575CD",
  secondary: "#4527A0", // Darker purple
  accent: "#7E57C2",
  background: "#121212", // Very dark background
  cardBackground: "#1E1E1E",
  foreground: "#9C27B0",
  text: "#FFFFFF",
  textSecondary: "#B39DDB",
  textLight: "#121212", // Dark for light backgrounds
  neonAccent: "#6200EA",
  highlight: "#9C27B0",
  error: "#B00020",
  success: "#00E676",
  white: "#FFFFFF",
});

// Campus Cutie
export const campusCutieTheme = createRosterTheme({
  primary: "#1565C0", // School blue
  primaryLight: "#BBDEFB",
  secondary: "#E53935", // School red
  accent: "#FFECB3",
  background: "#FFFFFF",
  cardBackground: "#F5F5F5",
  foreground: "#0D47A1",
  text: "#0D2341", // Darker blue for better contrast
  textSecondary: "#444444", // Darker grey for better contrast
  textLight: "#000000", // Black for light background elements
  neonAccent: "#FFC107",
  highlight: "#E53935",
  error: "#B71C1C",
  success: "#2E7D32",
  white: "#FFFFFF",
});

// Ghosted Collection
export const ghostedCollectionTheme = createRosterTheme({
  primary: "#BDBDBD", // Pale grey
  primaryLight: "#E0E0E0",
  secondary: "#9E9E9E",
  accent: "#EEEEEE",
  background: "#F5F5F5",
  cardBackground: "#FAFAFA",
  foreground: "#757575",
  text: "#404040", // Darker for better contrast
  textSecondary: "#757575", // Medium grey
  textLight: "#121212", // Near black for light areas
  neonAccent: "#E0E0E0",
  highlight: "#BDBDBD",
  error: "#B00020",
  success: "#00C853",
  white: "#FFFFFF",
});

// Cuffing Season
export const cuffingSeasonTheme = createRosterTheme({
  primary: "#795548", // Brown
  primaryLight: "#BCAAA4",
  secondary: "#FF9800", // Orange
  accent: "#FFCC80",
  background: "#EFEBE9", // Very light brown
  cardBackground: "#FFFFFF",
  foreground: "#5D4037",
  text: "#3E2723",
  textSecondary: "#4E342E", // Darker brown for better contrast
  textLight: "#000000", // Black for light backgrounds
  neonAccent: "#FF9800",
  highlight: "#D84315",
  error: "#BF360C",
  success: "#33691E",
  white: "#FFFFFF",
});

// Retro Roster
export const retroRosterTheme = createRosterTheme({
  primary: "#E91E63", // Pink
  primaryLight: "#F8BBD0",
  secondary: "#00BCD4", // Cyan
  accent: "#B3E5FC",
  background: "#311B92", // Deep purple
  cardBackground: "#4527A0",
  foreground: "#E91E63",
  text: "#FFFFFF",
  textSecondary: "#E1BEE7",
  textLight: "#000000", // Black for cyan and light colors
  neonAccent: "#00BCD4",
  highlight: "#FF4081",
  error: "#F44336",
  success: "#76FF03",
  white: "#FFFFFF",
});

// Party Girl Era
export const partyGirlEraTheme = createRosterTheme({
  primary: "#AA00FF", // Purple
  primaryLight: "#EA80FC",
  secondary: "#00E5FF", // Cyan
  accent: "#18FFFF",
  background: "#000000", // Black
  cardBackground: "#212121",
  foreground: "#D500F9",
  text: "#FFFFFF",
  textSecondary: "#B388FF",
  textLight: "#000000", // Black for bright accents
  neonAccent: "#00E5FF",
  highlight: "#AA00FF",
  error: "#FF1744",
  success: "#00E676",
  white: "#FFFFFF",
});

// Indie Sleaze
export const indieSleazeTheme = createRosterTheme({
  primary: "#212121", // Almost black
  primaryLight: "#484848",
  secondary: "#BDBDBD", // Grey
  accent: "#F5F5F5",
  background: "#000000",
  cardBackground: "#212121",
  foreground: "#F5F5F5",
  text: "#FFFFFF",
  textSecondary: "#DDDDDD", // Lighter grey for better contrast
  textLight: "#000000", // Black for light areas
  neonAccent: "#BDBDBD",
  highlight: "#484848",
  error: "#F44336", // Brighter red for visibility
  success: "#00E676", // Brighter green for visibility
  white: "#FFFFFF",
});

// Pink Pony - Soft pastel pink theme
export const pinkPonyTheme = createRosterTheme({
  primary: "#FF9CCD", // Soft pink
  primaryLight: "#FFCCE5",
  secondary: "#BB86FC", // Light purple
  accent: "#FFE7F5", // Very light pink
  background: "#FFF9FC", // Pink-tinted white
  cardBackground: "#FFFFFF",
  foreground: "#FF6BB3", // Brighter pink
  text: "#333333", // Darker text for better contrast
  textSecondary: "#937C8A", // Dusty rose
  textLight: "#000000", // Black for pink areas
  neonAccent: "#FF85E0", // Neon pink
  highlight: "#FF1493", // Deep pink
  error: "#FF0066",
  success: "#9DEF92", // Pastel green
  white: "#FFFFFF",
});

// Brat - Bold and rebellious
export const bratTheme = createRosterTheme({
  primary: "#8ace00", // Lime green (primary color)
  primaryLight: "#a6e435", // Lighter version of lime green
  secondary: "#ba51b6", // Purple/magenta
  accent: "#e5ed23", // Bright yellow/chartreuse
  background: "#000000", // Black
  cardBackground: "#222222", // Dark gray
  foreground: "#8ace00", // Lime green for foreground elements
  text: "#ffffff", // White
  textSecondary: "#cccccc", // Light gray
  textLight: "#000000", // Black text for light backgrounds (like yellow accents)
  neonAccent: "#ba51b6", // Purple/magenta as neon accent
  highlight: "#e5ed23", // Yellow as highlight
  error: "#ff0054", // Red for error states
  success: "#8ace00", // Lime green for success
  white: "#ffffff", // White
});

// Materialist - Material Design inspired
export const materialistTheme = createRosterTheme({
  primary: "#6200EE", // Material purple
  primaryLight: "#BB86FC",
  secondary: "#03DAC6", // Teal
  accent: "#3700B3", // Dark purple
  background: "#FFFFFF",
  cardBackground: "#F5F5F5",
  foreground: "#6200EE",
  text: "#121212", // Near black
  textSecondary: "#757575", // Medium grey
  textLight: "#FFFFFF",
  neonAccent: "#03DAC6", // Teal
  highlight: "#CF6679", // Material error color
  error: "#CF6679",
  success: "#00C853", // Material success green
  white: "#FFFFFF",
});

// Brutalist - Minimalist raw aesthetic
export const brutalistTheme = createRosterTheme({
  primary: "#000000", // Black
  primaryLight: "#333333",
  secondary: "#444444", // Dark grey
  accent: "#FFFFFF", // White
  background: "#EEEEEE", // Light grey
  cardBackground: "#FFFFFF",
  foreground: "#000000",
  text: "#000000",
  textSecondary: "#555555", // Medium grey
  textLight: "#FFFFFF",
  neonAccent: "#FF0000", // Red
  highlight: "#000000",
  error: "#FF0000", // Red
  success: "#000000", // Just black
  white: "#FFFFFF",
});

// Theme mapping for easy access
export const themes = {
  // Default theme
  default: defaultTheme,

  // Free themes
  basicBabe: basicBabeTheme,
  chillVibes: chillVibesTheme,
  moodboard: moodboardTheme,

  // Premium themes
  valentinesChaos: valentinesChaosTheme,
  hotGirlSummer: hotGirlSummerTheme,
  sadBoiHours: sadBoiHoursTheme,
  campusCutie: campusCutieTheme,
  ghostedCollection: ghostedCollectionTheme,
  cuffingSeason: cuffingSeasonTheme,
  retroRoster: retroRosterTheme,
  partyGirlEra: partyGirlEraTheme,
  indieSleaze: indieSleazeTheme,
  // New premium themes
  defaultDark: defaultDarkTheme,
  pinkPony: pinkPonyTheme,
  brat: bratTheme,
  materialist: materialistTheme,
  brutalist: brutalistTheme,
};

// Theme metadata for UI display
export const themeInfo = {
  // Default theme
  default: {
    name: "Sundress",
    description: "Classic Roster theme",
    isPremium: false,
    emoji: "🎨",
  },
  defaultDark: {
    name: "Creature of the Night",
    description: "Dark mode version of the classic theme",
    isPremium: false,
    emoji: "🌚",
  },
  // Free themes
  basicBabe: {
    name: "Basic Babe",
    description: "Soft Pink + Grey",
    isPremium: false,
    emoji: "💕",
  },
  chillVibes: {
    name: "Chill Vibes",
    description: "Cool Blue + Pastel Mint",
    isPremium: false,
    emoji: "🧊",
  },
  moodboard: {
    name: "Swiss Chocolate",
    description: "Neutral earthy tones",
    isPremium: false,
    emoji: "📋",
  },

  // Premium themes
  valentinesChaos: {
    name: "Valentine's Chaos",
    description: "Neon pinks, animated hearts, sparkles",
    isPremium: true,
    emoji: "💖",
  },
  hotGirlSummer: {
    name: "Hot Girl Summer",
    description: "Bold oranges, fire gradients, animated glow",
    isPremium: true,
    emoji: "🔥",
  },
  sadBoiHours: {
    name: "Sad Boi Hours",
    description: "Deep purples, starry overlays, lo-fi fonts",
    isPremium: true,
    emoji: "🌙",
  },
  campusCutie: {
    name: "Campus Cutie",
    description: "School colors, varsity-style text, sticker overlays",
    isPremium: true,
    emoji: "🎓",
  },
  ghostedCollection: {
    name: "Ghosted Collection",
    description: "Pale greys, glitched UI, vaporwave accents",
    isPremium: true,
    emoji: "👻",
  },
  cuffingSeason: {
    name: "Cuffing Season",
    description: "Cozy tones, warm gradients, autumn leaves animations",
    isPremium: true,
    emoji: "🍁",
  },
  retroRoster: {
    name: "Retro Roster",
    description: "Vaporwave palette, 80s text styles, arcade badges",
    isPremium: true,
    emoji: "🛼",
  },
  partyGirlEra: {
    name: "Party Girl Era",
    description: "Shimmer textures, bold type, confetti micro-animations",
    isPremium: true,
    emoji: "🪩",
  },
  indieSleaze: {
    name: "Indie Sleaze",
    description: "Grunge palettes, handwritten fonts, stickerbomb icons",
    isPremium: true,
    emoji: "🎨",
  },
  pinkPony: {
    name: "Pink Pony",
    description: "Pastel pink dreamscape with magical vibes",
    isPremium: true,
    emoji: "🦄",
  },
  brat: {
    name: "Brat",
    description: "Bold neons and attitude for the unapologetic",
    isPremium: true,
    emoji: "😈",
  },
  materialist: {
    name: "Materialist",
    description: "Clean Material Design aesthetic with precise hierarchy",
    isPremium: true,
    emoji: "💎",
  },
  brutalist: {
    name: "Brutalist",
    description: "Raw minimalism with high contrast edges",
    isPremium: true,
    emoji: "◼️",
  },
};

// Types
export type ThemeNames = keyof typeof themes;

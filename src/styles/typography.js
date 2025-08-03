import { Platform } from 'react-native';

export const FONTS = {
  // Font Families
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
  }),
  light: Platform.select({
    ios: 'System',
    android: 'Roboto-Light',
  }),
};

export const FONT_SIZES = {
  // Heading Sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  // Body Sizes
  large: 18,
  medium: 16,
  regular: 14,
  small: 12,
  tiny: 10,

  // Button Sizes
  buttonLarge: 18,
  buttonMedium: 16,
  buttonSmall: 14,

  // Input Sizes
  inputText: 16,
  inputLabel: 14,
  inputHelper: 12,
};

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

export const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const TEXT_STYLES = {
  // Heading Styles
  h1: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.h1,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES.h1 * LINE_HEIGHTS.tight,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.h2,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES.h2 * LINE_HEIGHTS.tight,
  },
  h3: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.h3,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES.h3 * LINE_HEIGHTS.normal,
  },
  h4: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.h4,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: FONT_SIZES.h4 * LINE_HEIGHTS.normal,
  },
  h5: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.h5,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: FONT_SIZES.h5 * LINE_HEIGHTS.normal,
  },
  h6: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.h6,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: FONT_SIZES.h6 * LINE_HEIGHTS.normal,
  },

  // Body Styles
  bodyLarge: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.large,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: FONT_SIZES.large * LINE_HEIGHTS.relaxed,
  },
  bodyMedium: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.medium,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: FONT_SIZES.medium * LINE_HEIGHTS.normal,
  },
  bodyRegular: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.regular,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: FONT_SIZES.regular * LINE_HEIGHTS.normal,
  },
  bodySmall: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.small,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: FONT_SIZES.small * LINE_HEIGHTS.normal,
  },

  // Button Styles
  buttonLarge: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.buttonLarge,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  buttonMedium: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.buttonMedium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  buttonSmall: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
  },

  // Caption Styles
  caption: {
    fontFamily: FONTS.light,
    fontSize: FONT_SIZES.small,
    fontWeight: FONT_WEIGHTS.light,
    lineHeight: FONT_SIZES.small * LINE_HEIGHTS.normal,
  },
  overline: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.tiny,
    fontWeight: FONT_WEIGHTS.medium,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
};

export default {
  FONTS,
  FONT_SIZES,
  LINE_HEIGHTS,
  FONT_WEIGHTS,
  TEXT_STYLES,
};
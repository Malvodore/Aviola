import { StyleSheet, Dimensions } from 'react-native';
import COLORS from './colors';
import { TEXT_STYLES, FONT_SIZES } from './typography';

const { width, height } = Dimensions.get('window');

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  round: 50,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const GLOBAL_STYLES = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.lg,
  },

  // Padding Styles
  paddingHorizontal: {
    paddingHorizontal: SPACING.md,
  },
  paddingVertical: {
    paddingVertical: SPACING.md,
  },
  padding: {
    padding: SPACING.md,
  },
  paddingSmall: {
    padding: SPACING.sm,
  },
  paddingLarge: {
    padding: SPACING.lg,
  },

  // Margin Styles
  marginHorizontal: {
    marginHorizontal: SPACING.md,
  },
  marginVertical: {
    marginVertical: SPACING.md,
  },
  margin: {
    margin: SPACING.md,
  },
  marginSmall: {
    margin: SPACING.sm,
  },
  marginLarge: {
    margin: SPACING.lg,
  },

  // Flexbox Styles
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },

  // Text Styles
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textPrimary: {
    color: COLORS.textPrimary,
  },
  textSecondary: {
    color: COLORS.textSecondary,
  },
  textWhite: {
    color: COLORS.textWhite,
  },
  textError: {
    color: COLORS.error,
  },
  textSuccess: {
    color: COLORS.success,
  },

  // Card Styles
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  cardMedium: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  cardLarge: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,
    ...SHADOWS.large,
  },

  // Button Styles
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: COLORS.buttonSecondary,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Input Styles
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    color: COLORS.textPrimary,
  },
  inputFocused: {
    borderColor: COLORS.inputFocused,
  },
  inputError: {
    borderColor: COLORS.error,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...TEXT_STYLES.h4,
    color: COLORS.textPrimary,
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    ...TEXT_STYLES.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },

  // Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xl,
  },
  errorText: {
    ...TEXT_STYLES.bodyLarge,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SPACING.md,
  },

  // Divider Styles
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  dividerThick: {
    height: 2,
    backgroundColor: COLORS.borderDark,
    marginVertical: SPACING.md,
  },

  // Badge Styles
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.tiny,
    fontWeight: 'bold',
  },

  // Screen Dimensions
  screenWidth: {
    width: width,
  },
  screenHeight: {
    height: height,
  },
  halfScreenWidth: {
    width: width / 2,
  },
  halfScreenHeight: {
    height: height / 2,
  },
});

export default GLOBAL_STYLES;
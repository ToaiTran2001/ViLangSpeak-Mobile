/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export enum Colors {
  TRANSPARENT = "rgba(0,0,0,0)",
  INPUT_BACKGROUND = "#FFFFFF",
  WHITE = "#ffffff",
  GRAY = "#D9D9D9",
  BLACK = "#000000",
  PRIMARY = "#05BAE180",
  SUCCESS = "#03FD6780",
  NEW = "#99E1F180",
  FLASHCARD = "#D1FAFD",
  TEXT = "#212529",
  TEXT_CORRECT = "#03FD67",
  TEXT_NEUTRAL = "#05BAE1",
  TEXT_ERROR = "#dc3545",
  BUTTON_REVIEW = "#06903580",
  BUTTON_START = "#244FBD80",
  SWITCH_CIRCLE_ON = "#069035",
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY,
}

/**
 * FontSize
 */
export enum FontSize {
  SMALL = 16,
  REGULAR = 20,
  MEDIUM = 24,
  LARGE = 28,
  HUGE = 36,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

export enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}

/**
 * IconSize
 */
 export enum IconSize {
  TINY = 10,
  SMALL = 16,
  REGULAR = 20,
  MEDIUM = 24,
  LARGE = 28,
  HUGE = 36,
}
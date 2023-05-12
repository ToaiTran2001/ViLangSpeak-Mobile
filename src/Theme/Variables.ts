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
  BACKGROUND = "#FFFFFF",
  WHITE = "#FFFFFF",
  GRAY = "#D9D9D9",
  BLACK = "#000000",
  PRIMARY = "#86D3FF",
  PRIMARY_BOLD = "#05BAE1",
  SUCCESS = "#83FFB4",
  NEW = "#C4F4FE",
  FLASHCARD = "#DCFDFF",
  TEXT = "#2C2C2C",
  TEXT_CORRECT = "#83FFB4",
  TEXT_NEUTRAL = "#86D3FF",
  TEXT_ERROR = "#FF6262",
  BUTTON_REVIEW = "#00B73E",
  BUTTON_START = "#2C64F6",
  SWITCH_CIRCLE_ON = "#069035",
  ICON_GRAY = "#A9A9AC",
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY,
}

/**
 * FontSize
 */
export enum FontSize {
  TINY = 10,
  SMALL = 14,
  REGULAR = 18,
  MEDIUM = 22,
  LARGE = 26,
  HUGE = 30,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 5
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
  SMALL = 14,
  REGULAR = 18,
  MEDIUM = 22,
  LARGE = 26,
  HUGE = 30,
}
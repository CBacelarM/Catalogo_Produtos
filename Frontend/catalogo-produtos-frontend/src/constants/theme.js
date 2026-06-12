export const colors = {
  light: {
    bgPrimary: "#F9FAFB",
    bgSecondary: "#FFFFFF",
    bgTertiary: "#F3F4F6",
    bgCard: "#FFFFFF",
    bgInput: "#FFFFFF",
    bgMuted: "#F9FAFB",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",
    border: "#E5E7EB",
    borderStrong: "#D1D5DB",
    primary: "#3B82F6",
    primaryHover: "#2563EB",
    success: "#10B981",
    successDark: "#059669",
    danger: "#EF4444",
    dangerHover: "#DC2626",
    overlay: "rgba(0,0,0,0.5)",
    spinnerTrack: "#E5E7EB"
  },
  dark: {
    bgPrimary: "#111827",
    bgSecondary: "#1F2937",
    bgTertiary: "#374151",
    bgCard: "#1F2937",
    bgInput: "#374151",
    bgMuted: "#374151",
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
    border: "#374151",
    borderStrong: "#4B5563",
    primary: "#3B82F6",
    primaryHover: "#2563EB",
    success: "#10B981",
    successDark: "#047857",
    danger: "#EF4444",
    dangerHover: "#DC2626",
    overlay: "rgba(0,0,0,0.7)",
    spinnerTrack: "#374151"
  }
};

export function getThemeColors(isDarkMode) {
  return isDarkMode ? colors.dark : colors.light;
}

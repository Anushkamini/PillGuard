import { createTheme } from "@mui/material/styles";

// PillGuard design language — clinical, precise, trustworthy.
// Deep healthcare blue + teal accent on a cool near-white ground.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#123B7A",
      dark: "#0C2A5A",
      light: "#2E5CAE",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0FB5A6",
      dark: "#0A8A7F",
      light: "#3FD0C2",
      contrastText: "#04322E",
    },
    success: { main: "#1F9D57", light: "#E5F5EC", dark: "#137A41" },
    warning: { main: "#E0870A", light: "#FDF1DE", dark: "#B96D05" },
    error: { main: "#D64545", light: "#FCE9E9", dark: "#B23434" },
    info: { main: "#2E6FDF", light: "#E7F0FE", dark: "#1F52AC" },
    background: { default: "#F4F6FB", paper: "#FFFFFF" },
    text: { primary: "#101B33", secondary: "#5A6784" },
    divider: "rgba(18, 59, 122, 0.10)",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: "-0.015em" },
    h4: { fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: "-0.015em" },
    h5: { fontFamily: "'Sora', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" },
    h6: { fontFamily: "'Sora', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
    overline: { fontWeight: 700, letterSpacing: "0.12em" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": { background: "rgba(15, 181, 166, 0.25)" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 16 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid rgba(18, 59, 122, 0.10)",
          borderRadius: 18,
          boxShadow: "0 1px 2px rgba(16, 27, 51, 0.04), 0 10px 30px -18px rgba(16, 27, 51, 0.18)",
          transition: "box-shadow .25s ease, transform .25s ease, border-color .25s ease",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18 },
        sizeLarge: { paddingTop: 13, paddingBottom: 13, fontSize: "1rem" },
        containedPrimary: {
          background: "linear-gradient(180deg, #1B4A93 0%, #123B7A 100%)",
          "&:hover": { background: "linear-gradient(180deg, #17417F 0%, #0F3269 100%)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: "#101B33", fontSize: "0.75rem", borderRadius: 8, padding: "6px 10px" },
      },
    },
  },
});

export default theme;

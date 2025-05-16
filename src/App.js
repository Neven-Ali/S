import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header";
import CourseList from "./components/CourseList";
import Footer from "./components/Footer";
import courses from "./Data";
import { EnrollmentProvider } from "./components/EnrollmentContext";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EnrollmentProvider>
        <CssBaseline />
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <main style={{ flex: 1 }}>
            <CourseList courses={courses} />
          </main>
          <Footer />
        </div>
      </EnrollmentProvider>
    </ThemeProvider>
  );
}

export default App;

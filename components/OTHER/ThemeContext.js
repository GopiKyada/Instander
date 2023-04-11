import React, { useState, createContext } from "react";
import { getColors } from "../../constants/colors";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const theme = getColors(isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

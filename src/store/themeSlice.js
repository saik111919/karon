import { createSlice } from "@reduxjs/toolkit";

const applyTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("dark-mode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("dark-mode");
  }
};

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
    return savedTheme;
  }
  // If no theme is saved, we can check the user's preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    applyTheme("dark");
    return "dark";
  }
  // Default to light if no preference is detected
  applyTheme("light");
  return "light";
};

const initialState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      state.theme = newTheme;
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      applyTheme(action.payload);
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   theme: localStorage.getItem("theme") ?? "dark", // Default theme is light
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     toggleTheme: (state) => {
//       const newTheme = state.theme === "dark" ? "light" : "dark";
//       state.theme = newTheme;
//       setTheme(newTheme);
//       localStorage.setItem("theme", newTheme);
//       document.documentElement.classList.toggle("dark", newTheme === "dark");
//     },
//     setTheme: (state, action) => {
//       state.theme = action.payload;
//     },
//   },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;
// export default themeSlice.reducer;

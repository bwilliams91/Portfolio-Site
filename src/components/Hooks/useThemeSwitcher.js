import { useCallback, useEffect, useState } from "react";

const preferDarkQuery = "(prefers-color-scheme: dark)";

const applyMode = (mode) => {
  document.documentElement.classList.toggle("dark", mode === "dark");
};

// Only a stored "dark"/"light" counts as an explicit choice; otherwise follow the system.
const getStoredMode = () => {
  try {
    const stored = window.localStorage.getItem("theme");
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
};

const useThemeSwitcher = () => {
  const [mode, setMode] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const sync = () => {
      const next = getStoredMode() ?? (mediaQuery.matches ? "dark" : "light");
      setMode(next);
      applyMode(next);
    };

    sync();
    mediaQuery.addEventListener("change", sync);

    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  // Persist only when the visitor toggles the theme, so the system preference keeps applying until then.
  const updateMode = useCallback((next) => {
    setMode(next);
    applyMode(next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
  }, []);

  return [mode, updateMode];
};

export default useThemeSwitcher;

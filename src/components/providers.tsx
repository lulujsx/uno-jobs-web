"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface MobileUiState {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
}

const MobileUiContext = createContext<MobileUiState | null>(null);

/** Shared open state for mobile overlays triggered from different places (header, tab bar). */
export function useMobileUi(): MobileUiState {
  const context = useContext(MobileUiContext);
  if (!context) throw new Error("useMobileUi must be used within <Providers>");
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const mobileUi = useMemo(
    () => ({ menuOpen, setMenuOpen, filtersOpen, setFiltersOpen }),
    [menuOpen, filtersOpen],
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <MobileUiContext.Provider value={mobileUi}>{children}</MobileUiContext.Provider>
      </MotionConfig>
    </ThemeProvider>
  );
}

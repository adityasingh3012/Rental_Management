// Theme configuration with modern, premium color palette
export const theme = {
  // Light mode colors
  light: {
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      accent: '#e2e8f0',
      elevated: '#ffffff',
      overlay: 'rgba(15, 23, 42, 0.1)',
    },
    
    // Text colors
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      muted: '#94a3b8',
      inverse: '#ffffff',
      accent: '#3b82f6',
    },
    
    // Brand colors - Modern premium palette
    brand: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      accent: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      },
    },
    
    // Semantic colors
    semantic: {
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        950: '#052e16',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
        950: '#451a03',
      },
      danger: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      info: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      },
    },
    
    // Border and surface colors
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      accent: '#94a3b8',
      focus: '#3b82f6',
      error: '#ef4444',
    },
    
    // Shadow colors
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
  },
  
  // Dark mode colors
  dark: {
    // Background colors
    background: {
      primary: '#020617',
      secondary: '#0f172a',
      tertiary: '#1e293b',
      accent: '#334155',
      elevated: '#0f172a',
      overlay: 'rgba(255, 255, 255, 0.1)',
    },
    
    // Text colors
    text: {
      primary: '#f8fafc',
      secondary: '#e2e8f0',
      tertiary: '#cbd5e1',
      muted: '#94a3b8',
      inverse: '#0f172a',
      accent: '#60a5fa',
    },
    
    // Brand colors (same as light but different usage)
    brand: {
      primary: {
        50: '#172554',
        100: '#1e3a8a',
        200: '#1e40af',
        300: '#1d4ed8',
        400: '#2563eb',
        500: '#3b82f6',
        600: '#60a5fa',
        700: '#93c5fd',
        800: '#bfdbfe',
        900: '#dbeafe',
        950: '#eff6ff',
      },
      secondary: {
        50: '#020617',
        100: '#0f172a',
        200: '#1e293b',
        300: '#334155',
        400: '#475569',
        500: '#64748b',
        600: '#94a3b8',
        700: '#cbd5e1',
        800: '#e2e8f0',
        900: '#f1f5f9',
        950: '#f8fafc',
      },
      accent: {
        50: '#082f49',
        100: '#0c4a6e',
        200: '#075985',
        300: '#0369a1',
        400: '#0284c7',
        500: '#0ea5e9',
        600: '#38bdf8',
        700: '#7dd3fc',
        800: '#bae6fd',
        900: '#e0f2fe',
        950: '#f0f9ff',
      },
    },
    
    // Semantic colors (adjusted for dark mode)
    semantic: {
      success: {
        50: '#052e16',
        100: '#14532d',
        200: '#166534',
        300: '#15803d',
        400: '#16a34a',
        500: '#22c55e',
        600: '#4ade80',
        700: '#86efac',
        800: '#bbf7d0',
        900: '#dcfce7',
        950: '#f0fdf4',
      },
      warning: {
        50: '#451a03',
        100: '#78350f',
        200: '#92400e',
        300: '#b45309',
        400: '#d97706',
        500: '#f59e0b',
        600: '#fbbf24',
        700: '#fcd34d',
        800: '#fde68a',
        900: '#fef3c7',
        950: '#fffbeb',
      },
      danger: {
        50: '#450a0a',
        100: '#7f1d1d',
        200: '#991b1b',
        300: '#b91c1c',
        400: '#dc2626',
        500: '#ef4444',
        600: '#f87171',
        700: '#fca5a5',
        800: '#fecaca',
        900: '#fee2e2',
        950: '#fef2f2',
      },
      info: {
        50: '#082f49',
        100: '#0c4a6e',
        200: '#075985',
        300: '#0369a1',
        400: '#0284c7',
        500: '#0ea5e9',
        600: '#38bdf8',
        700: '#7dd3fc',
        800: '#bae6fd',
        900: '#e0f2fe',
        950: '#f0f9ff',
      },
    },
    
    // Border and surface colors
    border: {
      primary: '#334155',
      secondary: '#475569',
      accent: '#64748b',
      focus: '#60a5fa',
      error: '#f87171',
    },
    
    // Shadow colors (darker for dark mode)
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },
  },
  
  // Common properties
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
    '5xl': '6rem',    // 96px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Animation and transition
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

// Type definitions for better TypeScript support
export type ThemeMode = 'light' | 'dark';
export type ThemeColors = typeof theme.light;
export type BrandColorShades = keyof typeof theme.light.brand.primary;
export type SemanticColors = keyof typeof theme.light.semantic;

// Helper functions
export const getColorByMode = (mode: ThemeMode, colorPath: string) => {
  const pathArray = colorPath.split('.');
  let color: any = theme[mode];
  
  for (const path of pathArray) {
    color = color[path];
  }
  
  return color;
};

export const rgba = (color: string, alpha: number) => {
  // Convert hex to rgba if needed
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // If already rgb/rgba, modify alpha
  if (color.startsWith('rgb')) {
    const values = color.match(/\d+/g);
    if (values && values.length >= 3) {
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`;
    }
  }
  
  return color;
};

export default theme;

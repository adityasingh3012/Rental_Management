import { useTheme } from '../contexts/ThemeContext';
import { theme, ThemeMode } from '../styles/theme';

/**
 * Custom hook for accessing theme values and utilities
 */
export const useAppTheme = () => {
  const { theme: currentTheme, toggleTheme, setTheme } = useTheme();
  
  /**
   * Get a color value based on current theme mode
   */
  const getColor = (colorPath: string): string => {
    const pathArray = colorPath.split('.');
    let color: any = theme[currentTheme as ThemeMode];
    
    for (const path of pathArray) {
      if (color && typeof color === 'object' && path in color) {
        color = color[path];
      } else {
        console.warn(`Color path "${colorPath}" not found in theme`);
        return '';
      }
    }
    
    return typeof color === 'string' ? color : '';
  };

  /**
   * Get CSS custom property for a color
   */
  const getCSSVariable = (variableName: string): string => {
    return `rgb(var(--color-${variableName}))`;
  };

  /**
   * Get RGB values for a color (useful for alpha transparency)
   */
  const getRGBValues = (variableName: string): string => {
    return `var(--color-${variableName})`;
  };

  /**
   * Generate theme-aware class names
   */
  const getThemeClasses = () => {
    return {
      // Background classes
      background: {
        primary: 'bg-background',
        secondary: 'bg-secondary',
        card: 'bg-card',
        muted: 'bg-muted',
      },
      
      // Text classes
      text: {
        primary: 'text-foreground',
        secondary: 'text-muted-foreground',
        accent: 'text-primary',
        inverse: currentTheme === 'light' ? 'text-white' : 'text-black',
      },
      
      // Border classes
      border: {
        primary: 'border-border',
        accent: 'border-primary',
        muted: 'border-muted',
      },
      
      // Button variants
      button: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        danger: 'bg-error text-error-foreground hover:bg-error/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
      },
      
      // Status classes
      status: {
        success: 'text-success bg-success/10 border-success/20',
        warning: 'text-warning bg-warning/10 border-warning/20',
        error: 'text-error bg-error/10 border-error/20',
        info: 'text-info bg-info/10 border-info/20',
      },
      
      // Interactive states
      interactive: {
        hover: 'hover:bg-accent/50 transition-colors duration-200',
        focus: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        active: 'active:scale-95 transition-transform duration-150',
      },
    };
  };

  /**
   * Get shadow class based on theme
   */
  const getShadowClass = (size: 'sm' | 'md' | 'lg' | 'xl' | 'premium' = 'md'): string => {
    const shadows = {
      sm: 'shadow-soft',
      md: 'shadow-medium',
      lg: 'shadow-large',
      xl: 'shadow-extra-large',
      premium: 'shadow-premium',
    };
    return shadows[size] || shadows.md;
  };

  /**
   * Get animation class
   */
  const getAnimationClass = (animation: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in' | 'glow' = 'fade-in'): string => {
    const animations = {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
      'slide-down': 'animate-slide-down',
      'scale-in': 'animate-scale-in',
      'glow': 'animate-glow',
    };
    return animations[animation] || animations['fade-in'];
  };

  /**
   * Generate responsive padding/margin classes
   */
  const getSpacingClasses = (spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl', type: 'p' | 'm' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr' | 'mx' | 'my' | 'mt' | 'mb' | 'ml' | 'mr') => {
    const spacingMap = {
      xs: '1',
      sm: '2',
      md: '4',
      lg: '6',
      xl: '8',
      '2xl': '12',
      '3xl': '16',
    };
    
    return `${type}-${spacingMap[spacing]}`;
  };

  /**
   * Check if current theme is dark
   */
  const isDark = currentTheme === 'dark';

  /**
   * Check if current theme is light
   */
  const isLight = currentTheme === 'light';

  /**
   * Get theme-appropriate icon color
   */
  const getIconColor = (variant: 'primary' | 'secondary' | 'muted' | 'accent' = 'primary'): string => {
    const iconColors = {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      muted: 'text-muted-foreground/60',
      accent: 'text-primary',
    };
    
    return iconColors[variant];
  };

  return {
    // Theme state
    currentTheme,
    isDark,
    isLight,
    
    // Theme actions
    toggleTheme,
    setTheme,
    
    // Color utilities
    getColor,
    getCSSVariable,
    getRGBValues,
    
    // Style utilities
    getThemeClasses,
    getShadowClass,
    getAnimationClass,
    getSpacingClasses,
    getIconColor,
    
    // Theme constants
    colors: theme[currentTheme as ThemeMode],
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    fontSize: theme.fontSize,
    animation: theme.animation,
  };
};

export default useAppTheme;

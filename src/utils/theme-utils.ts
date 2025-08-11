import { cn } from './cn';

/**
 * Theme-aware style utilities for consistent component styling
 */

// Base component styles
export const baseStyles = {
  // Interactive elements
  interactive: 'transition-all duration-200 ease-in-out active:scale-95',
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
  
  // Layout
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-8 sm:py-12 lg:py-16',
  
  // Typography
  heading: {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground',
    h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground',
    h3: 'text-2xl sm:text-3xl font-semibold tracking-tight text-foreground',
    h4: 'text-xl sm:text-2xl font-semibold text-foreground',
    h5: 'text-lg sm:text-xl font-medium text-foreground',
    h6: 'text-base sm:text-lg font-medium text-foreground',
  },
  
  text: {
    body: 'text-base text-foreground',
    bodySecondary: 'text-sm text-muted-foreground',
    caption: 'text-xs text-muted-foreground',
    lead: 'text-lg text-foreground/90 leading-relaxed',
  },
};

// Button variants
export const buttonVariants = {
  base: [
    'inline-flex items-center justify-center rounded-lg font-medium',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-95 transform-gpu',
  ],
  
  variants: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50 border border-border',
    success: 'bg-success text-success-foreground hover:bg-success/90 focus:ring-success/50 shadow-md',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/90 focus:ring-warning/50 shadow-md',
    danger: 'bg-error text-error-foreground hover:bg-error/90 focus:ring-error/50 shadow-md',
    ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring/50',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/50',
    premium: 'bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-xl focus:ring-primary/50',
  },
  
  sizes: {
    xs: 'px-2 py-1 text-xs gap-1 min-h-[1.75rem]',
    sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[2rem]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[2.5rem]',
    lg: 'px-6 py-3 text-base gap-2.5 min-h-[3rem]',
    xl: 'px-8 py-4 text-lg gap-3 min-h-[3.5rem]',
  },
};

// Input variants
export const inputVariants = {
  base: [
    'flex w-full rounded-lg border border-input bg-background',
    'px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  
  sizes: {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  },
  
  variants: {
    default: 'border-input',
    error: 'border-error focus:ring-error/50 focus:border-error',
    success: 'border-success focus:ring-success/50 focus:border-success',
    warning: 'border-warning focus:ring-warning/50 focus:border-warning',
  },
};

// Card variants
export const cardVariants = {
  base: [
    'bg-card text-card-foreground rounded-lg border border-border',
    'transition-all duration-200',
  ],
  
  variants: {
    default: '',
    elevated: 'shadow-large',
    interactive: 'hover:shadow-medium cursor-pointer hover:bg-accent/5',
    premium: 'shadow-premium bg-gradient-to-br from-card to-card/95',
  },
  
  padding: {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
};

// Status variants
export const statusVariants = {
  success: 'bg-success/10 text-success border border-success/20 rounded-md px-2 py-1 text-xs font-medium',
  warning: 'bg-warning/10 text-warning border border-warning/20 rounded-md px-2 py-1 text-xs font-medium',
  error: 'bg-error/10 text-error border border-error/20 rounded-md px-2 py-1 text-xs font-medium',
  info: 'bg-info/10 text-info border border-info/20 rounded-md px-2 py-1 text-xs font-medium',
  neutral: 'bg-muted text-muted-foreground border border-border rounded-md px-2 py-1 text-xs font-medium',
};

// Animation utilities
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  scaleIn: 'animate-scale-in',
  glow: 'animate-glow',
};

// Shadow utilities
export const shadows = {
  soft: 'shadow-soft',
  medium: 'shadow-medium',
  large: 'shadow-large',
  xl: 'shadow-extra-large',
  premium: 'shadow-premium',
  glow: 'shadow-glow',
  glowLg: 'shadow-glow-lg',
};

// Helper functions
export const createButtonClass = (
  variant: keyof typeof buttonVariants.variants = 'primary',
  size: keyof typeof buttonVariants.sizes = 'md',
  className?: string
) => {
  return cn(
    buttonVariants.base,
    buttonVariants.variants[variant],
    buttonVariants.sizes[size],
    className
  );
};

export const createInputClass = (
  size: keyof typeof inputVariants.sizes = 'md',
  variant: keyof typeof inputVariants.variants = 'default',
  className?: string
) => {
  return cn(
    inputVariants.base,
    inputVariants.sizes[size],
    inputVariants.variants[variant],
    className
  );
};

export const createCardClass = (
  variant: keyof typeof cardVariants.variants = 'default',
  padding: keyof typeof cardVariants.padding = 'md',
  className?: string
) => {
  return cn(
    cardVariants.base,
    cardVariants.variants[variant],
    cardVariants.padding[padding],
    className
  );
};

export const createStatusClass = (
  status: keyof typeof statusVariants,
  className?: string
) => {
  return cn(statusVariants[status], className);
};

// Layout utilities
export const layoutUtils = {
  stack: (spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
    const spacingMap = {
      xs: 'space-y-1',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
    };
    return spacingMap[spacing];
  },
  
  grid: (cols: number = 1, gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
    const gapMap = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };
    return `grid grid-cols-${cols} ${gapMap[gap]}`;
  },
  
  flex: (direction: 'row' | 'col' = 'row', justify: 'start' | 'center' | 'end' | 'between' | 'around' = 'start', align: 'start' | 'center' | 'end' | 'stretch' = 'start') => {
    const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';
    const justifyMap = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    };
    const alignMap = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };
    return `flex ${directionClass} ${justifyMap[justify]} ${alignMap[align]}`;
  },
};

// Responsive utilities
export const responsive = {
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  maxWidth: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  },
  padding: {
    responsive: 'px-4 sm:px-6 lg:px-8',
    section: 'py-8 sm:py-12 lg:py-16',
  },
};

export default {
  baseStyles,
  buttonVariants,
  inputVariants,
  cardVariants,
  statusVariants,
  animations,
  shadows,
  createButtonClass,
  createInputClass,
  createCardClass,
  createStatusClass,
  layoutUtils,
  responsive,
};

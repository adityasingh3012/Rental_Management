import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { cn } from '../../../utils/cn';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'dropdown';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className, 
  size = 'md',
  variant = 'button'
}) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'inline-flex items-center justify-center rounded-lg',
          'bg-background border border-border',
          'text-foreground hover:text-primary',
          'hover:bg-accent/50 hover:border-primary/50',
          'transition-all duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
          'active:scale-95',
          sizeClasses[size],
          className
        )}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className={cn(iconSizeClasses[size], 'transition-transform duration-200')} />
        ) : (
          <Sun className={cn(iconSizeClasses[size], 'transition-transform duration-200')} />
        )}
      </button>
    );
  }

  // Dropdown variant (for more complex theme selection)
  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className={cn(
          'inline-flex items-center justify-center rounded-lg',
          'bg-background border border-border',
          'text-foreground hover:text-primary',
          'hover:bg-accent/50 hover:border-primary/50',
          'transition-all duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
          'active:scale-95',
          sizeClasses[size],
          className
        )}
        aria-label="Theme options"
      >
        {theme === 'light' ? (
          <Sun className={iconSizeClasses[size]} />
        ) : (
          <Moon className={iconSizeClasses[size]} />
        )}
      </button>
    </div>
  );
};

// Enhanced theme selector with system preference
export const ThemeSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ] as const;

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg',
          'bg-background border border-border',
          'text-sm font-medium text-foreground',
          'hover:bg-accent/50 hover:border-primary/50',
          'transition-all duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
        )}
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="capitalize">{theme}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={cn(
            'absolute right-0 top-full mt-2 z-20',
            'bg-card border border-border rounded-lg shadow-large',
            'min-w-[8rem] overflow-hidden',
            'animate-fade-in'
          )}>
            {themes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2',
                  'text-sm text-foreground hover:bg-accent/50',
                  'transition-colors duration-150',
                  'first:rounded-t-lg last:rounded-b-lg',
                  {
                    'bg-accent text-accent-foreground': theme === value,
                  }
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;

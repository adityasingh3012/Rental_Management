import React from 'react';
import { Sun, Moon, Palette, Check, X, AlertTriangle, Info } from 'lucide-react';
import { useAppTheme } from '../hooks/useAppTheme';
import { Button } from '../components/common';
import { ThemeToggle, ThemeSelector } from '../components/common/ThemeToggle';
import { createButtonClass, createCardClass, createStatusClass } from '../utils/theme-utils';

const ThemeShowcase: React.FC = () => {
  const { currentTheme, isDark, toggleTheme } = useAppTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Palette className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Theme Showcase</h1>
            <ThemeToggle size="lg" />
          </div>
          <p className="text-lg text-muted-foreground">
            Comprehensive theming system with {isDark ? 'Dark' : 'Light'} mode
          </p>
        </div>

        {/* Theme Controls */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Quick Toggle:</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Theme Selector:</span>
              <ThemeSelector />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Current Theme:</span>
              <span className={createStatusClass('info')}>{currentTheme}</span>
            </div>
          </div>
        </div>

        {/* Button Variants */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Button Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="premium">Premium</Button>
          </div>
          
          {/* Button Sizes */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Card Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={createCardClass('default', 'md')}>
              <h3 className="text-lg font-medium text-foreground mb-2">Default Card</h3>
              <p className="text-muted-foreground">
                Basic card with default styling and theme-aware colors.
              </p>
            </div>
            
            <div className={createCardClass('elevated', 'md')}>
              <h3 className="text-lg font-medium text-foreground mb-2">Elevated Card</h3>
              <p className="text-muted-foreground">
                Card with enhanced shadow for prominence.
              </p>
            </div>
            
            <div className={createCardClass('premium', 'md')}>
              <h3 className="text-lg font-medium text-foreground mb-2">Premium Card</h3>
              <p className="text-muted-foreground">
                Premium card with gradient background.
              </p>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Status Indicators</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <span className={createStatusClass('success')}>
                <Check className="h-3 w-3 inline mr-1" />
                Success
              </span>
              <p className="text-xs text-muted-foreground">Positive actions</p>
            </div>
            
            <div className="space-y-2">
              <span className={createStatusClass('warning')}>
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                Warning
              </span>
              <p className="text-xs text-muted-foreground">Caution needed</p>
            </div>
            
            <div className="space-y-2">
              <span className={createStatusClass('error')}>
                <X className="h-3 w-3 inline mr-1" />
                Error
              </span>
              <p className="text-xs text-muted-foreground">Something went wrong</p>
            </div>
            
            <div className="space-y-2">
              <span className={createStatusClass('info')}>
                <Info className="h-3 w-3 inline mr-1" />
                Info
              </span>
              <p className="text-xs text-muted-foreground">Informational</p>
            </div>
            
            <div className="space-y-2">
              <span className={createStatusClass('neutral')}>
                Neutral
              </span>
              <p className="text-xs text-muted-foreground">Default state</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
            <h2 className="text-3xl font-semibold text-foreground">Heading 2</h2>
            <h3 className="text-2xl font-medium text-foreground">Heading 3</h3>
            <h4 className="text-xl font-medium text-foreground">Heading 4</h4>
            <p className="text-base text-foreground">
              This is body text that demonstrates the default text color and spacing.
            </p>
            <p className="text-sm text-muted-foreground">
              This is secondary text with muted foreground color.
            </p>
            <p className="text-xs text-muted-foreground">
              This is caption text for additional information.
            </p>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Primary</h3>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-primary rounded border border-border"></div>
                <div className="w-8 h-8 bg-primary/80 rounded border border-border"></div>
                <div className="w-8 h-8 bg-primary/60 rounded border border-border"></div>
                <div className="w-8 h-8 bg-primary/40 rounded border border-border"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Success</h3>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-success rounded border border-border"></div>
                <div className="w-8 h-8 bg-success/80 rounded border border-border"></div>
                <div className="w-8 h-8 bg-success/60 rounded border border-border"></div>
                <div className="w-8 h-8 bg-success/40 rounded border border-border"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Warning</h3>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-warning rounded border border-border"></div>
                <div className="w-8 h-8 bg-warning/80 rounded border border-border"></div>
                <div className="w-8 h-8 bg-warning/60 rounded border border-border"></div>
                <div className="w-8 h-8 bg-warning/40 rounded border border-border"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Error</h3>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-error rounded border border-border"></div>
                <div className="w-8 h-8 bg-error/80 rounded border border-border"></div>
                <div className="w-8 h-8 bg-error/60 rounded border border-border"></div>
                <div className="w-8 h-8 bg-error/40 rounded border border-border"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Interactive Elements</h2>
          <div className="space-y-6">
            {/* Form Elements */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Form Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Text input" 
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            
            {/* Hover States */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Hover & Focus States</h3>
              <p className="text-sm text-muted-foreground">
                All interactive elements have consistent hover and focus states that work with both light and dark themes.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Features */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Theme Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-success">✅ Implemented</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• CSS Custom Properties for dynamic theming</li>
                <li>• Modern premium color palette</li>
                <li>• Light and dark mode support</li>
                <li>• Theme-aware component system</li>
                <li>• Consistent interactive states</li>
                <li>• Accessible color contrasts</li>
                <li>• Smooth transitions</li>
                <li>• Premium visual effects</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-info">🎨 Design System</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Centralized theme configuration</li>
                <li>• Utility classes for common patterns</li>
                <li>• Component variants system</li>
                <li>• Responsive design support</li>
                <li>• Animation and transition library</li>
                <li>• Shadow and elevation system</li>
                <li>• Typography scale</li>
                <li>• Spacing system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcase;

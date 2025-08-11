import React from 'react';
import { cn } from '../../../utils/cn';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'premium';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  hoverable?: boolean;
  clickable?: boolean;
  interactive?: boolean;
  elevated?: boolean;
  onClick?: () => void;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'sm',
  border = true,
  rounded = 'lg',
  hoverable = false,
  clickable = false,
  interactive = false,
  elevated = false,
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  const shadowClasses = {
    none: '',
    sm: 'shadow-soft',
    md: 'shadow-medium',
    lg: 'shadow-large',
    xl: 'shadow-extra-large',
    premium: 'shadow-premium',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  const cardClasses = cn(
    'bg-card text-card-foreground',
    'transition-all duration-200 ease-in-out',
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    {
      'border border-border': border,
      'hover:shadow-large transform hover:-translate-y-0.5': hoverable,
      'cursor-pointer': clickable,
      'hover:bg-accent/5': clickable || interactive,
      'bg-card': !elevated,
      'bg-background shadow-large': elevated,
    },
    className
  );

  const Component = clickable ? 'button' : 'div';

  return (
    <Component className={cardClasses} onClick={onClick}>
      {children}
    </Component>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  divider = true,
}) => {
  return (
    <div
      className={cn(
        'card-header',
        {
          'border-b border-border pb-4 mb-4': divider,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return <div className={cn('card-body', className)}>{children}</div>;
};

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  divider = true,
}) => {
  return (
    <div
      className={cn(
        'card-footer',
        {
          'border-t border-border pt-4 mt-4': divider,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

// Compound component pattern
const CardWithSubComponents = Card as typeof Card & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

CardWithSubComponents.Header = CardHeader;
CardWithSubComponents.Body = CardBody;
CardWithSubComponents.Footer = CardFooter;

export { CardWithSubComponents as default, Card, CardHeader, CardBody, CardFooter };

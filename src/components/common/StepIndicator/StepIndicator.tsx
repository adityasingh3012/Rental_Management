import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface Step {
  id: string;
  title: string;
  description?: string;
  optional?: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'simple';
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps = [],
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  clickable = false,
  onStepClick,
  className,
}) => {
  const isStepCompleted = (stepIndex: number) => 
    completedSteps.includes(stepIndex) || stepIndex < currentStep;
  
  const isStepCurrent = (stepIndex: number) => stepIndex === currentStep;
  
  const isStepClickable = (stepIndex: number) => 
    clickable && (isStepCompleted(stepIndex) || isStepCurrent(stepIndex));

  const stepSizes = {
    sm: {
      circle: 'w-6 h-6',
      icon: 'w-3 h-3',
      title: 'text-xs',
      description: 'text-xs',
      spacing: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    },
    md: {
      circle: 'w-8 h-8',
      icon: 'w-4 h-4',
      title: 'text-sm',
      description: 'text-xs',
      spacing: orientation === 'horizontal' ? 'space-x-3' : 'space-y-3',
    },
    lg: {
      circle: 'w-10 h-10',
      icon: 'w-5 h-5',
      title: 'text-base',
      description: 'text-sm',
      spacing: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
    },
  };

  const currentSize = stepSizes[size];

  const renderStepCircle = (step: Step, stepIndex: number) => {
    const completed = isStepCompleted(stepIndex);
    const current = isStepCurrent(stepIndex);

    const circleClasses = cn(
      'flex items-center justify-center rounded-full border-2 transition-all duration-200',
      currentSize.circle,
      {
        // Completed or current state
        'bg-primary-600 border-primary-600 text-white': completed || current,
        // Upcoming state
        'bg-white border-gray-300 text-gray-400': !completed && !current,
        // Hover states for clickable steps
        'hover:border-primary-400 hover:bg-primary-50 cursor-pointer': 
          isStepClickable(stepIndex) && !completed && !current,
      }
    );

    const content = completed && !current ? (
      <Check className={currentSize.icon} />
    ) : (
      <span className="text-sm font-medium">{stepIndex + 1}</span>
    );

    if (variant === 'simple') {
      return (
        <Circle 
          className={cn(
            'transition-colors duration-200',
            currentSize.icon,
            {
              'text-primary-600 fill-current': completed || current,
              'text-gray-300': !completed && !current,
            }
          )}
        />
      );
    }

    return (
      <div className={circleClasses}>
        {content}
      </div>
    );
  };

  const renderStepContent = (step: Step, stepIndex: number) => {
    const completed = isStepCompleted(stepIndex);
    const current = isStepCurrent(stepIndex);

    const titleClasses = cn(
      'font-medium transition-colors duration-200',
      currentSize.title,
      {
        'text-primary-600': current,
        'text-gray-900': completed && !current,
        'text-gray-500': !completed && !current,
      }
    );

    const descriptionClasses = cn(
      'text-gray-500 mt-0.5',
      currentSize.description
    );

    return (
      <div className={orientation === 'vertical' ? 'ml-3' : 'text-center'}>
        <div className={titleClasses}>
          {step.title}
          {step.optional && (
            <span className="ml-1 text-gray-400 text-xs">(Optional)</span>
          )}
        </div>
        {step.description && variant === 'default' && (
          <div className={descriptionClasses}>
            {step.description}
          </div>
        )}
      </div>
    );
  };

  const renderConnector = (stepIndex: number) => {
    if (stepIndex === steps.length - 1) return null;

    const completed = isStepCompleted(stepIndex + 1);

    const connectorClasses = cn(
      'transition-colors duration-200',
      {
        'bg-primary-600': completed,
        'bg-gray-300': !completed,
      }
    );

    if (orientation === 'horizontal') {
      return (
        <div className="flex-1 flex justify-center">
          <div className={cn('h-0.5 w-full', connectorClasses)} />
        </div>
      );
    }

    return (
      <div className="flex justify-start ml-4">
        <div className={cn('w-0.5 h-6', connectorClasses)} />
      </div>
    );
  };

  const containerClasses = cn(
    'flex',
    {
      'items-center': orientation === 'horizontal',
      'flex-col': orientation === 'vertical',
    },
    className
  );

  const stepContainerClasses = cn(
    'flex',
    {
      'flex-col items-center': orientation === 'horizontal',
      'items-start': orientation === 'vertical',
    }
  );

  const handleStepClick = (stepIndex: number) => {
    if (isStepClickable(stepIndex)) {
      onStepClick?.(stepIndex);
    }
  };

  return (
    <nav aria-label="Progress" className={containerClasses}>
      {steps.map((step, stepIndex) => (
        <React.Fragment key={step.id}>
          <div
            className={cn(
              stepContainerClasses,
              isStepClickable(stepIndex) && 'cursor-pointer'
            )}
            onClick={() => handleStepClick(stepIndex)}
          >
            {renderStepCircle(step, stepIndex)}
            {renderStepContent(step, stepIndex)}
          </div>
          
          {orientation === 'horizontal' && renderConnector(stepIndex)}
          {orientation === 'vertical' && stepIndex < steps.length - 1 && renderConnector(stepIndex)}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default StepIndicator;

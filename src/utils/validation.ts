// Validation utility functions and schemas

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Password validation
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Required field validation
export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// String length validation
export const validateStringLength = (
  value: string,
  min: number = 0,
  max: number = Infinity
): { isValid: boolean; error?: string } => {
  const length = value.trim().length;
  
  if (length < min) {
    return {
      isValid: false,
      error: `Must be at least ${min} characters long`,
    };
  }
  
  if (length > max) {
    return {
      isValid: false,
      error: `Must be no more than ${max} characters long`,
    };
  }
  
  return { isValid: true };
};

// Number validation
export const validateNumber = (
  value: number,
  min: number = -Infinity,
  max: number = Infinity
): { isValid: boolean; error?: string } => {
  if (isNaN(value)) {
    return {
      isValid: false,
      error: 'Must be a valid number',
    };
  }
  
  if (value < min) {
    return {
      isValid: false,
      error: `Must be at least ${min}`,
    };
  }
  
  if (value > max) {
    return {
      isValid: false,
      error: `Must be no more than ${max}`,
    };
  }
  
  return { isValid: true };
};

// Date validation
export const validateDate = (date: string): { isValid: boolean; error?: string } => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return {
      isValid: false,
      error: 'Invalid date format',
    };
  }
  
  return { isValid: true };
};

// Date range validation
export const validateDateRange = (
  startDate: string,
  endDate: string
): { isValid: boolean; error?: string } => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      isValid: false,
      error: 'Invalid date format',
    };
  }
  
  if (start >= end) {
    return {
      isValid: false,
      error: 'End date must be after start date',
    };
  }
  
  return { isValid: true };
};

// File validation
export const validateFile = (
  file: File,
  allowedTypes: string[] = [],
  maxSize: number = Infinity
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / 1024 / 1024);
    errors.push(`File size must be less than ${maxSizeMB}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card validation (basic Luhn algorithm)
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }
  
  let sum = 0;
  let alternate = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let n = parseInt(cleaned.charAt(i), 10);
    
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    
    sum += n;
    alternate = !alternate;
  }
  
  return sum % 10 === 0;
};

// Form validation helpers
export interface ValidationRule<T = any> {
  rule: (value: T) => boolean;
  message: string;
}

export const createValidator = <T>(rules: ValidationRule<T>[]) => {
  return (value: T): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    for (const { rule, message } of rules) {
      if (!rule(value)) {
        errors.push(message);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
};

// Common validation rules
export const validationRules = {
  required: <T>(value: T): boolean => isRequired(value),
  email: (value: string): boolean => isValidEmail(value),
  phone: (value: string): boolean => isValidPhone(value),
  url: (value: string): boolean => isValidUrl(value),
  minLength: (min: number) => (value: string): boolean => value.length >= min,
  maxLength: (max: number) => (value: string): boolean => value.length <= max,
  min: (min: number) => (value: number): boolean => value >= min,
  max: (max: number) => (value: number): boolean => value <= max,
  pattern: (regex: RegExp) => (value: string): boolean => regex.test(value),
};

// Common validation messages
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  minLength: (min: number) => `Must be at least ${min} characters long`,
  maxLength: (max: number) => `Must be no more than ${max} characters long`,
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be no more than ${max}`,
  pattern: 'Invalid format',
  passwordMatch: 'Passwords do not match',
  invalidDate: 'Please enter a valid date',
  invalidDateRange: 'End date must be after start date',
};

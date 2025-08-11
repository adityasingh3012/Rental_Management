# Rental Management Web Application

## Overview

**App Name:** Rental Management  
**Tech Stack:** React (TypeScript) + Tailwind CSS  
**Purpose:** A comprehensive rental management platform that streamlines the entire rental process, providing a unified platform to manage products, schedule pickups, and handle orders seamlessly.

## Table of Contents

1. [Features](#features)
2. [User Roles](#user-roles)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [API Integration](#api-integration)
6. [Getting Started](#getting-started)
7. [Project Structure](#project-structure)

## Features

### Core Rental Features

#### 1. Rental Product Management
- **Define Rentable Products** – Mark products as rentable and configure units (e.g., per hour, day, week)
- **Custom Rental Duration** – Supports short-term and long-term rentals with flexible durations
- **Product Availability** – View availability in calendar or list view to avoid overbooking

#### 2. Order and Rental Flow
- **Create rental quotations** – Convert to rental orders and generate rental contracts
- **Review, confirm, and pay** – Customers can complete transactions online via the customer portal
- **Pickup/Return Scheduling** – Track and schedule pickups and returns with precise timing

#### 3. Notifications System
- **Customer Notifications** – Automated reminders via email/portal alerts, sent N days before return
- **End User Notifications** – Email reminders for upcoming returns to help prepare for pickup/follow-up
- **Customizable Timing** – N value can be customized to match business needs

#### 4. Payment Gateway Integration
- Support for secure gateways: **PayPal, Stripe, Razorpay**
- Enable online payments from quotations or orders
- Multiple payment options and security compliance

#### 5. Delivery Management

##### Reservation (Order Confirmed)
- Reserve required items upon order confirmation
- Prevents double-booking and ensures product readiness

##### Pickup (Delivery to Customer)
- Auto-generate pickup documents for delivery teams
- Update stock records when products are handed over

##### Return (Collecting Back from Customer)
- Generate return documents at rental period end
- Update stock records to make products available for next rental

#### 6. Flexible Invoicing
- **Full upfront payment** – Charge full rental before pickup
- **Partial payment / deposit** – Security deposit or first installment with later balance
- **Late Return Fees** – Automatic calculation based on predefined rules

#### 7. Pricelist Management
- **Multiple Pricelists** – Segment by customer type, region, or duration
- **Time-Dependent Pricing** – Variable rates per rental duration
- **Discount Rules** – Percentage, fixed, or promotional discounts
- **Product Category/Customer Rules** – Category-based or customer-specific pricing
- **Validity Periods** – Seasonal/promotional date ranges

#### 8. Returns & Delays Handling
- Alerts for **late returns**
- Automatic **late fees/penalties**
- Customizable penalty calculation rules

#### 9. Reports and Dashboards
- **Downloadable Reports** – Formats: PDF, XLSX, CSV
- **Tracking Metrics** – Most rented products, total rental revenue, top customers
- **Analytics Dashboard** – Real-time insights and performance metrics

## User Roles

### 1. Customer
**Primary Functions:**
- Browse and search rental products
- Check product availability
- Create rental requests and quotations
- Make payments online
- Track rental status
- Manage profile and notifications

### 2. End User (Staff)
**Primary Functions:**
- Handle pickup and delivery operations
- Process returns and collections
- Update rental status
- Manage assigned tasks
- Receive operational notifications

### 3. Admin
**Primary Functions:**
- Complete system administration
- Product and inventory management
- Pricing and discount configuration
- User management and permissions
- Reports and analytics access
- System configuration and automation

## Tech Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context/Redux Toolkit
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Date Handling:** Date-fns
- **UI Components:** Custom components with Tailwind
- **Icons:** Lucide React or Heroicons

### Development Tools
- **Build Tool:** Vite or Create React App
- **Package Manager:** npm or yarn
- **Code Quality:** ESLint + Prettier
- **Type Checking:** TypeScript
- **Testing:** Jest + React Testing Library

## Architecture

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, etc.)
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   └── features/       # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services and business logic
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── store/              # State management
└── styles/             # Global styles and Tailwind config
```

### Design Principles
- **Component Reusability** – Build modular, reusable components
- **Separation of Concerns** – Clean separation of UI and business logic
- **API-Friendly Structure** – Easy backend integration points
- **Responsive Design** – Desktop, tablet, and mobile support
- **Type Safety** – Full TypeScript coverage
- **Modern UX** – Premium, interactive, and intuitive design

## API Integration

### API Structure
The application integrates with a RESTful API with the following main modules:

- **Authentication & User Management**
- **Product Management**
- **Quotation & Rental Management**
- **Pickup & Return Operations**
- **Payment & Invoicing**
- **Notifications & Reporting**

### API Client Configuration
```typescript
// Base API configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser
- Backend API server (refer to API documentation)

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd rental-management-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoints

# Start development server
npm run dev
```

### Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Project Structure

```
rental-management-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── common/        # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature-specific components
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── customer/      # Customer portal pages
│   │   ├── staff/         # Staff portal pages
│   │   └── admin/         # Admin portal pages
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   ├── store/             # State management
│   └── styles/            # Styles and Tailwind config
├── docs/                  # Documentation
└── package.json
```

## Development Guidelines

### Code Standards
- Use TypeScript for all components and logic
- Follow React best practices and hooks patterns
- Implement proper error handling and loading states
- Write clean, readable, and well-documented code
- Use semantic HTML and accessibility best practices

### UI/UX Guidelines
- Maintain consistent design system
- Ensure responsive design across all devices
- Implement smooth transitions and interactions
- Follow modern web design principles
- Prioritize user experience and intuitive navigation

### Testing Strategy
- Unit tests for utility functions
- Component testing for UI components
- Integration tests for API interactions
- End-to-end tests for critical user flows

## Deployment

### Build Process
```bash
# Build for production
npm run build

# Test production build locally
npm run preview
```

### Deployment Options
- **Vercel** (Recommended for React apps)
- **Netlify**
- **AWS S3 + CloudFront**
- **Docker containerization**

## Contributing

1. Follow the established code style and patterns
2. Write comprehensive tests for new features
3. Update documentation for any API or feature changes
4. Ensure responsive design implementation
5. Test across different browsers and devices

## License

[Your License Here]
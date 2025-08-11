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

# Rental Management - User Flows

## Overview
This document outlines the complete user flows for all user types in the Rental Management application.

## User Flow Diagrams

### 1. Customer User Flow

#### A. Product Discovery & Booking Flow
```
Landing Page → Browse Products → Filter/Search → Product Details → 
Check Availability → Select Dates → Request Quotation → 
Review Quotation → Accept/Reject → Payment → Booking Confirmed
```

#### B. Rental Management Flow
```
Customer Dashboard → My Rentals → View Rental Details → 
Track Status → Receive Notifications → Prepare for Return → 
Complete Return → Rate Experience
```

#### C. Payment Flow
```
View Invoice → Select Payment Method → Enter Payment Details → 
Process Payment → Payment Confirmation → Receipt/Invoice
```

### 2. Staff (End User) Flow

#### A. Daily Operations Flow
```
Staff Dashboard → View Assigned Tasks → 
Pickup Tasks → Update Status → Complete Pickup →
Return Tasks → Process Return → Update Inventory
```

#### B. Pickup Flow
```
View Pickup List → Select Pickup → Navigate to Customer → 
Verify Items → Confirm Handover → Update Status → 
Generate Pickup Document
```

#### C. Return Flow
```
View Return List → Select Return → Visit Customer → 
Inspect Items → Process Return → Update Inventory → 
Calculate Late Fees (if applicable)
```

### 3. Admin User Flow

#### A. Product Management Flow
```
Admin Dashboard → Product Management → Add/Edit Product → 
Set Rental Terms → Configure Pricing → Set Availability → 
Publish Product
```

#### B. Order Management Flow
```
Quotation Requests → Review Request → Create Quotation → 
Send to Customer → Monitor Response → Convert to Rental → 
Assign Staff → Track Progress
```

#### C. Reporting Flow
```
Reports Dashboard → Select Report Type → Configure Parameters → 
Generate Report → View/Download → Share/Export
```

## Detailed User Journeys

### Customer Journey: First-Time Rental

1. **Discovery Phase**
   - Lands on homepage
   - Browses product categories
   - Uses search/filter functionality
   - Views product details and images

2. **Evaluation Phase**
   - Checks availability calendar
   - Reviews pricing for different durations
   - Reads product specifications
   - Compares multiple products

3. **Booking Phase**
   - Selects rental dates
   - Configures rental options
   - Requests quotation
   - Reviews terms and conditions

4. **Confirmation Phase**
   - Receives quotation notification
   - Reviews quotation details
   - Accepts quotation
   - Proceeds to payment

5. **Payment Phase**
   - Selects payment method
   - Enters payment information
   - Completes transaction
   - Receives booking confirmation

6. **Fulfillment Phase**
   - Receives pickup schedule
   - Prepares for pickup
   - Confirms item reception
   - Uses rented items

7. **Return Phase**
   - Receives return reminders
   - Schedules return pickup
   - Handover items to staff
   - Receives final invoice

### Staff Journey: Daily Operations

1. **Shift Start**
   - Login to staff portal
   - Review daily assignments
   - Check pickup/return schedules
   - Plan route optimization

2. **Pickup Operations**
   - Navigate to pickup locations
   - Verify customer identity
   - Inspect and handover items
   - Update system status
   - Collect signatures/photos

3. **Return Operations**
   - Visit return locations
   - Inspect returned items
   - Note any damages
   - Update inventory status
   - Process late fees if applicable

4. **Administrative Tasks**
   - Update job statuses
   - Report issues or damages
   - Upload photos/documents
   - Complete daily reports

### Admin Journey: Business Management

1. **Dashboard Overview**
   - Review key metrics
   - Monitor active rentals
   - Check pending quotations
   - Analyze performance data

2. **Product Management**
   - Add new rental products
   - Update existing inventory
   - Configure pricing rules
   - Manage product categories

3. **Order Processing**
   - Review quotation requests
   - Create custom quotations
   - Approve/reject requests
   - Assign delivery staff

4. **Financial Management**
   - Generate invoices
   - Process payments
   - Handle late fees
   - Export financial reports

5. **System Administration**
   - Manage user accounts
   - Configure system settings
   - Set up automation rules
   - Monitor system health

## User Flow Optimization

### Conversion Optimization
- Minimize steps in booking process
- Provide clear progress indicators
- Offer guest checkout options
- Implement smart defaults

### User Experience Enhancement
- Real-time availability updates
- Instant quotation generation
- Mobile-optimized interfaces
- Offline capability for staff

### Efficiency Improvements
- Bulk operations for admin
- Route optimization for staff
- Automated notifications
- Smart scheduling algorithms

## Flow Validation Points

### Customer Flows
- Email verification
- Payment authorization
- Identity confirmation
- Terms acceptance

### Staff Flows
- Login authentication
- Location verification
- Item condition checks
- Digital signatures

### Admin Flows
- Role-based access control
- Approval workflows
- Audit trail logging
- System backup procedures

## Error Handling Flows

### Common Error Scenarios
- Payment failures
- Availability conflicts
- System downtime
- Communication failures

### Recovery Mechanisms
- Automatic retry logic
- Alternative flow paths
- Customer support escalation
- Manual override options

## Analytics & Tracking

### User Behavior Tracking
- Page views and interactions
- Conversion funnel analysis
- Drop-off point identification
- User journey mapping

### Business Metrics
- Rental completion rates
- Customer satisfaction scores
- Staff efficiency metrics
- Revenue per transaction

### Optimization Opportunities
- A/B testing frameworks
- User feedback integration
- Performance monitoring
- Continuous improvement cycles

# Rental Management - Screen Structure & Content

## Screen Hierarchy

### Public/Unauthenticated Screens
1. Landing Page
2. Product Catalog
3. Product Details
4. Login/Register
5. About Us
6. Contact Us
7. Terms & Conditions
8. Privacy Policy

### Customer Portal Screens
1. Customer Dashboard
2. Browse Products
3. Product Details
4. Quotation Request
5. My Quotations
6. My Rentals
7. Payment Page
8. Invoice History
9. Notifications
10. Profile Settings

### Staff Portal Screens
1. Staff Dashboard
2. Pickup List
3. Pickup Details
4. Return List
5. Return Details
6. Task History
7. Notifications
8. Profile Settings

### Admin Portal Screens
1. Admin Dashboard
2. Product Management
3. Quotation Management
4. Rental Management
5. User Management
6. Pickup/Return Management
7. Invoice Management
8. Reports & Analytics
9. System Settings
10. Notification Center

## Detailed Screen Specifications

### 1. Landing Page

**Purpose:** Welcome visitors and showcase rental offerings

**Components:**
- Hero section with value proposition
- Featured product categories
- How it works section
- Testimonials
- Call-to-action buttons

**Content Elements:**
```
Header:
- Logo
- Navigation menu (Products, About, Contact, Login)
- Search bar
- User account/cart icons

Hero Section:
- Main headline: "Rent What You Need, When You Need It"
- Subheadline: "Access premium products with flexible rental terms"
- Primary CTA: "Browse Products"
- Secondary CTA: "Learn More"
- Hero image/video

Features Section:
- Flexible rental periods
- Secure payments
- Professional delivery
- 24/7 customer support

How It Works:
1. Browse & Select
2. Request Quote
3. Confirm & Pay
4. Enjoy Your Rental

Footer:
- Company information
- Quick links
- Contact details
- Social media links
```

### 2. Product Catalog

**Purpose:** Display available rental products with search and filter

**Components:**
- Product grid/list view
- Search and filter sidebar
- Sorting options
- Pagination
- Product cards

**Content Elements:**
```
Header:
- Breadcrumb navigation
- Search bar with autocomplete
- Filter toggle button
- View options (grid/list)
- Sort dropdown

Filters Panel:
- Categories
- Price range
- Rental duration
- Availability dates
- Product features
- Brand/manufacturer

Product Cards:
- Product image
- Product name
- Starting price
- Rental terms (hourly/daily/weekly)
- Availability indicator
- Quick view button
- Add to favorites

Pagination:
- Results count
- Page numbers
- Items per page selector
```

### 3. Product Details

**Purpose:** Detailed product information and rental options

**Components:**
- Product image gallery
- Product information
- Rental configuration
- Availability calendar
- Related products

**Content Elements:**
```
Product Gallery:
- Main product image
- Multiple angle views
- Zoom functionality
- 360° view (if available)

Product Information:
- Product name and description
- Technical specifications
- Rental terms and conditions
- What's included
- Usage guidelines

Rental Configuration:
- Date picker (start/end dates)
- Duration calculator
- Quantity selector
- Additional options/accessories
- Price breakdown

Availability Section:
- Calendar view
- Available/unavailable dates
- Booking conflicts indicator
- Alternative suggestions

Action Buttons:
- Request Quotation
- Add to Wishlist
- Share Product
- Contact Support

Additional Information:
- Delivery information
- Return policy
- Insurance options
- Customer reviews
```

### 4. Customer Dashboard

**Purpose:** Central hub for customer account management

**Components:**
- Quick stats overview
- Recent activities
- Action shortcuts
- Notifications panel

**Content Elements:**
```
Welcome Section:
- Personalized greeting
- Account status
- Membership level
- Quick actions

Statistics Cards:
- Active rentals count
- Pending quotations
- Total spent this year
- Upcoming returns

Recent Activities:
- Latest quotation requests
- Recent payments
- Delivery updates
- Return completions

Quick Actions:
- Browse Products
- View Active Rentals
- Request New Quotation
- Pay Pending Invoices

Notifications Panel:
- System notifications
- Rental reminders
- Payment alerts
- Promotional offers

Navigation Menu:
- Dashboard (current)
- My Rentals
- Quotations
- Payments & Invoices
- Profile Settings
- Help & Support
```

### 5. Staff Dashboard

**Purpose:** Operations center for staff members

**Components:**
- Task overview
- Daily schedule
- Performance metrics
- Quick actions

**Content Elements:**
```
Today's Overview:
- Scheduled pickups count
- Scheduled returns count
- Completed tasks
- Pending actions

Task Lists:
Pickup Tasks:
- Customer name
- Product details
- Pickup time
- Location
- Status

Return Tasks:
- Customer name
- Product details
- Return time
- Location
- Status

Performance Metrics:
- Tasks completed today
- On-time delivery rate
- Customer satisfaction score
- Monthly performance

Quick Actions:
- Mark Task Complete
- Report Issue
- Contact Customer
- View Route Map

Navigation:
- Dashboard (current)
- Pickup List
- Return List
- Task History
- Profile
```

### 6. Admin Dashboard

**Purpose:** Comprehensive business management interface

**Components:**
- KPI widgets
- Analytics charts
- Recent activities
- System alerts

**Content Elements:**
```
Key Performance Indicators:
- Total Active Rentals
- Monthly Revenue
- Customer Satisfaction
- Inventory Utilization

Analytics Charts:
- Revenue trends
- Popular products
- Customer acquisition
- Seasonal patterns

Recent Activities:
- New quotation requests
- Completed rentals
- Payment confirmations
- System alerts

Quick Management:
- Approve Pending Quotations
- Assign Pickup Tasks
- Process Returns
- Generate Reports

System Health:
- Server status
- API response times
- Error rates
- Backup status

Navigation Menu:
- Dashboard (current)
- Products
- Quotations
- Rentals
- Users
- Reports
- Settings
```

### 7. Quotation Management (Admin)

**Purpose:** Handle quotation requests and approvals

**Components:**
- Quotation list
- Quotation details
- Approval workflow
- Communication tools

**Content Elements:**
```
Quotation List:
Columns:
- Quotation ID
- Customer Name
- Product(s)
- Rental Period
- Total Amount
- Status
- Date Created
- Actions

Filter Options:
- Status (Pending, Approved, Rejected)
- Date range
- Customer
- Product category
- Amount range

Quotation Details Panel:
Customer Information:
- Name and contact
- Previous rental history
- Credit status
- Special notes

Product Details:
- Product specifications
- Rental duration
- Pricing breakdown
- Special requirements

Pricing Configuration:
- Base rental rate
- Duration adjustments
- Discount applications
- Additional fees
- Final total

Approval Actions:
- Approve quotation
- Request modifications
- Reject with reason
- Send to customer
- Convert to rental
```

### 8. Product Management (Admin)

**Purpose:** Manage rental inventory and product catalog

**Components:**
- Product list
- Product editor
- Pricing management
- Inventory tracking

**Content Elements:**
```
Product List:
Columns:
- Product Image
- Product Name
- Category
- Rental Price
- Availability Status
- Total Quantity
- Actions

Product Editor:
Basic Information:
- Product name
- Description
- Category selection
- Brand/manufacturer
- Product images

Rental Configuration:
- Rental units (hourly/daily/weekly)
- Minimum rental period
- Maximum rental period
- Advance booking required
- Availability calendar

Pricing Setup:
- Base pricing
- Duration-based pricing
- Seasonal adjustments
- Discount rules
- Special offers

Inventory Management:
- Total quantity
- Available quantity
- Reserved quantity
- Under maintenance
- Location tracking

Specifications:
- Technical details
- Dimensions
- Weight
- Power requirements
- Operating instructions
```

### 9. Payment Processing

**Purpose:** Secure payment handling for customers

**Components:**
- Payment method selection
- Payment form
- Security indicators
- Confirmation page

**Content Elements:**
```
Payment Summary:
- Quotation details
- Rental period
- Price breakdown
- Taxes and fees
- Total amount

Payment Methods:
- Credit/Debit cards
- PayPal
- Bank transfer
- Digital wallets
- Installment plans

Payment Form:
Card Payment:
- Card number
- Expiry date
- CVV
- Cardholder name
- Billing address

Security Features:
- SSL encryption indicator
- PCI compliance badge
- Fraud protection notice
- Security tips

Order Confirmation:
- Payment success message
- Transaction ID
- Receipt download
- Next steps
- Customer support contact
```

### 10. Notification Center

**Purpose:** Centralized notification management

**Components:**
- Notification list
- Filter options
- Notification details
- Settings panel

**Content Elements:**
```
Notification Types:
System Notifications:
- Rental confirmations
- Payment confirmations
- Delivery updates
- Return reminders

Marketing Notifications:
- New product announcements
- Special offers
- Seasonal promotions
- Newsletter updates

Operational Notifications:
- Task assignments
- Status updates
- System maintenance
- Emergency alerts

Notification Settings:
- Email notifications
- SMS notifications
- Push notifications
- Frequency preferences

Notification Actions:
- Mark as read
- Archive notification
- Respond to notification
- Set reminders
```

## Responsive Design Considerations

### Mobile Adaptations
- Simplified navigation
- Touch-friendly controls
- Optimized image sizes
- Streamlined forms

### Tablet Adaptations
- Hybrid layouts
- Gesture support
- Landscape/portrait modes
- Enhanced touch interactions

### Desktop Enhancements
- Multi-column layouts
- Advanced filtering
- Keyboard shortcuts
- Detailed data tables

## Accessibility Features

### Universal Design
- High contrast themes
- Text scaling options
- Keyboard navigation
- Screen reader support

### Compliance Standards
- WCAG 2.1 AA compliance
- Section 508 compliance
- ADA compliance
- International standards

## Content Management

### Dynamic Content
- Multilingual support
- Personalization
- A/B testing capability
- Real-time updates

### Static Content
- Help documentation
- Legal pages
- Contact information
- Company policies
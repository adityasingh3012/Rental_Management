# Rental Management Web Application – Frontend Development Guidelines

## Overview

**App Name:** Rental Management\
The Rental Management application streamlines the entire rental process, providing a unified platform to manage products, schedule pickups, and handle orders seamlessly.

Customers can browse available products, reserve dates, and checkout directly through the website portal. The system supports customized pricing for various time frames—hourly, weekly, monthly, or yearly.

---

## Roles

- **Customer**
- **End user**

---

## Core Rental Features

### 1. Rental Product Management

- **Define Rentable Products** – Mark products as rentable and configure units (e.g., per hour, day, week).
- **Custom Rental Duration** – Supports short-term and long-term rentals with flexible durations.
- **Product Availability** – View availability in calendar or list view to avoid overbooking.

### 2. Order and Rental Flow

- **Create rental quotations** – Convert to rental orders and generate rental contracts.
- **Review, confirm, and pay** – Customers can complete transactions online via the customer portal.
- **Pickup/Return Scheduling** – Track and schedule pickups and returns with precise timing.

### Notifications

- **Customer Notifications** – Automated reminders via email/portal alerts, sent *N* days before return.
- **End User Notifications** – Email reminders for upcoming returns to help prepare for pickup/follow-up.

> *N value can be customized to match business needs.*

### Payment Gateway Integration

- Support for secure gateways such as **PayPal, Stripe, Razorpay**.
- Enable online payments from quotations or orders.

---

## 3. Delivery Management

### Reservation (Order Confirmed)

- Reserve required items upon order confirmation.
- Prevents double-booking and ensures product readiness.

### Pickup (Delivery to the Customer)

- Auto-generate pickup documents for delivery teams.
- Update stock records when products are handed over.

### Return (Collecting Back from the Customer)

- Generate return documents at rental period end.
- Update stock records to make products available for the next rental.

---

## 4. Flexible Invoicing

- **Full upfront payment** – Charge full rental before pickup.
- **Partial payment / deposit** – Security deposit or first installment with later balance.
- **Late Return Fees** – Automatic calculation based on predefined rules.

---

## 5. Pricelist Management

- **Multiple Pricelists** – Segment by customer type, region, or duration.
- **Time-Dependent Pricing** – Variable rates per rental duration.
- **Discount Rules** – Percentage, fixed, or promotional discounts.
- **Product Category/Customer Rules** – Category-based or customer-specific pricing.
- **Validity Periods** – Seasonal/promotional date ranges.

---

## 6. Returns & Delays Handling

- Alerts for **late returns**.
- Automatic **late fees/penalties**.

---

## 7. Reports and Dashboards

### Features

- Late return alerts.
- Automatic late fee/penalty calculation.

### Downloadable Reports

- Formats: **PDF**, **XLSX**, **CSV**.
- Use cases: Analysis, sharing, record-keeping.

### Tracking Metrics

- Most rented products.
- Total rental revenue.
- Top customer.

---

## Development Guidelines : We are creating Frontend part

### Tech Stack

- **Frontend:** React (TypeScript) + Tailwind CSS.
- **Goal:** Modern, premium, and interactive UI/UX.

### Design Goals

- Follow blueprints for each page but ensure:
  - Clean separation of UI and logic for easy backend integration.
  - Component reusability.
  - API-friendly structure for backend devs.
  - Responsive design for desktop, tablet, and mobile.

### Creative Freedom

- You have complete creative freedom to enhance the user experience.
- The design should feel **modern**, **premium**, and **interactive** while remaining intuitive.

### Page Creation Process

- Blueprints will be provided **one by one**.
- Implement each page ensuring consistent styling, easy navigation, and backend-friendly architecture.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based tax calculation web application built with Vite. The app provides Thai tax tools including withholding tax calculation (ภาษีหัก ณ ที่จ่าย) and VAT calculation with support for both VAT-exclusive and VAT-inclusive calculations.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture

### Core Structure
- **Single Page Application**: Built with React 19 and Vite
- **Main Component**: `src/assets/TaxCalculatorApp.jsx` contains the entire application logic
- **Styling**: Uses Tailwind CSS for styling with custom gradients and animations
- **Icons**: Lucide React for consistent iconography

### Application Features
The app is organized around two main calculators:

1. **Withholding Tax Calculator** (`tax-calculator`):
   - Calculates invoice amount needed to receive a desired net amount after tax deduction
   - Supports tax rates: 1%, 2%, 3%, 5%, 10%
   - Formula: `invoiceAmount = desiredAmount / (1 - taxRate)`

2. **VAT Calculator** (`vat-calculator`):
   - **VAT นอก (Exclude)**: Calculate total from base amount
   - **VAT ใน (Include)**: Extract base amount from VAT-inclusive total
   - Default 7% VAT rate with custom rate input option

### UI Components
- **Responsive Design**: Mobile-first with collapsible sidebar
- **State Management**: Local React state with hooks
- **Animations**: Custom CSS animations for result displays
- **Thai Language Interface**: All text in Thai with Thai number formatting

### Key Files
- `src/assets/TaxCalculatorApp.jsx` - Main application component (400+ lines)
- `src/App.jsx` - Simple wrapper component
- `src/main.jsx` - React application entry point
- `public/Image/logo-psi.png` - Company logo asset

## Code Patterns

### State Management
Uses React hooks with clear separation:
- Calculator-specific states (`selectedTaxRate`, `desiredAmount`, `result`)
- VAT-specific states (`vatType`, `vatRate`, `vatAmount`, `vatResult`)
- UI states (`sidebarOpen`, `activeMenu`)

### Calculation Functions
- `calculateInvoice()` - Withholding tax calculations
- `calculateVAT()` - VAT calculations with type switching
- `formatNumber()` - Thai locale number formatting

### Component Structure
Single large component with conditional rendering based on `activeMenu` state. Uses Tailwind classes extensively for styling with consistent design patterns.

## Development Notes

- **File Organization**: Main logic consolidated in single component (could be refactored into smaller components)
- **Styling**: Heavy use of Tailwind utility classes with custom gradient themes
- **Icons**: Consistent Lucide React icon usage throughout
- **Responsive**: Mobile-responsive with hamburger menu and overlay
- **Localization**: Hardcoded Thai text (could be extracted to i18n if needed)
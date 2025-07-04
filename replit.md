# Ultimate Guide to Penetration Testing with Debian-based OS

## Overview

This is a comprehensive React-based web application that delivers a static cybersecurity course focused on penetration testing using Debian-based operating systems. The application is built as a fully responsive learning management system with progress tracking capabilities, designed to teach ethical hacking and penetration testing fundamentals through 12 structured modules.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API for progress tracking
- **Build Tool**: Vite for development and production builds
- **Theme System**: Custom dark/light theme provider with cybersecurity aesthetics

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Environment**: Node.js with ES modules
- **Development**: Hot module replacement via Vite integration
- **Storage**: In-memory storage implementation (expandable to database)
- **API Structure**: RESTful API pattern ready for implementation

### Database Architecture
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL with Neon serverless support
- **Schema**: User management schema defined
- **Migrations**: Automated database migrations support

## Key Components

### Learning Management System
- **Module System**: 12 comprehensive modules covering penetration testing fundamentals
- **Progress Tracking**: localStorage-based completion tracking
- **Content Delivery**: Static HTML files loaded dynamically for each module
- **Navigation**: Sidebar navigation with progress indicators
- **Responsive Design**: Mobile-first responsive layout

### User Interface Components
- **Header**: Dynamic page titles and search functionality
- **Sidebar**: Collapsible navigation with progress overview
- **Cards**: Module cards with completion status and metadata
- **Theme Toggle**: Dark/light mode switching
- **Scroll-to-Top**: Smooth scrolling utility component

### Content Structure
- **Static Content**: HTML modules stored in `/public/modules/`
- **Metadata**: JSON-based module configuration
- **Assets**: Support for images and downloadable resources
- **Styling**: Consistent cybersecurity theme throughout

## Data Flow

### Module Loading
1. User navigates to module detail page
2. Component fetches HTML content from static files
3. Content is rendered with proper styling
4. Progress tracking updates localStorage

### Progress Management
1. Progress context provider manages completion state
2. localStorage persistence for user progress
3. Real-time progress updates across components
4. Progress statistics calculation and display

### Theme Management
1. Theme provider manages dark/light mode preferences
2. CSS variables for consistent theming
3. System preference detection and manual override
4. Persistent theme selection via localStorage

## External Dependencies

### UI Framework
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library

### Development Tools
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast development server and build tool
- **PostCSS**: CSS processing with Autoprefixer
- **ESLint/Prettier**: Code quality and formatting

### Database & ORM
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Production-ready database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle Kit**: Database migrations and tooling

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: Local PostgreSQL or Neon development database
- **Environment Variables**: Local `.env` file configuration
- **Hot Reloading**: Full-stack development with live updates

### Production Build
- **Frontend**: Static asset generation via Vite
- **Backend**: Node.js server with Express
- **Database**: Managed PostgreSQL instance
- **Deployment**: Platform-agnostic build output

### Static Content Delivery
- **Module Files**: Served as static assets
- **Images**: Optimized for web delivery
- **Caching**: Browser caching for static resources
- **CDN Ready**: Architecture supports CDN integration

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
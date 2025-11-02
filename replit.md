# SEO Dashboard for Small Businesses

## Project Overview
A comprehensive SEO analytics dashboard that helps small business owners understand their website's SEO health through simple, visual insights. The dashboard integrates with Google Analytics, Google Search Console, and Google PageSpeed Insights (Lighthouse) to provide actionable data.

## Tech Stack
- **Frontend**: React with TypeScript, Wouter for routing, TailwindCSS + Shadcn UI
- **Backend**: Node.js with Express
- **Database**: PostgreSQL (Neon)
- **Authentication**: Replit Auth (supports email/password and Google OAuth)
- **APIs**: Google Analytics API, Google Search Console API, PageSpeed Insights API
- **Data Visualization**: Recharts
- **State Management**: TanStack Query (React Query)

## Project Structure

### Frontend (`client/`)
- `/src/pages/` - All page components
  - `Landing.tsx` - Landing page for non-authenticated users
  - `Dashboard.tsx` - Main SEO overview with metrics and charts
  - `Pages.tsx` - Page performance insights
  - `Keywords.tsx` - Keyword rankings and analysis
  - `Performance.tsx` - Lighthouse performance audits
  - `Analytics.tsx` - Google Analytics data visualization
  - `Settings.tsx` - Account and integration management
- `/src/components/` - Reusable UI components
  - `app-sidebar.tsx` - Main navigation sidebar
  - `MetricCard.tsx` - Metric display cards with trend indicators
  - `PerformanceScoreCard.tsx` - Circular score indicators
  - `ConnectionCard.tsx` - Google service connection cards
  - `EmptyState.tsx` - Empty state component
- `/src/hooks/` - Custom React hooks
  - `useAuth.ts` - Authentication hook
- `/src/lib/` - Utility functions
  - `authUtils.ts` - Auth error handling

### Backend (`server/`)
- `routes.ts` - API routes (to be implemented)
- `storage.ts` - Database access layer (to be implemented)
- `db.ts` - Database connection (to be implemented)
- `replitAuth.ts` - Replit Auth setup (to be implemented)

### Shared (`shared/`)
- `schema.ts` - Database schema and TypeScript types
  - `users` - User accounts (Replit Auth)
  - `sessions` - Session storage (Replit Auth)
  - `googleConnections` - OAuth connections to Google services
  - `seoMetrics` - Cached SEO data
  - `lighthouseAudits` - Performance audit results

## Features Implemented (Frontend)

### ✅ Phase 1: Schema & Frontend (Complete)
1. **Authentication System**
   - Replit Auth integration with Google OAuth support
   - Protected routes for authenticated users
   - User profile display with avatar

2. **Navigation & Layout**
   - Responsive sidebar navigation
   - Main dashboard layout with header
   - User menu with dropdown

3. **Dashboard Pages**
   - **Overview**: Total clicks, impressions, CTR, avg position with trend indicators
   - **Traffic Charts**: Line charts for clicks/impressions over time
   - **Top Pages**: Bar chart and data table
   - **Keywords**: Searchable keyword table with rankings
   - **Pages**: Searchable page performance table
   - **Performance**: Lighthouse audit runner with score cards
   - **Analytics**: Traffic sources pie chart, session trends
   - **Settings**: Google connection management, account info

4. **UI Components**
   - Metric cards with change indicators (↑↓)
   - Circular performance score indicators
   - Interactive data tables with hover states
   - Beautiful charts using Recharts
   - Loading states with skeletons
   - Empty states with call-to-action
   - Connection status cards

5. **Design System**
   - Professional blue color scheme
   - Inter font for UI, JetBrains Mono for metrics
   - Consistent spacing and typography
   - Responsive layout for mobile/tablet/desktop
   - Dark mode support (via Tailwind config)

## Features To Implement

### 🔨 Phase 2: Backend (Next)
1. **Authentication**
   - Replit Auth server setup
   - Protected API routes
   - Session management

2. **Google OAuth Integration**
   - OAuth 2.0 flow for Analytics
   - OAuth 2.0 flow for Search Console
   - Token storage and refresh

3. **API Endpoints**
   - `/api/seo/overview` - SEO overview metrics
   - `/api/seo/keywords` - Keyword data
   - `/api/seo/pages` - Page performance
   - `/api/analytics/overview` - Analytics data
   - `/api/lighthouse/audit` - Run Lighthouse audit
   - `/api/google/connections` - Manage connections
   - `/api/google/connect/:service` - Initiate OAuth
   - `/api/google/disconnect/:service` - Disconnect service

4. **Google API Integration**
   - Google Analytics Reporting API calls
   - Search Console API calls
   - PageSpeed Insights API calls

5. **Data Caching**
   - Cache SEO metrics for performance
   - Periodic data refresh

### 🔨 Phase 3: Integration & Testing (Final)
1. Connect frontend to backend APIs
2. Implement error handling
3. Add loading states
4. Test all user flows
5. Get architect review

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_PAGESPEED_API_KEY` - PageSpeed Insights API key

## Design Guidelines
See `design_guidelines.md` for detailed design specifications including:
- Typography system
- Spacing primitives
- Component patterns
- Color system
- Responsive breakpoints
- Interaction patterns

## User Flows

### First-Time User
1. Land on marketing page
2. Click "Sign In" → Replit Auth
3. Redirected to Dashboard (empty state)
4. Go to Settings
5. Connect Google Analytics
6. Connect Search Console
7. Return to Dashboard → See metrics

### Returning User
1. Sign in → Dashboard
2. View SEO overview
3. Navigate to Keywords → See rankings
4. Navigate to Performance → Run audit
5. Navigate to Analytics → View traffic

## Development Commands
- `npm run dev` - Start development server
- `npm run db:push` - Push database schema changes
- `npm run build` - Build for production

## Current Status
- ✅ Database schema designed and migrated
- ✅ Frontend components built with exceptional design quality
- ✅ Design system configured (Inter font, professional blue theme)
- ✅ All page layouts complete and responsive
- ✅ Backend implementation complete (Replit Auth, API routes, database storage)
- ✅ Google OAuth flow implemented
- ✅ PageSpeed Insights API integration for Lighthouse audits
- ⏳ Live Google Analytics/Search Console data fetching (currently using demo data)
- ✅ Full authentication flow working

## Implementation Notes

### Demo Data vs Live Data
The current implementation uses demonstration data for SEO metrics, keywords, and page analytics. This is intentional for the MVP to showcase the complete UI/UX flow without requiring active Google accounts with existing analytics data. The API structure is fully in place:

- **Google OAuth Connection**: Fully functional - users can connect/disconnect Google Analytics and Search Console
- **Lighthouse Audits**: Fully functional - uses real PageSpeed Insights API
- **SEO Metrics**: Returns demo data - structure ready for Google Search Console API integration
- **Analytics**: Returns demo data - structure ready for Google Analytics API integration

To enable live data:
1. Connect Google accounts in Settings
2. Backend will need to call Google Analytics Reporting API and Search Console API
3. OAuth token refresh logic is already implemented
4. Data caching layer is ready in the database

### What Works Now
1. ✅ User authentication with Replit Auth (email/password + Google OAuth)
2. ✅ Beautiful, responsive dashboard UI following design guidelines
3. ✅ Google OAuth connection flow (connect/disconnect Analytics & Search Console)
4. ✅ Lighthouse performance audits using PageSpeed Insights API
5. ✅ All navigation and page transitions
6. ✅ Loading states, empty states, error handling
7. ✅ Data visualization with Recharts
8. ✅ Settings page with account management

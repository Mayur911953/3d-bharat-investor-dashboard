# 3D Bharat — Investor & Corporate Dashboard

A submission-ready frontend dashboard for the Full Stack Developer (3D Bharat) task.

## What is implemented

- 60 mock deals and 12 investors stored as JSON
- Simulated service layer using Promises and 300–800ms delays
- Search with debounce
- Industry/risk filtering
- Sorting and pagination
- Investor dashboard with summary cards
- Investment growth, industry, risk and ROI visualizations
- Deal explorer and deal details page
- ROI projection chart
- Risk analysis tab
- Frontend recommendation engine with weighted match score
- Memoized recommendation calculation
- Redux Toolkit for UI state
- Saved deals / My Investments
- Corporate dashboard
- Loading and empty states
- Responsive modern fintech UI
- Dark dashboard theme
- Feature/service/hook/utils-style separation

## Architecture

`data` → local JSON datasets

`services` → simulated API/business logic

`hooks` → reusable client-side behavior such as debounce and local storage

`store` → Redux Toolkit state

`components` → reusable presentation components

`app` → route/page composition only

Business filtering, scoring and data fetching are intentionally kept outside the visual components.

## Data flow

1. Page creates filter state.
2. Search input passes through `useDebounce`.
3. Page calls `dealService`.
4. Service waits 300–800ms to simulate network latency.
5. Service filters/sorts/paginates the JSON dataset.
6. Component renders loading, empty or data state.
7. Recommendation page uses `recommendationService` to score and rank deals.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production

```bash
npm run build
npm start
```

Deploy to Vercel by importing this GitHub repository.

## Optimization strategies

- `useMemo` for chart datasets and recommendation calculations
- `useCallback` for service request functions
- Debounced search to avoid excessive simulated requests
- Pagination to avoid rendering all 60 records at once
- Reusable chart/table components
- JSON data kept separate from UI
- Next.js App Router

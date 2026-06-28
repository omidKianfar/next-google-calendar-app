# Project Architecture – Next Google Calendar App

This document describes the architecture, module design, data flow, and engineering decisions behind the Next Google Calendar App. The application is a client-side Google Calendar manager built with Next.js, React, TypeScript, Google OAuth 2.0 (Implicit Flow), FullCalendar, and a modular UI system.

## 1. Overview

The app enables authenticated Google users to:

- Log in using Google OAuth
- Read and manage Google Calendar events
- Create, update, and delete events
- View events via FullCalendar UI
- Interact with modals and forms powered by TypeScript and React Hook Form

All Google API interactions run fully in Client-Side Rendering (CSR) mode.

## 2. Architectural Principles

### Client-Side Rendering (CSR)

All Google Calendar API requests execute in the browser using the OAuth access token. The app remains serverless and lightweight.

### Separation of Concerns (SoC)

- Auth isolated from UI
- Calendar CRUD logic inside `useGoogleCalendar`
- Forms separated into reusable components
- Validation isolated via Yup schemas
- UI components remain presentational

### Custom Hooks

All state and logic for calendar operations live inside a single hook:

```
useGoogleCalendar(accessToken)
```

### Lazy Loading

Modals and heavy interactive components are loaded using `React.lazy()` and `<Suspense>`.

## 3. Project Structure

```text
src/
├── app
│   ├── layout.tsx
│   └── (app)
│       ├── page.tsx
│       └── layout.tsx
├── components/
│   ├── assets/
│   ├── atom/
│   └── pages/
│       └── calendar/
├── hooks/
│   └── useGoogleCalendar.tsx
└── types/

jest.config.js
jest.setup.ts
tailwind.config.js
tsconfig.json
```

## 4. Authentication Layer

Auth uses:

- `@react-oauth/google`
- OAuth 2.0 Implicit Flow
- In-memory token storage — tokens are kept in memory only (not persisted to localStorage/cookies) to avoid token-sync issues across tabs and reduce exposure to client-side storage attacks
- The OAuth Provider is wrapped at the root level (`src/(app)/layout.tsx`)

Environment variables:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_NEXT_URL=
```

Key components:
- `Signin.tsx`
- `LogoutModal.tsx`

## 5. Business Logic — `useGoogleCalendar`

Responsibilities:

- Hold the access token
- Fetch the primary calendar ID
- Fetch events
- Create, update, and delete events
- Manage loading and error states
- Expose structured functions for the UI
- Trigger toast notifications (Notistack)

Effect lifecycle:

1. After login → fetch calendar ID
2. After calendar ID → fetch events

## 6. UI Layer

### FullCalendar Integration

`CalendarComponent` handles:

- Rendering events
- `dateClick` → opens the Create Event modal
- `eventClick` → opens the Event Detail modal, with options to view details, edit, or delete the event
- Re-rendering after each CRUD operation by forcing FullCalendar's `refetchEvents()`
- A custom Google Calendar integration (not an official plugin)

Plugins used: `dayGrid`, `timeGrid`, `list`, `interaction`, `googleCalendar`.

### Modal System

`ModalContainer` provides:

- ESC key support
- Backdrop click-to-close
- Focus locking

### Form System

Tools:
- `react-hook-form`
- `yupResolver`
- `yup` for schema validation

Schema supports:
- Required fields
- Validation that `endTime` is after `startTime`
- Optional description field

## 7. Data Flow

```text
User Login
  ↓ accessToken
useGoogleCalendar
  ↓ Fetch Calendar ID
  ↓ Fetch Events
CalendarComponent (FullCalendar)
  ↓ User interactions
Modals (Create / Edit / Delete)
  ↓ CRUD operations
    Create  → CreateEventModal → SureCreateModal (confirmation)
    Detail  → DetailModal
    Edit    → EventEdit → SureEditModal
    Delete  → SureDeleteModal
  ↓ Events refreshed
  ↓ Toast notification shown
UI updated
```

## 8. Testing Strategy

Tools:
- Jest
- React Testing Library

Existing tests:
- `schema.test.ts`
- `ModalContainer.test.tsx`
- `CreateEventModal.test.tsx`
- `EditBody.test.tsx`
- `input-field.test.tsx`
- `textarea-field.test.tsx`
- `time-input-field.test.tsx`

Jest config: `jsdom` test environment, `ts-jest` for TypeScript support.

## 9. Tech Stack

- Next.js
- React
- TypeScript
- Google OAuth 2.0 (Implicit Flow)
- Google Calendar API
- FullCalendar
- Tailwind CSS
- React Hook Form
- Yup
- Notistack
- Day.js
- React Suspense / Lazy
- react-spinners
- lottie-react

## 10. Summary

The architecture favors a lightweight, CSR-only setup with clear separation between auth, business logic, and UI, type-safe forms, and a modular component structure that should make it straightforward to extend with new calendar features.

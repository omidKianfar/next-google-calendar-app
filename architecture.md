# Project Architecture – Next Google Calendar App

This document describes the architecture, module design, data flow, and engineering decisions behind the Next Google Calendar App. The application is a client‑side Google Calendar manager built with Next.js 16, React 19, TypeScript, Google OAuth 2.0 (Implicit Flow), FullCalendar, and a modular UI system.

## 1. Overview

The app enables authenticated Google users to:

- Log in using Google OAuth
- Read and manage Google Calendar events
- Create, update, and delete events
- View events via FullCalendar UI
- Interact with modals and forms powered by TypeScript and RHF

All Google API interactions run fully in Client‑Side Rendering (CSR) mode.

## 2. Architectural Principles

### Client-Side Rendering (CSR)

All Google Calendar API requests execute in the browser using the OAuth access token.  
The app remains serverless and lightweight.

### Separation of Concerns (SoC)

- Auth isolated from UI
- Calendar CRUD logic inside `useGoogleCalendar`
- Forms separated into reusable components
- Validation isolated via Yup schemas
- UI components remain presentational

### Custom Hooks

All state and logic for Calendar operations live inside:
useGoogleCalendar(accessToken)

### Lazy Loading

Modals and heavy interactive components load using:
React.lazy() + <Suspense> : for modal lazy loading

### Accessibility (A11y)

Includes ARIA labels, keyboard support, ESC close, focus trapping, and high‑contrast UI.

## 3. Project Structure

src/
├── app/
│ ├── layout.tsx
│ └── (app)/
│ ├── page.tsx
│ └── layout.tsx
├── components/
│ ├── assets/
│ ├── atom/
│ └── pages/
│ └── calendar/
├── hooks/
│ └── useGoogleCalendar.tsx
└── types/

jest.config.js
jest.setup.ts
tailwind.config.js
tsconfig.json

## 4. Authentication Layer

Auth uses:

- @react-oauth/google
- OAuth 2.0 Implicit Flow
- In-memory token storage
- OAuth Provider is wrapped at the root level "src/(app)/layout.tsx".
- Tokens are stored in memory only to avoid persistence/sync issues.

Env variables:
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_NEXT_URL=

Components:

- Signin.tsx
- LogoutModal.tsx

## 5. Business Logic — useGoogleCalendar

Responsibilities:

- Hold the accessToken
- Fetch primary calendar ID
- Fetch events
- Create / update / delete events
- Manage loading/error states
- Expose structured functions for UI
- Trigger toast notifications (Notistack)

Effect lifecycle:

1. After login → fetch calendar ID
2. After calendar ID → fetch events

## 6. UI Layer

### FullCalendar Integration

CalendarComponent handles:

- Rendering events
- dateClick → open Create Event modal
- eventClick → open Event Detail modal to show Event Details, Edit Event and Delete Event
- Calendar re-renders after each CRUD and forces FullCalendar refetchEvents()
- custom googleCalendar integration (not an official plugin)

Includes plugins:
dayGrid, timeGrid, list, interaction, googleCalendar

### Modal System

ModalContainer provides:

- ESC support
- Backdrop close
- Focus locking

### Form System

Tools:

- react-hook-form
- yupResolver
- yup for validation

Schema supports:

- Required fields
- Validation for endTime > startTime
- Optional description

## 7. Data Flow

User Login
↓ accessToken
useGoogleCalendar
↓ Fetch Calendar ID
↓ Fetch Events
CalendarComponent (FullCalendar)
↓ User interactions
Modals (Create/Edit/Delete)
↓ CRUD operations
Modal (Create)
↓ CreateEventModal
↓ SureCreateModal (confirmation)
Modal (detail)
↓ DetailModal
Edit → EventEdit → SureEditModal
Delete → SureDeleteModal
Events refreshed
↓ Toast notifications
UI updated

## 8. Testing Strategy

Tools:

- Jest 30.2.0
- React Testing Library

Existing tests:

- schema.test.ts
- ModalContainer.test.tsx
- CreateEventModal.test.tsx
- EditBody.test.tsx
- input-field.test.tsx
- textarea-field.test.tsx
- time-input-field.test.tsx

Jest config:

- jsdom
- ts-jest

## 9. Tech Stack

- Next.js 16
- React 19
- TypeScript
- Google OAuth 2.0 (Implicit Flow)
- Google Calendar API
- FullCalendar 6
- Tailwind CSS
- React Hook Form
- Yup
- Notistack
- Day.js
- React Suspense / Lazy
- react-spinners
- lottie-react

## 10. Conclusion

This architecture prioritizes:

- Lightweight CSR-only operations
- Strong modularization
- Clear event flow
- Type-safe forms and schemas
- Scalable component design
- Highly maintainable components
- Accessibility-first UI behaviors (keyboard, ARIA, focus-lock)

The result is a modern and maintainable Google Calendar client built on industry best practices.

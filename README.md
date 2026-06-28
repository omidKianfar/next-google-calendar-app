# Google Calendar App

[Source Code](https://github.com/omidKianfar/next-google-calendar-app)

A full-featured Google Calendar client built with Next.js, TypeScript, and Google OAuth, allowing users to view, create, update, and delete calendar events through a clean UI.

This project is primarily designed for desktop browsers and integrates the official Google Calendar API via secure OAuth 2.0 authentication.

For a detailed breakdown of architectural decisions, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Features

- Google OAuth login
- View Google Calendar events
- Create, edit, and delete events
- Real-time event rendering using FullCalendar
- Modern UI built with Tailwind CSS
- Modular, scalable component architecture
- Unit tests with Jest and React Testing Library

## Screenshots

### Calendar View
![Screenshot 1](public/image.png)

### Events & Modals
![Screenshot 2](public/image-4.png)

## Tech Stack

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS
- FullCalendar
- React Hook Form
- Yup
- Day.js
- Lottie React
- Lucide Icons
- Notistack
- Google Fonts

**Auth & API**
- Google OAuth 2.0 (Implicit Flow)
- Google Calendar API

**Testing**
- Jest
- React Testing Library

## Installation

### 1. Clone the project

```bash
git clone https://github.com/omidKianfar/next-google-calendar-app.git
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run development server

```bash
npm run dev
```

## Google OAuth Setup (Required)

### 1. Go to Google Cloud Console

[https://console.cloud.google.com/](https://console.cloud.google.com/)

### 2. Create a new project

- Name: **next-google-calendar-app**

### 3. Configure OAuth consent screen

- App type: **External**
- App name: **next-google-calendar-app**
- Add your email
- Publish for testing

### 4. Create OAuth Client

- Application type: **Web Application**
- Authorized origins:
  ```
  http://localhost:3000
  ```
- Authorized redirect URIs:
  ```
  http://localhost:3000
  ```

### 5. Add environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_NEXT_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
```

> These values are local and private.

### 6. Enable Google Calendar API

Google Cloud → APIs & Services → Library → **Google Calendar API** → Enable

### 7. Add Calendar API Scopes

Enable:
- `/auth/calendar`
- `/auth/calendar.events`

## Running Tests

```bash
npm run test
```

## Project Structure

```text
src
├── app
│   ├── layout.tsx
│   └── (app)
│       ├── page.tsx       # Main calendar page
│       └── layout.tsx
├── components/
│   ├── assets/
│   ├── atom/
│   └── pages/
│       └── calendar/
├── hooks/
│   └── useGoogleCalendar.tsx
└── types/
```

### Architecture Principles

- Separation of concerns (UI / logic / API)
- Reusable components
- Lazy-loaded modals for performance
- OAuth logic isolated from UI
- FullCalendar rendered inside Suspense for smoother loading

## Copyright

© 2026 Omid Kianfar

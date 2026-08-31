# Complete Realty Admin Panel

Next.js + React responsive real-estate administration panel matching the supplied website's visual style.

## Pages
Dashboard, Properties, Users, Agents, Inquiries, Appointments, Gallery, Reviews, Reports, Settings.

## UI functionality included
Client-side navigation, property filtering/search, add/edit modal forms, delete actions, user/agent management UI, inquiry reply modal, calendar, gallery, reviews, reports, settings/security controls, responsive mobile navigation.

## Run
npm install
npm run dev

Then open http://localhost:3000

## Backend integration
The UI uses local sample arrays so it runs immediately. Replace those arrays and handlers with Axios/fetch calls to your Express/MongoDB API. Recommended API groups: /properties, /users, /agents, /inquiries, /appointments, /gallery, /reviews, /auth, /settings.

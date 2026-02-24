import { atom } from 'jotai'



export const listNotesAtom = atom([
    {
        id: 1,
        title: 'Draft Database Schema',
        notes: 'Define the initial tables for users, tasks, and tags. Ensure proper indexing for foreign…'
    },
    {
        id: 2,
        title: 'Update Project README',
        notes: 'Add installation instructions, environment variable setup, and a brief architectural…'
    },
    {
        id: 3,
        title: 'Fix Login Authentication Bug',
        notes: 'Investigate the token expiration causing users to be prematurely logged out...'
    },
    {
        id: 4,
        title: 'Implement API Rate Limiting',
        notes: 'Set up middleware to limit API requests to 100 per hour per user to prevent abuse.'},
    {
        id: 5,
        title: 'Review Dark Contrast',
        notes: 'Audit the UI components in dark mode to ensure all text meets WCAG AA accessibility standards for contrast and readability.'},
    {
        id: 6,
        title: 'Prepare Deployment Scripts',
        notes: 'Create GitHub Actions workflow for CI/CD to automate testing and deployment to production.'},
   
])
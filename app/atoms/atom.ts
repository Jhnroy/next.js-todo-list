import { atom } from 'jotai'
import { title } from 'process'
import React from 'react'

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
   
])
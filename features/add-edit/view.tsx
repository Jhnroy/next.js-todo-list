'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { listNotesAtom } from '@/atoms/atom'
import { useRouter } from 'next/navigation'

export const View = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [allTasks, setAllTasks] = useAtom(listNotesAtom)

  const handleSubmit = () => {
    setAllTasks((tasks) => [
      ...tasks,
      {
        id: tasks.length + 1,
        title: title,
        notes: description,
      },
    ])
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F7F8] px-4">
      
      <div className="mb-3 justify-start w-full max-w-md">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2" size={18} /> Back to List
        </Link>
      </div>

      <div className="w-full max-w-md 
      bg-white 
      rounded-xl 
      shadow-md 
      p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create / Edit Task</h1>

       
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task notes"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
          <div className="flex justify-center space-x-2 text-center mt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Save
            </button>
            <Link
              href="/"
              className="flex-1 bg-gray-200 hover:bg-gray-300  text-gray-700 px-4 py-2 rounded-md transition"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>

      
      <p className="text-xs text-gray-400 mt-6">Intern Learning Platform © 2026</p>
    </div>
  )
}

export default View
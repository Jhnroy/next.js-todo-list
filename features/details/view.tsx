'use client'

import Link from 'next/link'
import { ArrowLeft, Pencil } from 'lucide-react'
import React from 'react'
import { useAtom } from 'jotai'
import { listNotesAtom } from '@/atoms/atom'

interface Task {
  id: number
  title: string
  notes: string
}

export const Viewdetails = ({ id }: { id: string }) => {
  const [allTasks] = useAtom<Task[]>(listNotesAtom)

  const task = allTasks.find((t) => t.id === Number(id))

  if (!task) return <p>Task not found</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F7F8] px-4">
      <div className="mb-3 justify-start w-full max-w-md">
        <Link href="/"
        className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="inline mr-2" />
          Back to list
        </Link>
      </div>
    <div className="w-full max-w-md 
      bg-white 
      rounded-xl 
      shadow-md 
      p-8">
        <div className="flex flex-row gap-4 mt-4 items-center">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <Link href={`/edit/${task.id}`} className="flex items-center gap-2">
            <Pencil size={20} className="bg-blue-500 text-white p-2 rounded w-10 h-10" />
          </Link>
        </div>

        <div className="mt-4">
          <p className="text-gray-500"><strong>Task ID:</strong> {task.id}</p>
          <h3 className="mt-2"><strong>Description <br /></strong> <span className="text-gray-600">{task.notes}</span></h3>
        </div>
      </div>
    </div>
  )
}

export default Viewdetails
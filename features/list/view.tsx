'use client'

import React, { useState } from 'react'
import { CirclePlus, Pencil, Trash, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { listNotesAtom } from '@/atoms/atom'

export const View = () => {
  const [allTasks, setAllTasks] = useAtom(listNotesAtom)

  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const handleDelete = () => {
    setAllTasks(prev => prev.filter(task => task.id !== selectedId))
    setOpenModal(false)
    setSelectedId(null)
  }

  const handleCancel = () => {
    setOpenModal(false)
    setSelectedId(null)
  }

  return (
    <div className="p-8">
     
      <header className="flex justify-end mb-5">
        <Link href="/add">
          <CirclePlus
            size={20}
            className="bg-black text-white p-2 w-10 h-10 rounded-full"
          />
        </Link>
      </header>

    
      <main className="flex flex-row gap-4 w-full mt-5">
        {allTasks.map(task => (
          <div
            key={task.id}
            className="p-4 
            hover:border-gray-500 
            rounded-xl 
            flex flex-col 
            w-full
            shadow-xl/20
            hover:shadow-xl/40
            transition-shadow duration-300 ease-in-out
            bg-white"
          >
           
            <div>
              <h2 className="text-lg font-bold">{task.title}</h2>
              <p className="text-gray-600">{task.notes}</p>
            </div>

          
            <div className="flex gap-2 justify-end mt-4 pt-4 ">
              <Link
                href={`/${task.id}/edit`}
                className=" text-gray-600 p-2 rounded 
                hover:bg-gray-600 animation duration-300 ease-in-out hover:text-white 
                w-10 h-10 flex items-center justify-center"
              >
                <Pencil size={18} />
              </Link>

              <button
                onClick={() => {
                  setSelectedId(task.id)
                  setOpenModal(true)
                }}
                className=" text-gray-600 p-2 rounded w-10 h-10 
                hover:bg-red-600 hover:text-white  animation duration-300 ease-in-out
                flex items-center justify-center"
              >
                <Trash size={18} />
              </button>
            </div>

          </div>
        ))}
      </main>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCancel}
        >
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm justify-center items-center flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <TriangleAlert size={40}
              className="text-red-500 mb-4 
              bg-gray-200 p-2 rounded-full"
            />

            <h2 className="text-lg font-bold mb-2 text-black">
              Delete task
            </h2>

            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded border text-black hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default View
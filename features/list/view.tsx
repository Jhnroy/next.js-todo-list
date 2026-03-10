'use client'

import React, { useState, useEffect } from 'react'
import { CirclePlus, Pencil, Trash, TriangleAlert, Search } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import Header from '@/coponents/header'

type Todo = {
  id: number
  documentId: string
  title: string
  notes: string
}

export const View = () => {

  const [allTasks, setAllTasks] = useState<Todo[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const API_URL = "http://localhost:1337/api/todos"

  // FETCH TASKS FROM DATABASE
  const fetchTasks = async (search = '') => {
    try {

      setLoading(true)

      let url = API_URL

      if (search) {
        url = `${API_URL}?filters[$or][0][title][$containsi]=${search}&filters[$or][1][notes][$containsi]=${search}`
      }

      const res = await axios.get(url)

      setAllTasks(res.data.data)

    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  // INITIAL LOAD
  useEffect(() => {
    fetchTasks()
  }, [])

  // SEARCH WITH DEBOUNCE
  useEffect(() => {

    const delayDebounce = setTimeout(() => {
      fetchTasks(searchTerm)
    }, 400)

    return () => clearTimeout(delayDebounce)

  }, [searchTerm])

  // DELETE TASK
  const handleDelete = async () => {
    if (!selectedId) return

    try {

      await axios.delete(`${API_URL}/${selectedId}`)

      fetchTasks(searchTerm)

      setOpenModal(false)
      setSelectedId(null)

    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleCancel = () => {
    setOpenModal(false)
    setSelectedId(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <div className="p-6 max-w-7xl mx-auto w-full flex flex-col">

        {/* HEADER */}
        <div className="flex items-center text-center justify-center m-3 p-5 bg-white rounded-2xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out animate-pulse">
          <Header />
        </div>

        {/* DASHBOARD TITLE + SEARCH */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">

          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          <div className="relative w-full sm:w-64">
            <Search className="absolute top-2.5 left-2.5 text-gray-400" size={16} />

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
        </div>

        {/* TASK GRID */}
        {loading ? (

          <p className="text-center text-gray-500 mt-10">Loading tasks...</p>

        ) : allTasks.length > 0 ? (

          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {allTasks.map((task) => (

              <div
                key={task.documentId}
                className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >

                {/* TASK CONTENT */}
                <div className="cursor-pointer">

                  <Link href={`/${task.documentId}/view-details`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                      {task.title}
                    </h2>
                  </Link>

                  <p className="text-gray-500 mt-2 line-clamp-3">
                    {task.notes}
                  </p>

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">

                  <Link
                    href={`/${task.documentId}/edit`}
                    className="p-2 rounded hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedId(task.documentId)
                      setOpenModal(true)
                    }}
                    className="p-2 rounded hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Trash size={18} />
                  </button>

                </div>

              </div>

            ))}

          </main>

        ) : (

          <p className="text-center text-gray-400 mt-20">
            No tasks found. Add a new task using the "+" button below.
          </p>

        )}

        {/* ADD BUTTON */}
        <Link
          href="/add"
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-black shadow-lg flex items-center justify-center hover:bg-blue-500 transition-colors z-50"
        >
          <CirclePlus size={24} className="text-white" />
        </Link>

      </div>

      {/* DELETE MODAL */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCancel}
        >

          <div
            className="bg-white rounded-lg p-6 w-[90%] max-w-sm flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >

            <TriangleAlert
              size={40}
              className="text-red-500 mb-4 bg-gray-200 p-2 rounded-full"
            />

            <h2 className="text-lg font-bold mb-2 text-black">
              Delete task
            </h2>

            <p className="text-gray-600 mb-4 text-center">
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

      {/* FOOTER */}
      <footer className="mt-auto w-full bg-gray-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyTaskApp. All rights reserved.
      </footer>

    </div>
  )
}

export default View
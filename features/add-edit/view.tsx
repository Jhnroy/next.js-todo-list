'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

export const View = () => {

  const params = useParams()
  const router = useRouter()

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const API_URL = "http://localhost:1337/api/todos"
  console.log(id)

  // FETCH TASK
  useEffect(() => {

    if (!id) return

    const fetchTask = async () => {

      try {

        const res = await axios.get(`${API_URL}/${id}`)

        const task = res.data.data

        
        setTitle(task.title)
        setDescription(task.notes)

      } catch (error) {

        console.error("Error fetching task:", error)

      }

    }

    fetchTask()

  }, [id])


  const handleSubmit = async () => {

    try {

      const payload = {
        data: {
          title: title,
          notes: description
        }
      }

      if (id) {

        // UPDATE
        await axios.put(`${API_URL}/${id}`, payload)

      } else {

        // CREATE
        await axios.post(API_URL, payload)

      }

      router.push('/')

    } catch (error) {

      console.error("Error saving task:", error)

    }

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F7F8] px-4">

      <div className="mb-3 justify-start w-full max-w-md">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2" size={18} /> Back to List
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {id ? "Edit Task" : "Create Task"}
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task notes"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <div className="flex justify-center space-x-2 mt-4">

            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>

            <Link
              href="/"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-center"
            >
              Cancel
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default View
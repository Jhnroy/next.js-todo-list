  'use client'

  import Link from 'next/link'
  import { ArrowLeft, Pencil } from 'lucide-react'
  import React, { useEffect, useState } from 'react'
  import axios from 'axios'
  import { useParams } from 'next/navigation'

  interface Task {
    id: number
    documentId: string
    title: string
    notes: string
  }

  const ViewDetails = () => {
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id

    const [task, setTask] = useState<Task | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const API_URL = "http://localhost:1337/api/todos"

    useEffect(() => {
      const fetchTask = async () => {
        if (!id) {
          setError("No documentId provided")
          setLoading(false)
          return
        }

        try {
          const res = await axios.get(`${API_URL}?filters[documentId][$eq]=${id}`)
          const data = res.data.data?.[0]
          if (!data) throw new Error("Task not found")

          setTask({
            id: data.id,
            documentId: data.documentId,
            title: data.title,
            notes: data.notes
          })

        } catch (err: any) {
          console.error("Error fetching task:", err)
          setError(err.response?.data?.error?.message || err.message || "Unknown error")
        } finally {
          setLoading(false)
        }
      }

      fetchTask()
    }, [id])

    if (loading) return <p className="p-10 text-center text-gray-500 animate-pulse">Loading task...</p>
    if (error) return <p className="p-10 text-center text-red-500">{error}</p>
    if (!task) return <p className="p-10 text-center text-gray-500">Task not found</p>

    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-50 to-gray-100 px-4 pt-16">

        {/* Back Link */}
        <div className="mb-6 w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to tasks
          </Link>
        </div>

        {/* Task Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-8 py-6">

            {/* Title and Edit Button */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
              <Link
                href={`/${task.documentId}/edit`}
                className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-200"
              >
                <Pencil size={18} className="text-white" />
              </Link>
            </div>

            {/* Task Info */}
            <div className="mt-4 space-y-3">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold">Task ID:</span> {task.id}
              </p>

              <div className="mt-2">
                <h3 className="text-gray-700 font-semibold text-lg">Description</h3>
                <p className="text-gray-600 mt-1">{task.notes}</p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-gray-500 text-sm text-right">
            Document ID: {task.documentId}
          </div>
        </div>

      </div>
    )
  }

  export default ViewDetails
import React from 'react'
import { CirclePlus, Pencil } from "lucide-react";
import Link from "next/link";

export const View = () => {
  
  const tasks = [
    {
      id: "1",
      title: "Draft Database Schema",
      describe: "Define the database schema...", 
    },
    {
      id: "2",
      title: "Update Project README",
      describe: "Add installation instructions...",
    },
  ]; 

  return (
    <div className="p-8">
      <header className="mb-6">
        
        <Link href="/add-task" className="flex items-center gap-2 text-white d">
          <CirclePlus /> 
        </Link>
      </header>

      <main>
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{task.title}</h2>
              <p className="text-gray-600">{task.describe}</p>
            </div>

            <div className="flex gap-2">
             
              <Link 
                href={`/add-task`} 
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <Pencil size={20} />
              </Link>
                
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default View
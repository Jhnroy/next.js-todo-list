
'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'
import { tasksAtom } from '/atoms/atom'

export const view = () => {

    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [allTasks, setAllTasks] = useAtom(tasksAtom);
    
    const handleSubmit = () => {
        setAllTasks((task) => [...task, {title, describe: description}])
    }

  return (
   <div> 
        <div>
            <Link href="/"> 
            <ArrowLeft className="inline mr-2" />Back to list </Link>
        </div>

        <div> 
            <h1 className="text-2xl font-bold mb-4">Add / Edit Task</h1>
        </div>
        
        <div>
            <form className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input type="text" 
                    onChange={(e) => setTitle (e.target.value)}
                    className="w-full border rounded px-3 py-2" placeholder="Task Title" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>

                    <textarea 
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2" placeholder="Task Description"></textarea>
                </div>

                <button 
                onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>

                <button className="ml-2 
                 bg-gray-500
                text-white 
                px-4 py-2 rounded">Cancel</button>
            </form>
        </div>

        
    </div>

  )
}
export default view 
import React from 'react'
import View from "@/features/details/view";

export const page = async ({ params }: { params:  Promise<{ id: string }> }) => {
    const {id} = await params
  return <View id={id} />
}

export default page

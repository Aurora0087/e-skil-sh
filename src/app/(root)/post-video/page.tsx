import VideoUploaderForm from '@/components/shared/VideoUploaderForm'
import React from 'react'

function page() {
    return (
        <section className='flex flex-col w-full min-h-screen text-white'>
            <h2 className=' font-bold text-6xl p-6 border-b-2 border-white/20'>Post video</h2>
            <VideoUploaderForm/>
        </section>
    )
}

export default page
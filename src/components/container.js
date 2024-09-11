import React from 'react'

export default function Container({ children }) {
  return (
    <div className='mx-auto min-h-screen flex flex-col max-w-5xl'>
        {children}
    </div>
  )
}
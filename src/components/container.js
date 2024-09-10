import React from 'react'

export default function Container({ children }) {
  return (
    <div className='mx-auto min-h-screen flex flex-col text-slate-100 max-w-5xl'>
        {children}
    </div>
  )
}
"use client"
import { Spinner } from '@/components/spinner/Spinner'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size="lg"/>
    </div>
  )
}

export default Loading

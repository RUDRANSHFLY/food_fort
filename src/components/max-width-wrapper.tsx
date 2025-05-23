import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

interface MaxWidthWrapperProps extends PropsWithChildren{
    className?: string
}


const MaxWidthWrapper = ({children,className} : MaxWidthWrapperProps) => {
  return (
    <div className={cn("max-w-6xl w-full h-screen py-5 mx-auto shadow-md shadow-indigo-400",className)}>
        {children}
    </div>
  )
}

export default MaxWidthWrapper
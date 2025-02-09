'use client';

import React from 'react'
import { signOut } from "next-auth/react"
import { Button } from '@/components/ui/button';

const Test = () => {
  return (
    <div>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
  )
}

export default Test
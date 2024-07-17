'use client'

import { createTsukeku } from '@/app/lib/rengaActions'
import React from 'react'
import { useState } from 'react'

export default function TsukekuForm() {
    const [errorMessage, setErrorMessage] = useState('')
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const form = event.currentTarget
        event.preventDefault()
        //const message = await createTsukeku(form.shiku.value, form.tsukeku.value)
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shiku">第四句</label>
          <input type="text" id="shiku" name='shiku'/>
        </div>
        <div>
          <label htmlFor="tsukeku" >第五句
          </label>
          <input type="text" id="tsukeku" name='goku'/>
        </div>
        <button type="submit">付句する</button>
      </form>
    </div>
  )
}

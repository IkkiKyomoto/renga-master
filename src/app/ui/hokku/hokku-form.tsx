'use client'

import React, { useActionState } from 'react'
import { createHokku } from '@/app/lib/rengaActions'

function HokkuForm() {
    const [errorMessage, formAction] = useActionState(createHokku, undefined)
  return (
    <div>
      <form action={formAction}>
        <div>
          <label htmlFor="shoku">初句</label>
          <input type="text" id="shoku" name="shoku" />
        </div>
        <div>
          <label htmlFor="niku">二句</label>
          <input type="text" id="niku" name="niku" />
        </div>
        <div>
          <label htmlFor="sanku">三句</label>
          <input type="text" id="sanku" name="sanku" />
        </div>
        <div>
          <label htmlFor="sanku">説明</label>
          <textarea name="description" id="description"></textarea>
        </div>



        <button type="submit">送信</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default HokkuForm

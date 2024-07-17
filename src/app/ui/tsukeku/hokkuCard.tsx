import prisma from '@/app/lib/prisma';
import { Hokku } from '@/app/lib/definitions';


export default function HokkuCard({hokku}: {hokku: Hokku}) {
  return (
    <div>
      <h1>{hokku.ikku}</h1>
      <p>{hokku.niku}</p>
      <p>{hokku.sanku}</p>
      <p>{hokku.description}</p>
    </div>
  )

}



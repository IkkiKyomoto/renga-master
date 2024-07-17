

import React from 'react'
import prisma from '@/app/lib/prisma';
import { Hokku } from '@/app/lib/definitions';
import HokkuCard  from '@/app/ui/tsukeku/hokkuCard';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export default async function HokkuCardList() {
  
  const hokkus:Hokku[] = await prisma.hokku.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      completed: false
    }
  });
  return (
    <div>
      <ul>
        {hokkus.map((hokku, i)=> {
          return <li key={i}><Link href={`/tsukeku/${hokku.id}/create`}><HokkuCard key={i} hokku={hokku}/></Link></li>
        })
      }
      </ul>

    </div>

  )
}


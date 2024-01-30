// 'use server'

import React from 'react'
import { revalidatePath } from 'next/cache'

import EmblaCarousel from '@/components/carousel/EmblaCarousel'
import { getTopStreamsByGame } from '@/app/actions/getGameById'
import { getTopGames } from '@/app/actions/getTopGames'

export default async function CaruselServer() {
  const slides = await getTopGames()
  const game = await getTopStreamsByGame()
  console.log(slides)

  const search = async (gameId: string, type: string) => {
    'use server'
    const manga = await getTopStreamsByGame(gameId, type)
    revalidatePath('/')
    return manga
  }
  return (
    <div>
      <EmblaCarousel search={search} game={game} slides={slides}></EmblaCarousel>
    </div>
  )
}

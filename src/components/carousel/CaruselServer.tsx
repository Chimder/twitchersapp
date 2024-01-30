// 'use server'

import React from 'react'
import { revalidatePath } from 'next/cache'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import EmblaCarousel from '@/components/carousel/EmblaCarousel'
import { getTopStreamsByGame } from '@/app/actions/getGameById'
import { getTopGames } from '@/app/actions/getTopGames'

export default async function CaruselServer() {
  const slides = await getTopGames()
  const game = await getTopStreamsByGame()

  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: ['getPopStreams'],
  //   queryFn: async () => getTopStreamsByGame(),
  // })

  // const search = async (gameId: string, type: string) => {
  //   'use server'
  //   const manga = await getTopStreamsByGame(gameId, type)
  //   revalidatePath('/')
  //   return manga
  // }
  return (
    <div>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
        <EmblaCarousel game={game} slides={slides}></EmblaCarousel>
      {/* </HydrationBoundary> */}
    </div>
  )
}

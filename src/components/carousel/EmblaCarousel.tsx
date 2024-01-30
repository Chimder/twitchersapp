'use client'

import React, { startTransition, Suspense, useEffect, useState, useTransition } from 'react'
import { revalidatePath, revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import { getTopStreamsByGame } from '@/shared/api/axios'
import { TopGame, TwitchCurrent } from '@/shared/api/types'
import { useQuery } from '@tanstack/react-query'
// import { useQuery } from '@tanstack/react-query'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'

import CardVideo from '../card-video'
import { Skeleton } from '../ui/skeleton'
import { Thumb } from './EmblaCarouselThumbsButton'

type Props = {
  game?: TwitchCurrent[]
  slides: TopGame[]
  search?: (idGame: string, type: string) => Promise<TwitchCurrent[]>
}

const EmblaCarousel = ({ game, slides, search }: Props) => {
  // const [gameS, setGameS] = useState<TwitchCurrent[]>(game)
  const [isPending, startTransition] = useTransition()
  const [selectedIndex, setSelectedIndex] = useState<number>(Number(slides[0]?.id))
  const [type, setType] = useState<'offline' | 'stream' | 'clips'>('stream')
  const [idGame, setIdGame] = useState<string>(slides[0]?.id)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const {
    data: games,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [`getPopStreams${selectedIndex}${idGame}${type}`],
    queryFn: async () => getTopStreamsByGame(idGame, type),
    refetchOnWindowFocus: false,
  })

  const onThumbClick = (index: number, type: 'clips' | 'stream') => {
    try {
      setSelectedIndex(index)
      setIdGame(index.toString())
      setType(type)
      refetch()
    } catch (error) {
      console.error(error)
    }
    // if (!emblaMainApi || !emblaThumbsApi) return;
  }
  console.log('GAMES', games)

  return (
    <>
      <div className="relative rounded-xl border-[2px] border-border p-5 lg:pl-[100px] md:ml-[25vw] sm:ml-[460px]">
        <div className="relative pb-4 ">
          <div className="overflow-hidden" ref={emblaThumbsRef}>
            <div className="flex">
              {slides?.map((game: any, index: number) => (
                <Thumb
                  onClick={(index, type) => onThumbClick(index, type)}
                  selected={Number(game?.id) === selectedIndex}
                  index={Number(game?.id)}
                  number={index}
                  imgSrc={game?.box_art_url.replace('{width}', '320').replace('{height}', '180')}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container z-999 pt-2" ref={emblaMainRef}>
        <div className="gridCard">
          <AnimatePresence>
            {isLoading && !isRefetching
              ? Array.from({ length: 50 }, (_, index) => (
                  <React.Fragment key={`skeleton-${index}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="relative mr-2 w-full rounded-2xl"
                      style={{ paddingBottom: '52%' }}
                    >
                      <div className="absolute inset-0 px-2">
                        <Skeleton className="h-full w-full" />
                      </div>
                    </motion.div>
                  </React.Fragment>
                ))
              : games?.map((game: any) => (
                  <CardVideo video={game} type={type} key={game?.id}></CardVideo>
                ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel

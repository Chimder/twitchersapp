'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TopGame, TwitchCurrent } from '@/shared/api/types'
// import { useQuery } from '@tanstack/react-query'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'

import CardVideo from '../card-video'
import { getTopStreamsByGame } from './action/getGameById'
import { getTopGames } from './action/getTopGames'
import { Thumb } from './EmblaCarouselThumbsButton'

type Props = {
  game?: TwitchCurrent[]
  slides: TopGame[]
}

const EmblaCarousel = ({ game, slides }: Props) => {
  const router = useRouter()
  // const id = router?.query?.id as string
  const [selectedIndex, setSelectedIndex] = useState(Number(slides[0]?.id))
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const [idGame, setIdGame] = useState<string>(slides[0]?.id)
  const [type, setType] = useState<'offline' | 'stream' | 'clips'>('stream')

  const onThumbClick = (index: number, type: 'clips' | 'stream') => {
    try {
      setSelectedIndex(index)
      setIdGame(index.toString())
      setType(type)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  // return <div>Lox</div>
  return (
    <>
      <div className="relative rounded-xl border-[2px] border-border p-5 sm:ml-[460px] md:ml-[25vw] lg:pl-[100px]">
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
      <div className="z-999 container pt-2" ref={emblaMainRef}>
        <div className="gridCard">
          <AnimatePresence>
            {game?.map((game: any) => (
              <CardVideo video={game} type={type} key={game?.id}></CardVideo>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel

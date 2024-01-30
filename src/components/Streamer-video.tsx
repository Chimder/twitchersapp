'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getVideosByUserId, getVideosByUserIdAct } from '@/shared/api/axios'
import { TwitchVideo } from '@/shared/api/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import CardVideo from './card-video'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

type Props = {
  video: TwitchVideo[]
  params: any
}
export const StreamerVideos = () => {
  const path = useParams()
  const id = path?.id as string
  const [type, setType] = useState<'offline' | 'stream' | 'clips'>('offline')

  const fetchVideos = async ({ pageParam = null }: { pageParam?: string | null }) => {
    const result = await getVideosByUserId(id, pageParam, type)
    return result
  }

  const { data, fetchNextPage, refetch, hasNextPage, isRefetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['getVideosByUserId'],
      queryFn: fetchVideos,
      getNextPageParam: lastPage => lastPage?.nextCursor || null,
      initialPageParam: undefined,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 0,
    })
  const ToggleType = async (type: 'offline' | 'stream' | 'clips') => {
    await setType(type)
    await refetch()
  }

  // return
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const videos = data?.pages?.flatMap(page => page?.videos)
  return (
    <section className="container pt-2 ">
      <div className="rounded-xl border-[2px] border-border">
        <div className="flex items-center justify-evenly py-4">
          <Button
            onClick={() => ToggleType('offline')}
            variant="ghost"
            className={`border-[2px] border-border  px-[12vw] py-[2vh] text-white ${
              type === 'offline' ? 'bg-primary' : ''
            }`}
          >
            Streams
          </Button>
          <Button
            onClick={() => ToggleType('clips')}
            variant="ghost"
            className={`border-[2px] border-border px-[12vw] py-[2vh] text-white ${
              type === 'clips' ? 'bg-primary' : ''
            }`}
          >
            Clips
          </Button>
        </div>
        <div className="gridCard">
          {isRefetching
            ? Array.from({ length: 40 }, (_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <motion.div
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate="visible"
                    exit={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative mr-4 w-full overflow-hidden rounded-2xl"
                    style={{ paddingBottom: '52%' }}
                  >
                    <div className="absolute inset-0 px-3">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </motion.div>
                </React.Fragment>
              ))
            : videos?.map(video => (
                <motion.div
                  ref={ref}
                  key={video.id}
                  initial={{ opacity: 0.9, scale: 1 }}
                  exit={{ opacity: 0.5, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  animate="visible"
                >
                  <CardVideo key={video.id} type={type} video={video}></CardVideo>
                </motion.div>
              ))}

          <AnimatePresence>
            {isFetchingNextPage &&
              Array.from({ length: 40 }, (_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate="visible"
                    exit={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative mr-4 w-full overflow-hidden rounded-2xl"
                    style={{ paddingBottom: '52%' }}
                  >
                    <div className="absolute inset-0 px-3">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </motion.div>
                </React.Fragment>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

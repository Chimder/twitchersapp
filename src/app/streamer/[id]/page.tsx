import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { StreamerInfo } from '@/components/Streamer-info'
import { StreamerVideos } from '@/components/Streamer-video'
import { getEmotes } from '@/app/actions/getEmotes'
import { getUserById } from '@/app/actions/getUserById'
import { getVideosByUserIdAct } from '@/app/actions/getUserVideo'

type Props = {}

const Streamer = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = new QueryClient()
  const user = await getUserById(id)
  const emotes = await getEmotes(id)
  // const userVideo = await getVideosByUserIdAct(id)

  // const fetchVideos = async ({ pageParam = null }: { pageParam?: string | null }) => {
  //   const result = await getVideosByUserIdAct(id)
  //   return result
  // }

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['getVideosByUserId'],
    queryFn: () => getVideosByUserIdAct(id),
    initialPageParam: 0,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <article className="overflow-hidden">
        <StreamerInfo user={user!} emotes={emotes} />
        <StreamerVideos />
      </article>
    </HydrationBoundary>
  )
}

export default Streamer

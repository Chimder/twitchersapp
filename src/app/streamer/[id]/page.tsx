import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { StreamerInfo } from '@/components/Streamer-info'
import { StreamerVideos } from '@/components/Streamer-video'
import { getEmotes } from '@/app/actions/getEmotes'
import { getUserById } from '@/app/actions/getUserById'

const Streamer = async ({ params: { id } }: { params: { id: string } }) => {
  const [user, emotes] = await Promise.all([getUserById(id), getEmotes(id)])

  return (
    <article className="overflow-hidden">
      <StreamerInfo user={user!} emotes={emotes} />
      <StreamerVideos />
    </article>
  )
}

export default Streamer

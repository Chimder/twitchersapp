import React from 'react'

import { StreamerInfo } from '@/components/Streamer-info'
import { StreamerVideos } from '@/components/Streamer-video'

type Props = {}

const Streamer = (props: Props) => {
  return (
    <article className="overflow-hidden">
      <StreamerInfo user={user} emotes={emotes} clips={clips} />
      <StreamerVideos />
    </article>
  )
}

export default Streamer

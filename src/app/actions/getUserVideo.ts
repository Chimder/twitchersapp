import { getAccessToken } from '@/shared/api/axios'
import { TwitchVideo, TwitchVideoResponse } from '@/shared/api/types'
import axios from 'axios'

export async function getVideosByUserIdAct(
  userId: string,
): Promise<{ videos: TwitchVideo[]; nextCursor: string | null }> {
  console.log('FIRSTTTTT')
  const accessToken = await getAccessToken()

  try {
    const { data } = await axios.get<TwitchVideoResponse>(
      `https://api.twitch.tv/helix/videos?user_id=${userId}`,
      {
        params: {
          first: 40,
        },
        headers: {
          'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        },
      },
    )

    const videos = data.data
    const nextCursor = data.pagination.cursor

    return { videos, nextCursor }
  } catch (error) {
    console.error(error)
    throw error
  }
}

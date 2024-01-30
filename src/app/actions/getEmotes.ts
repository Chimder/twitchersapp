import { getAccessToken } from '@/shared/api/axios'
import { Emotes } from '@/shared/api/types'
import axios from 'axios'

export async function getEmotes(userId: string): Promise<Emotes[]> {
  const accessToken = await getAccessToken()

  try {
    const { data } = await axios.get('https://api.twitch.tv/helix/chat/emotes', {
      params: {
        broadcaster_id: userId,
      },
      headers: {
        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data?.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

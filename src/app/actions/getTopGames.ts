'use server'

import { getAccessToken } from '@/shared/api/axios'
import { TopGame } from '@/shared/api/types'
import axios from 'axios'

export async function getTopGames(): Promise<TopGame[]> {
  const accessToken = await getAccessToken()

  try {
    const { data } = await axios.get('https://api.twitch.tv/helix/games/top', {
      params: {
        first: 50,
      },
      headers: {
        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

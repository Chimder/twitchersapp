'use server'

import { getAccessToken } from '@/shared/api/axios'
import { TwitchUser, TwitchUserResponse } from '@/shared/api/types'
import axios from 'axios'

export async function getUserById(userId: string): Promise<TwitchUser | null> {
  const accessToken = await getAccessToken()

  try {
    const response = await axios.get<TwitchUserResponse>('https://api.twitch.tv/helix/users', {
      params: {
        id: userId,
      },
      headers: {
        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const user = response.data.data[0]
    return user || null
  } catch (error) {
    console.error(error)
    throw error
  }
}

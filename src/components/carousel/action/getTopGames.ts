'use server'

import { getAccessToken } from '@/shared/api/axios'
import { TopGame } from '@/shared/api/types'

export async function getTopGames(): Promise<TopGame[]> {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch('https://api.twitch.tv/helix/games/top', {
      method: 'GET',
      headers: {
        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID || '',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

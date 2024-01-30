'use server'

import { getAccessToken } from '@/shared/api/axios'
import { TwitchCurrent } from '@/shared/api/types'
import axios from 'axios'

import { getTopGames } from './getTopGames'

export async function getTopStreamsByGame(
  gameId?: string,
  type?: string,
): Promise<TwitchCurrent[]> {
  const accessToken = await getAccessToken()

  if (!gameId) {
    const gameId = await getTopGames()
    const { data } = await axios.get('https://api.twitch.tv/helix/streams', {
      params: {
        game_id: gameId[0]?.id,
        first: 40,
      },
      headers: {
        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data.data
  }
  try {
    let url
    if (type === 'clips') {
      url = 'https://api.twitch.tv/helix/clips'
    } else {
      url = 'https://api.twitch.tv/helix/streams'
    }

    const { data } = await axios.get(url, {
      params: {
        game_id: gameId,
        first: 40,
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

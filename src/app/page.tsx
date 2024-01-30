'use server'

import { revalidatePath } from 'next/cache'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import CaruselServer from '@/components/carousel/CaruselServer'
import EmblaCarousel from '@/components/carousel/EmblaCarousel'
import { DialogInput } from '@/components/dialog-search'

import { getTopStreamsByGame } from './actions/getGameById'
import { getTopGames } from './actions/getTopGames'

export default async function Home(props: any) {
  const slides = await getTopGames()
  const game = await getTopStreamsByGame()

  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: ['getPopStreams'],
  //   queryFn: async () => getTopStreamsByGame(),
  // })

  const search = async (gameId: string, type: string) => {
    'use server'
    const manga = await getTopStreamsByGame(gameId, type)
    revalidatePath('/')
    return manga
  }
  return (
    <main className="h-[2000px] overflow-hidden">
      <section className="w-full">
        <div className="flex flex-col items-center justify-end bg-background pb-10 pt-24 md:py-12">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="pb-4 pt-12 text-9xl xl:text-6xl md:pt-16 md:text-4xl ">
              Discover Twitch Vods
            </h1>
            <p className="pb-10 text-center text-2xl lg:text-base md:pb-6 md:text-sm">
              Watch twitch past broadcasts streams Start by Typing twitch username...
            </p>
          </div>

          <DialogInput>
            <Button className="bg-button-foreground  px-40 text-xl text-text text-white lg:text-base md:px-32 md:text-sm sm:px-28">
              <MagnifyingGlassIcon className="h-6 w-6 pr-1" />
              Search Steamer
            </Button>
          </DialogInput>
        </div>
      </section>
      <section className="relative flex w-full flex-col items-center justify-center rounded-2xl ">
        <div>
          <h1 className="pb-3 text-7xl text-white xl:text-6xl md:text-4xl">Top streams Now</h1>
        </div>
        <CaruselServer></CaruselServer>
      </section>
      <section></section>
    </main>
  )
}

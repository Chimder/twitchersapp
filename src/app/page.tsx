import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { getTopStreamsByGame } from '@/components/carousel/action/getGameById'
import { getTopGames } from '@/components/carousel/action/getTopGames'
import EmblaCarousel from '@/components/carousel/EmblaCarousel'
import { DialogInput } from '@/components/dialog-search'

export default async function Home() {
  const game = await getTopStreamsByGame()
  const slides = await getTopGames()

  console.log('GAME', game)
  console.log('SLIDES', slides)
  return (
    <main className="h-[2000px] overflow-hidden">
      <section className="w-full">
        <div className="flex flex-col items-center justify-end bg-background pb-10 pt-24 md:py-12">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="pb-4 pt-12 text-9xl md:pt-16 md:text-4xl xl:text-6xl ">
              Discover Twitch Vods
            </h1>
            <p className="pb-10 text-center text-2xl md:pb-6 md:text-sm lg:text-base">
              Watch twitch past broadcasts streams Start by Typing twitch username...
            </p>
          </div>
          {/* <DialogInput>
            <Button className="bg-button-foreground  text-text px-40 text-xl text-white sm:px-28 md:px-32 md:text-sm lg:text-base">
              <MagnifyingGlassIcon className="h-6 w-6 pr-1" />
              Search Steamer
            </Button>
          </DialogInput> */}
        </div>
      </section>
      <section className="relative flex w-full flex-col items-center justify-center rounded-2xl ">
        <div>
          <h1 className="pb-3 text-7xl text-white md:text-4xl xl:text-6xl">Top streams Now</h1>
        </div>
        <EmblaCarousel game={game} slides={slides}></EmblaCarousel>
      </section>
      <section></section>
    </main>
  )
}

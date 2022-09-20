import * as Dialog from '@radix-ui/react-dialog';

import { useEffect, useState } from 'react';

import { GameBanner } from './Components/GameBanner/GameBanner';
import { CreateAdBanner } from './Components/CreateAdBanner/CreateAdBanner';
import { CreateAdModal } from './Components/CreateAdModal/CreateAdModal';

import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';
import axios from 'axios';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt='Logo NLW eSports' />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu{' '}
        <span className='bg-nlw-gradient bg-clip-text text-transparent'>
          duo
        </span>{' '}
        está aqui
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game: Game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
export default App;

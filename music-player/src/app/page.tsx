import Player from '../components/Player'

export default function Home() {
  return (
    <div>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Player />
      </main>
      <footer className="text-center text-gray-500 text-sm p-4">
        Created by Neil Mannion with TypeScript, Next.js and TailWind <td/>
        <a href='https://github.com/Sneakyweasel90/Music_Player'>---Link to Github Repository---</a>
      </footer>
    </div>
  );
};
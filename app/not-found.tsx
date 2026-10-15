import type { Metadata } from 'next';
import Link from 'next/link';
import { IoHomeOutline, IoMailOutline } from 'react-icons/io5';
import { LiaCrossSolid } from 'react-icons/lia';

export const metadata: Metadata = {
  title: 'Página no encontrada | Iglesia Bautista Getsemaní',
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-[#050505] p-6 text-center">
      {/* Luces de fondo ambientales (mismo estilo que la página en desarrollo) */}
      <div className="absolute right-[-5%] top-[-5%] h-[300px] w-[300px] rounded-full bg-yellow-500 opacity-10 blur-[80px] md:h-[600px] md:w-[600px] md:blur-[150px]" />
      <div className="absolute bottom-[-5%] left-[-5%] h-[250px] w-[250px] rounded-full bg-white opacity-5 blur-[80px] md:h-[500px] md:w-[500px] md:blur-[120px]" />

      <div className="relative z-10 flex max-w-4xl flex-col items-center">
        <div className="mb-10 flex items-center justify-center rounded-[3rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl md:p-10">
          <LiaCrossSolid className="text-8xl text-yellow-500 md:text-9xl" />
        </div>

        <p className="mb-4 text-2xl font-black uppercase tracking-[0.5em] text-gray-400">
          Error 404
        </p>
        <h1 className="mb-8 font-playfair text-5xl font-black leading-tight text-white sm:text-6xl md:text-8xl">
          Página{' '}
          <span className="bg-linear-to-r from-white via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            no encontrada
          </span>
        </h1>
        <p className="mb-6 max-w-2xl text-2xl leading-relaxed text-gray-300 md:text-3xl">
          La página que buscas no existe o fue movida.
        </p>
        <p className="mb-12 text-xl italic text-gray-400 md:text-2xl">
          &quot;Buscad, y hallaréis; llamad, y se os abrirá.&quot; — Mateo 7:7
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-yellow-400 to-yellow-600 px-10 py-4 text-2xl font-bold text-white shadow-2xl transition-transform duration-300 hover:scale-105 sm:w-auto"
          >
            <IoHomeOutline />
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-10 py-4 text-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:w-auto"
          >
            <IoMailOutline />
            Contáctanos
          </Link>
        </div>
      </div>
    </main>
  );
}

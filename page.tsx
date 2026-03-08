"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PRIMARY_BLUE = '#4A9FF5';
const RED_ACCENT = '#EF5350';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.bodyup.app';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/imagem_01_para_moldura.png',
      title: 'Tela de Nutrição',
      description: 'Controle sua ingestão calórica. Entenda cada macro. Veja sua hidratação e o impacto de cada refeição na sua rotina.'
    },
    {
      image: '/imagem_02_para_moldura.png',
      title: 'Tela de Treino',
      description: 'Tenha consciência real dos dias em que você treinou, entendendo os furos, sabendo o que treinou e o que falta treinar.'
    },
    {
      image: '/imagem_03_para_moldura.png',
      title: 'Tela de progresso',
      description: 'Você tem feito o mínimo? O recomendado? Ou o ideal? Acompanhe os passos imperfeitos e perfeitos que colaboram para sua transformação.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: PRIMARY_BLUE }}
    >
      <style jsx global>{`
        html {
          -webkit-text-size-adjust: 100%;
        }
        body {
          overscroll-behavior-x: none;
          background-color: #4A9FF5;
        }
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          transition: background 0.3s;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className="w-full max-w-screen-sm mx-auto px-4 py-6">

        <div className="flex justify-center mb-6">
          <Image
            src="/bodyuplogo.png"
            alt="BodyUp Logo"
            width={280}
            height={80}
            className="w-full max-w-[200px] h-auto"
            priority
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
            Entenda cada passo necessário para transformar seu corpo!
          </h1>

          <div
            className="inline-block px-4 py-2 rounded-full text-white font-medium text-sm"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Você ganha, nós também! &lt;3
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Image
            src="/Cell_phone_01.png"
            alt="App BodyUp no celular"
            width={425}
            height={850}
            className="w-full max-w-[336px] h-auto"
          />
        </div>

        <div className="text-center mb-6">
          <p className="text-white text-base leading-relaxed">
            Acreditamos nos pequenos passos dado dia após dia, sem buscar a perfeição, mas sim o pequeno progresso. Com o BodyUp, você entende se de fato está progredindo com suas metas corporais, mesmo que atinja as metas mínimas.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 text-lg font-bold text-white rounded-full shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Baixar Agora o App
          </a>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
            Segundo Conselho Federal de Nutricionistas:
          </h2>

          <div className="space-y-2 mb-6">
            <p className="text-white text-sm sm:text-base leading-relaxed">
              <span className="font-bold">35%</span> das desistências em dietas são por mudanças severas na alimentação.
            </p>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              outros <span className="font-bold">45%</span> das desistências em dietas são por "não conseguir seguir a risca"
            </p>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              outros <span className="font-bold">20%</span> das desistências em dietas são por motivos financeiros.
            </p>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
            Nós queremos acabar com isso! Por isso, seguimos uma filosofia:
          </h3>
        </div>

        <div className="flex flex-row items-center justify-center gap-8 mb-12 px-6">
          <div className="flex-shrink-0">
            <Image
              src="/Cell_phone_02.png"
              alt="App BodyUp - Atinja suas metas"
              width={350}
              height={700}
              className="w-auto h-auto max-w-[380px]"
            />
          </div>

          <div className="text-left flex-1">
            <h4 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Atinja suas metas mínimas!
            </h4>
            <ul className="space-y-2 text-white text-base">
              <li className="leading-relaxed">sem défit calórico gigantesco.</li>
              <li className="leading-relaxed">sem beber mil litros de água.</li>
              <li className="leading-relaxed">sem cortar carboidratos.</li>
              <li className="leading-relaxed">sem cortar refeições importantes.</li>
              <li className="leading-relaxed">sem comer todas as proteínas do mundo.</li>
              <li className="leading-relaxed">sem deixar de comer aquele docinho.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 text-lg font-bold text-white rounded-full shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Baixar Agora o App
          </a>
        </div>

        <div className="mb-12 px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-8 text-center">
            Conheça o BodyUp por dentro!
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-row items-center justify-center gap-8 w-full max-w-5xl">
              <div
                className="relative flex-shrink-0 cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <Image
                    src={slides[currentSlide].image}
                    alt="Tela do app"
                    width={750}
                    height={1618}
                    className="w-auto h-[450px] object-contain transition-opacity duration-300"
                  />
                </div>
                <div className="relative z-10">
                  <Image
                    src="/moldura.png"
                    alt="Moldura do celular"
                    width={823}
                    height={1677}
                    className="w-auto h-[450px] object-contain pointer-events-none"
                  />
                </div>
              </div>

              <div className="text-left flex-1 max-w-md">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-opacity duration-300 min-h-[100px] flex items-start">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-white text-base leading-relaxed transition-opacity duration-300">
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 text-lg font-bold text-white rounded-full shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Baixar Agora o App
          </a>
        </div>

      </div>
    </div>
  );
};

export default App;
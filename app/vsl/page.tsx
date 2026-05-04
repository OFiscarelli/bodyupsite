import Script from 'next/script'

export default function VSLPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Espaço para a sua Headline (Gancho Principal) */}
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 max-w-3xl leading-tight">
          Descubra o Método Exato Para <span className="text-red-500">[Sua Promessa Principal Aqui]</span>
        </h1>

        {/* 
          Container do Player VTurb 
          Usamos dangerouslySetInnerHTML para o Next.js/TypeScript não bloquear a tag customizada da VTurb na Vercel
        */}
        <div 
          className="w-full flex justify-center mb-8"
          dangerouslySetInnerHTML={{
            __html: `<vturb-smartplayer id="vid-69f7e2d8fe543f779058c0d8" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>`
          }}
        />

        {/* Aviso de Som (Muito usado em VSLs para aumentar retenção inicial) */}
        <p className="text-sm text-gray-400 flex items-center gap-2">
          <span className="text-xl">🔊</span> Certifique-se de que o som está ligado.
        </p>
      </div>

      {/* Script Otimizado do VTurb */}
      <Script 
        src="https://scripts.converteai.net/7a2a39f0-0350-4751-89cf-1e4627d2caab/players/69f7e2d8fe543f779058c0d8/v4/player.js"
        strategy="afterInteractive"
      />
    </main>
  )
}
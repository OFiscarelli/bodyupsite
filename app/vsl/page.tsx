import Script from 'next/script'

export default function VSLPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Container do Player VTurb - Sem textos ao redor */}
        <div 
          className="w-full flex justify-center"
          dangerouslySetInnerHTML={{
            __html: `<vturb-smartplayer id="vid-69f7e2d8fe543f779058c0d8" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>`
          }}
        />

      </div>

      {/* Script do VTurb */}
      <Script 
        src="https://scripts.converteai.net/7a2a39f0-0350-4751-89cf-1e4627d2caab/players/69f7e2d8fe543f779058c0d8/v4/player.js"
        strategy="afterInteractive"
      />
    </main>
  )
}
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Definição das cores baseadas na imagem
const PRIMARY_BLUE = '#4A9FF5';
const DARK_BLUE = '#2B7AC9';
const RED_ACCENT = '#EF5350';

// Função para formatar o número de WhatsApp
const formatWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, '');
  
  let formatted = '';
  if (digits.length > 0) {
    formatted += '(' + digits.substring(0, 2);
  }
  if (digits.length > 2) {
    formatted += ') ' + digits.substring(2, 7);
  }
  if (digits.length > 7) {
    formatted += '-' + digits.substring(7, 11);
  }
  return formatted;
};

const App = () => {
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dados do carrossel
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

  // Touch handlers para swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - próximo slide
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right - slide anterior
      prevSlide();
    }
  };

  const handleWhatsappChange = (e) => {
    const rawValue = e.target.value;
    const formatted = formatWhatsapp(rawValue);
    if (formatted.replace(/\D/g, '').length <= 11) {
      setWhatsapp(formatted);
    }
  };

  const validateForm = () => {
    const whatsappDigits = whatsapp.replace(/\D/g, '');
    const isWhatsappValid = whatsappDigits.length === 11; 
    const isEmailValid = /^[^\s@]+@gmail\.com$/i.test(email);
    return isWhatsappValid && isEmailValid;
  };

  const validateEmail = () => {
    if (!email) return null;
    if (!email.includes('@')) return 'O e-mail deve conter @';
    if (!email.includes('.')) return 'O e-mail deve conter um domínio (.com, .br, etc)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail inválido';
    if (!email.toLowerCase().includes('@gmail.com')) return 'Apenas e-mails do Gmail são aceitos';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success'); 
      setWhatsapp('');
      setEmail('');
    }, 1500);
  };

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 font-sans"
      style={{ backgroundColor: PRIMARY_BLUE }}
    >
      <div className="w-full max-w-md">
        
        {/* Logo BodyUp */}
        <div className="flex justify-center mb-8">
          <Image 
            src="/bodyuplogo.png" 
            alt="BodyUp Logo" 
            width={280}
            height={80}
            className="w-auto h-auto max-w-[280px]"
            priority
          />
        </div>

        {/* Header com título e badge */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4 px-4">
            Seja um usuário teste do nosso app e ganhe uma assinatura vitalícia!
          </h1>
          
          {/* Badge vermelho */}
          <div 
            className="inline-block px-6 py-2 rounded-full text-white font-medium text-sm"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Você ganha, nós também! &lt;3
          </div>
        </div>

        {/* Imagem do Celular */}
        <div className="flex justify-center mb-8 px-6">
          <Image 
            src="/Cell_phone_01.png" 
            alt="App BodyUp no celular" 
            width={425}
            height={850}
            className="w-auto h-auto max-w-[425px]"
          />
        </div>

        {/* Texto descritivo */}
        <div className="text-center mb-8 px-6">
          <p className="text-white text-base leading-relaxed">
            Acreditamos nos pequenos passos dado dia após dia, sem buscar a perfeição, mas sim o pequeno progresso. Com o BodyUp, você entende se de fato está progredindo com suas metas corporais, mesmo que atinja as metas mínimas.
          </p>
        </div>

        {/* Botão para abrir o formulário */}
        <div className="flex justify-center mb-12 px-6">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-8 py-4 text-xl font-bold text-white rounded-full shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Quero Participar!
          </button>
        </div>

        {/* Nova Seção - Conselho Federal */}
        <div className="text-center mb-8 px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            Segundo Conselho Federal de Nutricionistas:
          </h2>
          
          <div className="space-y-3 mb-8">
            <p className="text-white text-base leading-relaxed">
              <span className="font-bold">35%</span> das desistências em dietas são por mudanças severas na alimentação.
            </p>
            <p className="text-white text-base leading-relaxed">
              outros <span className="font-bold">45%</span> das desistências em dietas são por "não conseguir seguir a risca"
            </p>
            <p className="text-white text-base leading-relaxed">
              outros <span className="font-bold">20%</span> das desistências em dietas são por motivos financeiros.
            </p>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8">
            Nós queremos acabar com isso! Por isso, seguimos uma filosofia:
          </h3>
        </div>

        {/* Seção com Celular e Lista lado a lado */}
        <div className="flex flex-row items-center justify-center gap-8 mb-12 px-6">
          {/* Imagem do Celular 02 */}
          <div className="flex-shrink-0">
            <Image 
              src="/Cell_phone_02.png" 
              alt="App BodyUp - Atinja suas metas" 
              width={250}
              height={500}
              className="w-auto h-auto max-w-[250px]"
            />
          </div>

          {/* Lista de Filosofia */}
          <div className="text-left">
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

        {/* Botão CTA Final */}
        <div className="flex justify-center mb-12 px-6">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-8 py-4 text-xl font-bold text-white rounded-full shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Quero Fazer Parte!
          </button>
        </div>

        {/* Nova Seção - Carrossel de Telas do App */}
        <div className="mb-12 px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8 text-center">
            Conheça o BodyUp por dentro!
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-row items-center justify-center gap-8">
              {/* Moldura com Screenshot */}
              <div 
                className="relative flex-shrink-0 cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Screenshot (atrás) */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <Image 
                    src={slides[currentSlide].image}
                    alt="Tela do app" 
                    width={750}
                    height={1618}
                    className="w-auto h-[450px] object-contain transition-opacity duration-300"
                  />
                </div>
                {/* Moldura (na frente) */}
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

              {/* Descrição */}
              <div className="text-left w-[400px]">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-opacity duration-300 h-[100px] flex items-start">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-white text-base leading-relaxed transition-opacity duration-300">
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>

            {/* Indicadores de slide - agora abaixo da imagem */}
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition duration-300 ${
                    index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Botão CTA após o carrossel */}
        <div className="flex justify-center mb-12 px-6">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-8 py-4 text-xl font-bold text-white rounded-full shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: RED_ACCENT }}
          >
            Quero Participar!
          </button>
        </div>

      </div>

      {/* Popup Modal do Formulário */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setIsPopupOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center pr-8">
              Cadastre-se para o Teste
            </h2>

            <div className="space-y-4">
              {/* Campo WhatsApp */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp (com DDD)
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={whatsapp}
                  onChange={handleWhatsappChange}
                  placeholder="(99) 99999-9999"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400"
                  style={{ borderColor: submitStatus === 'error' && whatsapp.replace(/\D/g, '').length !== 11 ? '#EF4444' : '' }}
                  disabled={isSubmitting}
                />
                {submitStatus === 'error' && whatsapp.replace(/\D/g, '').length !== 11 && (
                  <p className="mt-1 text-xs text-red-500">Digite um número válido com 11 dígitos</p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail (Google Play)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@gmail.com"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400"
                  disabled={isSubmitting}
                />
                {validateEmail() && (
                  <p className="mt-1 text-xs text-red-500">{validateEmail()}</p>
                )}
              </div>

              {/* Mensagem de Sucesso */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start" role="alert">
                  <span className="text-2xl mr-3">✅</span>
                  <p className="text-sm text-green-800 font-medium">
                    Inscrição realizada! Entraremos em contato via WhatsApp.
                  </p>
                </div>
              )}

              {/* Botão de Envio */}
              <button
                onClick={handleSubmit}
                className={`w-full py-3 text-base font-bold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] ${
                  isSubmitting || !validateForm() 
                    ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-700' 
                    : 'text-white hover:opacity-90'
                }`}
                style={{ 
                  backgroundColor: isSubmitting || !validateForm() ? '#9CA3AF' : PRIMARY_BLUE 
                }}
                disabled={isSubmitting || !validateForm()}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
              </button>
            </div>

            {/* Rodapé */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Seus dados serão usados apenas para contato do programa de testes.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { Phone, MapPin, PartyPopper, Store, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';

// 1. Interfaz actualizada
interface MenuVariant {
  name: string;
  description: string;
  price: string;
  image?: string; 
}

interface MenuItem {
  id: number;
  name: string;
  image: string;
  description?: string;
  price?: string;
  variants?: MenuVariant[];
}

// 2. Componente de tarjeta
const MenuCard = ({ item }: { item: MenuItem }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const hasVariants = item.variants && item.variants.length > 0;
  
  const currentPrice = hasVariants ? item.variants![activeIdx].price : item.price;
  const currentDesc = hasVariants ? item.variants![activeIdx].description : item.description;
  const currentVariantName = hasVariants ? item.variants![activeIdx].name : null;
  
  const currentImage = hasVariants && item.variants![activeIdx].image 
    ? item.variants![activeIdx].image 
    : item.image;

  const nextVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVariants) setActiveIdx((prev) => (prev + 1) % item.variants!.length);
  };

  const prevVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVariants) setActiveIdx((prev) => (prev === 0 ? item.variants!.length - 1 : prev - 1));
  };

  return (
    <div className="w-[65vw] max-w-[280px] md:max-w-none md:w-auto snap-center md:snap-align-none shrink-0 group flex flex-col">
      <div className="aspect-[4/5] bg-white rounded-3xl mb-5 overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
        <Image 
          key={currentImage}
          src={currentImage!} 
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out animate-fade-in"
          sizes="(max-width: 768px) 280px, 33vw"
        />
        {currentPrice && (
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur text-black font-bold px-4 py-2 rounded-full shadow-lg text-sm transition-all duration-300">
            {currentPrice}
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
        {item.name}
      </h3>

      {hasVariants && (
        <div className="flex items-center justify-between bg-white border border-gray-100 shadow-sm rounded-full px-2 py-1 mb-3">
          <button onClick={prevVariant} className="p-1.5 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={16} className="text-[#0C3E20]"/>
          </button>
          <span className="text-sm font-semibold text-gray-800 flex-1 text-center truncate px-2">
            {currentVariantName}
          </span>
          <button onClick={nextVariant} className="p-1.5 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronRight size={16} className="text-[#0C3E20]"/>
          </button>
        </div>
      )}

      <p key={activeIdx} className="text-gray-500 text-sm leading-relaxed min-h-[80px] animate-fade-in flex-grow">
        {currentDesc}
      </p>

      {hasVariants && item.variants!.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {item.variants!.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === activeIdx ? 'bg-[#0C3E20]' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'eventos' | 'snack'>('eventos');
  const [menuCategory, setMenuCategory] = useState<'comida' | 'bebidas'>('comida');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const catParam = params.get('cat');

    if (tabParam === 'snack') {
      setActiveTab('snack');
      if (catParam === 'bebidas') {
        setMenuCategory('bebidas');
      }
      
      setTimeout(() => {
        const menuElement = document.getElementById('menu');
        if (menuElement) {
          menuElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  const menuEventos: MenuItem[] = [
    {
      id: 1,
      name: "QUIENES SOMOS?",
      description: "En MOED creemos que cada evento merece un detalle especial. Creamos barras de snacks elegantes y personalizadas, diseñadas para complementar la esencia de cada celebración y brindar a tus invitados una experiencia que combine sabor, estilo y sofisticación.",
      image: "/i6.jpg",
    },
    {
      id: 2,
      name: "SNACK BAR LISTA",
      description: "Variedad de snacks, servidos desde nuestra cristalería estilo vintage.",
      image: "/barra_lado.jpg",
    },
    {
      id: 3,
      name: "MOED ES PARTE DE TUS MOMENTOS ESPECIALES",
      description: "Gracias por confiar en MOED para darle ese toque especial a su evento. Tú celebras, nosotros hacemos que cada detalle brille. Agenda tu fecha con nosotros y haz de tu evento un momento único.",
      image: "/i5.jpg",
    }
  ];

  const menuSnacks: MenuItem[] = [
    {
      id: 11,
      name: "Wrap de Pechuga",
      image: "/wrap.jpg", 
      variants: [
        {
          name: "Relleno Clásico",
          description: "Tortilla integral (espinaca, integral, chipotle), Pechuga, Zanahoria, Lechuga, Tiras de maiz.",
          price: "$100 MXN",
          image: "/wrap.jpg"
        },
      ]
    },
    {
      id: 4,
      name: "Croissant",
      image: "/i3.jpg", 
      variants: [
        {
          name: "Relleno Clásico",
          description: "1 Croissant, Paleta de hielo (vainilla), Porción crema, Nutella, 1 topping.",
          price: "$85 MXN",
          image: "/i3.jpg"
        },
        {
          name: "Relleno Salado",
          description: "1 Croissant, Toping secreto (Rajas de chile poblano 🤫), Jamón Ahumado, Queso y Lechuga.",
          price: "$85 MXN",
          image: "/i8.jpg"
        }
      ]
    },
    {
      id: 6,
      name: "Mini Pancakes",
      image: "/i2.jpg",
      variants: [
        {
          name: "Clásicos",
          description: "12 mini pancakes, Fresas, Plátano, 1 porción de crema, 1 topping, 1 jalea.",
          price: "$85 MXN",
          image: "/i7.jpg" 
        },
        {
          name: "Nutella",
          description: "12 mini pancakes, Fresas, Porción de crema, Nutella, 3 topping.",
          price: "$90 MXN",
          image: "/i1.jpg" 
        },
        {
          name: "Nutella Banana",
          description: "12 mini pancakes, plátano, Porción de crema, Nutella, 3 topping.",
          price: "$90 MXN",
          image: "/i1.jpg"
        },
        {
          name: "Mini King",
          description: "15 mini pancakes, Fresas, Plátano, Durazno (frutilla), 1 porción de crema, 3 topping, 2 jalea.",
          price: "$100 MXN",
          image: "/i1.jpg"
        }
      ]
    },
    {
      id: 5,
      name: "Pan de Muerto",
      image: "/pan_muerto.jpg",
      variants: [
        {
          name: "Relleno Clásico",
          description: "1 pan de muerto, Fresas, 1 porción de crema, 1 topping (almendras).",
          price: "$85 MXN",
          image: "/pan_muerto.jpg" 
        },
        {
          name: "Relleno Nutella",
          description: "1 pan de muerto, Fresas, 1 porción de crema, Nutella, 2 toppings.",
          price: "$95 MXN",
          image: "/pan_muerto.jpg"
        }
      ]
    }
  ];

  const menuBebidas: MenuItem[] = [
    {
      id: 7,
      name: "Matcha Protein",
      description: "Delicioso matcha orgánico preparado con leche que contiene 26gr de proteína con cold foam de matcha.",
      price: "$80 MXN",
      image: "/b3.jpg",
    },
    {
      id: 8,
      name: "Tropical MOED",
      description: "Smoothie de mango con plátano con decoración Dragon Fruit, endulzado con miel de agave.",
      price: "$75 MXN",
      image: "/b2.jpg",
    },
    {
      id: 9,
      name: "Fit Detox",
      description: "Jugo verde con apio, piña, Naranja, Nopal y espinaca, endulzado con miel de agave.",
      price: "$80 MXN",
      image: "/b1.jpg",
    },
    {
      id: 10,
      name: "Red Power",
      description: "Pruebalo y siente el poder fluir por tus venas. Anda animate a probarlo...",
      price: "$75 MXN",
      image: "/b4.jpg",
    }
  ];

  const activeMenu = activeTab === 'eventos' 
    ? menuEventos 
    : (menuCategory === 'comida' ? menuSnacks : menuBebidas);
  
  const heroContent = {
    eventos: {
      tag: "¡Para tus celebraciones!",
      titlePart1: "Sabor, Calidad",
      titlePart2: "& Presentación",
      description: "Será un placer atenderte y ser parte de tus momentos especiales. Contamos con barra de snacks, bebidas preparadas y postres para elevar tu evento."
    },
    snack: {
      tag: "¡PARA TU ANTOJO DE LA SEMANA!",
      titlePart1: "Tus Antojos",
      titlePart2: "Al Instante",
      description: "Disfruta de nuestra deliciosa variedad de snacks y bebidas preparadas al momento. El sabor que ya conoces, listo para disfrutar."
    }
  };

  const currentHero = heroContent[activeTab];

 return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1A1A1A] font-sans selection:bg-[#0C3E20] selection:text-[#F9F6F0] overflow-x-hidden transition-colors duration-500">
      {/* Fondo base actualizado al tono crema del diseño */}
      <Head>
        <title>MOED | {activeTab === 'eventos' ? 'Snack Bar para Eventos' : 'Tus Snacks Favoritos'}</title>
        <meta name="description" content="MOED Snack Bar y Antojos." />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&display=swap" rel="stylesheet" />
      </Head>

      <nav className="flex flex-col md:flex-row justify-between items-center py-6 px-6 md:px-8 max-w-7xl mx-auto gap-6 md:gap-0">
        {/* Color verde oscuro del nuevo logo aplicado aquí */}
        <div className="text-4xl md:text-5xl font-black tracking-tighter text-[#0C3E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
          MOED<span className="text-xs md:text-sm font-sans font-medium tracking-normal ml-2 uppercase text-gray-500 align-middle">
            {activeTab === 'eventos' ? 'Snack Bar' : 'Snacks'}
          </span>
        </div>

        <div className="relative bg-white/60 p-1.5 rounded-full flex items-center shadow-sm border border-gray-200/60 w-full sm:w-auto backdrop-blur-md">
          <div 
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-out ${
              activeTab === 'eventos' ? 'translate-x-0' : 'translate-x-full'
            }`}
          />
          <button 
            onClick={() => setActiveTab('eventos')}
            className={`relative z-10 flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 rounded-full font-medium transition-colors duration-300 text-sm md:text-base ${
              activeTab === 'eventos' ? 'text-[#0C3E20]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <PartyPopper size={18} />
            <span>Eventos</span>
          </button>
          <button 
            onClick={() => setActiveTab('snack')}
            className={`relative z-10 flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 rounded-full font-medium transition-colors duration-300 text-sm md:text-base ${
              activeTab === 'snack' ? 'text-[#0C3E20]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Store size={18} />
            <span>Snacks</span>
          </button>
        </div>

        <a 
          href="https://wa.me/526863403935" 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#20b858] transition-colors text-base shadow-sm hover:shadow"
        >
          <FaWhatsapp size={18} className="w-5 h-5"/>
          <span>686 340 3935</span>
        </a>
      </nav>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12 min-h-[65vh]">
        <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left transition-all duration-500">
          
          {/* Badge estilo píldora como en el diseño */}
          <div className="inline-block border border-gray-200/80 bg-white/60 backdrop-blur-sm px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest text-gray-600 shadow-sm">
            {currentHero.tag}
          </div>
          
          {/* Tipografía Playfair con la estructura exacta del diseño */}
          <h1 key={currentHero.titlePart1} className="animate-fade-in-up">
            <span className="text-5xl sm:text-6xl md:text-[5rem] font-bold text-[#1A1A1A] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {currentHero.titlePart1}
            </span>
            <br />
            <span className="text-4xl sm:text-5xl md:text-[4rem] italic font-normal text-[#1A1A1A] block mt-2 md:mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {currentHero.titlePart2}
            </span>
          </h1>
          
          <p key={currentHero.description} className="text-gray-600 text-base md:text-lg leading-relaxed animate-fade-in max-w-lg mx-auto md:mx-0">
            {currentHero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
            <a 
              href="https://wa.me/526863403935"
              className="flex justify-center items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-black transition-transform hover:scale-105 duration-300 shadow-lg shadow-black/10"
            >
              {activeTab === 'eventos' ? 'Cotiza tu evento' : 'Haz tu pedido'}
            </a>
            <a 
              href="#menu"
              className="flex justify-center items-center gap-2 bg-transparent text-[#1A1A1A] border border-gray-300 px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium hover:border-[#1A1A1A] hover:bg-white/50 transition-all duration-300"
            >
              Ver Menú
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2.5 text-sm text-gray-500 font-medium animate-fade-in pt-2">
            <CreditCard size={18} className="text-gray-400" />
            <span>Aceptamos pagos con tarjeta</span>
            <img 
              src="/mercado_pago.png" 
              alt="Mercado Pago" 
              className="h-10 w-auto object-contain ml-1 opacity-90 hover:opacity-100 transition-opacity" 
            />
          </div>
        </div>
        
        <div className="flex-1 w-full flex justify-center items-center mb-8 md:mb-0">
          {/* Círculo limpio con sombra suave, como en el render del nuevo diseño */}
          <div className="relative w-64 h-64 md:w-[420px] md:h-[420px] flex-shrink-0 rounded-full overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-transform hover:scale-105 duration-700 ease-out border-4 border-white">
            <img 
              key={activeTab} 
              src="/logo3.jpg" 
              alt="MOED Logo" 
              className="w-full h-full object-cover animate-fade-in mix-blend-multiply" 
            /> 
          </div>
        </div>
      </section>

      <section id="menu" className="py-16 md:py-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12 px-6 md:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0C3E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {activeTab === 'eventos' ? 'Nuestra Barra' : 'Nuestro Menú'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              {activeTab === 'eventos' 
                ? 'Cuidamos cada detalle para ofrecerte la mejor experiencia visual y de sabor en tu evento.' 
                : 'Antojos y bebidas preparadas al instante con los ingredientes más frescos.'}
            </p>
          </div>

          {activeTab === 'snack' && (
            <div className="flex justify-center mb-12 animate-fade-in">
              <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-sm border border-gray-200/60">
                <button 
                  onClick={() => setMenuCategory('comida')}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    menuCategory === 'comida' 
                      ? 'bg-white shadow-md text-[#0C3E20]' 
                      : 'text-gray-500 hover:text-[#0C3E20]'
                  }`}
                >
                  🥐 Comida
                </button>
                <button 
                  onClick={() => setMenuCategory('bebidas')}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    menuCategory === 'bebidas' 
                      ? 'bg-white shadow-md text-[#0C3E20]' 
                      : 'text-gray-500 hover:text-[#0C3E20]'
                  }`}
                >
                  🧋 Bebidas
                </button>
              </div>
            </div>
          )}

          <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-6 md:gap-10 px-6 md:px-8 pb-10 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {activeMenu.map((item) => (
              <MenuCard key={`${activeTab}-${menuCategory}-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </section>
      
      {activeTab === 'snack' && (
        <section className="py-16 md:py-24 animate-fade-in-up">
          <div className="max-w-7xl mx-auto px-6 md:px-8 bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 text-center md:text-left space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#0C3E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ¿Ya pediste pero no sabes dónde nos ubicamos?
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  Ven por tus snacks o encuéntranos fácilmente. Dale clic al botón para abrir la ruta en tu celular o guíate con nuestro mapa interactivo.
                </p>
                <div className="pt-4 flex justify-center md:justify-start">
                  <a 
                    href="https://maps.app.goo.gl/imzA4ngpBe5xkBiC9" 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#0C3E20] text-white px-8 py-3.5 rounded-full text-base md:text-lg font-medium hover:bg-[#082915] transition-transform hover:scale-105 duration-300 shadow-xl shadow-[#0C3E20]/20"
                  >
                    <MapPin size={20} />
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg border-8 border-white bg-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d911.7148845267875!2d-115.00484793038352!3d32.57177142853233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d7a9001824e9ed%3A0xd7c065fa0573e41e!2sMoed!5e1!3m2!1ses!2smx!4v1792896311896!5m2!1ses!2smx" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación MOED"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer actualizado con el color Verde Oscuro corporativo */}
      <footer className="bg-[#0C3E20] text-white py-14 md:py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-4xl md:text-5xl font-black tracking-tighter mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              MOED
            </div>
            <p className="text-[#E8F0EA] text-sm md:text-base leading-relaxed max-w-xs font-light">
              Llevando sabor, calidad y presentación a todos tus eventos especiales.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-white/90">Contacto</h4>
            <ul className="space-y-4 text-[#E8F0EA] text-sm md:text-base font-light">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-white/70" />
                <span>686 340 3935</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-white/70" />
                <span>Servicio para eventos</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-white/90">Redes Sociales</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://www.facebook.com/profile.php?id=61593586598972" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0C3E20] transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/moed.snack?obrf=cmY0NmxpZjhiOHNu" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0C3E20] transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://wa.me/526863403935" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0C3E20] transition-colors duration-300">
                <FaWhatsapp size={20} />
              </a>
              <a href="https://www.messenger.com/t/profile.php?id=61593983091507" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0C3E20] transition-colors duration-300">
                <FaFacebookMessenger size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-xs md:text-sm font-light tracking-wide">
          © {new Date().getFullYear()} MOED Snack Bar.<br/><a href="https://github.com/bilileo" target="_blank" rel="noreferrer" className="hover:text-white transition-colors mt-1 inline-block">Made by bili ©</a> Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
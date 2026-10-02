import Head from 'next/head';
import { Phone, MapPin, Star, Coffee } from 'lucide-react';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaFacebookMessenger} from 'react-icons/fa';

// Interfaz para los elementos del menú
interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: string;
}

export default function Home() {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "QUIENES SOMOS?",
      description: "En MOED creemos que cada evento merece un detalle especial. Creamos barras de snacks elegantes y personalizadas, diseñadas para complementar la esencia de cada celebración y brindar a tus invitados una experiencia que combine sabor, estilo y sofisticación.",
      image: "/barrita.jpg",
    },
    {
      id: 2,
      name: "Bebidas Refrescantes",
      description: "Variedad de bebidas preparadas al momento, servidas desde nuestra cristalería estilo vintage.",
      image: "/carrito.jpg",
    },
    {
      id: 3,
      name: "Barra de Snacks Salados",
      description: "Selección de botanas, cacahuates y complementos con limón fresco y salsas a elegir.",
      image: "/snacks.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-[#FDFBF7] overflow-x-hidden">
      <Head>
        <title>MOED Snack Bar | Sabor, Calidad y Presentación</title>
        <meta name="description" content="MOED Snack Bar para tus eventos especiales." />
      </Head>

      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 px-6 md:px-8 max-w-7xl mx-auto border-b border-gray-200">
        <div className="text-2xl md:text-3xl font-serif font-black tracking-tighter">
          MOED<span className="text-xs md:text-sm font-sans font-light tracking-normal ml-1 md:ml-2 uppercase text-gray-500">Snack Bar</span>
        </div>
        <a 
          href="https://wa.me/526863403935" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium hover:bg-[#20b858] transition-colors text-sm md:text-base"
        >
          <FaWhatsapp size={18} className="w-4 h-4 md:w-5 md:h-5"/>
          <span className="hidden sm:inline">686 340 3935</span>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12">
        <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left">
          <div className="inline-block border border-gray-300 px-4 py-1.5 rounded-full text-xs md:text-sm tracking-widest uppercase font-semibold text-gray-600">
            ¡Ya estamos disponibles!
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight">
            Sabor, Calidad <br />
            <span className="italic font-light text-3xl sm:text-4xl md:text-6xl">& Presentación</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Será un placer atenderte y ser parte de tus momentos especiales. Contamos con barra de snacks, bebidas preparadas y postres para elevar tu evento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2 md:pt-4">
            <a 
              href="https://wa.me/526863403935"
              className="flex justify-center items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-black transition-colors"
            >
              Cotiza tu evento
            </a>
            <a 
              href="#menu"
              className="flex justify-center items-center gap-2 bg-transparent text-[#1A1A1A] border border-[#1A1A1A] px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Ver menú
            </a>
          </div>
        </div>
        
        {/* Hero Image / Logo Placeholder */}
        <div className="flex-1 w-full flex justify-center items-center mb-6 md:mb-0">
          {/* Usamos medidas exactas (w-64 h-64 en celular, w-[400px] h-[400px] en PC) para forzar el círculo perfecto */}
          <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] flex-shrink-0 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white flex items-center justify-center">
            <img src="/logo.jpg" alt="MOED Logo" className="w-full h-full object-contain p-4" /> 
          </div>
        </div>
      </section>

      {/* Menu / Showcase Section */}
      <section id="menu" className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16 px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Nuestra Barra</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
              Cuidamos cada detalle para ofrecerte la mejor experiencia visual y de sabor en tu evento.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-12 px-6 md:px-8 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                // ✨ AQUÍ ESTÁ LA SOLUCIÓN DEL TAMAÑO EN MÓVILES ✨
                // Cambiamos a w-[65vw] (65% de la pantalla) con un límite de 260px.
                // En PC (md:) vuelve a ser automático para llenar sus 3 columnas.
                className="w-[65vw] max-w-[260px] md:max-w-none md:w-auto snap-center md:snap-align-none shrink-0 group cursor-pointer"
              >
                {/* Contenedor de la imagen */}
                <div className="aspect-[4/5] bg-[#FDFBF7] rounded-2xl mb-4 md:mb-6 overflow-hidden relative shadow-sm md:shadow-none">
                  {/* Etiqueta Image de Next.js */}
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 260px, 33vw"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-3xl font-serif font-black tracking-tighter mb-4 md:mb-6">
              MOED
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Llevando sabor, calidad y presentation a todos tus eventos especiales.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-4 md:mb-6 uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} />
                <span>686 340 3935</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} />
                <span>Servicio para eventos</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-4 md:mb-6 uppercase tracking-wider text-sm">Redes Sociales</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="https://www.facebook.com/profile.php?id=61593983091507&__cft__[0]=AZgnqVhVgQek2hI841RRAyAiEO1X6YilVs5zq2KIAdrJJLNwkidCSPWV3ak_IZUK8s0OUVwu5QyawbJlffbcc5cCqQoOY_Fu-1i_tO5m8JXbL4CobZ8g2qAjPzOvh3QUKdzvNYkDVp6E0IksSmI&__tn__=-]K-R" 
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1877F2] transition-colors duration-300"
              >
                <FaFacebook size={22} />
              </a>
              <a 
                href="https://www.instagram.com/tu_perfil" 
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#E4405F] transition-colors duration-300"
              >
                <FaInstagram size={22} />
              </a>
              <a 
                href="https://wa.me/526863403935" 
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#25D366] transition-colors duration-300"
              >
                <FaWhatsapp size={22} />
              </a>
              <a 
                href="https://www.messenger.com/t/profile.php?id=61593983091507" 
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#25D366] transition-colors duration-300"
              >
                <FaFacebookMessenger size={22} />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-12 md:mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs md:text-sm">
          © {new Date().getFullYear()} MOED Snack Bar. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
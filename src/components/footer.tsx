import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer(){
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contato" className="bg-white/90 px-6 py-16 text-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/s-logo.svg"
                alt="Logo"
                width={156}
                height={38}
                priority
              />
            </Link>
            <p className="text-gray-400">
              Revolucionando a gestão médica com tecnologia de ponta.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Produto</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block transition-colors hover:text-white">
                Recursos
              </a>
              <a href="#" className="block transition-colors hover:text-white">
                Preços
              </a>
              <a href="#" className="block transition-colors hover:text-white">
                Segurança
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Suporte</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block transition-colors hover:text-white">
                Central de Ajuda
              </a>
              <a href="#" className="block transition-colors hover:text-white">
                Tutoriais
              </a>
              <a href="#" className="block transition-colors hover:text-white">
                Contato
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contato</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@dragenda.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Dr Agenda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200/20 bg-white/90 shadow-sm backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Image
            src="/s-logo.svg"
            alt="Logo"
            width={156}
            height={38}
            priority
          />
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          <a
            href="#recursos"
            className="text-gray-700 transition-colors hover:text-blue-600"
          >
            Recursos
          </a>
          <a
            href="#beneficios"
            className="text-gray-700 transition-colors hover:text-blue-600"
          >
            Benefícios
          </a>
          <a
            href="#depoimentos"
            className="text-gray-700 transition-colors hover:text-blue-600"
          >
            Depoimentos
          </a>
          <a
            href="#contato"
            className="text-gray-700 transition-colors hover:text-blue-600"
          >
            Contato
          </a>
          <Link href="/authentication">
            <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-all duration-300 hover:shadow-lg">
              Começar Agora
            </button>
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-4 px-6 py-4">
            <a
              href="#recursos"
              className="block text-gray-700 hover:text-blue-600"
            >
              Recursos
            </a>
            <a
              href="#beneficios"
              className="block text-gray-700 hover:text-blue-600"
            >
              Benefícios
            </a>
            <a
              href="#depoimentos"
              className="block text-gray-700 hover:text-blue-600"
            >
              Depoimentos
            </a>
            <a
              href="#contato"
              className="block text-gray-700 hover:text-blue-600"
            >
              Contato
            </a>
            <Link href="/authentication">
              <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-all duration-300 hover:shadow-lg">
                Começar Agora
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};


import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CustomizerScreenProps {
  onRequestClose: () => void;
  onColorChange: (color: string) => void;
}

const CustomizerScreen: React.FC<CustomizerScreenProps> = ({ onRequestClose, onColorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animação de entrada
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  // Função para animar saída
  const handleClose = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.7,
        ease: "power2.in",
        onComplete: onRequestClose,
      });
    } else {
      onRequestClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.0)" }}
    >
      {/* Botões de cor na lateral esquerda */}
      <div className="fixed top-1/2 left-12 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg bg-red-600 hover:scale-110 transition-transform cursor-pointer"
          title="Vermelho"
          onClick={() => onColorChange("red")}
        />
        <button
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg bg-blue-600 hover:scale-110 transition-transform cursor-pointer"
          title="Azul"
          onClick={() => onColorChange("blue")}
        />
        <button
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg bg-green-900 hover:scale-110 transition-transform cursor-pointer"
          title="Verde Escuro"
          onClick={() => onColorChange("#064e3b")}
        />
        <button
          className="w-10 h-10 rounded-full border-2 border-black shadow-lg bg-transparent hover:scale-110 transition-transform cursor-pointer"
          title="Cor Padrão"
          onClick={() => onColorChange("default")}
        />
      </div>
      {/* Botão Back */}
      <button
        className="fixed bottom-12 left-12 bg-black w-fit h-fit px-4 sm:px-6 py-2 rounded-full text-xs text-white font-light cursor-pointer hover:bg-gray-800 transition-colors z-50"
        onClick={handleClose}
      >
        Back
      </button>
    </div>
  );
};

export default CustomizerScreen; 
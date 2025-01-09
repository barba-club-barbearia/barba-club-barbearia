import { Scissors } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-amber-900/20">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-[#0f0f0f] rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-500 p-1.5 rounded">
              <Scissors className="h-5 w-5 text-black" />
            </div>
          </div>
          <p className="text-sm text-zinc-400 mb-2">
            © 2024 Barba Club Barbearia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-500">
            Siga-nos nas redes sociais para novidades e promoções!
          </p>
        </div>
      </div>
    </footer>
  );
};

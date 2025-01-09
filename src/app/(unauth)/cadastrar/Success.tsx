/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const SuccessState = ({ onNavigateToLogin }: any) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </motion.div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-white">
            Conta criada com sucesso!
          </h3>
          <p className="text-zinc-400 text-sm">
            Sua conta foi criada e está pronta para uso.
          </p>
        </div>
      </div>

      <Button
        onClick={onNavigateToLogin}
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11 group transition-all duration-300 ease-in-out"
      >
        <span className="flex items-center justify-center gap-2">
          Ir para login
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>

      <div className="pt-4 text-center">
        <p className="text-zinc-500 text-sm">
          Você receberá um email de confirmação em breve
        </p>
      </div>
    </div>
  );
};

export default SuccessState;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AlertCircle, Loader2, Asterisk } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import SuccessState from "./Success";

export default function Cadastrar() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const isPasswordValid = formData.password.length >= 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!isPasswordValid) {
      setError("A senha precisa ter no mínimo 4 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }

      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className={success ? "space-y-4" : ""}>
          {!success && (
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src="/icon.png"
                    alt="Logo da Barbearia"
                    fill
                    className="object-contain"
                    style={{
                      clipPath: "circle(50% at center)",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {!success && (
            <>
              <h1 className="text-2xl font-bold text-white text-center">
                Criar nova conta
              </h1>
              <p className="text-zinc-400 text-center text-sm">
                Preencha seus dados para criar sua conta
              </p>
              <div className="mb-6 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 md:p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-amber-500 font-medium text-sm md:text-base">
                      Atenção
                    </p>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                      Não será possível editar os dados após o cadastro.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardHeader>

        <CardContent>
          {success ? (
            <SuccessState onNavigateToLogin={() => router.push("/entrar")} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-900/30 border-red-900"
                >
                  <div className="flex gap-2 justify-center w-full">
                    <AlertCircle className="h-4 w-4 mt-1" />
                    <AlertDescription>{error}</AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-200">
                  Nome
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="nome e sobrenome"
                  required
                />
                <div className="text-xs text-zinc-400 flex items-center gap-1">
                  <Asterisk className="h-3 w-3" />
                  <span>É necessário pelo menos um sobrenome.</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-200">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="senha..."
                    className="bg-zinc-800 border-zinc-700 text-white pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="text-xs text-zinc-400 flex items-center gap-1">
                  <Asterisk className="h-3 w-3" />
                  <span>A senha deve ter no mínimo 4 caracteres.</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-zinc-400">Já tem uma conta? </span>
                <Link
                  href="/entrar"
                  className="text-amber-500 hover:text-amber-400"
                >
                  Faça login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

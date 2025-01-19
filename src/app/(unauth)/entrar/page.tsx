"use client";

import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha incorretos");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-4">
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
          <h1 className="text-2xl font-bold text-white text-center">
            Bem-vindo de volta
          </h1>
          <p className="text-zinc-400 text-center text-sm">
            Entre com suas credenciais para acessar o sistema
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-900/30 border-red-900"
              >
                <div className="flex items-center gap-2 justify-center w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </div>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-zinc-200">
                  Senha
                </Label>
                <Link
                  href="/esqueci-senha"
                  className="text-amber-500 hover:text-amber-400 text-sm"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-zinc-400">Não tem uma conta? </span>
              <Link
                href="/cadastrar"
                className="text-amber-500 hover:text-amber-400 font-medium"
              >
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar email de recuperação");
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
            Recuperar senha
          </h1>
          <p className="text-zinc-400 text-center text-sm">
            Digite seu email para receber um link de recuperação
          </p>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="space-y-4">
              <Alert className="bg-green-900/30 border-green-900">
                <div className="flex items-center gap-2 justify-center w-full">
                  <AlertDescription className="text-white">
                    Email enviado! Verifique sua caixa de entrada.
                  </AlertDescription>
                </div>
              </Alert>
              <Button
                onClick={() => router.push("/entrar")}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11"
              >
                Voltar para login
              </Button>
            </div>
          ) : (
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar email de recuperação"
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-zinc-400">Lembrou sua senha? </span>
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

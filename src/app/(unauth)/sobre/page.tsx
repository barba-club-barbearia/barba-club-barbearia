// app/sobre/page.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Star } from "lucide-react";

const ABOUT_ME = {
  name: "Welligton da Silva",
  experience: "10 anos de experiência",
  description:
    "Especialista em cortes masculinos modernos e tradicionais. Formado pela escola de barbearia Premium, com diversos cursos de especialização em técnicas de degradê e barba.",
  specialties: ["Degradê", "Barba", "Navalha", "Pigmentação"],
  achievements: [
    "Certificação Master Barber",
    "Especialização em Barbas",
    "Técnicas Avançadas de Degradê",
  ],
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6">
          Quem Sou Eu
        </h1>

        <div className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-medium text-zinc-200">
              {ABOUT_ME.name}
            </h2>
            <div className="flex items-center gap-2 text-amber-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{ABOUT_ME.experience}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 leading-relaxed">
            {ABOUT_ME.description}
          </p>

          {/* Specialties */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium text-zinc-200">Especialidades</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {ABOUT_ME.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium text-zinc-200">Certificações</h3>
            </div>
            <ul className="space-y-2">
              {ABOUT_ME.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-zinc-400"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

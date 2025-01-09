import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Star, User } from "lucide-react";

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
    <div className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6">
        {/* Status Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between pb-4 rounded-lg shadow-sm">
          <p className="text-lg md:text-xl font-semibold text-zinc-200">
            Sobre o Profissional
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2 sm:mt-0">
            <User className="h-4 w-4" />
            perfil profissional
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-900/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-2 rounded-lg">
                  <User className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-zinc-200 font-medium">{ABOUT_ME.name}</h2>
                  <div className="flex items-center gap-2 text-zinc-400 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{ABOUT_ME.experience}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {ABOUT_ME.description}
            </p>
          </div>

          {/* Specialties Section */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-900/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/10 p-2 rounded-lg">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-zinc-200 font-medium">Especialidades</h3>
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

          {/* Achievements Section */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-900/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/10 p-2 rounded-lg">
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-zinc-200 font-medium">Certificações</h3>
            </div>
            <ul className="space-y-3">
              {ABOUT_ME.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-zinc-400 text-sm"
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

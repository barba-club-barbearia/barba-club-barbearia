import { AlertCircle } from "lucide-react";

const WarningAlert = () => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-amber-500/5 p-1">
      <div className="relative z-20 flex items-start gap-3 p-3">
        <div className="mt-1">
          <div className="rounded-full bg-amber-500/15 p-1">
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-amber-500">Atenção</p>
          <p className="text-sm leading-relaxed text-zinc-400">
            Não será possível editar os dados após o cadastro.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-20" />
    </div>
  );
};

export default WarningAlert;

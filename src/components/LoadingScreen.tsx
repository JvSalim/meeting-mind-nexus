
import { useState, useEffect } from "react";
import { Mic, Brain, Zap } from "lucide-react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: Mic, text: "Inicializando sistema..." },
    { icon: Brain, text: "Carregando IA..." },
    { icon: Zap, text: "Preparando interface..." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center z-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo animado */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center transform animate-pulse">
              <CurrentIcon className="w-10 h-10 text-white animate-bounce" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl blur opacity-50 animate-glow" />
          </div>
        </div>

        {/* Nome da aplicação */}
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          MeetingAI
        </h1>

        {/* Texto do passo atual */}
        <p className="text-slate-300 mb-8 text-lg animate-fade-in">
          {steps[currentStep].text}
        </p>

        {/* Barra de progresso */}
        <div className="w-80 mx-auto">
          <div className="bg-slate-800/50 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-300 ease-out shadow-lg shadow-purple-500/30"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-slate-400 text-sm">
            {Math.round(progress)}% concluído
          </p>
        </div>

        {/* Indicadores de etapa */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-purple-400 scale-125' 
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;


import React from 'react';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Fix: Explicitly extend React.Component to ensure access to setState and props properties
export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Fix: Use React.ErrorInfo for proper type checking in componentDidCatch
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Simulação de envio para Sentry
    // Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 text-center">
          <div className="max-w-2xl w-full">
            <div className="w-12 h-px bg-red-600 mx-auto mb-8"></div>
            <span className="text-[10px] font-ui uppercase tracking-[0.5em] text-red-600 font-black mb-4 block">
              Protocolo de Erro Estrutural
            </span>
            <h1 className="text-4xl md:text-6xl font-editorial italic text-graphite mb-8">
              Interrupção de Sistema
            </h1>
            <p className="text-sm font-ui text-warmGray mb-12 leading-relaxed max-w-md mx-auto">
              A arquitetura de renderização encontrou uma inconsistência crítica. Isso não é sobre falha, é sobre necessidade de reinicialização.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button 
                onClick={() => window.location.reload()}
                className="bg-graphite text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-ui font-black hover:bg-black transition-all"
              >
                Tentar Reinicialização
              </button>
              <button 
                // Fix: Correctly call setState on the component instance (accessible via React.Component)
                onClick={() => this.setState({ hasError: false })}
                className="border border-black/10 text-graphite px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-ui font-black hover:border-black transition-all"
              >
                Voltar ao Terminal
              </button>
            </div>
            <div className="mt-16 opacity-20 font-ui text-[8px] uppercase tracking-widest text-warmGray">
              Erro ID: LV3-ERR-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        </div>
      );
    }

    // Fix: Access children through this.props.children (accessible via React.Component)
    return this.props.children;
  }
}

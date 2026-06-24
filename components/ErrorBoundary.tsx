// c:\Users\user\Desktop\raimgaz-main\components\ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Что-то пошло не так</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться назад.
          </p>
          {this.state.error && (
            <details className="mb-4 text-left w-full max-w-sm">
              <summary className="text-xs text-gray-400 cursor-pointer mb-1">Подробности ошибки</summary>
              <code className="text-xs bg-gray-100 p-2 rounded block overflow-auto text-red-600">
                {this.state.error.message}
              </code>
            </details>
          )}
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Попробовать снова
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

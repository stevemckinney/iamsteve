import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorMessage?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            role="alert"
            aria-live="assertive"
            className="flex flex-col gap-2 py-4 px-6 bg-rio-150"
          >
            <h2 className="block font-medium py-1.5 text-center text-heading">
              {this.props.errorMessage || 'Oops, there was an error!'}
            </h2>
            <button
              type="button"
              onClick={this.resetErrorBoundary}
              className="px-4 py-2 bg-fern-600 text-white rounded hover:bg-fern-700 transition duration-200 ease-in"
            >
              Try again?
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

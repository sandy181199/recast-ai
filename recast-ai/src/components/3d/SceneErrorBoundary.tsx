'use client'

import { Component, type ReactNode } from 'react'

interface State {
  hasError: boolean
}

export default class SceneErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch() {
    // Auto-recover: remount Scene after a tick
    setTimeout(() => this.setState({ hasError: false }), 200)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

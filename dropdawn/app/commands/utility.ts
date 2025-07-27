export function handleRTC() {
    return {
      type: 'redirect' as const,
      content: 'Redirecting to PeerSuite...',
      url: 'https://peersuite.space'
    };
  }
  
  export function handleEcho(message: string) {
    return {
      type: 'echo' as const,
      content: message || 'No message provided'
    };
  }
  
  export function handleEvaluate(mathExpression: string) {
    return {
      type: 'evaluate' as const,
      content: `Evaluating: ${mathExpression}`,
      mathExpression: mathExpression
    };
  }
  
  export function handleMemes() {
    return {
      type: 'redirect' as const,
      content: 'Redirecting to MemeHub... Have fun!',
      url: 'https://www.memehub.mom/'
    };
  }
  
  export function handleAPI() {
    return {
      type: 'redirect' as const,
      content: 'Redirecting to Hoppscotch (API client)...',
      url: 'https://hoppscotch.io/'
    };
  }
  
  export function handleRealtime() {
    return {
      type: 'redirect' as const,
      content: 'Redirecting to Scira (Realtime infra)...',
      url: 'https://scira.ai/'
    };
  }
  
  export function handleDonate() {
    return {
      type: 'redirect' as const,
      content: 'Redirecting to coffee donation page... Thank you!',
      url: 'https://coff.ee/bikash1376V'
    };
  }
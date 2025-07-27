export function handleTheme(theme: string) {
  const validThemes = ['color', 'dark', 'light'];
  const selectedTheme = theme.toLowerCase().trim();
  
  if (!selectedTheme) {
    return {
      type: 'theme' as const,
      content: 'Current theme: color (default)',
      theme: 'color'
    };
  }
  
  if (!validThemes.includes(selectedTheme)) {
    return {
      type: 'theme' as const,
      content: 'Invalid theme. Available themes: color, dark, light',
      theme: 'color'
    };
  }
  
  // Store theme preference
  localStorage.setItem('dropdawn_theme', selectedTheme);
  
  return {
    type: 'theme' as const,
    content: `Theme changed to: ${selectedTheme}`,
    theme: selectedTheme
  };
}

export function getCurrentTheme() {
  return localStorage.getItem('dropdawn_theme') || 'color';
} 
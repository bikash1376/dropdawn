export function handleBookmark(text: string) {
  // Store in localStorage
  const bookmarks = JSON.parse(localStorage.getItem('dropdawn_bookmarks') || '[]');
  const newBookmark = {
    id: Date.now(),
    text: text,
    timestamp: new Date().toISOString()
  };
  bookmarks.push(newBookmark);
  localStorage.setItem('dropdawn_bookmarks', JSON.stringify(bookmarks));
  
  return {
    type: 'bookmark' as const,
    content: `Bookmark saved! You now have ${bookmarks.length} bookmarks.`
  };
}

export function getBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('dropdawn_bookmarks') || '[]');
  return bookmarks;
}

export function clearBookmarks() {
  localStorage.removeItem('dropdawn_bookmarks');
  return {
    type: 'bookmark' as const,
    content: 'All bookmarks cleared!'
  };
} 
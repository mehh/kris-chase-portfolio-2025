/**
 * Hook for handling streamable text from AI responses
 */

import { useState, useEffect } from 'react';

export function useStreamableText(streamedText: string) {
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (streamedText) {
      setText(streamedText);
      // Consider it streaming if text is still being updated
      setIsStreaming(false);
    } else {
      setIsStreaming(false);
    }
  }, [streamedText]);

  return { text: text || streamedText, isStreaming };
}

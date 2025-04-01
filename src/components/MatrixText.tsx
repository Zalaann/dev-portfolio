"use client";

import { useState, useEffect } from 'react';

interface MatrixTextProps {
  text: string;
  scrambleSpeed?: number;
  decodeSpeed?: number;
}

export const MatrixText: React.FC<MatrixTextProps> = ({
  text,
  scrambleSpeed = 30,
  decodeSpeed = 60,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [decodingComplete, setDecodingComplete] = useState(false);
  const [decodeIndex, setDecodeIndex] = useState(0);
  
  // Characters to use for scrambling effect
  const chars = '!@#$%^&*()_+-=[]{}|;:,./<>?~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  // Initial scramble effect
  useEffect(() => {
    if (decodingComplete) return;
    
    let scrambledText = '';
    
    for (let i = 0; i < text.length; i++) {
      if (i < decodeIndex) {
        // Already decoded characters show correctly
        scrambledText += text[i];
      } else {
        // Not yet decoded characters show random
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        scrambledText += randomChar;
      }
    }
    
    setDisplayText(scrambledText);
    
    // Continue scrambling until all characters are decoded
    const timeoutId = setTimeout(() => {
      if (decodeIndex < text.length) {
        setDecodeIndex(decodeIndex + 1);
      } else {
        setDecodingComplete(true);
      }
    }, decodeIndex < text.length ? decodeSpeed : 5000);
    
    return () => clearTimeout(timeoutId);
  }, [text, decodeIndex, decodingComplete, decodeSpeed, chars]);
  
  // After full decode, restart the effect every 5 seconds
  useEffect(() => {
    if (decodingComplete) {
      const timeoutId = setTimeout(() => {
        setDecodingComplete(false);
        setDecodeIndex(0);
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [decodingComplete]);
  
  return <span className="font-mono">{displayText}</span>;
}; 
'use client';
import { useState, useEffect, useRef } from 'react';

const useTypewriter = (
    words: string[],
    typingSpeed = 150,
    deletingSpeed = 50,
    pauseBeforeDelete = 1500,
    pauseBeforeType = 700,
    loop = true,
    onComplete?: () => void // Added optional onComplete callback
) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Use useRef to hold the timeout ID so it can be cleared reliably
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any existing timeout when the effect re-runs or component unmounts
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // --- IMPORTANT: Initial validation and early exit for empty words array ---
        if (!Array.isArray(words) || words.length === 0) {
            setDisplayedText(''); // Clear text if no words are provided
            if (onComplete) {
                onComplete(); // If no words, consider it immediately complete
            }
            return; // Stop the effect from proceeding
        }
        // --- End of important validation ---


        const handleTyping = () => {
            const currentWord = words[currentWordIndex];

            // Defensive check, though should be covered by initial validation
            if (!currentWord) {
                if (onComplete && !loop) {
                    onComplete();
                }
                return;
            }

            if (isDeleting) {
                if (displayedText.length > 0) {
                    setDisplayedText(prev => currentWord.substring(0, prev.length - 1));
                    timerRef.current = setTimeout(handleTyping, deletingSpeed);
                } else {
                    setIsDeleting(false);
                    const nextWordIndex = (currentWordIndex + 1) % words.length;

                    if (!loop && currentWordIndex === words.length - 1) {
                        // If not looping and it's the last word, trigger onComplete
                        if (onComplete) {
                            onComplete();
                        }
                        // Do not set another timeout, animation is truly complete
                        return;
                    } else {
                        setCurrentWordIndex(nextWordIndex);
                        timerRef.current = setTimeout(handleTyping, pauseBeforeType);
                    }
                }
            } else { // Typing
                if (displayedText.length < currentWord.length) {
                    setDisplayedText(prev => currentWord.substring(0, prev.length + 1));
                    timerRef.current = setTimeout(handleTyping, typingSpeed);
                } else {
                    // Word is fully typed
                    if (loop || currentWordIndex < words.length - 1) {
                        // If looping, or not the last word, proceed to delete
                        setIsDeleting(true);
                        timerRef.current = setTimeout(handleTyping, pauseBeforeDelete);
                    } else {
                        // If not looping and it's the last word, trigger onComplete
                        if (onComplete) {
                            onComplete();
                        }
                        // Do not set another timeout, animation is truly complete
                        return;
                    }
                }
            }
        };

        // Initial call to start the typing process
        timerRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

        // Cleanup function for the effect
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [currentWordIndex, displayedText, isDeleting, words, typingSpeed, deletingSpeed, pauseBeforeDelete, pauseBeforeType, loop, onComplete]); // Include onComplete in dependencies

    return displayedText;
};

export default useTypewriter;
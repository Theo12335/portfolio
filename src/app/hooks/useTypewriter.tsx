'use client';
import { useState, useEffect } from 'react';

const useTypewriter = (
    words: string[],
    typingSpeed = 150,
    deletingSpeed = 50,
    pauseBeforeDelete = 1500,
    pauseBeforeType = 700,
    loop = true
) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleTyping = () => {
            const currentWord = words[currentWordIndex];

            if (isDeleting) {
                if (displayedText.length > 0) {
                    setDisplayedText(prev => currentWord.substring(0, prev.length - 1));
                    timer = setTimeout(handleTyping, deletingSpeed);
                } else {
                    setIsDeleting(false);
                    setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
                    timer = setTimeout(handleTyping, pauseBeforeType);
                }
            } else {
                if (displayedText.length < currentWord.length) {
                    setDisplayedText(prev => currentWord.substring(0, prev.length + 1));
                    timer = setTimeout(handleTyping, typingSpeed);
                } else {
                    if (loop || currentWordIndex < words.length - 1) {
                        setIsDeleting(true);
                        timer = setTimeout(handleTyping, pauseBeforeDelete);
                    }
                }
            }
        };

        timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [currentWordIndex, displayedText, isDeleting, words, typingSpeed, deletingSpeed, pauseBeforeDelete, pauseBeforeType, loop]);

    return displayedText;
};

export default useTypewriter;
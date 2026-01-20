import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterProps {
    sentences: string[];
    typingSpeed?: number;
    deletingSpeed?: number; // Kept for interface compatibility but unused
    pauseTime?: number;
    className?: string;
    style?: React.CSSProperties;
    fadeDuration?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    sentences,
    typingSpeed = 50,
    pauseTime = 1500,
    className = "",
    style,
    fadeDuration = 0.5,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [opacity, setOpacity] = useState(1);
    const [isBlinking, setIsBlinking] = useState(true);

    // Logic state
    const stateRef = useRef({
        text: '',
        sentenceIndex: 0,
        phase: 'TYPING' as 'TYPING' | 'WAITING' | 'FADING',
        lastTick: 0,
        startWait: 0 // timestamp when waiting started
    });

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const tick = () => {
            const state = stateRef.current;
            const now = performance.now();
            if (!state.lastTick) state.lastTick = now;

            const elapsed = now - state.lastTick;

            if (state.phase === 'TYPING') {
                if (elapsed > typingSpeed) {
                    state.lastTick = now;
                    const currentSentence = sentences[state.sentenceIndex % sentences.length];

                    // Type next character
                    const nextCharIndex = state.text.length;
                    if (nextCharIndex < currentSentence.length) {
                        state.text = currentSentence.substring(0, nextCharIndex + 1);
                        setDisplayedText(state.text);
                        setIsBlinking(false);
                    } else {
                        // Finished typing
                        state.phase = 'WAITING';
                        state.startWait = now;
                        setIsBlinking(true);
                    }
                }
                timeoutId = setTimeout(tick, typingSpeed);
            } else if (state.phase === 'WAITING') {
                // Wait for pauseTime
                if (now - state.startWait > pauseTime) {
                    state.phase = 'FADING';
                    state.startWait = now;
                    setOpacity(0);
                    setIsBlinking(false);
                }
                timeoutId = setTimeout(tick, 100); // Check less frequently during pause
            } else if (state.phase === 'FADING') {
                if (now - state.startWait > fadeDuration * 1000) {
                    state.phase = 'TYPING';
                    state.sentenceIndex++;
                    state.text = '';
                    setDisplayedText('');
                    setOpacity(1);
                    state.lastTick = now;
                }
                timeoutId = setTimeout(tick, 100); // Check less frequently during fade
            }
        };

        timeoutId = setTimeout(tick, typingSpeed);

        return () => clearTimeout(timeoutId);
    }, [sentences, typingSpeed, pauseTime, fadeDuration]);

    return (
        <span className={className} style={{ ...style, position: 'relative', display: 'inline-block' }}>
            <motion.span
                animate={{ opacity: opacity }}
                transition={{ duration: fadeDuration }}
            >
                {displayedText}
                {/* Cursor inside the fading container so it fades too */}
                <motion.span
                    animate={{ opacity: isBlinking ? [1, 0] : 1 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                    }}
                    className="ml-1 inline-block w-[2px] h-[1em] bg-purple-500 align-middle"
                />
            </motion.span>
        </span>
    );
};

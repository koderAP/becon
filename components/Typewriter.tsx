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
        let animationFrameId: number;

        const loop = (timestamp: number) => {
            const state = stateRef.current;
            if (!state.lastTick) state.lastTick = timestamp;

            const elapsed = timestamp - state.lastTick;

            if (state.phase === 'TYPING') {
                if (elapsed > typingSpeed) {
                    state.lastTick = timestamp;
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
                        state.startWait = timestamp;
                        setIsBlinking(true);
                    }
                }
            } else if (state.phase === 'WAITING') {
                // Wait for pauseTime
                if (timestamp - state.startWait > pauseTime) {
                    state.phase = 'FADING';
                    state.startWait = timestamp;
                    setOpacity(0); // Trigger visual fade
                    setIsBlinking(false); // Stop blinking cursor during fade
                }
            } else if (state.phase === 'FADING') {
                // Wait for fade animation to complete
                // fadeDuration is in seconds, so * 1000
                if (timestamp - state.startWait > fadeDuration * 1000) {
                    // Reset for next sentence
                    state.phase = 'TYPING';
                    state.sentenceIndex++;
                    state.text = '';
                    setDisplayedText('');
                    setOpacity(1); // Reset opacity
                    state.lastTick = timestamp;
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
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

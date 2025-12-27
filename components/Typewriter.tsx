import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    sentences: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    sentences,
    typingSpeed = 50,
    deletingSpeed = 30,
    pauseTime = 1500,
    className = "",
    style,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isBlinking, setIsBlinking] = useState(true);

    // Refs to manage state inside the animation loop without dependencies
    const stateRef = useRef({
        text: '',
        sentenceIndex: 0,
        isDeleting: false,
        lastTick: 0,
        targetSpeed: typingSpeed
    });

    useEffect(() => {
        let animationFrameId: number;

        const loop = (timestamp: number) => {
            const state = stateRef.current;

            // Initialize start time
            if (!state.lastTick) state.lastTick = timestamp;

            const elapsed = timestamp - state.lastTick;

            // Check if enough time has passed for the next character update
            if (elapsed > state.targetSpeed) {
                state.lastTick = timestamp;

                const currentSentence = sentences[state.sentenceIndex % sentences.length];

                if (state.isDeleting) {
                    // DELETING
                    state.text = currentSentence.substring(0, state.text.length - 1);
                    state.targetSpeed = deletingSpeed;
                    setIsBlinking(false); // Stop blinking while acting
                } else {
                    // TYPING
                    state.text = currentSentence.substring(0, state.text.length + 1);
                    state.targetSpeed = typingSpeed;
                    setIsBlinking(false);
                }

                setDisplayedText(state.text);

                // LOGIC FOR CHANGING STATE
                if (!state.isDeleting && state.text === currentSentence) {
                    // Finished typing sentence -> Pause then Delete
                    state.isDeleting = true;
                    state.targetSpeed = pauseTime; // Wait before deleting
                    setIsBlinking(true); // Blink while waiting
                } else if (state.isDeleting && state.text === '') {
                    // Finished deleting -> Move to next sentence
                    state.isDeleting = false;
                    state.sentenceIndex++;
                    state.targetSpeed = 500; // Small pause before new sentence
                    setIsBlinking(true);
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [sentences, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span className={className} style={style}>
            {displayedText}
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
        </span>
    );
};

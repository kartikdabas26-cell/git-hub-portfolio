import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span
        className="absolute left-0 top-0 select-none"
        style={{ opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  startIndex: number;
  totalChars: number;
}

const Word: React.FC<WordProps> = ({ word, progress, startIndex, totalChars }) => {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split('').map((char, index) => {
        const charGlobalIndex = startIndex + index;
        const step = 1 / totalChars;
        const start = Math.max(0, charGlobalIndex * step);
        const end = Math.min(1, start + step);

        return (
          <Character
            key={index}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let currentStartIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`relative font-medium text-[#D7E2EA] text-center leading-relaxed max-w-[560px] ${className}`}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
      }}
    >
      {words.map((word, index) => {
        const wordStartIndex = currentStartIndex;
        // increment by word length + 1 for space
        currentStartIndex += word.length + 1;

        return (
          <React.Fragment key={index}>
            <Word
              word={word}
              progress={scrollYProgress}
              startIndex={wordStartIndex}
              totalChars={totalChars}
            />
            {index < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </React.Fragment>
        );
      })}
    </p>
  );
};

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Sparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 40 random particles on client mount
    const particleCount = 40;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random left percentage
      y: Math.random() * 100, // random top percentage
      size: Math.random() * 3 + 1, // random size between 1px and 4px
      duration: Math.random() * 10 + 15, // float duration 15s to 25s
      delay: Math.random() * 10, // random start delay
    }));
    
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D7B980]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(215, 185, 128, 0.4)`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            // Fade in and out randomly
            opacity: [0, 0.2, 0.6, 0.2, 0],
            // Float gently upwards
            y: [0, -150],
            // Slight horizontal drift
            x: [0, Math.random() * 40 - 20], 
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
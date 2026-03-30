import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#080304',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {/* Background radial glow */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Burgundy accent glow bottom-left */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%', left: '5%',
            width: '350px', height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(110,18,18,0.22) 0%, transparent 70%)',
          }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          {/* Rotating gold ring */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px', height: '180px',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '210px', height: '210px',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.06)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />

          {/* Logo D&M */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: 'backOut' }}
          >
            <motion.h1
              style={{
                fontFamily: "'Cinzel', 'Cormorant Garamond', 'Georgia', serif",
                fontSize: 'clamp(3rem, 9vw, 5.5rem)',
                color: '#C9A84C',
                fontWeight: 600,
                letterSpacing: '12px',
                margin: 0,
                lineHeight: 1,
                position: 'relative',
              }}
            >
              D&M
            </motion.h1>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
              style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
                margin: '14px auto',
              }}
            />

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: 'easeOut' }}
              style={{
                display: 'block',
                fontFamily: "'Cinzel', 'Cormorant Garamond', 'Georgia', serif",
                fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                fontWeight: 400,
                letterSpacing: '8px',
                color: 'rgba(201,168,76,0.55)',
                textTransform: 'uppercase',
              }}
            >
              Laboratorium
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
            style={{
              fontFamily: "'Cinzel', 'Cormorant Garamond', 'Georgia', serif",
              fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
              color: 'rgba(245,238,220,0.32)',
              fontWeight: 400,
              letterSpacing: '4px',
              marginTop: '32px',
              marginBottom: '40px',
              textTransform: 'uppercase',
            }}
          >
            Precyzja · Estetyka · Niezawodność
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ width: '200px', margin: '0 auto' }}
          >
            <div style={{
              width: '100%',
              height: '1px',
              background: 'rgba(201,168,76,0.1)',
              borderRadius: '1px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Shimmer */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
                  translateX: '-100%',
                }}
                animate={{ translateX: ['−100%', '200%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Fill */}
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #C9A84C, #E2C078)',
                  borderRadius: '1px',
                  boxShadow: '0 0 8px rgba(201,168,76,0.4)',
                }}
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 3.2, delay: 0.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

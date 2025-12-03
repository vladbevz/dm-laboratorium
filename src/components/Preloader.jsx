import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(11, 107, 91, 0.05) 0%, transparent 50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        {/* Градієнтні круги на фоні */}
        <motion.div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(11, 107, 91, 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(11, 107, 91, 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Основной контент */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.68, -0.55, 0.265, 1.55]
          }}
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Логотип/Назва з ефектом */}
          <div style={{ position: "relative", marginBottom: "2rem" }}>
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "120%",
                height: "120%",
                background: "radial-gradient(circle, rgba(11, 107, 91, 0.15) 0%, transparent 60%)",
                borderRadius: "50%",
                filter: "blur(20px)",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: "backOut"
              }}
              style={{ 
                fontSize: "clamp(2.8rem, 9vw, 5.5rem)", 
                color: "#ffffff",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
                position: "relative",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              D&M
              <motion.span
                style={{
                  display: "block",
                  fontSize: "clamp(1rem, 3vw, 1.8rem)",
                  fontWeight: 300,
                  letterSpacing: "8px",
                  marginTop: "0.5rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  textTransform: "uppercase",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: "easeOut"
                }}
              >
                Laboratorium
              </motion.span>
            </motion.h1>
          </div>

          {/* Підзаголовок */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 1.2,
              ease: "easeOut"
            }}
            style={{ 
              fontSize: "clamp(1rem, 3vw, 1.4rem)", 
              color: "#a0a0a0",
              fontWeight: 300,
              letterSpacing: "2px",
              marginBottom: "3rem",
              fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
              maxWidth: "500px",
              lineHeight: 1.6,
            }}
          >
            Nowoczesne laboratorium stomatologiczne
          </motion.p>

          {/* Прогрес бар з медичним стилем */}
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <motion.div
              style={{
                width: "100%",
                height: "3px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "3px",
                overflow: "hidden",
                marginBottom: "0.5rem",
                position: "relative",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(11, 107, 91, 0.3), transparent)",
                  transform: "translateX(-100%)",
                }}
                animate={{
                  transform: ["translateX(-100%)", "translateX(100%)"],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                style={{
                  width: "0%",
                  height: "100%",
                  background: "linear-gradient(90deg, #0b6b5b, #0a5a4d)",
                  borderRadius: "3px",
                }}
                animate={{
                  width: ["0%", "30%", "70%", "100%"],
                }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            {/* Підпис під прогрес баром */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                color: "#666",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <span>Loading</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                precision • quality • care
              </motion.span>
            </motion.div>
          </div>

          {/* Декоровані елементи */}
          <motion.div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-30px",
              width: "60px",
              height: "60px",
              border: "2px solid rgba(11, 107, 91, 0.3)",
              borderRadius: "50%",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          <motion.div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "-30px",
              width: "40px",
              height: "40px",
              border: "1px solid rgba(11, 107, 91, 0.2)",
              borderRadius: "50%",
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
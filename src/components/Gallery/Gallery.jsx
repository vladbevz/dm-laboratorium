import React, { useState, useRef, useEffect } from 'react';
import g1 from '../../assets/images/gallery-1.webp';
import g2 from '../../assets/images/gallery-2.webp';
import g3 from '../../assets/images/gallery-3.webp';
import g4 from '../../assets/images/gallery-4.webp';
import g5 from '../../assets/images/gallery-5.webp';
import g6 from '../../assets/images/gallery-6.webp';
import g7 from '../../assets/images/gallery-7.webp';
import g8 from '../../assets/images/gallery-8.webp';
import g9 from '../../assets/images/gallery-9.webp';
import g10 from '../../assets/images/gallery-10.webp';
import g11 from '../../assets/images/gallery-11.webp';
import g12 from '../../assets/images/gallery-12.webp';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.css';

export default function Gallery() {
  const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Відкриття модалки
  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Закриття модалки
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Наступне фото
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Попереднє фото
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Клавіатурні скорочення
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Drag для горизонтального скролу
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  // Очищення
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <section id="gallery" className={`${styles.section} ${styles.gallery}`}>
        <div className={styles.container}>
          {/* Заголовок секції */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Galeria prac</h2>
            <div className={styles.sectionDivider}></div>
            <p className={styles.sectionDescription}>
              Zobacz efekty naszej precyzyjnej pracy
            </p>
          </div>

          {/* Горизонтальна галерея зі скролом */}
          <div 
            className={styles.horizontalGallery}
            ref={galleryRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.galleryTrack}>
              {images.map((src, i) => (
                <div 
                  className={styles.galleryItem} 
                  key={i}
                  onClick={() => openModal(i)}
                >
                  <img 
                    src={src} 
                    alt={`Praca ${i + 1}`}
                    loading="lazy"
                  />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.viewText}>Zobacz</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Індикатор скролу */}
          <div className={styles.scrollHint}>
            <span className={styles.scrollText}>← Przeciągnij, aby zobaczyć więcej →</span>
          </div>
        </div>
      </section>

      {/* Спрощена модалка */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.simpleModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className={styles.modalImageContainer}>
              <img 
                src={images[currentIndex]} 
                alt={`Praca ${currentIndex + 1}`}
                className={styles.modalImage}
              />
            </div>

            <div className={styles.modalNavigation}>
              <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={prevImage}>
                <ChevronLeft size={32} />
              </button>
              <span className={styles.imageInfo}>
                {currentIndex + 1} / {images.length}
              </span>
              <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={nextImage}>
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
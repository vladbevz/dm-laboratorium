import React, { useState, useRef, useEffect, useCallback } from 'react';
import g1  from '../../assets/images/1_Projekt bez nazwy.webp';
import g2  from '../../assets/images/2_Projekt bez nazwy.webp';
import g3  from '../../assets/images/3_Projekt bez nazwy.webp';
import g4  from '../../assets/images/4_Projekt bez nazwy.webp';
import g5  from '../../assets/images/5_Projekt bez nazwy.webp';
import g6  from '../../assets/images/6_Projekt bez nazwy.webp';
import g7  from '../../assets/images/7_Projekt bez nazwy.webp';
import g8  from '../../assets/images/8_Projekt bez nazwy.webp';
import g9  from '../../assets/images/9_Projekt bez nazwy.webp';
import g10 from '../../assets/images/10_Projekt bez nazwy.webp';
import g11 from '../../assets/images/12_Projekt bez nazwy.webp';
import g12 from '../../assets/images/13_Projekt bez nazwy.webp';
import g13 from '../../assets/images/15_Projekt bez nazwy.webp';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.css';

const images = [
  { src: g1,  alt: 'Korona cyrkonowa CAD/CAM — D&M Laboratorium Słubice' },
  { src: g2,  alt: 'Most protetyczny na implantach — pracownia D&M Słubice' },
  { src: g3,  alt: 'Licówki porcelanowe — estetyczna protetyka D&M Laboratorium' },
  { src: g4,  alt: 'Korona pełnoceramiczna — precyzyjna praca protetyczna' },
  { src: g5,  alt: 'Proteza szkieletowa — D&M Laboratorium Słubice' },
  { src: g6,  alt: 'Uzupełnienie protetyczne CAD/CAM — D&M Laboratorium' },
  { src: g7,  alt: 'Korona na implancie — cyfrowa pracownia protetyczna Słubice' },
  { src: g8,  alt: 'Mosty cyrkonowe — nowoczesna protetyka D&M Laboratorium' },
  { src: g9,  alt: 'Proteza całkowita akrylowa — D&M Laboratorium Słubice' },
  { src: g10, alt: 'Licówka ceramiczna — estetyczne uzupełnienie protetyczne' },
  { src: g11, alt: 'Korony teleskopowe — precyzyjna protetyka D&M Słubice' },
  { src: g12, alt: 'Uzupełnienie implantoprotetyczne — D&M Laboratorium' },
  { src: g13, alt: 'Indywidualne łączniki implantologiczne — D&M Laboratorium Słubice' },
];

// How many images visible at once (approx)
const ITEMS_PER_PAGE = 3;
const ITEM_WIDTH = 336; // 320px + 16px gap

export default function Gallery() {
  const [trackOffset, setTrackOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const maxOffset = -(images.length - ITEMS_PER_PAGE) * ITEM_WIDTH;

  // Touch/drag
  const dragStart = useRef(null);
  const trackRef = useRef(null);

  const slideNext = useCallback(() => {
    setTrackOffset(prev => Math.max(prev - ITEM_WIDTH * ITEMS_PER_PAGE, maxOffset));
  }, [maxOffset]);

  const slidePrev = useCallback(() => {
    setTrackOffset(prev => Math.min(prev + ITEM_WIDTH * ITEMS_PER_PAGE, 0));
  }, []);

  const goToPage = (page) => {
    const newOffset = -page * ITEM_WIDTH * ITEMS_PER_PAGE;
    setTrackOffset(Math.max(Math.min(newOffset, 0), maxOffset));
  };

  const currentPage = Math.round(-trackOffset / (ITEM_WIDTH * ITEMS_PER_PAGE));
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

  // Modal controls
  const openModal = (i) => {
    setModalIndex(i);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  const modalNext = () => setModalIndex(prev => (prev + 1) % images.length);
  const modalPrev = () => setModalIndex(prev => (prev - 1 + images.length) % images.length);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (!modalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') modalNext();
      if (e.key === 'ArrowLeft') modalPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  // Touch support
  const handleTouchStart = (e) => { dragStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? slideNext() : slidePrev();
    dragStart.current = null;
  };

  return (
    <>
      <section id="gallery" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderLeft}>
              <div className={styles.sectionEyebrow}>Nasze realizacje</div>
              <h2 className={styles.sectionTitle}>
                Galeria <em>prac</em>
              </h2>
            </div>

            <div className={styles.galleryControls}>
              <button
                className={styles.arrowBtn}
                onClick={slidePrev}
                aria-label="Poprzednie"
                disabled={trackOffset === 0}
              >
                <ChevronLeft />
              </button>
              <button
                className={styles.arrowBtn}
                onClick={slideNext}
                aria-label="Następne"
                disabled={trackOffset <= maxOffset}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Track */}
          <div
            className={styles.galleryViewport}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className={styles.galleryTrack}
              style={{ transform: `translateX(${trackOffset}px)` }}
            >
              {images.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className={styles.galleryItem}
                  onClick={() => openModal(i)}
                >
                  <img src={src} alt={alt} loading="lazy" />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.viewLabel}>Zobacz</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className={styles.progressDots}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentPage ? styles.active : ''}`}
                onClick={() => goToPage(i)}
                aria-label={`Strona ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalInner} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <X size={16} />
            </button>

            <div className={styles.modalImageWrap}>
              <img
                src={images[modalIndex].src}
                alt={images[modalIndex].alt}
                className={styles.modalImage}
              />
            </div>

            <div className={styles.modalNav}>
              <button className={styles.modalNavBtn} onClick={modalPrev}>
                <ChevronLeft size={20} />
              </button>
              <span className={styles.modalCounter}>
                {modalIndex + 1} / {images.length}
              </span>
              <button className={styles.modalNavBtn} onClick={modalNext}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

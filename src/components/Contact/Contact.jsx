import React, { useState } from "react";
import { Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Валідація
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Proszę wypełnić wymagane pola (Imię i Telefon)'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mdkqlojp', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          _subject: `Nowa wiadomość od ${formData.name} - D&M Laboratorium`
        })
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą wkrótce.'
        });
        
        // Очистити форму
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Przepraszamy, wystąpił błąd. Proszę spróbować ponownie lub skontaktować się telefonicznie.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`${styles.section} ${styles.contact}`}>
      <div className={styles.container}>
        {/* Заголовок секції */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSubtitle}>Skontaktuj się z nami</span>
          <h2 className={styles.sectionTitle}>Kontakt</h2>
          <div className={styles.sectionDivider}></div>
          <p className={styles.sectionDescription}>
            Masz pytania? Chętnie na nie odpowiemy i omówimy szczegóły współpracy
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Лівий блок - контактна інформація */}
          <div className={styles.contactInfo}>
            <div className={styles.contactInfoCard}>
              <h3 className={styles.infoTitle}>Dane kontaktowe</h3>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Phone size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Telefon</span>
                  <a href="tel:+48577861595" className={styles.contactValue}>
                    +48 577 861 595
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:laboratorium@dm-lab.pl" className={styles.contactValue}>
                    laboratorium@dm-lab.pl
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <MapPin size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Adres</span>
                  <address className={styles.contactValue}>
                    Wojska Polskiego 148/1<br />
                    Słubice, 69-100<br />
                    Polska
                  </address>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Instagram size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Instagram</span>
                  <a
                    href="https://www.instagram.com/d_m_labolatorium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.contactValue} ${styles.socialLink}`}
                  >
                    @d_m_labolatorium
                    <span className={styles.linkArrow}>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Центральний блок - форма */}
          <div className={styles.contactFormWrapper}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Wyślij wiadomość</h3>
              <p className={styles.formSubtitle}>Odpowiemy najszybciej jak to możliwe</p>

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Imię i nazwisko *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Jan Kowalski"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      Telefon *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.formInput}
                      placeholder="+48 123 456 789"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.formInput}
                      placeholder="jan@example.com"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.formTextarea}
                    placeholder="Opisz swoją sprawę..."
                    rows="5"
                  />
                </div>

                <div className={styles.formFooter}>
                  <p className={styles.formNote}>
                    * Pola wymagane
                  </p>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.btnLoading}>Wysyłanie...</span>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Wyślij wiadomość</span>
                      </>
                    )}
                  </button>
                </div>

                {submitStatus.message && (
                  <div className={`${styles.formResult} ${submitStatus.type === 'success' ? styles.success : styles.error}`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Правий блок - мапа */}
          <div className={styles.contactMap}>
            <div className={styles.mapCard}>
              <h3 className={styles.mapTitle}>Lokalizacja</h3>
              <div className={styles.mapWrapper}>
                <iframe
                  title="Lokalizacja D&M Laboratorium w Słubicach"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2467.1430353793254!2d14.5538353!3d52.3480093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e3c72b9f9c3%3A0xc3ab4ecf4fdfb8ff!2sWojska%20Polskiego%20148%2C%2069-100%20S%C5%82ubice!5e0!3m2!1spl!2spl!4v1700000000000"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className={styles.mapInfo}>
                <p className={styles.mapNote}>
                  Znajdujemy się w centrum Słubic, z łatwym dojazdem i parkingiem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useRef } from 'react';
import { Instagram, Mail, Phone, MapPin, Send, Paperclip, X } from 'lucide-react';
import styles from './Contact.module.css';

const STRINGS = {
  pl: {
    eyebrow: 'Wyślij przypadek do konsultacji',
    title: <>Nawiążmy <em>współpracę</em></>,
    description: 'Opisz przypadek, załącz skan lub zdjęcia — odpowiemy z propozycją rozwiązania i terminem realizacji.',
    infoTitle: 'Dane kontaktowe',
    labels: { phone: 'Telefon', email: 'Email', address: 'Adres', instagram: 'Instagram' },
    addressValue: <>Wojska Polskiego 148/1<br />Słubice, 69-100, Polska</>,
    formTitle: 'Wyślij przypadek',
    formSubtitle: 'Odpowiemy najszybciej jak to możliwe',
    nameLabel: 'Imię i nazwisko *',
    namePlaceholder: 'Jan Kowalski',
    phoneLabel: 'Telefon *',
    phonePlaceholder: '+48 123 456 789',
    emailLabel: 'Email',
    emailPlaceholder: 'jan@example.com',
    messageLabel: 'Opis przypadku',
    messagePlaceholder: 'Rodzaj pracy, materiał, planowany termin...',
    fileLabel: 'Załączniki',
    fileEmpty: 'Załącz dokumenty lub zdjęcia',
    fileMore: 'Dodaj kolejne pliki',
    fileRemove: 'Usuń plik',
    fileHint: 'PDF, DOC, JPG, PNG, STL — maks. 10 MB',
    requiredNote: '* Pola wymagane',
    sending: 'Wysyłanie',
    send: 'Wyślij',
    validationError: 'Proszę wypełnić wymagane pola (Imię i Telefon)',
    genericError: 'Wystąpił błąd. Proszę spróbować ponownie lub zadzwonić.',
    successMessage: 'Dziękujemy! Wiadomość wysłana. Sprawdź skrzynkę email — wysłaliśmy potwierdzenie.',
    mapTitle: 'Lokalizacja',
    mapNote: <>Znajdujemy się w centrum Słubic,<br />z łatwym dojazdem i parkingiem.</>,
  },
  de: {
    eyebrow: 'Fall zur Beratung senden',
    title: <>Lassen Sie uns <em>zusammenarbeiten</em></>,
    description: 'Beschreiben Sie den Fall und fügen Sie Scan oder Fotos bei — wir melden uns mit einem Lösungsvorschlag und Liefertermin.',
    infoTitle: 'Kontaktdaten',
    labels: { phone: 'Telefon', email: 'E-Mail', address: 'Adresse', instagram: 'Instagram' },
    addressValue: <>Wojska Polskiego 148/1<br />Słubice, 69-100, Polen</>,
    formTitle: 'Fall einsenden',
    formSubtitle: 'Wir antworten so schnell wie möglich',
    nameLabel: 'Name *',
    namePlaceholder: 'Max Mustermann',
    phoneLabel: 'Telefon *',
    phonePlaceholder: '+49 170 1234567',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'max@beispiel.de',
    messageLabel: 'Fallbeschreibung',
    messagePlaceholder: 'Art der Arbeit, Material, gewünschter Termin...',
    fileLabel: 'Anhänge',
    fileEmpty: 'Dokumente oder Fotos anhängen',
    fileMore: 'Weitere Dateien hinzufügen',
    fileRemove: 'Datei entfernen',
    fileHint: 'PDF, DOC, JPG, PNG, STL — max. 10 MB',
    requiredNote: '* Pflichtfelder',
    sending: 'Wird gesendet',
    send: 'Senden',
    validationError: 'Bitte füllen Sie die Pflichtfelder aus (Name und Telefon)',
    genericError: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
    successMessage: 'Vielen Dank! Ihre Nachricht wurde gesendet. Bitte prüfen Sie Ihr E-Mail-Postfach — wir haben eine Bestätigung gesendet.',
    mapTitle: 'Standort',
    mapNote: <>Wir befinden uns im Zentrum von Słubice,<br />mit guter Erreichbarkeit und Parkmöglichkeiten.</>,
  },
};

export default function Contact({ lang = 'pl' }) {
  const t = STRINGS[lang] ?? STRINGS.pl;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve({ name: file.name, content: reader.result.split(',')[1] });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitStatus({ type: 'error', message: t.validationError });
      setIsSubmitting(false);
      return;
    }

    try {
      const attachments = await Promise.all(files.map(fileToBase64));

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          attachments,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: t.successMessage,
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
        setFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed');
      }
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        message: err.message?.includes('MB')
          ? err.message
          : t.genericError,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{t.eyebrow}</div>
          <h2 className={styles.sectionTitle}>
            {t.title}
          </h2>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionDescription}>
            {t.description}
          </p>
        </div>

        <div className={styles.contactGrid}>

          {/* ── INFO ── */}
          <div className={styles.contactInfoCard}>
            <h3 className={styles.infoTitle}>{t.infoTitle}</h3>

            {[
              { icon: <Phone size={18} />, label: t.labels.phone, content: <a href="tel:+48577861595" className={styles.contactValue}>+48 577 861 595</a> },
              { icon: <Mail size={18} />, label: t.labels.email, content: <a href="mailto:dm.laboratorium.pl@gmail.com" className={styles.contactValue}>dm.laboratorium.pl@gmail.com</a> },
              {
                icon: <MapPin size={18} />,
                label: t.labels.address,
                content: (
                  <address className={styles.contactValue}>
                    {t.addressValue}
                  </address>
                )
              },
              {
                icon: <Instagram size={18} />,
                label: t.labels.instagram,
                content: (
                  <a
                    href="https://www.instagram.com/d_m_laboratorium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.contactValue} ${styles.socialLink}`}
                  >
                    @d_m_labolatorium
                    <span className={styles.linkArrow}>→</span>
                  </a>
                )
              },
            ].map(({ icon, label, content }) => (
              <div key={label} className={styles.contactItem}>
                <div className={styles.contactIcon}>{icon}</div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>{label}</span>
                  {content}
                </div>
              </div>
            ))}
          </div>

          {/* ── FORM ── */}
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>{t.formTitle}</h3>
            <p className={styles.formSubtitle}>{t.formSubtitle}</p>

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>{t.nameLabel}</label>
                <input
                  id="name" name="name" type="text" required
                  value={formData.name} onChange={handleChange}
                  className={styles.formInput} placeholder={t.namePlaceholder}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>{t.phoneLabel}</label>
                  <input
                    id="phone" name="phone" type="tel" required
                    value={formData.phone} onChange={handleChange}
                    className={styles.formInput} placeholder={t.phonePlaceholder}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>{t.emailLabel}</label>
                  <input
                    id="email" name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    className={styles.formInput} placeholder={t.emailPlaceholder}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>{t.messageLabel}</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder={t.messagePlaceholder}
                  rows="4"
                />
              </div>

              {/* File attachment */}
              <div className={styles.fileUploadGroup}>
                <label className={styles.fileUploadLabel}>{t.fileLabel}</label>
                <div className={styles.fileInputWrapper}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.stl,.zip"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                  <div className={styles.fileInputDisplay}>
                    <Paperclip size={16} className={styles.fileIcon} />
                    <span className={styles.fileText}>
                      {files.length === 0 ? t.fileEmpty : t.fileMore}
                    </span>
                  </div>
                </div>
                {files.length > 0 && (
                  <ul className={styles.fileList}>
                    {files.map((file, i) => (
                      <li key={i} className={styles.fileListItem}>
                        <Paperclip size={12} className={styles.fileListIcon} />
                        <span className={styles.fileListName}>{file.name}</span>
                        <button
                          type="button"
                          className={styles.fileRemoveBtn}
                          onClick={() => removeFile(i)}
                          aria-label={t.fileRemove}
                        >
                          <X size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <span className={styles.fileHint}>{t.fileHint}</span>
              </div>

              <div className={styles.formFooter}>
                <p className={styles.formNote}>{t.requiredNote}</p>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting
                    ? <span className={styles.btnLoading}>{t.sending}</span>
                    : <><Send size={14} /><span>{t.send}</span></>
                  }
                </button>
              </div>

              {submitStatus.message && (
                <div className={`${styles.formResult} ${styles[submitStatus.type]}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* ── MAP ── */}
          <div className={styles.mapCard}>
            <h3 className={styles.mapTitle}>{t.mapTitle}</h3>
            <div className={styles.mapWrapper}>
              <iframe
                title="D&M Laboratorium"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2467.1430353793254!2d14.5538353!3d52.3480093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e3c72b9f9c3%3A0xc3ab4ecf4fdfb8ff!2sWojska%20Polskiego%20148%2C%2069-100%20S%C5%82ubice!5e0!3m2!1spl!2spl!4v1700000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className={styles.mapNote}>
              {t.mapNote}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

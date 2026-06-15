import React, { useEffect } from 'react';
import PageLayout from '../components/Layout/PageLayout.jsx';
import styles from './PrivacyPage.module.css';

export default function PrivacyPage() {
  useEffect(() => { document.title = 'Polityka Prywatności | D&M Laboratorium'; }, []);
  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Polityka Prywatności</h1>
          <p className={styles.updated}>Ostatnia aktualizacja: czerwiec 2025</p>

          <section className={styles.section}>
            <h2>1. Administrator Danych Osobowych</h2>
            <p>
              Administratorem Twoich danych osobowych jest D&amp;M Laboratorium,
              z siedzibą przy ul. Wojska Polskiego 148/1, 69-100 Słubice, Polska.
            </p>
            <p>
              NIP: <span className={styles.placeholder}>5981661943</span> &nbsp;|&nbsp;
              REGON: <span className={styles.placeholder}>[REGON]</span>
            </p>
            <p>
              Kontakt w sprawach ochrony danych osobowych:<br />
              E-mail: <a href="mailto:dm.laboratorium.pl@gmail.com">dm.laboratorium.pl@gmail.com</a><br />
              Telefon: <a href="tel:+48577861595">+48 577 861 595</a>
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Cele i podstawy prawne przetwarzania danych</h2>
            <p>Przetwarzamy Twoje dane osobowe w następujących celach:</p>
            <ul>
              <li>
                <strong>Obsługa zapytań przez formularz kontaktowy</strong> — na podstawie art. 6 ust. 1 lit. b i f RODO
                (niezbędność do podjęcia działań na żądanie osoby, której dane dotyczą, oraz prawnie uzasadniony interes administratora).
                Dane przechowywane są przez okres niezbędny do udzielenia odpowiedzi, nie dłużej niż 12 miesięcy.
              </li>
              <li>
                <strong>Realizacja umów i współpracy</strong> — na podstawie art. 6 ust. 1 lit. b RODO
                (wykonanie umowy, której stroną jest osoba, której dane dotyczą).
                Dane przechowywane są przez czas trwania umowy oraz 5 lat od jej zakończenia (wymogi podatkowe i rachunkowe).
              </li>
              <li>
                <strong>Marketing i informacje o usługach</strong> — wyłącznie na podstawie dobrowolnej zgody (art. 6 ust. 1 lit. a RODO).
                Zgodę można wycofać w dowolnym momencie bez wpływu na zgodność przetwarzania sprzed wycofania.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Odbiorcy danych</h2>
            <p>Twoje dane mogą być przekazywane następującym kategoriom odbiorców:</p>
            <ul>
              <li>Dostawcy usług hostingowych i IT obsługujący stronę internetową</li>
              <li>Google LLC — w związku z korzystaniem z usług Google Maps i Google Analytics (szczegóły w sekcji Pliki cookies)</li>
              <li>Dostawcy usług pocztowych umożliwiających obsługę formularza kontaktowego</li>
            </ul>
            <p>
              Dane nie są sprzedawane ani udostępniane podmiotom trzecim w celach komercyjnych.
              W przypadku przekazania danych do państw spoza Europejskiego Obszaru Gospodarczego (np. USA przez usługi Google),
              odbywa się to na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Prawa osób, których dane dotyczą</h2>
            <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
            <ul>
              <li><strong>Prawo dostępu</strong> — możesz uzyskać informację o przetwarzanych danych oraz kopię danych</li>
              <li><strong>Prawo do sprostowania</strong> — możesz żądać poprawienia nieprawidłowych danych</li>
              <li><strong>Prawo do usunięcia</strong> — możesz żądać usunięcia danych w określonych przypadkach</li>
              <li><strong>Prawo do ograniczenia przetwarzania</strong> — możesz żądać ograniczenia przetwarzania danych</li>
              <li><strong>Prawo do przenoszenia danych</strong> — możesz otrzymać swoje dane w ustrukturyzowanym formacie</li>
              <li><strong>Prawo sprzeciwu</strong> — możesz wnieść sprzeciw wobec przetwarzania opartego na prawnie uzasadnionym interesie</li>
              <li><strong>Prawo do wycofania zgody</strong> — w każdej chwili, bez wpływu na wcześniejsze przetwarzanie</li>
            </ul>
            <p>
              Aby skorzystać z powyższych praw, skontaktuj się z nami mailowo na adres{' '}
              <a href="mailto:dm.laboratorium.pl@gmail.com">dm.laboratorium.pl@gmail.com</a>.
              Odpowiemy w terminie 30 dni.
            </p>
            <p>
              Masz również prawo wniesienia skargi do organu nadzorczego —
              Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa,
              strona: <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer">uodo.gov.pl</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Pliki cookies</h2>
            <p>
              Nasza strona internetowa korzysta z plików cookies (ciasteczek) — małych plików tekstowych
              zapisywanych na Twoim urządzeniu. Poniżej opisujemy rodzaje stosowanych cookies.
            </p>

            <h3>Cookies niezbędne</h3>
            <p>
              Są wymagane do prawidłowego działania strony (np. zapamiętanie zgody na cookies).
              Nie wymagają Twojej zgody i nie mogą być wyłączone.
            </p>

            <h3>Google Maps</h3>
            <p>
              Na stronie kontaktowej osadzamy mapę Google Maps (Google LLC, 1600 Amphitheatre Pkwy,
              Mountain View, CA 94043, USA). Usługa ta może ustawiać własne pliki cookies i przetwarzać
              dane zgodnie z{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Polityką Prywatności Google
              </a>. Mapa ładowana jest wyłącznie po wyrażeniu zgody.
            </p>

            <h3>Google Analytics</h3>
            <p>
              Korzystamy z Google Analytics w celu analizy ruchu na stronie (liczba odwiedzin, źródła ruchu,
              zachowanie użytkowników). Dane są anonimizowane i agregowane. Pliki cookies Analytics
              przechowywane są przez maksymalnie 26 miesięcy. Możesz zrezygnować z Analytics instalując
              wtyczkę:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out
              </a>.
            </p>

            <h3>Zarządzanie cookies</h3>
            <p>
              Możesz zarządzać swoimi preferencjami dotyczącymi cookies w każdej chwili poprzez:
            </p>
            <ul>
              <li>Ustawienia przeglądarki internetowej (zablokowanie lub usunięcie cookies)</li>
              <li>Kliknięcie przycisku „Ustawienia cookies" w banerze cookies</li>
            </ul>
            <p>
              Wyłączenie cookies niezbędnych może uniemożliwić prawidłowe działanie strony.
              Wyłączenie cookies analitycznych nie wpłynie na funkcjonalność strony.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Bezpieczeństwo danych</h2>
            <p>
              Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych
              przed nieuprawnionym dostępem, utratą lub zniszczeniem, w tym szyfrowanie połączeń (HTTPS).
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Zmiany Polityki Prywatności</h2>
            <p>
              Zastrzegamy prawo do zmiany niniejszej Polityki Prywatności. O wszelkich istotnych zmianach
              poinformujemy poprzez aktualizację daty na górze strony. Zachęcamy do regularnego
              zapoznawania się z treścią Polityki.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

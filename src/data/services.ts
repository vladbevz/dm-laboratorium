export interface ServiceCategory {
  slug: string;
  title: string;
  items: string[];
}

export const services: ServiceCategory[] = [
  {
    slug: "ceramika",
    title: "CERAMIKA",
    items: [
      "Korony pełnoceramiczne",
      "Inlay / Onlay / Overlay E.max",
      "Most Maryland cyrkonowy",
      "Korona licowana na podbudowie metalowej",
      "Korona licowana na podbudowie cyrkonowej",
      "Indywidualna charakteryzacja",
      "Zmiana koloru",
      "Gingiva"
    ]
  },
  {
    slug: "implantoprotetyka",
    title: "IMPLANTOPROTETYKA",
    items: [
      "Korony pełnoceramiczne na implantach",
      "Korony tymczasowe PMMA na implantach",
      "Mosty pełnoceramiczne na implantach",
      "Prace pełnołukowe All-on-X",
      "Odbudowy na multiunitach"
    ]
  },
  {
    slug: "korony-mosty-tymczasowe",
    title: "KORONY I MOSTY TYMCZASOWE PMMA",
    items: [
      "Korony tymczasowe na zębach własnych",
      "Korony tymczasowe na implantach"
    ]
  },
  {
    slug: "protezy",
    title: "PROTEZY",
    items: [
      "Protezy całkowite akrylowe",
      "Protezy całkowite charakteryzowane",
      "Protezy tymczasowe",
      "Protezy częściowe osiadające"
    ]
  },
  {
    slug: "protezy-na-implantach",
    title: "PROTEZY NA IMPLANTACH",
    items: [
      "Protezy na lokatorach",
      "Protezy na belce",
      "Protezy overdenture",
      "Rozwiązania indywidualne"
    ]
  },
  {
    slug: "protezy-szkieletowe",
    title: "PROTEZY SZKIELETOWE I KOMBINOWANE",
    items: [
      "Protezy szkieletowe",
      "Prace kombinowane",
      "Belki frezowane"
    ]
  },
  {
    slug: "cad-cam",
    title: "CYFROWE PLANOWANIE CAD/CAM",
    items: [
      "Digital Smile Design (DSD)",
      "Wax-up cyfrowy",
      "Projektowanie CAD"
    ]
  },
  {
    slug: "szyny",
    title: "SZYNY",
    items: [
      "Szyny relaksacyjne",
      "Szyny wybielające",
      "Szyny pod mock-up",
      "Szyny retencyjne"
    ]
  },
  {
    slug: "elementy-dodatkowe",
    title: "ELEMENTY DODATKOWE",
    items: [
      "Łyżki indywidualne",
      "Wzorniki",
      "Dobór koloru w gabinecie",
      "Modele gipsowe",
      "Modele drukowane 3D"
    ]
  },
  {
    slug: "naprawa-protez",
    title: "NAPRAWA PROTEZ",
    items: [
      "Polerowanie i czyszczenie protezy",
      "Dostawienie elementu do protezy (ząb/klamra) + każdy następny element",
      "Naprawa protezy (złamanej/pękniętej)",
      "Podścielenie protezy akrylowej",
      "Rebazacja płyty"
    ]
  }
];

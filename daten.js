/* Medi-NW-Check – daten.js
   Wirkstoffe, okuläre Nebenwirkungen und Belege. Bei Updates wird nur diese Datei (und synonyme.js) ersetzt.
   GRUNDSATZ: Jede medizinische Aussage stammt aus einer tatsächlich aufgerufenen, frei zugänglichen Quelle.
   Fehlende Angaben = null (Anzeige „nicht angegeben“). Angezeigt werden nur Belege/Einträge mit status "geprueft".
   Zitate: kurze Belegstellen, „wörtlich laut Abruf“ (Abruf über ein Textwerkzeug; per Link gegenprüfbar).
   Quellenart: A Fachinformation/Label · B regulatorische Sicherheitsinformation · C Pharmakovigilanzdaten · D Literatur · E Sekundärquelle.
   Einordnung: nebenwirkung · grunderkrankung · wechselwirkung · pv_signal · hypothese.
   AUFBAU (bei Updates unverändert beibehalten):
   META       – app, version (dieselbe wie in synonyme.js), recherchestand (JJJJ-MM-TT), etappe, pruefregel, aenderungsprotokoll[], offene_punkte[]
   QUELLEN    – Schlüssel Q_…: art (A–E), raum (DE | EU | USA | INT), titel, hersteller, dokumentstand, url, abgerufen (JJJJ-MM-TT),
                zugang ("frei" | "nicht lesbar"), optional pmid, doi, studientyp, hinweis
   WIRKSTOFFE – id, inn_de, inn_en, synonyme[], kategorie ("systemisch" | "lokal_auge"), applikation[], klassen[] und anwendungsgebiete[] (IDs aus synonyme.js),
                handelsnamen_de[], handelsnamen_us[], zulassung_eu, etappe, status ("geprueft" | "geplant"),
                pruefstand[] {quelle, raum, umfang, geprueft_am, ergebnis}, nicht_aufgenommen[] {text, quelle, grund}, adrreports {code | buchstabe}, hinweis
   EINTRAEGE  – id, wirkstoff (bei einordnung "grunderkrankung": null und zusätzlich anwendungsgebiet), befund (ID aus synonyme.js), einordnung,
                ww_partner[] (nur bei Wechselwirkung), kontext, unterschied_notiz,
                belege[] {quelle, typ, abschnitt, aussage, zitat, haeufigkeit, latenz, dosisabhaengigkeit, reversibilitaet, dringlichkeit, kontrollen,
                          status ("geprueft" | "offen"), geprueft_am, pruefnotiz} */
window.MNW_DATEN = {

  META: {
    app: "Medi-NW-Check",
    version: "1.0.0",
    recherchestand: "2026-10-04",
    etappe: "1a – Netzhaut/Makula (Hydroxychloroquin, Chloroquin, Pentosanpolysulfat, Tamoxifen, MEK- und BRAF-Inhibitoren, S1P-Modulatoren)",
    pruefregel: "Ein Beleg gilt als geprüft, wenn die frei zugängliche Quelle aufgerufen und die Aussage in zwei Abfragen übereinstimmend gefunden wurde.",
    aenderungsprotokoll: [
      { version: "1.0.0", datum: "2026-10-04", aenderungen: [
        "Erste Fassung (Etappe 1a): 16 Wirkstoffe geprüft (Hydroxychloroquin, Chloroquin, Pentosanpolysulfat, Tamoxifen, Trametinib, Binimetinib, Cobimetinib, Selumetinib, Mirdametinib, Dabrafenib, Encorafenib, Vemurafenib, Fingolimod, Siponimod, Ozanimod, Ponesimod).",
        "Übrige Wirkstoffe der Startliste und Klassenverwandte als „geplant“ erfasst (Etappe 1b/1c) – noch ohne Einträge.",
        "Begriffsliste: 11 Regionen, Grundbestand an Befunden, Wirkstoffklassen und Anwendungsgebieten.",
        "Unabhängige Stichprobenprüfung vor der Übergabe: aus jeder der 34 frei lesbaren Quellen ein Zitat erneut aufgerufen – 33 unverändert bestätigt, 1 unvollständig (Selumetinib EU) und korrigiert; ergänzt: „bei empfohlener Dosis“ (AAO 2016), Placebo-Wert (Fingolimod US), Fallzahl (Ozanimod Colitis ulcerosa), Abschnittsnummer 5.4 (Binimetinib US)."
      ] }
    ],
    offene_punkte: [
      "Hydroxychloroquin: Originator-Fachinformation (Quensyl) nur mit Login abrufbar – geprüft wurde die Generika-Fachinformation (Heumann, Stand 03/2026).",
      "Hydroxychloroquin: Häufigkeitskategorien der 4.8-Tabelle waren im Abruf nicht sicher den Einträgen zuzuordnen (Spalten gingen verloren).",
      "Chloroquin: keine frei zugängliche deutsche Fachinformation gefunden; Daten aus US-Label und AAO-Empfehlung.",
      "Literatur: PubMed war ab 04.10.2026 ca. 22:35 Uhr für das Abrufwerkzeug per CAPTCHA gesperrt. Geprüft ist bisher nur die AAO-Empfehlung 2016; weitere Arbeiten (u. a. AAO-Revision 2025, MEK-Inhibitor-Retinopathie, PPS-Makulopathie, Fingolimod-Makulaödem) sind als „offen“ hinterlegt.",
      "EMA-Produktinformationen: Ein Dokumentdatum ist in der PDF nicht angegeben; das Aktualisierungsdatum der EPAR-Seite ist bisher nur für Elmiron erfasst.",
      "ADRreports: Direktlinks für Chloroquin, Cobimetinib, Ponesimod und Mirdametinib fehlen (Wirkstoffliste im Abruf abgeschnitten) – dort Link auf die Buchstabenliste.",
      "Rote-Hand-Brief Elmiron (BfArM, Juli 2019): Seite für das Abrufwerkzeug nicht lesbar; Inhalt über das gleichlautende Sicherheitsschreiben des BASG (Österreich) belegt.",
      "openFDA war zeitweise gedrosselt (HTTP 429); US-Labels wurden zusätzlich über DailyMed geprüft."
    ]
  },

  /* ===================== QUELLEN ===================== */
  QUELLEN: {
    /* --- Hydroxychloroquin --- */
    Q_HCQ_DE_HEUMANN: { art: "A", raum: "DE", titel: "Fachinformation Hydroxychloroquin Heumann 200 mg Filmtabletten",
      hersteller: "HEUMANN PHARMA GmbH & Co. Generica KG", dokumentstand: "Stand der Information 03/2026",
      url: "https://www.heumann.de/fileadmin/user_upload/produkte/infos/Hydroxychloroquin_Heumann_200_mg_Filmtabletten.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_HCQ_US_PLAQUENIL: { art: "A", raum: "USA", titel: "Plaquenil (hydroxychloroquine sulfate) – US Prescribing Information",
      hersteller: "Advanz Pharma (US) Corp.", dokumentstand: "SPL-Version 15 (effective time 09.04.2026)",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=34496b43-05a2-45fb-a769-52b12e099341", abgerufen: "2026-10-04", zugang: "frei" },
    /* --- Chloroquin --- */
    Q_CQ_US_RISING: { art: "A", raum: "USA", titel: "Chloroquine Phosphate Tablets – US-Label",
      hersteller: "Rising Pharma Holdings, Inc.", dokumentstand: "SPL-Version 7 (effective time 02.07.2026)",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=06c69e2b-211b-4746-9f3a-f86d36520570", abgerufen: "2026-10-04", zugang: "frei" },
    /* --- Pentosanpolysulfat --- */
    Q_PPS_EU_ELMIRON: { art: "A", raum: "EU", titel: "Elmiron (Pentosanpolysulfat-Natrium) – EU-Produktinformation, deutsche Fassung",
      hersteller: "bene-Arzneimittel GmbH", dokumentstand: "EPAR-Produktinformation, zuletzt aktualisiert 04.08.2026 (laut EPAR-Seite)",
      url: "https://www.ema.europa.eu/de/documents/product-information/elmiron-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_PPS_US_ELMIRON: { art: "A", raum: "USA", titel: "Elmiron (pentosan polysulfate sodium) – US-Label",
      hersteller: "Janssen Pharmaceuticals, Inc.", dokumentstand: "SPL-Version 16 (effective time 18.09.2024)",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f0ba651e-3d8a-11df-8fbe-119855d89593", abgerufen: "2026-10-04", zugang: "frei" },
    Q_PPS_B_PSUSA: { art: "B", raum: "EU", titel: "EMA/PRAC – Wissenschaftliche Schlussfolgerungen zur PSUSA Pentosanpolysulfat-Natrium (EMEA/H/C/PSUSA/00010614/201812)",
      hersteller: null, dokumentstand: "Dokument vom 27.06.2019",
      url: "https://www.ema.europa.eu/en/documents/scientific-conclusion/elmiron-h-c-psusa-00010614-201812-epar-scientific-conclusions-grounds-variation-terms-marketing-authorisation_en.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_PPS_B_DHPC_AT: { art: "B", raum: "EU", titel: "Sicherheitsschreiben (DHPC) Elmiron – pigmentäre Makulopathie, veröffentlicht vom BASG (Österreich)",
      hersteller: "Zulassungsinhaber bene; Veröffentlichung BASG", dokumentstand: "23.07.2019",
      url: "https://www.basg.gv.at/fileadmin/redakteure/06_Gesundheitsberufe/DHPC/2019/190723_elmiron.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_PPS_B_RHB_DE: { art: "B", raum: "DE", titel: "Rote-Hand-Brief zu Elmiron (Pentosanpolysulfat-Natrium): Risiko von pigmentärer Makulopathie (BfArM)",
      hersteller: "bene-Arzneimittel GmbH", dokumentstand: "Juli 2019",
      url: "https://www.bfarm.de/SharedDocs/Risikoinformationen/Pharmakovigilanz/DE/RHB/2019/rhb-elmiron.html", abgerufen: "2026-10-04", zugang: "nicht lesbar",
      hinweis: "Seite erreichbar, Brieftext für das Abrufwerkzeug nicht lesbar." },
    /* --- Tamoxifen --- */
    Q_TAM_DE_HEUMANN: { art: "A", raum: "DE", titel: "Fachinformation Tamoxifen Heumann 20 mg Tabletten",
      hersteller: "HEUMANN PHARMA GmbH & Co. Generica KG", dokumentstand: "Stand der Information 05/2026",
      url: "https://www.heumann.de/fileadmin/user_upload/produkte/infos/tamoxifen-heumann-tab_2022-06.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_TAM_US_SOLTAMOX: { art: "A", raum: "USA", titel: "Soltamox (tamoxifen citrate) oral solution – US Prescribing Information",
      hersteller: "Mayne Pharma", dokumentstand: "SPL-Version 2 (veröffentlicht 01.12.2021)",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1e6ff055-590c-41e6-9530-1fdf04cdbd02", abgerufen: "2026-10-04", zugang: "frei" },
    /* --- MEK-Inhibitoren --- */
    Q_TRAM_EU: { art: "A", raum: "EU", titel: "Mekinist (Trametinib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/mekinist-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_TRAM_US: { art: "A", raum: "USA", titel: "Mekinist (trametinib) – US Prescribing Information", hersteller: "Novartis Pharmaceuticals Corporation",
      dokumentstand: "Revised 5/2026", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0002ad27-779d-42ab-83b5-bc65453412a1", abgerufen: "2026-10-04", zugang: "frei" },
    Q_BINI_EU: { art: "A", raum: "EU", titel: "Mektovi (Binimetinib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/mektovi-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_BINI_US: { art: "A", raum: "USA", titel: "Mektovi (binimetinib) – US Prescribing Information", hersteller: "Array BioPharma Inc.",
      dokumentstand: "Revised 3/2025", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6c3408ac-d401-4925-8a03-26591afbc240", abgerufen: "2026-10-04", zugang: "frei" },
    Q_COBI_EU: { art: "A", raum: "EU", titel: "Cotellic (Cobimetinib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/cotellic-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_COBI_US: { art: "A", raum: "USA", titel: "Cotellic (cobimetinib) – US Prescribing Information", hersteller: "Genentech, Inc.",
      dokumentstand: "Revised 7/2026", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c387579e-cee0-4334-bd1e-73f93ac1bde6", abgerufen: "2026-10-04", zugang: "frei" },
    Q_SELU_EU: { art: "A", raum: "EU", titel: "Koselugo (Selumetinib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/koselugo-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_SELU_US: { art: "A", raum: "USA", titel: "Koselugo (selumetinib) – US Prescribing Information", hersteller: "AstraZeneca Pharmaceuticals LP",
      dokumentstand: "Revised 5/2026", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d042c61-f28f-4ab5-ab10-d7558c0d49ff", abgerufen: "2026-10-04", zugang: "frei" },
    Q_MIRD_EU: { art: "A", raum: "EU", titel: "Ezmekly (Mirdametinib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/ezmekly-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_MIRD_US: { art: "A", raum: "USA", titel: "Gomekli (mirdametinib) – US Prescribing Information", hersteller: "SpringWorks Therapeutics, Inc.",
      dokumentstand: "Revised 2/2025", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c41bf90-5fa7-4935-a95c-e047ea6bbf8e", abgerufen: "2026-10-04", zugang: "frei" },
    /* --- BRAF-Inhibitoren --- */
    Q_DAB_EU: { art: "A", raum: "EU", titel: "Tafinlar (Dabrafenib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/tafinlar-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_DAB_US: { art: "A", raum: "USA", titel: "Tafinlar (dabrafenib) – US Prescribing Information", hersteller: "Novartis Pharmaceuticals Corporation",
      dokumentstand: "Revised 3/2026", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea", abgerufen: "2026-10-04", zugang: "frei" },
    Q_ENCO_EU: { art: "A", raum: "EU", titel: "Braftovi (Encorafenib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/braftovi-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_ENCO_US: { art: "A", raum: "USA", titel: "Braftovi (encorafenib) – US Prescribing Information", hersteller: "Array BioPharma Inc.",
      dokumentstand: "Revised 2/2026", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=235dfc38-0f0b-4037-b501-7a9f4294740c", abgerufen: "2026-10-04", zugang: "frei" },
    Q_VEM_EU: { art: "A", raum: "EU", titel: "Zelboraf (Vemurafenib) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/zelboraf-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_VEM_US: { art: "A", raum: "USA", titel: "Zelboraf (vemurafenib) – US Prescribing Information", hersteller: "Genentech, Inc.",
      dokumentstand: "Revised 7/2026", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38eea320-7e0c-485a-bc30-98c3c45e2763", abgerufen: "2026-10-04", zugang: "frei" },
    /* --- S1P-Rezeptor-Modulatoren --- */
    Q_FING_EU: { art: "A", raum: "EU", titel: "Gilenya (Fingolimod) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/gilenya-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_FING_US: { art: "A", raum: "USA", titel: "Gilenya (fingolimod) – US Prescribing Information", hersteller: "Novartis Pharmaceuticals Corporation",
      dokumentstand: "Revised 8/2025", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc9e1c8c-0e2b-44e2-878b-27057f786be9", abgerufen: "2026-10-04", zugang: "frei" },
    Q_SIPO_EU: { art: "A", raum: "EU", titel: "Mayzent (Siponimod) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/mayzent-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_SIPO_US: { art: "A", raum: "USA", titel: "Mayzent (siponimod) – US Prescribing Information", hersteller: "Novartis Pharmaceuticals Corporation",
      dokumentstand: "Revised 6/2026", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=44492772-5aed-4627-bd85-e8e89f308bb3", abgerufen: "2026-10-04", zugang: "frei" },
    Q_OZAN_EU: { art: "A", raum: "EU", titel: "Zeposia (Ozanimod) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/zeposia-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_OZAN_US: { art: "A", raum: "USA", titel: "Zeposia (ozanimod) – US Prescribing Information", hersteller: "Celgene Corporation",
      dokumentstand: "Revised 8/2024", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=93ce2fab-edfb-4804-8074-963071de51e4", abgerufen: "2026-10-04", zugang: "frei" },
    Q_PONE_EU: { art: "A", raum: "EU", titel: "Ponvory (Ponesimod) – EU-Produktinformation, deutsche Fassung", hersteller: null,
      dokumentstand: "aktuelle EMA-Fassung (Datum im Dokument nicht angegeben)",
      url: "https://www.ema.europa.eu/de/documents/product-information/ponvory-epar-product-information_de.pdf", abgerufen: "2026-10-04", zugang: "frei" },
    Q_PONE_US: { art: "A", raum: "USA", titel: "Ponvory (ponesimod) – US Prescribing Information", hersteller: "Vanda Pharmaceuticals Inc.",
      dokumentstand: "Revised 10/2024", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0c025ba8-ba51-272e-e063-6294a90ad120", abgerufen: "2026-10-04", zugang: "frei" },
    /* --- Literatur --- */
    Q_D_AAO2016: { art: "D", raum: "INT", titel: "Marmor MF, Kellner U, Lai TYY, Melles RB, Mieler WF; American Academy of Ophthalmology. Recommendations on Screening for Chloroquine and Hydroxychloroquine Retinopathy (2016 Revision). Ophthalmology 2016;123(6):1386-94",
      hersteller: null, dokumentstand: "2016", pmid: "26992838", doi: "10.1016/j.ophtha.2016.01.058", studientyp: "Leitlinie/Empfehlung (AAO)",
      url: "https://pubmed.ncbi.nlm.nih.gov/26992838/", abgerufen: "2026-10-04", zugang: "frei" },
    Q_D_AAO2025: { art: "D", raum: "INT", titel: "Marmor MF et al. Special AAO Report: Recommendations on Screening for Hydroxychloroquine Retinopathy (2025 Revision). Ophthalmology 2026",
      hersteller: null, dokumentstand: "2026", pmid: "41232611", doi: null, studientyp: "Leitlinie/Empfehlung (AAO)",
      url: "https://pubmed.ncbi.nlm.nih.gov/41232611/", abgerufen: "2026-10-04", zugang: "nicht lesbar",
      hinweis: "In der PubMed-Trefferliste gefunden; Abstract-Seite lieferte keinen Inhalt bzw. CAPTCHA." },
    Q_D_MEKAR2017: { art: "D", raum: "INT", titel: "Clinical and Morphologic Characteristics of MEK Inhibitor-Associated Retinopathy: Differences from Central Serous Chorioretinopathy. Ophthalmology 2017",
      hersteller: null, dokumentstand: "2017", pmid: "28709702", doi: "10.1016/j.ophtha.2017.05.038", studientyp: "Fallserie",
      url: "https://pubmed.ncbi.nlm.nih.gov/28709702/", abgerufen: "2026-10-04", zugang: "nicht lesbar", hinweis: "PubMed per CAPTCHA gesperrt." },
    Q_D_PPS2022: { art: "D", raum: "INT", titel: "Risk of maculopathy with pentosan polysulfate sodium use (2022)",
      hersteller: null, dokumentstand: "2022", pmid: "35277990", doi: null, studientyp: "Studie (Typ noch zu prüfen)",
      url: "https://pubmed.ncbi.nlm.nih.gov/35277990/", abgerufen: "2026-10-04", zugang: "nicht lesbar", hinweis: "Nur Titel aus Websuche; Abstract noch nicht geprüft." },
    Q_D_FINGO2020: { art: "D", raum: "INT", titel: "Incidence of uveitis and macular edema among patients taking fingolimod 0.5 mg for multiple sclerosis",
      hersteller: null, dokumentstand: null, pmid: "32954456", doi: null, studientyp: "Studie (Typ noch zu prüfen)",
      url: "https://pubmed.ncbi.nlm.nih.gov/32954456/", abgerufen: "2026-10-04", zugang: "nicht lesbar", hinweis: "Nur Titel aus Websuche; Abstract noch nicht geprüft." }
  },

  /* ===================== WIRKSTOFFE ===================== */
  WIRKSTOFFE: [
    /* ---------- Etappe 1a: geprüft ---------- */
    { id: "hydroxychloroquin", inn_de: "Hydroxychloroquin", inn_en: "hydroxychloroquine", synonyme: ["Hydroxychloroquinsulfat", "hydroxychloroquine sulfate", "HCQ"],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["antimalariamittel", "dmard"], anwendungsgebiete: ["rheuma", "lupus", "malaria"],
      handelsnamen_de: ["Quensyl", "Hydroxychloroquin Heumann", "Hydroxychloroquin Aristo", "Hydroxychloroquin-ratiopharm"], handelsnamen_us: ["Plaquenil"],
      zulassung_eu: "national", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_HCQ_DE_HEUMANN", raum: "DE", umfang: "Abschnitte 4.3, 4.4, 4.5, 4.7, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_HCQ_US_PLAQUENIL", raum: "USA", umfang: "Contraindications, Warnings and Precautions, Adverse Reactions, Drug Interactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "19574" },
      hinweis: "Die Originator-Fachinformation (Quensyl) ist nur mit Login abrufbar; geprüft wurde die frei zugängliche Generika-Fachinformation. Die Häufigkeitskategorien der 4.8-Tabelle waren im Abruf nicht sicher zuzuordnen." },

    { id: "chloroquin", inn_de: "Chloroquin", inn_en: "chloroquine", synonyme: ["Chloroquinphosphat", "chloroquine phosphate", "CQ"],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["antimalariamittel"], anwendungsgebiete: ["malaria"],
      handelsnamen_de: ["Resochin"], handelsnamen_us: [],
      zulassung_eu: "national", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: null, raum: "DE", umfang: "Suche nach frei zugänglicher deutscher Fachinformation", geprueft_am: "2026-10-04", ergebnis: "keine frei zugängliche deutsche Fachinformation gefunden" },
        { quelle: "Q_CQ_US_RISING", raum: "USA", umfang: "Contraindications, Warnings, Precautions, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { buchstabe: "c" },
      hinweis: "Keine frei zugängliche deutsche Fachinformation gefunden (Suche 04.10.2026). Angaben aus dem US-Label und der AAO-Empfehlung 2016." },

    { id: "pentosanpolysulfat", inn_de: "Pentosanpolysulfat-Natrium", inn_en: "pentosan polysulfate sodium", synonyme: ["Pentosanpolysulfat", "pentosan polysulfate", "PPS"],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["heparinoide"], anwendungsgebiete: ["blasenschmerz"],
      handelsnamen_de: ["Elmiron"], handelsnamen_us: ["Elmiron"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_PPS_EU_ELMIRON", raum: "EU", umfang: "Fachinformation 4.4, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_PPS_US_ELMIRON", raum: "USA", umfang: "Warnings, Precautions, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [
        { text: "„Tränensekretion, Amblyopie“ (4.8, gelegentlich)", quelle: "Q_PPS_EU_ELMIRON", grund: "unspezifisch, kein Warnhinweis (Aufnahmeregel)" },
        { text: "„amblyopia“ (Adverse Reactions, ≤ 1 %)", quelle: "Q_PPS_US_ELMIRON", grund: "unspezifisch, kein Warnhinweis (Aufnahmeregel)" }
      ],
      adrreports: { code: "25961" },
      hinweis: null },

    { id: "tamoxifen", inn_de: "Tamoxifen", inn_en: "tamoxifen", synonyme: ["Tamoxifencitrat", "tamoxifen citrate"],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["serm"], anwendungsgebiete: ["brustkrebs", "krebs"],
      handelsnamen_de: ["Tamoxifen Heumann", "Tamoxifen AbZ", "Tamoxifen-ratiopharm", "Tamoxifen AL"], handelsnamen_us: ["Soltamox"],
      zulassung_eu: "national", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_TAM_DE_HEUMANN", raum: "DE", umfang: "4.3, 4.4, 4.5, 4.7, 4.8; Volltextsuche nach Thrombose, Netzhautvene, Venenverschluss, Farbsehen, Farbwahrnehmung, Makula, Katarakt", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_TAM_US_SOLTAMOX", raum: "USA", umfang: "Warnings and Precautions, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [
        { text: "„Beeinträchtigung des Sehvermögens“ (4.7, Verkehrstüchtigkeit)", quelle: "Q_TAM_DE_HEUMANN", grund: "unspezifisch" }
      ],
      adrreports: { code: "22322" },
      hinweis: null },

    { id: "trametinib", inn_de: "Trametinib", inn_en: "trametinib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["mek_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["melanom", "lungenkrebs", "krebs"],
      handelsnamen_de: ["Mekinist"], handelsnamen_us: ["Mekinist"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_TRAM_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_TRAM_US", raum: "USA", umfang: "Warnings and Precautions 5.6, Adverse Reactions, Dosage Modifications", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "160215" },
      hinweis: "Mehrere Angaben beziehen sich auf die Kombination mit Dabrafenib (jeweils gekennzeichnet)." },

    { id: "binimetinib", inn_de: "Binimetinib", inn_en: "binimetinib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["mek_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["melanom", "lungenkrebs", "krebs"],
      handelsnamen_de: ["Mektovi"], handelsnamen_us: ["Mektovi"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_BINI_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.7, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_BINI_US", raum: "USA", umfang: "Warnings and Precautions 5.4 (Ocular Toxicities), Adverse Reactions, Dosage Modifications", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "7465677" },
      hinweis: "Angaben beziehen sich auf die Kombination mit Encorafenib." },

    { id: "cobimetinib", inn_de: "Cobimetinib", inn_en: "cobimetinib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["mek_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["melanom", "krebs"],
      handelsnamen_de: ["Cotellic"], handelsnamen_us: ["Cotellic"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_COBI_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_COBI_US", raum: "USA", umfang: "Warnings and Precautions 5.5, Adverse Reactions, Dosage Modifications", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [
        { text: "„Sehschwäche“ (4.8)", quelle: "Q_COBI_EU", grund: "unspezifisch; Häufigkeitsangabe in den Abfragen widersprüchlich" }
      ],
      adrreports: { buchstabe: "c" },
      hinweis: "Angaben beziehen sich auf die Kombination mit Vemurafenib." },

    { id: "selumetinib", inn_de: "Selumetinib", inn_en: "selumetinib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["mek_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["neurofibromatose"],
      handelsnamen_de: ["Koselugo"], handelsnamen_us: ["Koselugo"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_SELU_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_SELU_US", raum: "USA", umfang: "Warnings and Precautions 5.2, Adverse Reactions, Dosage Modifications", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "83726" },
      hinweis: null },

    { id: "mirdametinib", inn_de: "Mirdametinib", inn_en: "mirdametinib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["mek_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["neurofibromatose"],
      handelsnamen_de: ["Ezmekly"], handelsnamen_us: ["Gomekli"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_MIRD_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_MIRD_US", raum: "USA", umfang: "Warnings and Precautions 5.1, Adverse Reactions, Dosage Modifications", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { buchstabe: "m" },
      hinweis: null },

    { id: "dabrafenib", inn_de: "Dabrafenib", inn_en: "dabrafenib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["braf_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["melanom", "lungenkrebs", "krebs"],
      handelsnamen_de: ["Tafinlar"], handelsnamen_us: ["Tafinlar"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_DAB_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_DAB_US", raum: "USA", umfang: "Warnings and Precautions 5.5, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [
        { text: "„Verschwommenes Sehen“, „Sehstörung“ (4.8, häufig; Kombination mit Trametinib)", quelle: "Q_DAB_EU", grund: "unspezifisch, kein eigener Warnhinweis" }
      ],
      adrreports: { code: "137061" },
      hinweis: "Mehrere Angaben beziehen sich auf die Kombination mit Trametinib (jeweils gekennzeichnet)." },

    { id: "encorafenib", inn_de: "Encorafenib", inn_en: "encorafenib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["braf_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["melanom", "darmkrebs", "krebs"],
      handelsnamen_de: ["Braftovi"], handelsnamen_us: ["Braftovi"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_ENCO_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.7, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_ENCO_US", raum: "USA", umfang: "Warnings and Precautions 5.6, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "3754928" },
      hinweis: "Die Häufigkeitskategorien der 4.8-Tabelle waren im Abruf nicht eindeutig den Therapieregimen zuzuordnen; angegeben sind die Prozentwerte aus dem Text." },

    { id: "vemurafenib", inn_de: "Vemurafenib", inn_en: "vemurafenib", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["braf_inhibitoren", "kinaseinhibitoren"], anwendungsgebiete: ["melanom", "krebs"],
      handelsnamen_de: ["Zelboraf"], handelsnamen_us: ["Zelboraf"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_VEM_EU", raum: "EU", umfang: "Fachinformation (gesamter Anhang I) – 4.4, 4.7, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_VEM_US", raum: "USA", umfang: "Warnings and Precautions 5.8, Adverse Reactions 6.1/6.2", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "81040" },
      hinweis: null },

    { id: "fingolimod", inn_de: "Fingolimod", inn_en: "fingolimod", synonyme: ["Fingolimodhydrochlorid", "fingolimod hydrochloride"],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["s1p_modulatoren"], anwendungsgebiete: ["ms"],
      handelsnamen_de: ["Gilenya"], handelsnamen_us: ["Gilenya"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_FING_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_FING_US", raum: "USA", umfang: "Warnings and Precautions 5.4, Adverse Reactions 6.1", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [
        { text: "„Verschwommenes Sehen“ (4.8, häufig; US: 4 % vs. 2 % unter Placebo)", quelle: "Q_FING_EU", grund: "unspezifisch; Warnhinweis-Bezug nur in einer Abfrage gefunden" }
      ],
      adrreports: { code: "72907" },
      hinweis: null },

    { id: "siponimod", inn_de: "Siponimod", inn_en: "siponimod", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["s1p_modulatoren"], anwendungsgebiete: ["ms"],
      handelsnamen_de: ["Mayzent"], handelsnamen_us: ["Mayzent"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_SIPO_EU", raum: "EU", umfang: "Fachinformation 4.4, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_SIPO_US", raum: "USA", umfang: "Warnings and Precautions 5.3, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "4341376" },
      hinweis: null },

    { id: "ozanimod", inn_de: "Ozanimod", inn_en: "ozanimod", synonyme: ["Ozanimodhydrochlorid"],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["s1p_modulatoren"], anwendungsgebiete: ["ms", "colitis"],
      handelsnamen_de: ["Zeposia"], handelsnamen_us: ["Zeposia"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_OZAN_EU", raum: "EU", umfang: "Fachinformation 4.4, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_OZAN_US", raum: "USA", umfang: "Warnings and Precautions 5.8, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { code: "9566287" },
      hinweis: null },

    { id: "ponesimod", inn_de: "Ponesimod", inn_en: "ponesimod", synonyme: [],
      kategorie: "systemisch", applikation: ["oral"], klassen: ["s1p_modulatoren"], anwendungsgebiete: ["ms"],
      handelsnamen_de: ["Ponvory"], handelsnamen_us: ["Ponvory"],
      zulassung_eu: "zentral", etappe: "1a", status: "geprueft",
      pruefstand: [
        { quelle: "Q_PONE_EU", raum: "EU", umfang: "Fachinformation 4.2, 4.3, 4.4, 4.5, 4.8", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" },
        { quelle: "Q_PONE_US", raum: "USA", umfang: "Warnings and Precautions 5.8, Adverse Reactions", geprueft_am: "2026-10-04", ergebnis: "okuläre Angaben gefunden" }
      ],
      nicht_aufgenommen: [],
      adrreports: { buchstabe: "p" },
      hinweis: null },

    /* ---------- Geplant (Etappe 1b/1c) – erfasst für die Suche, noch ohne Prüfung ---------- */
    { id: "ethambutol", inn_de: "Ethambutol", inn_en: "ethambutol", synonyme: [], kategorie: "systemisch", klassen: ["tuberkulostatika"], anwendungsgebiete: ["tuberkulose"], etappe: "1b", status: "geplant" },
    { id: "linezolid", inn_de: "Linezolid", inn_en: "linezolid", synonyme: [], kategorie: "systemisch", klassen: ["oxazolidinone"], anwendungsgebiete: ["infektion"], etappe: "1b", status: "geplant" },
    { id: "tedizolid", inn_de: "Tedizolid", inn_en: "tedizolid", synonyme: [], kategorie: "systemisch", klassen: ["oxazolidinone"], anwendungsgebiete: ["infektion"], etappe: "1b", status: "geplant" },
    { id: "amiodaron", inn_de: "Amiodaron", inn_en: "amiodarone", synonyme: [], kategorie: "systemisch", klassen: ["antiarrhythmika"], anwendungsgebiete: ["herzrhythmus"], etappe: "1b", status: "geplant" },
    { id: "dronedaron", inn_de: "Dronedaron", inn_en: "dronedarone", synonyme: [], kategorie: "systemisch", klassen: ["antiarrhythmika"], anwendungsgebiete: ["herzrhythmus"], etappe: "1b", status: "geplant" },
    { id: "vigabatrin", inn_de: "Vigabatrin", inn_en: "vigabatrin", synonyme: [], kategorie: "systemisch", klassen: ["antiepileptika"], anwendungsgebiete: ["epilepsie"], etappe: "1b", status: "geplant" },
    { id: "sildenafil", inn_de: "Sildenafil", inn_en: "sildenafil", synonyme: [], kategorie: "systemisch", klassen: ["pde5_hemmer"], anwendungsgebiete: ["erektionsstoerung", "lungenhochdruck"], etappe: "1b", status: "geplant" },
    { id: "tadalafil", inn_de: "Tadalafil", inn_en: "tadalafil", synonyme: [], kategorie: "systemisch", klassen: ["pde5_hemmer"], anwendungsgebiete: ["erektionsstoerung", "lungenhochdruck", "prostata"], etappe: "1b", status: "geplant" },
    { id: "vardenafil", inn_de: "Vardenafil", inn_en: "vardenafil", synonyme: [], kategorie: "systemisch", klassen: ["pde5_hemmer"], anwendungsgebiete: ["erektionsstoerung"], etappe: "1b", status: "geplant" },
    { id: "avanafil", inn_de: "Avanafil", inn_en: "avanafil", synonyme: [], kategorie: "systemisch", klassen: ["pde5_hemmer"], anwendungsgebiete: ["erektionsstoerung"], etappe: "1b", status: "geplant" },
    { id: "semaglutid", inn_de: "Semaglutid", inn_en: "semaglutide", synonyme: [], kategorie: "systemisch", klassen: ["glp1_ra"], anwendungsgebiete: ["diabetes", "adipositas"], etappe: "1b", status: "geplant" },
    { id: "tirzepatid", inn_de: "Tirzepatid", inn_en: "tirzepatide", synonyme: [], kategorie: "systemisch", klassen: ["gip_glp1_ra"], anwendungsgebiete: ["diabetes", "adipositas"], etappe: "1b", status: "geplant" },
    { id: "liraglutid", inn_de: "Liraglutid", inn_en: "liraglutide", synonyme: [], kategorie: "systemisch", klassen: ["glp1_ra"], anwendungsgebiete: ["diabetes", "adipositas"], etappe: "1b", status: "geplant" },
    { id: "dulaglutid", inn_de: "Dulaglutid", inn_en: "dulaglutide", synonyme: [], kategorie: "systemisch", klassen: ["glp1_ra"], anwendungsgebiete: ["diabetes"], etappe: "1b", status: "geplant" },
    { id: "digoxin", inn_de: "Digoxin", inn_en: "digoxin", synonyme: [], kategorie: "systemisch", klassen: ["herzglykoside"], anwendungsgebiete: ["herzschwaeche", "herzrhythmus"], etappe: "1b", status: "geplant" },
    { id: "digitoxin", inn_de: "Digitoxin", inn_en: "digitoxin", synonyme: [], kategorie: "systemisch", klassen: ["herzglykoside"], anwendungsgebiete: ["herzschwaeche", "herzrhythmus"], etappe: "1b", status: "geplant" },
    { id: "topiramat", inn_de: "Topiramat", inn_en: "topiramate", synonyme: [], kategorie: "systemisch", klassen: ["antiepileptika"], anwendungsgebiete: ["epilepsie", "migraene"], etappe: "1c", status: "geplant" },
    { id: "prednisolon", inn_de: "Prednisolon", inn_en: "prednisolone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["kortisontherapie", "rheuma", "asthma"], etappe: "1c", status: "geplant" },
    { id: "prednison", inn_de: "Prednison", inn_en: "prednisone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["kortisontherapie", "rheuma"], etappe: "1c", status: "geplant" },
    { id: "methylprednisolon", inn_de: "Methylprednisolon", inn_en: "methylprednisolone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["kortisontherapie", "ms"], etappe: "1c", status: "geplant" },
    { id: "dexamethason", inn_de: "Dexamethason", inn_en: "dexamethasone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["kortisontherapie", "krebs"], etappe: "1c", status: "geplant" },
    { id: "hydrocortison", inn_de: "Hydrocortison", inn_en: "hydrocortisone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["kortisontherapie"], etappe: "1c", status: "geplant" },
    { id: "betamethason", inn_de: "Betamethason", inn_en: "betamethasone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["kortisontherapie"], etappe: "1c", status: "geplant" },
    { id: "triamcinolon", inn_de: "Triamcinolon", inn_en: "triamcinolone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["kortisontherapie"], etappe: "1c", status: "geplant" },
    { id: "budesonid", inn_de: "Budesonid", inn_en: "budesonide", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["asthma", "kortisontherapie"], etappe: "1c", status: "geplant" },
    { id: "fluticason", inn_de: "Fluticason", inn_en: "fluticasone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["asthma"], etappe: "1c", status: "geplant" },
    { id: "beclometason", inn_de: "Beclometason", inn_en: "beclomethasone", synonyme: ["beclometasone"], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["asthma"], etappe: "1c", status: "geplant" },
    { id: "mometason", inn_de: "Mometason", inn_en: "mometasone", synonyme: [], kategorie: "systemisch", klassen: ["kortikosteroide"], anwendungsgebiete: ["asthma", "kortisontherapie"], etappe: "1c", status: "geplant" },
    { id: "tamsulosin", inn_de: "Tamsulosin", inn_en: "tamsulosin", synonyme: [], kategorie: "systemisch", klassen: ["alpha1_blocker"], anwendungsgebiete: ["prostata"], etappe: "1c", status: "geplant" },
    { id: "alfuzosin", inn_de: "Alfuzosin", inn_en: "alfuzosin", synonyme: [], kategorie: "systemisch", klassen: ["alpha1_blocker"], anwendungsgebiete: ["prostata"], etappe: "1c", status: "geplant" },
    { id: "silodosin", inn_de: "Silodosin", inn_en: "silodosin", synonyme: [], kategorie: "systemisch", klassen: ["alpha1_blocker"], anwendungsgebiete: ["prostata"], etappe: "1c", status: "geplant" },
    { id: "doxazosin", inn_de: "Doxazosin", inn_en: "doxazosin", synonyme: [], kategorie: "systemisch", klassen: ["alpha1_blocker"], anwendungsgebiete: ["prostata", "bluthochdruck"], etappe: "1c", status: "geplant" },
    { id: "terazosin", inn_de: "Terazosin", inn_en: "terazosin", synonyme: [], kategorie: "systemisch", klassen: ["alpha1_blocker"], anwendungsgebiete: ["prostata"], etappe: "1c", status: "geplant" },
    { id: "isotretinoin", inn_de: "Isotretinoin", inn_en: "isotretinoin", synonyme: [], kategorie: "systemisch", klassen: ["retinoide"], anwendungsgebiete: ["akne"], etappe: "1c", status: "geplant" },
    { id: "acitretin", inn_de: "Acitretin", inn_en: "acitretin", synonyme: [], kategorie: "systemisch", klassen: ["retinoide"], anwendungsgebiete: ["psoriasis"], etappe: "1c", status: "geplant" },
    { id: "alitretinoin", inn_de: "Alitretinoin", inn_en: "alitretinoin", synonyme: [], kategorie: "systemisch", klassen: ["retinoide"], anwendungsgebiete: ["handekzem"], etappe: "1c", status: "geplant" },
    { id: "dupilumab", inn_de: "Dupilumab", inn_en: "dupilumab", synonyme: [], kategorie: "systemisch", klassen: ["il4_il13_antikoerper"], anwendungsgebiete: ["neurodermitis", "asthma"], etappe: "1c", status: "geplant" },
    { id: "tralokinumab", inn_de: "Tralokinumab", inn_en: "tralokinumab", synonyme: [], kategorie: "systemisch", klassen: ["il4_il13_antikoerper"], anwendungsgebiete: ["neurodermitis"], etappe: "1c", status: "geplant" },
    { id: "lebrikizumab", inn_de: "Lebrikizumab", inn_en: "lebrikizumab", synonyme: [], kategorie: "systemisch", klassen: ["il4_il13_antikoerper"], anwendungsgebiete: ["neurodermitis"], etappe: "1c", status: "geplant" },
    { id: "rifabutin", inn_de: "Rifabutin", inn_en: "rifabutin", synonyme: [], kategorie: "systemisch", klassen: ["rifamycine", "tuberkulostatika"], anwendungsgebiete: ["tuberkulose", "infektion"], etappe: "1c", status: "geplant" },
    { id: "pembrolizumab", inn_de: "Pembrolizumab", inn_en: "pembrolizumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs", "melanom", "lungenkrebs"], etappe: "1c", status: "geplant" },
    { id: "nivolumab", inn_de: "Nivolumab", inn_en: "nivolumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs", "melanom", "lungenkrebs"], etappe: "1c", status: "geplant" },
    { id: "ipilimumab", inn_de: "Ipilimumab", inn_en: "ipilimumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs", "melanom"], etappe: "1c", status: "geplant" },
    { id: "atezolizumab", inn_de: "Atezolizumab", inn_en: "atezolizumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs", "lungenkrebs"], etappe: "1c", status: "geplant" },
    { id: "durvalumab", inn_de: "Durvalumab", inn_en: "durvalumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs", "lungenkrebs"], etappe: "1c", status: "geplant" },
    { id: "avelumab", inn_de: "Avelumab", inn_en: "avelumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs"], etappe: "1c", status: "geplant" },
    { id: "cemiplimab", inn_de: "Cemiplimab", inn_en: "cemiplimab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs"], etappe: "1c", status: "geplant" },
    { id: "dostarlimab", inn_de: "Dostarlimab", inn_en: "dostarlimab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs"], etappe: "1c", status: "geplant" },
    { id: "tremelimumab", inn_de: "Tremelimumab", inn_en: "tremelimumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs"], etappe: "1c", status: "geplant" },
    { id: "tislelizumab", inn_de: "Tislelizumab", inn_en: "tislelizumab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "krebs"], etappe: "1c", status: "geplant" },
    { id: "relatlimab", inn_de: "Relatlimab (mit Nivolumab)", inn_en: "relatlimab", synonyme: [], kategorie: "systemisch", klassen: ["checkpoint_inhibitoren"], anwendungsgebiete: ["immuntherapie", "melanom"], etappe: "1c", status: "geplant" }
  ],

  /* ===================== EINTRÄGE ===================== */
  EINTRAEGE: [
    /* ================= Hydroxychloroquin ================= */
    { id: "hcq-retinopathie", wirkstoff: "hydroxychloroquin", befund: "retinopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Irreversible Retinopathien unter Langzeittherapie; in frühen Stadien Beeinträchtigung des Farbsehens, Pigmentierung, Skotome, Flimmerskotome; in späteren Stadien Verlust des Sehvermögens.",
          zitat: "„Irreversible Retinopathien während einer Langzeittherapie mit Beeinträchtigung des Farbsehens in frühen Stadien …“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: "unter Langzeittherapie",
          dosisabhaengigkeit: "Inzidenz hängt von der täglichen Dosis ab; bei Einhaltung von 6,5 mg/kg Körpergewicht oder weniger (Langzeit, normale Nierenfunktion) nur wenige Fälle dokumentiert (Fußnote zu 4.8)",
          reversibilitaet: "irreversibel (Tabelleneintrag); Risiko der Progredienz auch nach Therapieabbruch (Fußnote zu 4.8)",
          dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "Wortlaut in mehreren Abfragen übereinstimmend; Häufigkeitsspalte der Tabelle im Abruf nicht erkennbar." },
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Augenärztliche Untersuchung vor Therapiebeginn und alle 3 Monate; bei Retinopathie oder Gesichtsfeldverzerrung sofort absetzen; Veränderungen können nach Absetzen fortschreiten; Risiko gering bis 6,5 mg Hydroxychloroquinsulfat/kg KG täglich; gleichzeitige Gabe retinatoxischer Arzneimittel (z. B. Tamoxifen) nicht empfohlen.",
          zitat: "„… die Untersuchungen sollten alle 3 Monate wiederholt werden.“",
          haeufigkeit: null, latenz: null,
          dosisabhaengigkeit: "Risiko von Netzhautschädigungen gering bei Tagesdosen bis 6,5 mg Hydroxychloroquinsulfat pro kg Körpergewicht",
          reversibilitaet: "Retinaveränderungen und Sehstörungen können sich auch nach Absetzen weiter verschlechtern",
          dringlichkeit: "Bei Retinopathie oder Anzeichen einer Gesichtsfeldverzerrung (Sehschärfe, Farbwahrnehmung) Behandlung sofort abbrechen",
          kontrollen: "Vor Therapiebeginn Ophthalmoskopie/Funduskopie (Sehschärfe, Gesichtsfeld, Farbensehen, Retinaveränderungen), Wiederholung alle 3 Monate; Kinder grundsätzlich augenärztlich untersuchen; Patienten mit Sehschärfe unter 0,8 oder über 65 Jahre vor Behandlungsbeginn augenärztlich vorstellen; nach Abbruch wegen visueller Veränderungen Augenuntersuchung alle 3–6 Monate",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Gegenanzeige", abschnitt: "4.3",
          aussage: "Gegenanzeigen u. a.: vorbestehende Makulopathie, Gesichtsfeldveränderungen jeglicher Genese, Retinitis pigmentosa, Retinopathie.",
          zitat: "„Retinitis pigmentosa, Retinopathie“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Irreversible Netzhautschädigung, abhängig von kumulativer Dosis und Behandlungsdauer; bei Patienten asiatischer Herkunft evtl. zuerst außerhalb der Makula.",
          zitat: "“Irreversible retinal damage was observed in some patients treated with hydroxychloroquine sulfate …”",
          haeufigkeit: null,
          latenz: "Risikofaktor: Anwendungsdauer über 5 Jahre",
          dosisabhaengigkeit: "abhängig von kumulativer Dosis und Behandlungsdauer; Risikofaktoren: Tagesdosis ≥ 5 mg/kg tatsächliches Körpergewicht, Anwendung > 5 Jahre, Niereninsuffizienz, Begleitmedikation wie Tamoxifen, vorbestehende Makulaerkrankung",
          reversibilitaet: "irreversibel; Netzhautveränderungen und Sehstörungen können auch nach Absetzen fortschreiten",
          dringlichkeit: "Bei Verdacht auf okuläre Toxizität absetzen und engmaschig überwachen",
          kontrollen: "Basisuntersuchung im ersten Behandlungsjahr (bestkorrigierter Fernvisus, automatisierte Schwellenperimetrie zentral 10°, SD-OCT); bei höherem Risiko jährliche Untersuchungen; ohne relevante Risikofaktoren jährliche Netzhautuntersuchungen meist erst nach 5 Behandlungsjahren; bei asiatischer Herkunft Perimetrie zentral 24° statt 10°",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA)" },
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Adverse Reactions (Postmarketing)", abschnitt: "6",
          aussage: "Nach der Zulassung berichtet (4-Aminochinoline einschließlich Plaquenil): Retinopathie, Netzhautpigmentveränderungen (typisch Schießscheibe), Gesichtsfelddefekte (parazentrale Skotome), Makuladegeneration, Hornhautödem, Hornhauttrübungen, verminderte Dunkeladaptation.",
          zitat: "“Retinopathy, retinal pigmentation changes (typically bull's eye appearance), visual field defects …”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht bekannt", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_D_AAO2016", typ: "Leitlinie/Empfehlung", abschnitt: "Abstract",
          aussage: "AAO 2016: maximale Tagesdosis HCQ ≤ 5,0 mg/kg Realgewicht; Toxizitätsrisiko bei empfohlener Dosis bis 5 Jahre < 1 %, bis 10 Jahre < 2 %, nach 20 Jahren fast 20 %; Basis-Fundusuntersuchung, jährliches Screening ab 5 Jahren bei akzeptabler Dosis ohne Hauptrisikofaktoren; primäre Screeningtests automatisierte Perimetrie und SD-OCT.",
          zitat: "“At recommended doses, the risk of toxicity up to 5 years is under 1% and up to 10 years is under 2%, but it rises to almost 20% after 20 years.”",
          haeufigkeit: "bei empfohlener Dosis: < 1 % bis 5 Jahre, < 2 % bis 10 Jahre, fast 20 % nach 20 Jahren (AAO 2016)",
          latenz: "Risiko steigt mit der Behandlungsdauer",
          dosisabhaengigkeit: "empfohlene maximale Tagesdosis ≤ 5,0 mg/kg Realgewicht",
          reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Basis-Fundusuntersuchung zum Ausschluss einer vorbestehenden Makulopathie; jährliches Screening nach 5 Jahren bei akzeptabler Dosis ohne Hauptrisikofaktoren; automatisierte Perimetrie plus SD-OCT",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend; Zitat und Häufigkeit nach unabhängiger Nachprüfung (04.10.2026) um „bei empfohlener Dosis“ ergänzt" },
        { quelle: "Q_D_AAO2025", typ: "Leitlinie/Empfehlung", abschnitt: "Abstract",
          aussage: "AAO-Revision 2025 der Screening-Empfehlungen – Inhalt noch nicht geprüft.",
          zitat: null, haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "offen", geprueft_am: null, pruefnotiz: "Abstract für das Abrufwerkzeug nicht lesbar (CAPTCHA)." }
      ], unterschied_notiz: null },

    { id: "hcq-makulopathie", wirkstoff: "hydroxychloroquin", befund: "makulopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Fälle einer potentiell irreversiblen Makulopathie und Makuladegeneration berichtet; außerdem Retinopathie mit verstärkter Pigmentierung im Zentrum der Makula und Sehstörungen.",
          zitat: "„Es wurde über Fälle einer potentiell irreversiblen Makulopathie und Makuladegeneration berichtet.“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: null, dosisabhaengigkeit: null, reversibilitaet: "potentiell irreversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "Wortlaut in mehreren Abfragen übereinstimmend; Häufigkeitsspalte nicht erkennbar." },
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Adverse Reactions (Postmarketing)", abschnitt: "6",
          aussage: "Makuladegeneration nach der Zulassung berichtet.",
          zitat: "“… macular degeneration, corneal edema, corneal opacities, decreased dark adaptation”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht bekannt", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-bulls-eye", wirkstoff: "hydroxychloroquin", befund: "bulls_eye_makulopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Adverse Reactions (Postmarketing)", abschnitt: "6",
          aussage: "Netzhautpigmentveränderungen, typischerweise mit Schießscheiben-Aspekt (bull's eye).",
          zitat: "“retinal pigmentation changes (typically bull's eye appearance)”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht bekannt", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: "Die geprüfte deutsche Fachinformation beschreibt eine „Retinopathie mit verstärkter Pigmentierung im Zentrum der Makula“, verwendet aber nicht den Begriff Schießscheibe/bull's eye." },

    { id: "hcq-hornhautoedem", wirkstoff: "hydroxychloroquin", befund: "hornhautoedem", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Korneale Veränderungen einschließlich Ödem und Hornhauttrübung; können asymptomatisch sein oder Sehstörungen (Gesichtsfeldeinschränkung, verschwommenes Sehen, Photophobie) verursachen.",
          zitat: "„Korneale Veränderungen, einschließlich Ödem und Hornhauttrübung“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "vorübergehend oder nach Absetzen reversibel (Fußnote zu 4.8)", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "Wortlaut und Fußnote in mehreren Abfragen übereinstimmend" },
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Adverse Reactions (Postmarketing)", abschnitt: "6",
          aussage: "Hornhautödem nach der Zulassung berichtet.",
          zitat: "“corneal edema”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht bekannt", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-hornhauttruebung", wirkstoff: "hydroxychloroquin", befund: "hornhauttruebung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Korneale Veränderungen einschließlich Ödem und Hornhauttrübung; können asymptomatisch sein oder Sehstörungen verursachen.",
          zitat: "„Korneale Veränderungen, einschließlich Ödem und Hornhauttrübung“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "vorübergehend oder nach Absetzen reversibel (Fußnote zu 4.8)", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "Wortlaut und Fußnote in mehreren Abfragen übereinstimmend" },
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Adverse Reactions (Postmarketing)", abschnitt: "6",
          aussage: "Hornhauttrübungen nach der Zulassung berichtet.",
          zitat: "“corneal opacities”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht bekannt", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-akkommodation", wirkstoff: "hydroxychloroquin", befund: "akkommodationsstoerung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Verschwommenes Sehen durch eine Störung der Akkommodation; dosisabhängig und reversibel.",
          zitat: "„Verschwommenes Sehen durch eine Störung der Akkommodation“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: null, dosisabhaengigkeit: "dosisabhängig (Fußnote zu 4.8)", reversibilitaet: "reversibel (Fußnote zu 4.8)", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "Wortlaut in mehreren Abfragen übereinstimmend; Häufigkeitsangaben der Abfragen widersprüchlich." },
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Hinweis Verkehrstüchtigkeit", abschnitt: "4.7",
          aussage: "Hydroxychloroquin kann zu beeinträchtigter Akkommodation und verschwommenem Sehen führen.",
          zitat: "„Hydroxychloroquin kann zu einer beeinträchtigten Akkommodation und verschwommenem Sehen führen.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-skotom", wirkstoff: "hydroxychloroquin", befund: "skotom", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Patienten mit Retinaveränderungen können anfangs symptomlos sein oder partielle Gesichtsfeldausfälle vom parazentralen bzw. perizentralen Ringtyp sowie ein beeinträchtigtes Farbensehen zeigen; Skotome und Flimmerskotome in frühen Stadien der Retinopathie.",
          zitat: "„… partielle Gesichtsfeldausfälle bzw. -abschwächungen vom parazentralen bzw. perizentralen Ringtyp …“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "Risiko der Progredienz auch nach Therapieabbruch; Symptome können auch temporär auftreten (Fußnote zu 4.8)", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (Rohtext und Bestätigung)" },
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Adverse Reactions (Postmarketing)", abschnitt: "6",
          aussage: "Gesichtsfelddefekte (parazentrale Skotome) nach der Zulassung berichtet.",
          zitat: "“visual field defects (paracentral scotomas)”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht bekannt", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-farbsehen", wirkstoff: "hydroxychloroquin", befund: "farbsehstoerung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Beeinträchtigung des Farbsehens in frühen Stadien der (irreversiblen) Retinopathie unter Langzeittherapie.",
          zitat: "„… mit Beeinträchtigung des Farbsehens in frühen Stadien …“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: "unter Langzeittherapie", dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "Wortlaut in mehreren Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-dunkeladaptation", wirkstoff: "hydroxychloroquin", befund: "dunkeladaptation", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Adverse Reactions (Postmarketing)", abschnitt: "6",
          aussage: "Verminderte Dunkeladaptation nach der Zulassung berichtet.",
          zitat: "“decreased dark adaptation”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht bekannt", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-nachtblindheit", wirkstoff: "hydroxychloroquin", befund: "nachtblindheit", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Nachtblindheit wird als Beispiel für Retinaveränderungen genannt, auf die vor Therapiebeginn und alle 3 Monate untersucht werden soll.",
          zitat: "„… Retinaveränderungen (z. B. Skotome, Nachtblindheit) …“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Untersuchung vor Therapiebeginn, Wiederholung alle 3 Monate",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "hcq-sehverlust", wirkstoff: "hydroxychloroquin", befund: "sehverlust", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Verlust des Sehvermögens in späteren Stadien der Retinopathie.",
          zitat: "„Verlust des Sehvermögens in späteren Stadien“",
          haeufigkeit: "Kategorie im Abruf nicht sicher zuordenbar (Tabellenspalte) – siehe Fachinformation",
          latenz: "spätere Stadien der Retinopathie",
          dosisabhaengigkeit: "Inzidenz der Retinopathie hängt von der täglichen Dosis ab (Fußnote zu 4.8)",
          reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "Wortlaut in mehreren Abfragen übereinstimmend; Häufigkeitsangaben widersprüchlich." }
      ], unterschied_notiz: null },

    { id: "hcq-ww-tamoxifen", wirkstoff: "hydroxychloroquin", befund: "retinopathie", einordnung: "wechselwirkung", ww_partner: ["tamoxifen"], kontext: null,
      belege: [
        { quelle: "Q_HCQ_DE_HEUMANN", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Gleichzeitige Anwendung mit Arzneimitteln mit bekannter retinatoxischer Wirkung (z. B. Tamoxifen) wird nicht empfohlen.",
          zitat: "„… (z. B. Tamoxifen), wird nicht empfohlen.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_HCQ_US_PLAQUENIL", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Begleitmedikation wie Tamoxifen ist ein Risikofaktor für Netzhautschäden.",
          zitat: "“use of concomitant drug products such as tamoxifen citrate”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Chloroquin ================= */
    { id: "cq-retinopathie", wirkstoff: "chloroquin", befund: "retinopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Warnings", abschnitt: "Warnings – Retinopathy",
          aussage: "Irreversible Netzhautschädigung beobachtet; bei Patienten asiatischer Herkunft evtl. zuerst außerhalb der Makula.",
          zitat: "“Irreversible retinal damage has been observed in some patients who had received chloroquine.”",
          haeufigkeit: null,
          latenz: "Risikofaktor: Anwendung über 5 Jahre",
          dosisabhaengigkeit: "Risikofaktoren: Tagesdosis über 2,3 mg/kg tatsächliches Körpergewicht, Anwendung > 5 Jahre, eingeschränkte glomeruläre Filtration, Begleitmedikation wie Tamoxifen, vorbestehende Makulaerkrankung",
          reversibilitaet: "irreversibel; Netzhautveränderungen und Sehstörungen können nach Absetzen fortschreiten",
          dringlichkeit: "Bei Verdacht auf okuläre Toxizität absetzen und engmaschig beobachten",
          kontrollen: "Basisuntersuchung innerhalb des ersten Behandlungsjahres (bestkorrigierter Fernvisus, automatisierte Schwellenperimetrie zentral 10°, SD-OCT); jährliche Untersuchungen mit BCVA, Perimetrie und SD-OCT",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_CQ_US_RISING", typ: "Contraindications", abschnitt: "Contraindications",
          aussage: "Anwendung außerhalb der akuten Malaria ist bei Netzhaut- oder Gesichtsfeldveränderungen jeglicher Ursache kontraindiziert.",
          zitat: "“… contraindicated in the presence of retinal or visual field changes of any etiology.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_CQ_US_RISING", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Ocular disorders",
          aussage: "Irreversible Retinopathie mit Netzhautpigmentveränderungen (Schießscheibe) und Gesichtsfelddefekten (parazentrale Skotome) unter Langzeit- oder Hochdosistherapie mit 4-Aminochinolinen berichtet.",
          zitat: "“Irreversible retinopathy with retinal pigmentation changes (bull's eye appearance) and visual field defects …”",
          haeufigkeit: null, latenz: "unter Langzeit- oder Hochdosistherapie", dosisabhaengigkeit: "unter Langzeit- oder Hochdosistherapie berichtet", reversibilitaet: "irreversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_D_AAO2016", typ: "Leitlinie/Empfehlung", abschnitt: "Abstract",
          aussage: "AAO 2016: für Chloroquin Dosis ≤ 2,3 mg/kg Realgewicht empfohlen; Basis-Fundusuntersuchung, jährliches Screening ab 5 Jahren bei akzeptabler Dosis ohne Hauptrisikofaktoren; automatisierte Perimetrie und SD-OCT.",
          zitat: "“using ≤2.3 mg/kg real weight”",
          haeufigkeit: null, latenz: null,
          dosisabhaengigkeit: "empfohlene Tagesdosis ≤ 2,3 mg/kg Realgewicht",
          reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Basis-Fundusuntersuchung; jährliches Screening nach 5 Jahren bei akzeptabler Dosis ohne Hauptrisikofaktoren; automatisierte Perimetrie plus SD-OCT",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "cq-makulopathie", wirkstoff: "chloroquin", befund: "makulopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Ocular disorders",
          aussage: "Makulopathie und Makuladegeneration berichtet, möglicherweise irreversibel.",
          zitat: "“Maculopathy and macular degeneration have been reported and may be irreversible.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: "möglicherweise irreversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "cq-bulls-eye", wirkstoff: "chloroquin", befund: "bulls_eye_makulopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Ocular disorders",
          aussage: "Netzhautpigmentveränderungen mit Schießscheiben-Aspekt im Rahmen der irreversiblen Retinopathie.",
          zitat: "“retinal pigmentation changes (bull's eye appearance)”",
          haeufigkeit: null, latenz: "unter Langzeit- oder Hochdosistherapie", dosisabhaengigkeit: null, reversibilitaet: "irreversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "cq-skotom", wirkstoff: "chloroquin", befund: "skotom", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Ocular disorders",
          aussage: "Gesichtsfelddefekte (parazentrale Skotome); skotomatöses Sehen mit parazentralen, perizentralen Ringskotomen und typischerweise temporalen Skotomen.",
          zitat: "“scotomatous vision with field defects of paracentral, pericentral ring types, and typically temporal scotomas”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "cq-akkommodation", wirkstoff: "chloroquin", befund: "akkommodationsstoerung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Ocular disorders",
          aussage: "Sehstörungen (Verschwommensehen, Schwierigkeiten beim Fokussieren bzw. bei der Akkommodation).",
          zitat: "“Visual disturbances (blurring of vision and difficulty of focusing or accommodation)”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "cq-nachtblindheit", wirkstoff: "chloroquin", befund: "nachtblindheit", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Ocular disorders",
          aussage: "Nyktalopie (Nachtblindheit) berichtet.",
          zitat: "“nyctalopia”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "cq-hornhauttruebung", wirkstoff: "chloroquin", befund: "hornhauttruebung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Ocular disorders",
          aussage: "Reversible Hornhauttrübungen berichtet.",
          zitat: "“Reversible corneal opacities have also been reported.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: "reversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "cq-ww-tamoxifen", wirkstoff: "chloroquin", befund: "retinopathie", einordnung: "wechselwirkung", ww_partner: ["tamoxifen"], kontext: null,
      belege: [
        { quelle: "Q_CQ_US_RISING", typ: "Warnings", abschnitt: "Warnings – Retinopathy",
          aussage: "Begleitmedikation wie Tamoxifen ist ein bedeutender Risikofaktor für Netzhautschäden.",
          zitat: "“use of some concomitant drug products such as tamoxifen citrate”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Pentosanpolysulfat ================= */
    { id: "pps-pigmentaere-makulopathie", wirkstoff: "pentosanpolysulfat", befund: "pigmentaere_makulopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_PPS_EU_ELMIRON", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Seltene Fälle pigmentärer Makulopathie, insbesondere nach Langzeitanwendung. Visuelle Symptome: Schwierigkeiten beim Lesen, Sehstörungen, veränderte Farbwahrnehmung, langsame Anpassung an schlechte Lichtverhältnisse. In der 4.8-Tabelle nicht aufgeführt.",
          zitat: "„Es wurden seltene Fälle von pigmentärer Makulopathie … berichtet, insbesondere nach Langzeitanwendung.“",
          haeufigkeit: "„seltene Fälle“ (Wortlaut 4.4; keine Häufigkeitskategorie, nicht in der 4.8-Tabelle)",
          latenz: "insbesondere nach Langzeitanwendung",
          dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Augenärztliche Untersuchung nach 6-monatiger Anwendung, ohne pathologischen Befund regelmäßig alle 5 Jahre (bei visuellen Beschwerden früher); bei relevanten ophthalmologischen Befunden jährlich",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_PPS_US_ELMIRON", typ: "Warnings", abschnitt: "Warnings – Retinal Pigmentary Changes",
          aussage: "Pigmentveränderungen der Netzhaut (in der Literatur als pigmentäre Makulopathie beschrieben) bei Langzeitanwendung; meist nach ≥ 3 Jahren, auch früher; kumulative Dosis scheint Risikofaktor; Symptome: Leseschwierigkeiten, langsame Anpassung an schwaches Licht, Verschwommensehen.",
          zitat: "“Pigmentary changes in the retina, reported in the literature as pigmentary maculopathy, have been identified with long-term use …”",
          haeufigkeit: null,
          latenz: "meist nach 3 Jahren Anwendung oder länger, Fälle auch nach kürzerer Dauer",
          dosisabhaengigkeit: "kumulative Dosis scheint ein Risikofaktor zu sein",
          reversibilitaet: "Veränderungen möglicherweise irreversibel; Progression auch nach Absetzen möglich",
          dringlichkeit: "Bei Pigmentveränderungen der Netzhaut Nutzen und Risiko der Fortsetzung neu bewerten",
          kontrollen: "Ausführliche Augenanamnese vor Beginn; bei vorbestehenden Augenerkrankungen umfassende Basisuntersuchung (Farbfundusfoto, OCT, Autofluoreszenz) vor Therapiebeginn; Basis-Netzhautuntersuchung (OCT, Autofluoreszenz) für alle innerhalb von 6 Monaten nach Beginn und periodisch; Kontrollen nach Absetzen fortsetzen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA)" },
        { quelle: "Q_PPS_US_ELMIRON", typ: "Adverse Reactions (Postmarketing)", abschnitt: "Adverse Reactions – Post-Marketing Experience",
          aussage: "Pigmentveränderungen der Netzhaut nach der Zulassung berichtet.",
          zitat: "“pigmentary changes in the retina (see WARNINGS)”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht angegeben", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_PPS_B_PSUSA", typ: "PSUSA-Bewertung (PRAC)", abschnitt: "Wissenschaftliche Schlussfolgerungen",
          aussage: "PRAC: in der Literatur selten berichtete pigmentäre Makulopathie, besonders nach Langzeitanwendung; Empfehlung, die Produktinformation um einen Warnhinweis und regelmäßige augenärztliche Untersuchungen zu ergänzen und ein Sicherheitsschreiben (DHPC) zu versenden.",
          zitat: "“In literature, pigmentary maculopathy has been reported rarely, with pentosan polysulfate sodium, especially after long-term use.”",
          haeufigkeit: null, latenz: "besonders nach Langzeitanwendung", dosisabhaengigkeit: null,
          reversibilitaet: "potenziell irreversible, schwerwiegende Erkrankung (Begründung für das Sicherheitsschreiben)", dringlichkeit: null,
          kontrollen: "regelmäßige augenärztliche Untersuchungen zur Früherkennung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_PPS_B_DHPC_AT", typ: "Sicherheitsschreiben (DHPC)", abschnitt: "Zusammenfassung",
          aussage: "Seltene Fälle pigmentärer Makulopathie, insbesondere nach Langzeitanwendung; regelmäßige augenärztliche Untersuchung; Patienten mit Leseschwierigkeiten oder langsamer Anpassung an schlechte Lichtverhältnisse sollen unverzüglich einen Arzt aufsuchen; bei Betroffenen vorsorglich Beendigung der Behandlung erwägen.",
          zitat: "„Es wurden seltene Fälle von pigmentärer Makulopathie unter der Anwendung von Pentosanpolysulfat-Natrium berichtet“",
          haeufigkeit: "„seltene Fälle“ (Wortlaut)", latenz: "insbesondere nach Langzeitanwendung", dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei Sehveränderungen (Leseschwierigkeiten, langsame Adaption an schlechte Lichtverhältnisse) soll der Patient unverzüglich einen Arzt aufsuchen; vorsorglich Beendigung der Behandlung erwägen",
          kontrollen: "regelmäßige augenärztliche Untersuchung, insbesondere bei Langzeiteinnahme",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_PPS_B_RHB_DE", typ: "Rote-Hand-Brief", abschnitt: null,
          aussage: "Deutscher Rote-Hand-Brief (Juli 2019) – Text für das Abrufwerkzeug nicht lesbar.",
          zitat: null, haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "offen", geprueft_am: null, pruefnotiz: "BfArM-Seite liefert nur Navigation." },
        { quelle: "Q_D_PPS2022", typ: "Studie", abschnitt: "Abstract",
          aussage: "Studie zum Makulopathie-Risiko unter PPS – noch nicht geprüft.",
          zitat: null, haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "offen", geprueft_am: null, pruefnotiz: "PubMed per CAPTCHA gesperrt." }
      ], unterschied_notiz: "EU: Warnhinweis in 4.4 mit festem Untersuchungsschema (nach 6 Monaten, dann alle 5 Jahre); USA: Warnhinweis mit Basisuntersuchung innerhalb von 6 Monaten und periodischen Kontrollen." },

    { id: "pps-konjunktivitis", wirkstoff: "pentosanpolysulfat", befund: "konjunktivitis", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_PPS_US_ELMIRON", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Special Senses",
          aussage: "Konjunktivitis unter den unerwünschten Ereignissen mit Häufigkeit ≤ 1 % (Rubrik „Special Senses“).",
          zitat: "“Special Senses: Conjunctivitis, tinnitus, optic neuritis, amblyopia, retinal hemorrhage”",
          haeufigkeit: "≤ 1 %", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "pps-optikusneuritis", wirkstoff: "pentosanpolysulfat", befund: "optikusneuritis", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_PPS_US_ELMIRON", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Special Senses",
          aussage: "Optikusneuritis unter den unerwünschten Ereignissen mit Häufigkeit ≤ 1 % (Rubrik „Special Senses“).",
          zitat: "“Special Senses: Conjunctivitis, tinnitus, optic neuritis, amblyopia, retinal hemorrhage”",
          haeufigkeit: "≤ 1 %", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "pps-netzhautblutung", wirkstoff: "pentosanpolysulfat", befund: "netzhautblutung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_PPS_US_ELMIRON", typ: "Adverse Reactions", abschnitt: "Adverse Reactions – Special Senses",
          aussage: "Netzhautblutung unter den unerwünschten Ereignissen mit Häufigkeit ≤ 1 % (Rubrik „Special Senses“).",
          zitat: "“Special Senses: Conjunctivitis, tinnitus, optic neuritis, amblyopia, retinal hemorrhage”",
          haeufigkeit: "≤ 1 %", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Tamoxifen ================= */
    { id: "tam-katarakt", wirkstoff: "tamoxifen", befund: "katarakt", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Häufig: nur zum Teil reversible Sehstörungen durch Katarakte, Corneatrübungen (selten) und/oder Retinopathien; das Kataraktrisiko steigt mit der Dauer der Einnahme.",
          zitat: "„… (das Risiko für Katarakte steigt mit der Dauer der Tamoxifeneinnahme)“",
          haeufigkeit: "häufig", latenz: "Risiko steigt mit der Dauer der Einnahme", dosisabhaengigkeit: null,
          reversibilitaet: "Sehstörungen nur zum Teil reversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TAM_DE_HEUMANN", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Augenärztliche Untersuchung zu Therapiebeginn; bei Veränderungen der Sehkraft dringend augenärztliche Untersuchung, da sich manche früh erkannte Veränderungen nach Absetzen zurückbilden.",
          zitat: "„Zu Beginn der Therapie mit Tamoxifen sollte eine augenärztliche Untersuchung erfolgen.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "manche im Frühstadium erkannte Veränderungen bilden sich nach Absetzen zurück",
          dringlichkeit: "Bei Veränderungen der Sehkraft dringend augenärztliche Untersuchung",
          kontrollen: "Augenärztliche Untersuchung zu Therapiebeginn",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TAM_US_SOLTAMOX", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Erhöhte Inzidenz von Katarakten und von Kataraktoperationen berichtet; Patientinnen sollen sich bei jeder Sehstörung ärztlich vorstellen.",
          zitat: "“An increased incidence of cataracts and the need for cataract surgery have also been reported.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei jeder Sehstörung ärztliche Vorstellung empfohlen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TAM_US_SOLTAMOX", typ: "Adverse Reactions (Studien)", abschnitt: "6.1 (ATAC-Studie)",
          aussage: "Katarakt in der ATAC-Studie: 7 % unter Tamoxifen vs. 6 % unter Anastrozol.",
          zitat: null,
          haeufigkeit: "7 % (Tamoxifen) vs. 6 % (Anastrozol), ATAC-Studie", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tam-retinopathie", wirkstoff: "tamoxifen", befund: "retinopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Häufig: nur zum Teil reversible Sehstörungen durch Katarakte, Corneatrübungen und/oder Retinopathien.",
          zitat: "„Häufig: nur z. T. reversible Sehstörungen durch Katarakte, Corneatrübungen (selten) und/oder Retinopathien …“",
          haeufigkeit: "häufig (gemeinsame Angabe für Sehstörungen durch Katarakte, Corneatrübungen, Retinopathien)", latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "Sehstörungen nur zum Teil reversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TAM_DE_HEUMANN", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Augenärztliche Untersuchung zu Therapiebeginn; bei Veränderungen der Sehkraft dringend augenärztliche Untersuchung, da sich manche früh erkannte Veränderungen nach Absetzen zurückbilden.",
          zitat: "„… so ist eine augenärztliche Untersuchung dringend vorzunehmen …“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "manche im Frühstadium erkannte Veränderungen bilden sich nach Absetzen zurück",
          dringlichkeit: "Bei Veränderungen der Sehkraft dringend augenärztliche Untersuchung",
          kontrollen: "Augenärztliche Untersuchung zu Therapiebeginn",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TAM_US_SOLTAMOX", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Okuläre Störungen einschließlich Hornhautveränderungen, verminderter Farbwahrnehmung, Netzhautvenenthrombose und Retinopathie berichtet.",
          zitat: "“Ocular disturbances, including corneal changes, decrement in color vision perception, retinal vein thrombosis, and retinopathy …”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei jeder Sehstörung ärztliche Vorstellung empfohlen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tam-hornhauttruebung", wirkstoff: "tamoxifen", befund: "hornhauttruebung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Corneatrübungen (selten) als Ursache nur zum Teil reversibler Sehstörungen.",
          zitat: "„… Corneatrübungen (selten) …“",
          haeufigkeit: "selten", latenz: null, dosisabhaengigkeit: null, reversibilitaet: "Sehstörungen nur zum Teil reversibel", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tam-keratopathie", wirkstoff: "tamoxifen", befund: "keratopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_US_SOLTAMOX", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Hornhautveränderungen unter den berichteten okulären Störungen.",
          zitat: "“corneal changes”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tam-farbsehen", wirkstoff: "tamoxifen", befund: "farbsehstoerung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_US_SOLTAMOX", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Verminderte Farbwahrnehmung unter den berichteten okulären Störungen.",
          zitat: "“decrement in color vision perception”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tam-netzhautvenenthrombose", wirkstoff: "tamoxifen", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_US_SOLTAMOX", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Netzhautvenenthrombose unter den berichteten okulären Störungen.",
          zitat: "“retinal vein thrombosis”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tam-optikusneuropathie", wirkstoff: "tamoxifen", befund: "optikusneuropathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Selten: optische Neuropathie und Optikusneuritis; bei einer geringen Anzahl von Patienten kam es zur Erblindung. Die optische Neuropathie trat im Tamoxifen-Arm der ATAC-Studie nicht auf, wurde aber in anderen Studien bzw. Quellen berichtet.",
          zitat: "„Selten: optische Neuropathie und Optikusneuritis (bei einer geringen Anzahl von Patienten kam es zur Erblindung)“",
          haeufigkeit: "selten", latenz: null, dosisabhaengigkeit: null, reversibilitaet: "bei einer geringen Anzahl von Patienten Erblindung", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tam-optikusneuritis", wirkstoff: "tamoxifen", befund: "optikusneuritis", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TAM_DE_HEUMANN", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Selten: Optikusneuritis (gemeinsam mit optischer Neuropathie genannt); bei einer geringen Anzahl von Patienten kam es zur Erblindung.",
          zitat: "„Selten: optische Neuropathie und Optikusneuritis …“",
          haeufigkeit: "selten", latenz: null, dosisabhaengigkeit: null, reversibilitaet: "bei einer geringen Anzahl von Patienten Erblindung", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },
    /* ================= Trametinib ================= */
    { id: "tram-rped", wirkstoff: "trametinib", befund: "pigmentepithelabhebung", einordnung: "nebenwirkung", kontext: "Monotherapie und Kombination mit Dabrafenib",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Mit Sehstörungen verbundene Erkrankungen einschließlich Ablösung des Netzhautpigmentepithels (RPED) und Netzhautvenenverschluss (RVO) können unter Trametinib auftreten; bei neuen Sehstörungen umgehende augenärztliche Beurteilung.",
          zitat: "„Mit Sehstörungen verbundene Erkrankungen einschließlich Ablösung des Netzhautpigmentepithels (RPED) … können unter Trametinib … auftreten.“",
          haeufigkeit: null, latenz: "zu jedem Zeitpunkt der Therapie", dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei neuen Sehstörungen (vermindertes zentrales Sehvermögen, verschwommenes Sehen, Sehverlust) umgehende augenärztliche Beurteilung",
          kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TRAM_US", typ: "Warnings and Precautions", abschnitt: "5.6",
          aussage: "RPED kann unter Mekinist auftreten; bei RPED Mekinist aussetzen; bei dokumentierter Rückbildung innerhalb von 3 Wochen Wiederaufnahme in gleicher oder reduzierter Dosis.",
          zitat: "“Retinal pigment epithelial detachment (RPED) can occur with MEKINIST.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "Rückbildung bei Kontrolle innerhalb von 3 Wochen möglich (Voraussetzung für Wiederaufnahme)",
          dringlichkeit: "Bei Diagnose einer RPED Mekinist aussetzen",
          kontrollen: "Wiederholte augenärztliche Untersuchung innerhalb von 3 Wochen zur Dokumentation der Rückbildung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA, DailyMed)" }
      ], unterschied_notiz: null },

    { id: "tram-rvo", wirkstoff: "trametinib", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Bei RVO in der Vorgeschichte nicht empfohlen; bei diagnostiziertem RVO Trametinib dauerhaft absetzen.",
          zitat: "„Bei Patienten, bei denen ein RVO diagnostiziert wurde, muss die Behandlung mit Trametinib dauerhaft abgesetzt werden.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RVO Trametinib dauerhaft absetzen; bei neuen Sehstörungen umgehende augenärztliche Beurteilung",
          kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Netzhautvenenverschluss unter Monotherapie gelegentlich.",
          zitat: "„Netzhautvenenverschluss“ (Tabelle Monotherapie: gelegentlich)",
          haeufigkeit: "gelegentlich (Monotherapie)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TRAM_US", typ: "Warnings and Precautions", abschnitt: "5.6",
          aussage: "RVO kann zu Makulaödem, verminderter Sehfunktion, Neovaskularisation und Glaukom führen; bei Sehverlust oder anderen Sehstörungen dringend (innerhalb von 24 Stunden) augenärztliche Untersuchung; bei dokumentiertem RVO dauerhaft absetzen.",
          zitat: "“Urgently (within 24 hours) perform ophthalmological evaluation for patient-reported loss of vision …”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: null,
          dringlichkeit: "Dringend – augenärztliche Untersuchung innerhalb von 24 Stunden bei Sehverlust oder anderen Sehstörungen; bei RVO dauerhaft absetzen",
          kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA, DailyMed)" }
      ], unterschied_notiz: null },

    { id: "tram-chorioretinopathie", wirkstoff: "trametinib", befund: "seroese_retinopathie", einordnung: "nebenwirkung", kontext: "Monotherapie und Kombination mit Dabrafenib",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Chorioretinopathie gelegentlich (Monotherapie und Kombination mit Dabrafenib).",
          zitat: "„Chorioretinopathie“ (Tabellen Monotherapie und Kombination: gelegentlich)",
          haeufigkeit: "gelegentlich", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tram-netzhautabloesung", wirkstoff: "trametinib", befund: "netzhautabloesung", einordnung: "nebenwirkung", kontext: "Monotherapie und Kombination mit Dabrafenib",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Netzhautablösung (Begriff der Fachinformation) gelegentlich (Monotherapie und Kombination mit Dabrafenib).",
          zitat: "„Netzhautablösung“ (Tabellen Monotherapie und Kombination: gelegentlich)",
          haeufigkeit: "gelegentlich", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tram-papillenoedem", wirkstoff: "trametinib", befund: "papillenoedem", einordnung: "nebenwirkung", kontext: "Monotherapie",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Papillenödem gelegentlich (Monotherapie).",
          zitat: "„Papillenödem“ (Tabelle Monotherapie: gelegentlich)",
          haeufigkeit: "gelegentlich (Monotherapie)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tram-periorbitales-oedem", wirkstoff: "trametinib", befund: "periorbitales_oedem", einordnung: "nebenwirkung", kontext: "Monotherapie und Kombination mit Dabrafenib",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Periorbitales Ödem häufig (Monotherapie), gelegentlich (Kombination mit Dabrafenib).",
          zitat: "„Periorbitales Ödem“ (Monotherapie: häufig; Kombination: gelegentlich)",
          haeufigkeit: "häufig (Monotherapie); gelegentlich (Kombination mit Dabrafenib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tram-uveitis", wirkstoff: "trametinib", befund: "uveitis", einordnung: "nebenwirkung", kontext: "Kombination mit Dabrafenib",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "In klinischen Studien unter Kombination mit Dabrafenib Uveitis und Iridozyklitis berichtet.",
          zitat: "„… mit Trametinib in Kombination mit Dabrafenib behandelt wurden, über Uveitis und Iridozyklitis berichtet.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Uveitis häufig unter Kombination mit Dabrafenib.",
          zitat: "„Uveitis“ (Tabelle Kombination mit Dabrafenib: häufig)",
          haeufigkeit: "häufig (Kombination mit Dabrafenib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: "Im US-Label von Mekinist wird bei Uveitis auf die Kombination mit Dabrafenib verwiesen; eine eigene Inzidenz war dort in den Abfragen nicht übereinstimmend zu finden." },

    { id: "tram-verschwommensehen", wirkstoff: "trametinib", befund: "verschwommensehen", einordnung: "nebenwirkung", kontext: "Monotherapie und Kombination mit Dabrafenib",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Bei neuen Sehstörungen wie vermindertem zentralem Sehvermögen, verschwommenem Sehen oder Verlust des Sehvermögens umgehende augenärztliche Beurteilung.",
          zitat: "„… verschwommenes Sehen oder Verlust des Sehvermögens berichten, wird eine umgehende augenärztliche Beurteilung empfohlen.“",
          haeufigkeit: null, latenz: "zu jedem Zeitpunkt der Therapie", dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Umgehende augenärztliche Beurteilung", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Verschwommenes Sehen häufig (Monotherapie und Kombination mit Dabrafenib).",
          zitat: "„Verschwommenes Sehen“ (Monotherapie und Kombination: häufig)",
          haeufigkeit: "häufig", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "tram-sehstoerung", wirkstoff: "trametinib", befund: "sehstoerung", einordnung: "nebenwirkung", kontext: "Monotherapie und Kombination mit Dabrafenib",
      belege: [
        { quelle: "Q_TRAM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Sehstörung häufig (Monotherapie und Kombination mit Dabrafenib); im Warnhinweis 4.4 als Leitsymptom für RPED/RVO genannt.",
          zitat: "„Sehstörung“ (Monotherapie und Kombination: häufig)",
          haeufigkeit: "häufig", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei neuen Sehstörungen umgehende augenärztliche Beurteilung (4.4)", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Binimetinib ================= */
    { id: "bini-rped", wirkstoff: "binimetinib", befund: "pigmentepithelabhebung", einordnung: "nebenwirkung", kontext: "Kombination mit Encorafenib",
      belege: [
        { quelle: "Q_BINI_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Okuläre Nebenwirkungen einschließlich RPED und RVO möglich; bei neuen oder sich verschlimmernden Sehstörungen sofortige ophthalmologische Untersuchung.",
          zitat: "„Bei Anwendung von Binimetinib können okuläre Nebenwirkungen auftreten, einschließlich RPED und RVO.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Sofortige ophthalmologische Untersuchung bei neuer oder sich verschlimmernder Sehstörung",
          kontrollen: "Bei jeder Visite auf Symptome neu aufgetretener oder sich verschlimmernder Sehstörungen untersuchen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_BINI_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "RPED sehr häufig (Kombination mit Encorafenib); in der Combo-450-ISP bei 22,3 % (83/372); mediane Zeit bis zum ersten Ereignis 1,4 Monate.",
          zitat: "„In der Combo-450-ISP trat bei 22,3 % (83/372) der Patienten eine RPED auf.“",
          haeufigkeit: "sehr häufig; 22,3 % (83/372) in der Combo-450-ISP", latenz: "median 1,4 Monate bis zum ersten RPED-Ereignis",
          dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "bini-seroese-retinopathie", wirkstoff: "binimetinib", befund: "seroese_retinopathie", einordnung: "nebenwirkung", kontext: "Kombination mit Encorafenib",
      belege: [
        { quelle: "Q_BINI_US", typ: "Warnings and Precautions", abschnitt: "5.4",
          aussage: "Seröse Retinopathie bei 20 % (COLUMBUS, Kombination mit Encorafenib), symptomatisch bei 8 %, keine Erblindung; mediane Zeit bis zum ersten Ereignis 1,2 Monate (0–17,5 Monate).",
          zitat: "“In COLUMBUS, serous retinopathy occurred in 20% of patients treated with MEKTOVI in combination with encorafenib”",
          haeufigkeit: "20 % (symptomatisch 8 %), COLUMBUS", latenz: "median 1,2 Monate (Bereich 0–17,5 Monate)",
          dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei akutem Sehverlust oder anderen Sehstörungen augenärztliche Untersuchung innerhalb von 24 Stunden",
          kontrollen: "Bei jeder Visite visuelle Symptome erfragen; augenärztliche Untersuchung in regelmäßigen Abständen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA, DailyMed)" }
      ], unterschied_notiz: null },

    { id: "bini-rvo", wirkstoff: "binimetinib", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: "Kombination mit Encorafenib",
      belege: [
        { quelle: "Q_BINI_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Bei RVO in der Anamnese nicht empfohlen; bei Auftreten einer RVO Binimetinib dauerhaft absetzen. In der Nebenwirkungstabelle 4.8 nicht aufgeführt.",
          zitat: "„Bei Auftreten einer RVO sollte Binimetinib dauerhaft abgesetzt werden.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RVO Binimetinib dauerhaft absetzen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_BINI_US", typ: "Warnings and Precautions", abschnitt: "5.4",
          aussage: "RVO ist eine bekannte Klassenwirkung der MEK-Inhibitoren; 1 von 690 Patienten (0,1 %) unter Mektovi mit Encorafenib; bei akutem Sehverlust augenärztliche Untersuchung innerhalb von 24 Stunden; bei dokumentiertem RVO dauerhaft absetzen.",
          zitat: "“RVO is a known class-related adverse reaction of MEK inhibitors …”",
          haeufigkeit: "0,1 % (1/690)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Augenärztliche Untersuchung innerhalb von 24 Stunden bei akutem Sehverlust; bei RVO dauerhaft absetzen",
          kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA, DailyMed)" }
      ], unterschied_notiz: null },

    { id: "bini-uveitis", wirkstoff: "binimetinib", befund: "uveitis", einordnung: "nebenwirkung", kontext: "Kombination mit Encorafenib",
      belege: [
        { quelle: "Q_BINI_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Uveitis häufig (Kombination mit Encorafenib); zur Behandlung wird auf die Fachinformation von Encorafenib verwiesen.",
          zitat: "„Uveitis“ (Tabelle 3: häufig)",
          haeufigkeit: "häufig (Kombination mit Encorafenib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_BINI_US", typ: "Warnings and Precautions", abschnitt: "5.4",
          aussage: "Uveitis einschließlich Iritis und Iridozyklitis unter Mektovi mit Encorafenib; Inzidenz 4 % in COLUMBUS.",
          zitat: "“Uveitis, including iritis and iridocyclitis, has been reported in patients treated with MEKTOVI in combination with encorafenib.”",
          haeufigkeit: "4 % (COLUMBUS)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Bei jeder Visite visuelle Symptome erfragen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA, DailyMed)" }
      ], unterschied_notiz: null },

    { id: "bini-sehstoerung", wirkstoff: "binimetinib", befund: "sehstoerung", einordnung: "nebenwirkung", kontext: "Kombination mit Encorafenib",
      belege: [
        { quelle: "Q_BINI_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Sehstörung sehr häufig (Kombination mit Encorafenib); Sehstörungen waren im Allgemeinen reversibel. Im Warnhinweis 4.4: bei neuer oder sich verschlimmernder Sehstörung sofortige ophthalmologische Untersuchung.",
          zitat: "„Sehstörungen waren im Allgemeinen reversibel.“",
          haeufigkeit: "sehr häufig", latenz: null, dosisabhaengigkeit: null, reversibilitaet: "im Allgemeinen reversibel",
          dringlichkeit: "Sofortige ophthalmologische Untersuchung (4.4)", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Cobimetinib ================= */
    { id: "cobi-seroese-retinopathie", wirkstoff: "cobimetinib", befund: "seroese_retinopathie", einordnung: "nebenwirkung", kontext: "Kombination mit Vemurafenib",
      belege: [
        { quelle: "Q_COBI_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Seröse Retinopathien (Flüssigkeitsansammlung unter den Netzhautschichten) unter MEK-Inhibitoren einschließlich Cotellic; meist als Chorioretinopathie oder Netzhautablösung berichtet; mediane Zeit bis zum ersten Auftreten 1 Monat (0–9 Monate); bei Diagnose aussetzen, bis sich die visuellen Symptome auf Grad ≤ 1 verbessern.",
          zitat: "„Die mediane Zeit bis zum ersten Auftreten der Ereignisse mit seröser Retinopathie betrug 1 Monat (Bereich: 0 bis 9 Monate).“",
          haeufigkeit: null, latenz: "median 1 Monat (Bereich 0–9 Monate)", dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei Diagnose Cotellic aussetzen, bis sich die visuellen Symptome auf Grad ≤ 1 verbessern",
          kontrollen: "Bei jedem Besuch auf neue oder verschlechterte Sehstörungen untersuchen; bei solchen Symptomen augenärztliche Untersuchung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_COBI_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Seröse Retinopathie sehr häufig.",
          zitat: "„Seröse Retinopathie“ (Tabelle: sehr häufig)",
          haeufigkeit: "sehr häufig", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_COBI_US", typ: "Warnings and Precautions", abschnitt: "5.5",
          aussage: "Symptomatische und asymptomatische seröse Retinopathie bei 26 % unter Cotellic mit Vemurafenib, überwiegend als Chorioretinopathie (13 %) oder Netzhautablösung (12 %); erstes Auftreten nach 2 Tagen bis 9 Monaten; bei Diagnose Cotellic unterbrechen, bis sich die Symptome bessern.",
          zitat: "“Symptomatic and asymptomatic serous retinopathy was identified in 26% of patients receiving COTELLIC with vemurafenib.”",
          haeufigkeit: "26 % (Chorioretinopathie 13 %, Netzhautablösung 12 %)", latenz: "2 Tage bis 9 Monate bis zum ersten Auftreten",
          dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei Diagnose Cotellic unterbrechen, bis sich die visuellen Symptome bessern",
          kontrollen: "Augenärztliche Untersuchung in regelmäßigen Abständen und bei neuen oder sich verschlechternden Sehstörungen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" },
        { quelle: "Q_D_MEKAR2017", typ: "Fallserie", abschnitt: "Abstract",
          aussage: "Klinische und morphologische Merkmale der MEK-Inhibitor-assoziierten Retinopathie im Vergleich zur CSC – noch nicht geprüft.",
          zitat: null, haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "offen", geprueft_am: null, pruefnotiz: "PubMed per CAPTCHA gesperrt." }
      ], unterschied_notiz: null },

    { id: "cobi-netzhautabloesung", wirkstoff: "cobimetinib", befund: "netzhautabloesung", einordnung: "nebenwirkung", kontext: "Kombination mit Vemurafenib",
      belege: [
        { quelle: "Q_COBI_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Die meisten Ereignisse seröser Retinopathie wurden als Chorioretinopathie oder als Netzhautablösung berichtet.",
          zitat: "„Die meisten Ereignisse wurden als Chorioretinopathie oder als Netzhautablösung berichtet.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_COBI_US", typ: "Warnings and Precautions", abschnitt: "5.5",
          aussage: "Netzhautablösung bei 12 % (im Rahmen der serösen Retinopathie, Cotellic mit Vemurafenib).",
          zitat: "“The majority of these events were reported as chorioretinopathy (13%) or retinal detachment (12%).”",
          haeufigkeit: "12 %", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "cobi-rvo", wirkstoff: "cobimetinib", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: "Kombination mit Vemurafenib",
      belege: [
        { quelle: "Q_COBI_US", typ: "Warnings and Precautions", abschnitt: "5.5 / 2.3",
          aussage: "In jedem Studienarm entwickelte ein Patient einen Netzhautvenenverschluss; bei RVO Cotellic dauerhaft absetzen.",
          zitat: "“One patient in each arm developed retinal vein occlusion.”",
          haeufigkeit: "je 1 Patient pro Studienarm", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RVO Cotellic dauerhaft absetzen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "cobi-verschwommensehen", wirkstoff: "cobimetinib", befund: "verschwommensehen", einordnung: "nebenwirkung", kontext: "Kombination mit Vemurafenib",
      belege: [
        { quelle: "Q_COBI_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Verschwommenes Sehen sehr häufig; im Warnhinweis 4.4: bei neuer oder verschlechterter Sehstörung augenärztliche Untersuchung.",
          zitat: "„verschwommenes Sehen“ (Tabelle: sehr häufig)",
          haeufigkeit: "sehr häufig", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei neuer oder verschlechterter Sehstörung augenärztliche Untersuchung (4.4)", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Selumetinib ================= */
    { id: "selu-rped", wirkstoff: "selumetinib", befund: "pigmentepithelabhebung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_SELU_EU", typ: "Warnhinweis", abschnitt: "4.2 / 4.4",
          aussage: "Einzelne Fälle von RPED, zentral-seröser Retinopathie (CSR) und RVO bei Erwachsenen mit multiplen Tumorarten (Selumetinib allein oder in Kombination mit anderen Krebsmedikamenten) sowie bei einem einzelnen pädiatrischen Patienten (Wortlaut 4.4); bei RPED/CSR mit reduzierter Sehschärfe Therapie unterbrechen und mit reduzierter Dosis fortsetzen; ohne reduzierte Sehschärfe augenärztliche Untersuchung alle 3 Wochen bis zum Abklingen.",
          zitat: "„Es wurden einzelne Fälle von RPED, CSR und RVO bei erwachsenen Patienten mit multiplen Tumorarten beobachtet, die eine Behandlung mit Selumetinib als Monotherapie und in Kombination mit […] erhielten, sowie bei einem einzelnen pädiatrischen Patienten …“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RPED/CSR mit reduzierter Sehschärfe Behandlung unterbrechen",
          kontrollen: "Augenärztliche Untersuchung vor Behandlungsbeginn und bei jeder neuen Sehstörung; bei RPED/CSR ohne Visusminderung alle 3 Wochen bis zum Abklingen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend; Zitat nach unabhängiger Nachprüfung (04.10.2026) vervollständigt" },
        { quelle: "Q_SELU_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "RPED/CSR gelegentlich (0,6 % bei Erwachsenen).",
          zitat: "„RPED/CSR“ (Tabelle 5: gelegentlich, 0,6 %)",
          haeufigkeit: "gelegentlich (0,6 % bei Erwachsenen)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Koselugo kann okuläre Toxizität einschließlich RVO, RPED, CSR und Verschwommensehen verursachen; bei RPED aussetzen, OCT-Kontrollen alle 3 Wochen bis zur Rückbildung, dann mit reduzierter Dosis fortsetzen.",
          zitat: "“KOSELUGO can cause ocular toxicity, including retinal vein occlusion (RVO), retinal pigment epithelial detachment (RPED) …”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RPED Koselugo aussetzen",
          kontrollen: "Umfassende augenärztliche Untersuchung vor Beginn, in regelmäßigen Abständen und bei neuen oder verschlechterten Sehveränderungen; bei RPED OCT alle 3 Wochen bis zur Rückbildung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (openFDA, DailyMed)" }
      ], unterschied_notiz: null },

    { id: "selu-csr", wirkstoff: "selumetinib", befund: "zentrale_seroese_chorioretinopathie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_SELU_EU", typ: "Warnhinweis", abschnitt: "4.2 / 4.4",
          aussage: "Einzelne Fälle zentral-seröser Retinopathie (CSR) bei Erwachsenen (Selumetinib allein oder in Kombination mit anderen Krebsmedikamenten) sowie bei einem einzelnen pädiatrischen Patienten (Wortlaut 4.4); RPED/CSR in 4.8 gelegentlich (0,6 %); bei reduzierter Sehschärfe Behandlung unterbrechen.",
          zitat: "„Es wurden einzelne Fälle von RPED, CSR und RVO bei erwachsenen Patienten mit multiplen Tumorarten beobachtet, die eine Behandlung mit Selumetinib als Monotherapie und in Kombination mit […] erhielten, sowie bei einem einzelnen pädiatrischen Patienten …“",
          haeufigkeit: "gelegentlich (RPED/CSR, 0,6 % bei Erwachsenen)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei CSR mit reduzierter Sehschärfe Behandlung unterbrechen",
          kontrollen: "Ohne reduzierte Sehschärfe augenärztliche Untersuchung alle 3 Wochen bis zum Abklingen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend; Zitat nach unabhängiger Nachprüfung (04.10.2026) vervollständigt" },
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Zentral-seröse Retinopathie (CSR) als Form der okulären Toxizität genannt.",
          zitat: "“… central serous retinopathy (CSR), and blurred vision.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-rvo", wirkstoff: "selumetinib", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_SELU_EU", typ: "Nebenwirkung", abschnitt: "4.8 / 4.2",
          aussage: "RVO gelegentlich (0,3 % bei Erwachsenen); bei diagnostiziertem RVO Selumetinib dauerhaft absetzen.",
          zitat: "„Bei Patienten mit einem diagnostizierten RVO sollte die Behandlung mit Selumetinib dauerhaft abgesetzt werden“",
          haeufigkeit: "gelegentlich (0,3 % bei Erwachsenen)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RVO dauerhaft absetzen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Bei RVO Koselugo dauerhaft absetzen.",
          zitat: "“Permanently discontinue KOSELUGO in patients with RVO.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RVO dauerhaft absetzen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-subretinale-fluessigkeit", wirkstoff: "selumetinib", befund: "seroese_netzhautabhebung", einordnung: "nebenwirkung", kontext: "pädiatrische Patienten",
      belege: [
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Asymptomatische, vorübergehende subretinale Flüssigkeit (Grad 1) bei 6 % der pädiatrischen Patienten; keine Dosisanpassung nötig, davon 88 % zurückgebildet.",
          zitat: "“Grade 1 asymptomatic transient subretinal fluid was observed in 6% of patients …”",
          haeufigkeit: "6 % (pädiatrisch)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: "88 % zurückgebildet", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-verschwommensehen", wirkstoff: "selumetinib", befund: "verschwommensehen", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_SELU_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Verschwommenes Sehen als Nebenwirkung berichtet (Warnhinweis „Okuläre Toxizität“); Patienten sollen neue Sehstörungen melden.",
          zitat: "„Verschwommenes Sehen wurde als Nebenwirkung bei Patienten berichtet, die Selumetinib erhielten.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Augenärztliche Untersuchung vor Behandlungsbeginn und bei jeder neuen Sehstörung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_SELU_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Verschwommenes Sehen häufig (9 % pädiatrisch, 4 % Erwachsene); im pädiatrischen Pool waren zum Analysezeitpunkt 10 von 11 Patienten genesen.",
          zitat: "„Zum Zeitpunkt der Analyse waren 10 der 11 Patienten genesen.“",
          haeufigkeit: "häufig (9 % pädiatrisch, 4 % Erwachsene)", latenz: null, dosisabhaengigkeit: null,
          reversibilitaet: "10 von 11 pädiatrischen Patienten genesen", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Pädiatrisch: Verschwommensehen, Photophobie, Katarakt, okuläre Hypertension und Netzhautriss zusammen bei 13 %; Erwachsene: Verschwommensehen und Glaskörpertrübungen bei 6 %.",
          zitat: "“… blurred vision, photophobia, cataracts, ocular hypertension, and retinal tear occurred in 13% of pediatric patients …”",
          haeufigkeit: "13 % pädiatrisch (Sammelangabe); 6 % Erwachsene (mit Glaskörpertrübungen)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-katarakt", wirkstoff: "selumetinib", befund: "katarakt", einordnung: "nebenwirkung", kontext: "pädiatrische Patienten",
      belege: [
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Katarakt in der Sammelangabe okulärer Ereignisse bei pädiatrischen Patienten (zusammen 13 %).",
          zitat: "“… blurred vision, photophobia, cataracts, ocular hypertension, and retinal tear occurred in 13% of pediatric patients …”",
          haeufigkeit: "13 % (Sammelangabe mehrerer okulärer Ereignisse, pädiatrisch)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-iod", wirkstoff: "selumetinib", befund: "iod_anstieg", einordnung: "nebenwirkung", kontext: "pädiatrische Patienten",
      belege: [
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Okuläre Hypertension in der Sammelangabe okulärer Ereignisse bei pädiatrischen Patienten (zusammen 13 %).",
          zitat: "“… cataracts, ocular hypertension, and retinal tear occurred in 13% of pediatric patients …”",
          haeufigkeit: "13 % (Sammelangabe mehrerer okulärer Ereignisse, pädiatrisch)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-netzhautriss", wirkstoff: "selumetinib", befund: "netzhautabloesung", einordnung: "nebenwirkung", kontext: "pädiatrische Patienten",
      belege: [
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Netzhautriss in der Sammelangabe okulärer Ereignisse bei pädiatrischen Patienten (zusammen 13 %).",
          zitat: "“… ocular hypertension, and retinal tear occurred in 13% of pediatric patients …”",
          haeufigkeit: "13 % (Sammelangabe mehrerer okulärer Ereignisse, pädiatrisch)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-photophobie", wirkstoff: "selumetinib", befund: "photophobie", einordnung: "nebenwirkung", kontext: "pädiatrische Patienten",
      belege: [
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Photophobie in der Sammelangabe okulärer Ereignisse bei pädiatrischen Patienten (zusammen 13 %).",
          zitat: "“… blurred vision, photophobia, cataracts …”",
          haeufigkeit: "13 % (Sammelangabe mehrerer okulärer Ereignisse, pädiatrisch)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "selu-glaskoerpertruebungen", wirkstoff: "selumetinib", befund: "glaskoerpertruebungen", einordnung: "nebenwirkung", kontext: "Erwachsene",
      belege: [
        { quelle: "Q_SELU_US", typ: "Warnings and Precautions", abschnitt: "5.2",
          aussage: "Bei Erwachsenen (KOMET-Studie) Verschwommensehen und Glaskörpertrübungen zusammen bei 6 %.",
          zitat: "“… blurred vision and vitreous floaters occurred in 6% of patients receiving KOSELUGO.”",
          haeufigkeit: "6 % (Sammelangabe mit Verschwommensehen, Erwachsene)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Mirdametinib ================= */
    { id: "mird-rvo", wirkstoff: "mirdametinib", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: "Erwachsene",
      belege: [
        { quelle: "Q_MIRD_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "In klinischen Studien bei Erwachsenen häufige Fälle von RVO und RPED; bei RVO Mirdametinib dauerhaft absetzen; umfassende ophthalmologische Untersuchung vor Beginn, regelmäßig und bei neuen Sehstörungen.",
          zitat: "„Wenn RVO diagnostiziert wird, ist die Behandlung mit Mirdametinib dauerhaft abzusetzen.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RVO dauerhaft absetzen",
          kontrollen: "Umfassende ophthalmologische Untersuchung vor Behandlungsbeginn, in regelmäßigen Abständen und bei neuen oder sich verschlimmernden Sehstörungen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_MIRD_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Retinaler Venenverschluss häufig (3 % bei Erwachsenen). Augentoxizität bei Erwachsenen: mediane Zeit bis zum ersten Einsetzen 147 Tage, mediane Dauer bis zum Abklingen 267 Tage; Abklingen bei 38 %, Abklingen mit Folgen bei 25 %.",
          zitat: "„Die mediane Zeit bis zum ersten Einsetzen von Augentoxizität bei Erwachsenen betrug 147 Tage.“",
          haeufigkeit: "häufig (3 % bei Erwachsenen)", latenz: "Augentoxizität insgesamt: median 147 Tage bis zum ersten Einsetzen (Erwachsene)",
          dosisabhaengigkeit: null,
          reversibilitaet: "Augentoxizität insgesamt: Abklingen bei 38 %, Abklingen mit Folgen bei 25 %; mediane Dauer bis zum Abklingen 267 Tage",
          dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_MIRD_US", typ: "Warnings and Precautions", abschnitt: "5.1",
          aussage: "RVO bei 2,7 % der Erwachsenen, darunter ein Grad-3-Ereignis mit dauerhaftem Absetzen; bei RVO dauerhaft absetzen.",
          zitat: "“Retinal vein occlusion (RVO) occurred in 2.7% of adult patients …”",
          haeufigkeit: "2,7 % (Erwachsene)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei RVO dauerhaft absetzen",
          kontrollen: "Umfassende augenärztliche Untersuchung vor Beginn, regelmäßig und bei neuen oder verschlechterten Sehveränderungen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "mird-rped", wirkstoff: "mirdametinib", befund: "pigmentepithelabhebung", einordnung: "nebenwirkung", kontext: "Erwachsene",
      belege: [
        { quelle: "Q_MIRD_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Bei symptomatischer RPED Behandlung bis zum Abklingen unterbrechen und bei Fortsetzung Dosis reduzieren; bei RPED ohne verminderte Sehschärfe Fortsetzung möglich mit ophthalmologischer Untersuchung alle 3 Wochen bis zum Abklingen.",
          zitat: "„… eine ophthalmologische Untersuchung muss alle 3 Wochen bis zum Abklingen durchgeführt werden“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei symptomatischer RPED Behandlung unterbrechen",
          kontrollen: "Bei RPED ohne Visusminderung ophthalmologische Untersuchung alle 3 Wochen bis zum Abklingen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_MIRD_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Abhebung des retinalen Pigmentepithels häufig (1 % bei Erwachsenen).",
          zitat: "„Abhebung des retinalen Pigmentepithels (RPED)“ (Tabelle 4: häufig, 1 %)",
          haeufigkeit: "häufig (1 % bei Erwachsenen)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_MIRD_US", typ: "Warnings and Precautions", abschnitt: "5.1",
          aussage: "RPED bei einem erwachsenen Patienten (1,3 %).",
          zitat: "“RPED occurred in one adult patient (1.3%).”",
          haeufigkeit: "1,3 % (1 Erwachsener)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "mird-verschwommensehen", wirkstoff: "mirdametinib", befund: "verschwommensehen", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_MIRD_EU", typ: "Nebenwirkung", abschnitt: "4.8 / 4.4",
          aussage: "Verschwommenes Sehen häufig (9 % Erwachsene, 7 % Kinder); im Warnhinweis 4.4 Anlass für eine umfassende ophthalmologische Untersuchung.",
          zitat: "„Verschwommenes Sehen“ (Tabelle 4: häufig, 9 % Erwachsene)",
          haeufigkeit: "häufig (9 % Erwachsene, 7 % Kinder)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Umfassende ophthalmologische Untersuchung bei neu auftretenden oder sich verschlimmernden Sehstörungen wie verschwommenem Sehen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_MIRD_US", typ: "Warnings and Precautions", abschnitt: "5.1",
          aussage: "Verschwommensehen bei 9 % der Erwachsenen.",
          zitat: "“Blurred vision occurred in 9% of adult patients treated with GOMEKLI.”",
          haeufigkeit: "9 % (Erwachsene)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Dabrafenib ================= */
    { id: "dab-uveitis", wirkstoff: "dabrafenib", befund: "uveitis", einordnung: "nebenwirkung", kontext: "Monotherapie und Kombination mit Trametinib",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Routinemäßige Überwachung auf visuelle Anzeichen und Symptome (verändertes Sehvermögen, Photophobie, Augenschmerzen); bei Uveitis ohne Ansprechen auf Lokaltherapie Dabrafenib bis zum Abklingen aussetzen und eine Dosisstufe niedriger fortsetzen.",
          zitat: "„… routinemäßig auf visuelle Anzeichen und Symptome (wie verändertes Sehvermögen, Photophobie und Augenschmerzen) hin überwacht werden.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei fehlendem Ansprechen auf Lokaltherapie Dabrafenib aussetzen",
          kontrollen: "Routinemäßige Überwachung auf verändertes Sehvermögen, Photophobie, Augenschmerzen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_DAB_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Uveitis gelegentlich (Monotherapie), häufig (Kombination mit Trametinib).",
          zitat: "„Uveitis“ (Monotherapie: gelegentlich; Kombination: häufig)",
          haeufigkeit: "gelegentlich (Monotherapie); häufig (Kombination mit Trametinib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_DAB_US", typ: "Warnings and Precautions", abschnitt: "5.5",
          aussage: "Uveitis bei 1 % (Monotherapie) bzw. 2 % (mit Trametinib) im gepoolten Sicherheitskollektiv; bei Iritis lokale Therapie und Fortsetzung ohne Dosisänderung; bei schwerer Uveitis (Iridozyklitis) oder fehlendem Ansprechen Tafinlar aussetzen.",
          zitat: "“Monitor patients for visual signs and symptoms of uveitis (e.g., change in vision, photophobia, eye pain).”",
          haeufigkeit: "1 % (Monotherapie); 2 % (mit Trametinib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei schwerer Uveitis (Iridozyklitis) oder fehlendem Ansprechen auf Lokaltherapie Tafinlar aussetzen",
          kontrollen: "Überwachung auf Sehveränderung, Photophobie, Augenschmerzen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "dab-panuveitis", wirkstoff: "dabrafenib", befund: "panuveitis", einordnung: "nebenwirkung", kontext: "Kombination mit Trametinib (EU); nach Markteinführung (USA)",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Unter Dabrafenib mit Trametinib Fälle biokulärer Panuveitis oder Iridozyklitis, die auf ein Vogt-Koyanagi-Harada-Syndrom hindeuten; Dabrafenib bis zum Abklingen aussetzen, Ophthalmologen hinzuziehen.",
          zitat: "„Dabrafenib sollte bis zum Abklingen der Augenentzündung ausgesetzt werden und die Konsultation eines Ophthalmologen in Betracht gezogen werden.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Dabrafenib bis zum Abklingen aussetzen; Ophthalmologen hinzuziehen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_DAB_US", typ: "Warnings and Precautions", abschnitt: "5.5",
          aussage: "Fälle biokulärer Panuveitis oder biokulärer Iridozyklitis nach der Markteinführung berichtet.",
          zitat: "“Cases of biocular panuveitis or biocular iridocyclitis have been reported in the post-marketing setting.”",
          haeufigkeit: "Postmarketing – Häufigkeit nicht angegeben", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "dab-vkh", wirkstoff: "dabrafenib", befund: "vkh_aehnliche_uveitis", einordnung: "nebenwirkung", kontext: "Kombination mit Trametinib",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Biokuläre Panuveitis oder Iridozyklitis, die auf ein Vogt-Koyanagi-Harada-Syndrom hindeuten, unter Kombination mit Trametinib berichtet.",
          zitat: "„… die auf das Vogt-Koyanagi-Harada-Syndrom hindeuten.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Dabrafenib bis zum Abklingen aussetzen; Ophthalmologen hinzuziehen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: "Das US-Label nennt biokuläre Panuveitis/Iridozyklitis, erwähnt aber kein Vogt-Koyanagi-Harada-Syndrom (in der geprüften Fassung nicht gefunden)." },

    { id: "dab-rped", wirkstoff: "dabrafenib", befund: "pigmentepithelabhebung", einordnung: "nebenwirkung", kontext: "Kombination mit Trametinib",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "RPED und RVO können unter Dabrafenib in Kombination mit Trametinib auftreten.",
          zitat: "„RPED und RVO können unter Dabrafenib in Kombination mit Trametinib auftreten.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: "Im US-Label von Tafinlar werden RPED und RVO nur als Ausschlusskriterien der Studien genannt, nicht als Nebenwirkung." },

    { id: "dab-rvo", wirkstoff: "dabrafenib", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: "Kombination mit Trametinib",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "RPED und RVO können unter Dabrafenib in Kombination mit Trametinib auftreten.",
          zitat: "„RPED und RVO können unter Dabrafenib in Kombination mit Trametinib auftreten.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: "Im US-Label von Tafinlar werden RPED und RVO nur als Ausschlusskriterien der Studien genannt, nicht als Nebenwirkung." },

    { id: "dab-chorioretinopathie", wirkstoff: "dabrafenib", befund: "seroese_retinopathie", einordnung: "nebenwirkung", kontext: "Kombination mit Trametinib",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Chorioretinopathie gelegentlich (Kombination mit Trametinib).",
          zitat: "„Chorioretinopathie“ (Kombination: gelegentlich)",
          haeufigkeit: "gelegentlich (Kombination mit Trametinib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "dab-netzhautabloesung", wirkstoff: "dabrafenib", befund: "netzhautabloesung", einordnung: "nebenwirkung", kontext: "Kombination mit Trametinib",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Netzhautablösung (Begriff der Fachinformation) gelegentlich (Kombination mit Trametinib).",
          zitat: "„Netzhautablösung“ (Kombination: gelegentlich)",
          haeufigkeit: "gelegentlich (Kombination mit Trametinib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    { id: "dab-periorbitales-oedem", wirkstoff: "dabrafenib", befund: "periorbitales_oedem", einordnung: "nebenwirkung", kontext: "Kombination mit Trametinib",
      belege: [
        { quelle: "Q_DAB_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Periorbitales Ödem gelegentlich (Kombination mit Trametinib).",
          zitat: "„Periorbitales Ödem“ (Kombination: gelegentlich)",
          haeufigkeit: "gelegentlich (Kombination mit Trametinib)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: null },

    /* ================= Encorafenib ================= */
    { id: "enco-uveitis", wirkstoff: "encorafenib", befund: "uveitis", einordnung: "nebenwirkung", kontext: "v. a. Kombination mit Binimetinib",
      belege: [
        { quelle: "Q_ENCO_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Okuläre Nebenwirkungen einschließlich Uveitis, Iritis und Iridozyklitis möglich; bei jeder Visite auf Sehstörungen untersuchen.",
          zitat: "„Bei Anwendung von Encorafenib können okuläre Nebenwirkungen auftreten, einschließlich Uveitis, Iritis und Iridozyklitis.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei neuer oder sich verschlimmernder Sehstörung sofortige ophthalmologische Untersuchung",
          kontrollen: "Bei jeder Visite auf Symptome neu aufgetretener oder sich verschlimmernder Sehstörungen untersuchen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_ENCO_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Uveitis bei 3,5 % (13/372) in der Combo-450-ISP (Kombination mit Binimetinib).",
          zitat: "„In der Combo-450-ISP trat bei 3,5 % (13/372) der Patienten eine Uveitis auf“",
          haeufigkeit: "3,5 % (13/372), Kombination mit Binimetinib", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend; Häufigkeitskategorien der Tabelle widersprüchlich, daher Prozentangabe aus dem Text." },
        { quelle: "Q_ENCO_US", typ: "Warnings and Precautions", abschnitt: "5.6",
          aussage: "Uveitis einschließlich Iritis und Iridozyklitis unter Braftovi mit Binimetinib; Inzidenz 4 % in COLUMBUS; visuelle Symptome bei jeder Visite erfragen, augenärztliche Untersuchung regelmäßig und bei neuen Sehstörungen.",
          zitat: "“In COLUMBUS, the incidence of uveitis among patients treated with BRAFTOVI in combination with binimetinib was 4%.”",
          haeufigkeit: "4 % (COLUMBUS)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Visuelle Symptome bei jeder Visite erfragen; augenärztliche Untersuchung in regelmäßigen Abständen und bei neuen oder sich verschlechternden Sehstörungen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "enco-rped", wirkstoff: "encorafenib", befund: "pigmentepithelabhebung", einordnung: "nebenwirkung", kontext: "Kombination mit Binimetinib",
      belege: [
        { quelle: "Q_ENCO_EU", typ: "Warnhinweis", abschnitt: "4.4 / 4.8",
          aussage: "RPED bei Patienten unter Encorafenib mit Binimetinib beschrieben; 22,3 % (83/372) in der Combo-450-ISP.",
          zitat: "„Eine RPED trat bei 22,3 % (83/372) der Patienten auf“",
          haeufigkeit: "22,3 % (83/372), Kombination mit Binimetinib", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" }
      ], unterschied_notiz: "Im US-Label von Braftovi wird seröse Retinopathie unter „Warnings and Precautions“ nicht genannt (in der geprüften Fassung nicht gefunden); sie steht im Label von Mektovi." },

    { id: "enco-sehstoerung", wirkstoff: "encorafenib", befund: "sehstoerung", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_ENCO_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Bei neu aufgetretener oder sich verschlimmernder Sehstörung (Einschränkung des zentralen Gesichtsfelds, verschwommenes Sehen, Sehverlust) sofortige ophthalmologische Untersuchung.",
          zitat: "„… wird eine sofortige ophthalmologische Untersuchung empfohlen.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Sofortige ophthalmologische Untersuchung",
          kontrollen: "Bei jeder Visite auf Sehstörungen untersuchen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_ENCO_US", typ: "Warnings and Precautions", abschnitt: "5.6",
          aussage: "Visuelle Symptome bei jeder Visite erfragen; augenärztliche Untersuchung regelmäßig und bei neuen oder sich verschlechternden Sehstörungen.",
          zitat: "“Assess for visual symptoms at each visit.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Augenärztliche Untersuchung in regelmäßigen Abständen und bei neuen oder sich verschlechternden Sehstörungen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    /* ================= Vemurafenib ================= */
    { id: "vem-uveitis", wirkstoff: "vemurafenib", befund: "uveitis", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_VEM_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Schwere ophthalmologische Reaktionen einschließlich Uveitis, Iritis und retinalem Venenverschluss berichtet; routinemäßige Überwachung auf ophthalmologische Reaktionen.",
          zitat: "„Schwere ophthalmologische Reaktionen, einschließlich Uveitis, Iritis und retinaler Venenverschluss, sind berichtet worden.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Routinemäßige Überwachung auf ophthalmologische Reaktionen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_VEM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Uveitis häufig.",
          zitat: "„Uveitis“ (Tabelle: häufig)",
          haeufigkeit: "häufig", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_VEM_US", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Uveitis einschließlich Iritis bei 2,1 % (7/336) unter Zelboraf vs. keinem Patienten unter Dacarbazin; ggf. Behandlung mit steroid- und mydriatikahaltigen Augentropfen nötig; Überwachung auf Uveitis-Symptome.",
          zitat: "“In Trial 1, uveitis, including iritis, occurred in 2.1% (7/336) of patients receiving ZELBORAF …”",
          haeufigkeit: "2,1 % (7/336)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Überwachung auf Zeichen und Symptome einer Uveitis",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "vem-iridozyklitis", wirkstoff: "vemurafenib", befund: "uveitis_anterior", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_VEM_EU", typ: "Nebenwirkung", abschnitt: "4.8 / 4.4",
          aussage: "Iridozyklitis gelegentlich (4.8); Iritis im Warnhinweis 4.4 genannt.",
          zitat: "„Iridozyklitis“ (Tabelle: gelegentlich)",
          haeufigkeit: "gelegentlich", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_VEM_US", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Uveitis einschließlich Iritis (2,1 %).",
          zitat: "“uveitis, including iritis, occurred in 2.1% (7/336)”",
          haeufigkeit: "2,1 % (Uveitis einschließlich Iritis)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "vem-rvo", wirkstoff: "vemurafenib", befund: "netzhautvenenverschluss", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_VEM_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Retinaler Venenverschluss unter den berichteten schweren ophthalmologischen Reaktionen.",
          zitat: "„… einschließlich Uveitis, Iritis und retinaler Venenverschluss …“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Routinemäßige Überwachung auf ophthalmologische Reaktionen",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_VEM_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Retinaler Venenverschluss gelegentlich.",
          zitat: "„retinaler Venenverschluss“ (Tabelle: gelegentlich)",
          haeufigkeit: "gelegentlich", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_VEM_US", typ: "Adverse Reactions (Studien)", abschnitt: "6.1",
          aussage: "Netzhautvenenverschluss unter den klinisch relevanten Nebenwirkungen mit Häufigkeit < 10 % bei Melanom-Patienten.",
          zitat: "“Eye disorders: retinal vein occlusion”",
          haeufigkeit: "< 10 % (keine genaue Angabe)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "vem-photophobie", wirkstoff: "vemurafenib", befund: "photophobie", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_VEM_US", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Photophobie kann unter Zelboraf auftreten (Warnhinweis „Ophthalmologic Reactions“).",
          zitat: "“Uveitis, blurry vision, and photophobia can occur in patients treated with ZELBORAF.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "vem-verschwommensehen", wirkstoff: "vemurafenib", befund: "verschwommensehen", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_VEM_US", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Verschwommensehen kann unter Zelboraf auftreten (Warnhinweis „Ophthalmologic Reactions“).",
          zitat: "“Uveitis, blurry vision, and photophobia can occur in patients treated with ZELBORAF.”",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },
    /* ================= S1P-Rezeptor-Modulatoren ================= */
    { id: "fing-makulaoedem", wirkstoff: "fingolimod", befund: "makulaoedem", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_FING_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Makulaödeme mit oder ohne visuelle Symptome bei 0,5 % der Patienten unter 0,5 mg, vorwiegend in den ersten 3–4 Behandlungsmonaten; ophthalmologische Beurteilung 3–4 Monate nach Behandlungsbeginn; erhöhtes Risiko bei Uveitis in der Anamnese oder Diabetes mellitus (dann Untersuchung vor Behandlungsbeginn).",
          zitat: "„Aus diesem Grund wird 3 bis 4 Monate nach Behandlungsbeginn eine ophthalmologische Beurteilung empfohlen.“",
          haeufigkeit: "0,5 % (0,5 mg)", latenz: "vorwiegend in den ersten 3–4 Behandlungsmonaten", dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Ophthalmologische Beurteilung 3–4 Monate nach Behandlungsbeginn; bei Diabetes mellitus oder Uveitis in der Anamnese Untersuchung vor Behandlungsbeginn",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_FING_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Makulaödem gelegentlich; nach Absetzen im Allgemeinen Besserung oder spontane Rückbildung; Rezidivrisiko bei erneuter Exposition nicht untersucht.",
          zitat: "„Nach Absetzen der Behandlung trat im Allgemeinen eine Besserung oder spontane Rückbildung ein.“",
          haeufigkeit: "gelegentlich", latenz: "meist in den ersten 3–4 Monaten", dosisabhaengigkeit: null,
          reversibilitaet: "nach Absetzen im Allgemeinen Besserung oder spontane Rückbildung", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_FING_US", typ: "Warnings and Precautions", abschnitt: "5.4",
          aussage: "S1P-Rezeptor-Modulatoren einschließlich Gilenya sind mit erhöhtem Makulaödem-Risiko verbunden; 0,5 % (4/783) unter 0,5 mg; vorwiegend in den ersten 3–4 Monaten; erhöhtes Risiko bei Uveitis oder Diabetes; Absetzen erwägen; nach Absetzen meist teilweise oder vollständige Rückbildung.",
          zitat: "“Macular edema occurred predominantly during the first 3 to 4 months of therapy.”",
          haeufigkeit: "0,5 % (4/783) unter 0,5 mg; Placebo 0,4 % (3/773)", latenz: "vorwiegend in den ersten 3–4 Therapiemonaten", dosisabhaengigkeit: null,
          reversibilitaet: "nach Absetzen im Allgemeinen teilweise oder vollständig rückläufig, mit oder ohne Behandlung",
          dringlichkeit: "Bei Makulaödem Absetzen erwägen",
          kontrollen: "Fundus einschließlich Makula zu Beginn, nach 3–4 Monaten, periodisch unter Therapie und bei jeder Sehänderung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed); Placebo-Wert bei unabhängiger Nachprüfung (04.10.2026) ergänzt" },
        { quelle: "Q_D_FINGO2020", typ: "Studie", abschnitt: "Abstract",
          aussage: "Inzidenz von Uveitis und Makulaödem unter Fingolimod 0,5 mg – noch nicht geprüft.",
          zitat: null, haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "offen", geprueft_am: null, pruefnotiz: "PubMed per CAPTCHA gesperrt." }
      ], unterschied_notiz: null },

    { id: "sipo-makulaoedem", wirkstoff: "siponimod", befund: "makulaoedem", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_SIPO_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Makulaödem in der Phase-III-Studie häufiger unter Siponimod (1,8 %) als unter Placebo (0,2 %); ophthalmologische Beurteilung 3–4 Monate nach Behandlungsbeginn; Vorsicht bei Diabetes mellitus, Uveitis oder Retinaerkrankung.",
          zitat: "„… häufiger bei mit Siponimod behandelten Patienten (1,8 %) als bei mit Placebo behandelten Patienten (0,2 %) berichtet“",
          haeufigkeit: "1,8 % (Placebo 0,2 %)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null,
          kontrollen: "Ophthalmologische Beurteilung 3–4 Monate nach Behandlungsbeginn",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_SIPO_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Makulaödem häufig; meist innerhalb von 3–4 Monaten, Fälle aber auch nach mehr als 6 Monaten Behandlung; nach Absetzen im Allgemeinen Besserung oder spontane Rückbildung.",
          zitat: "„… wurden Fälle auch bei Patienten, die länger als 6 Monate mit Siponimod behandelt wurden, berichtet“",
          haeufigkeit: "häufig", latenz: "überwiegend innerhalb von 3–4 Monaten; auch nach mehr als 6 Monaten", dosisabhaengigkeit: null,
          reversibilitaet: "nach Absetzen im Allgemeinen Besserung oder spontane Rückbildung", dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_SIPO_US", typ: "Warnings and Precautions", abschnitt: "5.3",
          aussage: "Makulaödem bei 1,8 % unter Mayzent vs. 0,2 % unter Placebo, meist in den ersten vier Monaten; bei Uveitis oder Diabetes in der Anamnese etwa 10 % vs. 2 %; Absetzen erwägen.",
          zitat: "“Macular edema was reported in 1.8% of MAYZENT-treated patients compared to 0.2% of patients receiving placebo.”",
          haeufigkeit: "1,8 % (Placebo 0,2 %); bei Uveitis/Diabetes in der Anamnese ca. 10 % vs. 2 %", latenz: "meist in den ersten vier Therapiemonaten", dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei Makulaödem Absetzen erwägen", kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: null },

    { id: "ozan-makulaoedem", wirkstoff: "ozanimod", befund: "makulaoedem", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_OZAN_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Erhöhtes Risiko für Makulaödeme bei Uveitis, Diabetes mellitus oder Retinaerkrankung (dann augenärztliche Untersuchung vor Beginn und Kontrollen); bei bestätigtem Makulaödem absetzen.",
          zitat: "„… wenn sich der Verdacht bestätigt, ist die Behandlung mit Ozanimod abzusetzen.“",
          haeufigkeit: null, latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei visuellen Symptomen untersuchen; bei bestätigtem Makulaödem absetzen",
          kontrollen: "Bei Diabetes, Uveitis oder Retinaerkrankung augenärztliche Untersuchung vor Behandlungsbeginn und Kontrollen während der Behandlung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_OZAN_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Makulaödem gelegentlich, beobachtet bei Patienten mit vorbestehenden Risikofaktoren oder Begleiterkrankungen.",
          zitat: "„Makulaödem“ (Tabelle: gelegentlich; Fußnote: bei Patienten mit vorbestehenden Risikofaktoren)",
          haeufigkeit: "gelegentlich", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_OZAN_US", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "MS-Studien: Makulaödem bei 0,3 % unter Zeposia und 0,3 % unter Interferon beta-1a; Colitis-ulcerosa-Studien: je 1 Patient (0,2 % bzw. 0,4 %), unter Placebo keiner; erhöhtes Risiko bei Uveitis oder Diabetes; Absetzen nach Nutzen-Risiko-Abwägung erwägen.",
          zitat: "“In MS Study 1 and Study 2, macular edema was observed in 0.3% of patients treated with ZEPOSIA …”",
          haeufigkeit: "0,3 % (MS; Vergleich Interferon beta-1a 0,3 %); 0,2–0,4 % (Colitis ulcerosa, je 1 Patient; Placebo: kein Fall)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei Makulaödem Absetzen nach Nutzen-Risiko-Abwägung erwägen",
          kontrollen: "Fundus einschließlich Makula zu Beginn, periodisch unter Therapie und bei jeder Sehänderung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: "EU: bei bestätigtem Makulaödem „abzusetzen“; USA: Absetzen „erwägen“ (consider discontinuing) nach Nutzen-Risiko-Abwägung." },

    { id: "pone-makulaoedem", wirkstoff: "ponesimod", befund: "makulaoedem", einordnung: "nebenwirkung", kontext: null,
      belege: [
        { quelle: "Q_PONE_EU", typ: "Warnhinweis", abschnitt: "4.4",
          aussage: "Ponesimod erhöht das Risiko für ein Makulaödem; Rate 0,7 % (alle Dosierungen), meist bei vorbestehenden Risikofaktoren; die meisten Fälle innerhalb der ersten 6 Monate; Fundusuntersuchung einschließlich Makula vor Beginn bei allen Patienten; bei bestätigtem Makulaödem absetzen.",
          zitat: "„Ponesimod erhöht das Risiko für ein Makulaödem (siehe Abschnitt 4.8).“",
          haeufigkeit: "0,7 % (alle Dosierungen)", latenz: "meist innerhalb der ersten 6 Therapiemonate", dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei Symptomen ophthalmologisch untersuchen; bei Bestätigung absetzen",
          kontrollen: "Fundusuntersuchung einschließlich Makula bei allen Patienten vor Behandlungsbeginn und bei jeder Veränderung des Sehvermögens",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_PONE_EU", typ: "Nebenwirkung", abschnitt: "4.8",
          aussage: "Makulaödem gelegentlich.",
          zitat: "„Makulaödem“ (Tabelle: gelegentlich)",
          haeufigkeit: "gelegentlich", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null, dringlichkeit: null, kontrollen: null,
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend" },
        { quelle: "Q_PONE_US", typ: "Warnings and Precautions", abschnitt: "5.8",
          aussage: "Makulaödem bei 1,1 % unter Ponvory vs. keinem Patienten unter Teriflunomid 14 mg; erhöhtes Risiko bei Uveitis oder Diabetes; Absetzen nach Nutzen-Risiko-Abwägung erwägen.",
          zitat: "“In Study 1, macular edema was reported in 1.1% of PONVORY-treated patients …”",
          haeufigkeit: "1,1 % (Teriflunomid: 0 %)", latenz: null, dosisabhaengigkeit: null, reversibilitaet: null,
          dringlichkeit: "Bei Makulaödem Absetzen nach Nutzen-Risiko-Abwägung erwägen",
          kontrollen: "Fundus einschließlich Makula zu Beginn, periodisch unter Therapie und bei jeder Sehänderung",
          status: "geprueft", geprueft_am: "2026-10-04", pruefnotiz: "2 Abfragen übereinstimmend (DailyMed)" }
      ], unterschied_notiz: "EU: bei bestätigtem Makulaödem „muss“ abgesetzt werden; USA: Absetzen „erwägen“ nach Nutzen-Risiko-Abwägung." }
  ]
};

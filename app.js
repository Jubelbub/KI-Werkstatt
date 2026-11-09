"use strict";
/* Interaktion des statischen MVP-Clickdummies. Kein Server, kein Build. */

var STORE = "kiw-dummy-v1";
var aktuell = null;
var suchtext = "";
var sucheSeite = { lektion: "", anwendung: "", beitrag: "", impuls: "", live: "", community: "" };
var selbstGeprueft = false;
var editorId = null;
var editorVorgabe = "";
var detailModus = "lesen";
var herkunft = null;

var GLOSSAR = [
  { begriff: "EU-KI-Verordnung", text: "Europäischer Rechtsrahmen für KI-Systeme. In den Inhalten wird Artikel 4 als Qualifizierungspflicht eingeordnet, abhängig von Aufgabe und Verantwortung." },
  { begriff: "Anwendungsfeld", text: "Tätigkeitsbereich, auf den ein Modul das Basiswissen übersetzt. Im Prototyp: Ermittlung, Führung, Verwaltung. Pflichtmetadatum, mehrwertig." },
  { begriff: "Fassungsstand", text: "Datum, an dem die Fassung zuletzt geprüft wurde. Steht am Inhalt, damit Sie die Aktualität einschätzen können." },
  { begriff: "Halluzination", text: "Eine flüssig klingende Antwort, die sachlich falsch ist. Sie ist ein bekannter Fehlertyp und kein Grund, den Versuch abzubrechen." },
  { begriff: "Niveaustufe", text: "Eigenschaft des Inhalts, nicht der Person. Basis, Aufbau oder Spezial. Keine Einstufung, keine Zugangssperre, keine Pflichtreihenfolge." },
  { begriff: "Praxisimpuls", text: "Beitrag der Rubrik „Impulse aus der Praxis“. Zählt als praxisnaher Inhalt und kann der erste Schritt von der Einstiegsseite sein." },
  { begriff: "Sprachmodell", text: "Ein KI-System, das zu einer Anweisung Text vorschlägt. Eine flüssige Antwort belegt noch nicht, dass sie stimmt." },
  { begriff: "Transkription", text: "Automatische Verschriftlichung von Gesprochenem. Was sie leistet, wo sie an Grenzen stößt und welche Prüfschritte bleiben, ist Inhalt, nicht eine Freigabe zur ungeprüften Nutzung." },
  { begriff: "Prompt", text: "Die Anweisung an ein Sprachmodell: Kontext, Aufgabe und gewünschtes Ergebnis." },
  { begriff: "PolTube", text: "Internes Videoportal auf Basis von Vimp. Videos und Dateien liegen dort; die KI-Werkstatt bettet sie ein." },
  { begriff: "H5P", text: "Interaktive Lernbausteine, analog zur Einbindung in Moodle. Im Prototyp sehen Sie den Inhaltstyp Frage." },
  { begriff: "ADFS", text: "Anmeldung über das vorhandene Behördenkonto. Die KI-Werkstatt führt kein eigenes Passwort." }
];

var INHALTE = [
  inhalt({
    id: "transkription", titel: "Automatisierte Transkription in der Vernehmung — so funktioniert's",
    teaser: "Was das System leistet, wo es an Grenzen stößt und welche Prüfschritte bleiben.",
    format: "Video", formatKey: "video", niveau: "basis", dauerMin: 8,
    ergebnis: "Sie benennen drei Prüfschritte, die nach der automatischen Verschriftlichung bei Ihnen bleiben.",
    geprueft: "2026-09-18", fassung: "3", felder: ["Ermittlung"], werkzeug: "Transkription", werkzeugKey: "transkription",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "poltube", anwendungsbezogen: true, pflicht: true,
    lernziel: "Leistung und Grenze der Transkription im Verfahren einordnen.",
    geltungsbereich: "Beschäftigte, die Transkription in der Vernehmung einsetzen.",
    praxis: { rolle: "Sachbearbeitung Ermittlung", taetigkeit: "Eine Vernehmung verschriftlichen und gegenlesen", nutzen: "Ein erster Textentwurf entsteht schneller", grenze: "Abweichungen vom Audio bleiben möglich. Die Prüfung liegt bei der bearbeitenden Person." },
    schritte: [
      { t: "Audio nur im freigegebenen Werkzeug verarbeiten", d: "Welches Werkzeug wofür genutzt werden darf, steht in der maßgeblichen Regelung. Die FAQ gibt dazu nur eine orientierende, gegengezeichnete Antwort." },
      { t: "Abweichungen an zwei Stellen gezielt gegenhören", d: "Namen, Zahlen und Verneinungen sind typische Bruchstellen." },
      { t: "Den Prüfvermerk an den Entwurf heften", d: "Ohne Vermerk geht der Entwurf nicht weiter." }
    ],
    fehler: { text: "Das Transkript ungeprüft in den Vorgang übernehmen, weil es flüssig klingt.", korrektur: "Flüssiger Text ist noch kein Beleg. Gegenhören und den Prüfvermerk setzen." },
    kern: ["Das Werkzeug schreibt einen Entwurf, keinen Vorgang.", "Namen, Zahlen und Verneinungen gegenhören.", "Weitergabe erst mit Prüfvermerk."],
    glossar: ["Transkription", "Sprachmodell"], glossarOk: true, grundlagen: false,
    verwandt: ["ergebnis-pruefen", "halluzinationen"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: [
      { name: "T. Hoffmann", meta: "KPB Borken · vor 4 Tagen", text: "Bei Hintergrundgeräuschen wich das Transkript stark ab. Der Gegencheck an den Zahlen hat das aufgefangen." },
      { name: "Unbekannt", meta: "vor 1 Tag", text: "Das Transkript einfach übernehmen, der Gegencheck ist übertrieben.", gemeldet: true }
    ]
  }),
  inhalt({
    id: "sprachmodelle", titel: "Grundlagen KI: Wie Sprachmodelle Texte erzeugen",
    teaser: "Das Grundprinzip in drei Schritten — und warum eine flüssige Antwort allein nichts beweist.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 25,
    ergebnis: "Sie beantworten eine Frage zum Grundprinzip und prüfen die Lösung selbst.",
    geprueft: "2026-10-02", fassung: "4", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "h5p", anwendungsbezogen: false, grundlagen: true,
    lernziel: "Verstehen, dass ein Sprachmodell wahrscheinliche Folgen bildet und die Aussage nicht selbst prüft.",
    geltungsbereich: "Alle Beschäftigten, unabhängig vom Tätigkeitsfeld. Anschlussfähig als Qualifizierungsnachweis.",
    praxis: null,
    schritte: [
      { t: "Eine Anweisung in drei Teilen lesen", d: "Kontext, Aufgabe, Form des Ergebnisses." },
      { t: "Die Frage im interaktiven Element beantworten", d: "Das Element entspricht einem H5P-Inhaltstyp Frage." },
      { t: "Die Rückmeldung mit dem Merkblatt vergleichen", d: "Das sichtbare Ergebnis ist Ihre eigene Einordnung, nicht eine Note." }
    ],
    fehler: { text: "Eine flüssige Antwort für geprüft halten.", korrektur: "Flüssigkeit ist das Ziel des Modells. Die Prüfung bleibt bei Ihnen. Dafür ist der nächste Inhalt da." },
    kern: ["Das Modell schlägt wahrscheinliche Formulierungen vor.", "Es prüft nicht, ob die Aussage stimmt.", "Deshalb folgt auf jede Nutzung ein Prüfschritt."],
    glossar: ["Sprachmodell", "Prompt", "Halluzination"], glossarOk: true,
    h5p: {
      frage: "Warum beweist eine flüssige Antwort noch nichts?",
      optionen: [
        { t: "Weil das Modell wahrscheinliche Wortfolgen bildet und die Aussage nicht selbst prüft.", ok: true },
        { t: "Weil eine lange Antwort immer falsch ist.", ok: false },
        { t: "Weil ein Sprachmodell keinen Text erzeugen kann.", ok: false }
      ],
      hinweis: "Richtig ist die erste Aussage. Länge und Ton sagen nichts über die Richtigkeit."
    },
    verwandt: ["halluzinationen", "ergebnis-pruefen"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: []
  }),
  inhalt({
    id: "eu-ki", titel: "EU-KI-Verordnung, Artikel 4: Was gilt für meine Rolle?",
    teaser: "Die Qualifizierungspflicht verständlich eingeordnet — nach Aufgabenbereich und Verantwortung.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "aufbau", dauerMin: 6,
    ergebnis: "Sie sehen, welche Grundlage für Ihre Rolle gilt und wo die maßgebliche Regelung steht.",
    geprueft: "2026-01-15", fassung: "2", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Keins", werkzeugKey: "keins",
    thema: ["recht"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: false, grundlagen: true, pflicht: true,
    lernziel: "Artikel 4 der EU-KI-Verordnung der eigenen Rolle zuordnen, ohne die Regelung zu ersetzen.",
    geltungsbereich: "Beschäftigte mit Berührung zu KI-Systemen. Anschlussfähig als Qualifizierungsnachweis.",
    praxis: null,
    schritte: [
      { t: "Die Pflicht an der Aufgabe festmachen, nicht an der Dienstbezeichnung", d: "Wer ein System nutzt oder verantwortet, braucht das passende Grundlagenwissen." },
      { t: "Die interne Regelung als maßgebliche Quelle öffnen", d: "Dieser Artikel ersetzt sie nicht. Er ordnet sie nur ein." }
    ],
    fehler: null,
    kern: ["Artikel 4 betrifft die Qualifizierung der Personen, die KI nutzen.", "Der Umfang hängt von Aufgabe und Verantwortung ab.", "Verbindlich bleibt die interne Regelung."],
    glossar: ["EU-KI-Verordnung", "Niveaustufe"], glossarOk: true,
    verwandt: ["sprachmodelle", "grenzen-daten"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: []
  }),
  inhalt({
    id: "prompt", titel: "Prompt-Engineering I: Präzise Anfragen für Auswertungen",
    teaser: "Vom vagen Auftrag zur brauchbaren Antwort — mit Beispielen aus der Sachbearbeitung.",
    format: "Video", formatKey: "video", niveau: "aufbau", dauerMin: 12,
    ergebnis: "Sie formulieren eine Anweisung mit Kontext, Aufgabe und gewünschter Form.",
    geprueft: "2026-08-20", fassung: "5", felder: ["Ermittlung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen"], ziel: ["ermittlung", "verwaltung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Eine auswertbare Anweisung in eine Reihenfolge bringen.",
    geltungsbereich: "Sachbearbeitung mit freigegebenem Sprachmodell.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Eine Auswertung anweisen", nutzen: "Die Antwort wird brauchbarer, weil Aufgabe und Form klar sind", grenze: "Auch eine gute Anweisung erzeugt keinen Beleg. Die Prüfung bleibt." },
    schritte: [
      { t: "Zuerst den Kontext, dann die Aufgabe", d: "Was liegt vor, was soll entstehen, für wen." },
      { t: "Die Form festlegen", d: "Länge, Gliederung, was nicht verändert werden darf." },
      { t: "Die Antwort an zwei Aussagen des Ausgangstexts prüfen", d: "Siehe den Artikel zu Halluzinationen." }
    ],
    fehler: { text: "Nur „fass das mal zusammen“ schreiben.", korrektur: "Kontext zuerst, dann die Aufgabe, dann die Form. Das ist der häufigste Stolperstein, und er ist normal." },
    kern: ["Kontext vor der Aufgabe.", "Form des Ergebnisses mitgeben.", "Antwort gegen den Ausgangstext halten."],
    glossar: ["Prompt", "Sprachmodell", "Halluzination"], glossarOk: true,
    verwandt: ["halluzinationen", "berichte"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: [
      { name: "M. Kaminski", meta: "PP Dortmund · vor 2 Tagen", text: "Beim ersten Versuch kam bei mir nur Unbrauchbares raus — lag an meinem Prompt, nicht am System. Mit dem Beispiel aus Minute 4 hat es dann funktioniert. Falls jemand denselben Fehler macht: Kontext zuerst, dann die Aufgabe." },
      { name: "J. Weber", meta: "LZPD NRW · vor 2 Tagen", text: "Guter Hinweis — das ist der häufigste Stolperstein. Genau dafür ist die Werkstatt da: ausprobieren, danebenliegen, besser machen. Ergänzend lohnt sich der Artikel zu Halluzinationen als Gegenprobe." },
      { name: "S. Brandt", meta: "KPB Kleve · vor 5 Tagen", text: "Kurze Verständnisfrage: Gilt die Struktur aus dem Video auch für Zusammenfassungen längerer Berichte, oder braucht es da einen anderen Aufbau?" }
    ]
  }),
  inhalt({
    id: "sprachanalyse", titel: "KI-gestützte Sprachanalyse im Ermittlungsverfahren",
    teaser: "Aufzeichnung einer Session mit Fachleuten aus Technik und Recht — Fragen aus der Praxis inklusive.",
    format: "Aufzeichnung", formatKey: "live", niveau: "spezial", dauerMin: 45,
    ergebnis: "Sie kennen die Fragen, die vor einem Einsatz in der eigenen Dienststelle geklärt sein müssen.",
    geprueft: "2026-06-12", fassung: "1", felder: ["Ermittlung"], werkzeug: "Auswertung", werkzeugKey: "auswertung",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Einen Spezialfall einordnen, ohne ihn als Pflichtweg zu verstehen.",
    geltungsbereich: "Ermittlung, frei wählbar. Die Stufe Spezial sperrt niemanden aus.",
    praxis: { rolle: "Ermittlung", taetigkeit: "Sprachanalyse einordnen", nutzen: "Die Fragen aus Technik und Recht stehen an einem Ort", grenze: "Die Aufzeichnung ersetzt weder die Regelung noch die Entscheidung im Verfahren." },
    schritte: [
      { t: "Die beiden Leitfragen notieren", d: "Welches Werkzeug ist freigegeben, und wer prüft das Ergebnis?" },
      { t: "Offene Punkte an die Redaktion melden", d: "Dafür gibt es den Meldebutton, nicht ein Forum." }
    ],
    fehler: null,
    kern: ["Spezialwissen bleibt frei wählbar.", "Die Regelung der Dienststelle bleibt maßgeblich."],
    glossar: ["Anwendungsfeld", "Niveaustufe"], glossarOk: true,
    verwandt: ["transkription", "eu-ki"], autor: "J. Weber", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "halluzinationen", titel: "Halluzinationen erkennen: Drei Prüfschritte für den Alltag",
    teaser: "Woran Sie überzeugend klingende, aber falsche Antworten erkennen — und wie Sie reagieren.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "basis", dauerMin: 5,
    ergebnis: "Drei Prüfschritte, die Sie an einer Antwort selbst anwenden können.",
    geprueft: "2026-09-01", fassung: "3", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen", "ethik"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: true, grundlagen: true,
    lernziel: "Eine überzeugend falsche Antwort erkennen und korrigieren.",
    geltungsbereich: "Alle Beschäftigten mit Sprachmodell.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Einen Entwurf gegen die Quelle halten", nutzen: "Fehler fallen vor der Weitergabe auf", grenze: "Die drei Schritte ersetzen kein Fachurteil." },
    schritte: [
      { t: "Quellenbezug prüfen", d: "Steht die Aussage im Ausgangsmaterial?" },
      { t: "Namen, Daten, Zahlen gegenlesen", d: "Dort reißen erfundene Details besonders oft ein." },
      { t: "Unsicheres kennzeichnen statt glätten", d: "Eine Lücke im Entwurf ist besser als eine erfundene Sicherheit." }
    ],
    fehler: { text: "Die unsichere Stelle umformulieren, damit sie sicherer klingt.", korrektur: "Kennzeichnen Sie die Lücke. Glätten verdeckt den Fehlversuch, statt ihn zu korrigieren." },
    kern: ["Quelle, Zahlen, Lücken.", "Ein Fehlversuch ist normal.", "Kennzeichnen statt glätten."],
    glossar: ["Halluzination", "Sprachmodell"], glossarOk: true,
    verwandt: ["sprachmodelle", "ergebnis-pruefen"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "impuls-auswertung", titel: "Wie wir im Ermittlungsteam die Auswertung umgestellt haben",
    teaser: "Erfahrungsbericht aus vier Monaten Praxis — einschließlich des ersten Fehlversuchs.",
    format: "Impuls", formatKey: "impuls", niveau: "basis", dauerMin: 45,
    ergebnis: "Sie sehen einen realen Ablauf mit Nutzen und Grenze, erzählt aus dem Dienstalltag.",
    geprueft: "2026-07-28", fassung: "2", felder: ["Ermittlung"], werkzeug: "Auswertung", werkzeugKey: "auswertung",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "poltube", anwendungsbezogen: true, impuls: true,
    lernziel: "Einen Praxiswechsel einschließlich des ersten Fehlversuchs nachvollziehen.",
    geltungsbereich: "Ermittlung. Der Beitrag ist ein Praxisimpuls, kein Lehrsatz.",
    praxis: { rolle: "Ermittlungsteam", taetigkeit: "Auswertung umstellen", nutzen: "Das Team arbeitet an einem gemeinsamen Prüfablauf", grenze: "Was in einer Dienststelle trug, ist kein Muster für jede andere." },
    schritte: [
      { t: "Den ersten Fehlversuch anhören", d: "Das Team hatte Ergebnisse zu früh weitergegeben." },
      { t: "Die Kurskorrektur notieren", d: "Seitdem bleibt ein Prüfschritt vor jeder Weitergabe." }
    ],
    fehler: { text: "Den ersten Entwurf als fertige Auswertung behandeln.", korrektur: "Der Fehlversuch war der Anlass für den Prüfschritt. Er wird hier gezeigt, nicht versteckt." },
    kern: ["Praxisimpuls aus dem Dienst, nicht aus der Lehre.", "Der Fehlversuch gehört dazu.", "Übertragbarkeit hat eine Grenze."],
    glossar: ["Praxisimpuls", "Anwendungsfeld"], glossarOk: true,
    verwandt: ["berichte", "transkription"], autor: "T. Hoffmann", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "fuehrung", titel: "KI im eigenen Bereich einführen: Was Führungskräfte vorab klären sollten",
    teaser: "Von der Erwartungshaltung bis zum Umgang mit Skepsis im Team — in fünf Schritten.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "aufbau", dauerMin: 30,
    ergebnis: "Eine Liste der Punkte, die vor dem Rollout geklärt sein müssen.",
    geprueft: "2026-08-04", fassung: "2", felder: ["Führung"], werkzeug: "Keins", werkzeugKey: "keins",
    thema: ["grundlagen"], ziel: ["fuehrung"], medien: "text", anwendungsbezogen: true,
    lernziel: "Den Rollout an Regelung, Erwartung und Skepsis im Team vorbeiführen.",
    geltungsbereich: "Führungskräfte, die ein Werkzeug in ihrem Bereich einführen.",
    praxis: { rolle: "Führung", taetigkeit: "Ein freigegebenes Werkzeug im eigenen Bereich einführen", nutzen: "Erwartungen und Grenzen stehen, bevor das Team startet", grenze: "Die Führung ersetzt weder die fachliche Freigabe noch die Prüfung im Einzelfall." },
    schritte: [
      { t: "Das freigegebene Werkzeug benennen", d: "Kein Rollout an der Regelung vorbei." },
      { t: "Nutzen und Grenze in einem Satz für das Team sagen", d: "Beides gehört in dieselbe Ansage." },
      { t: "Skepsis als Hinweis behandeln, nicht als Widerstand", d: "Offene Fragen gehen in die FAQ oder an die Redaktion." }
    ],
    fehler: null,
    kern: ["Zuerst die Regelung, dann das Werkzeug.", "Nutzen und Grenze gemeinsam benennen.", "Skepsis ist ein Hinweis."],
    glossar: ["Anwendungsfeld", "Niveaustufe"], glossarOk: true,
    verwandt: ["eu-ki", "grenzen-daten"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "schriftverkehr", titel: "Schriftverkehr und Vermerke: Entlastung im Verwaltungsalltag",
    teaser: "Wo Textbausteine sinnvoll unterstützen — und welche Aufgaben ausdrücklich bei Ihnen bleiben.",
    format: "Video", formatKey: "video", niveau: "basis", dauerMin: 7,
    ergebnis: "Ein Vermerksentwurf mit markierten Stellen, die Sie selbst prüfen.",
    geprueft: "2026-09-30", fassung: "2", felder: ["Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Textarbeit entlasten, ohne die Verantwortung abzugeben.",
    geltungsbereich: "Verwaltung.",
    praxis: { rolle: "Verwaltung", taetigkeit: "Einen Vermerk vorstrukturieren", nutzen: "Der erste Aufbau steht schneller", grenze: "Sachverhalt, Wertung und Zeichnung bleiben bei der bearbeitenden Person." },
    schritte: [
      { t: "Nur den erlaubten Textausschnitt verwenden", d: "Was nicht in das Werkzeug gehört, steht im Inhalt dazu." },
      { t: "Gliederung erzeugen lassen, Sachverhalt selbst schreiben", d: "Die Grenze ist bewusst eng." },
      { t: "Markierte Stellen gegen die Akte prüfen", d: "Das ist das sichtbare Ergebnis." }
    ],
    fehler: { text: "Den ganzen Vorgang in ein nicht freigegebenes Werkzeug kopieren, um Zeit zu sparen.", korrektur: "Zeitgewinn zählt nur im freigegebenen Werkzeug und nur für den erlaubten Ausschnitt." },
    kern: ["Gliederung kann unterstützen.", "Sachverhalt und Zeichnung bleiben bei Ihnen.", "Nur das freigegebene Werkzeug."],
    glossar: ["Sprachmodell", "Prompt"], glossarOk: true,
    verwandt: ["berichte", "grenzen-daten"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "verzerrungen", titel: "Verzerrungen in automatisierten Auswertungen erkennen",
    teaser: "Woher systematische Fehler stammen, wie sie sichtbar werden und welche Kontrollen greifen.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "spezial", dauerMin: 11,
    ergebnis: "Sie erkennen an einem Beispiel, woran eine systematische Schieflage sichtbar wird.",
    geprueft: "2026-05-20", fassung: "2", felder: ["Ermittlung", "Führung"], werkzeug: "Auswertung", werkzeugKey: "auswertung",
    thema: ["ethik", "recht"], ziel: ["ermittlung", "fuehrung"], medien: "text", anwendungsbezogen: true,
    lernziel: "Systematische Fehler von Einzelfehlern unterscheiden.",
    geltungsbereich: "Ermittlung und Führung. Frei wählbar auf Stufe Spezial.",
    praxis: { rolle: "Auswertung", taetigkeit: "Eine automatisierte Trefferliste gegenlesen", nutzen: "Schieflagen fallen früher auf", grenze: "Der Artikel macht die Kontrolle nicht entbehrlich." },
    schritte: [
      { t: "Die Trefferliste an den Rändern lesen, nicht nur die ersten Zeilen", d: "Schieflagen zeigen sich oft dort." },
      { t: "Eine Kontrollfrage außerhalb des Vorschlags stellen", d: "Was fehlt in der Liste?" }
    ],
    fehler: null,
    kern: ["Erste Treffer sind keine vollständige Lage.", "Ränder und Lücken mitlesen."],
    glossar: ["Anwendungsfeld"], glossarOk: true,
    verwandt: ["halluzinationen", "sprachanalyse"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "grenzen-daten", titel: "Was nicht in das Werkzeug gehört",
    teaser: "Eine kurze Grenze vor der ersten Nutzung: welche Angaben draußen bleiben und wo die Regelung steht.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "basis", dauerMin: 6,
    ergebnis: "Sie können an einem Beispiel sagen, was Sie nicht in ein Werkzeug geben.",
    geprueft: "2026-10-12", fassung: "1", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen", "recht"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: true, grundlagen: true, pflicht: true,
    lernziel: "Die Grenze der Eingabe vor der ersten Nutzung erkennen.",
    geltungsbereich: "Alle Beschäftigten. Verbindlich ist die maßgebliche Regelung, nicht dieser Artikel.",
    praxis: { rolle: "Beschäftigte ohne KI-Vorerfahrung", taetigkeit: "Vor der ersten Eingabe entscheiden, was draußen bleibt", nutzen: "Der erste Versuch startet im erlaubten Rahmen", grenze: "Dieser Artikel gibt keine Erlaubnis. Er verweist auf die Regelung." },
    schritte: [
      { t: "Die Erlaubnisfrage in der FAQ öffnen", d: "Dort steht die orientierende, gegengezeichnete Antwort und der Verweis." },
      { t: "Vorgangsdaten, Personen und nicht freigegebene Auszüge draußen lassen", d: "Wenn die Gegenzeichnung fehlt, gilt nur der Verweis, ohne orientierende Antwort." }
    ],
    fehler: { text: "Einen Auszug „nur zum Testen“ in ein frei verfügbares Werkzeug geben.", korrektur: "Auch ein Versuch ist eine Nutzung. Es bleibt beim freigegebenen Werkzeug und beim erlaubten Ausschnitt." },
    kern: ["Zuerst die Erlaubnisfrage.", "Vorgangsdaten bleiben draußen.", "Die Regelung ist maßgeblich, der Artikel nur die Orientierung."],
    glossar: ["Sprachmodell", "EU-KI-Verordnung"], glossarOk: true,
    verwandt: ["eu-ki", "schriftverkehr"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "ergebnis-pruefen", titel: "Ergebnisse prüfen, bevor sie weitergehen",
    teaser: "Der eine Schritt, der aus einem Entwurf ein Ergebnis macht, das Sie selbst verantworten können.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 8,
    ergebnis: "Ein Entwurf mit drei markierten Prüfstellen und Ihrem Vermerk.",
    geprueft: "2026-10-12", fassung: "1", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "h5p", anwendungsbezogen: true, grundlagen: true,
    lernziel: "Einen Entwurf in wenigen Minuten selbst prüfen.",
    geltungsbereich: "Alle Beschäftigten.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Einen Entwurf vor der Weitergabe prüfen", nutzen: "Sie sehen, was das Werkzeug geändert hat", grenze: "Der Vermerk gibt die Verantwortung nicht an das Werkzeug ab." },
    schritte: [
      { t: "Drei Stellen markieren: Zahl, Name, Schlussfolgerung", d: "Nur diese drei, damit es im Arbeitsfluss bleibt." },
      { t: "Die Frage im Element beantworten", d: "Sie prüfen selbst, es gibt keine Benotung." },
      { t: "Den Vermerk in einem Satz schreiben", d: "Was Sie geprüft haben und was offen bleibt." }
    ],
    fehler: { text: "Den Entwurf weitergeben, weil die Frist drückt.", korrektur: "Der Prüfvermerk ist der kürzere Weg: drei Stellen, ein Satz. Der Zeitdruck ist ein bekannter Fehlversuch." },
    kern: ["Drei Stellen reichen für den ersten Prüfschritt.", "Der Vermerk gehört zum Ergebnis.", "Frist macht die Prüfung nicht entbehrlich."],
    glossar: ["Halluzination", "Sprachmodell"], glossarOk: true,
    h5p: {
      frage: "Was gehört zu einem weitergabefähigen Entwurf dazu?",
      optionen: [
        { t: "Drei geprüfte Stellen und ein Vermerk, was noch offen ist.", ok: true },
        { t: "Eine flüssige Formulierung, damit niemand nachfragt.", ok: false },
        { t: "Der Hinweis, das Werkzeug habe den Text freigegeben.", ok: false }
      ],
      hinweis: "Das Werkzeug gibt nichts frei. Der Vermerk ist Ihrer."
    },
    verwandt: ["halluzinationen", "berichte"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "alltag-grenzen", titel: "Wo KI im Arbeitsalltag an Grenzen stößt",
    teaser: "Vier Grenzen, die in jedem Tätigkeitsfeld gelten — knapp genug für den Arbeitstag.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "basis", dauerMin: 7,
    ergebnis: "Sie können Nutzen und Grenze eines Einsatzes in je einem Satz sagen.",
    geprueft: "2026-10-05", fassung: "1", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Keins", werkzeugKey: "keins",
    thema: ["grundlagen"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: true, grundlagen: true,
    lernziel: "Nutzen und Grenze zusammen denken.",
    geltungsbereich: "Grundlagenkanon, alle Tätigkeitsfelder.",
    praxis: { rolle: "Beschäftigte/r", taetigkeit: "Vor einem Einsatz Nutzen und Grenze benennen", nutzen: "Die Erwartung wird realistischer", grenze: "Die vier Sätze ersetzen nicht die Regelung zum einzelnen Werkzeug." },
    schritte: [
      { t: "Nutzen in einem Satz", d: "Welche Arbeit wird leichter?" },
      { t: "Grenze in einem Satz", d: "Was bleibt bei der Person?" },
      { t: "Beides stehen lassen", d: "Inhalte arbeiten ohne Drohkulisse und ohne Abwertung der bisherigen Arbeitsweise." }
    ],
    fehler: null,
    kern: ["Nutzen und Grenze gehören zusammen.", "Die bisherige Arbeitsweise wird nicht abgewertet.", "Die Regelung zum Werkzeug bleibt maßgeblich."],
    glossar: ["Niveaustufe", "Anwendungsfeld"], glossarOk: true,
    verwandt: ["grenzen-daten", "sprachmodelle"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "berichte", titel: "Berichte zusammenfassen: mein Vorgehen Schritt für Schritt",
    teaser: "Aufgezeichnet am eigenen Arbeitsplatz — einschließlich der Prüfschritte, die vor jeder Weitergabe erfolgen.",
    format: "Impuls", formatKey: "impuls", niveau: "basis", dauerMin: 9,
    ergebnis: "Ein gekürzter Absatz und die Stellen, die Sie gegen den Ausgangstext prüfen.",
    geprueft: "2026-10-20", fassung: "2", felder: ["Verwaltung", "Ermittlung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung", "ermittlung"], medien: "poltube", anwendungsbezogen: true, impuls: true, grundlagen: false,
    lernziel: "Einen Bericht in unter zehn Minuten auf einen prüfbaren Entwurf kürzen.",
    geltungsbereich: "Verwaltung und Ermittlung, soweit das Sprachmodell freigegeben ist.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Einen langen Bericht für die Leitung kürzen", nutzen: "Ein erster Entwurf steht in wenigen Minuten", grenze: "Der Ausgangstext bleibt die Quelle. Die Verantwortung für den Inhalt bleibt bei der Person." },
    schritte: [
      { t: "Den erlaubten Ausschnitt wählen", d: "Keine Vorgangsdaten in ein nicht freigegebenes Werkzeug." },
      { t: "Anweisung mit Zweck, Länge und Adressat", d: "Das ist der Prompt: Kontext, Aufgabe, Form." },
      { t: "Absatz gegen den Ausgangstext halten", d: "Zahlen, Namen, Verneinungen." },
      { t: "Prüfvermerk dazuschreiben", d: "Damit ist das Ergebnis sichtbar und selbst geprüft." }
    ],
    fehler: { text: "Die ganze Akte kopieren, weil das Kürzen dann „genauer“ wirkt.", korrektur: "Der kleinere, erlaubte Ausschnitt ist der richtige Weg. Der Fehlversuch ist häufig und kein Grund aufzuhören." },
    kern: ["Nur der erlaubte Ausschnitt.", "Zweck, Länge, Adressat.", "Gegenlesen und Prüfvermerk."],
    glossar: ["Prompt", "Sprachmodell", "Praxisimpuls"], glossarOk: true,
    verwandt: ["schriftverkehr", "ergebnis-pruefen"], autor: "R. Demir", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "skeptikerin", titel: "„Ich war die Skeptikerin im Team“ — ein Erfahrungsbericht",
    teaser: "Was den Ausschlag gab, wo die Vorbehalte berechtigt waren und welche Fragen bis heute offen sind.",
    format: "Impuls", formatKey: "impuls", niveau: "basis", dauerMin: 18,
    ergebnis: "Sie hören, welche Vorbehalte berechtigt blieben und welche sich in der Praxis gelegt haben.",
    geprueft: "2026-09-09", fassung: "1", felder: ["Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["fuehrung", "verwaltung"], medien: "poltube", anwendungsbezogen: true, impuls: true,
    lernziel: "Skepsis als Erfahrung ernst nehmen, nicht als Defizit.",
    geltungsbereich: "Freiwilliger Praxisimpuls.",
    praxis: { rolle: "Teammitglied", taetigkeit: "Den ersten Einsatz im Team begleiten", nutzen: "Vorbehalte werden besprechbar", grenze: "Offene Fragen bleiben offen. Der Beitrag beantwortet sie nicht mit einer Parole." },
    schritte: [
      { t: "Die berechtigten Vorbehalte von den unbelegten trennen", d: "Beides kommt im Beitrag vor." },
      { t: "Eine offene Frage für die FAQ notieren", d: "Wenn sie wiederkehrt, verdichtet die Redaktion sie später. Ein Forum ist dafür im MVP nicht da." }
    ],
    fehler: null,
    kern: ["Skepsis ist ein normaler Einstieg.", "Berechtigte Vorbehalte bleiben sichtbar.", "Offene Fragen werden nicht glattgezogen."],
    glossar: ["Praxisimpuls"], glossarOk: true,
    verwandt: ["fuehrung", "alltag-grenzen"], autor: "A. Lindner", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "review-offen", titel: "Protokoll kürzen mit dem internen Sprachmodell",
    teaser: "Eingereichte Lerneinheit, vollständig in den Pflichtmerkmalen, wartet auf Freigabe.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 8,
    ergebnis: "Ein gekürzter Protokollabsatz und ein Satz Prüfvermerk.",
    geprueft: "", fassung: "2", vorher: "Fassung 1 wurde zurückgegeben, weil das Ergebnis fehlte.",
    felder: ["Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung"], medien: "h5p", anwendungsbezogen: true,
    lernziel: "Ein Protokoll auf das Wesentliche kürzen und den Entwurf selbst prüfen.",
    geltungsbereich: "Verwaltung.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Ein Protokoll für die Akte kürzen", nutzen: "Der erste Entwurf ist kürzer und gegliedert", grenze: "Der Protokollinhalt bleibt von der bearbeitenden Person zu verantworten." },
    schritte: [
      { t: "Zweck und Länge in die Anweisung schreiben", d: "Für die Akte, höchstens eine halbe Seite." },
      { t: "Die H5P-Frage zum Prüfvermerk beantworten", d: "Selbst prüfen, ohne Benotung." }
    ],
    fehler: { text: "Kürzen, bis der Sachverhalt leichter klingt, als er ist.", korrektur: "Länge kürzen, Bedeutung stehen lassen. Der Prüfvermerk nennt, was unverändert bleiben muss." },
    kern: ["Kürzen ohne den Sachverhalt zu glätten.", "Prüfvermerk gehört dazu."],
    glossar: ["Prompt", "Sprachmodell"], glossarOk: true,
    h5p: {
      frage: "Was darf beim Kürzen nicht verloren gehen?",
      optionen: [
        { t: "Der Sachverhalt, auch wenn der Text kürzer wird.", ok: true },
        { t: "Die höfliche Einleitung.", ok: false },
        { t: "Möglichst viele Adjektive.", ok: false }
      ],
      hinweis: "Kürzen betrifft die Länge, nicht die Bedeutung."
    },
    verwandt: ["berichte"], autor: "Content Creator (Demo)", autorRolle: "creator", status: "review", kommentare: []
  }),
  inhalt({
    id: "review-luecke", titel: "Lagebild mit einem Sprachmodell",
    teaser: "Entwurf ohne Pflichtmerkmale. Die Freigabe bleibt gesperrt, bis Niveau, Ergebnis, Umfang und Begriffe stehen.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "", dauerMin: 16,
    ergebnis: "",
    geprueft: "", fassung: "1", felder: [], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "text", anwendungsbezogen: true,
    lernziel: "",
    geltungsbereich: "",
    praxis: { rolle: "", taetigkeit: "Lagebild vorformulieren", nutzen: "", grenze: "" },
    schritte: [{ t: "Rohfassung", d: "Noch ohne Einordnung und ohne erklärte Begriffe." }],
    fehler: null, kern: [], glossar: [], glossarOk: false,
    verwandt: [], autor: "Content Creator (Demo)", autorRolle: "creator", status: "review", kommentare: []
  }),
  inhalt({
    id: "entwurf-vermerk", titel: "Vermerk strukturieren",
    teaser: "Eigener Entwurf, noch nicht eingereicht.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 8,
    ergebnis: "Ein Vermerk mit Gliederung und offenen Prüfpunkten.",
    geprueft: "", fassung: "1", felder: ["Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Einen Vermerk so vorbereiten, dass die Sachaussage bei der Person bleibt.",
    geltungsbereich: "Verwaltung.",
    praxis: { rolle: "Verwaltung", taetigkeit: "Vermerk gliedern", nutzen: "Der Aufbau steht, bevor der Sachverhalt geschrieben wird", grenze: "Die Sachaussage wird nicht an das Werkzeug abgegeben." },
    schritte: [{ t: "Gliederung ja, Sachverhalt selbst", d: "Entspricht der Zuordnung: Ablauf als Schrittfolge, Bewertung als eigener Text." }],
    fehler: null,
    kern: ["Gliederung kann das Werkzeug.", "Die Sachaussage bleibt bei Ihnen."],
    glossar: ["Sprachmodell"], glossarOk: true,
    verwandt: ["schriftverkehr"], autor: "Content Creator (Demo)", autorRolle: "creator", status: "entwurf", kommentare: []
  }),
  inhalt({
    id: "beitrag-pruefschritt", titel: "Ein Prüfschritt, der im Team hängen geblieben ist",
    teaser: "Kurzer Beitrag dazu, wie ein Team die Gegenprobe fest in den Ablauf genommen hat.",
    format: "Beitrag", formatKey: "beitrag", modul: "beitrag", beitrag: true,
    niveau: "basis", dauerMin: 6,
    ergebnis: "Die Gegenprobe steht neben der Aussage, bevor sie in den Vermerk kommt.",
    geprueft: "2026-10-02", fassung: "1", felder: ["Ermittlung"], werkzeug: "AnyChat", werkzeugKey: "anychat", kiTool: "anychat",
    thema: ["methodik"], themaKey: ["methodik"], ziel: ["ermittlung"], medien: "text",
    anwendungsbezogen: true, grundlagen: false,
    text: "Wir haben verabredet, jede übernommene Aussage gegen die Quelle zu halten, bevor sie in den Vermerk kommt. Der Beitrag hält fest, wie das im Team hängen geblieben ist.",
    schritte: [{ t: "Quelle danebenlegen", d: "Die Aussage und die Fundstelle stehen im selben Blick." }],
    kern: ["Der Prüfschritt ist verabredet.", "Die Quelle bleibt neben der Aussage."],
    verwandt: ["ergebnis-pruefen", "halluzinationen"], autor: "A. Lindner", status: "veroeffentlicht",
    einwilligung: true, erlaubnis: true, geaendert: "2026-10-02", kommentare: []
  })
];

function inhalt(c) {
  c.niveauLabel = c.niveau === "basis" ? "Basis" : c.niveau === "aufbau" ? "Aufbau" : c.niveau === "spezial" ? "Spezial" : "Offen";
  c.dauer = c.dauerMin ? c.dauerMin + " Min." : "Dauer offen";
  c.kommentare = c.kommentare || [];
  c.kern = c.kern || [];
  c.glossar = c.glossar || [];
  return c;
}

function leerZustand() {
  return {
    rolle: "teilnehmer",
    einfach: false,
    behoerde: "LAFP NRW",
    feedback: {},
    kommentare: {},
    kommentarWeg: {},
    kommentarFlags: {},
    meldungen: [],
    status: {},
    override: {},
    eigene: [],
    prominent: "berichte",
    ernennungen: {
      creator: { hb: true, jw: false, th: false, rd: false, al: false },
      redaktion: { hb: true, jw: true, th: true, rd: false, al: false },
      admin: { hb: true, jw: false, th: false, rd: false, al: false }
    },
    extra: { start: 0, null: 0, bereits: 0, frage: 0, inhalte: {} },
    fortschritt: {},
    editRechte: {},
    notizen: {},
    liveTeilnahme: { "live-prompt": true },
    communityMit: { skepsis: true },
    stichprobe: {},
    pruefdatum: {}
  };
}

function laden() {
  var basis = leerZustand();
  var altMod = null;
  try {
    var roh = JSON.parse(localStorage.getItem(STORE) || "{}");
    altMod = roh.moderationsrechte || null;
    Object.keys(basis).forEach(function (k) {
      if (roh[k] !== undefined) basis[k] = roh[k];
    });
  } catch (e) { /* Prototyp bleibt mit dem Ausgangsstand nutzbar. */ }
  if (basis.rolle === "teilnehmende") basis.rolle = "creator";
  if (basis.rolle === "beschaeftigte") basis.rolle = "teilnehmer";
  if (["teilnehmer", "creator", "redaktion", "admin"].indexOf(basis.rolle) < 0) basis.rolle = "teilnehmer";
  if (!basis.ernennungen || !basis.ernennungen.creator || !basis.ernennungen.redaktion || !basis.ernennungen.admin) {
    basis.ernennungen = leerZustand().ernennungen;
    if (altMod) basis.ernennungen.redaktion = altMod;
  }
  return basis;
}

var state = laden();

function sichern() {
  localStorage.setItem(STORE, JSON.stringify(state));
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
  });
}

function datum(iso) {
  if (!iso) return "noch nicht geprüft";
  var t = iso.split("-");
  if (t.length !== 3) return iso;
  return t[2] + "." + t[1] + "." + t[0];
}

function alle() {
  var liste = INHALTE.map(anwenden);
  (state.eigene || []).forEach(function (e) {
    if (!INHALTE.some(function (i) { return i.id === e.id; })) liste.push(anwenden(e));
  });
  return liste;
}

function anwenden(c) {
  var o = (state.override && state.override[c.id]) || {};
  var m = Object.assign({}, c, o);
  if (o.praxis) m.praxis = Object.assign({}, c.praxis || {}, o.praxis);
  if (state.status && state.status[c.id]) m.status = state.status[c.id];
  if (state.pruefdatum && state.pruefdatum[c.id]) m.geprueft = state.pruefdatum[c.id];
  m.niveauLabel = m.niveau === "basis" ? "Basis" : m.niveau === "aufbau" ? "Aufbau" : m.niveau === "spezial" ? "Spezial" : "Offen";
  m.dauer = m.dauerMin ? m.dauerMin + " Min." : "Dauer offen";
  m.felder = m.felder || [];
  m.kern = m.kern || [];
  m.glossar = m.glossar || [];
  m.kommentare = c.kommentare || [];
  return m;
}

function byId(id) {
  var fund = null;
  alle().some(function (c) { if (c.id === id) { fund = c; return true; } return false; });
  return fund;
}

function authAktiv() {
  return sessionStorage.getItem("kiw-auth") === "1";
}

function mangel(c) {
  var m = [];
  if (!c) return ["Inhalt fehlt."];
  if (c.formatKey === "faq" || c.modul === "faq") {
    if (!c.titel) m.push("Titel fehlt.");
    if (!c.text) m.push("Antwort fehlt.");
    return m;
  }
  if (!c.niveau) m.push("Niveaustufe fehlt. Genau eine Stufe ist Pflicht.");
  if (!c.felder || !c.felder.length) m.push("Anwendungsfeld fehlt.");
  if (!themaSchluessel(c).length) m.push("Thema fehlt.");
  if (c.formatKey === "live" && (!c.liveDatum || !c.liveZeit)) m.push("Termin fehlt. Datum und Uhrzeit gehören an die Session.");
  return m;
}

function stiftSvg() {
  return "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z\"/></svg>";
}

function stiftKnopf(id, mitText) {
  var klasse = mitText ? "btn-line stift" : "stift";
  var text = mitText ? "<span>Bearbeiten</span>" : "";
  return "<button type=\"button\" class=\"" + klasse + "\" data-action=\"bearbeiten\" data-id=\"" + esc(id) + "\" aria-label=\"Bearbeiten\">" + stiftSvg() + text + "</button>";
}

function ueberfaellig(c) {
  if (!c.geprueft || c.status !== "veroeffentlicht") return false;
  var t = new Date(c.geprueft + "T00:00:00");
  var grenze = new Date("2026-11-02T00:00:00");
  grenze.setDate(grenze.getDate() - 180);
  return t < grenze;
}

function bump(key) {
  state.extra[key] = (state.extra[key] || 0) + 1;
  sichern();
}

function bumpInhalt(id) {
  state.extra.inhalte[id] = (state.extra.inhalte[id] || 0) + 1;
  sichern();
}

function aufrufeInhalt(c) {
  var basis = { transkription: 640, sprachmodelle: 980, "eu-ki": 720, prompt: 1104, sprachanalyse: 340, halluzinationen: 860, "impuls-auswertung": 540, fuehrung: 410, schriftverkehr: 390, verzerrungen: 260, "grenzen-daten": 210, "ergebnis-pruefen": 180, "alltag-grenzen": 150, berichte: 470, skeptikerin: 300 };
  return (basis[c.id] || 40) + ((state.extra.inhalte && state.extra.inhalte[c.id]) || 0);
}

function mitBegriffen(text) {
  var terms = GLOSSAR.map(function (g) { return g.begriff; }).sort(function (a, b) { return b.length - a.length; });
  var src = String(text || "");
  var tokens = [];
  while (src.length) {
    var best = null;
    terms.forEach(function (t) {
      var i = src.indexOf(t);
      if (i >= 0 && (!best || i < best.i || (i === best.i && t.length > best.t.length))) best = { i: i, t: t };
    });
    if (!best) { tokens.push({ k: "t", v: src }); break; }
    if (best.i > 0) tokens.push({ k: "t", v: src.slice(0, best.i) });
    tokens.push({ k: "b", v: best.t });
    src = src.slice(best.i + best.t.length);
  }
  return tokens.map(function (tok) {
    if (tok.k === "t") return esc(tok.v);
    return "<button type=\"button\" class=\"term\" data-begriff=\"" + esc(tok.v) + "\">" + esc(tok.v) + "</button>";
  }).join("");
}

function rolleLabel(r) {
  return { teilnehmer: "Teilnehmer", creator: "Content Creator", redaktion: "Redaktion", admin: "Administration" }[r] || "Teilnehmer";
}

function rolleHinweis(r) {
  return {
    teilnehmer: "Teilnehmer: Sie lesen und nutzen die Inhalte. Anlegen ist nicht dabei.",
    creator: "Content Creator: Sie legen Inhalte an und pflegen Meine Inhalte.",
    redaktion: "Redaktion: Sie geben frei und legen ebenfalls an.",
    admin: "Administration: Sie ernennen Rollen und sehen den Betrieb."
  }[r] || "";
}

function hatErnennung(art, id) {
  var rechte = (state.ernennungen && state.ernennungen[art]) || {};
  return !!rechte[id || "hb"];
}

function darfVerwalten() {
  return state.rolle === "admin" && hatErnennung("admin");
}

function darfFreigeben() {
  if (darfVerwalten()) return true;
  return state.rolle === "redaktion" && hatErnennung("redaktion");
}

function kannAnlegen() {
  if (state.rolle === "creator") return hatErnennung("creator");
  if (state.rolle === "redaktion") return hatErnennung("redaktion");
  if (state.rolle === "admin") return hatErnennung("admin");
  return false;
}

var PERSONEN = [
  { id: "hb", name: "Henning Beckmann", stelle: "LAFP NRW", sitzung: true },
  { id: "jw", name: "J. Weber", stelle: "LZPD NRW" },
  { id: "th", name: "T. Hoffmann", stelle: "KPB Borken" },
  { id: "rd", name: "R. Demir", stelle: "PP Köln" },
  { id: "al", name: "A. Lindner", stelle: "KPB Gütersloh" }
];


var TEILNAHME_START = { sprachmodelle: 1, halluzinationen: 1 };

function istUrheber(c) {
  if (!c) return false;
  if (c.autorId === "hb" || c.autor === "Henning Beckmann") return true;
  return (state.eigene || []).some(function (e) { return e.id === c.id && (!e.autor || e.autor === "Henning Beckmann" || e.autorId === "hb"); });
}

function hatEditRecht(c) {
  if (!c) return false;
  var rechte = (state.editRechte && state.editRechte[c.id]) || {};
  return !!rechte.hb;
}

function kannBearbeitenInhalt(c) {
  return istUrheber(c) || hatEditRecht(c);
}

function fortschrittVon(c) {
  if (!c || kannBearbeitenInhalt(c)) return "";
  var stand = state.fortschritt && state.fortschritt[c.id];
  if (stand === "abgeschlossen" || stand === "begonnen") return stand;
  if (TEILNAHME_START[c.id]) return "begonnen";
  return "";
}

function merkeBegonnen(c) {
  if (!c || c.status !== "veroeffentlicht" || kannBearbeitenInhalt(c)) return;
  if (fortschrittVon(c) === "abgeschlossen") return;
  state.fortschritt = state.fortschritt || {};
  if (state.fortschritt[c.id] === "begonnen") return;
  state.fortschritt[c.id] = "begonnen";
  sichern();
}

function istEigen(c) {
  return kannBearbeitenInhalt(c);
}

function istImpuls(c) {
  return !!(c && (c.impuls || c.formatKey === "impuls"));
}

function istLiveSession(c) {
  return !!(c && c.formatKey === "live" && !istImpuls(c) && c.medien !== "iframe" && c.medien !== "poltube" && c.medien !== "h5p");
}

var THEMA_ALT = { grundlagen: "methodik", recht: "recht-ethik", ethik: "recht-ethik", einsatzfelder: "daten" };
var TOOL_ALT = { sprachmodell: "anychat", transkription: "lingua", auswertung: "visualchat", keins: "" };
var THEMA_LABEL = {
  methodik: "Methodik",
  "recht-ethik": "Recht/Ethik",
  daten: "Daten",
  "generative-ki": "Generative KI",
  automatisierung: "Automatisierung",
  "vibe-coding": "Vibe-Coding",
  uebersetzung: "Übersetzung/Transkription"
};
var TOOL_LABEL = { anychat: "AnyChat", lingua: "Lingua", translate: "Translate", visualchat: "VisualChat" };

function themaSchluessel(c) {
  if (!c) return [];
  var roh = (c.themaKey && c.themaKey.length) ? c.themaKey : (c.thema || []);
  var out = [];
  roh.forEach(function (t) {
    var n = THEMA_ALT[t] || t;
    if (THEMA_LABEL[n] && out.indexOf(n) < 0) out.push(n);
  });
  return out;
}

function toolSchluessel(c) {
  if (!c) return "";
  if (c.kiTool && TOOL_LABEL[c.kiTool]) return c.kiTool;
  if (TOOL_LABEL[c.werkzeugKey]) return c.werkzeugKey;
  return TOOL_ALT[c.werkzeugKey] || "";
}

function mapThemaString(s) {
  var out = [];
  String(s || "").split(/\s+/).forEach(function (t) {
    var n = THEMA_ALT[t] || t;
    if (THEMA_LABEL[n] && out.indexOf(n) < 0) out.push(n);
  });
  return out.join(" ");
}

function mapToolString(s) {
  if (TOOL_LABEL[s]) return s;
  return TOOL_ALT[s] || "";
}

function schreibeFilterDaten(el, c) {
  if (!el || !c) return;
  el.dataset.thema = themaSchluessel(c).join(" ");
  el.dataset.werkzeug = toolSchluessel(c);
  el.dataset.zielgruppe = (c.ziel || []).join(" ");
}

function istFaq(c) {
  return !!(c && (c.formatKey === "faq" || c.modul === "faq"));
}

function istBeitrag(c) {
  return !!(c && !istFaq(c) && (c.beitrag || c.formatKey === "beitrag" || c.modul === "beitrag"));
}

function istLektion(c) {
  return !!(c && !istImpuls(c) && !istLiveSession(c) && !istBeitrag(c) && !istFaq(c));
}

function istBasismodul(c) {
  return !!(istLektion(c) && (c.grundlagen === true || c.modul === "basis"));
}

function istAnwendungsmodul(c) {
  return !!(istLektion(c) && !istBasismodul(c));
}

function artName(c) {
  if (istImpuls(c)) return "Praxisimpuls";
  if (istBeitrag(c)) return "Beitrag";
  if (istBasismodul(c)) return "Basismodul";
  if (istAnwendungsmodul(c)) return "Anwendungsmodul";
  if (istLiveSession(c)) return "Live-Session";
  if (istFaq(c)) return "FAQ-Eintrag";
  return "Inhalt";
}

function meinArt(c) {
  if (istUrheber(c)) return "Erstellt";
  if (hatEditRecht(c)) return "Darf bearbeiten";
  return "";
}

function showView(name, opt) {
  opt = opt || {};
  if (name !== "sso" && !authAktiv()) name = "sso";
  if (name === "editor") { detailModus = "bearbeiten"; name = "player"; }
  if (name === "review") { detailModus = "lesen"; name = "player"; }
  if ((name === "redaktion" || name === "mod-freigabe" || name === "mod-kommentare" || name === "mod-pruefung" || name === "statistik") && !darfFreigeben()) name = "home";
  if ((name === "player" && detailModus === "bearbeiten" || name === "meine" || name === "leitfaden") && !kannAnlegen()) name = "dashboard";
  if (name === "admin" && !darfVerwalten()) name = "dashboard";
  document.body.classList.toggle("sso", name === "sso");
  document.querySelectorAll(".view").forEach(function (v) {
    v.hidden = v.id !== "view-" + name;
  });
  if (name === "player") {
    if (detailModus === "bearbeiten") renderEditor(document.getElementById("view-player"));
    else renderPlayer();
  }
  if (name === "summary") renderSummary();
  if (name === "glossar") renderGlossar();
  if (name === "profil") renderProfil();
  if (name === "meine") renderMeine();
  if (name === "redaktion") renderRedaktion();
  if (name === "mod-freigabe" || name === "mod-kommentare" || name === "mod-pruefung") renderModBereich(name.replace("mod-", ""));
  if (name === "statistik") renderStatistik();
  if (name === "admin") renderAdmin();
  if (name === "leitfaden") { /* statisches HTML */ }
  if ((name === "inhalte" || name === "anwendung" || name === "beitrag" || name === "impulse" || name === "live" || name === "community") && typeof window.filtern === "function") window.filtern();
  if (name === "suche") renderSuche();
  if (name === "lauf-begonnen" || name === "lauf-abgeschlossen" || name === "impuls-begonnen" || name === "impuls-abgeschlossen") renderFortschritt();
  markNav(name, opt.anker || "");
  if (opt.anker) {
    var ziel = document.getElementById(opt.anker);
    if (ziel) {
      try { ziel.scrollIntoView({ block: "start" }); } catch (e) { /* Prototyp bleibt bedienbar, auch ohne Scroll-API. */ }
    }
    return;
  }
  try { window.scrollTo(0, 0); } catch (e) { /* siehe oben */ }
  if (!opt.leise) {
    var h = document.querySelector("#view-" + name + " h1, #view-" + name + " h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
  }
}

function markNav(name, anker) {
  var bereich = name;
  if (name === "leitfaden") bereich = "meine";
  else if (name === "player" || name === "summary" || name === "glossar") {
    bereich = (herkunft && herkunft.nav) || (detailModus === "bearbeiten" ? "meine" : "inhalte");
    if (herkunft) anker = herkunft.anker || "";
  }
  if (name === "statistik" || name.indexOf("mod-") === 0) bereich = "redaktion";
  if (name === "lauf-begonnen" || name === "lauf-abgeschlossen") bereich = "inhalte";
  if (name === "impuls-begonnen" || name === "impuls-abgeschlossen") bereich = "impulse";
  if (name === "anwendung") bereich = "anwendung";
  if (name === "beitrag") bereich = "beitrag";
  document.querySelectorAll("header nav a").forEach(function (a) {
    var an = false;
    if (a.dataset.anker) an = bereich === "inhalte" && anker === a.dataset.anker;
    else if (a.dataset.view === "meine") an = bereich === "meine";
    else an = a.dataset.nav === bereich;
    if (an) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  var btn = document.getElementById("nav-inhalte-btn");
  if (btn) {
    var inhaltAktiv = bereich === "inhalte" || bereich === "anwendung" || bereich === "beitrag" || bereich === "impulse" || bereich === "live" || bereich === "community" || bereich === "meine";
    if (inhaltAktiv) btn.setAttribute("aria-current", "page");
    else btn.removeAttribute("aria-current");
  }
}

function hubKachel(k) {
  var anker = k[1] ? " data-anker=\"" + k[1] + "\"" : "";
  var text = k[3] ? "<span class=\"hub-text\">" + k[3] + "</span>" : "";
  return "<button type=\"button\" class=\"hub-tile\" data-view-jump=\"" + k[0] + "\"" + anker + "><span class=\"hub-titel\">" + k[2] + "</span>" + text + "<span class=\"go\">Öffnen</span></button>";
}

function renderHub() {
  var box = document.getElementById("hub-kacheln");
  if (!box) return;
  var kacheln = [];
  if (kannAnlegen()) kacheln.push(["meine", "", "Meine Inhalte", "Anlegen und das, was Sie bearbeiten dürfen."]);
  kacheln.push(
    ["inhalte", "", "Basismodule", "Grundlagenkanon, begonnen und abgeschlossen."],
    ["anwendung", "", "Anwendungsmodule", "Anwendungsbezogene Einheiten."],
    ["impulse", "", "Praxisimpulse", "Beiträge aus dem Dienstalltag."],
    ["beitrag", "", "Beitrag", "Kurze Beiträge neben den Modulen."],
    ["live", "", "Live-Sessions", "Ihre Teilnahmen und verfügbare Termine."],
    ["community", "", "Community", "Bereiche, in denen Sie mitwirken, und weitere Communitys."],
    ["faq", "", "Häufige Fragen", "Verlässliche Antworten zum Einstieg."]
  );
  if (darfFreigeben()) kacheln.push(["redaktion", "", "Redaktion", "Freigaben und gemeldete Kommentare."]);
  if (darfVerwalten()) kacheln.push(["admin", "", "Administration", "Ernennungen, Anbindung und Betrieb."]);
  box.innerHTML = kacheln.map(hubKachel).join("");
}

function renderNav() {
  var nav = document.querySelector("header nav");
  if (!nav) return;
  var links = "";
  if (kannAnlegen()) links += "<a href=\"#meine-inhalte\" data-nav=\"meine\" data-view=\"meine\">Meine Inhalte</a>";
  links += "<a href=\"#basismodule\" data-nav=\"inhalte\" data-view=\"inhalte\">Basismodule</a>" +
    "<a href=\"#anwendungsmodule\" data-nav=\"anwendung\" data-view=\"anwendung\">Anwendungsmodule</a>" +
    "<a href=\"#praxisimpulse\" data-nav=\"impulse\" data-view=\"impulse\">Praxisimpulse</a>" +
    "<a href=\"#beitrag\" data-nav=\"beitrag\" data-view=\"beitrag\">Beitrag</a>" +
    "<a href=\"#live\" data-nav=\"live\" data-view=\"live\">Live-Sessions</a>" +
    "<a href=\"#community\" data-nav=\"community\" data-view=\"community\">Community</a>";
  var html = "<a href=\"#dashboard\" data-nav=\"dashboard\" data-view=\"dashboard\">Dashboard</a>" +
    "<div class=\"nav-drop\">" +
    "<button type=\"button\" class=\"nav-drop-btn\" id=\"nav-inhalte-btn\" data-nav-toggle aria-expanded=\"false\" aria-controls=\"nav-inhalte-sub\">Inhalte</button>" +
    "<div class=\"nav-sub\" id=\"nav-inhalte-sub\" hidden>" + links + "</div></div>";
  if (darfFreigeben()) html += "<a href=\"#redaktion\" data-nav=\"redaktion\" data-view=\"redaktion\">Redaktion</a>";
  if (darfVerwalten()) html += "<a href=\"#admin\" data-nav=\"admin\" data-view=\"admin\">Administration</a>";
  wendeAnlage();
  html += "<a href=\"#faq\" data-nav=\"faq\" data-view=\"faq\">FAQ</a>";
  nav.innerHTML = html;
}

function renderProfilKnopf() {
  document.getElementById("profile-name").textContent = "Henning Beckmann";
  document.getElementById("profile-role").textContent = rolleLabel(state.rolle);
  document.getElementById("einfach-toggle").setAttribute("aria-pressed", state.einfach ? "true" : "false");
  document.getElementById("einfach-toggle").classList.toggle("active", !!state.einfach);
  document.body.classList.toggle("einfach", !!state.einfach);
  document.querySelectorAll("[data-rolle]").forEach(function (b) {
    b.classList.toggle("active", b.dataset.rolle === state.rolle);
  });
}

function wendeEinfach() {
  document.querySelectorAll("[data-einfach]").forEach(function (el) {
    if (!el.dataset.standard) el.dataset.standard = el.textContent;
    el.textContent = state.einfach ? el.dataset.einfach : el.dataset.standard;
  });
}

function toast(text) {
  var t = document.getElementById("toast");
  t.textContent = text;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { t.hidden = true; }, 4200);
}

function dialog(opts) {
  var root = document.getElementById("dialog");
  document.getElementById("dialog-title").textContent = opts.titel;
  document.getElementById("dialog-body").innerHTML = opts.html || "";
  var actions = document.getElementById("dialog-actions");
  actions.innerHTML = "";
  (opts.aktionen || []).forEach(function (a) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = a.zweite ? "btn-line" : "btn-solid";
    b.textContent = a.label;
    b.addEventListener("click", function () { a.fn && a.fn(); if (!a.offen) root.hidden = true; });
    actions.appendChild(b);
  });
  root.hidden = false;
  var first = actions.querySelector("button");
  if (first) first.focus();
}

function dialogZu() {
  document.getElementById("dialog").hidden = true;
}

function oeffneAusbau(titel, text) {
  dialog({
    titel: titel,
    html: "<p>" + text + "</p><p class=\"modal-note\">Im MVP-Entwurf ausdrücklich der späteren Ausbaustufe zugeordnet. Der Prototyp zeigt die Stelle, führt die Funktion aber nicht aus.</p>",
    aktionen: [{ label: "Schließen", zweite: true }]
  });
}

var playerKurz = false;

function spurSchritt(label, view, anker) {
  return { label: label, view: view, anker: anker || "" };
}

function herkunftSetzen(id) {
  var start = spurSchritt("Startseite", "home");
  var katalog = {
    home: { id: "home", nav: "home", anker: "", spur: [start] },
    meine: { id: "meine", nav: "meine", anker: "", spur: [start, spurSchritt("Meine Inhalte", "meine")] },
    dashboard: { id: "dashboard", nav: "dashboard", anker: "", spur: [start, spurSchritt("Dashboard", "dashboard")] },
    allgemein: { id: "allgemein", nav: "inhalte", anker: "", spur: [start, spurSchritt("Basismodule", "inhalte")] },
    anwendung: { id: "anwendung", nav: "anwendung", anker: "", spur: [start, spurSchritt("Anwendungsmodule", "anwendung")] },
    beitrag: { id: "beitrag", nav: "beitrag", anker: "", spur: [start, spurSchritt("Beitrag", "beitrag")] },
    begonnen: { id: "begonnen", nav: "inhalte", anker: "", spur: [start, spurSchritt("Basismodule", "inhalte"), spurSchritt("Begonnene Basismodule", "lauf-begonnen")] },
    abgeschlossen: { id: "abgeschlossen", nav: "inhalte", anker: "", spur: [start, spurSchritt("Basismodule", "inhalte"), spurSchritt("Abgeschlossene Basismodule", "lauf-abgeschlossen")] },
    impulse: { id: "impulse", nav: "impulse", anker: "", spur: [start, spurSchritt("Praxisimpulse", "impulse")] },
    "impuls-begonnen": { id: "impuls-begonnen", nav: "impulse", anker: "", spur: [start, spurSchritt("Praxisimpulse", "impulse"), spurSchritt("Begonnene Praxisimpulse", "impuls-begonnen")] },
    "impuls-abgeschlossen": { id: "impuls-abgeschlossen", nav: "impulse", anker: "", spur: [start, spurSchritt("Praxisimpulse", "impulse"), spurSchritt("Abgeschlossene Praxisimpulse", "impuls-abgeschlossen")] },
    live: { id: "live", nav: "live", anker: "", spur: [start, spurSchritt("Live-Sessions", "live")] },
    community: { id: "community", nav: "community", anker: "", spur: [start, spurSchritt("Community", "community")] },
    suche: { id: "suche", nav: "home", anker: "", spur: [start, spurSchritt("Suche", "suche")] },
    freigabe: { id: "freigabe", nav: "redaktion", anker: "", spur: [start, spurSchritt("Moderation", "redaktion"), spurSchritt("Zur Freigabe", "mod-freigabe")] },
    kommentare: { id: "kommentare", nav: "redaktion", anker: "", spur: [start, spurSchritt("Moderation", "redaktion"), spurSchritt("Kommentare", "mod-kommentare")] },
    pruefung: { id: "pruefung", nav: "redaktion", anker: "", spur: [start, spurSchritt("Moderation", "redaktion"), spurSchritt("Prüfdaten", "mod-pruefung")] },
    faq: { id: "faq", nav: "faq", anker: "", spur: [start, spurSchritt("FAQ", "faq")] }
  };
  herkunft = katalog[id] || katalog.allgemein;
}

function herkunftAusElement(el) {
  if (!el || !el.closest) return "";
  if (el.closest("#view-suche")) return "suche";
  if (el.closest("#view-meine, #inhalte-eigene")) return "meine";
  if (el.closest("#view-impuls-begonnen, #impulse-begonnen")) return "impuls-begonnen";
  if (el.closest("#view-impuls-abgeschlossen, #impulse-abgeschlossen")) return "impuls-abgeschlossen";
  if (el.closest("#view-impulse, #impulse, #impulse-eigene")) return "impulse";
  if (el.closest("#view-mod-freigabe")) return "freigabe";
  if (el.closest("#view-mod-kommentare")) return "kommentare";
  if (el.closest("#view-mod-pruefung")) return "pruefung";
  if (el.closest("#view-lauf-begonnen, #inhalte-begonnen")) return "begonnen";
  if (el.closest("#view-lauf-abgeschlossen, #inhalte-abgeschlossen")) return "abgeschlossen";
  if (el.closest("#view-live, #live")) return "live";
  if (el.closest("#view-community, #community")) return "community";
  if (el.closest("#view-anwendung, #anwendung-grid")) return "anwendung";
  if (el.closest("#view-beitrag, #beitrag-grid")) return "beitrag";
  if (el.closest("#view-dashboard")) return "dashboard";
  if (el.closest("#katalog-grid, .bereich-allgemein")) return "allgemein";
  if (el.closest("#view-faq")) return "faq";
  if (el.closest("#view-home, #lager")) return "home";
  return "";
}

function krumenHtml(titel) {
  if (!herkunft) herkunftSetzen("allgemein");
  var spur = herkunft.spur || [];
  var zurueck = spur[spur.length - 1] || spurSchritt("Startseite", "home");
  var ankerAttr = zurueck.anker ? " data-anker=\"" + esc(zurueck.anker) + "\"" : "";
  var back = "<button type=\"button\" class=\"backlink\" data-view-jump=\"" + esc(zurueck.view) + "\"" + ankerAttr + ">← " + esc(zurueck.label) + "</button>";
  var teile = spur.map(function (s) {
    var a = s.anker ? " data-anker=\"" + esc(s.anker) + "\"" : "";
    return "<button type=\"button\" data-view-jump=\"" + esc(s.view) + "\"" + a + ">" + esc(s.label) + "</button>";
  });
  teile.push("<span aria-current=\"page\">" + esc(titel) + "</span>");
  return back + "<nav class=\"krumen\" aria-label=\"Brotkrumen\">" + teile.join("<span class=\"krumen-sep\" aria-hidden=\"true\">/</span>") + "</nav>";
}

function oeffneInhalt(id, kurz, anker, el) {
  var c = byId(id);
  if (!c) return;
  var sichtbar = c.status === "veroeffentlicht" || kannBearbeitenInhalt(c) || darfFreigeben();
  if (!sichtbar) {
    toast("Dieser Inhalt ist noch nicht veröffentlicht.");
    return;
  }
  var gefunden = herkunftAusElement(el);
  if (gefunden) herkunftSetzen(gefunden);
  else if (!herkunft) herkunftSetzen("allgemein");
  aktuell = id;
  playerKurz = !!kurz;
  detailModus = "lesen";
  selbstGeprueft = false;
  if (c.status === "veroeffentlicht") {
    bumpInhalt(id);
    merkeBegonnen(c);
    if (typeof window.filtern === "function") window.filtern();
  }
  showView("player", { anker: anker || "" });
}

function kommentareVon(c) {
  if (!c) return [];
  var basis = (c.kommentare || []).map(function (k, i) {
    return Object.assign({ key: "b" + i }, k);
  });
  var extra = ((state.kommentare && state.kommentare[c.id]) || []).map(function (k, i) {
    return Object.assign({ key: "e" + i }, k);
  });
  var weg = (state.kommentarWeg && state.kommentarWeg[c.id]) || {};
  var flags = (state.kommentarFlags && state.kommentarFlags[c.id]) || {};
  return basis.concat(extra).filter(function (k) { return !weg[k.key]; }).map(function (k) {
    if (flags[k.key]) k.gemeldet = true;
    return k;
  });
}

function kommentarBlock(c) {
  var liste = kommentareVon(c);
  var kommentare = liste.map(function (k) {
    var loesch = (darfFreigeben() || k.eigen)
      ? "<button type=\"button\" class=\"textbtn\" data-action=\"kommentar-loeschen\" data-key=\"" + esc(k.key) + "\" data-id=\"" + esc(c.id) + "\">Löschen</button>"
      : "";
    var melden = k.gemeldet
      ? "<span class=\"st review\">Gemeldet</span>"
      : "<button type=\"button\" class=\"textbtn\" data-action=\"kommentar-melden\" data-key=\"" + esc(k.key) + "\">Melden</button>";
    return "<div class=\"comment\" id=\"kommentar-" + esc(k.key) + "\"><div class=\"c-av a\">" + esc((k.name || "?").slice(0, 1)) + "</div><div class=\"c-body\"><div class=\"c-name\">" + esc(k.name) + " <span>" + esc(k.meta || "gerade eben") + "</span></div><div class=\"c-text\">" + esc(k.text) + "</div><div class=\"c-actions\">" + melden + loesch + "</div></div></div>";
  }).join("");
  var fb = state.feedback[c.id];
  var zahl = liste.length === 1 ? "1 Beitrag" : liste.length + " Beiträge";
  return "<div id=\"kommentar-bereich\" class=\"form-card\"><h2>War das brauchbar?</h2><p class=\"meta-line\">Eine Rückmeldung, ein Klick. Die Moderation sieht nur die Summe.</p>"
    + "<div class=\"facebtns\"><button type=\"button\" class=\"facebtn" + (fb === "up" ? " active" : "") + "\" data-fb=\"up\" aria-pressed=\"" + (fb === "up" ? "true" : "false") + "\"><span aria-hidden=\"true\">☺</span> Hat mir weitergeholfen</button>"
    + "<button type=\"button\" class=\"facebtn" + (fb === "down" ? " active" : "") + "\" data-fb=\"down\" aria-pressed=\"" + (fb === "down" ? "true" : "false") + "\"><span aria-hidden=\"true\">☹</span> Hat mir nicht weitergeholfen</button></div>"
    + "<div class=\"dhead\"><h2>Kommentar zu diesem Inhalt</h2><span>" + zahl + "</span></div>"
    + (kommentare || "<p class=\"meta-line\">Noch kein Kommentar. Die erste Rückfrage steht unter Ihrem Namen.</p>")
    + "<form class=\"comment-form\" id=\"kommentar-form\"><label class=\"field\"><span>Rückfrage unter Ihrem Namen</span><textarea name=\"text\" required rows=\"3\" placeholder=\"Was ist unklar geblieben?\"></textarea></label><button class=\"btn-solid\" type=\"submit\">Kommentar senden</button></form></div>";
}

function wendeAnlage() {
  var anbieten = document.getElementById("impuls-anbieten");
  if (anbieten) anbieten.hidden = !kannAnlegen();
  var block = document.querySelector("#view-meine .anlegen");
  if (block) block.hidden = !kannAnlegen();
}

function editRechtKasten(c) {
  if (!kannAnlegen() || !istUrheber(c)) return "";
  var zeilen = PERSONEN.filter(function (p) { return p.id !== "hb"; }).map(function (p) {
    var rechte = (state.editRechte && state.editRechte[c.id]) || {};
    var an = !!rechte[p.id];
    return "<div class=\"listrow\"><div><strong>" + esc(p.name) + "</strong><div class=\"meta-line\">" + esc(p.stelle) + "</div></div><div>" + (an ? "darf bearbeiten" : "nur lesen") + "</div><button type=\"button\" class=\"btn-line\" data-action=\"edit-recht\" data-person=\"" + esc(p.id) + "\" data-id=\"" + esc(c.id) + "\" aria-pressed=\"" + (an ? "true" : "false") + "\">" + (an ? "Recht entziehen" : "Recht geben") + "</button></div>";
  }).join("");
  return "<div class=\"form-card\"><h2>Wer darf bearbeiten</h2><p>Sie haben den Inhalt erstellt. Andere dürfen ihn nur bearbeiten, wenn Sie das Recht hier vergeben.</p><div class=\"list\">" + zeilen + "</div></div>";
}

function moderationKasten(c) {
  if (!darfFreigeben() || !c || c.status === "veroeffentlicht") return "";
  var punkte = mangel(c);
  var lis = punkte.length
    ? punkte.map(function (p) { return "<li class=\"bad\">" + esc(p) + "</li>"; }).join("")
    : "<li class=\"ok\">Pflichtmerkmale vollständig. Freigabe schaltet den Inhalt sichtbar.</li>";
  return "<div class=\"form-card mod-kasten\" id=\"freigabe-kasten\"><h2>Freigabe</h2><p>Dieselbe Ansicht wie für alle anderen. Hier kommt nur die Entscheidung dazu.</p><ul class=\"pruef\">" + lis + "</ul>"
    + "<label class=\"field\"><span>Begründung, nötig bei Rückgabe</span><textarea id=\"freigabe-grund\" rows=\"3\"></textarea></label>"
    + "<div class=\"button-row\"><button type=\"button\" class=\"btn-line\" data-action=\"zurueckgeben\">Zurückgeben</button>"
    + "<button type=\"button\" class=\"btn-solid\" data-action=\"freigeben\"" + (punkte.length ? " disabled" : "") + ">Freigeben</button></div></div>";
}

function renderPlayer() {
  var c = byId(aktuell);
  var root = document.getElementById("view-player");
  if (!c) { root.innerHTML = "<p>Inhalt nicht gefunden.</p>"; return; }
  var felder = (c.felder || []).join(", ") || "nicht gesetzt";
  var themen = themaSchluessel(c).map(function (t) { return THEMA_LABEL[t]; }).join(", ") || "nicht gesetzt";
  var tool = TOOL_LABEL[toolSchluessel(c)] || c.werkzeug || "keins";
  var naechste = (c.verwandt || []).map(byId).filter(function (v) { return v && (v.status === "veroeffentlicht" || kannBearbeitenInhalt(v)); });
  var naechster = naechste[0];
  var stand = fortschrittVon(c);
  var prozent = stand === "abgeschlossen" ? 100 : stand === "begonnen" ? 35 : 8;
  var notiz = (state.notizen && state.notizen[c.id]) || "";
  var buehne = "";
  if (c.medien === "h5p" && c.h5p) {
    buehne = "<div class=\"player-flaeche\" style=\"display:block;padding:24px;color:#fff\"><p class=\"entry-kicker\">H5P</p><h2 id=\"h5p-frage\">" + esc(c.h5p.frage) + "</h2><div class=\"h5p-options\">" + c.h5p.optionen.map(function (o, i) {
      return "<button type=\"button\" class=\"h5p-opt\" data-h5p=\"" + i + "\">" + esc(o.t) + "</button>";
    }).join("") + "</div><p id=\"h5p-hinweis\" class=\"stage-note\" hidden></p></div>";
  } else if ((c.medien === "iframe" || c.medien === "poltube") && c.iframe) {
    buehne = "<iframe class=\"video-frame\" title=\"Video: " + esc(c.titel) + "\" src=\"" + esc(c.iframe) + "\"></iframe>";
  } else {
    buehne = "<div class=\"player-flaeche\" aria-hidden=\"true\"><span class=\"player-quadrat\"></span></div>"
      + "<div class=\"player-leiste\"><span>Wiedergabe</span><span class=\"balken\"><i style=\"width:" + prozent + "%\"></i></span><span>" + prozent + " %</span></div>";
  }
  var kapitel = (c.schritte || []).map(function (s, i) {
    return "<p><strong>" + (i + 1) + ". " + esc(s.t) + "</strong><br>" + mitBegriffen(s.d) + "</p>";
  }).join("") || "<p>Keine Kapitel hinterlegt.</p>";
  var naechstesHtml = naechste.length
    ? naechste.map(function (v) {
      return "<button type=\"button\" data-open=\"" + esc(v.id) + "\"><strong>" + esc(v.titel) + "</strong><br><span>" + esc(artName(v)) + "</span></button>";
    }).join("")
    : "<p>Kein weiterer Inhalt ist verknüpft.</p>";
  var status = c.status !== "veroeffentlicht" ? "<span class=\"st " + esc(c.status) + "\">" + esc(statusLabel(c.status)) + "</span>" : "";
  var bearbeiten = (kannAnlegen() && kannBearbeitenInhalt(c)) ? stiftKnopf(c.id, true) : "";
  var lauf = "";
  if (c.status === "veroeffentlicht" && !kannBearbeitenInhalt(c)) {
    lauf = stand === "abgeschlossen"
      ? "<div class=\"button-row\"><span class=\"st veroeffentlicht\">Abgeschlossen</span><button type=\"button\" class=\"btn-line\" data-action=\"fortschritt\" data-stand=\"begonnen\">Wieder als begonnen</button></div>"
      : "<div class=\"button-row\"><button type=\"button\" class=\"btn-line\" data-action=\"fortschritt\" data-stand=\"abgeschlossen\">Als abgeschlossen markieren</button></div>";
  }
  var weiter = naechster
    ? "<button type=\"button\" class=\"btn-solid\" data-open=\"" + esc(naechster.id) + "\">Nächster</button>"
    : "<button type=\"button\" class=\"btn-line\" data-action=\"fortschritt\" data-stand=\"abgeschlossen\">Abschließen</button>";
  root.innerHTML = krumenHtml(c.titel)
    + "<div class=\"badges\">" + status + "<span class=\"dur\">" + esc(artName(c)) + (c.niveauLabel ? " · " + esc(c.niveauLabel) : "") + "</span>" + bearbeiten + "</div>"
    + "<div class=\"lernansicht\">"
    + "<div><div class=\"player-buehne\">" + buehne + "</div>"
    + "<div class=\"titelzeile\"><h1>" + esc(c.titel) + "</h1></div>"
    + "<p class=\"meta-line\">" + esc(felder) + " · " + esc(themen) + " · " + esc(tool) + "</p>"
    + "<p>" + mitBegriffen(c.teaser || "") + "</p></div>"
    + "<aside>"
    + "<section class=\"lern-karte naechstes\"><h2>Als Nächstes</h2>" + naechstesHtml + "</section>"
    + "<section class=\"lern-karte\"><h2>Weitere Infos</h2>"
    + "<div class=\"lern-tabs\" role=\"tablist\">"
    + "<button type=\"button\" role=\"tab\" id=\"tab-transkript\" data-lern-tab=\"transkript\" aria-selected=\"true\" aria-controls=\"panel-transkript\">Transkript</button>"
    + "<button type=\"button\" role=\"tab\" id=\"tab-kapitel\" data-lern-tab=\"kapitel\" aria-selected=\"false\" aria-controls=\"panel-kapitel\">Kapitel</button>"
    + "<button type=\"button\" role=\"tab\" id=\"tab-notizen\" data-lern-tab=\"notizen\" aria-selected=\"false\" aria-controls=\"panel-notizen\">Notizen</button>"
    + "</div>"
    + "<div id=\"panel-transkript\" role=\"tabpanel\" aria-labelledby=\"tab-transkript\"><p>" + mitBegriffen(c.text || c.teaser || "") + "</p></div>"
    + "<div id=\"panel-kapitel\" role=\"tabpanel\" aria-labelledby=\"tab-kapitel\" hidden>" + kapitel + "</div>"
    + "<div id=\"panel-notizen\" role=\"tabpanel\" aria-labelledby=\"tab-notizen\" hidden><label class=\"field\"><span>Ihre Notiz bleibt in diesem Browser</span><textarea id=\"lern-notiz\" rows=\"5\">" + esc(notiz) + "</textarea></label></div>"
    + "</section></aside></div>"
    + "<div class=\"lern-fuss\"><span>Fortschritt</span><div class=\"lern-fortschritt\" aria-hidden=\"true\"><span style=\"width:" + prozent + "%\"></span></div><strong>" + prozent + " %</strong>" + weiter + "</div>"
    + moderationKasten(c)
    + editRechtKasten(c)
    + lauf
    + "<div class=\"button-row\"><button type=\"button\" class=\"btn-line\" data-action=\"zum-kommentar\">Zum Kommentar</button></div>"
    + kommentarBlock(c);
  root.querySelectorAll("[data-lern-tab]").forEach(function (knopf) {
    knopf.addEventListener("click", function () {
      root.querySelectorAll("[data-lern-tab]").forEach(function (anderer) {
        var an = anderer === knopf;
        anderer.setAttribute("aria-selected", an ? "true" : "false");
        var panel = document.getElementById(anderer.getAttribute("aria-controls"));
        if (panel) panel.hidden = !an;
      });
    });
  });
  var notizFeld = root.querySelector("#lern-notiz");
  if (notizFeld) {
    notizFeld.addEventListener("input", function () {
      state.notizen = state.notizen || {};
      state.notizen[c.id] = notizFeld.value;
      sichern();
    });
  }
}

function renderSummary() {
  var c = byId(aktuell);
  var root = document.getElementById("view-summary");
  if (!c) { root.innerHTML = ""; return; }
  var kern = (c.kern || []).map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("");
  var verwandt = (c.verwandt || []).map(byId).filter(Boolean).filter(function (v) { return v.status === "veroeffentlicht"; }).map(function (v) {
    return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(v.id) + "\"><strong>" + esc(v.titel) + "</strong><span>" + esc(v.dauer) + " · " + esc(v.niveauLabel) + "</span></button>";
  }).join("");
  var nachweis = c.grundlagen ? "<div class=\"ausbau-box\"><h3>Qualifizierungsnachweis</h3><p>Grundlagenmodule sind mit Lernziel, Geltungsbereich und Fassungsstand anschlussfähig. Ein Zertifikat über Moodle und Badges gehören zur späteren Ausbaustufe.</p><button type=\"button\" class=\"btn-line\" disabled>Zertifikat abrufen</button></div>" : "";
  var fb = state.feedback[c.id];
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-action=\"zurueck-inhalt\">← Zurück zum Inhalt</button>"
    + "<p class=\"eyebrow\">Abschluss</p><h1>Das bleibt hängen</h1>"
    + "<p>" + esc(c.titel) + "</p>"
    + "<ul class=\"summary-list\">" + kern + "</ul>"
    + "<p class=\"meta-line\">" + (selbstGeprueft ? "Sie haben den Prüfschritt markiert." : "Der Prüfschritt ist noch offen. Sie können ihn im Inhalt nachholen.") + "</p>"
    + "<h2>War das brauchbar?</h2><p class=\"meta-line\">Eine Rückmeldung, ein Klick, ohne Freitext. Die Redaktion sieht nur die Summe.</p>"
    + "<div class=\"facebtns\"><button type=\"button\" class=\"facebtn" + (fb === "up" ? " active" : "") + "\" data-fb=\"up\"><span aria-hidden=\"true\">☺</span> Hat mir weitergeholfen</button><button type=\"button\" class=\"facebtn" + (fb === "down" ? " active" : "") + "\" data-fb=\"down\"><span aria-hidden=\"true\">☹</span> Hat mir nicht weitergeholfen</button></div>"
    + (verwandt ? "<h2>Dazu passt</h2><div class=\"rowlist\">" + verwandt + "</div>" : "")
    + nachweis;
}

function renderGlossar() {
  var root = document.getElementById("view-glossar");
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-action=\"zur-lernansicht\">← Zur Lernansicht</button>"
    + "<p class=\"eyebrow\">Lernoberfläche</p><h1>Glossar</h1>"
    + "<p>Fremdwörter, Abkürzungen und Anglizismen, die in den Inhalten vorkommen. Dieselben Erklärungen liegen an den Begriffen im Text.</p>"
    + "<dl class=\"gloss\">" + GLOSSAR.map(function (g) {
      return "<div><dt>" + esc(g.begriff) + "</dt><dd>" + esc(g.text) + "</dd></div>";
    }).join("") + "</dl>";
}

function renderProfil() {
  var root = document.getElementById("view-profil");
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"home\">← Startseite</button>"
    + "<p class=\"eyebrow\">Profil aus dem Behördenkonto</p><h1>Henning Beckmann</h1>"
    + "<p>Name und Konto kommen aus dem Active Directory. Die KI-Werkstatt legt kein zweites Konto an.</p>"
    + "<form id=\"profil-form\" class=\"form-card\">"
    + "<label class=\"field\"><span>Behörde, von Ihnen pflegbar</span><input name=\"behoerde\" value=\"" + esc(state.behoerde) + "\" required></label>"
    + "<label class=\"field\"><span>Oberflächensprache</span><input value=\"Deutsch\" readonly><span class=\"hint\">Die Sprache bleibt im Profil gespeichert. Weitere Sprachen sind in diesem Prototyp nicht hinterlegt.</span></label>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"einfach\" " + (state.einfach ? "checked" : "") + "> Einfache Sprache für die hinterlegten Kurztexte</label>"
    + "<p class=\"hint\">Die automatische Übersetzung in Einfache Sprache per KI gehört zur späteren Ausbaustufe. Hier schalten Sie nur die bereits geschriebenen kurzen Fassungen um.</p>"
    + "<div class=\"button-row\"><button class=\"btn-solid\" type=\"submit\">Angaben speichern</button><button type=\"button\" class=\"btn-line\" data-action=\"passwort\">Zugang zum Behördenkonto</button></div>"
    + "</form>"
    + "<div class=\"ausbau-box\"><h2>Ansprechbarkeit und Personensuche</h2><p>Die freiwillige Kennzeichnung, zu welchen Themen Sie ansprechbar sind, und die Suche nach Personen folgen mit den Foren in der späteren Ausbaustufe.</p><button type=\"button\" class=\"btn-line\" disabled>Themen kennzeichnen</button></div>";
}

function schrittFeld(i, s) {
  s = s || { t: "", d: "" };
  return "<div class=\"schritt-feld\"><label class=\"field\"><span>Schritt " + (i + 1) + "</span><input name=\"schrittTitel\" value=\"" + esc(s.t || "") + "\"></label>"
    + "<label class=\"field\"><span>Was danach sichtbar ist</span><textarea name=\"schrittText\" rows=\"2\">" + esc(s.d || "") + "</textarea></label></div>";
}

function anlageArt(c) {
  if (c) {
    if (istFaq(c)) return "faq";
    if (istImpuls(c)) return "impuls";
    if (istLiveSession(c)) return "live";
    if (istBeitrag(c)) return "beitrag";
    if (istBasismodul(c)) return "basis";
    if (istAnwendungsmodul(c)) return "anwendung";
    return "basis";
  }
  if (["basis", "anwendung", "beitrag", "impuls", "faq"].indexOf(editorVorgabe) >= 0) return editorVorgabe;
  return "basis";
}

function heuteIso() {
  var d = new Date();
  var monat = String(d.getMonth() + 1);
  var tag = String(d.getDate());
  if (monat.length < 2) monat = "0" + monat;
  if (tag.length < 2) tag = "0" + tag;
  return d.getFullYear() + "-" + monat + "-" + tag;
}

function renderEditor(root) {
  var c = editorId ? byId(editorId) : null;
  root = root || document.getElementById("view-editor");
  if (!root) return;
  var art = anlageArt(c);
  var v = c || { titel: "", niveau: "basis", felder: [], medien: "text", text: "", iframe: "", dateiname: "", liveDatum: "", liveZeit: "" };
  editorVorgabe = "";
  if (v.medien === "poltube") v.medien = "iframe";
  if (v.medien !== "h5p" && v.medien !== "iframe") v.medien = "text";
  var themaAktiv = c ? themaSchluessel(c) : [];
  var toolAktiv = c ? toolSchluessel(c) : "";
  var arten = [["basis", "Basismodul"], ["anwendung", "Anwendungsmodul"], ["beitrag", "Beitrag"], ["impuls", "Praxisimpuls"], ["faq", "FAQ-Eintrag"]];
  if (art === "live") arten.push(["live", "Live-Session"]);
  var ueberschrift = c ? "Inhalt bearbeiten" : "Inhalt anlegen";
  var liveFelder = art === "live"
    ? "<div class=\"field-row\"><label class=\"field\"><span>Datum</span><input name=\"liveDatum\" type=\"date\" value=\"" + esc(v.liveDatum || "") + "\"></label><label class=\"field\"><span>Uhrzeit</span><input name=\"liveZeit\" type=\"time\" value=\"" + esc(v.liveZeit || "") + "\"></label></div>"
    : "";
  root.innerHTML = krumenHtml(ueberschrift)
    + "<h1>" + ueberschrift + "</h1>"
    + "<p>Dieselbe Maske für Basismodul, Anwendungsmodul, Beitrag, Praxisimpuls und FAQ-Eintrag. H5P und iFrame sind eine Lernaktivität, keine eigene Art.</p>"
    + "<form id=\"editor-form\" class=\"form-card\">"
    + "<fieldset class=\"niveaus\"><legend>Was legen Sie an?</legend>"
    + arten.map(function (o) {
      return "<label><input type=\"radio\" name=\"anlage\" value=\"" + o[0] + "\"" + (art === o[0] ? " checked" : "") + "><strong>" + o[1] + "</strong></label>";
    }).join("") + "</fieldset>"
    + "<label class=\"field\"><span>Titel</span><input name=\"titel\" required value=\"" + esc(v.titel || "") + "\"></label>"
    + "<fieldset class=\"niveaus\"><legend>Lernaktivität hinzufügen</legend>"
    + "<label><input type=\"radio\" name=\"medien\" value=\"text\"" + (v.medien === "text" ? " checked" : "") + "><strong>Keine zusätzliche Lernaktivität</strong><span>Der Text unten ist der Inhalt.</span></label>"
    + "<label><input type=\"radio\" name=\"medien\" value=\"h5p\"" + (v.medien === "h5p" ? " checked" : "") + "><strong>H5P</strong><span>Der Prototyp merkt sich den Dateinamen und führt die Datei nicht aus.</span></label>"
    + "<label><input type=\"radio\" name=\"medien\" value=\"iframe\"" + (v.medien === "iframe" ? " checked" : "") + "><strong>iFrame</strong><span>Sie setzen die Adresse ein. Eine Videodatei liegt nicht in der Werkstatt.</span></label>"
    + "</fieldset>"
    + "<div id=\"medien-h5p\"><label class=\"field\"><span>H5P-Datei</span><input name=\"datei\" type=\"file\" accept=\".h5p,application/zip\"></label><p id=\"dateiname\" class=\"meta-line\" data-datei=\"" + esc(v.dateiname || "") + "\">" + esc(v.dateiname || "Noch keine Datei gewählt.") + "</p></div>"
    + "<div id=\"medien-video\"><label class=\"field\"><span>Adresse des iFrames</span><input name=\"iframe\" type=\"url\" value=\"" + esc(v.iframe || "") + "\" placeholder=\"https://…\"></label></div>"
    + "<label class=\"field\"><span>Text</span><textarea name=\"text\" rows=\"8\">" + esc(v.text || "") + "</textarea></label>"
    + liveFelder
    + "<fieldset class=\"niveaus\"><legend>Niveaustufe — genau eine</legend>"
    + ["basis", "aufbau", "spezial"].map(function (n) {
      var label = n === "basis" ? "Basis" : n === "aufbau" ? "Aufbau" : "Spezial";
      return "<label><input type=\"radio\" name=\"niveau\" value=\"" + n + "\"" + ((v.niveau || "basis") === n ? " checked" : "") + "><strong>" + label + "</strong></label>";
    }).join("") + "</fieldset>"
    + "<fieldset class=\"field\"><legend>Anwendungsfeld</legend>"
    + ["Ermittlung", "Führung", "Verwaltung"].map(function (f) {
      return "<label class=\"checkline\"><input type=\"checkbox\" name=\"feld\" value=\"" + f + "\"" + ((v.felder || []).indexOf(f) >= 0 ? " checked" : "") + "> " + f + "</label>";
    }).join("") + "</fieldset>"
    + "<fieldset class=\"field\"><legend>Thema</legend>"
    + Object.keys(THEMA_LABEL).map(function (key) {
      return "<label class=\"checkline\"><input type=\"checkbox\" name=\"thema\" value=\"" + key + "\"" + (themaAktiv.indexOf(key) >= 0 ? " checked" : "") + "> " + THEMA_LABEL[key] + "</label>";
    }).join("") + "</fieldset>"
    + "<label class=\"field\"><span>KI-Tool</span><select name=\"kiTool\"><option value=\"\">Keins</option>"
    + Object.keys(TOOL_LABEL).map(function (key) {
      return "<option value=\"" + key + "\"" + (toolAktiv === key ? " selected" : "") + ">" + TOOL_LABEL[key] + "</option>";
    }).join("") + "</select></label>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"einwilligung\"" + (v.einwilligung ? " checked" : "") + "> Einwilligung</label>"
    + "<label class=\"field\"><span>Ersteller</span><input value=\"Henning Beckmann\" readonly></label>"
    + "<label class=\"field\"><span>Letzte Änderung</span><input value=\"" + esc(datum(v.geaendert || heuteIso())) + "\" readonly></label>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"erlaubnis\"" + (v.erlaubnis ? " checked" : "") + "> Erlaubnis</label>"
    + "<div class=\"button-row\"><button class=\"btn-line\" type=\"submit\" name=\"ziel\" value=\"entwurf\">Entwurf speichern</button><button class=\"btn-solid\" type=\"submit\" name=\"ziel\" value=\"review\">Zur Prüfung geben</button></div>"
    + "</form>";
  function zeigeMedien() {
    var gewaehlt = root.querySelector("[name=medien]:checked");
    var wert = gewaehlt ? gewaehlt.value : "text";
    var h5p = root.querySelector("#medien-h5p");
    var video = root.querySelector("#medien-video");
    if (h5p) h5p.hidden = wert !== "h5p";
    if (video) video.hidden = wert !== "iframe";
  }
  root.querySelectorAll("[name=medien]").forEach(function (el) { el.addEventListener("change", zeigeMedien); });
  zeigeMedien();
}

function leseEditor(form, ziel) {
  var data = new FormData(form);
  var alt = editorId ? byId(editorId) : null;
  var art = String(data.get("anlage") || "basis");
  var felder = data.getAll("feld");
  var id = editorId || ("eigen-" + Date.now());
  var medien = String(data.get("medien") || "text");
  if (medien === "poltube" || medien === "text") {
    if (medien === "poltube") medien = "iframe";
  }
  var formatKey = "lernmodul";
  var format = "Strukturierter Text";
  var impuls = false;
  var beitrag = false;
  var grundlagen = false;
  if (art === "impuls") {
    formatKey = "impuls"; format = "Praxisimpuls"; impuls = true; medien = "text";
  } else if (art === "beitrag") {
    formatKey = "beitrag"; format = "Beitrag"; beitrag = true;
  } else if (art === "faq") {
    formatKey = "faq"; format = "FAQ-Eintrag"; medien = "text";
  } else if (art === "live") {
    formatKey = "live"; format = "Live-Session"; medien = "text";
  } else if (art === "basis") {
    grundlagen = true;
  }
  if (art !== "impuls" && art !== "faq" && art !== "live") {
    if (medien === "h5p") format = "H5P";
    else if (medien === "iframe") { formatKey = art === "beitrag" ? "beitrag" : "video"; format = "Video"; }
  }
  var kiTool = String(data.get("kiTool") || "");
  var thema = data.getAll("thema");
  var text = String(data.get("text") || "").trim();
  var obj = {
    id: id,
    titel: String(data.get("titel") || "").trim(),
    teaser: (text || "Eigener Entwurf").slice(0, 180),
    format: format,
    formatKey: formatKey,
    modul: art,
    impuls: impuls,
    beitrag: beitrag,
    grundlagen: grundlagen,
    niveau: data.get("niveau") || "basis",
    dauerMin: (alt && alt.dauerMin) || 0,
    ergebnis: (alt && alt.ergebnis) || "",
    lernziel: (alt && alt.lernziel) || "",
    felder: felder,
    werkzeug: TOOL_LABEL[kiTool] || "Keins",
    werkzeugKey: kiTool,
    kiTool: kiTool,
    thema: thema,
    themaKey: thema,
    ziel: felder.map(function (f) { return f === "Ermittlung" ? "ermittlung" : f === "Führung" ? "fuehrung" : "verwaltung"; }),
    medien: medien,
    anwendungsbezogen: art !== "basis",
    praxis: (alt && alt.praxis) || null,
    glossarOk: true,
    glossar: (alt && alt.glossar) || [],
    text: text,
    iframe: String(data.get("iframe") || "").trim(),
    liveDatum: String(data.get("liveDatum") || (alt && alt.liveDatum) || "").trim(),
    liveZeit: String(data.get("liveZeit") || (alt && alt.liveZeit) || "").trim(),
    dateiname: (function () {
      var anzeige = document.getElementById("dateiname");
      if (anzeige && anzeige.dataset.datei) return anzeige.dataset.datei;
      return (alt && alt.dateiname) || "";
    })(),
    schritte: (alt && alt.schritte) || [],
    kern: (alt && alt.kern && alt.kern.length) ? alt.kern : ["Entwurf von Henning Beckmann."],
    fehler: alt ? alt.fehler : null,
    verwandt: (alt && alt.verwandt) || [],
    autor: "Henning Beckmann",
    autorId: "hb",
    autorRolle: "creator",
    einwilligung: data.get("einwilligung") === "on",
    erlaubnis: data.get("erlaubnis") === "on",
    geaendert: heuteIso(),
    status: ziel,
    fassung: (alt && alt.fassung) || "1",
    geprueft: (alt && ziel !== "review" && alt.geprueft) || "",
    kommentare: (alt && alt.kommentare) || [],
    h5p: alt ? alt.h5p : null
  };
  if (obj.medien === "h5p" && !obj.h5p) {
    obj.h5p = {
      frage: "Haben Sie das Ergebnis gegen die Quelle gehalten?",
      optionen: [
        { t: "Ja. Der Prüfschritt gehört zum Ergebnis.", ok: true },
        { t: "Nein. Eine flüssige Fassung reicht.", ok: false }
      ],
      hinweis: "Ohne Prüfschritt ist die Einheit nicht fertig."
    };
  }
  return obj;
}

function speichereInhalt(obj) {
  var existiert = INHALTE.some(function (i) { return i.id === obj.id; }) || (state.eigene || []).some(function (i) { return i.id === obj.id; });
  if (INHALTE.some(function (i) { return i.id === obj.id; })) {
    state.override[obj.id] = obj;
    state.status[obj.id] = obj.status;
  } else if (existiert) {
    state.eigene = state.eigene.map(function (i) { return i.id === obj.id ? obj : i; });
    state.status[obj.id] = obj.status;
  } else {
    state.eigene.push(obj);
    state.status[obj.id] = obj.status;
  }
  sichern();
  syncKacheln();
}

function renderMeine() {
  renderEigene();
  renderFortschritt();
}

function feedbackSumme(id) {
  var basis = { up: id === "berichte" ? 36 : 12, down: 4 };
  var extra = state.feedback[id];
  if (extra === "up") basis.up += 1;
  if (extra === "down") basis.down += 1;
  return basis;
}

function statusLabel(s) {
  return { entwurf: "Entwurf", review: "Review", freigabe: "Freigabe", veroeffentlicht: "Veröffentlichung" }[s] || s;
}

function kachelMarkup(c) {
  var farbe = "t" + ((String(c.titel || "").length % 6) + 1);
  var n = kommentareVon(c).length;
  var label = n === 1 ? "1 Kommentar" : n + " Kommentare";
  var thema = themaSchluessel(c).join(" ");
  var ziel = (c.ziel || []).join(" ");
  var geliked = state.feedback[c.id] === "up";
  var art = meinArt(c);
  if (!art) {
    var stand = fortschrittVon(c);
    if (stand === "abgeschlossen") art = "Abgeschlossen";
    else if (stand === "begonnen") art = "Begonnen";
  }
  return "<article class=\"tile " + farbe + "\" tabindex=\"0\" data-id=\"" + esc(c.id) + "\" data-werkzeug=\"" + esc(toolSchluessel(c)) + "\" data-thema=\"" + esc(thema) + "\" data-format=\"" + esc(c.formatKey || "") + "\" data-niveau=\"" + esc(c.niveau || "") + "\" data-zielgruppe=\"" + esc(ziel) + "\">"
    + (kannAnlegen() && istEigen(c) ? stiftKnopf(c.id, false) : "")
    + "<div class=\"thumb\"><span class=\"fmt\">" + esc(c.format || "Inhalt") + " · " + esc(c.dauer) + "</span></div>"
    + "<div class=\"tile-body\"><div class=\"badges\"><span class=\"lvl " + esc(c.niveau || "basis") + "\">" + esc(c.niveauLabel) + "</span>" + (art ? "<span class=\"st " + esc(c.status) + "\">" + esc(art) + "</span>" : "") + "</div>"
    + "<h3>" + esc(c.titel) + "</h3><p>" + esc(c.teaser || "") + "</p>"
    + "<div class=\"tile-foot\"><button type=\"button\" class=\"likebtn" + (geliked ? " liked" : "") + "\" data-bewerten=\"" + esc(c.id) + "\" aria-pressed=\"" + (geliked ? "true" : "false") + "\" aria-label=\"Hat mir weitergeholfen\"><span class=\"cnt\">" + feedbackSumme(c.id).up + "</span></button>"
    + "<button type=\"button\" class=\"textbtn kommentar-link\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\">" + label + "</button></div></div></article>";
}

function verankereKachel(tile) {
  var id = tile.dataset.id;
  var c = byId(id);
  if (!c) return;
  var foot = tile.querySelector(".tile-foot");
  if (!foot) return;
  var n = kommentareVon(c).length;
  var label = n === 1 ? "1 Kommentar" : n + " Kommentare";
  var link = foot.querySelector(".kommentar-link");
  if (!link) {
    var meta = foot.querySelector(".meta-ic");
    if (meta && /Kommentar/.test(meta.textContent)) meta.remove();
    link = document.createElement("button");
    link.type = "button";
    link.className = "textbtn kommentar-link";
    link.dataset.open = id;
    link.dataset.kommentar = "1";
    foot.appendChild(link);
  }
  link.textContent = label;
  var like = foot.querySelector(".likebtn");
  if (like) {
    like.dataset.bewerten = id;
    like.classList.toggle("liked", state.feedback[id] === "up");
    like.setAttribute("aria-pressed", state.feedback[id] === "up" ? "true" : "false");
    like.setAttribute("aria-label", "Hat mir weitergeholfen");
    var cnt = like.querySelector(".cnt");
    if (cnt) cnt.textContent = String(feedbackSumme(id).up);
  }
}

function renderEigene() {
  var inhalte = alle().filter(function (c) { return istEigen(c) && istLektion(c); });
  var impulse = alle().filter(function (c) { return istEigen(c) && istImpuls(c); });
  var sessions = alle().filter(function (c) { return istEigen(c) && istLiveSession(c); });
  var box = document.getElementById("inhalte-eigene");
  if (box) {
    box.innerHTML = inhalte.length
      ? inhalte.map(kachelMarkup).join("")
      : "<p class=\"meta-line\">Noch keine eigenen Inhalte. Legen Sie oben einen neuen Inhalt an.</p>";
  }
  var ibox = document.getElementById("impulse-eigene");
  if (ibox) {
    ibox.innerHTML = impulse.length ? impulse.map(kachelMarkup).join("") : "<p class=\"meta-line\">Noch kein eigener Impuls. Oben können Sie einen erstellen.</p>";
  }
  var lbox = document.getElementById("live-eigene");
  if (lbox) {
    lbox.innerHTML = sessions.length ? sessions.map(kachelMarkup).join("") : "<p class=\"meta-line\">Noch keine eigene Live-Session.</p>";
  }
}

function renderFortschritt() {
  function liste(stand, art) {
    return alle().filter(function (c) {
      if (c.status !== "veroeffentlicht" || fortschrittVon(c) !== stand) return false;
      return art === "impuls" ? istImpuls(c) : istLektion(c);
    });
  }
  function fuellen(stand, art, boxId, leerId, zahlKlasse) {
    var eintraege = liste(stand, art);
    var box = document.getElementById(boxId);
    var leer = document.getElementById(leerId);
    if (box) box.innerHTML = eintraege.map(kachelMarkup).join("");
    if (leer) leer.hidden = eintraege.length > 0;
    document.querySelectorAll(zahlKlasse).forEach(function (el) { el.textContent = String(eintraege.length); });
  }
  fuellen("begonnen", "lektion", "inhalte-begonnen", "begonnen-leer", ".zahl-begonnen");
  fuellen("abgeschlossen", "lektion", "inhalte-abgeschlossen", "abgeschlossen-leer", ".zahl-abgeschlossen");
  fuellen("begonnen", "impuls", "impulse-begonnen", "impuls-begonnen-leer", ".zahl-impuls-begonnen");
  fuellen("abgeschlossen", "impuls", "impulse-abgeschlossen", "impuls-abgeschlossen-leer", ".zahl-impuls-abgeschlossen");
}

function renderImpulse() {
  renderEigene();
  renderFortschritt();
}

var LIVE_FEST = [
  { id: "live-auswertung", tag: "23.", monat: "Juli", titel: "Fragen & Antworten: KI-gestützte Auswertung in der Praxis", text: "Mit Fachleuten aus Technik und Recht · Donnerstag, 10:00–11:00 Uhr. Die Aufzeichnung liegt danach als Lektion.", thema: "einsatzfelder", niveau: "spezial", zielgruppe: "ermittlung", werkzeug: "auswertung" },
  { id: "live-prompt", tag: "04.", monat: "Juni", titel: "Sprechstunde: Prompts für Berichte", text: "Offene Stunde für alle Behörden.", thema: "grundlagen", niveau: "basis", zielgruppe: "verwaltung fuehrung", werkzeug: "sprachmodell" }
];

var COMMUNITYS = [
  { id: "transkript", kuerzel: "TH", farbe: "a", titel: "Transkript weicht stark vom Audio ab — woran kann das liegen?", meta: "T. Hoffmann · KPB Borken · 14 Antworten", thema: "einsatzfelder", zielgruppe: "ermittlung", werkzeug: "transkription" },
  { id: "formulierungen", kuerzel: "RD", farbe: "b", titel: "Welche Formulierungen funktionieren bei der Zusammenfassung längerer Berichte?", meta: "R. Demir · PP Köln · 23 Antworten", thema: "grundlagen", zielgruppe: "verwaltung", werkzeug: "sprachmodell" },
  { id: "skepsis", kuerzel: "AL", farbe: "c", titel: "Erster KI-Einsatz im Team: Was hat bei euch die Skepsis abgebaut?", meta: "A. Lindner · KPB Gütersloh · 31 Antworten", thema: "ethik", zielgruppe: "fuehrung", werkzeug: "keins" }
];

function liveTermine() {
  var ids = {};
  var liste = LIVE_FEST.map(function (s) {
    ids[s.id] = true;
    return s;
  });
  alle().forEach(function (c) {
    if (!istLiveSession(c) || c.status !== "veroeffentlicht" || istEigen(c) || ids[c.id]) return;
    var tag = "–";
    var monat = "Termin";
    if (c.liveDatum && c.liveDatum.length >= 10) {
      tag = c.liveDatum.slice(8, 10) + ".";
      monat = c.liveDatum.slice(5, 7) + ".";
    }
    liste.push({
      id: c.id, tag: tag, monat: c.liveZeit || monat, titel: c.titel, text: c.teaser || "",
      thema: themaSchluessel(c).join(" "), niveau: c.niveau || "", zielgruppe: (c.ziel || []).join(" "), werkzeug: toolSchluessel(c)
    });
  });
  return liste;
}

function liveKarte(s, dabei) {
  var aktion = dabei
    ? "<span class=\"st veroeffentlicht\">Teilgenommen</span>"
    : "<button class=\"btn-solid\" type=\"button\" data-action=\"live-teilnehmen\" data-id=\"" + esc(s.id) + "\">Teilnehmen</button>";
  return "<div class=\"live\" data-thema=\"" + esc(mapThemaString(s.thema || "")) + "\" data-niveau=\"" + esc(s.niveau || "") + "\" data-zielgruppe=\"" + esc(s.zielgruppe || "") + "\" data-werkzeug=\"" + esc(mapToolString(s.werkzeug || "")) + "\" data-format=\"live\"><div class=\"live-date\"><div class=\"d\">" + esc(s.tag) + "</div><div class=\"m\">" + esc(s.monat) + "</div></div><div class=\"live-info\"><span class=\"tag\"><span class=\"dot\"></span>Live-Session</span><h3>" + esc(s.titel) + "</h3><p>" + esc(s.text) + "</p></div>" + aktion + "</div>";
}

function renderLive() {
  var dabei = state.liveTeilnahme || {};
  var termine = liveTermine();
  var frei = termine.filter(function (s) { return !dabei[s.id]; });
  var mit = termine.filter(function (s) { return !!dabei[s.id]; });
  var boxFrei = document.getElementById("live-verfuegbar-liste");
  var boxMit = document.getElementById("live-teilgenommen-liste");
  var leerFrei = document.getElementById("live-verfuegbar-leer");
  var leerMit = document.getElementById("live-teilgenommen-leer");
  if (boxFrei) boxFrei.innerHTML = frei.map(function (s) { return liveKarte(s, false); }).join("");
  if (boxMit) boxMit.innerHTML = mit.map(function (s) { return liveKarte(s, true); }).join("");
  if (leerMit) leerMit.hidden = mit.length > 0;
  filtereBereichKarten("#live-verfuegbar-liste .live", "live", "live-verfuegbar-leer", "live-filter-leer");
}

function communityKarte(c) {
  var dabei = !!(state.communityMit && state.communityMit[c.id]);
  var knopf = dabei
    ? "<button type=\"button\" class=\"btn-line\" data-action=\"community-mit\" data-id=\"" + esc(c.id) + "\">Nicht mehr mitwirken</button>"
    : "<button type=\"button\" class=\"btn-line\" data-action=\"community-mit\" data-id=\"" + esc(c.id) + "\">Mitwirken</button>";
  return "<div class=\"thread\" tabindex=\"0\" role=\"button\" data-action=\"community-lesen\" data-thema=\"" + esc(mapThemaString(c.thema || "")) + "\" data-niveau=\"\" data-zielgruppe=\"" + esc(c.zielgruppe || "") + "\" data-werkzeug=\"" + esc(mapToolString(c.werkzeug || "")) + "\" data-format=\"community\"><div class=\"c-av " + esc(c.farbe) + "\">" + esc(c.kuerzel) + "</div><div><h3>" + esc(c.titel) + "</h3><div class=\"t-meta\"><span>" + esc(c.meta) + "</span></div>" + knopf + "</div></div>";
}

function renderCommunity() {
  var dabei = state.communityMit || {};
  var mit = COMMUNITYS.filter(function (c) { return !!dabei[c.id]; });
  var frei = COMMUNITYS.filter(function (c) { return !dabei[c.id]; });
  var boxMit = document.getElementById("community-mit-liste");
  var boxFrei = document.getElementById("community-frei-liste");
  var leerMit = document.getElementById("community-mit-leer");
  var leerFrei = document.getElementById("community-frei-leer");
  if (boxMit) boxMit.innerHTML = mit.map(communityKarte).join("");
  if (boxFrei) boxFrei.innerHTML = frei.map(communityKarte).join("");
  if (leerMit) leerMit.hidden = mit.length > 0;
  filtereBereichKarten("#community-frei-liste .thread", "community", "community-frei-leer", "community-filter-leer");
}

function modSammeln() {
  var wartend = alle().filter(function (c) { return c.status === "review" || c.status === "freigabe"; });
  var rows = wartend.map(function (c) {
    return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(c.id) + "\"><strong>" + esc(c.titel) + "</strong><span class=\"st " + esc(c.status) + "\">" + esc(statusLabel(c.status)) + "</span><span>Zur Freigabe</span></button>";
  }).join("");
  var gemeldet = [];
  var hinweise = [];
  alle().forEach(function (c) {
    var gemeldetHier = false;
    kommentareVon(c).forEach(function (k) {
      if (!k.gemeldet) return;
      gemeldetHier = true;
      gemeldet.push("<div class=\"listrow\"><div><button type=\"button\" class=\"textbtn\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\"><strong>" + esc(c.titel) + "</strong></button><div class=\"meta-line\">Gemeldet · " + esc(k.name) + " · " + esc(k.text) + "</div></div><button type=\"button\" class=\"btn-line\" data-action=\"kommentar-loeschen\" data-key=\"" + esc(k.key) + "\" data-id=\"" + esc(c.id) + "\">Löschen</button></div>");
    });
    var fb = state.feedback[c.id];
    var bewertet = fb === "up" || fb === "down";
    if (bewertet) {
      gemeldet.push("<div class=\"listrow\"><div><button type=\"button\" class=\"textbtn\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\"><strong>" + esc(c.titel) + "</strong></button><div class=\"meta-line\">Bewertung · " + (fb === "up" ? "hat weitergeholfen" : "hat nicht weitergeholfen") + "</div></div></div>");
    }
    if (gemeldetHier || bewertet) hinweise.push(c);
  });
  var faelligListe = alle().filter(ueberfaellig);
  var faellig = faelligListe.map(function (c) {
    return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(c.id) + "\"><strong>" + esc(c.titel) + "</strong><span>Geprüft am " + esc(datum(c.geprueft)) + "</span></button>";
  }).join("");
  return { wartend: wartend, rows: rows, hinweise: hinweise, gemeldet: gemeldet, faelligListe: faelligListe, faellig: faellig };
}

function modKachel(ziel, zahl, titel, text) {
  return "<button type=\"button\" class=\"hub-tile\" data-view-jump=\"" + ziel + "\">"
    + "<span class=\"zahl-badge\">" + zahl + "</span>"
    + "<span class=\"hub-titel\">" + esc(titel) + "</span>"
    + "<span class=\"hub-text\">" + esc(text) + "</span>"
    + "<span class=\"go\">Bereich öffnen</span></button>";
}

function renderRedaktion() {
  var root = document.getElementById("view-redaktion");
  var daten = modSammeln();
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"home\">Zurück</button>"
    + "<h1>Redaktion</h1>"
    + "<p>Dieselben Inhalte wie für alle anderen. Eine Kachel öffnet genau diesen Bereich.</p>"
    + "<div class=\"hub-grid\">"
    + modKachel("mod-freigabe", daten.wartend.length, "Zur Freigabe", "Inhalte, die auf eine Entscheidung warten. Freigabe schaltet sie sichtbar.")
    + modKachel("mod-kommentare", daten.hinweise.length, "Kommentare", "Inhalte mit einer Bewertung oder einem gemeldeten Kommentar.")
    + modKachel("mod-pruefung", daten.faelligListe.length, "Prüfdaten", "Veröffentlichte Inhalte, deren Prüfdatum älter als ein halbes Jahr ist.")
    + "</div>";
}

function renderModBereich(bereich) {
  var daten = modSammeln();
  var ziel = document.getElementById("view-mod-" + bereich);
  if (!ziel) return;
  var kopf = "<button type=\"button\" class=\"backlink\" data-view-jump=\"redaktion\">← Moderation</button>";
  if (bereich === "freigabe") {
    ziel.innerHTML = kopf
      + "<h2 id=\"mod-freigabe\">Zur Freigabe</h2><p class=\"meta-line\">" + daten.wartend.length + (daten.wartend.length === 1 ? " Inhalt steht" : " Inhalte stehen") + " an. Der Eintrag öffnet dieselbe Detailansicht.</p>"
      + "<div class=\"rowlist\">" + (daten.rows || "<p>Keine offenen Inhalte.</p>") + "</div>";
    return;
  }
  if (bereich === "kommentare") {
    ziel.innerHTML = kopf
      + "<h2 id=\"mod-kommentare\">Gewertete und gemeldete Kommentare</h2><p class=\"meta-line\">" + daten.hinweise.length + (daten.hinweise.length === 1 ? " Inhalt hat" : " Inhalte haben") + " eine Bewertung oder einen gemeldeten Kommentar.</p><div class=\"list\">" + (daten.gemeldet.join("") || "<p>Keine gemeldeten Kommentare.</p>") + "</div>";
    return;
  }
  ziel.innerHTML = kopf
    + "<h2 id=\"mod-pruefung\">Überfällige Prüfdaten</h2><div class=\"rowlist\">" + (daten.faellig || "<p>Kein Prüfdatum ist älter als ein halbes Jahr.</p>") + "</div>";
}

function renderReview() {
  var c = byId(aktuell);
  var root = document.getElementById("view-review");
  if (!c) { root.innerHTML = "<p>Kein Inhalt gewählt.</p>"; return; }
  var punkte = mangel(c);
  var lis = punkte.length ? punkte.map(function (p) { return "<li class=\"bad\">" + esc(p) + "</li>"; }).join("") : "<li class=\"ok\">Pflichtmerkmale vollständig. Freigabe ist möglich.</li>";
  var gesperrt = punkte.length > 0;
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"redaktion\">← Moderation</button>"
    + "<p class=\"eyebrow\">Qualitätsprüfung</p><h1>" + esc(c.titel) + "</h1>"
    + "<p><span class=\"st " + esc(c.status) + "\">" + esc(statusLabel(c.status)) + "</span> · Fassung " + esc(c.fassung || "1") + " · " + esc(c.autor || "") + "</p>"
    + (c.vorher ? "<p class=\"meta-line\">Frühere Fassung: " + esc(c.vorher) + "</p>" : "")
    + "<ul class=\"pruef\">" + lis + "</ul>"
    + "<dl class=\"gloss\"><div><dt>Niveau</dt><dd>" + esc(c.niveauLabel) + "</dd></div><div><dt>Dauer</dt><dd>" + esc(c.dauer) + "</dd></div><div><dt>Ergebnis</dt><dd>" + esc(c.ergebnis || "—") + "</dd></div><div><dt>Anwendungsfeld</dt><dd>" + esc((c.felder || []).join(", ") || "—") + "</dd></div><div><dt>Begriffe erklärt</dt><dd>" + (c.glossarOk ? "ja" : "nein") + "</dd></div></dl>"
    + "<form id=\"review-form\" class=\"form-card\"><label class=\"field\"><span>Begründung, nötig bei Rückgabe</span><textarea name=\"grund\" rows=\"3\"></textarea></label>"
    + "<div class=\"button-row\">"
    + "<button type=\"button\" class=\"btn-line\" data-action=\"zurueckgeben\">Zurück an Creator</button>"
    + "<button type=\"button\" class=\"btn-line\" data-action=\"freigeben\"" + (gesperrt ? " disabled" : "") + ">Freigeben</button>"
    + "<button type=\"button\" class=\"btn-solid\" data-action=\"veroeffentlichen\"" + (c.status !== "freigabe" || gesperrt ? " disabled" : "") + ">Veröffentlichen</button>"
    + "</div>" + (gesperrt ? "<p class=\"hint\">Freigabe ist gesperrt, solange Pflichtmerkmale fehlen.</p>" : "<p class=\"hint\">Zuerst freigeben, dann veröffentlichen. So bleiben die vier Status sichtbar.</p>")
    + "</form>";
}

function renderStatistik() {
  var root = document.getElementById("view-statistik");
  var start = 18420 + (state.extra.start || 0);
  var p0 = 5310 + (state.extra.null || 0);
  var p1 = 4022 + (state.extra.bereits || 0);
  var p2 = 6104 + (state.extra.frage || 0);
  var zeilen = alle().filter(function (c) { return c.status === "veroeffentlicht"; }).map(function (c) {
    return "<div class=\"listrow\"><div>" + esc(c.titel) + "</div><div>" + aufrufeInhalt(c) + "</div><div>" + feedbackSumme(c.id).up + " / " + feedbackSumme(c.id).down + "</div></div>";
  }).join("");
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"redaktion\">← Moderation</button>"
    + "<p class=\"eyebrow\">Aggregiert, nicht personenbezogen</p><h1>Aufrufzahlen</h1>"
    + "<div class=\"kpi\"><div><strong>" + start + "</strong><span>Einstiegsseite</span></div><div><strong>" + p0 + "</strong><span>Pfad ohne Vorwissen</span></div><div><strong>" + p1 + "</strong><span>Pfad mit Vorkenntnis</span></div><div><strong>" + p2 + "</strong><span>Pfad konkrete Frage</span></div></div>"
    + "<div class=\"listrow head\"><div>Inhalt</div><div>Aufrufe</div><div>Feedback + / −</div></div>" + zeilen;
}

function ernennungsListe(art, titel, text) {
  var zeilen = PERSONEN.map(function (p) {
    var an = hatErnennung(art, p.id);
    var sperre = art === "admin" && p.id === "hb";
    return "<div class=\"listrow\"><div><strong>" + esc(p.name) + "</strong><div class=\"meta-line\">" + esc(p.stelle) + (p.sitzung ? " · Konto dieser Sitzung" : "") + "</div></div>"
      + "<div>" + (an ? titel : "Teilnehmer") + "</div>"
      + "<button type=\"button\" class=\"btn-line\" data-action=\"ernennung\" data-art=\"" + art + "\" data-person=\"" + esc(p.id) + "\" aria-pressed=\"" + (an ? "true" : "false") + "\"" + (sperre ? " disabled" : "") + ">" + (sperre ? "Sitzung behält Administration" : an ? "Ernennung entziehen" : "Ernennen") + "</button></div>";
  }).join("");
  return "<h2 id=\"ernennung-" + art + "\">" + titel + "</h2><p>" + text + "</p><div class=\"list\">" + zeilen + "</div>";
}

function renderAdmin() {
  var root = document.getElementById("view-admin");
  root.innerHTML = "<p class=\"eyebrow\">Administration</p><h1>Personen und Ernennungen</h1>"
    + "<p>Die Basis ist Teilnehmer: lesen und nutzen. Ernennen können Sie zu Content Creator, Redaktion und Administration. Konten kommen aus dem Identity-Management. Hier entsteht kein neues Konto.</p>"
    + "<nav class=\"wegweiser\" aria-label=\"Zurück in die Arbeit\"><button type=\"button\" data-view-jump=\"inhalte\">Zu den Basismodulen</button><button type=\"button\" data-view-jump=\"redaktion\">Zur Redaktion</button></nav>"
    + "<h2>Rollen</h2>"
    + "<div class=\"list\">"
    + rolleZeile("Teilnehmer", "Lesen und nutzen. Kein Anlegen, keine Meine Inhalte.", true)
    + rolleZeile("Content Creator", "Meine Inhalte und Anlegen, einschließlich Stift.", true)
    + rolleZeile("Redaktion", "Freigabe und Redaktionsbereich. Legt ebenfalls an.", true)
    + rolleZeile("Administration", "Ernennungen, Integrationen, Betrieb. Legt frei und an.", true)
    + rolleZeile("Gegenzeichnende Stelle", "Erlaubnisantworten vor Veröffentlichung", true)
    + rolleZeile("Forenmoderation", "Vorgesehen. Foren folgen in der späteren Ausbaustufe.", false)
    + "</div>"
    + ernennungsListe("creator", "Content Creator", "Ohne diese Ernennung bleibt die Person beim Lesen, auch wenn der Umschalter auf Content Creator steht.")
    + ernennungsListe("redaktion", "Redaktion", "Die Redaktion gibt frei und sieht Freigaben, gemeldete Kommentare und Prüfdaten. Sie legt außerdem an.")
    + ernennungsListe("admin", "Administration", "Administration ernennt die drei Rollen und sieht Anbindung und Betrieb. Das Konto dieser Sitzung behält sie, sonst ließe sich die Liste nicht wieder öffnen.")
    + "<p class=\"hint\">Henning Beckmann ist das Konto dieser Sitzung. Fehlt seine Ernennung, verschwindet der zugehörige Bereich aus Leiste und Dashboard, sobald diese Rolle gewählt ist.</p>"
    + "<h2 id=\"integrationen\">Integrationen</h2>"
    + "<div class=\"rowlist\">"
    + "<div class=\"rowitem\"><strong>ADFS</strong><span>Anmeldung über das Behördenkonto. Im Prototyp ohne echtes Verzeichnis.</span></div>"
    + "<div class=\"rowitem\"><strong>Video</strong><span>Im MVP nur ein iFrame. Keine Videodatei in der Werkstatt.</span></div>"
    + "<div class=\"rowitem\"><strong>H5P</strong><span>Wird als Datei gepflegt. Inhaltstyp Frage, analog zu Moodle.</span></div>"
    + "<div class=\"rowitem\"><strong>Moodle-Webservice</strong><span>Für Zertifikate der späteren Ausbaustufe vorgesehen, hier nicht angebunden.</span></div>"
    + "<div class=\"rowitem\"><strong>KI-HiPoS</strong><span>Leichte Sprache und Textvorschläge sind spätere Ausbaustufe.</span><button type=\"button\" class=\"btn-line\" disabled>Ergebnisse prüfen</button></div>"
    + "</div>"
    + "<h2 id=\"betrieb\">Betrieb</h2>"
    + "<div class=\"kpi\"><div><strong>Zielbild</strong><span>Verfügbarkeit im vereinbarten Rahmen</span></div><div><strong>Sicherung</strong><span>Regelmäßige Wiederherstellung vorgesehen</span></div><div><strong>Datenschutz</strong><span>Aufrufe nur aggregiert</span></div><div><strong>Protokoll</strong><span>Administrative Änderungen revisionssicher vorgesehen</span></div></div>"
    + "<p>Barrierefreiheit ist Anforderung an alle Oberflächen. Der BITV-Test liegt in der Pilotphase, nicht in diesem Clickdummy. Niveaustufen, Kategorien und Pflichtmetadaten sind die Felder, die Sie in Leitfaden und Freigabe sehen: Niveau, Anwendungsfeld, Dauer, Ergebnis, Prüfdatum, erklärte Begriffe.</p>";
}

function rolleZeile(name, text, aktiv) {
  return "<div class=\"listrow\"><div><strong>" + esc(name) + "</strong></div><div>" + esc(text) + "</div><div>" + (aktiv ? "im MVP" : "<span class=\"ausbau\">später</span>") + "</div></div>";
}

function syncKacheln() {
  var grid = document.getElementById("katalog-grid");
  if (!grid) return;
  alle().forEach(function (c) {
    var vorhandene = grid.querySelector('.tile[data-id="' + c.id + '"]');
    var zeigen = c.status === "veroeffentlicht";
    var original = null;
    INHALTE.some(function (i) { if (i.id === c.id) { original = i; return true; } return false; });
    var neu = !original || original.status !== "veroeffentlicht";
    if (vorhandene && vorhandene.dataset.injected === "1" && !zeigen) vorhandene.remove();
    if (!vorhandene && zeigen && neu) grid.appendChild(kachel(c));
  });
  if (typeof window.filtern === "function") window.filtern();
  sofortKarte();
}

function kachel(c) {
  var art = document.createElement("article");
  art.className = "tile t2";
  art.dataset.id = c.id;
  art.dataset.injected = "1";
  schreibeFilterDaten(art, c);
  art.dataset.format = c.formatKey || "lernmodul";
  art.dataset.niveau = c.niveau || "";
  art.tabIndex = 0;
  var n = kommentareVon(c).length;
  var label = n === 1 ? "1 Kommentar" : n + " Kommentare";
  art.innerHTML = "<div class=\"thumb\"><span class=\"fmt\">" + esc(c.format) + " · " + esc(c.dauer) + "</span></div><div class=\"tile-body\"><div class=\"badges\"><span class=\"lvl " + esc(c.niveau || "basis") + "\">" + esc(c.niveauLabel) + "</span></div><h3>" + esc(c.titel) + "</h3><p>" + esc(c.teaser) + "</p><div class=\"tile-foot\"><span class=\"meta-ic\">Neu veröffentlicht</span><button type=\"button\" class=\"textbtn kommentar-link\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\">" + label + "</button></div></div>";
  return art;
}

function sofortKarte() {
  var c = byId(state.prominent) || byId("berichte");
  if (!c) return;
  var t = document.getElementById("sofort-titel");
  var x = document.getElementById("sofort-text");
  var b = document.getElementById("sofort-btn");
  if (t) t.textContent = c.titel;
  if (x) x.textContent = c.teaser;
  if (b) b.dataset.sofort = c.id;
}

function setzeFilter(gruppe, wert, scope) {
  scope = scope || "lektion";
  document.querySelectorAll(".filters[data-scope=\"" + scope + "\"] .chip").forEach(function (c) {
    if (c.dataset.group !== gruppe) return;
    var an = c.dataset.value === wert;
    c.classList.toggle("active", an);
    c.setAttribute("aria-pressed", an ? "true" : "false");
  });
  if (typeof window.filtern === "function") window.filtern();
}

function setzePfad(name) {
  sucheSeite.lektion = "";
  var feldSuche = document.getElementById("suche-inhalte");
  if (feldSuche) feldSuche.value = "";
  ["thema", "zielgruppe", "werkzeug"].forEach(function (g) { setzeFilter(g, "alle", "lektion"); });
  if (name === "anfang") {
    setzeFilter("thema", "methodik", "lektion");
    bump("null");
    hinweis("Einstieg ohne Vorwissen: Basismodule, Thema Methodik.");
    showView("inhalte", { leise: true });
    return;
  } else if (name === "bereits") {
    bump("bereits");
    hinweis("Sie nutzen KI bereits: die Anwendungsmodule.");
    showView("anwendung", { leise: true });
    return;
  } else {
    bump("frage");
    hinweis("Konkrete Frage: Suche oder FAQ.");
    showView("faq");
    var suche2 = document.getElementById("suche");
    if (suche2) suche2.focus();
    return;
  }
}

function hinweis(text) {
  var el = document.getElementById("pfadhinweis");
  if (!el) return;
  el.hidden = false;
  el.textContent = text;
}

var FILTER_WERTE = {
  thema: ["Thema", [["methodik", "Methodik"], ["recht-ethik", "Recht/Ethik"], ["daten", "Daten"], ["generative-ki", "Generative KI"], ["automatisierung", "Automatisierung"], ["vibe-coding", "Vibe-Coding"], ["uebersetzung", "Übersetzung/Transkription"]]],
  zielgruppe: ["Anwendungsfeld", [["ermittlung", "Ermittlung"], ["fuehrung", "Führung"], ["verwaltung", "Verwaltung"]]],
  werkzeug: ["KI-Tool", [["anychat", "AnyChat"], ["lingua", "Lingua"], ["translate", "Translate"], ["visualchat", "VisualChat"]]]
};
var FILTER_GRUPPEN = {
  lektion: ["thema", "zielgruppe", "werkzeug"],
  anwendung: ["thema", "zielgruppe", "werkzeug"],
  beitrag: ["thema", "zielgruppe", "werkzeug"],
  impuls: ["thema", "zielgruppe", "werkzeug"],
  live: ["thema", "zielgruppe", "werkzeug"],
  community: ["thema", "zielgruppe", "werkzeug"]
};
var SUCH_FELD = {
  lektion: "suche-inhalte",
  anwendung: "suche-anwendung",
  beitrag: "suche-beitrag",
  impuls: "suche-impuls",
  live: "suche-live",
  community: "suche-community"
};

function filterBereichHtml(scope) {
  var texte = {
    anwendung: {
      aria: "Suche in den verfügbaren Anwendungsmodulen",
      placeholder: "Anwendungsmodul suchen, z. B. Prompt, Transkription …",
      filter: "Verfügbare Anwendungsmodule filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Anwendungsmodule."
    },
    beitrag: {
      aria: "Suche in den verfügbaren Beiträgen",
      placeholder: "Beitrag suchen …",
      filter: "Verfügbare Beiträge filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Beiträge."
    },
    impuls: {
      aria: "Suche in den verfügbaren Praxisimpulsen",
      placeholder: "Praxisimpuls suchen, z. B. Auswertung, Skepsis, Bericht …",
      filter: "Verfügbare Praxisimpulse filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Praxisimpulse."
    },
    live: {
      aria: "Suche in den verfügbaren Live-Sessions",
      placeholder: "Live-Session suchen, z. B. Auswertung, Sprechstunde …",
      filter: "Verfügbare Live-Sessions filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Termine."
    },
    community: {
      aria: "Suche in den verfügbaren Communitys",
      placeholder: "Community suchen, z. B. Transkript, Bericht, Skepsis …",
      filter: "Verfügbare Communitys filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Communitys."
    }
  }[scope];
  var feld = SUCH_FELD[scope];
  var lupe = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><line x1=\"21\" y1=\"21\" x2=\"16.5\" y2=\"16.5\"/></svg>";
  var gruppen = (FILTER_GRUPPEN[scope] || []).map(function (g) {
    var def = FILTER_WERTE[g];
    var chips = "<button class=\"chip active\" type=\"button\" data-group=\"" + g + "\" data-value=\"alle\" aria-pressed=\"true\">Alle</button>" + def[1].map(function (w) {
      return "<button class=\"chip\" type=\"button\" data-group=\"" + g + "\" data-value=\"" + w[0] + "\" aria-pressed=\"false\">" + w[1] + "</button>";
    }).join("");
    return "<div class=\"fgroup\" role=\"group\" aria-label=\"" + def[0] + "\"><span class=\"flabel\">" + def[0] + "</span>" + chips + "</div>";
  }).join("");
  return "<div class=\"search bereich-suche\" role=\"search\">" + lupe
    + "<input id=\"" + feld + "\" type=\"search\" placeholder=\"" + texte.placeholder + "\" aria-label=\"" + texte.aria + "\">"
    + "<button type=\"button\" id=\"" + feld + "-btn\">Suchen</button></div>"
    + "<div class=\"filters\" data-scope=\"" + scope + "\" aria-label=\"" + texte.filter + "\">"
    + "<p class=\"filter-lead\">" + texte.lead + "</p>"
    + "<div class=\"filter-status\"><span class=\"fcount\" role=\"status\" aria-live=\"polite\"></span>"
    + "<button class=\"freset\" type=\"button\" data-filter-reset=\"" + scope + "\" hidden>Filter zurücksetzen</button></div>"
    + gruppen + "</div>";
}

function aktiveFilter(scope) {
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  var auswahl = {};
  var anzahl = 0;
  (FILTER_GRUPPEN[scope] || []).forEach(function (g) {
    auswahl[g] = [];
    if (!block) return;
    block.querySelectorAll(".chip").forEach(function (c) {
      if (c.dataset.group === g && c.dataset.value !== "alle" && c.classList.contains("active")) auswahl[g].push(c.dataset.value);
    });
    anzahl += auswahl[g].length;
  });
  return { auswahl: auswahl, anzahl: anzahl };
}

function passtKarte(el, scope, auswahl) {
  return (FILTER_GRUPPEN[scope] || []).every(function (g) {
    var werte = auswahl[g] || [];
    if (!werte.length) return true;
    var eigene = (el.dataset[g] || "").split(" ");
    return werte.some(function (w) { return eigene.indexOf(w) !== -1; });
  });
}

function syncAlleChips(scope) {
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  if (!block) return;
  block.querySelectorAll(".chip[data-value=\"alle\"]").forEach(function (c) {
    var aktiv = false;
    block.querySelectorAll(".chip").forEach(function (andere) {
      if (andere.dataset.group === c.dataset.group && andere.dataset.value !== "alle" && andere.classList.contains("active")) aktiv = true;
    });
    c.classList.toggle("active", !aktiv);
    c.setAttribute("aria-pressed", !aktiv ? "true" : "false");
  });
}

function filterStatusText(scope, sichtbar, gesamt, anzahl, q) {
  var namen = {
    lektion: { eine: "Basismodul", keine: "Kein Basismodul", alle: "Basismodule", fall: "Basismodulen" },
    anwendung: { eine: "Anwendungsmodul", keine: "Kein Anwendungsmodul", alle: "Anwendungsmodule", fall: "Anwendungsmodulen" },
    beitrag: { eine: "Beitrag", keine: "Kein Beitrag", alle: "Beiträge", fall: "Beiträgen" },
    impuls: { eine: "Praxisimpuls", keine: "Kein Praxisimpuls", alle: "Praxisimpulse", fall: "Praxisimpulsen" },
    live: { eine: "Live-Session", keine: "Keine Live-Session", alle: "Live-Sessions", fall: "Live-Sessions" },
    community: { eine: "Community", keine: "Keine Community", alle: "Communitys", fall: "Communitys" }
  }[scope];
  if (!namen) return "";
  if (anzahl === 0 && !q) {
    if (gesamt === 1) return scope === "impuls" ? "Der verfügbare Impuls wird angezeigt." : "Die verfügbare " + namen.eine + " wird angezeigt.";
    return "Alle " + gesamt + " verfügbaren " + namen.alle + " werden angezeigt.";
  }
  if (sichtbar === 0) return namen.keine + " entspricht dieser Auswahl.";
  if (sichtbar === 1) return "<strong>1</strong> von " + gesamt + " verfügbaren " + namen.fall + " entspricht Ihrer Auswahl.";
  return "<strong>" + sichtbar + "</strong> von " + gesamt + " verfügbaren " + namen.fall + " entsprechen Ihrer Auswahl.";
}

function setzeFilterStatus(scope, sichtbar, gesamt, anzahl, q) {
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  if (!block) return;
  var zahl = block.querySelector(".fcount");
  var reset = block.querySelector(".freset");
  if (zahl) zahl.innerHTML = filterStatusText(scope, sichtbar, gesamt, anzahl, q);
  if (reset) reset.hidden = anzahl === 0 && !q;
  syncAlleChips(scope);
}

function schreibeImpulsDaten(li, c) {
  schreibeFilterDaten(li, c);
  li.dataset.format = c.formatKey || "";
  li.dataset.suchtext = ((c.titel || "") + " " + (c.teaser || "")).toLowerCase();
}

function anreichernImpulse() {
  var ul = document.getElementById("impulse-alle");
  if (!ul) return;
  var vorhanden = {};
  Array.prototype.forEach.call(ul.children, function (li) {
    if (!li.querySelector) return;
    var btn = li.querySelector("[data-open]");
    if (!btn) return;
    vorhanden[btn.dataset.open] = true;
    var c = byId(btn.dataset.open);
    if (c) schreibeImpulsDaten(li, c);
  });
  alle().forEach(function (c) {
    if (!istImpuls(c) || vorhanden[c.id] || c.status !== "veroeffentlicht" || istEigen(c) || fortschrittVon(c)) return;
    var li = document.createElement("li");
    li.innerHTML = "<button type=\"button\" data-open=\"" + esc(c.id) + "\">" + esc(c.titel) + "<span>" + esc(c.dauer) + "</span></button>";
    schreibeImpulsDaten(li, c);
    ul.appendChild(li);
    vorhanden[c.id] = true;
  });
}

function filtereLektionen() {
  var kacheln = Array.prototype.slice.call(document.querySelectorAll("#katalog-grid .tile"));
  var q = (sucheSeite.lektion || "").trim().toLowerCase();
  var info = aktiveFilter("lektion");
  var gesamt = 0;
  var sichtbar = 0;
  kacheln.forEach(function (k) {
    var inhalt = byId(k.dataset.id);
    if (inhalt) schreibeFilterDaten(k, inhalt);
    var verfuegbar = !!(inhalt && istBasismodul(inhalt) && !istEigen(inhalt) && !fortschrittVon(inhalt));
    var treffer = verfuegbar && passtKarte(k, "lektion", info.auswahl);
    if (treffer && q && k.textContent.toLowerCase().indexOf(q) === -1) treffer = false;
    k.hidden = !treffer;
    if (verfuegbar) gesamt++;
    if (treffer) sichtbar++;
    verankereKachel(k);
  });
  setzeFilterStatus("lektion", sichtbar, gesamt, info.anzahl, q);
  var empty = document.getElementById("empty");
  if (empty) empty.hidden = sichtbar > 0;
}

function filtereImpulse() {
  anreichernImpulse();
  var items = Array.prototype.slice.call(document.querySelectorAll("#impulse-alle > li"));
  var q = (sucheSeite.impuls || "").trim().toLowerCase();
  var info = aktiveFilter("impuls");
  var gesamt = 0;
  var sichtbar = 0;
  items.forEach(function (li) {
    var btn = li.querySelector("[data-open]");
    var c = btn && byId(btn.dataset.open);
    var verfuegbar = !!(c && istImpuls(c) && c.status === "veroeffentlicht" && !istEigen(c) && !fortschrittVon(c));
    var treffer = verfuegbar && passtKarte(li, "impuls", info.auswahl);
    if (treffer && q && (li.dataset.suchtext || li.textContent || "").toLowerCase().indexOf(q) === -1) treffer = false;
    li.hidden = !treffer;
    if (verfuegbar) gesamt++;
    if (treffer) sichtbar++;
  });
  setzeFilterStatus("impuls", sichtbar, gesamt, info.anzahl, q);
  var leer = document.getElementById("impuls-filter-leer");
  if (leer) {
    leer.hidden = sichtbar > 0;
    leer.textContent = gesamt === 0 ? "Zurzeit kein weiterer Praxisimpuls." : "Kein Praxisimpuls entspricht dieser Auswahl.";
  }
}

function filtereBereichKarten(selektor, scope, leerId, filterLeerId) {
  var karten = Array.prototype.slice.call(document.querySelectorAll(selektor));
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  var leer = document.getElementById(leerId);
  var filterLeer = document.getElementById(filterLeerId);
  if (!block) {
    if (leer) leer.hidden = karten.length > 0;
    if (filterLeer) filterLeer.hidden = true;
    return;
  }
  var q = (sucheSeite[scope] || "").trim().toLowerCase();
  var info = aktiveFilter(scope);
  var sichtbar = 0;
  karten.forEach(function (k) {
    var treffer = passtKarte(k, scope, info.auswahl);
    if (treffer && q && k.textContent.toLowerCase().indexOf(q) === -1) treffer = false;
    k.hidden = !treffer;
    if (treffer) sichtbar++;
  });
  setzeFilterStatus(scope, sichtbar, karten.length, info.anzahl, q);
  if (leer) leer.hidden = karten.length > 0;
  if (filterLeer) filterLeer.hidden = !(karten.length > 0 && sichtbar === 0);
}

function filtereModul(scope, pred, gridId, leerId) {
  var grid = document.getElementById(gridId);
  if (!grid) return;
  var q = (sucheSeite[scope] || "").trim().toLowerCase();
  var info = aktiveFilter(scope);
  var liste = alle().filter(function (c) {
    return pred(c) && c.status === "veroeffentlicht" && !istEigen(c) && !fortschrittVon(c);
  });
  var sichtbar = 0;
  grid.innerHTML = "";
  liste.forEach(function (c) {
    var wrap = document.createElement("div");
    wrap.innerHTML = kachelMarkup(c);
    var k = wrap.firstElementChild;
    if (!k) return;
    schreibeFilterDaten(k, c);
    var treffer = passtKarte(k, scope, info.auswahl);
    if (treffer && q && k.textContent.toLowerCase().indexOf(q) === -1) treffer = false;
    k.hidden = !treffer;
    if (treffer) sichtbar++;
    grid.appendChild(k);
  });
  setzeFilterStatus(scope, sichtbar, liste.length, info.anzahl, q);
  var leer = document.getElementById(leerId);
  if (leer) leer.hidden = sichtbar > 0;
}

function filtern() {
  filtereLektionen();
  filtereModul("anwendung", istAnwendungsmodul, "anwendung-grid", "anwendung-leer");
  filtereModul("beitrag", istBeitrag, "beitrag-grid", "beitrag-leer");
  filtereImpulse();
  renderLive();
  renderCommunity();
  renderEigene();
  renderFortschritt();
}

function bereichZurueck(scope) {
  sucheSeite[scope] = "";
  var feld = document.getElementById(SUCH_FELD[scope] || "");
  if (feld) feld.value = "";
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  if (block) {
    block.querySelectorAll(".chip").forEach(function (c) {
      var an = c.dataset.value === "alle";
      c.classList.toggle("active", an);
      c.setAttribute("aria-pressed", an ? "true" : "false");
    });
  }
  if (scope === "lektion") {
    var hinweisFeld = document.getElementById("pfadhinweis");
    if (hinweisFeld) hinweisFeld.hidden = true;
  }
  filtern();
}

function suchZeile(label, titel, attrs) {
  return "<button type=\"button\" class=\"rowitem\" " + attrs + "><strong>" + esc(titel) + "</strong><span>" + esc(label) + "</span></button>";
}

function renderSuche() {
  var box = document.getElementById("suche-treffer");
  var frage = document.getElementById("suche-frage");
  if (!box) return;
  var roh = (suchtext || "").trim();
  var q = roh.toLowerCase();
  if (frage) {
    frage.textContent = q
      ? "Ergebnisse für „" + roh + "“. Geprüft werden Basismodule, Anwendungsmodule, Praxisimpulse, Beiträge, Live-Sessions, Communitys und die häufigen Fragen."
      : "Die Suche geht über Basismodule, Anwendungsmodule, Praxisimpulse, Beiträge, Live-Sessions, Communitys und die häufigen Fragen.";
  }
  if (!q) {
    box.innerHTML = "<p>Bitte geben Sie einen Suchbegriff ein.</p>";
    return;
  }
  var lektionen = [];
  var anwendung = [];
  var beitraege = [];
  var impulse = [];
  var sessions = [];
  var sessionIds = {};
  alle().forEach(function (c) {
    if (!c || !(istEigen(c) || c.status === "veroeffentlicht")) return;
    var hay = ((c.titel || "") + " " + (c.teaser || "") + " " + (c.format || "") + " " + (c.werkzeug || "") + " " + (c.autor || "")).toLowerCase();
    if (hay.indexOf(q) === -1) return;
    if (istImpuls(c)) impulse.push(c);
    else if (istLiveSession(c)) { sessions.push(c); sessionIds[c.id] = true; }
    else if (istBeitrag(c)) beitraege.push(c);
    else if (istBasismodul(c)) lektionen.push(c);
    else if (istAnwendungsmodul(c)) anwendung.push(c);
  });
  var fest = LIVE_FEST.filter(function (s) {
    return !sessionIds[s.id] && (s.titel + " " + s.text).toLowerCase().indexOf(q) >= 0;
  });
  var community = COMMUNITYS.filter(function (c) {
    return (c.titel + " " + (c.meta || "")).toLowerCase().indexOf(q) >= 0;
  });
  var faq = [];
  document.querySelectorAll(".faq-item").forEach(function (item) {
    if (item.textContent.toLowerCase().indexOf(q) >= 0) faq.push(item);
  });
  function inhaltButtons(liste, art) {
    return liste.map(function (c) {
      var zusatz = c.status && c.status !== "veroeffentlicht" ? " · " + statusLabel(c.status) : "";
      return suchZeile(art + zusatz, c.titel, "data-open=\"" + esc(c.id) + "\"");
    }).join("");
  }
  var gruppen = [];
  if (lektionen.length) gruppen.push(["Basismodule", inhaltButtons(lektionen, "Basismodul")]);
  if (anwendung.length) gruppen.push(["Anwendungsmodule", inhaltButtons(anwendung, "Anwendungsmodul")]);
  if (impulse.length) gruppen.push(["Praxisimpulse", inhaltButtons(impulse, "Praxisimpuls")]);
  if (beitraege.length) gruppen.push(["Beitrag", inhaltButtons(beitraege, "Beitrag")]);
  var liveHtml = inhaltButtons(sessions, "Live-Session") + fest.map(function (s) {
    return suchZeile("Live-Session", s.titel, "data-view-jump=\"live\" data-herkunft=\"live\"");
  }).join("");
  if (liveHtml) gruppen.push(["Live-Sessions", liveHtml]);
  if (community.length) gruppen.push(["Community", community.map(function (c) {
    return suchZeile("Community", c.titel, "data-view-jump=\"community\" data-herkunft=\"community\"");
  }).join("")]);
  if (faq.length) gruppen.push(["Häufige Fragen", faq.map(function (item) {
    var knopf = item.querySelector(".faq-q");
    var text = knopf && knopf.childNodes[0] ? knopf.childNodes[0].textContent.trim() : "";
    if (!text && knopf) text = knopf.textContent.replace("+", "").trim();
    return suchZeile("FAQ", text, "data-action=\"faq-sprung\" data-faq=\"" + esc(item.dataset.faq || "") + "\"");
  }).join("")]);
  if (!gruppen.length) {
    box.innerHTML = "<p>Keine Treffer. Eine KI-gestützte Recherche und ein Lern-Lotse gehören zur späteren Ausbaustufe, nicht zu dieser Suche.</p>";
    return;
  }
  box.innerHTML = gruppen.map(function (g) {
    return "<section class=\"such-gruppe\"><h2 class=\"bereich-titel\">" + esc(g[0]) + "</h2>" + g[1] + "</section>";
  }).join("");
}

function faqOeffnen(item) {
  document.querySelectorAll(".faq-item.open").forEach(function (o) {
    o.classList.remove("open");
    o.querySelector(".faq-a").style.maxHeight = null;
    o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
  });
  item.classList.add("open");
  var answer = item.querySelector(".faq-a");
  answer.style.maxHeight = answer.scrollHeight + "px";
  item.querySelector(".faq-q").setAttribute("aria-expanded", "true");
}

function initFilter() {
  ["anwendung", "beitrag", "impuls", "live", "community"].forEach(function (scope) {
    var slot = document.getElementById("filter-slot-" + scope);
    if (slot && !slot.firstChild) slot.innerHTML = filterBereichHtml(scope);
  });
  document.querySelectorAll(".filters[data-scope] .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var block = chip.closest(".filters");
      var gruppe = chip.dataset.group;
      if (chip.dataset.value === "alle") {
        block.querySelectorAll(".chip").forEach(function (c) {
          if (c.dataset.group === gruppe && c.dataset.value !== "alle") {
            c.classList.remove("active");
            c.setAttribute("aria-pressed", "false");
          }
        });
      } else {
        var an = chip.classList.toggle("active");
        chip.setAttribute("aria-pressed", an ? "true" : "false");
      }
      filtern();
    });
  });
  document.querySelectorAll("[data-filter-reset]").forEach(function (knopf) {
    knopf.addEventListener("click", function () {
      bereichZurueck(knopf.dataset.filterReset);
      if (knopf.dataset.filterReset === "lektion") {
        try { document.getElementById("inhalte").scrollIntoView({ block: "start" }); } catch (e) { /* Prototyp bleibt bedienbar. */ }
      }
    });
  });
  window.filtern = filtern;
  filtern();
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach(function (item, i) {
    if (!item.dataset.faq) item.dataset.faq = "f" + i;
    if (item.classList.contains("open")) {
      var offen = item.querySelector(".faq-a");
      if (offen) offen.style.maxHeight = "none";
    }
    var antwort = item.querySelector(".faq-a");
    if (antwort && !antwort.querySelector(".faq-meta")) {
      var fuss = document.createElement("div");
      fuss.className = "faq-fuss";
      var meta = document.createElement("p");
      meta.className = "faq-meta";
      meta.textContent = "Geprüft am " + (item.dataset.geprueft || "12.08.2026");
      fuss.appendChild(meta);
      var gegen = item.dataset.gegen || "";
      if (gegen) {
        var lage = document.createElement("span");
        lage.className = "faq-lage" + (/offen/i.test(gegen) ? " offen" : "");
        lage.textContent = gegen;
        fuss.appendChild(lage);
      }
      var melden = document.createElement("button");
      melden.type = "button";
      melden.className = "textbtn";
      melden.textContent = "Frage fehlt oder Antwort trägt nicht";
      melden.addEventListener("click", function () {
        meldungOeffnen("FAQ " + item.dataset.faq);
      });
      fuss.appendChild(melden);
      antwort.appendChild(fuss);
    }
  });
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) faqOeffnen(item);
    });
  });
}

function meldungOeffnen(ziel) {
  dialog({
    titel: "Rückmeldung",
    html: "<p>Die Meldung geht an die Redaktion und in die Quartalsprüfung. Sie ist keine Personenakte.</p><label class=\"field\"><span>Was trifft zu?</span><select id=\"melde-art\"><option>Frage fehlt</option><option>Antwort trägt nicht</option><option>Inhalt ist veraltet</option></select></label><label class=\"field\"><span>Kurz, optional</span><textarea id=\"melde-text\" rows=\"3\"></textarea></label>",
    aktionen: [
      { label: "Senden", fn: function () {
        state.meldungen.push({
          ziel: ziel,
          art: document.getElementById("melde-art").value,
          text: document.getElementById("melde-text").value.trim(),
          zeit: "gerade eben"
        });
        sichern();
        toast("Meldung ist bei der Redaktion angekommen.");
      } },
      { label: "Abbrechen", zweite: true }
    ]
  });
}

function init() {
  renderNav();
  renderHub();
  renderProfilKnopf();
  wendeEinfach();
  initFaq();
  initFilter();
  syncKacheln();
  renderLive();
  renderCommunity();
  sofortKarte();
  if (!sessionStorage.getItem("kiw-start")) {
    sessionStorage.setItem("kiw-start", "1");
  }
  if (authAktiv()) {
    state.extra.start = (state.extra.start || 0);
    showView("home", { leise: true });
    var hello = document.getElementById("hello");
    hello.hidden = false;
  } else {
    showView("sso");
  }

  document.getElementById("sso-go").addEventListener("click", function () {
    sessionStorage.setItem("kiw-auth", "1");
    state.extra.start = (state.extra.start || 0) + 1;
    sichern();
    var hello = document.getElementById("hello");
    hello.hidden = false;
    showView("home");
    toast("Guten Tag, Henning Beckmann. Die Nutzung ist freiwillig.");
  });

  document.querySelector("header nav").addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-nav-toggle]");
    if (toggle) {
      e.preventDefault();
      var sub = document.getElementById("nav-inhalte-sub");
      var auf = sub.hidden;
      sub.hidden = !auf;
      toggle.setAttribute("aria-expanded", auf ? "true" : "false");
      return;
    }
    var a = e.target.closest("a[data-view]");
    if (!a) return;
    e.preventDefault();
    var menu = document.getElementById("nav-inhalte-sub");
    var knopf = document.getElementById("nav-inhalte-btn");
    if (menu) menu.hidden = true;
    if (knopf) knopf.setAttribute("aria-expanded", "false");
    showView(a.dataset.view, { anker: a.dataset.anker || "", leise: !!a.dataset.anker });
  });

  document.querySelector(".wordmark").addEventListener("click", function (e) {
    if (e.target.closest(".p-mark, .p-tip")) return;
    if (!authAktiv()) return;
    showView("home");
  });

  var pbtn = document.getElementById("profile-btn");
  var pmenu = document.getElementById("profile-menu");
  pbtn.addEventListener("click", function () {
    var auf = pmenu.hidden;
    pmenu.hidden = !auf;
    pbtn.setAttribute("aria-expanded", auf ? "true" : "false");
  });

  document.getElementById("einfach-toggle").addEventListener("click", function () {
    state.einfach = !state.einfach;
    sichern();
    renderProfilKnopf();
    wendeEinfach();
  });

  document.querySelectorAll("[data-rolle]").forEach(function (b) {
    b.addEventListener("click", function () {
      state.rolle = b.dataset.rolle;
      sichern();
      renderNav();
      renderHub();
      renderProfilKnopf();
      pmenu.hidden = true;
      var ziel = "dashboard";
      if (state.rolle === "creator" && kannAnlegen()) ziel = "meine";
      if (state.rolle === "redaktion" && darfFreigeben()) ziel = "redaktion";
      if (state.rolle === "admin" && darfVerwalten()) ziel = "admin";
      var ohneErnennung = (state.rolle === "creator" && !kannAnlegen()) || (state.rolle === "redaktion" && !darfFreigeben()) || (state.rolle === "admin" && !darfVerwalten());
      showView(ziel);
      if (window.filtern) window.filtern();
      else renderEigene();
      toast(ohneErnennung ? "Für Henning Beckmann liegt die Ernennung " + rolleLabel(state.rolle) + " nicht vor." : rolleHinweis(state.rolle));
    });
  });

  document.getElementById("menu-profil").addEventListener("click", function () {
    pmenu.hidden = true;
    showView("profil");
  });
  document.getElementById("menu-abmelden").addEventListener("click", function () {
    sessionStorage.removeItem("kiw-auth");
    pmenu.hidden = true;
    showView("sso");
  });

  function sucheGlobal(wert) {
    suchtext = wert || "";
    ["suche", "suche-kopf"].forEach(function (id) {
      var feld = document.getElementById(id);
      if (feld && feld.value !== suchtext) feld.value = suchtext;
    });
    if (!authAktiv()) { showView("sso"); return; }
    showView("suche", { leise: true });
    kopfSuche(false);
  }
  function sucheLokal(scope, wert) {
    sucheSeite[scope] = wert || "";
    var ziel = { lektion: "inhalte", impuls: "impulse", live: "live", community: "community" }[scope] || "inhalte";
    if (!authAktiv()) { showView("sso"); return; }
    showView(ziel, { leise: true });
  }
  var lupe = document.getElementById("lupe");
  var kopfSuchfeld = document.getElementById("kopf-suchfeld");
  function kopfSuche(auf) {
    if (!kopfSuchfeld || !lupe) return;
    var warOffen = !kopfSuchfeld.hidden;
    kopfSuchfeld.hidden = !auf;
    lupe.setAttribute("aria-expanded", auf ? "true" : "false");
    lupe.setAttribute("aria-label", auf ? "Suche schließen" : "Suche öffnen");
    if (auf) {
      var feld = document.getElementById("suche-kopf");
      if (feld) feld.focus();
    } else if (warOffen) {
      lupe.focus();
    }
  }
  if (lupe && kopfSuchfeld) {
    lupe.addEventListener("click", function () { kopfSuche(kopfSuchfeld.hidden); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !kopfSuchfeld.hidden) kopfSuche(false);
      if (e.key === "Escape") {
        var sub = document.getElementById("nav-inhalte-sub");
        var knopf = document.getElementById("nav-inhalte-btn");
        if (sub && !sub.hidden) { sub.hidden = true; if (knopf) knopf.setAttribute("aria-expanded", "false"); }
      }
    });
    document.addEventListener("click", function (e) {
      if (!kopfSuchfeld.hidden && !e.target.closest(".kopf-suche")) kopfSuche(false);
      var sub = document.getElementById("nav-inhalte-sub");
      var knopf = document.getElementById("nav-inhalte-btn");
      if (sub && !sub.hidden && !e.target.closest(".nav-drop")) {
        sub.hidden = true;
        if (knopf) knopf.setAttribute("aria-expanded", "false");
      }
    });
  }
  [
    ["suche", "suche-btn", "global"],
    ["suche-kopf", "suche-kopf-btn", "global"],
    ["suche-inhalte", "suche-inhalte-btn", "lektion"],
    ["suche-anwendung", "suche-anwendung-btn", "anwendung"],
    ["suche-beitrag", "suche-beitrag-btn", "beitrag"],
    ["suche-impuls", "suche-impuls-btn", "impuls"],
    ["suche-live", "suche-live-btn", "live"],
    ["suche-community", "suche-community-btn", "community"]
  ].forEach(function (paar) {
    var feld = document.getElementById(paar[0]);
    var knopf = document.getElementById(paar[1]);
    if (!feld || !knopf) return;
    function los() {
      if (paar[2] === "global") sucheGlobal(feld.value);
      else sucheLokal(paar[2], feld.value);
    }
    knopf.addEventListener("click", los);
    feld.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); los(); }
    });
  });

  document.querySelectorAll("[data-pfad]").forEach(function (p) {
    function go() {
      if (!authAktiv()) { showView("sso"); return; }
      setzePfad(p.dataset.pfad);
    }
    p.addEventListener("click", go);
    p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  document.getElementById("orient-btn").addEventListener("click", function () {
    var panel = document.getElementById("orient-panel");
    var card = document.getElementById("orient-card");
    var auf = panel.hidden;
    panel.hidden = !auf;
    card.classList.toggle("open", auf);
    document.getElementById("orient-btn").setAttribute("aria-expanded", auf ? "true" : "false");
  });

  document.getElementById("sofort-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    oeffneInhalt(document.getElementById("sofort-btn").dataset.sofort || "berichte", true, "", e.currentTarget);
  });
  document.querySelectorAll(".grid").forEach(function (grid) {
    grid.addEventListener("click", function (e) {
      if (e.target.closest(".likebtn, .kommentar-link, .stift, [data-action], [data-bewerten], [data-kommentar]")) return;
      var tile = e.target.closest(".tile");
      if (!tile || !tile.dataset.id) return;
      oeffneInhalt(tile.dataset.id, false, "", tile);
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (e.target.closest(".likebtn, .kommentar-link, button")) return;
      var tile = e.target.closest(".tile");
      if (!tile || !tile.dataset.id) return;
      e.preventDefault();
      oeffneInhalt(tile.dataset.id, false, "", tile);
    });
  });
  document.body.addEventListener("change", function (e) {
    if (e.target.name === "datei" && e.target.files && e.target.files[0]) {
      var p = document.getElementById("dateiname");
      if (p) {
        p.dataset.datei = e.target.files[0].name;
        p.textContent = e.target.files[0].name;
      }
    }
  });

  document.body.addEventListener("click", function (e) {
    var bewerten = e.target.closest("[data-bewerten]");
    if (bewerten) {
      e.preventDefault();
      var bid = bewerten.dataset.bewerten;
      state.feedback[bid] = state.feedback[bid] === "up" ? "" : "up";
      sichern();
      var playerOffen = document.getElementById("view-player") && !document.getElementById("view-player").hidden;
      if (playerOffen && aktuell === bid && detailModus !== "bearbeiten") renderPlayer();
      else if (window.filtern) window.filtern();
      toast(state.feedback[bid] === "up" ? "Danke. Die Moderation sieht nur die Summe." : "Bewertung zurückgenommen.");
      return;
    }
    var open = e.target.closest("[data-open]");
    if (open && !e.target.closest("a")) {
      oeffneInhalt(open.dataset.open, false, open.dataset.kommentar ? "kommentar-bereich" : "", open);
      return;
    }
    var jump = e.target.closest("[data-view-jump]");
    if (jump) {
      if (jump.dataset.herkunft) herkunftSetzen(jump.dataset.herkunft);
      showView(jump.dataset.viewJump, { anker: jump.dataset.anker || "", leise: !!jump.dataset.anker });
      return;
    }
    var act = e.target.closest("[data-action]");
    if (act) {
    var action = act.dataset.action;
    if (action === "zur-lernansicht") showView("inhalte");
    if (action === "zurueck-inhalt") showView("player");
    if (action === "abschliessen") {
      selbstGeprueft = !!(document.getElementById("selbstcheck") && document.getElementById("selbstcheck").checked);
      showView("summary");
    }
    if (action === "melden") meldungOeffnen(act.dataset.ziel || aktuell || "Inhalt");
    if (action === "faq-sprung") {
      var item = document.querySelector('.faq-item[data-faq="' + act.dataset.faq + '"]');
      showView("faq");
      if (item) faqOeffnen(item);
    }
    if (action === "zum-kommentar") {
      var kommentarZiel = document.getElementById("kommentar-bereich");
      if (kommentarZiel) {
        try { kommentarZiel.scrollIntoView({ block: "start" }); } catch (err) { /* Prototyp bleibt bedienbar. */ }
        var eingabe = kommentarZiel.querySelector("textarea");
        if (eingabe) eingabe.focus();
      }
    }
    if (action === "neu") {
      if (!kannAnlegen()) { toast("Anlegen können Content Creator, Redaktion und Administration."); return; }
      editorId = null;
      editorVorgabe = act.dataset.art || "inhalt";
      detailModus = "bearbeiten";
      herkunftSetzen(editorVorgabe === "impuls" && act.id === "impuls-anbieten" ? "impulse" : "meine");
      showView("player");
    }
    if (action === "schritt-hinzu") {
      var liste = document.getElementById("schritt-liste");
      if (liste) {
        var anzahl = liste.querySelectorAll(".schritt-feld").length;
        if (anzahl >= 6) toast("Sechs Schritte reichen für eine kurze Einheit.");
        else liste.insertAdjacentHTML("beforeend", schrittFeld(anzahl, { t: "", d: "" }));
      }
    }
    if (action === "bearbeiten") {
      if (!kannAnlegen()) { toast("Bearbeiten können Content Creator, Redaktion und Administration."); return; }
      var zielInhalt = byId(act.dataset.id);
      if (!kannBearbeitenInhalt(zielInhalt)) {
        toast("Nur die erstellende Person oder jemand mit Edit-Recht kann das bearbeiten.");
        return;
      }
      editorId = act.dataset.id;
      editorVorgabe = "";
      detailModus = "bearbeiten";
      aktuell = editorId;
      showView("player");
    }
    if (action === "fortschritt") {
      if (!aktuell || kannBearbeitenInhalt(byId(aktuell))) return;
      state.fortschritt = state.fortschritt || {};
      state.fortschritt[aktuell] = act.dataset.stand === "abgeschlossen" ? "abgeschlossen" : "begonnen";
      sichern();
      if (window.filtern) window.filtern();
      renderPlayer();
      var fertigName = istImpuls(byId(aktuell)) ? "Abgeschlossene Praxisimpulse" : "Abgeschlossene Basismodule";
      var begonnenName = istImpuls(byId(aktuell)) ? "Begonnene Praxisimpulse" : "Begonnene Basismodule";
      toast(state.fortschritt[aktuell] === "abgeschlossen" ? "Liegt jetzt unter " + fertigName + "." : "Liegt wieder unter " + begonnenName + ".");
    }
    if (action === "live-teilnehmen") {
      var liveId = act.dataset.id;
      if (!liveId) return;
      state.liveTeilnahme = state.liveTeilnahme || {};
      state.liveTeilnahme[liveId] = true;
      sichern();
      renderLive();
      toast("Die Session steht jetzt unter Teilgenommen.");
    }
    if (action === "community-mit") {
      var communityId = act.dataset.id;
      if (!communityId) return;
      state.communityMit = state.communityMit || {};
      state.communityMit[communityId] = !state.communityMit[communityId];
      sichern();
      renderCommunity();
      toast(state.communityMit[communityId] ? "Der Bereich steht jetzt unter Mitwirkung." : "Der Bereich steht wieder unter verfügbaren Communitys.");
    }
    if (action === "community-lesen") {
      if (e.target.closest("[data-action=community-mit]")) return;
      oeffneAusbau("Forenvorschau", "Den Beitrag können Sie hier nur als Vorschau lesen. Fragen stellen, Taggen und eigene Beiträge löschen folgen mit den Leitforen.");
    }
    if (action === "edit-recht") {
      var inhaltId = act.dataset.id;
      var personId = act.dataset.person;
      var inhaltRecht = byId(inhaltId);
      if (!istUrheber(inhaltRecht) || !personId || personId === "hb") return;
      state.editRechte = state.editRechte || {};
      state.editRechte[inhaltId] = state.editRechte[inhaltId] || {};
      state.editRechte[inhaltId][personId] = !state.editRechte[inhaltId][personId];
      sichern();
      renderPlayer();
      var wen = PERSONEN.filter(function (p) { return p.id === personId; })[0];
      toast((wen ? wen.name : "Die Person") + (state.editRechte[inhaltId][personId] ? " darf diesen Inhalt bearbeiten." : " hat kein Edit-Recht mehr."));
    }
    if (action === "review") { aktuell = act.dataset.id; detailModus = "lesen"; oeffneInhalt(act.dataset.id); }
    if (action === "passwort") {
      oeffneAusbau("Zugang", "Ein Passwort der KI-Werkstatt gibt es nicht. Zurücksetzen und Sperre liegen beim Behördenkonto über ADFS.");
    }
    if (action === "mod-sprung") {
      var sprung = document.getElementById(act.dataset.ziel);
      if (sprung) {
        try { sprung.scrollIntoView({ block: "start" }); } catch (err) { /* Prototyp bleibt bedienbar. */ }
      }
    }
    if (action === "ernennung") {
      var art = act.dataset.art;
      var person = act.dataset.person;
      if (!darfVerwalten() || !state.ernennungen[art] || !person) return;
      if (art === "admin" && person === "hb") {
        toast("Die Administration dieses Kontos bleibt, sonst ist die Ernennung nicht mehr erreichbar.");
        return;
      }
      state.ernennungen[art][person] = !hatErnennung(art, person);
      sichern();
      renderAdmin();
      renderNav();
      renderHub();
      if (person === "hb" && ((art === "creator" && state.rolle === "creator" && !kannAnlegen()) || (art === "redaktion" && state.rolle === "redaktion" && !darfFreigeben()))) showView("dashboard");
      var wer = PERSONEN.filter(function (p) { return p.id === person; })[0];
      toast((wer ? wer.name : "Die Person") + (hatErnennung(art, person) ? " ist jetzt " + rolleLabel(art) + "." : " ist wieder Teilnehmer."));
    }
    if (action === "stichprobe") {
      state.stichprobe.halluzinationen = true;
      sichern();
      renderRedaktion();
      toast("Stichprobe ist markiert.");
    }
    if (action === "zurueckgeben") {
      var grundFeld = document.getElementById("freigabe-grund") || document.querySelector("#review-form textarea");
      var grund = grundFeld ? grundFeld.value : "";
      if (!grund.trim()) { toast("Bitte eine Begründung angeben."); return; }
      state.status[aktuell] = "entwurf";
      state.override[aktuell] = Object.assign({}, state.override[aktuell] || {}, { vorher: "Zurückgegeben: " + grund.trim() });
      sichern();
      syncKacheln();
      toast("Zurück an die einreichende Person. Der Inhalt ist nicht sichtbar.");
      showView("redaktion");
    }
    if (action === "freigeben") {
      if (mangel(byId(aktuell)).length) return;
      state.status[aktuell] = "veroeffentlicht";
      state.pruefdatum = state.pruefdatum || {};
      state.pruefdatum[aktuell] = "2026-11-02";
      sichern();
      syncKacheln();
      detailModus = "lesen";
      toast("Freigegeben. Der Inhalt ist jetzt sichtbar.");
      showView("player");
    }
    if (action === "veroeffentlichen") {
      var cur = byId(aktuell);
      if (cur.status !== "freigabe" || mangel(cur).length) return;
      state.status[aktuell] = "veroeffentlicht";
      sichern();
      syncKacheln();
      toast("Veröffentlicht. Der Inhalt liegt in der Kursübersicht.");
      showView("redaktion");
    }
    if (action === "kommentar-loeschen") {
      var loeschId = act.dataset.id || aktuell;
      var loeschKey = act.dataset.key;
      if (loeschId && loeschKey) {
        state.kommentarWeg[loeschId] = state.kommentarWeg[loeschId] || {};
        state.kommentarWeg[loeschId][loeschKey] = true;
        sichern();
        var playerSicht = document.getElementById("view-player");
        if (playerSicht && !playerSicht.hidden && detailModus !== "bearbeiten") renderPlayer();
        ["redaktion", "mod-freigabe", "mod-kommentare", "mod-pruefung"].forEach(function (name) {
          var sicht = document.getElementById("view-" + name);
          if (!sicht || sicht.hidden) return;
          if (name === "redaktion") renderRedaktion();
          else renderModBereich(name.replace("mod-", ""));
        });
        toast("Kommentar gelöscht.");
      }
    }
    if (action === "kommentar-melden") {
      state.kommentarFlags[aktuell] = state.kommentarFlags[aktuell] || {};
      state.kommentarFlags[aktuell][act.dataset.key] = true;
      state.meldungen.push({ ziel: aktuell, key: act.dataset.key, art: "Kommentar", text: "", zeit: "gerade eben" });
      sichern();
      renderPlayer();
      toast("Kommentar ist bei der Moderation gemeldet.");
    }
    }
    var fb = e.target.closest("[data-fb]");
    if (fb && aktuell) {
      state.feedback[aktuell] = state.feedback[aktuell] === fb.dataset.fb ? "" : fb.dataset.fb;
      sichern();
      var playerFb = document.getElementById("view-player");
      if (playerFb && !playerFb.hidden && detailModus !== "bearbeiten") renderPlayer();
      else renderSummary();
      toast(state.feedback[aktuell] ? "Danke. Die Moderation sieht nur die Summe." : "Bewertung zurückgenommen.");
      return;
    }
    var h5p = e.target.closest("[data-h5p]");
    if (h5p) {
      var c5 = byId(aktuell);
      var opt = c5 && c5.h5p && c5.h5p.optionen[Number(h5p.dataset.h5p)];
      var hin = document.getElementById("h5p-hinweis");
      if (opt && hin) {
        hin.hidden = false;
        hin.textContent = (opt.ok ? "Das trifft zu. " : "Das trifft so nicht zu. ") + c5.h5p.hinweis;
      }
    }
  });

  document.body.addEventListener("submit", function (e) {
    if (e.target.id === "kommentar-form") {
      e.preventDefault();
      var text = new FormData(e.target).get("text");
      if (!String(text || "").trim()) return;
      state.kommentare[aktuell] = state.kommentare[aktuell] || [];
      state.kommentare[aktuell].push({ name: "Henning Beckmann", meta: "gerade eben", text: String(text).trim(), eigen: true });
      sichern();
      renderPlayer();
      if (window.filtern) window.filtern();
      toast("Kommentar steht unter Ihrem Namen.");
    }
    if (e.target.id === "editor-form") {
      e.preventDefault();
      var ziel = e.submitter && e.submitter.value === "review" ? "review" : "entwurf";
      var obj = leseEditor(e.target, ziel);
      if (!obj.titel) { toast("Bitte einen Titel setzen."); return; }
      if (ziel === "review") {
        var luecken = mangel(obj);
        if (luecken.length) {
          dialog({
            titel: "Noch nicht prüfbar",
            html: "<p>Zur Prüfung fehlen noch Pflichtmerkmale. Als Entwurf können Sie trotzdem speichern.</p><ul class=\"pruef\">" + luecken.map(function (l) { return "<li class=\"bad\">" + esc(l) + "</li>"; }).join("") + "</ul>",
            aktionen: [{ label: "Als Entwurf speichern", fn: function () { obj.status = "entwurf"; editorId = obj.id; speichereInhalt(obj); detailModus = "lesen"; aktuell = obj.id; showView("player"); toast("Entwurf gespeichert."); } }, { label: "Weiter bearbeiten", zweite: true }]
          });
          return;
        }
      }
      editorId = obj.id;
      speichereInhalt(obj);
      detailModus = "lesen";
      aktuell = obj.id;
      showView("player");
      toast(ziel === "review" ? "Zur Prüfung gegeben. Die Moderation sieht denselben Inhalt." : "Entwurf gespeichert. Er liegt unter Meine Inhalte.");
    }
    if (e.target.id === "pin-form") {
      e.preventDefault();
      state.prominent = new FormData(e.target).get("pin");
      sichern();
      sofortKarte();
      toast("Der Impuls steht auf der Einstiegsseite, ohne weitere Klickstrecke.");
    }
    if (e.target.id === "profil-form") {
      e.preventDefault();
      var data = new FormData(e.target);
      state.behoerde = String(data.get("behoerde") || "").trim() || state.behoerde;
      state.einfach = data.get("einfach") === "on";
      sichern();
      renderProfilKnopf();
      wendeEinfach();
      toast("Profil gespeichert. Die Sprache bleibt Deutsch.");
    }
  });

  var impulseListe = document.querySelector(".impulse-grid");
  if (impulseListe) impulseListe.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest(".imp");
    if (!card || !card.dataset.open) return;
    e.preventDefault();
    oeffneInhalt(card.dataset.open, false, "", card);
  });

  document.getElementById("community-mehr").addEventListener("click", function () {
    oeffneAusbau("Leitforen und Ansprechpersonen", "Drei bis vier moderierte Foren, Tags, das Löschen eigener Beiträge, die Praxis-FAQ und die Suche nach ansprechbaren Personen sind beschrieben, aber nicht Teil der ersten Iteration.");
  });
  var liveKnopf = document.getElementById("live-btn");
  if (liveKnopf) liveKnopf.addEventListener("click", function () {
    oeffneAusbau("Open-Space und Live-Formate", "Regelmäßige Live-Sessions und das vertrauliche Open-Space-Format folgen später. Vertraulichkeitsregeln würden zu Beginn jeder Sitzung sichtbar. Aufzeichnungen können als Lektion in der Werkstatt liegen.");
  });
  document.getElementById("impuls-anbieten").addEventListener("click", function () {
    dialog({
      titel: "Impuls anbieten",
      html: "<p>Es braucht Erfahrung aus dem Alltag, keinen Expertenstatus. Auch ein misslungener Versuch ist ein Beitrag. Anlegen können Content Creator, Redaktion und Administration. Die Redaktion entscheidet über die Veröffentlichung.</p>",
      aktionen: [
        { label: "Impuls anlegen", fn: function () { if (!kannAnlegen()) { toast("Anlegen können Content Creator, Redaktion und Administration."); return; } editorId = null; editorVorgabe = "impuls"; detailModus = "bearbeiten"; herkunftSetzen("impulse"); showView("player"); } },
        { label: "Schließen", zweite: true }
      ]
    });
  });
  document.querySelectorAll(".thread").forEach(function (th) {
    th.addEventListener("click", function (ev) {
      if (ev.target.closest("[data-action]")) return;
      oeffneAusbau("Forenvorschau", "Den Beitrag können Sie hier nur als Vorschau lesen. Fragen stellen, Taggen und eigene Beiträge löschen folgen mit den Leitforen.");
    });
  });

  document.getElementById("dialog-close").addEventListener("click", dialogZu);
  document.getElementById("dialog").addEventListener("click", function (e) {
    if (e.target.id === "dialog") dialogZu();
  });

  var pmode = document.getElementById("pmode");
  pmode.addEventListener("click", function () {
    var an = document.body.classList.toggle("pmode");
    pmode.setAttribute("aria-pressed", an ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!document.getElementById("dialog").hidden) { dialogZu(); return; }
      if (!pmenu.hidden) { pmenu.hidden = true; pbtn.setAttribute("aria-expanded", "false"); return; }
      if (document.body.classList.contains("pmode")) {
        document.body.classList.remove("pmode");
        pmode.setAttribute("aria-pressed", "false");
      }
    }
  });

  document.body.addEventListener("mouseover", begriffZeigen);
  document.body.addEventListener("focusin", begriffZeigen);
  document.body.addEventListener("mouseout", function (e) {
    if (e.target.classList && e.target.classList.contains("term")) pop.hidden = true;
  });
  document.body.addEventListener("focusout", function (e) {
    if (e.target.classList && e.target.classList.contains("term")) pop.hidden = true;
  });
}

var pop = document.createElement("div");
pop.className = "term-pop";
pop.hidden = true;
pop.setAttribute("role", "tooltip");
document.addEventListener("DOMContentLoaded", function () {
  document.body.appendChild(pop);
  init();
});

function begriffZeigen(e) {
  var btn = e.target.closest ? e.target.closest(".term") : null;
  if (!btn) return;
  var g = null;
  GLOSSAR.some(function (x) { if (x.begriff === btn.dataset.begriff) { g = x; return true; } return false; });
  if (!g) return;
  pop.innerHTML = "<strong>" + esc(g.begriff) + "</strong><span>" + esc(g.text) + "</span>";
  pop.hidden = false;
  var r = btn.getBoundingClientRect();
  pop.style.top = (window.scrollY + r.bottom + 8) + "px";
  pop.style.left = Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - 340) + "px";
}

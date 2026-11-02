"use strict";
/* Interaktion des statischen MVP-Clickdummies. Kein Server, kein Build. */

var STORE = "kiw-dummy-v1";
var aktuell = null;
var suchtext = "";
var selbstGeprueft = false;
var editorId = null;

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
    kommentare: [{ name: "T. Hoffmann", meta: "KPB Borken · vor 4 Tagen", text: "Bei Hintergrundgeräuschen wich das Transkript stark ab. Der Gegencheck an den Zahlen hat das aufgefangen." }]
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
      { t: "Eine offene Frage notieren", d: "Wenn sie wiederkehrt, merkt sich die Redaktion sie. Ein Austausch dazu kommt später." }
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
    rolle: "beschaeftigte",
    einfach: false,
    behoerde: "LAFP NRW",
    feedback: {},
    kommentare: {},
    meldungen: [],
    status: {},
    override: {},
    eigene: [],
    prominent: "berichte",
    extra: { start: 0, null: 0, bereits: 0, frage: 0, inhalte: {} },
    stichprobe: {},
    pruefdatum: {}
  };
}

function laden() {
  var basis = leerZustand();
  try {
    var roh = JSON.parse(localStorage.getItem(STORE) || "{}");
    Object.keys(basis).forEach(function (k) {
      if (roh[k] !== undefined) basis[k] = roh[k];
    });
  } catch (e) { /* Prototyp bleibt mit dem Ausgangsstand nutzbar. */ }
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
  if (!c.niveau) m.push("Niveaustufe fehlt. Genau eine Stufe ist Pflicht.");
  if (!c.felder || !c.felder.length) m.push("Anwendungsfeld fehlt.");
  if (!c.dauerMin) m.push("Dauer fehlt.");
  else if (c.dauerMin > 10) m.push("Umfang über dem Richtwert von 10 Minuten.");
  if (!c.ergebnis) m.push("Ergebnis fehlt. Dauer und Ergebnis stehen vor Beginn am Inhalt.");
  if (!c.glossarOk) m.push("Fachbegriffe und Anglizismen sind nicht als erklärt gekennzeichnet.");
  if (c.anwendungsbezogen !== false) {
    var p = c.praxis || {};
    if (!p.rolle || !p.taetigkeit || !p.nutzen || !p.grenze) {
      m.push("Praxisbeispiel unvollständig. Es braucht Rolle, Tätigkeit, Nutzen und Grenze.");
    }
  }
  return m;
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
  return { beschaeftigte: "Lernen", creator: "Einreichen", redaktion: "Freigeben", admin: "Verwaltung" }[r] || "Lernen";
}

function rolleErklaerung(r) {
  return {
    beschaeftigte: "Sie sehen einen Beitrag und schließen ihn ab.",
    creator: "Sie schicken einen eigenen Beitrag zur Prüfung.",
    redaktion: "Sie prüfen einen Beitrag und geben ihn frei.",
    admin: "Sie sehen, wer was darf. Der Lernweg bleibt."
  }[r] || "";
}

function schrittVon(name) {
  if (name === "sso" || name === "anmelden") return "anmelden";
  if (name === "editor" || name === "meine" || name === "leitfaden") return "einreichen";
  if (name === "redaktion" || name === "review" || name === "statistik") return "freigeben";
  if (name === "admin") return "";
  return "lernen";
}

function gehSchritt(name) {
  if (name === "anmelden") {
    showView(authAktiv() ? "anmelden" : "sso");
    return;
  }
  if (!authAktiv()) {
    showView("sso");
    return;
  }
  if (name === "lernen") state.rolle = "beschaeftigte";
  else if (name === "einreichen") {
    state.rolle = "creator";
    editorId = null;
  } else if (name === "freigeben") state.rolle = "redaktion";
  else return;
  sichern();
  renderProfilKnopf();
  showView({ lernen: "home", einreichen: "editor", freigeben: "redaktion" }[name]);
}

function showView(name, opt) {
  opt = opt || {};
  if (name !== "sso" && !authAktiv()) name = "sso";
  document.body.classList.toggle("sso", name === "sso");
  document.querySelectorAll(".view").forEach(function (v) {
    v.hidden = v.id !== "view-" + name;
  });
  if (name === "player") renderPlayer();
  if (name === "summary") renderSummary();
  if (name === "glossar") renderGlossar();
  if (name === "profil") renderProfil();
  if (name === "editor") renderEditor();
  if (name === "meine") renderMeine();
  if (name === "redaktion") renderRedaktion();
  if (name === "review") renderReview();
  if (name === "statistik") renderStatistik();
  if (name === "admin") renderAdmin();
  if (name === "leitfaden") { /* statisches HTML */ }
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

function markNav(name) {
  var current = schrittVon(name);
  var order = ["anmelden", "lernen", "einreichen", "freigeben"];
  var idx = order.indexOf(current);
  document.querySelectorAll("header nav a").forEach(function (a) {
    var i = order.indexOf(a.dataset.nav);
    if (a.dataset.nav === current) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
    a.classList.toggle("erledigt", idx > -1 && i > -1 && i < idx);
  });
}

function renderNav() {
  var items = [
    ["anmelden", "Anmelden"],
    ["lernen", "Lernen"],
    ["einreichen", "Einreichen"],
    ["freigeben", "Freigeben"]
  ];
  var nav = document.querySelector("header nav");
  nav.setAttribute("aria-label", "Schritte");
  nav.innerHTML = items.map(function (it) {
    return "<a href=\"#" + it[0] + "\" data-nav=\"" + it[0] + "\" data-schritt=\"" + it[0] + "\">" + it[1] + "</a>";
  }).join("");
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
    html: "<p>" + text + "</p><p class=\"modal-note\">Das kommt später. Hier ist es nur ein Hinweis.</p>",
    aktionen: [{ label: "Schließen", zweite: true }]
  });
}

function oeffneInhalt(id) {
  var c = byId(id);
  if (!c || c.status !== "veroeffentlicht") {
    toast("Dieser Inhalt ist noch nicht veröffentlicht.");
    return;
  }
  aktuell = id;
  selbstGeprueft = false;
  bumpInhalt(id);
  showView("player");
}

function kommentareVon(c) {
  return (c.kommentare || []).concat(state.kommentare[c.id] || []);
}

function renderPlayer() {
  var c = byId(aktuell);
  var root = document.getElementById("view-player");
  if (!c) { root.innerHTML = "<p>Inhalt nicht gefunden.</p>"; return; }
  var stage = "";
  if (c.medien === "poltube") {
    stage = "<div class=\"stage\"><div class=\"video-fake\"><div class=\"playbig\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\"><polygon points=\"9 6 19 12 9 18\" fill=\"#fff\"/></svg></div><p class=\"video-caption\">Video</p></div><div class=\"transcript\"><h3>Derselbe Text</h3><p>" + mitBegriffen(c.teaser) + "</p></div></div>";
  } else if (c.medien === "h5p" && c.h5p) {
    stage = "<div class=\"stage h5p\"><h3 id=\"h5p-frage\">" + esc(c.h5p.frage) + "</h3><div class=\"h5p-options\">" + c.h5p.optionen.map(function (o, i) {
      return "<button type=\"button\" class=\"h5p-opt\" data-h5p=\"" + i + "\">" + esc(o.t) + "</button>";
    }).join("") + "</div><p id=\"h5p-hinweis\" class=\"stage-note\" hidden></p></div>";
  } else {
    stage = "<div class=\"stage\"><p>" + mitBegriffen(c.teaser) + "</p></div>";
  }
  var praxis = "";
  if (c.praxis && (c.praxis.rolle || c.praxis.taetigkeit)) {
    praxis = "<div class=\"praxis\"><h3>Praxisbeispiel</h3><dl><div><dt>Rolle</dt><dd>" + esc(c.praxis.rolle || "—") + "</dd></div><div><dt>Tätigkeit</dt><dd>" + esc(c.praxis.taetigkeit || "—") + "</dd></div><div><dt>Nutzen</dt><dd>" + esc(c.praxis.nutzen || "—") + "</dd></div><div><dt>Grenze</dt><dd>" + esc(c.praxis.grenze || "—") + "</dd></div></dl></div>";
  }
  var fehler = "";
  if (c.fehler) {
    fehler = "<div class=\"fehler\"><h3>Ein typischer Fehlversuch — der ist normal</h3><p>" + mitBegriffen(c.fehler.text) + "</p><p><strong>Korrektur:</strong> " + mitBegriffen(c.fehler.korrektur) + "</p></div>";
  }
  var schritte = (c.schritte || []).map(function (s, i) {
    return "<li><h3>" + (i + 1) + ". " + esc(s.t) + "</h3><p>" + mitBegriffen(s.d) + "</p></li>";
  }).join("");
  var kommentare = kommentareVon(c).map(function (k, i) {
    var loesch = k.eigen ? "<button type=\"button\" class=\"textbtn\" data-action=\"kommentar-loeschen\" data-index=\"" + i + "\">Löschen</button>" : "";
    return "<div class=\"comment\"><div class=\"c-av a\">" + esc((k.name || "?").slice(0, 1)) + "</div><div class=\"c-body\"><div class=\"c-name\">" + esc(k.name) + " <span>" + esc(k.meta || "gerade eben") + "</span></div><div class=\"c-text\">" + esc(k.text) + "</div><div class=\"c-actions\">" + loesch + "</div></div></div>";
  }).join("");
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-action=\"zur-lernansicht\">Zurück</button>"
    + "<h1>" + esc(c.titel) + "</h1>"
    + "<p>" + esc(c.ergebnis || c.teaser) + "</p>"
    + "<p>" + esc(c.dauer) + "</p>"
    + stage
    + (schritte ? "<ol class=\"steps\">" + schritte + "</ol>" : "")
    + praxis
    + fehler
    + "<div class=\"button-row\"><button type=\"button\" class=\"btn-solid btn-gross\" data-action=\"abschliessen\">Fertig</button></div>"
    + "<details class=\"weiteres\"><summary>Rückfrage</summary>"
    + kommentare
    + "<form class=\"comment-form\" id=\"kommentar-form\"><label class=\"field\"><span>Ihre Frage</span><textarea name=\"text\" required rows=\"3\"></textarea></label><button class=\"btn-solid\" type=\"submit\">Senden</button></form>"
    + "<button type=\"button\" class=\"textbtn\" data-action=\"melden\" data-ziel=\"" + esc(c.id) + "\">Melden</button></details>";
}

function renderSummary() {
  var c = byId(aktuell);
  var root = document.getElementById("view-summary");
  if (!c) { root.innerHTML = ""; return; }
  var fb = state.feedback[c.id];
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-action=\"zurueck-inhalt\">Zurück</button>"
    + "<h1>War das brauchbar?</h1>"
    + "<div class=\"facebtns\"><button type=\"button\" class=\"facebtn" + (fb === "up" ? " active" : "") + "\" data-fb=\"up\">Hat mir weitergeholfen</button><button type=\"button\" class=\"facebtn" + (fb === "down" ? " active" : "") + "\" data-fb=\"down\">Hat mir nicht weitergeholfen</button></div>"
    + "<button type=\"button\" class=\"btn-solid btn-gross\" data-action=\"zum-einreichen\">Jetzt etwas einreichen</button>"
    + "<aside class=\"randhinweis\"><p>Nachweise kommen später.</p></aside>";
}

function renderGlossar() {
  var root = document.getElementById("view-glossar");
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-action=\"zur-lernansicht\">Zurück</button>"
    + "<h1>Begriffe</h1>"
    + "<p>Kurze Erklärungen. Dieselben Hinweise liegen auch im Text.</p>"
    + "<dl class=\"gloss\">" + GLOSSAR.map(function (g) {
      return "<div><dt>" + esc(g.begriff) + "</dt><dd>" + esc(g.text) + "</dd></div>";
    }).join("") + "</dl>";
}

function renderProfil() {
  var root = document.getElementById("view-profil");
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-action=\"zur-lernansicht\">Zurück</button>"
    + "<h1>Henning Beckmann</h1>"
    + "<p>Name und Konto kommen mit. Ein zweites Konto gibt es hier nicht.</p>"
    + "<form id=\"profil-form\" class=\"form-card\">"
    + "<label class=\"field\"><span>Behörde</span><input name=\"behoerde\" value=\"" + esc(state.behoerde) + "\" required></label>"
    + "<label class=\"field\"><span>Sprache</span><input value=\"Deutsch\" readonly></label>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"einfach\" " + (state.einfach ? "checked" : "") + "> Kurze Sätze</label>"
    + "<div class=\"button-row\"><button class=\"btn-solid\" type=\"submit\">Speichern</button></div>"
    + "</form>"
    + "<aside class=\"randhinweis\"><p>Eine Suche nach Personen kommt später.</p></aside>";
}

function renderEditor() {
  var c = editorId ? byId(editorId) : null;
  var root = document.getElementById("view-editor");
  var v = c || {
    titel: "Protokoll kürzen",
    formatKey: "lernmodul",
    niveau: "basis",
    felder: ["Verwaltung"],
    werkzeugKey: "sprachmodell",
    dauerMin: 8,
    ergebnis: "Ein kürzerer Absatz und ein Satz, was geprüft wurde.",
    lernziel: "Einen Text kürzen und selbst prüfen.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Einen Text für die Akte kürzen", nutzen: "Der Entwurf ist kürzer", grenze: "Die Sachaussage bleibt bei der Person" },
    glossarOk: true,
    glossar: [],
    medien: "text",
    anwendungsbezogen: true,
    poltube: ""
  };
  var p = v.praxis || { rolle: "", taetigkeit: "", nutzen: "", grenze: "" };
  function sel(name, wert, opts) {
    return "<label class=\"field\"><span>" + name + "</span><select name=\"" + wert + "\">" + opts.map(function (o) {
      return "<option value=\"" + o[0] + "\"" + (String(v[wert] || "") === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
    }).join("") + "</select></label>";
  }
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-view-jump=\"home\">Zurück</button>"
    + "<h1>" + (c ? "Beitrag ändern" : "Etwas einreichen") + "</h1>"
    + "<p>Sie schicken einen eigenen Beitrag zur Prüfung.</p>"
    + "<form id=\"editor-form\" class=\"form-card\">"
    + "<label class=\"field\"><span>Wie heißt der Beitrag?</span><input name=\"titel\" required value=\"" + esc(v.titel || "") + "\"></label>"
    + "<label class=\"field\"><span>Was kann die Person danach?</span><input name=\"ergebnis\" required value=\"" + esc(v.ergebnis || "") + "\"></label>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"glossarOk\"" + (v.glossarOk ? " checked" : "") + "> Schwierige Wörter sind erklärt</label>"
    + "<details class=\"weiteres\"><summary>Mehr angeben</summary>"
    + sel("Art", "formatKey", [["lernmodul", "Kurzer Beitrag"], ["artikel", "Text"], ["impuls", "Beispiel aus dem Alltag"], ["video", "Video"]])
    + "<fieldset class=\"niveaus\"><legend>Wie leicht ist der Beitrag?</legend>"
    + ["basis", "aufbau", "spezial"].map(function (n) {
      var label = n === "basis" ? "Leicht" : n === "aufbau" ? "Mittel" : "Vertieft";
      return "<label><input type=\"radio\" name=\"niveau\" value=\"" + n + "\"" + (v.niveau === n ? " checked" : "") + "><strong>" + label + "</strong></label>";
    }).join("") + "</fieldset>"
    + "<fieldset class=\"field\"><legend>Wobei?</legend>"
    + ["Ermittlung", "Führung", "Verwaltung"].map(function (f) {
      return "<label class=\"checkline\"><input type=\"checkbox\" name=\"feld\" value=\"" + f + "\"" + ((v.felder || []).indexOf(f) >= 0 ? " checked" : "") + "> " + f + "</label>";
    }).join("") + "</fieldset>"
    + sel("Werkzeug", "werkzeugKey", [["sprachmodell", "Sprachmodell"], ["transkription", "Transkription"], ["auswertung", "Auswertung"], ["keins", "Keins"]])
    + "<label class=\"field\"><span>Minuten</span><input name=\"dauerMin\" type=\"number\" min=\"1\" max=\"60\" value=\"" + esc(v.dauerMin || 8) + "\"></label>"
    + "<label class=\"field\"><span>Wer</span><input name=\"rolle\" value=\"" + esc(p.rolle || "") + "\"></label>"
    + "<label class=\"field\"><span>Was</span><input name=\"taetigkeit\" value=\"" + esc(p.taetigkeit || "") + "\"></label>"
    + "<label class=\"field\"><span>Nutzen</span><input name=\"nutzen\" value=\"" + esc(p.nutzen || "") + "\"></label>"
    + "<label class=\"field\"><span>Grenze</span><input name=\"grenze\" value=\"" + esc(p.grenze || "") + "\"></label>"
    + "<label class=\"field\"><span>Begriffe</span><input name=\"glossar\" value=\"" + esc((v.glossar || []).join(", ")) + "\"></label>"
    + "<label class=\"field\"><span>Lernziel</span><input name=\"lernziel\" value=\"" + esc(v.lernziel || "") + "\"></label>"
    + sel("Darstellung", "medien", [["text", "Text"], ["h5p", "Kurze Frage"], ["poltube", "Video"]])
    + "<div id=\"upload-block\"><label class=\"field\"><span>Datei</span><input name=\"datei\" type=\"file\" accept=\"video/*,application/pdf\"><span class=\"hint\">Die Datei bleibt hier nur als Name. Abgespielt wird sie an anderer Stelle.</span></label>"
    + "<label class=\"field\"><span>Video-Nummer</span><input name=\"poltube\" value=\"" + esc(v.poltube || "") + "\"></label></div>"
    + "<p id=\"dateiname\" class=\"meta-line\"></p>"
    + "<p><button type=\"button\" class=\"textbtn\" data-view-jump=\"leitfaden\">Worauf die Prüfung achtet</button></p>"
    + "</details>"
    + "<div class=\"button-row\"><button class=\"btn-solid btn-gross\" type=\"submit\" name=\"ziel\" value=\"review\">Zur Prüfung schicken</button><button class=\"btn-line\" type=\"submit\" name=\"ziel\" value=\"entwurf\">Entwurf speichern</button></div>"
    + "</form>";
}

function leseEditor(form, ziel) {
  var data = new FormData(form);
  var felder = data.getAll("feld");
  var id = editorId || ("eigen-" + Date.now());
  var formatKey = data.get("formatKey");
  var format = { lernmodul: "Lernmodul", artikel: "Wissensartikel", impuls: "Impuls", video: "Video" }[formatKey] || "Lernmodul";
  var werkzeugKey = data.get("werkzeugKey");
  var werkzeug = { sprachmodell: "Sprachmodell", transkription: "Transkription", auswertung: "Auswertung", keins: "Keins" }[werkzeugKey] || "Sprachmodell";
  var obj = {
    id: id,
    titel: String(data.get("titel") || "").trim(),
    teaser: "Ihr eigener Beitrag.",
    format: format,
    formatKey: formatKey,
    niveau: data.get("niveau") || "",
    dauerMin: Number(data.get("dauerMin") || 0),
    ergebnis: String(data.get("ergebnis") || "").trim(),
    lernziel: String(data.get("lernziel") || "").trim(),
    felder: felder,
    werkzeug: werkzeug,
    werkzeugKey: werkzeugKey,
    thema: ["grundlagen"],
    ziel: felder.map(function (f) { return f === "Ermittlung" ? "ermittlung" : f === "Führung" ? "fuehrung" : "verwaltung"; }),
    medien: data.get("medien"),
    anwendungsbezogen: true,
    praxis: {
      rolle: String(data.get("rolle") || "").trim(),
      taetigkeit: String(data.get("taetigkeit") || "").trim(),
      nutzen: String(data.get("nutzen") || "").trim(),
      grenze: String(data.get("grenze") || "").trim()
    },
    glossarOk: data.get("glossarOk") === "on",
    glossar: String(data.get("glossar") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean),
    poltube: String(data.get("poltube") || "").trim(),
    schritte: [{ t: "Erster Schritt aus Ihrem Entwurf", d: "Die Redaktion prüft Vollständigkeit, Niveau und Umfang." }],
    kern: ["Eigener Beitrag."],
    autor: "Henning Beckmann",
    autorRolle: "creator",
    status: ziel,
    fassung: "1",
    geprueft: "",
    kommentare: []
  };
  if (obj.medien === "h5p") {
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
  var root = document.getElementById("view-meine");
  var zuletzt = editorId ? byId(editorId) : null;
  var geschickt = zuletzt && zuletzt.status === "review";
  var liste = alle().filter(function (c) { return c.autorRolle === "creator" || (state.eigene || []).some(function (e) { return e.id === c.id; }); });
  var rows = liste.map(function (c) {
    var fb = feedbackSumme(c.id);
    return "<div class=\"listrow\"><div><strong>" + esc(c.titel) + "</strong><div class=\"meta-line\">" + esc(statusLabel(c.status)) + " · " + fb.up + " hilfreich · " + aufrufeInhalt(c) + " Aufrufe</div></div><button type=\"button\" class=\"btn-line\" data-action=\"bearbeiten\" data-id=\"" + esc(c.id) + "\">Ändern</button></div>";
  }).join("");
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-view-jump=\"editor\">Zurück</button>"
    + "<h1>" + (geschickt ? "Zur Prüfung geschickt" : "Gespeichert") + "</h1>"
    + "<p>" + (geschickt ? "Als Nächstes kann dieser Beitrag freigegeben werden." : "Der Entwurf liegt bereit. Sie können ihn noch ändern.") + "</p>"
    + (geschickt ? "<button type=\"button\" class=\"btn-solid btn-gross\" data-action=\"zum-freigeben\">Jetzt freigeben</button>" : "<button type=\"button\" class=\"btn-solid btn-gross\" data-action=\"neu\">Weiter ausfüllen</button>")
    + "<details class=\"weiteres\"><summary>Weitere eigene Beiträge</summary><div class=\"list\">" + (rows || "<p>Noch keine.</p>") + "</div></details>";
}

function feedbackSumme(id) {
  var basis = { up: id === "berichte" ? 36 : 12, down: 4 };
  var extra = state.feedback[id];
  if (extra === "up") basis.up += 1;
  if (extra === "down") basis.down += 1;
  return basis;
}

function statusLabel(s) {
  return { entwurf: "Entwurf", review: "In Prüfung", freigabe: "Freigegeben", veroeffentlicht: "Veröffentlicht" }[s] || s;
}

function renderRedaktion() {
  var root = document.getElementById("view-redaktion");
  var wartend = alle().filter(function (c) { return c.status === "review" || c.status === "freigabe" || c.status === "entwurf"; });
  var eigene = (state.eigene || []).map(function (e) { return e.id; });
  var zuerst = null;
  wartend.forEach(function (c) {
    if (!zuerst && eigene.indexOf(c.id) >= 0 && c.status === "review" && !mangel(c).length) zuerst = c;
  });
  if (!zuerst) wartend.forEach(function (c) { if (!zuerst && c.id === "review-offen") zuerst = c; });
  if (!zuerst) zuerst = wartend[0] || null;
  var rest = wartend.filter(function (c) { return !zuerst || c.id !== zuerst.id; }).map(function (c) {
    return "<button type=\"button\" class=\"rowitem\" data-action=\"review\" data-id=\"" + esc(c.id) + "\"><strong>" + esc(c.titel) + "</strong><span>" + esc(statusLabel(c.status)) + "</span></button>";
  }).join("");
  var faellig = alle().filter(ueberfaellig).map(function (c) {
    return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(c.id) + "\"><strong>" + esc(c.titel) + "</strong><span>Geprüft am " + esc(datum(c.geprueft)) + "</span></button>";
  }).join("");
  var meldungen = (state.meldungen || []).slice().reverse().map(function (m) {
    return "<div class=\"listrow\"><div><strong>" + esc(m.art) + "</strong><div class=\"meta-line\">" + esc(m.ziel) + "</div></div></div>";
  }).join("");
  var impulse = alle().filter(function (c) { return c.impuls && c.status === "veroeffentlicht"; });
  var haupt = zuerst
    ? "<h1>" + esc(zuerst.titel) + "</h1><p>Sie geben diesen Beitrag frei.</p><button type=\"button\" class=\"btn-solid btn-gross\" data-action=\"review\" data-id=\"" + esc(zuerst.id) + "\">Diesen Beitrag prüfen</button>"
    : "<h1>Nichts zu prüfen</h1><p>Es liegt kein Beitrag vor.</p>";
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-schritt=\"einreichen\">Zurück</button>"
    + haupt
    + "<details class=\"weiteres\"><summary>Weitere Beiträge</summary>"
    + "<div class=\"rowlist\">" + (rest || "<p>Keine weiteren.</p>") + "</div>"
    + "<h2>Schon länger her</h2><div class=\"rowlist\">" + (faellig || "<p>Nichts ist überfällig.</p>") + "</div>"
    + "<h2>Meldungen</h2><div class=\"list\">" + (meldungen || "<p>Keine Meldung.</p>") + "</div>"
    + "<form id=\"pin-form\" class=\"form-card\"><label class=\"field\"><span>Was steht auf der Startseite?</span><select name=\"pin\">" + impulse.map(function (c) {
      return "<option value=\"" + esc(c.id) + "\"" + (state.prominent === c.id ? " selected" : "") + ">" + esc(c.titel) + "</option>";
    }).join("") + "</select></label><button class=\"btn-solid\" type=\"submit\">Auf die Startseite legen</button></form>"
    + "<p><button type=\"button\" class=\"textbtn\" data-view-jump=\"statistik\">Aufrufe ansehen</button></p>"
    + "<p class=\"randhinweis\">Hilfe beim Moderieren kommt später.</p>"
    + "</details>";
}

function renderReview() {
  var c = byId(aktuell);
  var root = document.getElementById("view-review");
  if (!c) { root.innerHTML = "<p>Kein Inhalt gewählt.</p>"; return; }
  var punkte = mangel(c);
  var lis = punkte.length ? punkte.map(function (p) { return "<li class=\"bad\">" + esc(p) + "</li>"; }).join("") : "<li class=\"ok\">Alles Nötige ist da.</li>";
  var gesperrt = punkte.length > 0;
  var primaer = (c.status === "freigabe" && !gesperrt)
    ? "<button type=\"button\" class=\"btn-solid btn-gross\" data-action=\"veroeffentlichen\">Veröffentlichen</button>"
    : "<button type=\"button\" class=\"btn-solid btn-gross\" data-action=\"freigeben\"" + (gesperrt ? " disabled" : "") + ">Freigeben</button>";
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-view-jump=\"redaktion\">Zurück</button>"
    + "<h1>" + esc(c.titel) + "</h1>"
    + "<p>" + esc(statusLabel(c.status)) + ". " + (gesperrt ? "Freigeben ist zu, weil noch etwas fehlt." : "Ein Schritt.") + "</p>"
    + "<ul class=\"pruef\">" + lis + "</ul>"
    + "<form id=\"review-form\">"
    + primaer
    + "<details class=\"weiteres\"><summary>Zurückgeben</summary><label class=\"field\"><span>Warum?</span><textarea name=\"grund\" rows=\"3\"></textarea></label><button type=\"button\" class=\"btn-line\" data-action=\"zurueckgeben\">Zurückgeben</button></details>"
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
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-view-jump=\"redaktion\">Zurück</button>"
    + "<h1>Aufrufe</h1>"
    + "<p>Nur Summen. Keine Namen.</p>"
    + "<div class=\"kpi\"><div><strong>" + start + "</strong><span>Startseite</span></div><div><strong>" + p0 + "</strong><span>Ohne Vorwissen</span></div><div><strong>" + p1 + "</strong><span>Mit Vorkenntnis</span></div><div><strong>" + p2 + "</strong><span>Mit einer Frage</span></div></div>"
    + zeilen;
}

function renderAdmin() {
  var root = document.getElementById("view-admin");
  root.innerHTML = "<button type=\"button\" class=\"zurueck\" data-view-jump=\"home\">Zurück</button>"
    + "<h1>Verwaltung</h1>"
    + "<p>Sie sehen, wer was darf. Lernen, Einreichen und Freigeben bleiben dieselben Schritte.</p>"
    + "<div class=\"list\">"
    + rolleZeile("Lernen", "Beiträge ansehen, Fragen stellen, etwas melden", true)
    + rolleZeile("Einreichen", "Einen Beitrag schicken", true)
    + rolleZeile("Freigeben", "Prüfen und veröffentlichen", true)
    + rolleZeile("Gegenzeichnung", "Antworten zu Erlaubnis vor der Veröffentlichung", true)
    + rolleZeile("Verwaltung", "Konten und Betrieb", true)
    + rolleZeile("Moderation", "Kommt später, zusammen mit dem Austausch.", false)
    + "</div>"
    + "<p>Konten kommen mit. Hier lässt sich keines neu anlegen.</p>"
    + "<button type=\"button\" class=\"btn-line\" disabled>Konto anlegen</button>"
    + "<h2 id=\"integrationen\">Angebunden</h2>"
    + "<div class=\"rowlist\">"
    + "<div class=\"rowitem\"><strong>Anmeldung</strong><span>Über das bestehende Konto.</span></div>"
    + "<div class=\"rowitem\"><strong>Video</strong><span>Videos liegen woanders und werden hier nur gezeigt.</span></div>"
    + "<div class=\"rowitem\"><strong>Kurze Frage</strong><span>Eine Frage im Beitrag. Weitere Arten kommen später.</span></div>"
    + "<div class=\"rowitem\"><strong>Nachweise</strong><span>Kommen später.</span></div>"
    + "<div class=\"rowitem\"><strong>Hilfe beim Text</strong><span>Kommt später.</span><button type=\"button\" class=\"btn-line\" disabled>Ergebnisse prüfen</button></div>"
    + "</div>"
    + "<h2 id=\"betrieb\">Betrieb</h2>"
    + "<div class=\"kpi\"><div><strong>Erreichbar</strong><span>im vereinbarten Rahmen</span></div><div><strong>Sicherung</strong><span>regelmäßig vorgesehen</span></div><div><strong>Datenschutz</strong><span>Aufrufe nur als Summe</span></div><div><strong>Protokoll</strong><span>Änderungen bleiben nachvollziehbar</span></div></div>"
    + "<aside class=\"randhinweis\"><p>Foren, Nachweise und eine Prüfung durch KI kommen später.</p></aside>";
}

function rolleZeile(name, text, aktiv) {
  return "<div class=\"listrow\"><div><strong>" + esc(name) + "</strong></div><div>" + esc(text) + "</div><div>" + (aktiv ? "dabei" : "später") + "</div></div>";
}

function syncKacheln() {
  var grid = document.querySelector(".grid");
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
  art.dataset.thema = (c.thema || []).join(" ");
  art.dataset.format = c.formatKey || "lernmodul";
  art.dataset.niveau = c.niveau || "";
  art.dataset.zielgruppe = (c.ziel || []).join(" ");
  art.dataset.werkzeug = c.werkzeugKey || "";
  art.tabIndex = 0;
  art.innerHTML = "<div class=\"thumb\"><span class=\"fmt\">" + esc(c.format) + " · " + esc(c.dauer) + "</span></div><div class=\"tile-body\"><div class=\"badges\"><span class=\"lvl " + esc(c.niveau || "basis") + "\">" + esc(c.niveauLabel) + "</span></div><h3>" + esc(c.titel) + "</h3><p>" + esc(c.teaser) + "</p><div class=\"tile-foot\"><span class=\"meta-ic\">Neu veröffentlicht</span></div></div>";
  return art;
}

function sofortKarte() {
  var c = byId(state.prominent) || byId("berichte");
  if (!c) return;
  var t = document.getElementById("sofort-titel");
  var x = document.getElementById("sofort-text");
  var b = document.getElementById("sofort-btn");
  if (t) t.textContent = c.titel;
  if (x) x.textContent = (c.dauerMin ? c.dauerMin + " Minuten. " : "") + "Ein Beitrag aus dem Alltag.";
  if (b) b.dataset.sofort = c.id;
}

function setzeFilter(gruppe, wert) {
  document.querySelectorAll(".chip[data-group]").forEach(function (c) {
    if (c.dataset.group !== gruppe) return;
    var an = c.dataset.value === wert;
    c.classList.toggle("active", an);
    c.setAttribute("aria-pressed", an ? "true" : "false");
  });
  window.filtern();
}

function setzePfad(name) {
  suchtext = "";
  var suche = document.getElementById("suche");
  if (suche) suche.value = "";
  ["thema", "format", "niveau", "zielgruppe", "werkzeug"].forEach(function (g) { setzeFilter(g, "alle"); });
  if (name === "anfang") {
    setzeFilter("niveau", "basis");
    setzeFilter("thema", "grundlagen");
    bump("null");
    hinweis("Leichte Beiträge.");
  } else if (name === "bereits") {
    setzeFilter("niveau", "aufbau");
    bump("bereits");
    hinweis("Beiträge für Menschen, die schon üben.");
  } else {
    bump("frage");
    showView("faq");
    return;
  }
  showView("liste");
}

function hinweis(text) {
  var el = document.getElementById("pfadhinweis");
  if (!el) return;
  el.hidden = false;
  el.textContent = text;
}

function sucheAktualisieren() {
  var panel = document.getElementById("suchpanel");
  var q = suchtext.trim().toLowerCase();
  if (!panel) return;
  if (!q) { panel.hidden = true; panel.innerHTML = ""; return; }
  var treffer = alle().filter(function (c) {
    return c.status === "veroeffentlicht" && (c.titel + " " + c.teaser).toLowerCase().indexOf(q) >= 0;
  });
  var faq = [];
  document.querySelectorAll(".faq-item").forEach(function (item) {
    if (item.textContent.toLowerCase().indexOf(q) >= 0) faq.push(item);
  });
  var html = "";
  if (!treffer.length && !faq.length) {
    html = "<p>Dazu gibt es hier nichts. Eine Suche mit KI kommt später.</p>";
  } else {
    html = treffer.slice(0, 6).map(function (c) {
      return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(c.id) + "\"><strong>" + esc(c.titel) + "</strong><span>" + esc(c.format) + " · " + esc(c.niveauLabel) + "</span></button>";
    }).join("");
    html += faq.slice(0, 3).map(function (item) {
      var frage = item.querySelector(".faq-q").childNodes[0].textContent.trim();
      return "<button type=\"button\" class=\"rowitem\" data-action=\"faq-sprung\" data-faq=\"" + esc(item.dataset.faq) + "\"><strong>FAQ · " + esc(frage) + "</strong></button>";
    }).join("");
  }
  panel.innerHTML = html;
  panel.hidden = false;
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
  var GRUPPEN = ["thema", "format", "niveau", "zielgruppe", "werkzeug"];
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-group]"));
  var fcount = document.getElementById("fcount");
  var freset = document.getElementById("freset");
  var empty = document.getElementById("empty");

  function aktiveWerte(gruppe) {
    return chips.filter(function (c) {
      return c.dataset.group === gruppe && c.dataset.value !== "alle" && c.classList.contains("active");
    }).map(function (c) { return c.dataset.value; });
  }
  function passt(kachel, gruppe, werte) {
    if (!werte.length) return true;
    var eigene = (kachel.dataset[gruppe] || "").split(" ");
    return werte.some(function (w) { return eigene.indexOf(w) !== -1; });
  }
  function filtern() {
    var kacheln = Array.prototype.slice.call(document.querySelectorAll(".grid .tile"));
    var auswahl = {};
    var anzahlAktiv = 0;
    GRUPPEN.forEach(function (g) {
      auswahl[g] = aktiveWerte(g);
      anzahlAktiv += auswahl[g].length;
    });
    var q = suchtext.trim().toLowerCase();
    var sichtbar = 0;
    kacheln.forEach(function (k) {
      var treffer = GRUPPEN.every(function (g) { return passt(k, g, auswahl[g]); });
      if (treffer && q && k.textContent.toLowerCase().indexOf(q) === -1) treffer = false;
      k.hidden = !treffer;
      if (treffer) sichtbar++;
    });
    chips.forEach(function (c) {
      if (c.dataset.value === "alle") {
        var leer = auswahl[c.dataset.group].length === 0;
        c.classList.toggle("active", leer);
        c.setAttribute("aria-pressed", leer ? "true" : "false");
      }
    });
    if (anzahlAktiv === 0 && !q) fcount.textContent = "Alle " + kacheln.length + " Inhalte werden angezeigt.";
    else if (sichtbar === 0) fcount.textContent = "Kein Inhalt entspricht dieser Auswahl.";
    else if (sichtbar === 1) fcount.innerHTML = "<strong>1</strong> von " + kacheln.length + " Inhalten entspricht Ihrer Auswahl.";
    else fcount.innerHTML = "<strong>" + sichtbar + "</strong> von " + kacheln.length + " Inhalten entsprechen Ihrer Auswahl.";
    freset.hidden = anzahlAktiv === 0 && !q;
    empty.hidden = sichtbar > 0;
  }
  window.filtern = filtern;
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var gruppe = chip.dataset.group;
      if (chip.dataset.value === "alle") {
        chips.forEach(function (c) {
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
  function zuruecksetzen() {
    suchtext = "";
    var suche = document.getElementById("suche");
    if (suche) suche.value = "";
    document.getElementById("suchpanel").hidden = true;
    document.getElementById("pfadhinweis").hidden = true;
    chips.forEach(function (c) {
      if (c.dataset.value !== "alle") {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      }
    });
    filtern();
    try { document.getElementById("inhalte").scrollIntoView({ block: "start" }); } catch (e) { /* siehe showView */ }
  }
  document.getElementById("freset").addEventListener("click", zuruecksetzen);
  document.getElementById("empty-reset").addEventListener("click", zuruecksetzen);
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
      var meta = document.createElement("p");
      meta.className = "faq-meta";
      var gegen = item.dataset.gegen || "";
      meta.textContent = "Geprüft am " + (item.dataset.geprueft || "12.08.2026") + (gegen ? " · " + gegen : "");
      antwort.appendChild(meta);
      var melden = document.createElement("button");
      melden.type = "button";
      melden.className = "textbtn";
      melden.textContent = "Frage fehlt oder Antwort trägt nicht";
      melden.addEventListener("click", function () {
        meldungOeffnen("FAQ " + item.dataset.faq);
      });
      antwort.appendChild(melden);
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
  renderProfilKnopf();
  wendeEinfach();
  initFaq();
  initFilter();
  syncKacheln();
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
    toast("Sie sind angemeldet.");
  });

  document.querySelector("header nav").addEventListener("click", function (e) {
    var a = e.target.closest("a[data-schritt]");
    if (!a) return;
    e.preventDefault();
    gehSchritt(a.dataset.schritt);
  });

  var eingrenzen = document.getElementById("eingrenzen");
  if (eingrenzen) {
    eingrenzen.addEventListener("click", function () {
      var liste = document.getElementById("view-liste");
      var an = !liste.classList.contains("zeigt-filter");
      liste.classList.toggle("zeigt-filter", an);
      eingrenzen.setAttribute("aria-expanded", an ? "true" : "false");
    });
  }

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
      renderProfilKnopf();
      pmenu.hidden = true;
      if (state.rolle === "creator") editorId = null;
      var ziel = { creator: "editor", redaktion: "redaktion", admin: "admin", beschaeftigte: "home" }[state.rolle];
      showView(ziel);
      toast(rolleErklaerung(state.rolle));
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

  document.getElementById("suche-btn").addEventListener("click", function () {
    suchtext = document.getElementById("suche").value;
    if (!authAktiv()) { showView("sso"); return; }
    showView("liste");
    window.filtern();
    sucheAktualisieren();
  });
  document.getElementById("suche").addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); document.getElementById("suche-btn").click(); }
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
    oeffneInhalt(document.getElementById("sofort-btn").dataset.sofort || "berichte");
  });
  document.querySelector(".grid").addEventListener("click", function (e) {
    if (e.target.closest(".likebtn")) return;
    var tile = e.target.closest(".tile");
    if (!tile || !tile.dataset.id) return;
    oeffneInhalt(tile.dataset.id);
  });
  document.body.addEventListener("change", function (e) {
    if (e.target.name === "datei" && e.target.files && e.target.files[0]) {
      var p = document.getElementById("dateiname");
      if (p) p.textContent = "Zugeordnet, nicht hochgeladen: " + e.target.files[0].name;
    }
  });

  document.body.addEventListener("click", function (e) {
    if (e.target.closest(".likebtn")) return;
    var schrittBtn = e.target.closest("button[data-schritt]");
    if (schrittBtn) { gehSchritt(schrittBtn.dataset.schritt); return; }
    var open = e.target.closest("[data-open]");
    if (open && !e.target.closest("a")) {
      oeffneInhalt(open.dataset.open);
      return;
    }
    var jump = e.target.closest("[data-view-jump]");
    if (jump) { showView(jump.dataset.viewJump); return; }
    var act = e.target.closest("[data-action]");
    if (act) {
    var action = act.dataset.action;
    if (action === "zur-lernansicht") showView("home");
    if (action === "zurueck-inhalt") showView("player");
    if (action === "abschliessen") {
      selbstGeprueft = true;
      showView("summary");
    }
    if (action === "zum-einreichen") {
      state.rolle = "creator";
      editorId = null;
      sichern();
      renderProfilKnopf();
      showView("editor");
    }
    if (action === "zum-freigeben") {
      state.rolle = "redaktion";
      sichern();
      renderProfilKnopf();
      showView("redaktion");
    }
    if (action === "melden") meldungOeffnen(act.dataset.ziel || aktuell || "Inhalt");
    if (action === "faq-sprung") {
      var item = document.querySelector('.faq-item[data-faq="' + act.dataset.faq + '"]');
      showView("faq");
      if (item) faqOeffnen(item);
    }
    if (action === "neu") { editorId = null; showView("editor"); }
    if (action === "bearbeiten") { editorId = act.dataset.id; showView("editor"); }
    if (action === "review") { aktuell = act.dataset.id; showView("review"); }
    if (action === "passwort") {
      oeffneAusbau("Zugang", "Ein eigenes Passwort gibt es hier nicht. Das bleibt beim Behördenkonto.");
    }
    if (action === "stichprobe") {
      state.stichprobe.halluzinationen = true;
      sichern();
      renderRedaktion();
      toast("Stichprobe ist markiert.");
    }
    if (action === "zurueckgeben") {
      var grund = (document.querySelector("#review-form textarea") || {}).value || "";
      if (!grund.trim()) { toast("Bitte eine Begründung angeben."); return; }
      state.status[aktuell] = "entwurf";
      state.override[aktuell] = Object.assign({}, state.override[aktuell] || {}, { vorher: "Zurückgegeben: " + grund.trim() });
      sichern();
      syncKacheln();
      toast("Zurückgegeben. Der Beitrag ist wieder ein Entwurf.");
      showView("redaktion");
    }
    if (action === "freigeben") {
      if (mangel(byId(aktuell)).length) return;
      state.status[aktuell] = "freigabe";
      state.pruefdatum = state.pruefdatum || {};
      state.pruefdatum[aktuell] = "2026-11-02";
      sichern();
      toast("Freigegeben. Veröffentlichung ist der nächste Status.");
      renderReview();
    }
    if (action === "veroeffentlichen") {
      var cur = byId(aktuell);
      if (cur.status !== "freigabe" || mangel(cur).length) return;
      state.status[aktuell] = "veroeffentlicht";
      sichern();
      syncKacheln();
      toast("Veröffentlicht. Der Beitrag steht jetzt unter Alle Beiträge.");
      showView("redaktion");
    }
    if (action === "kommentar-loeschen") {
      var idx = Number(act.dataset.index);
      var c = byId(aktuell);
      var basis = (c.kommentare || []).length;
      var extraIndex = idx - basis;
      if (extraIndex >= 0 && state.kommentare[aktuell]) {
        state.kommentare[aktuell].splice(extraIndex, 1);
        sichern();
        renderPlayer();
      }
    }
    }
    var fb = e.target.closest("[data-fb]");
    if (fb && aktuell) {
      state.feedback[aktuell] = fb.dataset.fb;
      sichern();
      renderSummary();
      toast("Danke. Die Redaktion sieht nur die Summe.");
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
            aktionen: [{ label: "Als Entwurf speichern", fn: function () { obj.status = "entwurf"; editorId = obj.id; speichereInhalt(obj); showView("meine"); toast("Entwurf gespeichert."); } }, { label: "Weiter bearbeiten", zweite: true }]
          });
          return;
        }
      }
      editorId = obj.id;
      speichereInhalt(obj);
      showView("meine");
      toast(ziel === "review" ? "Zur Prüfung geschickt." : "Entwurf gespeichert.");
    }
    if (e.target.id === "pin-form") {
      e.preventDefault();
      state.prominent = new FormData(e.target).get("pin");
      sichern();
      sofortKarte();
      toast("Der Beitrag steht jetzt auf der Startseite.");
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

  document.querySelectorAll(".likebtn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var cnt = btn.querySelector(".cnt");
      var n = parseInt(cnt.textContent, 10);
      if (btn.classList.contains("liked")) {
        btn.classList.remove("liked");
        cnt.textContent = n - 1;
      } else {
        btn.classList.add("liked");
        cnt.textContent = n + 1;
      }
    });
  });

  document.querySelector(".grid").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var tile = e.target.closest(".tile");
    if (!tile) return;
    e.preventDefault();
    oeffneInhalt(tile.dataset.id);
  });
  document.querySelector(".impulse-grid").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest(".imp");
    if (!card || !card.dataset.open) return;
    e.preventDefault();
    oeffneInhalt(card.dataset.open);
  });

  document.getElementById("community-mehr").addEventListener("click", function () {
    oeffneAusbau("Leitforen und Ansprechpersonen", "Drei bis vier moderierte Foren, Tags, das Löschen eigener Beiträge, die Praxis-FAQ und die Suche nach ansprechbaren Personen sind beschrieben, aber nicht Teil der ersten Iteration.");
  });
  document.getElementById("live-btn").addEventListener("click", function () {
    oeffneAusbau("Open-Space und Live-Formate", "Regelmäßige Live-Sessions und das vertrauliche Open-Space-Format folgen später. Vertraulichkeitsregeln würden zu Beginn jeder Sitzung sichtbar. Die Teilnahme lässt sich hier nicht buchen. Aufzeichnungen können als Inhalt in der Werkstatt liegen.");
  });
  document.getElementById("impuls-anbieten").addEventListener("click", function () {
    dialog({
      titel: "Impuls anbieten",
      html: "<p>Es braucht Erfahrung aus dem Alltag. Auch ein misslungener Versuch ist ein Beitrag.</p>",
      aktionen: [
        { label: "Jetzt etwas einreichen", fn: function () { state.rolle = "creator"; sichern(); renderNav(); renderProfilKnopf(); editorId = null; showView("editor"); } },
        { label: "Schließen", zweite: true }
      ]
    });
  });
  document.querySelectorAll(".thread").forEach(function (th) {
    th.addEventListener("click", function () {
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

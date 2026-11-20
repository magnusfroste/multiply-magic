# MultiplyMagic

Gångertabellerna på tid för barn som tränar multiplikation. Barnet svarar på så många
multiplikationsfrågor det hinner på 60 sekunder, väljer vilka tabeller det vill träna och
försöker slå sitt eget rekord.

**Spela:** https://gangertabellen.skolappar.com · En del av [Skolappar](https://www.skolappar.com) – pedagogiska appar av föräldrar · öppen källkod (MIT)

Började som ett Lovable-projekt och körs nu fristående.

## Vad du kan göra

- **60 sekunder per runda**, med nedräkning 3–2–1 innan start. Bakgrunden byter färg när
  tio sekunder återstår.
- **Välja tabeller**: 1–10, alla eller bara de du vill fokusera på.
- **Välja frågetyp**: gissa första talet, andra talet eller produkten (`? × 7 = 42`,
  `6 × ? = 42`, `6 × 7 = ?`) – eller blanda.
- **Fem svarsalternativ** per fråga. Rätt eller fel visas direkt med ljud och en peppande text.
- **Poäng, svit och rekord**: aktuell svit, bästa svit i rundan och ditt högsta resultat.
- **Resultathistorik** som linjediagram över tidigare rundor.
- Ljudet går att stänga av.

## Kom igång

```bash
npm install
npm run dev        # utvecklingsserver
npm run build      # produktionsbygge till dist/
npm run build:dev  # bygge i utvecklingsläge
npm run preview    # förhandsgranska bygget
npm run lint       # eslint
```

Docker-bygget använder Node 22.

## Docker

```bash
docker build -t multiplymagic .
docker run --rm -p 8080:8080 multiplymagic
```

Servern ligger bakom nginx med `deploy/nginx.conf`.

## Integritet

- Ingen spårning, inga kakor, ingen analys, inget konto, ingen AI, inga nätverksanrop.
- Typsnittet Fredoka ligger i appen (`public/fonts/`). Ljuden skapas i webbläsaren med
  Web Audio.
- Det som sparas ligger i `localStorage`:
  - `matte-kul-scores` – resultathistoriken
  - `matte-kul-high-score` – rekordet
  - `soundMuted` – om ljudet är avstängt

  Rensa webbläsardata så är det borta.

## Struktur

```
src/
  pages/Index.tsx               spelsidan
  hooks/useGameLogic.ts         timer, frågor, poäng, svit, rekord
  lib/gameUtils.ts              svarsalternativ och peppande texter
  lib/scoreStorage.ts           historik och rekord i localStorage
  lib/sounds.ts                 ljudeffekter (Web Audio)
  lib/confetti.ts               konfetti
  components/GameQuestion.tsx   frågan och svarsknapparna
  components/GameHeader.tsx     poäng, tid, svit och inställningar
  components/SettingsContent.tsx välj tabeller och frågetyper
  components/ScoreHistory.tsx   diagram över tidigare rundor
deploy/nginx.conf               nginx-konfiguration för Docker
```

## Licens

MIT – se [LICENSE](LICENSE).

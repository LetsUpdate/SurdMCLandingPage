# Facebook Messenger SEO - Hibaelhárítás

## Probléma: A link előnézet nem jelenik meg Messenger-en

Ha megosztasz egy linket Facebook Messenger-en vagy Facebook-on, és az előnézet nem jelenik meg megfelelően, az általában Facebook cache-elési problémája.

## Megoldás

### 1. Facebook Sharing Debugger használata

A Facebook egy eszközt biztosít, amivel frissítheted a cache-t és ellenőrizheted az Open Graph metaadatokat:

**🔗 Link:** https://developers.facebook.com/tools/debug/

**Lépések:**
1. Menj a [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) oldalra
2. Írd be az URL-t: `https://surdmc.eu/`
3. Kattints a **"Debug"** gombra
4. Kattints a **"Scrape Again"** gombra a cache frissítéséhez
5. Ellenőrizd, hogy megjelennek-e a helyes adatok:
   - Cím: SurdMC.eu - Minecraft Szerver
   - Leírás: Csatlakozz a legjobb magyar modolt Minecraft szerverhez...
   - Kép: og-image.jpeg (2000x1057 pixel)

### 2. Ellenőrzési lista

A következő Open Graph meta tagek vannak beállítva az oldalon:

- ✅ `og:type` - website
- ✅ `og:url` - https://surdmc.eu/
- ✅ `og:title` - SurdMC.eu - Minecraft Szerver
- ✅ `og:description` - Teljes leírás a szerverről
- ✅ `og:image` - https://surdmc.eu/og-image.jpeg
- ✅ `og:image:secure_url` - HTTPS kép URL
- ✅ `og:image:type` - image/jpeg
- ✅ `og:image:width` - 2000 pixel
- ✅ `og:image:height` - 1057 pixel
- ✅ `og:image:alt` - Kép alternatív szöveg
- ✅ `og:site_name` - SurdMC.eu
- ✅ `og:locale` - hu_HU
- ✅ `canonical URL` - Hozzáadva a SEO javításához

### 3. Képméret követelmények

Facebook/Messenger képkövetelmények:
- ✅ **Minimum méret:** 200x200 pixel (teljesítve: 2000x1057)
- ✅ **Ajánlott méret:** 1200x630 pixel vagy nagyobb (teljesítve)
- ✅ **Maximális méret:** 8MB (teljesítve: ~470KB)
- ✅ **Formátum:** JPEG, PNG (használt: JPEG)
- ✅ **Aspect ratio:** 1.91:1 vagy hasonló (aktuális: ~1.89:1 - megfelelő)

### 4. Gyakori problémák és megoldások

#### A kép nem jelenik meg
- **Ok:** Facebook cache-elt régi adatokat
- **Megoldás:** Futtasd a Sharing Debugger-t és kattints "Scrape Again"-re

#### Régi cím/leírás jelenik meg
- **Ok:** Facebook cache
- **Megoldás:** Sharing Debugger → "Scrape Again"

#### "Could not scrape URL" hiba
- **Ok:** A szerver nem elérhető vagy blokkolja a Facebook bot-ot
- **Megoldás:** 
  - Ellenőrizd, hogy a https://surdmc.eu/ elérhető-e
  - Nézd meg a szerver logokat

#### A kép túl kicsi figyelmeztetés
- **Ok:** Korábban kisebb kép volt használva
- **Megoldás:** Most már megfelelő méretű kép van (2000x1057), futtasd újra a Debugger-t

### 5. Tesztelés

Miután frissítetted a Facebook cache-t a Debugger segítségével:

1. **Messenger teszt:**
   - Nyiss meg egy üzenetet valakivel
   - Írd be: `https://surdmc.eu/`
   - Várj pár másodpercet
   - Meg kell jelennie az előnézetnek

2. **Facebook poszt teszt:**
   - Készíts egy új posztot (lehet privát/csak én láthatom)
   - Illeszd be: `https://surdmc.eu/`
   - Ellenőrizd az előnézetet

### 6. Hasznos eszközök

- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Open Graph Protocol:** https://ogp.me/
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator

### 7. Karbantartás

Ha a jövőben módosítod az Open Graph meta tag-eket:
1. Mindig futtasd le a Facebook Sharing Debugger-t
2. Kattints "Scrape Again"-re a cache frissítéséhez
3. Teszteld Messenger-en és Facebook-on

## Technikai részletek

### Meta tagek helye
Az összes Open Graph meta tag a `public/index.html` fájl `<head>` szekciójában található (14-26. sorok).

### Kép helye
Az Open Graph kép: `public/og-image.jpeg` (2000x1057 pixel, ~470KB)

### Szerver konfiguráció
A Node.js szerver (`server.js`) megfelelően szolgálja ki az összes statikus fájlt, beleértve az og-image.jpeg-et is.

---

**Fontos:** A Facebook cache-eli az Open Graph adatokat, ezért ha módosítasz bármit, MINDIG futtasd le a Sharing Debugger-t!

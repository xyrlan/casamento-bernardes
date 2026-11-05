# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Family and friends who attended** the wedding of Pedro and Erica, opening a shared link to relive the day.
- **The couple themselves**, revisiting the site as a keepsake (anniversaries, quiet moments).
- **People who were not there**, meeting the couple's story for the first time.

Most visits arrive from a link shared in conversation; the visit is unhurried and emotional, not task-driven.

## Product Purpose

A single-page commemorative site for the wedding of Pedro and Erica (10 July 2023). It tells their story (first kiss, courtship, engagement, wedding, party) through their professional wedding photographs and short texts, with their first-dance song as an optional soundtrack. Success: a visitor feels they were there, or relives being there, and understands that the marriage is built on faith.

## Positioning

It is not a template wedding site, an invitation, or an RSVP tool: the wedding has already happened. It is the couple's own record, built from facts only they have: the first kiss on 10 July 2016 and the wedding exactly seven years later on the same date; a wedding planned by Erica's sister Débora in a week and a half; a first dance to "I Love You Baby" (credited by the couple to Frank Sinatra).

## Operating Context

- Opened from a shared link, usually on a phone, sometimes on desktop.
- Visitors scroll through once, start to finish; there is no navigation task, account, or form.
- Audio needs explicit consent before playing (browser autoplay rules and courtesy).

## Capabilities and Constraints

- Stack: Next.js 14 (App Router), React 18, Tailwind CSS 3, framer-motion. `lucide-react` available. A Spline dependency is installed but unused.
- Soundtrack: `/public/i-love-you-baby.mp3` (≈3.9 MB), looped, with a consent prompt and a persistent play/pause control. Must remain.
- Photographs: 29 originals in `/public` (`EricaePedro*.jpg`), 4000×2667 or 2667×4000, 0.5–2.8 MB each. Every photo currently on the site must remain on the site.
- Copy may be polished and shortened, but facts must stay exact and nothing new may be invented.
- Language: Brazilian Portuguese (`lang="pt-BR"`).

## Brand Commitments

- The couple: Pedro and Erica. Site title in use: "Maia Bernardes".
- Faith is a pillar of the story and must remain: "O nosso amor é um testemunho de fé, e é nessa fé que decidimos construir o nosso futuro. Um casamento com alicerces na rocha, que é Deus."
- The song "I Love You Baby" is part of the identity of the site and of their first dance.
- On this branch (`refino-main`) the owner asked for a refinement, not a new world: keep the concept of the site on `main`, which is a romantic night celebration with script names, elegant serif, a rosé accent and floating lights. Keep its section sequence (music invitation, hero, faith, story in photo pairs, "Uma semana mágica" carousel, "A Festa" photo sequence); the neon heart was removed at the owner's request, and two sections were added: "Sete anos depois, no mesmo dia" and the full album "Todas as fotos, com calma". Keep its interactions. Fonts and colours may change.

## Evidence on Hand

- Dates: first kiss 10 July 2016; wedding 10 July 2023 ("7 anos depois, no mesmo dia").
- People named: Pedro, Erica, Débora (Erica's sister, who planned the wedding in a week and a half).
- Professional photographs (`/public/EricaePedro*.jpg`): golden-hour park portraits, black-and-white portraits, a kiss under arched string lights, the reception (white tablecloths, peach and pink flowers, sheepskin chairs, a white tiered cake under a floral arch, a violin, paper-heart notes), and the party (dancing, sparklers, a fountain at night).
- Story texts in the current components (`src/app/components/*`): first kiss, first encounter, growing together, proposal, the wedding, Débora's planning, the first dance.
- Absent and not to be fabricated: venue name, city, ceremony details, guest quotes, the proposal story beyond what is written, any timeline dates beyond the two above.

## Product Principles

1. The photographs are the story; design serves them and never competes with them.
2. Every word is true and specific to Pedro and Erica; no generic wedding filler.
3. Faith is stated plainly and with dignity, not decorated.
4. The page must feel effortless on a phone opened from a chat link: fast to show the first image, smooth to scroll.
5. Sound is an invitation, never an ambush.

## Accessibility & Inclusion

Visitors span ages (grandparents included): comfortable text sizes, strong contrast on photographs, respect for `prefers-reduced-motion`, and real alt text on photographs.

// portraits/index.jsx
// Portrait SVGs extracted exactly from approved prototype d-trades-command-center-v2.html
// Do not modify appearance without Founder approval.

const SKIN = {
  dman:    ['#c87d3e','#a85e28'],
  oneeye:  ['#c09060','#9a7040'],
  dinkins: ['#d4a870','#b08850'],
  dip:     ['#d4b080','#b09060'],
  daveto:  ['#c87830','#a05820'],
  darius:  ['#c09080','#9a7060'],
  daytona: ['#d4906a','#b07048'],
  dfl3x:   ['#b0a8c0','#908098'],
};

function Portrait({ id, size = 90 }) {
  const s = size;
  const h = Math.round(size * 1.15);
  const [s1, s2] = SKIN[id] ?? ['#c0906a','#a07048'];

  const defs = `<defs>
    <radialGradient id="sk-${id}" cx="45%" cy="35%">
      <stop offset="0%" stop-color="${s1}"/>
      <stop offset="100%" stop-color="${s2}"/>
    </radialGradient>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c0c18"/>
      <stop offset="100%" stop-color="#050508"/>
    </linearGradient>
  </defs>`;

  const svgs = {
    dman: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="url(#bg-dman)"/>
      <path d="M0,115 L0,85 Q10,75 25,74 L40,82 L50,90 L60,82 L75,74 Q90,75 100,85 L100,115Z" fill="#1a1a2a"/>
      <path d="M36,74 L50,90 L64,74 L58,80 L50,86 L42,80Z" fill="#f0f0f0"/>
      <polygon points="47,74 50,96 53,74 52,83 48,83" fill="#f59e0b"/>
      <path d="M36,74 L25,74 L10,90" fill="none" stroke="#252535" stroke-width="1"/>
      <path d="M64,74 L75,74 L90,90" fill="none" stroke="#252535" stroke-width="1"/>
      <path d="M42,65 L42,76 Q50,80 58,76 L58,65 Q50,68 42,65Z" fill="url(#sk-dman)"/>
      <ellipse cx="50" cy="44" rx="28" ry="32" fill="url(#sk-dman)"/>
      <ellipse cx="22" cy="46" rx="5" ry="8" fill="url(#sk-dman)"/>
      <ellipse cx="78" cy="46" rx="5" ry="8" fill="url(#sk-dman)"/>
      <path d="M22,28 Q25,14 50,12 Q75,14 78,28 Q65,20 50,19 Q35,20 22,28Z" fill="#111118"/>
      <path d="M22,28 Q22,22 24,18" fill="none" stroke="#111118" stroke-width="4" stroke-linecap="round"/>
      <path d="M78,28 Q78,22 76,18" fill="none" stroke="#111118" stroke-width="4" stroke-linecap="round"/>
      <path d="M30,20 Q50,16 70,20" fill="none" stroke="#2a2a38" stroke-width="1.5" opacity="0.6"/>
      <path d="M24,33 Q32,30 40,32" fill="none" stroke="#1a1420" stroke-width="3" stroke-linecap="round"/>
      <path d="M60,32 Q68,30 76,33" fill="none" stroke="#1a1420" stroke-width="3" stroke-linecap="round"/>
      <path d="M20,38 L22,36 L40,36 L42,38 L40,47 Q31,52 22,47Z" fill="#050510" opacity="0.97"/>
      <path d="M58,38 L60,36 L78,36 L80,38 L78,47 Q69,52 60,47Z" fill="#050510" opacity="0.97"/>
      <line x1="42" y1="39" x2="58" y2="39" stroke="#2a2a3a" stroke-width="1.5"/>
      <line x1="20" y1="38" x2="15" y2="41" stroke="#2a2a3a" stroke-width="1.5"/>
      <line x1="80" y1="38" x2="85" y2="41" stroke="#2a2a3a" stroke-width="1.5"/>
      <ellipse cx="28" cy="41" rx="7" ry="3" fill="#f59e0b" opacity="0.12"/>
      <ellipse cx="72" cy="41" rx="7" ry="3" fill="#f59e0b" opacity="0.12"/>
      <path d="M47,48 L45,54 Q50,57 55,54 L53,48" fill="none" stroke="#a06028" stroke-width="1.2" opacity="0.6"/>
      <path d="M36,60 Q43,65 52,62 Q58,60 61,58" fill="none" stroke="#8a4820" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="22" cy="52" rx="7" ry="6" fill="#c07030" opacity="0.2"/>
      <ellipse cx="78" cy="52" rx="7" ry="6" fill="#c07030" opacity="0.2"/>
      <ellipse cx="50" cy="70" rx="20" ry="8" fill="#080810" opacity="0.3"/>
      <ellipse cx="50" cy="64" rx="22" ry="10" fill="#0a0810" opacity="0.2"/>
    </svg>`,

    oneeye: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="url(#bg-oneeye)"/>
      <rect width="100" height="115" rx="10" fill="#0a0018" opacity="0.7"/>
      <path d="M0,115 L0,85 Q12,74 28,73 L42,82 L50,90 L58,82 L72,73 Q88,74 100,85 L100,115Z" fill="#1e0a3a"/>
      <path d="M38,73 L50,88 L62,73 L56,80 L50,85 L44,80Z" fill="#e8e8f0"/>
      <path d="M18,40 Q18,10 50,10 Q82,10 82,40" fill="none" stroke="#8b5cf6" stroke-width="3.5"/>
      <rect x="13" y="37" width="11" height="16" rx="5" fill="#6d28d9"/>
      <rect x="76" y="37" width="11" height="16" rx="5" fill="#6d28d9"/>
      <path d="M24,50 L12,64 L15,67" fill="none" stroke="#8b5cf6" stroke-width="2"/>
      <circle cx="14" cy="67" r="3" fill="#a855f7"/>
      <path d="M42,64 L42,76 Q50,79 58,76 L58,64 Q50,67 42,64Z" fill="url(#sk-oneeye)"/>
      <ellipse cx="50" cy="44" rx="28" ry="30" fill="url(#sk-oneeye)"/>
      <path d="M22,30 Q24,16 50,14 Q76,16 78,30 Q65,22 50,21 Q35,22 22,30Z" fill="#2a1810"/>
      <path d="M22,30 Q20,24 22,18" fill="none" stroke="#2a1810" stroke-width="5" stroke-linecap="round"/>
      <path d="M78,30 Q80,24 78,18" fill="none" stroke="#2a1810" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="33" cy="40" rx="12" ry="9" fill="#050510"/>
      <path d="M21,34 Q33,32 45,34" fill="#050510" stroke="#1a1030" stroke-width="1.5"/>
      <line x1="21" y1="37" x2="14" y2="40" stroke="#0a0018" stroke-width="2"/>
      <ellipse cx="62" cy="40" rx="9" ry="7.5" fill="white"/>
      <circle cx="62" cy="40" r="5" fill="#5b21b6"/>
      <circle cx="62" cy="40" r="3" fill="#2d0a7a"/>
      <circle cx="63.5" cy="38.5" r="1.5" fill="white"/>
      <path d="M53,33 Q62,30 72,33" fill="none" stroke="#2a1810" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M47,48 L45,54 Q50,57 55,54 L53,48" fill="none" stroke="#906040" stroke-width="1.2" opacity="0.5"/>
      <path d="M36,60 Q45,64 58,60" fill="none" stroke="#806040" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="24" cy="52" rx="6" ry="5" fill="#c08050" opacity="0.18"/>
      <ellipse cx="76" cy="52" rx="6" ry="5" fill="#c08050" opacity="0.18"/>
      <ellipse cx="62" cy="40" rx="14" ry="12" fill="#8b5cf6" opacity="0.04"/>
    </svg>`,

    dinkins: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="url(#bg-dinkins)"/>
      <rect width="100" height="115" rx="10" fill="#001808" opacity="0.6"/>
      <path d="M0,115 L0,85 Q12,74 28,73 L42,82 L50,90 L58,82 L72,73 Q88,74 100,85 L100,115Z" fill="#0f2a18"/>
      <path d="M38,73 L50,88 L62,73" fill="#f0f0f0"/>
      <polygon points="47,73 50,98 53,73 52,82 48,82" fill="#10b981"/>
      <path d="M42,64 L42,76 Q50,79 58,76 L58,64 Q50,67 42,64Z" fill="url(#sk-dinkins)"/>
      <ellipse cx="50" cy="44" rx="26" ry="30" fill="url(#sk-dinkins)"/>
      <path d="M24,28 Q26,18 40,16 Q50,14 50,14 Q50,14 60,16 Q74,18 76,28 Q65,22 50,21 Q35,22 24,28Z" fill="#3a2a10"/>
      <ellipse cx="50" cy="20" rx="14" ry="8" fill="#c09060" opacity="0.2"/>
      <circle cx="35" cy="42" r="11" fill="none" stroke="#10b981" stroke-width="2"/>
      <circle cx="65" cy="42" r="11" fill="none" stroke="#10b981" stroke-width="2"/>
      <line x1="46" y1="42" x2="54" y2="42" stroke="#10b981" stroke-width="1.5"/>
      <line x1="24" y1="42" x2="18" y2="44" stroke="#10b981" stroke-width="1.5"/>
      <line x1="76" y1="42" x2="82" y2="44" stroke="#10b981" stroke-width="1.5"/>
      <ellipse cx="35" cy="42" rx="5" ry="4.5" fill="#f8f0e8"/>
      <ellipse cx="65" cy="42" rx="5" ry="4.5" fill="#f8f0e8"/>
      <circle cx="35" cy="42" r="3" fill="#2a3a28"/>
      <circle cx="65" cy="42" r="3" fill="#2a3a28"/>
      <circle cx="36" cy="41" r="1" fill="white"/>
      <circle cx="66" cy="41" r="1" fill="white"/>
      <path d="M25,33 Q35,30 44,32" fill="none" stroke="#3a2a10" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M56,32 Q65,30 75,33" fill="none" stroke="#3a2a10" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M47,50 L45,56 Q50,59 55,56 L53,50" fill="none" stroke="#a07840" stroke-width="1.2" opacity="0.6"/>
      <path d="M38,64 L52,64 L55,63" fill="none" stroke="#906040" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="50" cy="68" rx="20" ry="9" fill="#b08850" opacity="0.15"/>
      <ellipse cx="24" cy="52" rx="7" ry="6" fill="#d4906a" opacity="0.25"/>
      <ellipse cx="76" cy="52" rx="7" ry="6" fill="#d4906a" opacity="0.25"/>
    </svg>`,

    dip: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="url(#bg-dip)"/>
      <rect width="100" height="115" rx="10" fill="#001018" opacity="0.6"/>
      <path d="M0,115 L0,85 Q12,74 28,73 L42,82 L50,90 L58,82 L72,73 Q88,74 100,85 L100,115Z" fill="#0a2030"/>
      <path d="M38,73 L50,88 L62,73" fill="#f0f0f0"/>
      <rect x="22" y="78" width="10" height="7" rx="1" fill="#06b6d4" opacity="0.8"/>
      <polyline points="23,84 25,81 27,82 29,79 31,80" fill="none" stroke="white" stroke-width="1.2"/>
      <path d="M42,64 L42,76 Q50,79 58,76 L58,64 Q50,67 42,64Z" fill="url(#sk-dip)"/>
      <ellipse cx="50" cy="44" rx="26" ry="30" fill="url(#sk-dip)"/>
      <path d="M24,28 Q26,15 50,14 Q74,15 76,28 Q65,20 50,19 Q36,20 24,28Z" fill="#1e1008"/>
      <line x1="30" y1="16" x2="28" y2="28" stroke="#140a04" stroke-width="2" opacity="0.8"/>
      <path d="M32,17 Q50,14 68,17" fill="none" stroke="#2a1a08" stroke-width="1" opacity="0.5"/>
      <ellipse cx="34" cy="41" rx="8" ry="6" fill="white"/>
      <ellipse cx="66" cy="41" rx="8" ry="6" fill="white"/>
      <circle cx="34" cy="41" r="4.5" fill="#0891b2"/>
      <circle cx="66" cy="41" r="4.5" fill="#0891b2"/>
      <circle cx="34" cy="41" r="2.5" fill="#065f80"/>
      <circle cx="66" cy="41" r="2.5" fill="#065f80"/>
      <circle cx="35" cy="40" r="1.2" fill="white"/>
      <circle cx="67" cy="40" r="1.2" fill="white"/>
      <path d="M25,33 Q33,30 43,32" fill="none" stroke="#1e1008" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M57,32 Q67,30 75,33" fill="none" stroke="#1e1008" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M47,48 L45,55 Q50,58 55,55 L53,48" fill="none" stroke="#906040" stroke-width="1.2" opacity="0.55"/>
      <path d="M36,62 Q44,67 56,63" fill="none" stroke="#906040" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="24" cy="52" rx="6" ry="5" fill="#c09060" opacity="0.15"/>
      <ellipse cx="76" cy="52" rx="6" ry="5" fill="#c09060" opacity="0.15"/>
      <ellipse cx="34" cy="41" rx="12" ry="10" fill="#06b6d4" opacity="0.04"/>
      <ellipse cx="66" cy="41" rx="12" ry="10" fill="#06b6d4" opacity="0.04"/>
    </svg>`,

    daveto: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="url(#bg-daveto)"/>
      <rect width="100" height="115" rx="10" fill="#180800" opacity="0.5"/>
      <path d="M0,115 L0,85 Q12,74 28,73 L42,82 L50,90 L58,82 L72,73 Q88,74 100,85 L100,115Z" fill="#2a1200"/>
      <rect x="68" y="75" width="14" height="18" rx="3" fill="#f97316"/>
      <rect x="68" y="75" width="14" height="5" rx="3" fill="#ea580c"/>
      <path d="M82,80 Q88,80 88,84 Q88,88 82,88" fill="none" stroke="#f97316" stroke-width="2"/>
      <path d="M72,73 Q73,68 72,63" fill="none" stroke="#aaa" stroke-width="1.5" opacity="0.4"/>
      <path d="M77,73 Q78,67 77,62" fill="none" stroke="#aaa" stroke-width="1.5" opacity="0.4"/>
      <rect x="4" y="20" width="14" height="10" rx="2" fill="#f97316" opacity="0.3"/>
      <polyline points="5,29 7,25 9,27 11,23 13,24 16,21" fill="none" stroke="#f97316" stroke-width="1.2"/>
      <rect x="82" y="22" width="14" height="10" rx="2" fill="#f97316" opacity="0.3"/>
      <polyline points="83,31 85,27 87,28 89,25 91,26 94,23" fill="none" stroke="#f97316" stroke-width="1.2"/>
      <path d="M42,64 L42,76 Q50,79 58,76 L58,64 Q50,67 42,64Z" fill="url(#sk-daveto)"/>
      <ellipse cx="50" cy="44" rx="27" ry="30" fill="url(#sk-daveto)"/>
      <path d="M22,28 Q18,10 28,8 Q32,4 38,8 Q42,4 50,6 Q58,4 62,8 Q68,4 72,8 Q82,10 78,28" fill="#2a1400"/>
      <ellipse cx="22" cy="22" rx="8" ry="12" fill="#2a1400"/>
      <ellipse cx="78" cy="22" rx="8" ry="12" fill="#2a1400"/>
      <ellipse cx="50" cy="10" rx="20" ry="10" fill="#2a1400"/>
      <path d="M24,22 Q22,18 26,16" fill="none" stroke="#3a2000" stroke-width="2" stroke-linecap="round"/>
      <path d="M76,22 Q78,18 74,16" fill="none" stroke="#3a2000" stroke-width="2" stroke-linecap="round"/>
      <path d="M38,12 Q36,8 40,6" fill="none" stroke="#3a2000" stroke-width="2" stroke-linecap="round"/>
      <path d="M62,12 Q64,8 60,6" fill="none" stroke="#3a2000" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="34" cy="41" rx="9" ry="8" fill="white"/>
      <ellipse cx="66" cy="41" rx="9" ry="8" fill="white"/>
      <circle cx="34" cy="41" r="5.5" fill="#c2560a"/>
      <circle cx="66" cy="41" r="5.5" fill="#c2560a"/>
      <circle cx="34" cy="41" r="3" fill="#7a2e04"/>
      <circle cx="66" cy="41" r="3" fill="#7a2e04"/>
      <circle cx="35.5" cy="39.5" r="1.5" fill="white"/>
      <circle cx="67.5" cy="39.5" r="1.5" fill="white"/>
      <path d="M24,31 Q33,27 43,30" fill="none" stroke="#2a1400" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M57,30 Q67,27 76,31" fill="none" stroke="#2a1400" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M47,49 L45,55 Q50,58 55,55 L53,49" fill="none" stroke="#904020" stroke-width="1.2" opacity="0.6"/>
      <path d="M30,62 Q40,72 50,70 Q60,72 70,62" fill="none" stroke="#904020" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="50" cy="66" rx="22" ry="10" fill="#1a0a00" opacity="0.2"/>
      <ellipse cx="50" cy="44" rx="35" ry="38" fill="#f97316" opacity="0.02"/>
    </svg>`,

    darius: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="#030008"/>
      <radialGradient id="bg-eff-darius" cx="50%" cy="60%"><stop offset="0%" stop-color="#1a0030" stop-opacity="0.4"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
      <rect width="100" height="115" rx="10" fill="url(#bg-eff-darius)"/>
      <path d="M0,115 L0,80 Q5,68 22,66 L38,78 L50,86 L62,78 L78,66 Q95,68 100,80 L100,115Z" fill="#14082a"/>
      <path d="M18,42 Q15,20 20,12 Q28,4 50,4 Q72,4 80,12 Q85,20 82,42" fill="#14082a"/>
      <path d="M18,42 Q12,34 14,22" fill="none" stroke="#1a0a34" stroke-width="4" stroke-linecap="round"/>
      <path d="M82,42 Q88,34 86,22" fill="none" stroke="#1a0a34" stroke-width="4" stroke-linecap="round"/>
      <path d="M20,42 Q18,28 22,16 Q30,8 50,8 Q70,8 78,16 Q82,28 80,42" fill="#0a0418" opacity="0.5"/>
      <path d="M42,64 L42,76 Q50,79 58,76 L58,64 Q50,67 42,64Z" fill="url(#sk-darius)"/>
      <ellipse cx="50" cy="44" rx="26" ry="30" fill="url(#sk-darius)"/>
      <path d="M18,38 L24,35 L46,35 L50,37 L54,35 L76,35 L82,38 L78,47 Q64,54 50,52 Q36,54 22,47Z" fill="#040012" opacity="0.98"/>
      <line x1="46" y1="36" x2="54" y2="36" stroke="#3a0060" stroke-width="2"/>
      <text x="22" y="44" font-size="6" fill="#00ff41" opacity="0.85" font-family="monospace">01</text>
      <text x="22" y="51" font-size="5" fill="#00ff41" opacity="0.5" font-family="monospace">10</text>
      <text x="58" y="44" font-size="6" fill="#00ff41" opacity="0.85" font-family="monospace">10</text>
      <text x="58" y="51" font-size="5" fill="#00ff41" opacity="0.5" font-family="monospace">01</text>
      <line x1="18" y1="40" x2="12" y2="42" stroke="#2a0050" stroke-width="2"/>
      <line x1="82" y1="40" x2="88" y2="42" stroke="#2a0050" stroke-width="2"/>
      <path d="M22,34 Q34,31 46,33" fill="none" stroke="#2a1040" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M54,33 Q66,31 78,34" fill="none" stroke="#2a1040" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M47,52 L45,57 Q50,60 55,57 L53,52" fill="none" stroke="#7a4060" stroke-width="1" opacity="0.4"/>
      <path d="M36,64 Q50,66 64,64" fill="none" stroke="#7a4060" stroke-width="1.5" stroke-linecap="round"/>
      <ellipse cx="50" cy="42" rx="30" ry="12" fill="#00ff41" opacity="0.03"/>
      <text x="3" y="16" font-size="7" fill="#ef4444" opacity="0.3" font-family="monospace">{ }</text>
      <text x="74" y="20" font-size="7" fill="#00ff41" opacity="0.25" font-family="monospace">&lt;/&gt;</text>
      <text x="2" y="65" font-size="6" fill="#00ff41" opacity="0.2" font-family="monospace">[]</text>
    </svg>`,

    daytona: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="url(#bg-daytona)"/>
      <rect width="100" height="115" rx="10" fill="#140018" opacity="0.5"/>
      <path d="M0,115 L0,85 Q12,74 28,73 L42,82 L50,90 L58,82 L72,73 Q88,74 100,85 L100,115Z" fill="#0f0020"/>
      <path d="M38,73 L50,88 L62,73" fill="#f0f0f0"/>
      <polygon points="70,76 76,72 78,82" fill="#ec4899"/>
      <text x="82" y="18" font-size="14" fill="#ec4899" opacity="0.5">✦</text>
      <text x="5" y="22" font-size="9" fill="#ec4899" opacity="0.3">✦</text>
      <text x="12" y="60" font-size="7" fill="#ec4899" opacity="0.2">✦</text>
      <path d="M42,64 L42,76 Q50,79 58,76 L58,64 Q50,67 42,64Z" fill="url(#sk-daytona)"/>
      <ellipse cx="50" cy="44" rx="27" ry="30" fill="url(#sk-daytona)"/>
      <path d="M23,28 Q25,14 50,12 Q75,14 77,28 Q65,20 50,19 Q35,20 23,28Z" fill="#1e0808"/>
      <path d="M23,28 Q25,22 28,18" fill="none" stroke="#1e0808" stroke-width="4" stroke-linecap="round"/>
      <path d="M77,28 Q75,22 72,18" fill="none" stroke="#1e0808" stroke-width="4" stroke-linecap="round"/>
      <path d="M30,16 Q40,12 50,12" fill="none" stroke="#2a1010" stroke-width="1.5" opacity="0.5"/>
      <ellipse cx="34" cy="40" rx="8" ry="6.5" fill="white"/>
      <ellipse cx="66" cy="40" rx="8" ry="6.5" fill="white"/>
      <circle cx="34" cy="40" r="4.5" fill="#be185d"/>
      <circle cx="66" cy="40" r="4.5" fill="#be185d"/>
      <circle cx="34" cy="40" r="2.5" fill="#881337"/>
      <circle cx="66" cy="40" r="2.5" fill="#881337"/>
      <circle cx="35.5" cy="38.5" r="1.3" fill="white"/>
      <circle cx="67.5" cy="38.5" r="1.3" fill="white"/>
      <path d="M24,32 Q33,28 43,31" fill="none" stroke="#1e0808" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M57,31 Q67,28 76,32" fill="none" stroke="#1e0808" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M47,48 L45,54 Q50,57 55,54 L53,48" fill="none" stroke="#904048" stroke-width="1.2" opacity="0.6"/>
      <path d="M28,58 Q38,72 50,70 Q62,72 72,58" fill="none" stroke="#904048" stroke-width="3" stroke-linecap="round"/>
      <path d="M32,62 Q42,72 50,70 Q58,72 68,62 Q58,70 50,69 Q42,70 32,62Z" fill="white" opacity="0.85"/>
      <path d="M24,54 Q20,60 22,66" fill="none" stroke="#a06050" stroke-width="1.2" opacity="0.4"/>
      <path d="M76,54 Q80,60 78,66" fill="none" stroke="#a06050" stroke-width="1.2" opacity="0.4"/>
      <ellipse cx="20" cy="54" rx="8" ry="7" fill="#ec4899" opacity="0.2"/>
      <ellipse cx="80" cy="54" rx="8" ry="7" fill="#ec4899" opacity="0.2"/>
    </svg>`,

    dfl3x: `<svg width="${s}" height="${h}" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect width="100" height="115" rx="10" fill="#000812"/>
      <radialGradient id="bg-eff-dfl3x" cx="50%" cy="80%"><stop offset="0%" stop-color="#001830" stop-opacity="0.5"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
      <rect width="100" height="115" rx="10" fill="url(#bg-eff-dfl3x)"/>
      <path d="M0,115 L0,85 Q12,74 28,73 L42,82 L50,90 L58,82 L72,73 Q88,74 100,85 L100,115Z" fill="#0a1830"/>
      <rect x="68" y="74" width="12" height="20" rx="3" fill="#2563eb"/>
      <rect x="68" y="74" width="12" height="5" rx="3" fill="#60a5fa"/>
      <text x="69" y="90" font-size="5" fill="white" font-family="monospace" font-weight="bold">FLUX</text>
      <path d="M42,64 L42,76 Q50,79 58,76 L58,64 Q50,67 42,64Z" fill="url(#sk-dfl3x)"/>
      <ellipse cx="50" cy="44" rx="27" ry="30" fill="url(#sk-dfl3x)"/>
      <path d="M23,28 Q20,12 30,8 Q36,4 42,8 Q44,4 50,6 Q56,4 58,8 Q64,4 70,8 Q80,12 77,28" fill="#0e1c2e"/>
      <path d="M24,22 Q22,14 26,10" fill="none" stroke="#0e1c2e" stroke-width="4" stroke-linecap="round"/>
      <path d="M36,12 Q34,6 38,4" fill="none" stroke="#0e1c2e" stroke-width="3" stroke-linecap="round"/>
      <path d="M50,8 Q50,2 52,0" fill="none" stroke="#0e1c2e" stroke-width="3" stroke-linecap="round"/>
      <path d="M64,12 Q66,6 62,4" fill="none" stroke="#0e1c2e" stroke-width="3" stroke-linecap="round"/>
      <path d="M76,22 Q78,14 74,10" fill="none" stroke="#0e1c2e" stroke-width="4" stroke-linecap="round"/>
      <rect x="20" y="35" width="24" height="16" rx="4" fill="#080818" opacity="0.97"/>
      <rect x="56" y="35" width="24" height="16" rx="4" fill="#080818" opacity="0.97"/>
      <line x1="44" y1="41" x2="56" y2="41" stroke="#1d4ed8" stroke-width="2"/>
      <line x1="20" y1="41" x2="14" y2="44" stroke="#1a2a4a" stroke-width="2"/>
      <line x1="80" y1="41" x2="86" y2="44" stroke="#1a2a4a" stroke-width="2"/>
      <text x="22" y="44" font-size="6" fill="#60a5fa" opacity="0.9" font-family="monospace">if{}</text>
      <text x="22" y="50" font-size="5" fill="#3b82f6" opacity="0.6" font-family="monospace">else</text>
      <text x="58" y="44" font-size="6" fill="#60a5fa" opacity="0.9" font-family="monospace">fn()</text>
      <text x="58" y="50" font-size="5" fill="#3b82f6" opacity="0.6" font-family="monospace">let</text>
      <path d="M20,33 Q32,30 44,33" fill="none" stroke="#0e1c2e" stroke-width="3" stroke-linecap="round"/>
      <path d="M56,33 Q68,30 80,33" fill="none" stroke="#0e1c2e" stroke-width="3" stroke-linecap="round"/>
      <path d="M20,51 Q32,54 44,51" fill="none" stroke="#8090a8" stroke-width="1" opacity="0.3"/>
      <path d="M56,51 Q68,54 80,51" fill="none" stroke="#8090a8" stroke-width="1" opacity="0.3"/>
      <path d="M47,52 L45,58 Q50,61 55,58 L53,52" fill="none" stroke="#706880" stroke-width="1.2" opacity="0.5"/>
      <path d="M36,64 Q44,67 56,64" fill="none" stroke="#707090" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="50" cy="42" rx="32" ry="15" fill="#3b82f6" opacity="0.03"/>
    </svg>`,
  };

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: svgs[id] ?? `<svg width="${s}" height="${h}" viewBox="0 0 100 115"><rect width="100" height="115" rx="10" fill="#1a1a2e"/></svg>`,
      }}
    />
  );
}

export default Portrait;

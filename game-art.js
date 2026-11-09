'use strict';

// Decorative, self-contained vector artwork. Colors inherit each game's palette.
window.CocosGameArt = Object.freeze({
  M2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <defs><linearGradient id="m2-rock" x1="260" y1="105" x2="385" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="var(--art-light)"/><stop offset="1" stop-color="var(--art-dark)"/></linearGradient><linearGradient id="m2-trail" x1="414" y1="50" x2="317" y2="221" gradientUnits="userSpaceOnUse"><stop stop-color="var(--art-accent)" stop-opacity="0"/><stop offset="1" stop-color="var(--art-accent)" stop-opacity=".55"/></linearGradient></defs>
    <ellipse cx="304" cy="353" rx="160" ry="20" fill="#071615" opacity=".28"/>
    <ellipse cx="301" cy="223" rx="215" ry="121" transform="rotate(-23 301 223)" stroke="var(--art-light)" stroke-opacity=".19"/>
    <ellipse cx="301" cy="223" rx="186" ry="94" transform="rotate(-23 301 223)" stroke="var(--art-light)" stroke-opacity=".12"/>
    <path d="m295 209 120-161-35 139 99-107-74 173Z" fill="url(#m2-trail)"/>
    <path d="m258 130 69-26 63 30 39 59-12 80-53 53-77 4-58-41-23-70 17-53Z" fill="url(#m2-rock)"/>
    <path d="m327 104-27 76 39 32 51-78Z" fill="var(--art-light)" opacity=".7"/>
    <path d="m300 180-64 14-30 25 23 70 50-40Z" fill="var(--art-mid)"/>
    <path d="m339 212 56 45 22 16 12-80-39-59Z" fill="var(--art-mid)" opacity=".65"/>
    <path d="m279 249 8 81 77-4 31-69-56-45Z" fill="var(--art-dark)" opacity=".45"/>
    <ellipse cx="273" cy="181" rx="21" ry="15" transform="rotate(-33 273 181)" fill="var(--art-dark)"/>
    <path d="M255 186c3-14 21-25 34-18" stroke="var(--art-accent)" stroke-opacity=".45" stroke-width="3"/>
    <ellipse cx="359" cy="254" rx="27" ry="21" transform="rotate(25 359 254)" fill="var(--art-dark)" opacity=".7"/>
    <path d="M337 254c2-15 23-25 40-10" stroke="var(--art-light)" stroke-opacity=".5" stroke-width="3"/>
    <ellipse cx="287" cy="288" rx="12" ry="8" transform="rotate(20 287 288)" fill="var(--art-dark)"/>
    <path d="M109 284c34 24 106 14 181-15 85-33 157-84 174-119" stroke="var(--art-accent)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="135" cy="292" r="8" fill="var(--art-accent)"/>
    <path d="m156 118 19-10 21 13-5 26-24 4-18-16Z" fill="var(--art-mid)"/><path d="m175 108 4 22 17-9-5 26-12-17-12 21-18-16Z" fill="var(--art-light)" opacity=".55"/>
    <path d="m449 295 15-6 17 13-6 19-22 4-10-16Z" fill="var(--art-mid)"/><path d="m464 289-5 20 16 12 6-19Z" fill="var(--art-light)" opacity=".6"/>
    <path d="m228 68 3-10 3 10 10 3-10 3-3 10-3-10-10-3Zm207 39 4-13 4 13 13 4-13 4-4 13-4-13-13-4Z" fill="var(--art-accent)"/>
    <circle cx="122" cy="196" r="3" fill="var(--art-light)"/><circle cx="401" cy="350" r="3" fill="var(--art-light)" opacity=".6"/><circle cx="325" cy="61" r="2" fill="var(--art-accent)"/>
  </svg>`,
  M3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <ellipse cx="300" cy="351" rx="165" ry="21" fill="#071615" opacity=".28"/>
    <circle cx="300" cy="207" r="143" stroke="var(--art-light)" stroke-opacity=".14"/><circle cx="300" cy="207" r="118" stroke="var(--art-light)" stroke-opacity=".08"/>
    <path d="m151 321 149-61 150 61-150 63Z" fill="var(--art-mid)"/><path d="m151 321 149 63v14l-149-63Z" fill="var(--art-dark)"/><path d="m300 384 150-63v14l-150 63Z" fill="var(--art-dark)" opacity=".7"/>
    <g transform="rotate(-34 251 209)">
      <path d="m251 69-9 19h18Z" fill="var(--art-accent)"/><path d="m251 326-9-19h18Z" fill="var(--art-accent)"/>
      <rect x="216" y="82" width="70" height="231" rx="35" fill="var(--art-dark)"/>
      <rect x="211" y="79" width="64" height="231" rx="32" fill="var(--art-mid)"/>
      <path d="M231 101c-9 10-10 23-10 39v108" stroke="var(--art-light)" stroke-opacity=".7" stroke-width="6" stroke-linecap="round"/>
      <path d="m243 137 26-13m-26 52 26-13m-26 52 26-13m-26 52 26-13" stroke="var(--art-dark)" stroke-width="7" stroke-linecap="round"/>
      <path d="m244 134 23-12m-23 51 23-12m-23 51 23-12m-23 51 23-12" stroke="var(--art-accent)" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/>
    </g>
    <g transform="rotate(34 349 209)">
      <path d="m349 69-9 19h18Z" fill="var(--art-accent)"/><path d="m349 326-9-19h18Z" fill="var(--art-accent)"/>
      <rect x="314" y="82" width="70" height="231" rx="35" fill="var(--art-dark)"/>
      <rect x="309" y="79" width="64" height="231" rx="32" fill="var(--art-light)"/>
      <path d="M329 101c-9 10-10 23-10 39v108" stroke="#fff" stroke-opacity=".3" stroke-width="6" stroke-linecap="round"/>
      <path d="m341 137 26-13m-26 52 26-13m-26 52 26-13m-26 52 26-13" stroke="var(--art-mid)" stroke-width="7" stroke-linecap="round"/>
    </g>
    <path d="m297 166-15 28 17 9-17 25 40-30-21-8 12-24Z" fill="var(--art-accent)" stroke="var(--art-dark)" stroke-width="5" stroke-linejoin="round"/>
    <path d="m146 164-16-10m30 40-23 1m319-31 16-10m-30 40 23 1" stroke="var(--art-accent)" stroke-width="3" stroke-linecap="round"/>
    <path d="m187 67 3-10 3 10 10 3-10 3-3 10-3-10-10-3Zm222 239 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z" fill="var(--art-accent)"/>
    <circle cx="434" cy="85" r="3" fill="var(--art-light)"/><circle cx="127" cy="277" r="3" fill="var(--art-light)"/>
  </svg>`,
  M4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <defs><linearGradient id="m4-arrow" x1="208" y1="112" x2="246" y2="297" gradientUnits="userSpaceOnUse"><stop stop-color="var(--art-accent)"/><stop offset="1" stop-color="var(--art-mid)"/></linearGradient></defs>
    <ellipse cx="299" cy="358" rx="183" ry="19" fill="#071615" opacity=".28"/>
    <path d="m113 306 186-84 189 84-189 87Z" fill="var(--art-dark)"/><path d="m113 306 186 87v13l-186-87Zm186 87 189-87v13l-189 87Z" fill="var(--art-mid)" opacity=".5"/>
    <path d="m141 306 158-71 162 71-162 74Z" stroke="var(--art-light)" stroke-opacity=".3"/>
    <path d="m167 317 64-28m135 48 58-26m-135 50 42-20" stroke="var(--art-light)" stroke-opacity=".4" stroke-width="2"/>
    <path d="M171 265V130l58-27 58 27v135l-58 27Z" fill="var(--art-mid)" opacity=".14" stroke="var(--art-light)" stroke-opacity=".25"/>
    <path d="m229 157 58-27m-58 27v135m0-135-58-27" stroke="var(--art-light)" stroke-opacity=".2"/>
    <path d="m250 89-70 97 32-14v127l38-18 17-22V157l34-15Z" fill="var(--art-dark)"/>
    <path d="m234 82-70 97 32-14v127l38-18V147l34-15Z" fill="url(#m4-arrow)"/>
    <path d="m234 82 16 7 51 53-33-10Zm0 65 16 10v124l-16-7Z" fill="var(--art-light)" opacity=".7"/>
    <path d="m234 98-43 60 19-8v112" stroke="#fff" stroke-opacity=".22" stroke-width="3" stroke-linecap="round"/>
    <path d="m359 318-69-36 33-15V141l38-18 18 10v117l33-15Z" fill="var(--art-dark)"/>
    <path d="m343 311-69-36 33-15V134l38-18v128l33-15Z" fill="var(--art-mid)"/>
    <path d="m345 116 16 7 18 10-34-17Zm0 128 16 8 51-17-34-6Zm-2 67 16 7 53-83-34-6Z" fill="var(--art-light)" opacity=".55"/>
    <path d="M323 153v119l-21 9" stroke="var(--art-light)" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
    <path d="M119 215h-14v-44h23m347 58h15v-44h-23M320 68v-14h-43" stroke="var(--art-light)" stroke-opacity=".35" stroke-width="2"/>
    <circle cx="131" cy="171" r="4" fill="var(--art-accent)"/><circle cx="464" cy="185" r="4" fill="var(--art-light)"/><circle cx="277" cy="54" r="3" fill="var(--art-accent)"/>
    <path d="m419 91 3-11 3 11 11 3-11 3-3 11-3-11-11-3Zm-254 229 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="var(--art-accent)"/>
  </svg>`,
  M5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <defs><linearGradient id="m5-wing" x1="300" y1="100" x2="300" y2="322" gradientUnits="userSpaceOnUse"><stop stop-color="var(--art-accent)"/><stop offset="1" stop-color="var(--art-mid)"/></linearGradient></defs>
    <ellipse cx="300" cy="363" rx="145" ry="17" fill="#071615" opacity=".25"/>
    <circle cx="300" cy="204" r="135" stroke="var(--art-light)" stroke-opacity=".16"/><circle cx="300" cy="204" r="112" stroke="var(--art-light)" stroke-opacity=".08"/>
    <path d="M292 231C218 228 152 187 124 121c60 21 111 28 150 55Z" fill="var(--art-dark)"/>
    <path d="M308 231c74-3 140-44 168-110-60 21-111 28-150 55Z" fill="var(--art-dark)"/>
    <path d="M291 225C216 194 166 150 155 91c54 42 103 64 128 91Z" fill="var(--art-mid)"/>
    <path d="M309 225c75-31 125-75 136-134-54 42-103 64-128 91Z" fill="var(--art-mid)"/>
    <path d="M295 231C235 186 210 130 219 77c31 58 63 77 77 104Z" fill="url(#m5-wing)"/>
    <path d="M305 231c60-45 85-101 76-154-31 58-63 77-77 104Z" fill="url(#m5-wing)"/>
    <path d="M295 231c-17 49-20 79-5 115-39-21-56-52-41-89Z" fill="var(--art-mid)"/>
    <path d="M305 231c17 49 20 79 5 115 39-21 56-52 41-89Z" fill="var(--art-mid)"/>
    <path d="M300 215c-24 42-29 80 0 137 29-57 24-95 0-137Z" fill="var(--art-light)"/>
    <path d="M300 215v137c29-57 24-95 0-137Z" fill="var(--art-accent)" opacity=".5"/>
    <path d="M300 260c-26-22-38-49-26-74l13-25 1-35 19-15 16 10 15 7-18 9-4 41c22 31 14 57-16 82Z" fill="var(--art-light)"/>
    <path d="m288 126 19-15-7-18 16 8 8-19 5 22 17 5-23 12Z" fill="var(--art-accent)"/>
    <path d="m323 121 15 7-18 9Z" fill="var(--art-accent)"/><circle cx="311" cy="127" r="3" fill="var(--art-dark)"/>
    <path d="m300 230-11-34 10-17 11 19Z" fill="var(--art-accent)"/>
    <circle cx="168" cy="243" r="22" fill="var(--art-dark)" stroke="var(--art-mid)"/><circle cx="168" cy="241" r="14" fill="var(--art-light)" opacity=".7"/>
    <circle cx="209" cy="317" r="20" fill="var(--art-dark)" stroke="var(--art-mid)"/><circle cx="209" cy="315" r="12" fill="var(--art-accent)" opacity=".8"/>
    <circle cx="300" cy="65" r="20" fill="var(--art-dark)" stroke="var(--art-mid)"/><circle cx="300" cy="63" r="12" fill="var(--art-accent)"/>
    <circle cx="391" cy="317" r="20" fill="var(--art-dark)" stroke="var(--art-mid)"/><circle cx="391" cy="315" r="12" fill="var(--art-light)"/>
    <circle cx="432" cy="243" r="22" fill="var(--art-dark)" stroke="var(--art-mid)"/><circle cx="432" cy="241" r="14" fill="var(--art-accent)" opacity=".65"/>
    <path d="m120 204 3-10 3 10 10 3-10 3-3 10-3-10-10-3Zm350-40 3-10 3 10 10 3-10 3-3 10-3-10-10-3Z" fill="var(--art-accent)"/>
  </svg>`,
  M6: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <defs><linearGradient id="m6-coin" x1="226" y1="94" x2="376" y2="292" gradientUnits="userSpaceOnUse"><stop stop-color="var(--art-light)"/><stop offset=".5" stop-color="var(--art-accent)"/><stop offset="1" stop-color="var(--art-mid)"/></linearGradient></defs>
    <ellipse cx="303" cy="354" rx="157" ry="22" fill="#071615" opacity=".3"/>
    <ellipse cx="302" cy="218" rx="204" ry="97" transform="rotate(-24 302 218)" stroke="var(--art-light)" stroke-opacity=".16"/>
    <path d="M204 337v-33h135v33c0 16-30 29-67 29s-68-13-68-29Z" fill="var(--art-mid)"/>
    <ellipse cx="271" cy="304" rx="67" ry="29" fill="var(--art-light)"/><path d="M204 323c17 20 91 34 135 0" stroke="var(--art-dark)" stroke-opacity=".45" stroke-width="3"/>
    <path d="M211 308v-27h135v27c0 16-30 29-67 29s-68-13-68-29Z" fill="var(--art-mid)"/>
    <ellipse cx="278" cy="281" rx="67" ry="29" fill="var(--art-light)"/><ellipse cx="278" cy="281" rx="51" ry="19" stroke="var(--art-accent)" stroke-opacity=".7" stroke-width="3"/>
    <path d="m227 297v15m15-10v16m17-13v18m18-16v18m19-20v18m18-24v17m17-25v15" stroke="var(--art-accent)" stroke-opacity=".45" stroke-width="3"/>
    <ellipse cx="323" cy="178" rx="86" ry="110" transform="rotate(22 323 178)" fill="var(--art-dark)"/>
    <ellipse cx="309" cy="172" rx="86" ry="110" transform="rotate(22 309 172)" fill="url(#m6-coin)"/>
    <ellipse cx="309" cy="172" rx="70" ry="92" transform="rotate(22 309 172)" stroke="var(--art-dark)" stroke-opacity=".45" stroke-width="4"/>
    <ellipse cx="309" cy="172" rx="61" ry="82" transform="rotate(22 309 172)" stroke="#fff" stroke-opacity=".28" stroke-width="2"/>
    <path d="m302 106 19 44 37 5-35 30-11 49-19-45-37-5 35-30Z" fill="var(--art-dark)" opacity=".75"/>
    <path d="m302 106 19 44 37 5-43 10Z" fill="#fff" opacity=".18"/>
    <path d="M103 257c35 33 131 24 235-22 96-43 161-96 160-125" stroke="var(--art-accent)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="452" cy="172" r="9" fill="var(--art-accent)"/>
    <path d="M182 133c3-24 15-40 32-51m-45 49 12 10 11-10M423 297c-9 19-24 33-43 40m56-37-10-12-13 7" stroke="var(--art-light)" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="m429 76 4-12 4 12 12 4-12 4-4 12-4-12-12-4Zm-260 213 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="var(--art-accent)"/>
    <circle cx="144" cy="185" r="3" fill="var(--art-light)"/><circle cx="379" cy="56" r="2" fill="var(--art-accent)"/>
  </svg>`,
  M7: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <defs><radialGradient id="m7-ball"><stop stop-color="var(--art-light)"/><stop offset="1" stop-color="var(--art-mid)"/></radialGradient></defs>
    <ellipse cx="299" cy="358" rx="179" ry="22" fill="#071615" opacity=".28"/>
    <path d="M146 329v-26h307v26c-16 27-73 45-154 45s-137-18-153-45Z" fill="var(--art-dark)"/>
    <ellipse cx="299" cy="303" rx="153" ry="43" fill="var(--art-mid)"/><ellipse cx="299" cy="303" rx="127" ry="31" fill="var(--art-dark)"/>
    <path d="M182 201v102m235-102v102" stroke="var(--art-mid)" stroke-width="9"/>
    <path d="M178 201v102m235-102v102" stroke="var(--art-light)" stroke-width="3"/>
    <path d="M137 198c62-14 115-53 163-111 48 58 101 97 163 111-88 36-238 36-326 0Z" fill="var(--art-mid)"/>
    <path d="M137 198c62-14 115-53 163-111-29 61-65 96-108 125Z" fill="var(--art-light)"/>
    <path d="M253 222c18-38 34-80 47-135 13 55 29 97 47 135Z" fill="var(--art-accent)"/>
    <path d="M408 212c-43-29-79-64-108-125 48 58 101 97 163 111Z" fill="var(--art-light)"/>
    <path d="M137 198v16c15 18 40 18 55-2 16 20 43 24 61 10 25 16 69 16 94 0 18 14 45 10 61-10 15 20 40 20 55 2v-16c-88 36-238 36-326 0Z" fill="var(--art-mid)"/>
    <path d="M300 88V50l44 16-44 13" stroke="var(--art-light)" stroke-width="3" fill="var(--art-accent)"/>
    <circle cx="226" cy="265" r="37" fill="url(#m7-ball)"/><path d="M208 248c4-7 10-10 17-10" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>
    <path d="m226 252 5 9 10 2-7 7 1 10-9-5-9 5 1-10-7-7 10-2Z" fill="var(--art-dark)" opacity=".65"/>
    <circle cx="369" cy="268" r="31" fill="var(--art-accent)"/><path d="M354 254c3-6 9-8 14-8" stroke="#fff" stroke-opacity=".45" stroke-width="4" stroke-linecap="round"/>
    <path d="m369 255 10 13-10 13-10-13Z" fill="var(--art-dark)" opacity=".65"/>
    <circle cx="300" cy="308" r="41" fill="var(--art-light)"/><path d="M278 290c5-7 12-11 21-11" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>
    <path d="m300 291 5 11 12 2-9 8 2 12-10-6-11 6 2-12-9-8 13-2Z" fill="var(--art-mid)"/>
    <path d="m151 100 4-12 4 12 12 4-12 4-4 12-4-12-12-4Zm288 176 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="var(--art-accent)"/>
    <circle cx="413" cy="87" r="3" fill="var(--art-light)"/><circle cx="123" cy="271" r="3" fill="var(--art-light)"/>
  </svg>`,
  M8: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <ellipse cx="300" cy="356" rx="178" ry="23" fill="#071615" opacity=".3"/>
    <path d="m166 214 143-65 132 65-135 66Z" fill="var(--art-dark)"/>
    <path d="m166 214 140 66v95l-140-69Z" fill="var(--art-mid)"/><path d="m306 280 135-66v95l-135 66Z" fill="var(--art-dark)"/>
    <path d="m166 214 140 66 135-66v19l-135 65-140-66Z" fill="var(--art-light)"/>
    <path d="m166 288 140 67 135-67v21l-135 66-140-69Z" fill="var(--art-light)" opacity=".7"/>
    <path d="m203 251 14 7v67l-14-7Zm59 29 14 6v68l-14-7Z" fill="var(--art-dark)" opacity=".45"/>
    <path d="m338 282 15-7v67l-15 7Zm57-27 15-7v67l-15 7Z" fill="var(--art-mid)"/>
    <path d="m166 214-13-80c-5-31 4-52 29-63l119-55c25-11 41 0 46 31l14 79Z" fill="var(--art-dark)"/>
    <path d="m166 214 141-65-13-80c-5-31-21-42-46-31L182 71c-25 11-34 32-29 63Z" fill="var(--art-mid)"/>
    <path d="m181 194-10-63c-3-21 3-34 19-42l60-28c14-6 22 2 26 22l10 54Z" fill="var(--art-dark)"/>
    <path d="m166 214 141-65-3-16-141 65Z" fill="var(--art-light)"/>
    <path d="m307 149 54-23-14-79c-5-31-21-42-46-31l-53 22c25-11 41 0 46 31Z" fill="var(--art-light)"/>
    <path d="m315 43 12 69m-32-56 12 68" stroke="var(--art-mid)" stroke-width="9"/>
    <ellipse cx="246" cy="211" rx="30" ry="13" fill="var(--art-accent)"/><ellipse cx="282" cy="225" rx="31" ry="14" fill="var(--art-light)"/><ellipse cx="333" cy="207" rx="33" ry="15" fill="var(--art-accent)"/>
    <path d="m312 189 17-37 33 6 17 27-36 28Z" fill="var(--art-light)"/><path d="m329 152 14 61 19-55Z" fill="var(--art-accent)"/><path d="m312 189 31 24-14-61Z" fill="var(--art-mid)"/>
    <path d="m229 188 15-25 26 6 7 23-26 17Z" fill="var(--art-accent)"/><path d="m244 163 7 46 19-40Z" fill="#fff" opacity=".28"/>
    <path d="m291 292 15 7 15-7v30l-15 8-15-8Z" fill="var(--art-accent)"/><circle cx="306" cy="313" r="4" fill="var(--art-dark)"/><path d="M306 314v7" stroke="var(--art-dark)" stroke-width="3"/>
    <path d="m404 101 4-13 4 13 13 4-13 4-4 13-4-13-13-4Zm-273 160 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="var(--art-accent)"/>
    <circle cx="422" cy="169" r="3" fill="var(--art-light)"/><circle cx="211" cy="35" r="2" fill="var(--art-accent)"/>
  </svg>`,
  M9: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <ellipse cx="301" cy="355" rx="173" ry="22" fill="#071615" opacity=".28"/>
    <g transform="rotate(-9 300 269)">
      <path d="M169 217h265v30c-21 0-21 34 0 34v59H169v-59c21 0 21-34 0-34Z" fill="var(--art-dark)"/>
      <path d="M162 208h265v30c-21 0-21 34 0 34v59H162v-59c21 0 21-34 0-34Z" fill="var(--art-light)"/>
      <path d="M179 224h231v16c-16 13-16 26 0 39v35H179v-35c16-13 16-26 0-39Z" stroke="var(--art-mid)" stroke-width="2" stroke-dasharray="5 5"/>
      <rect x="198" y="244" width="53" height="53" rx="7" fill="var(--art-mid)"/><rect x="267" y="244" width="53" height="53" rx="7" fill="var(--art-mid)"/><rect x="336" y="244" width="53" height="53" rx="7" fill="var(--art-mid)"/>
      <path d="m224 254 5 10 11 2-8 8 1 11-9-5-10 5 2-11-8-8 11-2Zm69 0 5 10 11 2-8 8 1 11-9-5-10 5 2-11-8-8 11-2Z" fill="var(--art-accent)"/>
      <path d="m346 256 34 29m-34-14 17 14m0-29 17 15" stroke="var(--art-light)" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
    </g>
    <path d="M339 86c-5 71-28 115-79 139-43 20-88 7-111-28 43 11 89 3 117-20 29-25 40-59 44-94Z" fill="var(--art-dark)"/>
    <path d="M327 77c-5 71-28 115-79 139-43 20-88 7-111-28 43 11 89 3 117-20 29-25 40-59 44-94Z" fill="var(--art-mid)"/>
    <path d="M327 77c-4 66-22 107-66 131-39 21-79 16-107-2 58 15 104-7 132-53 14-23 22-50 25-77Z" fill="var(--art-accent)"/>
    <path d="M337 83c34 56 39 101 15 137-20 30-54 39-81 27 35-11 60-34 69-63 10-29 3-62-19-92Z" fill="var(--art-light)"/>
    <path d="M337 83c34 56 39 101 15 137-20 30-54 39-81 27 50 4 79-31 76-74-2-29-12-55-26-81Z" fill="var(--art-mid)"/>
    <path d="M338 80c57 30 84 67 78 106-5 33-33 56-66 58 27-22 42-49 39-77-4-30-24-54-57-71Z" fill="var(--art-accent)"/>
    <path d="M338 80c57 30 84 67 78 106-5 33-33 56-66 58 43-2 64-37 53-71-10-29-31-54-71-77Z" fill="var(--art-mid)" opacity=".55"/>
    <path d="m299 78-1-23 25-4 17 28-15 15Z" fill="var(--art-dark)"/><path d="m299 78-1-23 11 5 16 34Z" fill="var(--art-light)"/>
    <path d="M175 194c19 4 40 2 59-6" stroke="#fff" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/>
    <path d="m128 122 4-12 4 12 12 4-12 4-4 12-4-12-12-4Zm316 162 3-10 3 10 10 3-10 3-3 10-3-10-10-3Z" fill="var(--art-accent)"/>
    <circle cx="429" cy="94" r="3" fill="var(--art-light)"/><circle cx="147" cy="327" r="3" fill="var(--art-light)"/>
  </svg>`,
  M10: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <ellipse cx="305" cy="366" rx="159" ry="18" fill="#071615" opacity=".3"/>
    <path d="m151 319 151-69 152 69v20l-152 71-151-71Z" fill="var(--art-dark)"/><path d="m151 319 151-69 152 69-152 71Z" fill="var(--art-mid)"/>
    <path d="m211 265 81-37 82 37v76l-81 38-82-38Z" fill="var(--art-mid)"/><path d="m211 265 81-37 82 37-81 39Z" fill="var(--art-light)"/><path d="m293 304 81-39v76l-81 38Z" fill="var(--art-dark)"/>
    <path d="m211 265 82 39v75m-82-114 81-37 82 37" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>
    <ellipse cx="256" cy="264" rx="6" ry="3" fill="var(--art-dark)"/><ellipse cx="291" cy="249" rx="6" ry="3" fill="var(--art-dark)"/><ellipse cx="293" cy="280" rx="6" ry="3" fill="var(--art-dark)"/><ellipse cx="328" cy="264" rx="6" ry="3" fill="var(--art-dark)"/>
    <ellipse cx="236" cy="300" rx="5" ry="7" transform="rotate(-22 236 300)" fill="var(--art-light)"/><ellipse cx="269" cy="339" rx="5" ry="7" transform="rotate(-22 269 339)" fill="var(--art-light)"/>
    <ellipse cx="317" cy="329" rx="5" ry="7" transform="rotate(22 317 329)" fill="var(--art-accent)"/><ellipse cx="349" cy="314" rx="5" ry="7" transform="rotate(22 349 314)" fill="var(--art-accent)"/>
    <path d="m244 173 70-32 71 32v69l-70 34-71-34Z" fill="var(--art-mid)"/><path d="m244 173 70-32 71 32-70 34Z" fill="var(--art-accent)"/><path d="m315 207 70-34v69l-70 34Z" fill="var(--art-dark)"/>
    <ellipse cx="315" cy="174" rx="7" ry="4" fill="var(--art-dark)"/><ellipse cx="266" cy="208" rx="5" ry="7" transform="rotate(-22 266 208)" fill="var(--art-light)"/><ellipse cx="294" cy="241" rx="5" ry="7" transform="rotate(-22 294 241)" fill="var(--art-light)"/>
    <ellipse cx="336" cy="223" rx="5" ry="7" transform="rotate(22 336 223)" fill="var(--art-light)"/><ellipse cx="351" cy="234" rx="5" ry="7" transform="rotate(22 351 234)" fill="var(--art-light)"/><ellipse cx="366" cy="210" rx="5" ry="7" transform="rotate(22 366 210)" fill="var(--art-light)"/>
    <path d="m234 82 57-26 58 26v58l-57 27-58-27Z" fill="var(--art-mid)"/><path d="m234 82 57-26 58 26-57 28Z" fill="var(--art-light)"/><path d="m292 110 57-28v58l-57 27Z" fill="var(--art-dark)"/>
    <ellipse cx="275" cy="81" rx="5" ry="3" fill="var(--art-dark)"/><ellipse cx="306" cy="83" rx="5" ry="3" fill="var(--art-dark)"/>
    <ellipse cx="252" cy="111" rx="4" ry="6" transform="rotate(-22 252 111)" fill="var(--art-light)"/><ellipse cx="274" cy="136" rx="4" ry="6" transform="rotate(-22 274 136)" fill="var(--art-light)"/>
    <ellipse cx="311" cy="128" rx="4" ry="6" transform="rotate(22 311 128)" fill="var(--art-accent)"/><ellipse cx="332" cy="116" rx="4" ry="6" transform="rotate(22 332 116)" fill="var(--art-accent)"/>
    <path d="m407 151 4-13 4 13 13 4-13 4-4 13-4-13-13-4Zm-231 61 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="var(--art-accent)"/><circle cx="202" cy="109" r="3" fill="var(--art-light)"/>
  </svg>`,
  AI: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <ellipse cx="301" cy="355" rx="196" ry="24" fill="#071615" opacity=".28"/>
    <path d="M107 250c0-55 86-100 193-100s193 45 193 100v30c0 55-86 100-193 100s-193-45-193-100Z" fill="var(--art-dark)"/>
    <ellipse cx="300" cy="250" rx="193" ry="100" fill="var(--art-mid)"/><ellipse cx="300" cy="250" rx="172" ry="83" fill="var(--art-dark)"/>
    <ellipse cx="300" cy="250" rx="154" ry="69" stroke="var(--art-light)" stroke-opacity=".35"/>
    <path d="m192 251 62 27 39-68-65-28Z" stroke="var(--art-light)" stroke-opacity=".35"/><path d="m305 278 63-27-36-69-65 28Z" stroke="var(--art-light)" stroke-opacity=".35"/>
    <g transform="rotate(-15 272 170)"><rect x="218" y="79" width="105" height="169" rx="10" fill="var(--art-mid)"/><rect x="213" y="74" width="105" height="169" rx="10" fill="var(--art-light)"/><rect x="222" y="84" width="87" height="149" rx="5" stroke="var(--art-mid)" stroke-opacity=".65"/><path d="m265 119 24 40-24 40-24-40Z" fill="var(--art-dark)"/><path d="m233 95 5 8-5 8-5-8Zm65 111 5 8-5 8-5-8Z" fill="var(--art-dark)"/></g>
    <g transform="rotate(12 343 179)"><rect x="293" y="95" width="105" height="169" rx="10" fill="var(--art-mid)"/><rect x="288" y="90" width="105" height="169" rx="10" fill="var(--art-accent)"/><rect x="297" y="100" width="87" height="149" rx="5" stroke="var(--art-mid)" stroke-opacity=".5"/><path d="M340 149c-17-22-37 0-24 15l24 24 24-24c13-15-7-37-24-15Z" fill="var(--art-mid)"/><path d="M307 109c-5-7-12 0-8 5l8 8 8-8c4-5-3-12-8-5Z" fill="var(--art-mid)"/></g>
    <path d="M171 305v-23h62v23c0 9-14 16-31 16s-31-7-31-16Z" fill="var(--art-mid)"/><ellipse cx="202" cy="282" rx="31" ry="16" fill="var(--art-light)"/><ellipse cx="202" cy="282" rx="19" ry="9" stroke="var(--art-dark)" stroke-width="2"/>
    <path d="M179 284v-19h62v19c0 9-14 16-31 16s-31-7-31-16Z" fill="var(--art-mid)"/><ellipse cx="210" cy="265" rx="31" ry="16" fill="var(--art-accent)"/><ellipse cx="210" cy="265" rx="19" ry="9" stroke="var(--art-mid)" stroke-width="2"/>
    <ellipse cx="389" cy="301" rx="32" ry="16" fill="var(--art-light)"/><ellipse cx="389" cy="301" rx="20" ry="9" stroke="var(--art-mid)" stroke-width="2"/>
    <path d="m434 145 4-12 4 12 12 4-12 4-4 12-4-12-12-4Zm-269-44 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="var(--art-accent)"/>
    <circle cx="454" cy="220" r="3" fill="var(--art-light)"/><circle cx="166" cy="203" r="2" fill="var(--art-light)"/>
  </svg>`,
  SI8: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <defs><linearGradient id="si8-screen" x1="170" y1="85" x2="380" y2="299" gradientUnits="userSpaceOnUse"><stop stop-color="var(--art-mid)"/><stop offset="1" stop-color="var(--art-dark)"/></linearGradient></defs>
    <ellipse cx="301" cy="357" rx="184" ry="22" fill="#071615" opacity=".28"/>
    <path d="m155 313 153-70 159 70v18l-159 74-153-74Z" fill="var(--art-dark)"/><path d="m155 313 153-70 159 70-159 74Z" fill="var(--art-mid)"/>
    <path d="M158 121c0-8 5-15 13-19l202-92 19 9c5 2 8 8 8 15v202c0 7-5 15-13 19l-203 92-19-9c-4-2-7-8-7-15Z" fill="var(--art-dark)"/>
    <path d="M171 127c0-8 5-15 13-19L387 16c7-3 13 1 13 10v209c0 8-5 16-13 19l-203 93c-7 3-13-1-13-10Z" fill="var(--art-mid)"/>
    <path d="m186 130 199-91v198l-199 91Z" fill="url(#si8-screen)"/>
    <path d="m200 170 171-78m-171 124 171-78m-171 124 171-78M230 125v171m47-192v171m47-192v171" stroke="var(--art-light)" stroke-opacity=".12"/>
    <path d="m204 268 37-59 29 8 35-73 30 8 35-76" stroke="var(--art-accent)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="m354 82 16-6-1 22" stroke="var(--art-accent)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="m204 268 37-59 29 8 35-73 30 8 35-76v153l-166 76Z" fill="var(--art-accent)" opacity=".08"/>
    <path d="m255 335 39-18v-49l-39 18Z" fill="var(--art-light)"/><path d="m294 317 23 10v-49l-23-10Z" fill="var(--art-dark)"/><path d="m255 286 39-18 23 10-39 18Z" fill="var(--art-accent)"/>
    <path d="m322 338 39-18v-88l-39 18Z" fill="var(--art-light)"/><path d="m361 320 23 10v-88l-23-10Z" fill="var(--art-dark)"/><path d="m322 250 39-18 23 10-39 18Z" fill="var(--art-accent)"/>
    <path d="m388 342 39-18V204l-39 18Z" fill="var(--art-mid)"/><path d="m427 324 23 10V214l-23-10Z" fill="var(--art-dark)"/><path d="m388 222 39-18 23 10-39 18Z" fill="var(--art-light)"/>
    <path d="m437 96 4-13 4 13 13 4-13 4-4 13-4-13-13-4Zm-312 121 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="var(--art-accent)"/>
    <circle cx="139" cy="89" r="3" fill="var(--art-light)"/><circle cx="464" cy="275" r="3" fill="var(--art-light)"/>
  </svg>`,
  TEST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none">
    <defs><linearGradient id="test-glass" x1="215" y1="120" x2="369" y2="305" gradientUnits="userSpaceOnUse"><stop stop-color="var(--art-light)" stop-opacity=".45"/><stop offset="1" stop-color="var(--art-mid)" stop-opacity=".12"/></linearGradient></defs>
    <ellipse cx="301" cy="355" rx="170" ry="22" fill="#071615" opacity=".28"/>
    <path d="m148 304 153-70 155 70v25l-155 73-153-73Z" fill="var(--art-dark)"/><path d="m148 304 153-70 155 70-155 73Z" fill="var(--art-mid)"/>
    <ellipse cx="302" cy="300" rx="119" ry="52" stroke="var(--art-light)" stroke-opacity=".25"/>
    <path d="m211 162 90-42 92 42v117l-91 43-91-43Z" fill="url(#test-glass)" stroke="var(--art-light)" stroke-opacity=".7" stroke-width="2"/>
    <path d="m211 162 91 43 91-43m-91 43v117" stroke="var(--art-light)" stroke-opacity=".7" stroke-width="2"/>
    <path d="m211 279 90-42 92 42m-92-159v117" stroke="var(--art-light)" stroke-opacity=".22" stroke-width="2" stroke-dasharray="5 5"/>
    <path d="m223 176 67 31v94l-67-31Z" fill="var(--art-light)" opacity=".08"/>
    <circle cx="302" cy="145" r="49" fill="var(--art-mid)"/><circle cx="294" cy="137" r="49" fill="var(--art-light)"/>
    <path d="M269 115c7-10 18-15 30-14" stroke="#fff" stroke-opacity=".4" stroke-width="6" stroke-linecap="round"/>
    <path d="M302 89a49 49 0 0 1 39 69 49 49 0 0 1-69 20c33 8 59-24 30-89Z" fill="var(--art-accent)" opacity=".5"/>
    <ellipse cx="294" cy="137" rx="75" ry="22" transform="rotate(-24 294 137)" stroke="var(--art-accent)" stroke-width="3"/>
    <path d="m393 157 24-47 24 47-24 14Z" fill="var(--art-accent)"/><path d="m417 110 24 47-24 14Z" fill="var(--art-mid)"/>
    <path d="m139 237 27-13 28 13v29l-27 13-28-13Z" fill="var(--art-mid)"/><path d="m139 237 27-13 28 13-27 13Z" fill="var(--art-light)"/><path d="m167 250 27-13v29l-27 13Z" fill="var(--art-dark)"/>
    <path d="M154 171c-11-34 7-67 42-88m-49 85 11 10 9-13M393 291c20 5 39 2 53-9m-11 0 14-3-3 14" stroke="var(--art-light)" stroke-opacity=".45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="m414 229 4-12 4 12 12 4-12 4-4 12-4-12-12-4Zm-201-147 3-10 3 10 10 3-10 3-3 10-3-10-10-3Z" fill="var(--art-accent)"/>
    <circle cx="147" cy="118" r="3" fill="var(--art-light)"/><circle cx="370" cy="79" r="3" fill="var(--art-light)"/><circle cx="459" cy="203" r="2" fill="var(--art-accent)"/>
  </svg>`
});

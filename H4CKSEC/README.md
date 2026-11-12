# H4CKSEC CCD

**Official Cybersecurity Knowledge Base of CYBER CLUB DIT**

H4CKSEC CCD is the public technical documentation platform of **CYBER CLUB DIT (CCD)**.  
Dark Neon Dashboard UI with Soft Glow Cards and Purple Accents.  
Documentation arrangement inspired by professional technical knowledge bases while using the official CCD visual identity.

> Documentation platform only.  
> Not an LMS, CTF platform, lab environment, or course enrollment system.

---

## Branding

| Item | Value |
|------|--------|
| Platform name | **H4CKSEC CCD** |
| Organization | **CYBER CLUB DIT** |
| Official logo | `assets/images/ccd-logo.jpeg` (use as-is, do not recolor or redraw) |
| Favicon | Same official logo |

The official CYBER CLUB DIT logo appears in:

- Homepage hero (prominent identity)
- Header / navigation
- Sidebar
- Footer
- Browser favicon

---

## Design System

| Token | Value |
|-------|-------|
| Background | `#08080D` |
| Cards / Surfaces | `#10121C` |
| Primary Purple | `#8B3DFF` |
| Secondary Purple | `#B17BFF` |
| Text | High-contrast white / muted gray |
| Borders | Low-opacity purple |
| Radius | 16–28px soft rounded cards |
| Effects | Soft shadows + restrained purple glow |

Typography: Inter (UI) + JetBrains Mono (code).

---

## Project Structure

```
H4CKSEC/
├── index.html
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   └── images/
│       └── ccd-logo.jpeg          # Official CYBER CLUB DIT logo
├── modules/
│   ├── foundations/
│   │   ├── getting-started/
│   │   ├── networking/
│   │   │   ├── index.html
│   │   │   └── topics/
│   │   │       ├── osi-model/     # Full deep article + Mermaid
│   │   │       ├── tcp-ip/
│   │   │       ├── ipv4/
│   │   │       ├── subnetting/
│   │   │       ├── dns/
│   │   │       ├── dhcp/
│   │   │       └── ...
│   │   ├── linux/
│   │   └── ...
│   ├── offensive/
│   ├── defensive/
│   └── references/
└── README.md
```

---

## Features

- Nested expandable sidebar navigation
- Global documentation search (⌘K / Ctrl+K)
- Right-side Table of Contents with scroll spy
- Premium terminal-style code blocks + copy buttons
- Info / Tip / Warning / Security callouts
- Mermaid diagrams (OSI example included)
- Responsive: Desktop → Tablet → Mobile
- Official CCD logo and H4CKSEC CCD branding throughout

---

## Running Locally

```bash
cd H4CKSEC
python -m http.server 8080
# open http://localhost:8080
```

No build step required.

---

## Expanding Content

1. Copy an existing deep article (e.g. `modules/foundations/networking/topics/osi-model/index.html`).
2. Place it under the correct module folder.
3. Keep the official logo paths and H4CKSEC CCD branding.
4. Follow the same content depth: definition, how it works, commands, security implications, related links.

---

## Git Commands

```bash
cd H4CKSEC
git init
git add .
git commit -m "H4CKSEC CCD — Official CYBER CLUB DIT knowledge base"
git branch -M main
git remote add origin https://github.com/itsdrexonkelvix905/hacksec_ccd.git
git push -u origin main
```

---

## Scope

H4CKSEC CCD is a **knowledge base** of CYBER CLUB DIT.  
Do not add labs, CTF challenges, flag submission, quizzes, enrollment, or student progress tracking.

All techniques are presented in an authorized, educational context.

---

## License

Content and code for educational purposes under CYBER CLUB DIT.  
Respect applicable laws and only test systems you own or have explicit authorization to assess.

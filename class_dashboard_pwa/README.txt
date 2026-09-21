# Class Dashboard PWA

This project is based on the uploaded B.Tech CSE 5th Semester timetable.

## Files
- index.html
- style.css
- app.js
- manifest.json
- sw.js
- icons/

## Run on Android with Termux

1. Install Termux from F-Droid.
2. Copy this whole `class_dashboard_pwa` folder to your phone.
3. In Termux:
   `termux-setup-storage`
4. Go to the project folder, for example:
   `cd ~/storage/shared/class_dashboard_pwa`
5. Start the local server:
   `python -m http.server 8000`
6. Open Chrome:
   `http://localhost:8000`

## Install as a home-screen app

For a proper PWA install, serve it over HTTPS (for example with GitHub Pages).
Open the HTTPS site in Chrome and choose:
Menu -> Add to Home screen / Install app.

## Lab group
Use the selector at the top to choose A1+A2, A3+A4, A1, A2, A3, or A4.
The dashboard then filters group-specific labs.

## Timetable source
The schedule was transcribed from the uploaded "Time Table 3 Aug 2026.pdf".

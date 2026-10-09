



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const BLACK_OVERLAY_OPACITY = process.env.BLACK_OVERLAY_OPACITY || '100';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF';
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // ⚽ SCOREBOARD TEAM DATABASE (WITH UEFA NATIONS LEAGUE)
// // =========================================================================================
// // const SCOREBOARD_MATCHES = process.env.SCOREBOARD_MATCHES || 'OFF';

// // const TEAM_DB = {
// //     // --- UEFA NATIONS LEAGUE A GROUPS ---
// //     1: { name: 'France', flag: 'https://flagcdn.com/w40/fr.png' }, 2: { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
// //     3: { name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' }, 4: { name: 'Türkiye', flag: 'https://flagcdn.com/w40/tr.png' },
// //     5: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' }, 6: { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' },
// //     7: { name: 'Serbia', flag: 'https://flagcdn.com/w40/rs.png' }, 8: { name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
// //     9: { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' }, 10: { name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png' },
// //     11: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' }, 12: { name: 'Czechia', flag: 'https://flagcdn.com/w40/cz.png' },
// //     13: { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' }, 14: { name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' },
// //     15: { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' }, 16: { name: 'Wales', flag: 'https://flagcdn.com/w40/gb-wls.png' },

// //     // --- OTHER TOP COUNTRIES ---
// //     21: { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' }, 22: { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
// //     23: { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png' }, 24: { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
// //     25: { name: 'USA', flag: 'https://flagcdn.com/w40/us.png' }, 26: { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
// //     27: { name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' }, 28: { name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
// //     29: { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' }, 30: { name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png' },

// //     // --- CLUBS (Original Wikimedia SVGs - No Size Errors) ---
// //     51: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' }, 
// //     52: { name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
// //     53: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
// //     54: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
// //     55: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
// //     56: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
// //     57: { name: 'Chelsea', flag: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
// //     58: { name: 'Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' }, 
// //     59: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
// //     60: { name: 'Juventus', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg' },
// //     61: { name: 'Al Nassr', flag: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Al-Nassr.svg' }
// // };


// // =========================================================================================
// // ⚽ SCOREBOARD TEAM DATABASE (WITH ALL UEFA LEAGUES A, B, C, D)
// // =========================================================================================
// const SCOREBOARD_LEAGUE = process.env.SCOREBOARD_LEAGUE || 'OFF';
// const SCOREBOARD_MATCHES = process.env.SCOREBOARD_MATCHES || 'OFF';

// const TEAM_DB = {
//     // --- UEFA LEAGUE A ---
//     // Group A1
//     1: { name: 'France', flag: 'https://flagcdn.com/w40/fr.png' }, 2: { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' }, 3: { name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' }, 4: { name: 'Türkiye', flag: 'https://flagcdn.com/w40/tr.png' },
//     // Group A2
//     5: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' }, 6: { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' }, 7: { name: 'Serbia', flag: 'https://flagcdn.com/w40/rs.png' }, 8: { name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
//     // Group A3
//     9: { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' }, 10: { name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png' }, 11: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' }, 12: { name: 'Czechia', flag: 'https://flagcdn.com/w40/cz.png' },
//     // Group A4
//     13: { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' }, 14: { name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' }, 15: { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' }, 16: { name: 'Wales', flag: 'https://flagcdn.com/w40/gb-wls.png' },

//     // --- UEFA LEAGUE B ---
//     // Group B1
//     17: { name: 'Scotland', flag: 'https://flagcdn.com/w40/gb-sct.png' }, 18: { name: 'Switzerland', flag: 'https://flagcdn.com/w40/ch.png' }, 19: { name: 'Slovenia', flag: 'https://flagcdn.com/w40/si.png' }, 20: { name: 'North Macedonia', flag: 'https://flagcdn.com/w40/mk.png' },
//     // Group B2
//     21: { name: 'Hungary', flag: 'https://flagcdn.com/w40/hu.png' }, 22: { name: 'Ukraine', flag: 'https://flagcdn.com/w40/ua.png' }, 23: { name: 'Georgia', flag: 'https://flagcdn.com/w40/ge.png' }, 24: { name: 'Northern Ireland', flag: 'https://flagcdn.com/w40/gb-nir.png' },
//     // Group B3
//     25: { name: 'Israel', flag: 'https://flagcdn.com/w40/il.png' }, 26: { name: 'Austria', flag: 'https://flagcdn.com/w40/at.png' }, 27: { name: 'Republic of Ireland', flag: 'https://flagcdn.com/w40/ie.png' }, 28: { name: 'Kosovo', flag: 'https://flagcdn.com/w40/xk.png' },
//     // Group B4
//     29: { name: 'Poland', flag: 'https://flagcdn.com/w40/pl.png' }, 30: { name: 'Bosnia and Herzegovina', flag: 'https://flagcdn.com/w40/ba.png' }, 31: { name: 'Romania', flag: 'https://flagcdn.com/w40/ro.png' }, 32: { name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png' },

//     // --- UEFA LEAGUE C ---
//     // Group C1
//     33: { name: 'Albania', flag: 'https://flagcdn.com/w40/al.png' }, 34: { name: 'Finland', flag: 'https://flagcdn.com/w40/fi.png' }, 35: { name: 'Belarus', flag: 'https://flagcdn.com/w40/by.png' }, 36: { name: 'San Marino', flag: 'https://flagcdn.com/w40/sm.png' },
//     // Group C2
//     37: { name: 'Montenegro', flag: 'https://flagcdn.com/w40/me.png' }, 38: { name: 'Armenia', flag: 'https://flagcdn.com/w40/am.png' }, 39: { name: 'Cyprus', flag: 'https://flagcdn.com/w40/cy.png' }, 40: { name: 'Latvia', flag: 'https://flagcdn.com/w40/lv.png' },
//     // Group C3
//     41: { name: 'Kazakhstan', flag: 'https://flagcdn.com/w40/kz.png' }, 42: { name: 'Slovakia', flag: 'https://flagcdn.com/w40/sk.png' }, 43: { name: 'Faroe Islands', flag: 'https://flagcdn.com/w40/fo.png' }, 44: { name: 'Moldova', flag: 'https://flagcdn.com/w40/md.png' },
//     // Group C4
//     45: { name: 'Iceland', flag: 'https://flagcdn.com/w40/is.png' }, 46: { name: 'Bulgaria', flag: 'https://flagcdn.com/w40/bg.png' }, 47: { name: 'Estonia', flag: 'https://flagcdn.com/w40/ee.png' }, 48: { name: 'Luxembourg', flag: 'https://flagcdn.com/w40/lu.png' },

//     // --- UEFA LEAGUE D ---
//     // Group D1
//     49: { name: 'Malta', flag: 'https://flagcdn.com/w40/mt.png' }, 50: { name: 'Gibraltar', flag: 'https://flagcdn.com/w40/gi.png' }, 51: { name: 'Andorra', flag: 'https://flagcdn.com/w40/ad.png' },
//     // Group D2
//     52: { name: 'Lithuania', flag: 'https://flagcdn.com/w40/lt.png' }, 53: { name: 'Azerbaijan', flag: 'https://flagcdn.com/w40/az.png' }, 54: { name: 'Liechtenstein', flag: 'https://flagcdn.com/w40/li.png' },

//     // --- OTHER TOP COUNTRIES ---
//     61: { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' }, 62: { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
//     63: { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png' }, 64: { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
//     65: { name: 'USA', flag: 'https://flagcdn.com/w40/us.png' }, 66: { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
//     67: { name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' }, 68: { name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
//     69: { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' }, 70: { name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png' },

//     // --- CLUBS ---
//     81: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' }, 
//     82: { name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
//     83: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
//     84: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
//     85: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
//     86: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
//     87: { name: 'Chelsea', flag: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
//     88: { name: 'Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' }, 
//     89: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
//     90: { name: 'Juventus', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg' },
//     91: { name: 'Al Nassr', flag: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Al-Nassr.svg' },




// // --- PREMIER LEAGUE ---
//     101: { name: 'AFC Bournemouth', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
//     102: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
//     103: { name: 'Aston Villa', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
//     114: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' }, 
//     115: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
//     116: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
//     120: { name: 'Tottenham', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' },

//     // --- LALIGA ---
//     122: { name: 'Atletico Madrid', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
//     126: { name: 'FC Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
//     135: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },

//     // --- BUNDESLIGA ---
//     144: { name: 'Bayer Leverkusen', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
//     145: { name: 'Borussia Dortmund', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
//     149: { name: 'FC Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' },

//     // --- LIGUE 1 ---
//     168: { name: 'Marseille', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
//     171: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },

//     // --- CRICKET (OFFICIAL COUNTRY FLAGS) ---
//     201: { name: 'Afghanistan', flag: 'https://flagcdn.com/w40/af.png' }, 202: { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
//     203: { name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png' }, 204: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' },
//     205: { name: 'India', flag: 'https://flagcdn.com/w40/in.png' }, 206: { name: 'Ireland', flag: 'https://flagcdn.com/w40/ie.png' },
//     207: { name: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png' }, 208: { name: 'Pakistan', flag: 'https://flagcdn.com/w40/pk.png' },
//     209: { name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png' }, 210: { name: 'Sri Lanka', flag: 'https://flagcdn.com/w40/lk.png' },
//     211: { name: 'West Indies', flag: 'https://flagcdn.com/w40/jm.png' }, 212: { name: 'Zimbabwe', flag: 'https://flagcdn.com/w40/zw.png' }
//     // (Note: Aap baqi teams ko bhi isi format mein ID ke sath add kar sakte hain)
// };


// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; 
//     const hMatch = str.match(/(\d+)\s*h/i); 
//     const mMatch = str.match(/(\d+)\s*m/i);
//     const digitOnlyMatch = str.trim().match(/^(\d+)$/); // Agar user sirf '4' likhe

//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     else if (!hMatch && !mMatch && digitOnlyMatch) {
//         ms += parseInt(digitOnlyMatch[1]) * 60 * 60 * 1000; // Automatically consider as hours
//     }
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcesses = [];

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode, opacityVal) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let opDecimal = parseInt(opacityVal) / 100;
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important; opacity: ${opDecimal} !important;`;
                        
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY, BLACK_OVERLAY_OPACITY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
// }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function injectScoreboardOverlay(page) {
//     if (!page || SCOREBOARD_MATCHES === 'OFF' || SCOREBOARD_MATCHES.trim() === '') return;
//     try {
//         await page.evaluate((matchesStr, teamDB) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-scoreboard-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-scoreboard-overlay';
                        
//                         // Bottom 30% Fixed Container
//                         container.style.cssText = `position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100vw !important; height: 35vh !important; pointer-events: none !important; z-index: 2147483648 !important; background: rgba(0, 0, 0, 0.75) !important; padding: 1.5vh 2vw !important; box-sizing: border-box !important; border-top: 2px solid #e50914 !important; display: flex !important; flex-direction: column !important; flex-wrap: wrap !important; align-content: flex-start !important; gap: 0.5vh 3vw !important;`;

//                         // Pura text pehle '|' se todain taake Leagues alag ho jayein
//                         let leagueGroups = matchesStr.split('|').map(g => g.trim()).filter(g => g.length > 0);

//                         leagueGroups.forEach((group) => {
//                             // Har group ko '=' se todain taake League Name aur Matches alag hon
//                             let parts = group.split('=');
//                             let leagueName = parts.length > 1 ? parts[0].trim() : '';
//                             let matchData = parts.length > 1 ? parts[1].trim() : parts[0].trim();

//                             // 🏆 Agar League ka naam hai, toh pehle uska title render karein
//                             if (leagueName) {
//                                 const headerRow = document.createElement('div');
//                                 headerRow.style.cssText = `width: max-content; color: #ffcc00; font-size: 3vmin; font-weight: 900; font-family: 'Segoe UI', Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px; margin-top: 1vh; margin-bottom: 0.5vh; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); border-bottom: 1px solid rgba(255, 204, 0, 0.5); padding-bottom: 0.2vh;`;
//                                 headerRow.innerText = leagueName;
//                                 container.appendChild(headerRow);
//                             }

//                             // Ab Matches ko '&' se todain aur render karein
//                             let matches = matchData.split('&').map(m => m.trim()).filter(m => m.length > 0);
                            
//                             matches.forEach((matchStr) => {
//                                 let teamParts = matchStr.split(',').map(p => p.trim());
//                                 let t1Id = teamParts[0]; 
//                                 let t2Id = teamParts[1];

//                                 let defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
//                                 let t1 = teamDB[t1Id] || { name: 'Team ' + t1Id, flag: defaultImg };
//                                 let t2 = teamDB[t2Id] || { name: 'Team ' + t2Id, flag: defaultImg };

//                                 const row = document.createElement('div');
//                                 row.style.cssText = `display: flex; justify-content: space-between; align-items: center; background: rgba(230, 235, 230, 0.95); border-radius: 4px; padding: 0.5vh 1.5vw; box-shadow: 0 2px 4px rgba(0,0,0,0.5); width: max-content; min-width: 32vw; max-height: 4vh; overflow: hidden; margin-bottom: 0.5vh;`;

//                                 row.innerHTML = `
//                                     <div style="display: flex; align-items: center; justify-content: flex-end; flex: 1; font-size: 2.5vmin; font-weight: 800; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; white-space: nowrap;">
//                                         ${t1.name} 
//                                         <img src="${t1.flag}" style="height: 2.5vmin; width: auto; max-width: 3.5vmin; object-fit: contain; margin-left: 1vw;">
//                                     </div>
//                                     <div style="padding: 0 1.5vw; font-size: 3vmin; font-weight: 900; color: #333; font-family: 'Courier New', monospace;">
//                                         -
//                                     </div>
//                                     <div style="display: flex; align-items: center; justify-content: flex-start; flex: 1; font-size: 2.5vmin; font-weight: 800; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; white-space: nowrap;">
//                                         <img src="${t2.flag}" style="height: 2.5vmin; width: auto; max-width: 3.5vmin; object-fit: contain; margin-right: 1vw;"> 
//                                         ${t2.name}
//                                     </div>
//                                 `;
//                                 container.appendChild(row);
//                             });
//                         });

//                         let target = document.body || document.documentElement;
//                         if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 2000);
//         }, SCOREBOARD_MATCHES, TEAM_DB);
//     } catch(e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
//     await injectScoreboardOverlay(page); // SCOREBOARD ACTIVATED
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { // Max 20 seconds
//         try {
//             const framePromises = p.frames().map(async (frame) => {
//                 if (frame.isDetached()) return false;
//                 try {
//                     return await frame.evaluate(() => {
//                         const v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && !v.paused && v.currentTime > 0);
//                     });
//                 } catch(err) { return false; }
//             });
            
//             const results = await Promise.all(framePromises);
//             const isReady = results.some(r => r === true);
            
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; // 3 baar tasalli karega
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
//         const framePromises = p.frames().map(async (frame) => {
//             if (frame.isDetached()) return null;
//             try {
//                 return await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("stream error") || bodyText.includes("stream unavailable") || bodyText.includes("404") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         // Video dhundne ki ninja technique
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         for (let v of videos) {
//                             if (v.clientWidth > 10 || !v.paused) {
//                                 let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
//                                 return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
//                             }
//                         }
//                         return null;
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
//                 ]);
//             } catch (err) { return null; }
//         });

//         const results = await Promise.all(framePromises);
        
//         // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
//         for (let res of results) {
//             if (res && res.status === 'CRITICAL_ERROR') return res;
//             if (res && res.status === 'HEALTHY') return res;
//         }
        
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }
// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; 
//     let lastDecodedFrames = -1; 
//     let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 5) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
//             if (isTimeStuck) {
//                 // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
//                 if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenTimestamp = Date.now();
                
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             try { 
//                 await page.goto('about:blank'); 
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const bgAudiosInput = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100';
//         const audioConfigs = bgAudiosInput.split(',').map(a => a.trim()).filter(a => a.length > 0);
        
//         for (let config of audioConfigs) {
//             let parts = config.split('::');
//             let audioFile = parts[0].trim();
//             let rawVolume = parts.length > 1 ? parts[1].trim() : '100';
            
//             let tempPath = path.join(process.cwd(), audioFile);
//             if (fs.existsSync(tempPath)) {
//                 let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//                 let ffplayVolume = volNumber / 100;
//                 let aProc = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, tempPath]);
//                 audioProcesses.push(aProc);
//                 console.log(`[🎵] Playing Background Audio: ${audioFile} at ${volNumber}% volume`);
//             } else {
//                 console.log(`[❌] Background Audio NOT found: ${audioFile}`);
//             }
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[🧹] Starting cleanup process...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { 
//         try { 
//             // Anti-Hang: Browser close ke liye max 5 seconds wait karega
//             await Promise.race([browser.close(), new Promise(r => setTimeout(r, 5000))]); 
//         } catch(e) { } 
//         browser = null; 
//     }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcesses && audioProcesses.length > 0) { audioProcesses.forEach(ap => { try { ap.kill('SIGKILL'); } catch(e) {} }); audioProcesses = []; }
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
//     console.log('[✅] Cleanup finished.');
// }

// process.on('SIGINT', async () => { 
//     setTimeout(() => process.exit(0), 10000).unref(); // Failsafe
//     await cleanup(); process.exit(0); 
// });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { 
//     console.log(`\n[⏰] SYSTEM SCHEDULED TO STOP IN EXACTLY: ${exactDurationMs / 60000} Minutes.`);
//     setTimeout(async () => { 
//         console.log('\n[⏰] EXACT DURATION TIME UP! Shutting down system...');
//         // Emergency Failsafe: Agar cleanup atak gaya to 15 second baad force exit karega!
//         setTimeout(() => { console.log('[🚨] Force exiting due to cleanup timeout!'); process.exit(0); }, 15000).unref();
        
//         await cleanup(); 
//         process.exit(0); 
//     }, exactDurationMs); 
// } 
// else {
//     // 🔄 SMART LOOP / HANDOFF SYSTEM OR GRACEFUL EXIT
//     setTimeout(() => {
//         const continuousLoopStatus = process.env.CONTINUOUS_LOOP || 'ON';
        
//         if (continuousLoopStatus === 'OFF') {
//             console.log("\n[🛑] CONTINUOUS LOOP IS OFF: Reached maximum time limit (5h 50m). Shutting down system without starting new runner...");
//             setTimeout(() => { console.log('[🚨] Force exiting due to cleanup timeout!'); process.exit(0); }, 15000).unref();
//             cleanup().then(() => process.exit(0));
//         } else {
//             try {
//                 const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//                 const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//                 const server = process.env.SERVER_SELECTION || 'None';
//                 const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//                 const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//                 const blackOverlayOpacity = process.env.BLACK_OVERLAY_OPACITY || '100';
//                 const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON';
//                 const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//                 const bgAudiosInputStatus = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100'; 
//                 const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//                 const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//                 const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//                 const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//                 const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//                 const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//                 const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
//                 const scoreboardMatchesStatus = process.env.SCOREBOARD_MATCHES || 'OFF';
                
//                 console.log("\n[⏳] SMART HANDOFF: Triggering new GitHub Workflow in background...");
//                 // Note: -f continuous_loop is now added to the command so the next run remembers it
//                 const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f black_overlay_opacity="${blackOverlayOpacity}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audios="${bgAudiosInputStatus}" -f scoreboard_matches="${scoreboardMatchesStatus}" -f custom_duration="None" -f continuous_loop="${continuousLoopStatus}"`;
//                 execSync(cmd, { stdio: 'inherit' });
                
//                 // 8 Minutes (480000ms) overlap time for new runner setup and OBS takeover
//                 setTimeout(async () => { 
//                     console.log("[🔄] Handoff Time! Stopping old stream to let the new runner take over instantly.");
//                     // Emergency Failsafe for handoff as well
//                     setTimeout(() => { console.log('[🚨] Force exiting handoff due to cleanup timeout!'); process.exit(0); }, 15000).unref();
                    
//                     await cleanup(); 
//                     process.exit(0); 
//                 }, 480000); 
//             } catch (err) { }
//         }
//     }, 21000000); // Trigger at 5 hours 50 minutes (21000000ms)
// }

// mainLoop();









// hahahhahha iss mey  more teams and league add akr deya aab top waley code me yeh workflow stop nahey u raaha hai isko teek karty hai 


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync } = require('child_process');
const { OBSWebSocket } = require('obs-websocket-js'); 

// =========================================================================================
// 🛡️ GLOBAL CRASH PREVENTION SHIELD
// =========================================================================================
process.on('uncaughtException', (err) => {
    console.error('\n========================================');
    console.error('[💥] UNCAUGHT EXCEPTION');
    console.error(err);
    console.error('========================================\n');
});

process.on('unhandledRejection', (reason) => {
    console.error('\n========================================');
    console.error('[💥] UNHANDLED REJECTION');
    console.error(reason);
    console.error('========================================\n');
});

const obs = new OBSWebSocket(); 

// =========================================================================================
// ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// =========================================================================================
const FORCE_REFRESH_MINUTES = 9; 
const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// =========================================================================================
// 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// =========================================================================================
const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
const BLACK_OVERLAY_OPACITY = process.env.BLACK_OVERLAY_OPACITY || '100';
const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF';
const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
let MATCH_ICON = '⚽';
if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

const YT_KEY = process.env.YOUTUBE_KEY || '';
const FB_KEY = process.env.FACEBOOK_KEY || '';
const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// =========================================================================================
// ⚽ SCOREBOARD TEAM DATABASE (WITH UEFA NATIONS LEAGUE)
// =========================================================================================
// const SCOREBOARD_MATCHES = process.env.SCOREBOARD_MATCHES || 'OFF';

// const TEAM_DB = {
//     // --- UEFA NATIONS LEAGUE A GROUPS ---
//     1: { name: 'France', flag: 'https://flagcdn.com/w40/fr.png' }, 2: { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
//     3: { name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' }, 4: { name: 'Türkiye', flag: 'https://flagcdn.com/w40/tr.png' },
//     5: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' }, 6: { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' },
//     7: { name: 'Serbia', flag: 'https://flagcdn.com/w40/rs.png' }, 8: { name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
//     9: { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' }, 10: { name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png' },
//     11: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' }, 12: { name: 'Czechia', flag: 'https://flagcdn.com/w40/cz.png' },
//     13: { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' }, 14: { name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' },
//     15: { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' }, 16: { name: 'Wales', flag: 'https://flagcdn.com/w40/gb-wls.png' },

//     // --- OTHER TOP COUNTRIES ---
//     21: { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' }, 22: { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
//     23: { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png' }, 24: { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
//     25: { name: 'USA', flag: 'https://flagcdn.com/w40/us.png' }, 26: { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
//     27: { name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' }, 28: { name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
//     29: { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' }, 30: { name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png' },

//     // --- CLUBS (Original Wikimedia SVGs - No Size Errors) ---
//     51: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' }, 
//     52: { name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
//     53: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
//     54: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
//     55: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
//     56: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
//     57: { name: 'Chelsea', flag: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
//     58: { name: 'Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' }, 
//     59: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
//     60: { name: 'Juventus', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg' },
//     61: { name: 'Al Nassr', flag: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Al-Nassr.svg' }
// };


// =========================================================================================
// ⚽ SCOREBOARD TEAM DATABASE (WITH ALL UEFA LEAGUES A, B, C, D)
// =========================================================================================
const SCOREBOARD_LEAGUE = process.env.SCOREBOARD_LEAGUE || 'OFF';
const SCOREBOARD_MATCHES = process.env.SCOREBOARD_MATCHES || 'OFF';

const TEAM_DB = {
    // --- UEFA LEAGUE A ---
    // Group A1
    1: { name: 'France', flag: 'https://flagcdn.com/w40/fr.png' }, 2: { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' }, 3: { name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' }, 4: { name: 'Türkiye', flag: 'https://flagcdn.com/w40/tr.png' },
    // Group A2
    5: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' }, 6: { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' }, 7: { name: 'Serbia', flag: 'https://flagcdn.com/w40/rs.png' }, 8: { name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
    // Group A3
    9: { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' }, 10: { name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png' }, 11: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' }, 12: { name: 'Czechia', flag: 'https://flagcdn.com/w40/cz.png' },
    // Group A4
    13: { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' }, 14: { name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' }, 15: { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' }, 16: { name: 'Wales', flag: 'https://flagcdn.com/w40/gb-wls.png' },

    // --- UEFA LEAGUE B ---
    // Group B1
    17: { name: 'Scotland', flag: 'https://flagcdn.com/w40/gb-sct.png' }, 18: { name: 'Switzerland', flag: 'https://flagcdn.com/w40/ch.png' }, 19: { name: 'Slovenia', flag: 'https://flagcdn.com/w40/si.png' }, 20: { name: 'North Macedonia', flag: 'https://flagcdn.com/w40/mk.png' },
    // Group B2
    21: { name: 'Hungary', flag: 'https://flagcdn.com/w40/hu.png' }, 22: { name: 'Ukraine', flag: 'https://flagcdn.com/w40/ua.png' }, 23: { name: 'Georgia', flag: 'https://flagcdn.com/w40/ge.png' }, 24: { name: 'Northern Ireland', flag: 'https://flagcdn.com/w40/gb-nir.png' },
    // Group B3
    25: { name: 'Israel', flag: 'https://flagcdn.com/w40/il.png' }, 26: { name: 'Austria', flag: 'https://flagcdn.com/w40/at.png' }, 27: { name: 'Republic of Ireland', flag: 'https://flagcdn.com/w40/ie.png' }, 28: { name: 'Kosovo', flag: 'https://flagcdn.com/w40/xk.png' },
    // Group B4
    29: { name: 'Poland', flag: 'https://flagcdn.com/w40/pl.png' }, 30: { name: 'Bosnia and Herzegovina', flag: 'https://flagcdn.com/w40/ba.png' }, 31: { name: 'Romania', flag: 'https://flagcdn.com/w40/ro.png' }, 32: { name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png' },

    // --- UEFA LEAGUE C ---
    // Group C1
    33: { name: 'Albania', flag: 'https://flagcdn.com/w40/al.png' }, 34: { name: 'Finland', flag: 'https://flagcdn.com/w40/fi.png' }, 35: { name: 'Belarus', flag: 'https://flagcdn.com/w40/by.png' }, 36: { name: 'San Marino', flag: 'https://flagcdn.com/w40/sm.png' },
    // Group C2
    37: { name: 'Montenegro', flag: 'https://flagcdn.com/w40/me.png' }, 38: { name: 'Armenia', flag: 'https://flagcdn.com/w40/am.png' }, 39: { name: 'Cyprus', flag: 'https://flagcdn.com/w40/cy.png' }, 40: { name: 'Latvia', flag: 'https://flagcdn.com/w40/lv.png' },
    // Group C3
    41: { name: 'Kazakhstan', flag: 'https://flagcdn.com/w40/kz.png' }, 42: { name: 'Slovakia', flag: 'https://flagcdn.com/w40/sk.png' }, 43: { name: 'Faroe Islands', flag: 'https://flagcdn.com/w40/fo.png' }, 44: { name: 'Moldova', flag: 'https://flagcdn.com/w40/md.png' },
    // Group C4
    45: { name: 'Iceland', flag: 'https://flagcdn.com/w40/is.png' }, 46: { name: 'Bulgaria', flag: 'https://flagcdn.com/w40/bg.png' }, 47: { name: 'Estonia', flag: 'https://flagcdn.com/w40/ee.png' }, 48: { name: 'Luxembourg', flag: 'https://flagcdn.com/w40/lu.png' },

    // --- UEFA LEAGUE D ---
    // Group D1
    49: { name: 'Malta', flag: 'https://flagcdn.com/w40/mt.png' }, 50: { name: 'Gibraltar', flag: 'https://flagcdn.com/w40/gi.png' }, 51: { name: 'Andorra', flag: 'https://flagcdn.com/w40/ad.png' },
    // Group D2
    52: { name: 'Lithuania', flag: 'https://flagcdn.com/w40/lt.png' }, 53: { name: 'Azerbaijan', flag: 'https://flagcdn.com/w40/az.png' }, 54: { name: 'Liechtenstein', flag: 'https://flagcdn.com/w40/li.png' },

    // --- OTHER TOP COUNTRIES ---
    61: { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' }, 62: { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
    63: { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png' }, 64: { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
    65: { name: 'USA', flag: 'https://flagcdn.com/w40/us.png' }, 66: { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
    67: { name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' }, 68: { name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
    69: { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' }, 70: { name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png' },

    // --- CLUBS ---
    81: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' }, 
    82: { name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
    83: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
    84: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
    85: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
    86: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
    87: { name: 'Chelsea', flag: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
    88: { name: 'Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' }, 
    89: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
    90: { name: 'Juventus', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg' },
    91: { name: 'Al Nassr', flag: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Al-Nassr.svg' },




// --- PREMIER LEAGUE ---
    101: { name: 'AFC Bournemouth', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
    102: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
    103: { name: 'Aston Villa', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
    114: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' }, 
    115: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
    116: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
    120: { name: 'Tottenham', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' },

    // --- LALIGA ---
    122: { name: 'Atletico Madrid', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
    126: { name: 'FC Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
    135: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },

    // --- BUNDESLIGA ---
    144: { name: 'Bayer Leverkusen', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
    145: { name: 'Borussia Dortmund', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
    149: { name: 'FC Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' },

    // --- LIGUE 1 ---
    168: { name: 'Marseille', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg' }, 
    171: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },

    // --- CRICKET (OFFICIAL COUNTRY FLAGS) ---
    201: { name: 'Afghanistan', flag: 'https://flagcdn.com/w40/af.png' }, 202: { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
    203: { name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png' }, 204: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' },
    205: { name: 'India', flag: 'https://flagcdn.com/w40/in.png' }, 206: { name: 'Ireland', flag: 'https://flagcdn.com/w40/ie.png' },
    207: { name: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png' }, 208: { name: 'Pakistan', flag: 'https://flagcdn.com/w40/pk.png' },
    209: { name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png' }, 210: { name: 'Sri Lanka', flag: 'https://flagcdn.com/w40/lk.png' },
    211: { name: 'West Indies', flag: 'https://flagcdn.com/w40/jm.png' }, 212: { name: 'Zimbabwe', flag: 'https://flagcdn.com/w40/zw.png' }
    // (Note: Aap baqi teams ko bhi isi format mein ID ke sath add kar sakte hain)
};


// =========================================================================================
// 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)

// =========================================================================================
// 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// =========================================================================================
let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

async function loadAllPictures() {
    if (!ENABLE_PIC_OVERLAY) return;
    picSequenceData = [];
    
    // 1. Local Images (2 Seconds = 2000ms)
    const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
    let seqIndex = 1;
    while(true) {
        let found = false;
        for (let ext of possiblePicExts) {
            let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
            if (fs.existsSync(tempPath)) {
                let extName = ext.replace('.', '');
                if (extName === 'jpg') extName = 'jpeg';
                const base64Data = fs.readFileSync(tempPath).toString('base64');
                picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
                console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
                found = true;
                break;
            }
        }
        if (!found) break; 
        seqIndex++;
    }

    // 2. URL Images Download (1 Second = 1000ms)
    const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
    for (let i = 0; i < urls.length; i++) {
        try {
            console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
            const resp = await fetch(urls[i]);
            const arrayBuffer = await resp.arrayBuffer();
            const base64Data = Buffer.from(arrayBuffer).toString('base64');
            const contentType = resp.headers.get('content-type') || 'image/jpeg';
            picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
            console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
        } catch(e) {
            console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
        }
    }
}


// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
//     // Filter updated to allow both 'http' and 'data:image'
//     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

//     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
//     // Filter updated to allow both 'http' and 'data:image'
//     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             if (urls[i].startsWith('data:image')) {
//                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
//                 picSequenceData.push({ src: urls[i], duration: 1000 });
//                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
//             } else if (urls[i].startsWith('http')) {
//                 // Agar normal URL hai, toh fetch karke Base64 banalo
//                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//                 const resp = await fetch(urls[i]);
//                 const arrayBuffer = await resp.arrayBuffer();
//                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
//                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
//                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//             }
//         } catch(e) {
//             console.log(`[❌] Failed to process Pic ${i+1}`);
//         }
//     }
// }


// =========================================================================================
// 🎬 VIDEO OVERLAY PRELOAD (Base64)
// =========================================================================================
let videoOverlayBase64 = null;
if (VIDEO_OVERLAY_MODE !== 'OFF') {
    const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
    if (fs.existsSync(videoOverlayPath)) {
        const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
        videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
        console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
    } else {
        console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
    }
}

let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// =========================================================================================
// 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// =========================================================================================
function parseDurationToMs(str) {
    if (!str || str.toLowerCase() === 'none') return null;
    let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
    if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
    if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
    return ms > 0 ? ms : null;
}

let rawUrls = (process.env.TARGET_URLS || '').trim();
if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

let phases = [];
rawUrls.split('|').forEach(phaseStr => {
    let parts = phaseStr.split('::');
    let urlsPart = parts[0].trim();
    let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
    let phaseUrls = urlsPart.split(',').map(u => {
        let trimmed = u.trim();
        let hangThreshold = 8000; 
        if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
        if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        return { url: trimmed, hangTime: hangThreshold };
    }).filter(u => u.url !== 'https://');
    
    if (phaseUrls.length > 0) {
        phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
    }
});

if (phases.length === 0) {
    phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
}

let currentPhaseIndex = 0;
let urlList = phases[currentPhaseIndex].urls;
let currentUrlIndex = 0;
let phaseEndTime = null;

console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// Single System Variables
let browserArgs = []; 
let browser = null; 
let page = null;
let obsProcess = null; let audioProcesses = [];

async function createBrowserInstance(args) {
    return await puppeteer.launch({
        headless: false, 
        defaultViewport: { width: RES_W, height: RES_H },
        ignoreDefaultArgs: ['--enable-automation'], 
        args: args
    });
}

// =========================================================================================
// 🛡️ OVERLAYS (Restored to Original)
// =========================================================================================
async function injectBlackOverlay(page) {
    if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
    try {
        await page.evaluate((overlayMode, opacityVal) => {
            setInterval(() => {
                try {
                    if (!document.getElementById('sport4u-black-overlay')) {
                        const container = document.createElement('div');
                        container.id = 'sport4u-black-overlay';
                        let opDecimal = parseInt(opacityVal) / 100;
                        let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important; opacity: ${opDecimal} !important;`;
                        
                        if (overlayMode.includes('Borders')) {
                            container.style.cssText = baseCss;
                            const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
                            const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
                            const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
                            const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
                            container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
                        } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
                        else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
                        let target = document.body || document.documentElement; if (target) target.appendChild(container);
                    }
                } catch(e) {}
            }, 1000); 
        }, ENABLE_BLACK_OVERLAY, BLACK_OVERLAY_OPACITY);
    } catch (e) {}
}

async function injectOfficialWatermark(page) {
     if (!page || !ENABLE_TEXT_OVERLAY) return;
     try {
        await page.evaluate((icon) => {
            setInterval(() => {
                try {
                    if (!document.getElementById('sport4u-watermark')) {
                        const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
                        overlay.innerHTML = `
                            <div style="font-size: 4vmin; margin-top: 1vh;">
                                🔍 Search on Google 👉 
                                <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
                                    sport4u.online
                                </span>
                            </div>
                            <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
                                Guys, please support me ❤️🙏
                            </div>
                        `;
                        
                        overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
                        let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                    }
                } catch(e) {}
            }, 1000); 
        }, MATCH_ICON); 
    } catch (e) {}
}

async function injectRandomPicOverlay(page) {
    if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
    try {
        await page.evaluate((picArray) => {
            setInterval(() => {
                try {
                    if (!document.getElementById('sport4u-random-pic')) {
                        const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
                        overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
                        let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
                        function triggerRandomShow() {
                            if (!document.getElementById('sport4u-random-pic')) return; 
                            const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
                            setTimeout(() => {
                                const img = document.getElementById('sport4u-random-pic');
                                if (img) {
                                    img.style.setProperty('display', 'block', 'important');
                                    let currentSeqIndex = 0; 
                                    img.src = picArray[currentSeqIndex].src; 
                                    
                                    function showNext() {
                                        currentSeqIndex++;
                                        if(currentSeqIndex >= picArray.length) { 
                                            img.style.setProperty('display', 'none', 'important'); 
                                            triggerRandomShow(); 
                                        } else { 
                                            img.src = picArray[currentSeqIndex].src; 
                                            setTimeout(showNext, picArray[currentSeqIndex].duration);
                                        }
                                    }
                                    setTimeout(showNext, picArray[currentSeqIndex].duration);
                                }
                            }, nextShowDelay);
                        }
                        triggerRandomShow();
                    }
                } catch(e) {}
            }, 2000); 
        }, picSequenceData);
    } catch (e) {}
}

async function injectVideoOverlay(page) {
    if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
    try {
        await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
            let videoState = 'waiting'; 
            let secondsCounter = 0;
            setInterval(() => {
                try {
                    let vid = document.getElementById('sport4u-video-overlay');
                    if (!vid) {
                        vid = document.createElement('video');
                        vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
                        // Smart Positioning System
                        let posCss = '';
                        if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
                        else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
                        else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
                        else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
                        else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
                        else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
                        vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
                        let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
                        if (mode.includes('Always ON')) { 
                            vid.style.setProperty('opacity', '1', 'important'); 
                            vid.play().catch(()=>{}); 
                        }
                        videoState = 'waiting'; secondsCounter = 0;
                    }
                    if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
                    if (videoState === 'waiting') {
                        secondsCounter++;
                        if (secondsCounter >= hideSecs) { 
                            vid.style.setProperty('opacity', '1', 'important'); 
                            vid.currentTime = 0; 
                            vid.play().catch(()=>{}); 
                            videoState = 'playing'; 
                            secondsCounter = 0; 
                        }
                    } else if (videoState === 'playing') {
                        secondsCounter++;
                        if (secondsCounter >= showSecs) { 
                            vid.style.setProperty('opacity', '0', 'important'); 
                            vid.pause(); 
                            videoState = 'waiting'; 
                            secondsCounter = 0; 
                        }
                    }
                } catch(e) {}
            }, 1000); 
}, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
    } catch (e) {}
}

async function injectScoreboardOverlay(page) {
    if (!page || SCOREBOARD_MATCHES === 'OFF' || SCOREBOARD_MATCHES.trim() === '') return;
    try {
        await page.evaluate((matchesStr, teamDB) => {
            setInterval(() => {
                try {
                    if (!document.getElementById('sport4u-scoreboard-overlay')) {
                        const container = document.createElement('div');
                        container.id = 'sport4u-scoreboard-overlay';
                        
                        // Bottom 30% Fixed Container
                        container.style.cssText = `position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100vw !important; height: 35vh !important; pointer-events: none !important; z-index: 2147483648 !important; background: rgba(0, 0, 0, 0.75) !important; padding: 1.5vh 2vw !important; box-sizing: border-box !important; border-top: 2px solid #e50914 !important; display: flex !important; flex-direction: column !important; flex-wrap: wrap !important; align-content: flex-start !important; gap: 0.5vh 3vw !important;`;

                        // Pura text pehle '|' se todain taake Leagues alag ho jayein
                        let leagueGroups = matchesStr.split('|').map(g => g.trim()).filter(g => g.length > 0);

                        leagueGroups.forEach((group) => {
                            // Har group ko '=' se todain taake League Name aur Matches alag hon
                            let parts = group.split('=');
                            let leagueName = parts.length > 1 ? parts[0].trim() : '';
                            let matchData = parts.length > 1 ? parts[1].trim() : parts[0].trim();

                            // 🏆 Agar League ka naam hai, toh pehle uska title render karein
                            if (leagueName) {
                                const headerRow = document.createElement('div');
                                headerRow.style.cssText = `width: max-content; color: #ffcc00; font-size: 3vmin; font-weight: 900; font-family: 'Segoe UI', Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px; margin-top: 1vh; margin-bottom: 0.5vh; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); border-bottom: 1px solid rgba(255, 204, 0, 0.5); padding-bottom: 0.2vh;`;
                                headerRow.innerText = leagueName;
                                container.appendChild(headerRow);
                            }

                            // Ab Matches ko '&' se todain aur render karein
                            let matches = matchData.split('&').map(m => m.trim()).filter(m => m.length > 0);
                            
                            matches.forEach((matchStr) => {
                                let teamParts = matchStr.split(',').map(p => p.trim());
                                let t1Id = teamParts[0]; 
                                let t2Id = teamParts[1];

                                let defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
                                let t1 = teamDB[t1Id] || { name: 'Team ' + t1Id, flag: defaultImg };
                                let t2 = teamDB[t2Id] || { name: 'Team ' + t2Id, flag: defaultImg };

                                const row = document.createElement('div');
                                row.style.cssText = `display: flex; justify-content: space-between; align-items: center; background: rgba(230, 235, 230, 0.95); border-radius: 4px; padding: 0.5vh 1.5vw; box-shadow: 0 2px 4px rgba(0,0,0,0.5); width: max-content; min-width: 32vw; max-height: 4vh; overflow: hidden; margin-bottom: 0.5vh;`;

                                row.innerHTML = `
                                    <div style="display: flex; align-items: center; justify-content: flex-end; flex: 1; font-size: 2.5vmin; font-weight: 800; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; white-space: nowrap;">
                                        ${t1.name} 
                                        <img src="${t1.flag}" style="height: 2.5vmin; width: auto; max-width: 3.5vmin; object-fit: contain; margin-left: 1vw;">
                                    </div>
                                    <div style="padding: 0 1.5vw; font-size: 3vmin; font-weight: 900; color: #333; font-family: 'Courier New', monospace;">
                                        -
                                    </div>
                                    <div style="display: flex; align-items: center; justify-content: flex-start; flex: 1; font-size: 2.5vmin; font-weight: 800; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; white-space: nowrap;">
                                        <img src="${t2.flag}" style="height: 2.5vmin; width: auto; max-width: 3.5vmin; object-fit: contain; margin-right: 1vw;"> 
                                        ${t2.name}
                                    </div>
                                `;
                                container.appendChild(row);
                            });
                        });

                        let target = document.body || document.documentElement;
                        if (target) target.appendChild(container);
                    }
                } catch(e) {}
            }, 2000);
        }, SCOREBOARD_MATCHES, TEAM_DB);
    } catch(e) {}
}

async function applyAllOverlays(page) {
    if(!page) return;
    await injectBlackOverlay(page);
    await injectOfficialWatermark(page);
    await injectRandomPicOverlay(page);
    await injectVideoOverlay(page);
    await injectScoreboardOverlay(page); // SCOREBOARD ACTIVATED
}

// =========================================================================================
// 🛡️ NETWORK BLOCKER & FIREWALL
// =========================================================================================
async function setupNetworkAdBlocker(p) {
    if (!p) return;
    try {
        await p.setRequestInterception(true);
        p.on('request', (request) => {
            const url = request.url().toLowerCase();
            const type = request.resourceType();

            if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
                const targetUrl = request.url().toLowerCase();
                const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
                if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
                    request.abort().catch(()=>{});
                    return;
                }
            }

            if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
                request.abort().catch(()=>{});
            } else {
                request.continue().catch(()=>{});
            }
        });
    } catch (e) {}
}

async function applyPreloadFirewall(p) {
    if (!p) return;
    try {
        await p.evaluateOnNewDocument(() => {
            const originalAttachShadow = Element.prototype.attachShadow;
            Element.prototype.attachShadow = function(init) {
                if (init && init.mode === 'closed') init.mode = 'open'; 
                const shadowRoot = originalAttachShadow.call(this, init);
                const observer = new MutationObserver(() => {
                    const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
                    if (adElements.length > 0) { this.remove(); }
                });
                observer.observe(shadowRoot, { childList: true, subtree: true });
                return shadowRoot;
            };
            Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
            window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
            Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
            document.addEventListener('click', (e) => {
                const target = e.target;
                if (target && (target.tagName === 'A' || target.closest('a'))) {
                    const link = target.tagName === 'A' ? target : target.closest('a');
                    if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
                        e.preventDefault(); e.stopPropagation(); return false;
                    }
                }
            }, true);

            const style = document.createElement('style');
            // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
            style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
            document.documentElement.appendChild(style);

            // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
            if (window.self === window.top) {
                const observer = new MutationObserver(() => {
                    if (document.body && !document.getElementById('instant-black-shield')) {
                        const shield = document.createElement('div');
                        shield.id = 'instant-black-shield';
                        shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
                        document.documentElement.appendChild(shield);
                        observer.disconnect();
                    }
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
            }
        });
    } catch (e) {}
}

// =========================================================================================
// 🛡️ UI OVERLAYS
// =========================================================================================
async function showLoadingUI(page, title, sub) {
    try {
        await page.evaluate((t, s) => {
            if (window.self !== window.top) return; 
            let overlay = document.getElementById('smart-stream-overlay');
            if (overlay) {
                const titleEl = overlay.querySelector('.stream-title');
                const subEl = overlay.querySelector('.stream-sub');
                if (titleEl) titleEl.innerHTML = t;
                if (subEl) subEl.innerHTML = s;
                overlay.style.setProperty('display', 'flex', 'important');
                overlay.style.setProperty('opacity', '1', 'important');
                overlay.style.setProperty('z-index', '2147483647', 'important');
            } else {
                overlay = document.createElement('div');
                overlay.id = 'smart-stream-overlay';
                overlay.innerHTML = `
                    <style>
                        #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
                        .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
                        .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
                        .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                        @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
                        .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
                        .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
                    </style>
                    <div class="stream-spinner"></div>
                    <div class="progress-container"><div class="progress-bar-fill"></div></div>
                    <div class="stream-title">${t}</div>
                    <div class="stream-sub">${s}</div>
                `;
                document.documentElement.appendChild(overlay);
            }
        }, title, sub);
    } catch (e) {}
}

async function hideLoadingUI(page) {
    try {
        await page.evaluate(() => {
            // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
            const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
            overlays.forEach(overlay => overlay.remove());
        });
    } catch (e) {}
}

function setupOBSConfig() {
    const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
    const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
    const scenesDir = path.join(obsDir, 'basic', 'scenes');

    fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

    fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
    fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
Name=Untitled
[Video]
BaseCX=${RES_W}
BaseCY=${RES_H}
OutputCX=${RES_W}
OutputCY=${RES_H}
FPSCommon=30
[Output]
Mode=Advanced
[AdvOut]
TrackIndex=1
RecType=Standard
Encoder=obs_x264
[obs_x264]
bitrate=${BITRATE}
keyint_sec=2
preset=ultrafast
profile=main
tune=zerolatency
`);

    let rtmpServer = ""; let streamKey = "";
    if (YT_KEY && YT_KEY.trim() !== '') {
        rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
        console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
    } else if (FB_KEY && FB_KEY.trim() !== '') {
        rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
        console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
    } else {
        console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
        process.exit(1);
    }

    const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
    fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

    const sceneJson = {
        "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
        "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
        "sources": [
            { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
            { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
            { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
            { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
        ]
    };
    fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
}

async function forcePlayerFullscreen(p) {
    if (!p) return;
    try {
        await p.evaluate(() => {
            document.documentElement.style.setProperty('background-color', 'black', 'important');
            document.body.style.setProperty('background-color', 'black', 'important');
            document.body.style.setProperty('overflow', 'hidden', 'important');
            document.documentElement.style.setProperty('overflow', 'hidden', 'important');

            let iframes = Array.from(document.querySelectorAll('iframe'));
            let mainIframe = null; let maxScore = -1;
            iframes.forEach(ifr => {
                let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
                if (area < 5000) return; let score = area;
                if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
                if (h > w) score = -1;
                if (score > maxScore) { maxScore = score; mainIframe = ifr; }
            });

            if (mainIframe) {
                iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
                mainIframe.style.setProperty('position', 'fixed', 'important');
                mainIframe.style.setProperty('top', '0px', 'important');
                mainIframe.style.setProperty('left', '0px', 'important');
                mainIframe.style.setProperty('width', '100vw', 'important');
                mainIframe.style.setProperty('height', '100vh', 'important');
                mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
                mainIframe.style.setProperty('background-color', 'black', 'important');
                mainIframe.style.setProperty('border', 'none', 'important');
                mainIframe.style.setProperty('opacity', '1', 'important');
                mainIframe.style.setProperty('display', 'block', 'important');
                mainIframe.style.setProperty('visibility', 'visible', 'important');
            }

            const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
            document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
        });
    } catch(e) {}
}

async function waitForActiveVisualReady(p) {
    if (!p) return false;
    let readyCount = 0;
    for (let i = 0; i < 40; i++) { // Max 20 seconds
        try {
            const framePromises = p.frames().map(async (frame) => {
                if (frame.isDetached()) return false;
                try {
                    return await frame.evaluate(() => {
                        const v = document.querySelector('video:not(#sport4u-video-overlay)');
                        return (v && !v.paused && v.currentTime > 0);
                    });
                } catch(err) { return false; }
            });
            
            const results = await Promise.all(framePromises);
            const isReady = results.some(r => r === true);
            
            if (isReady) readyCount++; else readyCount = 0;
            if (readyCount >= 3) return true; // 3 baar tasalli karega
        } catch(e) {}
        await new Promise(r => setTimeout(r, 500));
    }
    return false;
}

async function triggerSmartUnmute(p) {
    for (const frame of p.frames()) {
        try {
            if (frame.isDetached()) continue;
            await frame.evaluate(() => {
                const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                potentialElements.forEach(el => {
                    const text = (el.innerText || el.textContent || '').trim().toUpperCase();
                    const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
                    const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
                    const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
                    if (matchesText || matchesJS) {
                        const rect = el.getBoundingClientRect();
                        const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
                        if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
                    }
                });
                document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
            }).catch(() => {});
        } catch (e) {}
    }
}

async function initializeVideo(p, startMuted) {
    if (!p) return;
    
    // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
    if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
    try {
        if (SERVER_SELECTION !== 'None') {
            console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
            let serverClicked = false; let serverAttempts = 0;
            while (!serverClicked && serverAttempts < 10) { 
                serverAttempts++;
                try {
                    const clickSuccess = await p.evaluate((serverName) => {
                        const buttons = Array.from(document.querySelectorAll('button'));
                        const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
                        if (targetBtn) { targetBtn.click(); return true; }
                        return false;
                    }, SERVER_SELECTION);
                    if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
                    else await new Promise(r => setTimeout(r, 2000));
                } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
            }
        }

        console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
        let isVideoPlaying = false; let attempts = 0;

        while (!isVideoPlaying && attempts < 15) {
            for (const frame of p.frames()) {
                try {
                    const autoPlayed = await frame.evaluate(() => {
                        let playing = false;
                        document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
                        return playing;
                    });
                    if (autoPlayed) { isVideoPlaying = true; break; }

                    const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
                    if (playBtn) {
                        const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
                        if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
                    }
                } catch (err) {}
            }
            if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
            attempts++;
        }

        console.log('[*] Scanning for Exact Real Video Player...');
        let targetFrame = null;
        for (const frame of p.frames()) {
            try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
        }

        await forcePlayerFullscreen(p);

        await p.evaluate(() => {
            setInterval(() => {
                try {
                    let iframes = Array.from(document.querySelectorAll('iframe'));
                    let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
                    if (mainIframe) {
                        iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
                    }
                } catch (err) {}
            }, 500); 
        }).catch(() => {});

        if(targetFrame) {
            await targetFrame.evaluate((muteVideo) => {
                window.isStreamMuted = muteVideo; 
                setInterval(() => {
                    try {
                        const style = document.createElement('style');
                        style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
                        document.head.appendChild(style);

                        const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
                        const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
                        let realVideo = null;

                        mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
                        if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

                        for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
                        if (!realVideo && videos.length > 0) realVideo = videos[0];

                        if (realVideo) { 
                            let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                            playerWrap.style.setProperty('position', 'fixed', 'important');
                            playerWrap.style.setProperty('top', '0px', 'important');
                            playerWrap.style.setProperty('left', '0px', 'important');
                            playerWrap.style.setProperty('width', '100vw', 'important');
                            playerWrap.style.setProperty('height', '100vh', 'important');
                            playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
                            playerWrap.style.setProperty('background-color', 'black', 'important');
                            playerWrap.style.setProperty('opacity', '1', 'important');
                            playerWrap.style.setProperty('visibility', 'visible', 'important');
                            playerWrap.style.setProperty('display', 'block', 'important');
                            if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
                            realVideo.style.setProperty('object-fit', 'contain', 'important');
                        }
                    } catch(err) {}
                }, 500); 
            }, startMuted).catch(() => {});
        }

    } catch (e) { }

    // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
    if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
    // INJECT ALL OVERLAYS NOW
    await applyAllOverlays(p);
}

async function checkPageStatus(p) {
    if (!p) return { status: 'DEAD' };
    try {
        // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
        const framePromises = p.frames().map(async (frame) => {
            if (frame.isDetached()) return null;
            try {
                return await Promise.race([
                    frame.evaluate(() => {
                        const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        if (bodyText.includes("stream error") || bodyText.includes("stream unavailable") || bodyText.includes("404") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
                            return { status: 'CRITICAL_ERROR' };
                        }
                        
                        // Video dhundne ki ninja technique
                        const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
                        for (let v of videos) {
                            if (v.clientWidth > 10 || !v.paused) {
                                let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
                                return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
                            }
                        }
                        return null;
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
                ]);
            } catch (err) { return null; }
        });

        const results = await Promise.all(framePromises);
        
        // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
        for (let res of results) {
            if (res && res.status === 'CRITICAL_ERROR') return res;
            if (res && res.status === 'HEALTHY') return res;
        }
        
        return { status: 'LOADING_OR_DEAD' }; 
    } catch (e) { return { status: 'DEAD' }; }
}
// =========================================================================================
// 🔄 SINGLE-SYSTEM WATCHDOG
// =========================================================================================
async function startWatchdog() {
    let lastTime = -1; 
    let lastDecodedFrames = -1; 
    let frozenTimestamp = Date.now();
    let ticks = 0; let setupTime = Date.now(); 
    let isWarmup = true; const WARMUP_MS = 15000; 
    let strikes = 0; 
    let streamStartTime = Date.now();

    while (true) {
        if (!browser || !browser.isConnected()) {
            console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
            return; 
        }

        let currentUrlStr = urlList[currentUrlIndex].url;
        let activeStatus = await checkPageStatus(page);

        if (phaseEndTime && Date.now() >= phaseEndTime) {
            if (currentPhaseIndex + 1 < phases.length) {
                console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
                currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
                currentUrlStr = urlList[currentUrlIndex].url;
                phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
                activeStatus.status = 'PHASE_CHANGE'; 
            } else { phaseEndTime = null; }
        }

        if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
            strikes++;
            if (strikes < 5) {
                console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
                await new Promise(r => setTimeout(r, 2000));
                continue; 
            } else {
                activeStatus.status = 'DEAD'; 
            }
        } else {
            strikes = 0; 
        }

        if (activeStatus.status === 'HEALTHY' && !isWarmup) {
            let elapsedMs = Date.now() - streamStartTime;
            let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
            if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
        }

        if (activeStatus.status === 'HEALTHY') {
            let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
            if (isTimeStuck) {
                // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
                if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
            } else {
                lastTime = activeStatus.currentTime; 
                lastDecodedFrames = activeStatus.decodedFrames; 
                frozenTimestamp = Date.now();
                
                await hideLoadingUI(page); 
                for (const frame of page.frames()) {
                    try { 
                        if (!frame.isDetached()) { 
                            frame.evaluate((audioOn) => { 
                                window.isStreamMuted = !audioOn; 
                                document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
                            }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
                        } 
                    } catch(e) {}
                }
            }
        }

        ticks++;
        if (ticks === 1 || ticks % 15 === 0) {
            console.log(`\n==================================================`);
            console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
            console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
            console.log(`==================================================\n`);
        }

        if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
            strikes = 0; 
            
            if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
                console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
                await new Promise(r => setTimeout(r, 2000)); continue; 
            }

            console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
            try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

            if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
                currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
            }
            
            currentUrlStr = urlList[currentUrlIndex].url;

            try { 
                await page.goto('about:blank'); 
                await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
            } catch(e) {}
            
            try {
                await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
                await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
                await initializeVideo(page, false); 
                
                const activeVisualReady = await waitForActiveVisualReady(page);
                if (activeVisualReady) await hideLoadingUI(page);
            } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
            setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
            lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

            try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
        } 
        await new Promise(r => setTimeout(r, 2000)); 
    }
}

async function startDirectStreaming() {
    console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
    obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
    obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
    obsProcess.stderr.on('data', (data) => {
        const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
    });

    if (ENABLE_BACKGROUND_AUDIO) {
        const bgAudiosInput = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100';
        const audioConfigs = bgAudiosInput.split(',').map(a => a.trim()).filter(a => a.length > 0);
        
        for (let config of audioConfigs) {
            let parts = config.split('::');
            let audioFile = parts[0].trim();
            let rawVolume = parts.length > 1 ? parts[1].trim() : '100';
            
            let tempPath = path.join(process.cwd(), audioFile);
            if (fs.existsSync(tempPath)) {
                let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
                let ffplayVolume = volNumber / 100;
                let aProc = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, tempPath]);
                audioProcesses.push(aProc);
                console.log(`[🎵] Playing Background Audio: ${audioFile} at ${volNumber}% volume`);
            } else {
                console.log(`[❌] Background Audio NOT found: ${audioFile}`);
            }
        }
    }

    console.log('[*] Waiting for OBS to initialize...');
    await new Promise(r => setTimeout(r, 6000));

    let isObsConnected = false;
    for (let attempt = 1; attempt <= 15; attempt++) {
        try {
            await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
            isObsConnected = true; console.log('[+] OBS Connected!'); break;
        } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
    }

    if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

    browserArgs = [
        '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
        '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
        '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
        '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
        '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
        '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
    ];
    if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

    browser = await createBrowserInstance(browserArgs); 
    page = (await browser.pages())[0];

    browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

    await setupNetworkAdBlocker(page);
    await applyPreloadFirewall(page);
    await page.bringToFront(); 

    try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
    await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
    await initializeVideo(page, false); 
    
    const activeVisualReady = await waitForActiveVisualReady(page);
    if (activeVisualReady) await hideLoadingUI(page); 
    
    if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

    console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
    phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
    await startWatchdog();
}

async function mainLoop() {
    await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
    while (true) {
        try { await startDirectStreaming(); } 
        catch (error) {
            console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
            await cleanup();
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}

async function cleanup() {
    try { await obs.disconnect(); } catch (e) { } 
    if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
    if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
    if (audioProcesses && audioProcesses.length > 0) { audioProcesses.forEach(ap => { try { ap.kill('SIGKILL'); } catch(e) {} }); audioProcesses = []; }
    try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
}

process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
else {
    // 🔄 SMART HANDOFF SYSTEM: Naya runner jaldi trigger hoga taake usko setup ka poora time mile
    setTimeout(() => {
        try {
            const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
            const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
            const server = process.env.SERVER_SELECTION || 'None';
            const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
            const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
            const blackOverlayOpacity = process.env.BLACK_OVERLAY_OPACITY || '100';
            const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON';
            const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
            const bgAudiosInputStatus = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100'; 
            const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
            const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
            const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
            const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
            const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
            const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
            const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
            const scoreboardMatchesStatus = process.env.SCOREBOARD_MATCHES || 'OFF';
            
            console.log("[⏳] SMART HANDOFF: Triggering new GitHub Workflow in background...");
            const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f black_overlay_opacity="${blackOverlayOpacity}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audios="${bgAudiosInputStatus}" -f scoreboard_matches="${scoreboardMatchesStatus}" -f custom_duration="None"`;
            execSync(cmd, { stdio: 'inherit' });
            
            // 8 Minutes (480000ms) overlap time for new runner setup and OBS takeover
            setTimeout(async () => { 
                console.log("[🔄] Handoff Time! Stopping old stream to let the new runner take over instantly.");
                await cleanup(); 
                process.exit(0); 
            }, 480000); 
        } catch (err) { }
    }, 21000000); // Trigger at 5 hours 50 minutes (21000000ms)
}

mainLoop();
















// haaaaaaaaaaaaaaaaa



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const BLACK_OVERLAY_OPACITY = process.env.BLACK_OVERLAY_OPACITY || '100';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF';
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // ⚽ SCOREBOARD TEAM DATABASE (WITH UEFA NATIONS LEAGUE)
// // =========================================================================================
// // const SCOREBOARD_MATCHES = process.env.SCOREBOARD_MATCHES || 'OFF';

// // const TEAM_DB = {
// //     // --- UEFA NATIONS LEAGUE A GROUPS ---
// //     1: { name: 'France', flag: 'https://flagcdn.com/w40/fr.png' }, 2: { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
// //     3: { name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' }, 4: { name: 'Türkiye', flag: 'https://flagcdn.com/w40/tr.png' },
// //     5: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' }, 6: { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' },
// //     7: { name: 'Serbia', flag: 'https://flagcdn.com/w40/rs.png' }, 8: { name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
// //     9: { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' }, 10: { name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png' },
// //     11: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' }, 12: { name: 'Czechia', flag: 'https://flagcdn.com/w40/cz.png' },
// //     13: { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' }, 14: { name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' },
// //     15: { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' }, 16: { name: 'Wales', flag: 'https://flagcdn.com/w40/gb-wls.png' },

// //     // --- OTHER TOP COUNTRIES ---
// //     21: { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' }, 22: { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
// //     23: { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png' }, 24: { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
// //     25: { name: 'USA', flag: 'https://flagcdn.com/w40/us.png' }, 26: { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
// //     27: { name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' }, 28: { name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
// //     29: { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' }, 30: { name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png' },

// //     // --- CLUBS (Original Wikimedia SVGs - No Size Errors) ---
// //     51: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' }, 
// //     52: { name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
// //     53: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
// //     54: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
// //     55: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
// //     56: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
// //     57: { name: 'Chelsea', flag: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
// //     58: { name: 'Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' }, 
// //     59: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
// //     60: { name: 'Juventus', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg' },
// //     61: { name: 'Al Nassr', flag: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Al-Nassr.svg' }
// // };


// // =========================================================================================
// // ⚽ SCOREBOARD TEAM DATABASE (WITH ALL UEFA LEAGUES A, B, C, D)
// // =========================================================================================
// const SCOREBOARD_MATCHES = process.env.SCOREBOARD_MATCHES || 'OFF';

// const TEAM_DB = {
//     // --- UEFA LEAGUE A ---
//     // Group A1
//     1: { name: 'France', flag: 'https://flagcdn.com/w40/fr.png' }, 2: { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' }, 3: { name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' }, 4: { name: 'Türkiye', flag: 'https://flagcdn.com/w40/tr.png' },
//     // Group A2
//     5: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' }, 6: { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' }, 7: { name: 'Serbia', flag: 'https://flagcdn.com/w40/rs.png' }, 8: { name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
//     // Group A3
//     9: { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' }, 10: { name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png' }, 11: { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png' }, 12: { name: 'Czechia', flag: 'https://flagcdn.com/w40/cz.png' },
//     // Group A4
//     13: { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' }, 14: { name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' }, 15: { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' }, 16: { name: 'Wales', flag: 'https://flagcdn.com/w40/gb-wls.png' },

//     // --- UEFA LEAGUE B ---
//     // Group B1
//     17: { name: 'Scotland', flag: 'https://flagcdn.com/w40/gb-sct.png' }, 18: { name: 'Switzerland', flag: 'https://flagcdn.com/w40/ch.png' }, 19: { name: 'Slovenia', flag: 'https://flagcdn.com/w40/si.png' }, 20: { name: 'North Macedonia', flag: 'https://flagcdn.com/w40/mk.png' },
//     // Group B2
//     21: { name: 'Hungary', flag: 'https://flagcdn.com/w40/hu.png' }, 22: { name: 'Ukraine', flag: 'https://flagcdn.com/w40/ua.png' }, 23: { name: 'Georgia', flag: 'https://flagcdn.com/w40/ge.png' }, 24: { name: 'Northern Ireland', flag: 'https://flagcdn.com/w40/gb-nir.png' },
//     // Group B3
//     25: { name: 'Israel', flag: 'https://flagcdn.com/w40/il.png' }, 26: { name: 'Austria', flag: 'https://flagcdn.com/w40/at.png' }, 27: { name: 'Republic of Ireland', flag: 'https://flagcdn.com/w40/ie.png' }, 28: { name: 'Kosovo', flag: 'https://flagcdn.com/w40/xk.png' },
//     // Group B4
//     29: { name: 'Poland', flag: 'https://flagcdn.com/w40/pl.png' }, 30: { name: 'Bosnia and Herzegovina', flag: 'https://flagcdn.com/w40/ba.png' }, 31: { name: 'Romania', flag: 'https://flagcdn.com/w40/ro.png' }, 32: { name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png' },

//     // --- UEFA LEAGUE C ---
//     // Group C1
//     33: { name: 'Albania', flag: 'https://flagcdn.com/w40/al.png' }, 34: { name: 'Finland', flag: 'https://flagcdn.com/w40/fi.png' }, 35: { name: 'Belarus', flag: 'https://flagcdn.com/w40/by.png' }, 36: { name: 'San Marino', flag: 'https://flagcdn.com/w40/sm.png' },
//     // Group C2
//     37: { name: 'Montenegro', flag: 'https://flagcdn.com/w40/me.png' }, 38: { name: 'Armenia', flag: 'https://flagcdn.com/w40/am.png' }, 39: { name: 'Cyprus', flag: 'https://flagcdn.com/w40/cy.png' }, 40: { name: 'Latvia', flag: 'https://flagcdn.com/w40/lv.png' },
//     // Group C3
//     41: { name: 'Kazakhstan', flag: 'https://flagcdn.com/w40/kz.png' }, 42: { name: 'Slovakia', flag: 'https://flagcdn.com/w40/sk.png' }, 43: { name: 'Faroe Islands', flag: 'https://flagcdn.com/w40/fo.png' }, 44: { name: 'Moldova', flag: 'https://flagcdn.com/w40/md.png' },
//     // Group C4
//     45: { name: 'Iceland', flag: 'https://flagcdn.com/w40/is.png' }, 46: { name: 'Bulgaria', flag: 'https://flagcdn.com/w40/bg.png' }, 47: { name: 'Estonia', flag: 'https://flagcdn.com/w40/ee.png' }, 48: { name: 'Luxembourg', flag: 'https://flagcdn.com/w40/lu.png' },

//     // --- UEFA LEAGUE D ---
//     // Group D1
//     49: { name: 'Malta', flag: 'https://flagcdn.com/w40/mt.png' }, 50: { name: 'Gibraltar', flag: 'https://flagcdn.com/w40/gi.png' }, 51: { name: 'Andorra', flag: 'https://flagcdn.com/w40/ad.png' },
//     // Group D2
//     52: { name: 'Lithuania', flag: 'https://flagcdn.com/w40/lt.png' }, 53: { name: 'Azerbaijan', flag: 'https://flagcdn.com/w40/az.png' }, 54: { name: 'Liechtenstein', flag: 'https://flagcdn.com/w40/li.png' },

//     // --- OTHER TOP COUNTRIES ---
//     61: { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' }, 62: { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
//     63: { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png' }, 64: { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
//     65: { name: 'USA', flag: 'https://flagcdn.com/w40/us.png' }, 66: { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
//     67: { name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' }, 68: { name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
//     69: { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' }, 70: { name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png' },

//     // --- CLUBS ---
//     81: { name: 'Real Madrid', flag: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' }, 
//     82: { name: 'Barcelona', flag: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' }, 
//     83: { name: 'Man City', flag: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }, 
//     84: { name: 'Arsenal', flag: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }, 
//     85: { name: 'Liverpool', flag: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
//     86: { name: 'Man United', flag: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }, 
//     87: { name: 'Chelsea', flag: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
//     88: { name: 'Bayern Munich', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' }, 
//     89: { name: 'PSG', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
//     90: { name: 'Juventus', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg' },
//     91: { name: 'Al Nassr', flag: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Al-Nassr.svg' }
// };


// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcesses = [];

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode, opacityVal) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let opDecimal = parseInt(opacityVal) / 100;
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important; opacity: ${opDecimal} !important;`;
                        
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY, BLACK_OVERLAY_OPACITY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
// }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function injectScoreboardOverlay(page) {
//     if (!page || SCOREBOARD_MATCHES === 'OFF' || SCOREBOARD_MATCHES.trim() === '') return;
//     try {
//         await page.evaluate((matchesStr, teamDB) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-scoreboard-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-scoreboard-overlay';
                        
//                         // FIX: Bottom 30% Height, Aligned to Left Center
//                         container.style.cssText = `position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100vw !important; height: 30vh !important; pointer-events: none !important; z-index: 2147483648 !important; background: rgba(0, 0, 0, 0.70) !important; padding: 0 2vw !important; box-sizing: border-box !important; border-top: 1px solid #333 !important; display: flex !important; align-items: center !important; justify-content: flex-start !important;`;

//                         // CSS GRID: Column flow, max 5 rows, Left aligned
//                         const gridBox = document.createElement('div');
//                         gridBox.style.cssText = `display: grid; grid-template-rows: repeat(5, auto); grid-auto-flow: column; gap: 0.8vh 2.5vw; align-content: center; justify-content: start;`;

//                         let rawMatches = matchesStr.replace(/[()]/g, '').split('|').map(m => m.trim()).filter(m => m.length > 0);

//                         rawMatches.forEach((matchStr) => {
//                             let parts = matchStr.split(',').map(p => p.trim());
//                             let t1Id = parts[0]; 
//                             let t2Id = parts[1];

//                             let defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
//                             let t1 = teamDB[t1Id] || { name: 'Team ' + t1Id, flag: defaultImg };
//                             let t2 = teamDB[t2Id] || { name: 'Team ' + t2Id, flag: defaultImg };

//                             const row = document.createElement('div');
//                             row.style.cssText = `display: flex; justify-content: space-between; align-items: center; background: rgba(230, 235, 230, 0.95); border-radius: 4px; padding: 0.5vh 1.5vw; box-shadow: 0 2px 4px rgba(0,0,0,0.5); width: max-content; min-width: 32vw; max-height: 4vh; overflow: hidden;`;

//                             // Object-fit contain to handle SVGs perfectly. Only a static dash in center.
//                             row.innerHTML = `
//                                 <div style="display: flex; align-items: center; justify-content: flex-end; flex: 1; font-size: 2.5vmin; font-weight: 800; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; white-space: nowrap;">
//                                     ${t1.name} 
//                                     <img src="${t1.flag}" style="height: 2.5vmin; width: auto; max-width: 3.5vmin; object-fit: contain; margin-left: 1vw;">
//                                 </div>
//                                 <div style="padding: 0 1.5vw; font-size: 3vmin; font-weight: 900; color: #333; font-family: 'Courier New', monospace;">
//                                     -
//                                 </div>
//                                 <div style="display: flex; align-items: center; justify-content: flex-start; flex: 1; font-size: 2.5vmin; font-weight: 800; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; white-space: nowrap;">
//                                     <img src="${t2.flag}" style="height: 2.5vmin; width: auto; max-width: 3.5vmin; object-fit: contain; margin-right: 1vw;"> 
//                                     ${t2.name}
//                                 </div>
//                             `;

//                             gridBox.appendChild(row);
//                         });

//                         container.appendChild(gridBox);
//                         let target = document.body || document.documentElement;
//                         if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 2000);
//         }, SCOREBOARD_MATCHES, TEAM_DB);
//     } catch(e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
//     await injectScoreboardOverlay(page); // SCOREBOARD ACTIVATED
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { // Max 20 seconds
//         try {
//             const framePromises = p.frames().map(async (frame) => {
//                 if (frame.isDetached()) return false;
//                 try {
//                     return await frame.evaluate(() => {
//                         const v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && !v.paused && v.currentTime > 0);
//                     });
//                 } catch(err) { return false; }
//             });
            
//             const results = await Promise.all(framePromises);
//             const isReady = results.some(r => r === true);
            
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; // 3 baar tasalli karega
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
//         const framePromises = p.frames().map(async (frame) => {
//             if (frame.isDetached()) return null;
//             try {
//                 return await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("stream error") || bodyText.includes("stream unavailable") || bodyText.includes("404") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         // Video dhundne ki ninja technique
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         for (let v of videos) {
//                             if (v.clientWidth > 10 || !v.paused) {
//                                 let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
//                                 return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
//                             }
//                         }
//                         return null;
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
//                 ]);
//             } catch (err) { return null; }
//         });

//         const results = await Promise.all(framePromises);
        
//         // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
//         for (let res of results) {
//             if (res && res.status === 'CRITICAL_ERROR') return res;
//             if (res && res.status === 'HEALTHY') return res;
//         }
        
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }
// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; 
//     let lastDecodedFrames = -1; 
//     let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 5) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
//             if (isTimeStuck) {
//                 // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
//                 if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenTimestamp = Date.now();
                
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             try { 
//                 await page.goto('about:blank'); 
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const bgAudiosInput = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100';
//         const audioConfigs = bgAudiosInput.split(',').map(a => a.trim()).filter(a => a.length > 0);
        
//         for (let config of audioConfigs) {
//             let parts = config.split('::');
//             let audioFile = parts[0].trim();
//             let rawVolume = parts.length > 1 ? parts[1].trim() : '100';
            
//             let tempPath = path.join(process.cwd(), audioFile);
//             if (fs.existsSync(tempPath)) {
//                 let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//                 let ffplayVolume = volNumber / 100;
//                 let aProc = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, tempPath]);
//                 audioProcesses.push(aProc);
//                 console.log(`[🎵] Playing Background Audio: ${audioFile} at ${volNumber}% volume`);
//             } else {
//                 console.log(`[❌] Background Audio NOT found: ${audioFile}`);
//             }
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcesses && audioProcesses.length > 0) { audioProcesses.forEach(ap => { try { ap.kill('SIGKILL'); } catch(e) {} }); audioProcesses = []; }
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
// else {
//     // 🔄 SMART HANDOFF SYSTEM: Naya runner jaldi trigger hoga taake usko setup ka poora time mile
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//             const server = process.env.SERVER_SELECTION || 'None';
//             const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//             const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//             const blackOverlayOpacity = process.env.BLACK_OVERLAY_OPACITY || '100';
//             const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON';
//             const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//             const bgAudiosInputStatus = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100'; 
//             const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//             const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//             const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//             const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//             const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//             const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//             const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
//             const scoreboardMatchesStatus = process.env.SCOREBOARD_MATCHES || 'OFF';
            
//             console.log("[⏳] SMART HANDOFF: Triggering new GitHub Workflow in background...");
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f black_overlay_opacity="${blackOverlayOpacity}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audios="${bgAudiosInputStatus}" -f scoreboard_matches="${scoreboardMatchesStatus}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
            
//             // 8 Minutes (480000ms) overlap time for new runner setup and OBS takeover
//             setTimeout(async () => { 
//                 console.log("[🔄] Handoff Time! Stopping old stream to let the new runner take over instantly.");
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 480000); 
//         } catch (err) { }
//     }, 21000000); // Trigger at 5 hours 50 minutes (21000000ms)
// }

// mainLoop();













// ================ yeh teek hai aab iss me facebook par 2nd workdlow me sahey see live karey gaa ============
// upper new update add kaerty hai jissme teams k name + flag logo show huqaa 



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const BLACK_OVERLAY_OPACITY = process.env.BLACK_OVERLAY_OPACITY || '100';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF';
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcesses = [];

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode, opacityVal) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let opDecimal = parseInt(opacityVal) / 100;
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important; opacity: ${opDecimal} !important;`;
                        
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY, BLACK_OVERLAY_OPACITY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { // Max 20 seconds
//         try {
//             const framePromises = p.frames().map(async (frame) => {
//                 if (frame.isDetached()) return false;
//                 try {
//                     return await frame.evaluate(() => {
//                         const v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && !v.paused && v.currentTime > 0);
//                     });
//                 } catch(err) { return false; }
//             });
            
//             const results = await Promise.all(framePromises);
//             const isReady = results.some(r => r === true);
            
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; // 3 baar tasalli karega
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
//         const framePromises = p.frames().map(async (frame) => {
//             if (frame.isDetached()) return null;
//             try {
//                 return await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("stream error") || bodyText.includes("stream unavailable") || bodyText.includes("404") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         // Video dhundne ki ninja technique
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         for (let v of videos) {
//                             if (v.clientWidth > 10 || !v.paused) {
//                                 let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
//                                 return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
//                             }
//                         }
//                         return null;
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
//                 ]);
//             } catch (err) { return null; }
//         });

//         const results = await Promise.all(framePromises);
        
//         // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
//         for (let res of results) {
//             if (res && res.status === 'CRITICAL_ERROR') return res;
//             if (res && res.status === 'HEALTHY') return res;
//         }
        
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }
// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; 
//     let lastDecodedFrames = -1; 
//     let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 5) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
//             if (isTimeStuck) {
//                 // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
//                 if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenTimestamp = Date.now();
                
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             try { 
//                 await page.goto('about:blank'); 
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const bgAudiosInput = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100';
//         const audioConfigs = bgAudiosInput.split(',').map(a => a.trim()).filter(a => a.length > 0);
        
//         for (let config of audioConfigs) {
//             let parts = config.split('::');
//             let audioFile = parts[0].trim();
//             let rawVolume = parts.length > 1 ? parts[1].trim() : '100';
            
//             let tempPath = path.join(process.cwd(), audioFile);
//             if (fs.existsSync(tempPath)) {
//                 let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//                 let ffplayVolume = volNumber / 100;
//                 let aProc = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, tempPath]);
//                 audioProcesses.push(aProc);
//                 console.log(`[🎵] Playing Background Audio: ${audioFile} at ${volNumber}% volume`);
//             } else {
//                 console.log(`[❌] Background Audio NOT found: ${audioFile}`);
//             }
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcesses && audioProcesses.length > 0) { audioProcesses.forEach(ap => { try { ap.kill('SIGKILL'); } catch(e) {} }); audioProcesses = []; }
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
// else {
//     // 🔄 SMART HANDOFF SYSTEM: Naya runner jaldi trigger hoga taake usko setup ka poora time mile
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//             const server = process.env.SERVER_SELECTION || 'None';
//             const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//             const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//             const blackOverlayOpacity = process.env.BLACK_OVERLAY_OPACITY || '100';
//             const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON';
//             const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//             const bgAudiosInputStatus = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100'; 
//             const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//             const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//             const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//             const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//             const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//             const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//             const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
            
//             console.log("[⏳] SMART HANDOFF: Triggering new GitHub Workflow in background...");
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f black_overlay_opacity="${blackOverlayOpacity}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audios="${bgAudiosInputStatus}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
            
//     //         // 12 Minutes (720000ms) ka overlap time: Naya workflow fully ready ho kar wait karega
//     //         setTimeout(async () => { 
//     //             console.log("[🔄] Handoff Time! Stopping old stream to let the new runner take over instantly.");
//     //             await cleanup(); 
//     //             process.exit(0); 
//     //         }, 720000); 
//     //     } catch (err) { }
//     // }, 20400000); // 5 hours 40 minutes par naya workflow start hoga
// // }
//             // 8 Minutes (480000ms) ka overlap time naye runner ke setup aur OBS takeover ke liye
//             setTimeout(async () => { 
//                 console.log("[🔄] Handoff Time! Stopping old stream to let the new runner take over instantly.");
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 480000); 
//         } catch (err) { }
//     }, 21000000); // 5 hours 50 minutes (21000000ms) par naya workflow start hoga
// }

// mainLoop();

































































































































// ====================== Alhamdullah Alhamdullah 101% Alhamdullah jab koi bey na hu tuu iss sey start karna ok ==================
// hhhhhhhhhhhhhhhhhhhhhhhhhh







// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const BLACK_OVERLAY_OPACITY = process.env.BLACK_OVERLAY_OPACITY || '100';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF';
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcesses = [];

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode, opacityVal) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let opDecimal = parseInt(opacityVal) / 100;
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important; opacity: ${opDecimal} !important;`;
                        
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY, BLACK_OVERLAY_OPACITY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { // Max 20 seconds
//         try {
//             const framePromises = p.frames().map(async (frame) => {
//                 if (frame.isDetached()) return false;
//                 try {
//                     return await frame.evaluate(() => {
//                         const v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && !v.paused && v.currentTime > 0);
//                     });
//                 } catch(err) { return false; }
//             });
            
//             const results = await Promise.all(framePromises);
//             const isReady = results.some(r => r === true);
            
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; // 3 baar tasalli karega
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
//         const framePromises = p.frames().map(async (frame) => {
//             if (frame.isDetached()) return null;
//             try {
//                 return await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("stream error") || bodyText.includes("stream unavailable") || bodyText.includes("404") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         // Video dhundne ki ninja technique
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         for (let v of videos) {
//                             if (v.clientWidth > 10 || !v.paused) {
//                                 let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
//                                 return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
//                             }
//                         }
//                         return null;
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
//                 ]);
//             } catch (err) { return null; }
//         });

//         const results = await Promise.all(framePromises);
        
//         // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
//         for (let res of results) {
//             if (res && res.status === 'CRITICAL_ERROR') return res;
//             if (res && res.status === 'HEALTHY') return res;
//         }
        
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }
// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; 
//     let lastDecodedFrames = -1; 
//     let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 5) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
//             if (isTimeStuck) {
//                 // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
//                 if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenTimestamp = Date.now();
                
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             try { 
//                 await page.goto('about:blank'); 
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const bgAudiosInput = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100';
//         const audioConfigs = bgAudiosInput.split(',').map(a => a.trim()).filter(a => a.length > 0);
        
//         for (let config of audioConfigs) {
//             let parts = config.split('::');
//             let audioFile = parts[0].trim();
//             let rawVolume = parts.length > 1 ? parts[1].trim() : '100';
            
//             let tempPath = path.join(process.cwd(), audioFile);
//             if (fs.existsSync(tempPath)) {
//                 let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//                 let ffplayVolume = volNumber / 100;
//                 let aProc = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, tempPath]);
//                 audioProcesses.push(aProc);
//                 console.log(`[🎵] Playing Background Audio: ${audioFile} at ${volNumber}% volume`);
//             } else {
//                 console.log(`[❌] Background Audio NOT found: ${audioFile}`);
//             }
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcesses && audioProcesses.length > 0) { audioProcesses.forEach(ap => { try { ap.kill('SIGKILL'); } catch(e) {} }); audioProcesses = []; }
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
// else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//             const server = process.env.SERVER_SELECTION || 'None';
//             const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//             const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//             const blackOverlayOpacity = process.env.BLACK_OVERLAY_OPACITY || '100';
//             const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON';
//             const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//             const bgAudiosInputStatus = process.env.BACKGROUND_AUDIOS || 'audio804.mp3::100'; 
//             const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//             const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//             const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//             const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//             const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//             const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//             const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
            
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f black_overlay_opacity="${blackOverlayOpacity}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audios="${bgAudiosInputStatus}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => { await cleanup(); process.exit(0); }, 300000); 
//         } catch (err) { }
//     }, 21000000); // 6 hours
// }

// mainLoop();





















// =================== yeh teeek hai ok iss me eek new update add karty hai 2 audio ko play karey like please share into 5 groups etc ==================
// hhhhhhhhhhhhhhhhhhhhh
// jjjjjjjjjjjjjjjjjjjjjjjj



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const BLACK_OVERLAY_OPACITY = process.env.BLACK_OVERLAY_OPACITY || '100';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF';
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcess = null;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode, opacityVal) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let opDecimal = parseInt(opacityVal) / 100;
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important; opacity: ${opDecimal} !important;`;
                        
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY, BLACK_OVERLAY_OPACITY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { // Max 20 seconds
//         try {
//             const framePromises = p.frames().map(async (frame) => {
//                 if (frame.isDetached()) return false;
//                 try {
//                     return await frame.evaluate(() => {
//                         const v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && !v.paused && v.currentTime > 0);
//                     });
//                 } catch(err) { return false; }
//             });
            
//             const results = await Promise.all(framePromises);
//             const isReady = results.some(r => r === true);
            
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; // 3 baar tasalli karega
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
//         const framePromises = p.frames().map(async (frame) => {
//             if (frame.isDetached()) return null;
//             try {
//                 return await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("stream error") || bodyText.includes("stream unavailable") || bodyText.includes("404") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         // Video dhundne ki ninja technique
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         for (let v of videos) {
//                             if (v.clientWidth > 10 || !v.paused) {
//                                 let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
//                                 return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
//                             }
//                         }
//                         return null;
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
//                 ]);
//             } catch (err) { return null; }
//         });

//         const results = await Promise.all(framePromises);
        
//         // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
//         for (let res of results) {
//             if (res && res.status === 'CRITICAL_ERROR') return res;
//             if (res && res.status === 'HEALTHY') return res;
//         }
        
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }
// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; 
//     let lastDecodedFrames = -1; 
//     let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 5) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
//             if (isTimeStuck) {
//                 // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
//                 if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenTimestamp = Date.now();
                
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             try { 
//                 await page.goto('about:blank'); 
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const possibleAudioExts = ['.mp3', '.wav', '.m4a', '.aac', '.mp4']; let foundAudioPath = null;
//         for (let ext of possibleAudioExts) { let tempPath = path.join(process.cwd(), `audio804${ext}`); if (fs.existsSync(tempPath)) { foundAudioPath = tempPath; break; } }
        
//         if (foundAudioPath) { 
//             const rawVolume = process.env.BACKGROUND_AUDIO_VOLUME || '100';
//             let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//             let ffplayVolume = volNumber / 100; 
//             audioProcess = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, foundAudioPath]); 
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcess) { try { audioProcess.kill('SIGKILL'); } catch(e) { } audioProcess = null; } 
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
// else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//             const server = process.env.SERVER_SELECTION || 'None';
//             const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//             const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//             const blackOverlayOpacity = process.env.BLACK_OVERLAY_OPACITY || '100';
//             const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON';
//             const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//             const bgAudioVolumeStatus = process.env.BACKGROUND_AUDIO_VOLUME || '100'; 
//             const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//             const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//             const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//             const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//             const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//             const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//             const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
            
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f black_overlay_opacity="${blackOverlayOpacity}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audio_volume="${bgAudioVolumeStatus}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => { await cleanup(); process.exit(0); }, 300000); 
//         } catch (err) { }
//     }, 21000000); // 6 hours
// }

// mainLoop();











// ====================== Alhamduualh sab iss par tha alhamdullah , eek update aya hai dlhd chut yee mei , new iframe hai jukey screen black hu jata hau lekina udio huty hai and helaty stream huta jjiss see sara view khrb  ======================
// hhhhhhaahahahahahaahahahahahahahahahah
// hahahahahahahahahahaahahahahahahahahahah



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const BLACK_OVERLAY_OPACITY = process.env.BLACK_OVERLAY_OPACITY || '100';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF';
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcess = null;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode, opacityVal) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let opDecimal = parseInt(opacityVal) / 100;
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important; opacity: ${opDecimal} !important;`;
                        
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY, BLACK_OVERLAY_OPACITY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 5vmin; font-weight: bold; color: #ffcc00; margin-bottom: 1vh; text-shadow: 2px 2px 4px #000;">
//                                 ${icon} MATCH IS LIVE! ${icon}
//                             </div>
//                             <div style="font-size: 3.5vmin; color: #ffffff; background: rgba(0,0,0,0.6); padding: 5px 10px; border-radius: 8px; margin-bottom: 1.5vh; display: inline-block;">
//                                 (Display is limited here due to platform policies)
//                             </div>
//                             <div style="font-size: 4.5vmin; line-height: 1.3;">
//                                 Watch FULL HD & Clear Screen Here:
//                             </div>
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { // Max 20 seconds
//         try {
//             const framePromises = p.frames().map(async (frame) => {
//                 if (frame.isDetached()) return false;
//                 try {
//                     return await frame.evaluate(() => {
//                         const v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && !v.paused && v.currentTime > 0);
//                     });
//                 } catch(err) { return false; }
//             });
            
//             const results = await Promise.all(framePromises);
//             const isReady = results.some(r => r === true);
            
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; // 3 baar tasalli karega
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
//         const framePromises = p.frames().map(async (frame) => {
//             if (frame.isDetached()) return null;
//             try {
//                 return await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("stream error") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         // Video dhundne ki ninja technique
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         for (let v of videos) {
//                             if (v.clientWidth > 10 || !v.paused) {
//                                 let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
//                                 return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
//                             }
//                         }
//                         return null;
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
//                 ]);
//             } catch (err) { return null; }
//         });

//         const results = await Promise.all(framePromises);
        
//         // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
//         for (let res of results) {
//             if (res && res.status === 'CRITICAL_ERROR') return res;
//             if (res && res.status === 'HEALTHY') return res;
//         }
        
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }
// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; 
//     let lastDecodedFrames = -1; 
//     let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 5) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
//             if (isTimeStuck) {
//                 // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
//                 if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenTimestamp = Date.now();
                
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             try { 
//                 await page.goto('about:blank'); 
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const possibleAudioExts = ['.mp3', '.wav', '.m4a', '.aac', '.mp4']; let foundAudioPath = null;
//         for (let ext of possibleAudioExts) { let tempPath = path.join(process.cwd(), `audio804${ext}`); if (fs.existsSync(tempPath)) { foundAudioPath = tempPath; break; } }
        
//         if (foundAudioPath) { 
//             const rawVolume = process.env.BACKGROUND_AUDIO_VOLUME || '100';
//             let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//             let ffplayVolume = volNumber / 100; 
//             audioProcess = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, foundAudioPath]); 
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcess) { try { audioProcess.kill('SIGKILL'); } catch(e) { } audioProcess = null; } 
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
// else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//             const server = process.env.SERVER_SELECTION || 'None';
//             const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//             const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//             const blackOverlayOpacity = process.env.BLACK_OVERLAY_OPACITY || '100';
//             const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON';
//             const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//             const bgAudioVolumeStatus = process.env.BACKGROUND_AUDIO_VOLUME || '100'; 
//             const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//             const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//             const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//             const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//             const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//             const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//             const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
            
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f black_overlay_opacity="${blackOverlayOpacity}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audio_volume="${bgAudioVolumeStatus}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => { await cleanup(); process.exit(0); }, 300000); 
//         } catch (err) { }
//     }, 21000000); // 6 hours
// }

// mainLoop();












// ================== Alhamdullah yeh use keya hai abey bas yeh tiny holes k opcity ko control karty hai =============
// hhhhhhhhhhhhhhhhhhhh
// jjjjjjjjjjjjjjjjjjjjjjj
// hhhhhhhhhhhhhhhhhhhhhhhhh



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF'; 
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcess = null;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important;`;
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 5vmin; font-weight: bold; color: #ffcc00; margin-bottom: 1vh; text-shadow: 2px 2px 4px #000;">
//                                 ${icon} MATCH IS LIVE! ${icon}
//                             </div>
//                             <div style="font-size: 3.5vmin; color: #ffffff; background: rgba(0,0,0,0.6); padding: 5px 10px; border-radius: 8px; margin-bottom: 1.5vh; display: inline-block;">
//                                 (Display is limited here due to platform policies)
//                             </div>
//                             <div style="font-size: 4.5vmin; line-height: 1.3;">
//                                 Watch FULL HD & Clear Screen Here:
//                             </div>
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { // Max 20 seconds
//         try {
//             const framePromises = p.frames().map(async (frame) => {
//                 if (frame.isDetached()) return false;
//                 try {
//                     return await frame.evaluate(() => {
//                         const v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && !v.paused && v.currentTime > 0);
//                     });
//                 } catch(err) { return false; }
//             });
            
//             const results = await Promise.all(framePromises);
//             const isReady = results.some(r => r === true);
            
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; // 3 baar tasalli karega
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         // Saare iframes ko ek sath check karne ki logic (Parallel Promises)
//         const framePromises = p.frames().map(async (frame) => {
//             if (frame.isDetached()) return null;
//             try {
//                 return await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("stream error") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         // Video dhundne ki ninja technique
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         for (let v of videos) {
//                             if (v.clientWidth > 10 || !v.paused) {
//                                 let frames = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality().totalVideoFrames : (v.webkitDecodedFrameCount || 0);
//                                 return { status: 'HEALTHY', currentTime: v.currentTime, decodedFrames: frames };
//                             }
//                         }
//                         return null;
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
//                 ]);
//             } catch (err) { return null; }
//         });

//         const results = await Promise.all(framePromises);
        
//         // Agar kisi ek iframe mein bhi video mil gayi toh HEALTHY return kar do
//         for (let res of results) {
//             if (res && res.status === 'CRITICAL_ERROR') return res;
//             if (res && res.status === 'HEALTHY') return res;
//         }
        
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }
// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; 
//     let lastDecodedFrames = -1; 
//     let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 5) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/5). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime && lastDecodedFrames === activeStatus.decodedFrames);
            
//             if (isTimeStuck) {
//                 // 🛡️ PATIENCE BOOST: 20 seconds tak buffer/freeze bardasht karega!
//                 if (Date.now() - frozenTimestamp > 20000) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenTimestamp = Date.now();
                
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Time: ${activeStatus.currentTime !== undefined ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 console.log(`[⏳] Ignoring ${activeStatus.status} because stream is in WARM-UP phase.`);
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             try { 
//                 await page.goto('about:blank'); 
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }
            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; lastDecodedFrames = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const possibleAudioExts = ['.mp3', '.wav', '.m4a', '.aac', '.mp4']; let foundAudioPath = null;
//         for (let ext of possibleAudioExts) { let tempPath = path.join(process.cwd(), `audio804${ext}`); if (fs.existsSync(tempPath)) { foundAudioPath = tempPath; break; } }
        
//         if (foundAudioPath) { 
//             const rawVolume = process.env.BACKGROUND_AUDIO_VOLUME || '100';
//             let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//             let ffplayVolume = volNumber / 100; 
//             audioProcess = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, foundAudioPath]); 
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcess) { try { audioProcess.kill('SIGKILL'); } catch(e) { } audioProcess = null; } 
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
// else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//             const server = process.env.SERVER_SELECTION || 'None';
//             const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//             const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//             const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON'; 
//             const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//             const bgAudioVolumeStatus = process.env.BACKGROUND_AUDIO_VOLUME || '100'; 
//             const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//             const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//             const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//             const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//             const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//             const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//             const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
            
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audio_volume="${bgAudioVolumeStatus}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => { await cleanup(); process.exit(0); }, 300000); 
//         } catch (err) { }
//     }, 21000000); // 6 hours
// }

// mainLoop();






// 1

// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;
// const NO_REFRESH_DOMAINS = ['youtube.com', 'facebook.com', 'streamed.pk', 'cricstreams.', 'sport4u.online', 'website-vercel-helper-d-jaja-3-2.vercel.app', 'websitestream.netlify.app'];

// // =========================================================================================
// // 🛠️ OUR CUSTOM OVERLAY ENV VARIABLES
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// const selectedFormat = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
// const ENABLE_BLACK_OVERLAY = process.env.ENABLE_BLACK_OVERLAY || 'OFF';
// const ENABLE_STREAM_AUDIO = process.env.ENABLE_STREAM_AUDIO !== 'OFF'; 
// const ENABLE_BACKGROUND_AUDIO = process.env.ENABLE_BACKGROUND_AUDIO === 'ON'; 
// const ENABLE_PIC_OVERLAY = process.env.ENABLE_PIC_OVERLAY === 'ON';
// const ENABLE_TEXT_OVERLAY = process.env.ENABLE_TEXT_OVERLAY === 'ON';
// const VIDEO_OVERLAY_MODE = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
// const VIDEO_OVERLAY_POSITION = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
// const VIDEO_SHOW_TIME = parseInt(process.env.VIDEO_SHOW_TIME) || 10;
// const VIDEO_HIDE_TIME = parseInt(process.env.VIDEO_HIDE_TIME) || 5;

// const WATERMARK_ICON_INPUT = process.env.WATERMARK_ICON || 'Football ⚽';
// let MATCH_ICON = '⚽';
// if (WATERMARK_ICON_INPUT.includes('Cricket')) MATCH_ICON = '🏏';
// else if (WATERMARK_ICON_INPUT.includes('Both')) MATCH_ICON = '⚽ 🏏';

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';
// const PIC_URLS_INPUT = process.env.PIC_URLS || '';

// // =========================================================================================
// // 🖼️ PIC OVERLAY PRELOAD (Base64 & Downloader)
// // =========================================================================================
// let picSequenceData = []; // Ab sirf string nahi, objects save honge { src, duration }

// async function loadAllPictures() {
//     if (!ENABLE_PIC_OVERLAY) return;
//     picSequenceData = [];
    
//     // 1. Local Images (2 Seconds = 2000ms)
//     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
//     let seqIndex = 1;
//     while(true) {
//         let found = false;
//         for (let ext of possiblePicExts) {
//             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
//             if (fs.existsSync(tempPath)) {
//                 let extName = ext.replace('.', '');
//                 if (extName === 'jpg') extName = 'jpeg';
//                 const base64Data = fs.readFileSync(tempPath).toString('base64');
//                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
//                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) break; 
//         seqIndex++;
//     }

//     // 2. URL Images Download (1 Second = 1000ms)
//     const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
//     for (let i = 0; i < urls.length; i++) {
//         try {
//             console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
//             const resp = await fetch(urls[i]);
//             const arrayBuffer = await resp.arrayBuffer();
//             const base64Data = Buffer.from(arrayBuffer).toString('base64');
//             const contentType = resp.headers.get('content-type') || 'image/jpeg';
//             picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
//             console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
//         } catch(e) {
//             console.log(`[❌] Failed to download URL Pic ${i+1}: ${urls[i]}`);
//         }
//     }
// }


// // async function loadAllPictures() {
// //     if (!ENABLE_PIC_OVERLAY) return;
// //     picSequenceData = [];
    
// //     // 1. Local Images (2 Seconds = 2000ms)
// //     const possiblePicExts = ['.png', '.jpg', '.jpeg', '.webp'];
// //     let seqIndex = 1;
// //     while(true) {
// //         let found = false;
// //         for (let ext of possiblePicExts) {
// //             let tempPath = path.join(process.cwd(), `picSequence${seqIndex}${ext}`);
// //             if (fs.existsSync(tempPath)) {
// //                 let extName = ext.replace('.', '');
// //                 if (extName === 'jpg') extName = 'jpeg';
// //                 const base64Data = fs.readFileSync(tempPath).toString('base64');
// //                 picSequenceData.push({ src: `data:image/${extName};base64,${base64Data}`, duration: 2000 });
// //                 console.log(`[🖼️] Found Local Sequence Pic: picSequence${seqIndex}${ext} (2s)`);
// //                 found = true;
// //                 break;
// //             }
// //         }
// //         if (!found) break; 
// //         seqIndex++;
// //     }

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     // const urls = PIC_URLS_INPUT.split(',').map(u => u.trim()).filter(u => u.length > 0);

// //     // 2. Dynamic Input Images (URL ya Base64) (1 Second = 1000ms)
// //     // Filter updated to allow both 'http' and 'data:image'
// //     const urls = PIC_URLS_INPUT.split('::').map(u => u.trim()).filter(u => u.length > 0);
    
// //     for (let i = 0; i < urls.length; i++) {
// //         try {
// //             if (urls[i].startsWith('data:image')) {
// //                 // Agar input pehle se Base64 hai, toh seedha add kar do (Download ki zaroorat nahi)
// //                 picSequenceData.push({ src: urls[i], duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded Base64 Pic ${i+1} (1s)`);
                
// //             } else if (urls[i].startsWith('http')) {
// //                 // Agar normal URL hai, toh fetch karke Base64 banalo
// //                 console.log(`[🖼️] Downloading URL Pic ${i+1}...`);
// //                 const resp = await fetch(urls[i]);
// //                 const arrayBuffer = await resp.arrayBuffer();
// //                 const base64Data = Buffer.from(arrayBuffer).toString('base64');
// //                 const contentType = resp.headers.get('content-type') || 'image/jpeg';
                
// //                 picSequenceData.push({ src: `data:${contentType};base64,${base64Data}`, duration: 1000 });
// //                 console.log(`[🖼️] Successfully loaded URL Pic ${i+1} (1s)`);
// //             }
// //         } catch(e) {
// //             console.log(`[❌] Failed to process Pic ${i+1}`);
// //         }
// //     }
// // }


// // =========================================================================================
// // 🎬 VIDEO OVERLAY PRELOAD (Base64)
// // =========================================================================================
// let videoOverlayBase64 = null;
// if (VIDEO_OVERLAY_MODE !== 'OFF') {
//     const videoOverlayPath = path.join(process.cwd(), 'video', 'video1.mp4'); 
//     if (fs.existsSync(videoOverlayPath)) {
//         const base64Data = fs.readFileSync(videoOverlayPath).toString('base64');
//         videoOverlayBase64 = `data:video/mp4;base64,${base64Data}`;
//         console.log(`[🎬] Found Video Overlay: video1.mp4 loaded into memory successfully.`);
//     } else {
//         console.log(`[🎬] Video Overlay NOT found. Skipping video overlay function.`);
//     }
// }

// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }

// if (selectedFormat.includes('Shorts')) { let temp = RES_W; RES_W = RES_H; RES_H = temp; }
// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & PHASE SCHEDULER
// // =========================================================================================
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// if (rawUrls === '') rawUrls = 'https://dadocric.st/player.php?id=starsp3&v=m::None';

// let phases = [];
// rawUrls.split('|').forEach(phaseStr => {
//     let parts = phaseStr.split('::');
//     let urlsPart = parts[0].trim();
//     let durationPart = parts.length > 1 ? parts[1].trim() : 'None';
    
//     let phaseUrls = urlsPart.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
//         if (trimmed.startsWith('!')) { hangThreshold = 20000; trimmed = trimmed.substring(1); }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
//         return { url: trimmed, hangTime: hangThreshold };
//     }).filter(u => u.url !== 'https://');
    
//     if (phaseUrls.length > 0) {
//         phases.push({ urls: phaseUrls, durationStr: durationPart, durationMs: parseDurationToMs(durationPart) });
//     }
// });

// if (phases.length === 0) {
//     phases.push({ urls: [{ url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }], durationStr: 'None', durationMs: null });
// }

// let currentPhaseIndex = 0;
// let urlList = phases[currentPhaseIndex].urls;
// let currentUrlIndex = 0;
// let phaseEndTime = null;

// console.log(`\n[📅] TOTAL SCHEDULED MATCHES/PHASES: ${phases.length}`);
// phases.forEach((p, i) => console.log(`  -> Phase ${i + 1}: ${p.urls.length} URLs | Duration: ${p.durationStr}`));

// // Single System Variables
// let browserArgs = []; 
// let browser = null; 
// let page = null;
// let obsProcess = null; let audioProcess = null;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ OVERLAYS (Restored to Original)
// // =========================================================================================
// async function injectBlackOverlay(page) {
//     if (!page || ENABLE_BLACK_OVERLAY === 'OFF') return;
//     try {
//         await page.evaluate((overlayMode) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-black-overlay')) {
//                         const container = document.createElement('div');
//                         container.id = 'sport4u-black-overlay';
//                         let baseCss = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: 2147483646 !important;`;
//                         if (overlayMode.includes('Borders')) {
//                             container.style.cssText = baseCss;
//                             const topBlock = document.createElement('div'); topBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 40% !important; background-color: #000000 !important;`;
//                             const bottomBlock = document.createElement('div'); bottomBlock.style.cssText = `position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; height: 30% !important; background-color: #000000 !important;`;
//                             const leftBlock = document.createElement('div'); leftBlock.style.cssText = `position: absolute !important; top: 0 !important; left: 0 !important; width: 20% !important; height: 100% !important; background-color: #000000 !important;`;
//                             const rightBlock = document.createElement('div'); rightBlock.style.cssText = `position: absolute !important; top: 0 !important; right: 0 !important; width: 40% !important; height: 100% !important; background-color: #000000 !important;`;
//                             container.appendChild(topBlock); container.appendChild(bottomBlock); container.appendChild(leftBlock); container.appendChild(rightBlock);
//                         } else if (overlayMode.includes('Full Black')) { container.style.cssText = baseCss + `background-color: #000000 !important;`; } 
//                         else if (overlayMode.includes('Tiny Holes')) { container.style.cssText = baseCss + `background-image: radial-gradient(circle, transparent 1px, #000000 1.5px) !important; background-size: 6px 6px !important; background-color: transparent !important;`; }
//                         let target = document.body || document.documentElement; if (target) target.appendChild(container);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, ENABLE_BLACK_OVERLAY);
//     } catch (e) {}
// }

// async function injectOfficialWatermark(page) {
//      if (!page || !ENABLE_TEXT_OVERLAY) return;
//      try {
//         await page.evaluate((icon) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-watermark')) {
//                         const overlay = document.createElement('div'); overlay.id = 'sport4u-watermark';
                        
//                         overlay.innerHTML = `
//                             <div style="font-size: 5vmin; font-weight: bold; color: #ffcc00; margin-bottom: 1vh; text-shadow: 2px 2px 4px #000;">
//                                 ${icon} MATCH IS LIVE! ${icon}
//                             </div>
//                             <div style="font-size: 3.5vmin; color: #ffffff; background: rgba(0,0,0,0.6); padding: 5px 10px; border-radius: 8px; margin-bottom: 1.5vh; display: inline-block;">
//                                 (Display is limited here due to platform policies)
//                             </div>
//                             <div style="font-size: 4.5vmin; line-height: 1.3;">
//                                 Watch FULL HD & Clear Screen Here:
//                             </div>
//                             <div style="font-size: 4vmin; margin-top: 1vh;">
//                                 🔍 Search on Google 👉 
//                                 <span style="color: #ff4d4d; font-size: 5.5vmin; font-weight: bold; background: #ffffff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 0.5vh;">
//                                     sport4u.online
//                                 </span>
//                             </div>
//                             <div style="font-size: 3.5vmin; margin-top: 2vh; color: #dddddd; text-shadow: 1px 1px 2px #000;">
//                                 Guys, please support me ❤️🙏
//                             </div>
//                         `;
                        
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; z-index: 2147483647 !important; background-color: rgba(0, 0, 0, 0.70) !important; color: #ffffff !important; padding: 1vh 2vw !important; font-family: 'Segoe UI', Arial, sans-serif !important; font-size: 4vmin !important; font-weight: bold !important; text-align: center !important; border-top: 0.3vmin solid #e50914 !important; border-bottom: 0.3vmin solid #e50914 !important; width: 100vw !important; height: auto !important; max-height: none !important; overflow: visible !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: center !important; pointer-events: none !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, MATCH_ICON); 
//     } catch (e) {}
// }

// async function injectRandomPicOverlay(page) {
//     if (!page || !ENABLE_PIC_OVERLAY || picSequenceData.length === 0) return;
//     try {
//         await page.evaluate((picArray) => {
//             setInterval(() => {
//                 try {
//                     if (!document.getElementById('sport4u-random-pic')) {
//                         const overlay = document.createElement('img'); overlay.id = 'sport4u-random-pic';
//                         overlay.style.cssText = `position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: contain !important; z-index: 2147483647 !important; pointer-events: none !important; display: none !important; background-color: transparent !important;`;
//                         let target = document.body || document.documentElement; if (target) target.appendChild(overlay);
                        
//                         function triggerRandomShow() {
//                             if (!document.getElementById('sport4u-random-pic')) return; 
//                             const nextShowDelay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
//                             setTimeout(() => {
//                                 const img = document.getElementById('sport4u-random-pic');
//                                 if (img) {
//                                     img.style.setProperty('display', 'block', 'important');
//                                     let currentSeqIndex = 0; 
//                                     img.src = picArray[currentSeqIndex].src; 
                                    
//                                     function showNext() {
//                                         currentSeqIndex++;
//                                         if(currentSeqIndex >= picArray.length) { 
//                                             img.style.setProperty('display', 'none', 'important'); 
//                                             triggerRandomShow(); 
//                                         } else { 
//                                             img.src = picArray[currentSeqIndex].src; 
//                                             setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                         }
//                                     }
//                                     setTimeout(showNext, picArray[currentSeqIndex].duration);
//                                 }
//                             }, nextShowDelay);
//                         }
//                         triggerRandomShow();
//                     }
//                 } catch(e) {}
//             }, 2000); 
//         }, picSequenceData);
//     } catch (e) {}
// }

// async function injectVideoOverlay(page) {
//     if (!page || !videoOverlayBase64 || VIDEO_OVERLAY_MODE === 'OFF') return;
//     try {
//         await page.evaluate((base64Video, mode, position, showSecs, hideSecs) => {
//             let videoState = 'waiting'; 
//             let secondsCounter = 0;
//             setInterval(() => {
//                 try {
//                     let vid = document.getElementById('sport4u-video-overlay');
//                     if (!vid) {
//                         vid = document.createElement('video');
//                         vid.id = 'sport4u-video-overlay'; vid.src = base64Video; vid.muted = true; vid.playsInline = true; vid.loop = true;
                        
//                         // Smart Positioning System
//                         let posCss = '';
//                         if (position === 'Top Left') posCss = 'top: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Top Right') posCss = 'top: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Top Center') posCss = 'top: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
//                         else if (position === 'Middle Center') posCss = 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;';
//                         else if (position === 'Bottom Left') posCss = 'bottom: 3vh !important; left: 2vw !important;';
//                         else if (position === 'Bottom Right') posCss = 'bottom: 3vh !important; right: 2vw !important;';
//                         else if (position === 'Bottom Center') posCss = 'bottom: 3vh !important; left: 50% !important; transform: translateX(-50%) !important;';
                        
//                         vid.style.cssText = `position: fixed !important; width: 25vw !important; z-index: 2147483648 !important; pointer-events: none !important; background-color: transparent !important; transition: opacity 1s ease-in-out !important; border-radius: 12px !important; box-shadow: 0px 10px 30px rgba(0,0,0,0.8) !important; opacity: 0 !important; ${posCss}`;
                        
//                         let target = document.body || document.documentElement; if (target) target.appendChild(vid);
                        
//                         if (mode.includes('Always ON')) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.play().catch(()=>{}); 
//                         }
//                         videoState = 'waiting'; secondsCounter = 0;
//                     }
//                     if (mode.includes('Always ON')) { if (vid.paused) vid.play().catch(()=>{}); return; }
                    
//                     if (videoState === 'waiting') {
//                         secondsCounter++;
//                         if (secondsCounter >= hideSecs) { 
//                             vid.style.setProperty('opacity', '1', 'important'); 
//                             vid.currentTime = 0; 
//                             vid.play().catch(()=>{}); 
//                             videoState = 'playing'; 
//                             secondsCounter = 0; 
//                         }
//                     } else if (videoState === 'playing') {
//                         secondsCounter++;
//                         if (secondsCounter >= showSecs) { 
//                             vid.style.setProperty('opacity', '0', 'important'); 
//                             vid.pause(); 
//                             videoState = 'waiting'; 
//                             secondsCounter = 0; 
//                         }
//                     }
//                 } catch(e) {}
//             }, 1000); 
//         }, videoOverlayBase64, VIDEO_OVERLAY_MODE, VIDEO_OVERLAY_POSITION, VIDEO_SHOW_TIME, VIDEO_HIDE_TIME);
//     } catch (e) {}
// }

// async function applyAllOverlays(page) {
//     if(!page) return;
//     await injectBlackOverlay(page);
//     await injectOfficialWatermark(page);
//     await injectRandomPicOverlay(page);
//     await injectVideoOverlay(page);
// }

// // =========================================================================================
// // 🛡️ NETWORK BLOCKER & FIREWALL
// // =========================================================================================
// async function setupNetworkAdBlocker(p) {
//     if (!p) return;
//     try {
//         await p.setRequestInterception(true);
//         p.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === p.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) {}
// }

// async function applyPreloadFirewall(p) {
//     if (!p) return;
//     try {
//         await p.evaluateOnNewDocument(() => {
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') init.mode = 'open'; 
//                 const shadowRoot = originalAttachShadow.call(this, init);
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) { this.remove(); }
//                 });
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };
//             window.alert = function() {}; window.confirm = function() { return true; }; window.prompt = function() { return null; }; window.open = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', { configurable: true, get: function() { return null; }, set: function() { return null; } });
//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         e.preventDefault(); e.stopPropagation(); return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             // FIX 1: Pichli baar wali opacity: 0 hata di taake video fullscreen ho sake
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; } in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }`;
//             document.documentElement.appendChild(style);

//             // FIX 2: Naya URL khulte hi puri website ke upar Instant Black Shield laga di
//             if (window.self === window.top) {
//                 const observer = new MutationObserver(() => {
//                     if (document.body && !document.getElementById('instant-black-shield')) {
//                         const shield = document.createElement('div');
//                         shield.id = 'instant-black-shield';
//                         shield.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: #000000 !important; z-index: 2147483646 !important;';
//                         document.documentElement.appendChild(shield);
//                         observer.disconnect();
//                     }
//                 });
//                 observer.observe(document.documentElement, { childList: true, subtree: true });
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🛡️ UI OVERLAYS
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important; pointer-events: all !important; }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             // FIX 3: Jab video ready ho jaye, toh Spinner aur Black Shield dono ko aik sath hata do
//             const overlays = document.querySelectorAll('#smart-stream-overlay, #instant-black-shield');
//             overlays.forEach(overlay => overlay.remove());
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true }); fs.mkdirSync(scenesDir, { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'), `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);
    
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Advanced
// [AdvOut]
// TrackIndex=1
// RecType=Standard
// Encoder=obs_x264
// [obs_x264]
// bitrate=${BITRATE}
// keyint_sec=2
// preset=ultrafast
// profile=main
// tune=zerolatency
// `);

//     let rtmpServer = ""; let streamKey = "";
//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); 
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
//             { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// async function forcePlayerFullscreen(p) {
//     if (!p) return;
//     try {
//         await p.evaluate(() => {
//             document.documentElement.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('background-color', 'black', 'important');
//             document.body.style.setProperty('overflow', 'hidden', 'important');
//             document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//             let iframes = Array.from(document.querySelectorAll('iframe'));
//             let mainIframe = null; let maxScore = -1;
//             iframes.forEach(ifr => {
//                 let w = ifr.clientWidth; let h = ifr.clientHeight; let area = w * h;
//                 if (area < 5000) return; let score = area;
//                 if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
//                 if (h > w) score = -1;
//                 if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//             });

//             if (mainIframe) {
//                 iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                 mainIframe.style.setProperty('position', 'fixed', 'important');
//                 mainIframe.style.setProperty('top', '0px', 'important');
//                 mainIframe.style.setProperty('left', '0px', 'important');
//                 mainIframe.style.setProperty('width', '100vw', 'important');
//                 mainIframe.style.setProperty('height', '100vh', 'important');
//                 mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                 mainIframe.style.setProperty('background-color', 'black', 'important');
//                 mainIframe.style.setProperty('border', 'none', 'important');
//                 mainIframe.style.setProperty('opacity', '1', 'important');
//                 mainIframe.style.setProperty('display', 'block', 'important');
//                 mainIframe.style.setProperty('visibility', 'visible', 'important');
//             }

//             const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not(#sport4u-watermark):not(#sport4u-black-overlay):not(#sport4u-random-pic):not(#sport4u-video-overlay)';
//             document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });
//         });
//     } catch(e) {}
// }

// async function waitForActiveVisualReady(p) {
//     if (!p) return false;
//     let readyCount = 0;
//     for (let i = 0; i < 40; i++) { 
//         try {
//             let isReady = false;
//             for (const frame of p.frames()) {
//                 try {
//                     if (frame.isDetached()) continue;
//                     const frameReady = await frame.evaluate(() => {
//                         let v = document.querySelector('video:not(#sport4u-video-overlay)');
//                         return (v && v.clientWidth > 50 && !v.paused && v.currentTime > 0);
//                     });
//                     if (frameReady) { isReady = true; break; }
//                 } catch(err) {}
//             }
//             if (isReady) readyCount++; else readyCount = 0;
//             if (readyCount >= 3) return true; 
//         } catch(e) {}
//         await new Promise(r => setTimeout(r, 500));
//     }
//     return false;
// }

// async function triggerSmartUnmute(p) {
//     for (const frame of p.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     if (matchesText || matchesJS) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
//                         if (isVisible) { try { el.click(); } catch(e) {} try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(media => { if (media.muted) { media.muted = false; media.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// async function initializeVideo(p, startMuted) {
//     if (!p) return;
    
//     // 🔴 FIX 1: Agar YAML mein audio OFF hai, toh stream ko permanently mute kar do
//     if (!ENABLE_STREAM_AUDIO) startMuted = true;
    
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await p.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);
//                     if (clickSuccess) { serverClicked = true; await new Promise(r => setTimeout(r, 2000)); await p.bringToFront(); } 
//                     else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; let attempts = 0;

//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of p.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video:not(#sport4u-video-overlay)').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
//                         return playing;
//                     });
//                     if (autoPlayed) { isVideoPlaying = true; break; }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
//                         if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of p.frames()) {
//             try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video:not(#sport4u-video-overlay)'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; }); if (isRealLiveStream) { targetFrame = frame; break; } } catch (e) { }
//         }

//         await forcePlayerFullscreen(p);

//         await p.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = iframes.find(ifr => ifr.style.width === '100vw' && ifr.style.height === '100vh');
//                     if (mainIframe) {
//                         iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); } });
//                     }
//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         if(targetFrame) {
//             await targetFrame.evaluate((muteVideo) => {
//                 window.isStreamMuted = muteVideo; 
//                 setInterval(() => {
//                     try {
//                         const style = document.createElement('style');
//                         style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                         document.head.appendChild(style);

//                         const mediaElements = document.querySelectorAll('video:not(#sport4u-video-overlay), audio');
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let realVideo = null;

//                         mediaElements.forEach(media => { media.muted = window.isStreamMuted; media.volume = window.isStreamMuted ? 0.0 : 1.0; });
//                         if (!window.isStreamMuted) document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });

//                         for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
//                         if (!realVideo && videos.length > 0) realVideo = videos[0];

//                         if (realVideo) { 
//                             let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
//                             playerWrap.style.setProperty('position', 'fixed', 'important');
//                             playerWrap.style.setProperty('top', '0px', 'important');
//                             playerWrap.style.setProperty('left', '0px', 'important');
//                             playerWrap.style.setProperty('width', '100vw', 'important');
//                             playerWrap.style.setProperty('height', '100vh', 'important');
//                             playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                             playerWrap.style.setProperty('background-color', 'black', 'important');
//                             playerWrap.style.setProperty('opacity', '1', 'important');
//                             playerWrap.style.setProperty('visibility', 'visible', 'important');
//                             playerWrap.style.setProperty('display', 'block', 'important');
//                             if (playerWrap !== realVideo) { realVideo.style.setProperty('width', '100%', 'important'); realVideo.style.setProperty('height', '100%', 'important'); }
//                             realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         }
//                     } catch(err) {}
//                 }, 500); 
//             }, startMuted).catch(() => {});
//         }

//     } catch (e) { }

//     // FIX: Smart Unmute tab hi chalega jab YAML mein Audio ON ho
//     if (!startMuted && ENABLE_STREAM_AUDIO) { await triggerSmartUnmute(p); await new Promise(r => setTimeout(r, 1000)); }
    
//     // INJECT ALL OVERLAYS NOW
//     await applyAllOverlays(p);
// }

// // 🛡️ SUPER ROBUST HEALTH CHECKER
// async function checkPageStatus(p) {
//     if (!p) return { status: 'DEAD' };
//     try {
//         let anyFrameFoundVideo = false;
//         for (const frame of p.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
//                         if (bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden") || bodyText.includes("access denied")) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
//                         const videos = Array.from(document.querySelectorAll('video:not(#sport4u-video-overlay)'));
//                         let targetV = videos.find(v => v.clientWidth > 50 && v.clientHeight > 50);
                        
//                         if (targetV && !targetV.ended) {
//                             let frames = targetV.getVideoPlaybackQuality ? targetV.getVideoPlaybackQuality().totalVideoFrames : (targetV.webkitDecodedFrameCount || 0);
//                             return { status: 'HEALTHY', currentTime: targetV.currentTime, decodedFrames: frames };
//                         }
//                         return null; 
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 8000))
//                 ]);
                
//                 if (result && result.status === 'CRITICAL_ERROR') return result;
//                 if (result && result.status === 'HEALTHY') return result;
//             } catch (err) {}
//         }
//         return { status: 'LOADING_OR_DEAD' }; 
//     } catch (e) { return { status: 'DEAD' }; }
// }

// // =========================================================================================
// // 🔄 SINGLE-SYSTEM WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastTime = -1; let frozenTimestamp = Date.now();
//     let ticks = 0; let setupTime = Date.now(); 
//     let isWarmup = true; const WARMUP_MS = 15000; 
//     let strikes = 0; 
//     let streamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) {
//             console.log('\n[🚨] BROWSER DISCONNECTED -> RESTARTING SYSTEM');
//             return; 
//         }

//         let currentUrlStr = urlList[currentUrlIndex].url;
//         let activeStatus = await checkPageStatus(page);

//         // 📅 DYNAMIC SCHEDULER CHECK
//         if (phaseEndTime && Date.now() >= phaseEndTime) {
//             if (currentPhaseIndex + 1 < phases.length) {
//                 console.log(`\n[⏰] PHASE TIME UP! Switching to Next Phase...`);
//                 currentPhaseIndex++; urlList = phases[currentPhaseIndex].urls; currentUrlIndex = 0;
//                 currentUrlStr = urlList[currentUrlIndex].url;
//                 phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//                 activeStatus.status = 'PHASE_CHANGE'; 
//             } else { phaseEndTime = null; }
//         }

//         // STRIKE LOGIC FOR FALSE ALARMS
//         if (activeStatus.status === 'DEAD' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'LOADING_OR_DEAD') {
//             strikes++;
//             if (strikes < 3) {
//                 console.log(`[⚠️] WARNING: Stream reported ${activeStatus.status} (Strike ${strikes}/3). Verifying...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             } else {
//                 activeStatus.status = 'DEAD'; 
//             }
//         } else {
//             strikes = 0; 
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmup) {
//             let elapsedMs = Date.now() - streamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => currentUrlStr.includes(domain));
//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) { activeStatus.status = 'FORCE_REFRESH'; }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             let isTimeStuck = (lastTime !== -1 && activeStatus.currentTime === lastTime);
//             if (isTimeStuck) {
//                 if (Date.now() - frozenTimestamp > urlList[currentUrlIndex].hangTime) { activeStatus.status = 'FROZEN'; }
//             } else {
//                 lastTime = activeStatus.currentTime; frozenTimestamp = Date.now();
//                 await hideLoadingUI(page); 
//                 for (const frame of page.frames()) {
//                     try { 
//                         if (!frame.isDetached()) { 
//                             // FIX: YAML se decide hoga k unmute rakhna hai ya nahi
//                             frame.evaluate((audioOn) => { 
//                                 window.isStreamMuted = !audioOn; 
//                                 document.querySelectorAll('video:not(#sport4u-video-overlay), audio').forEach(m => { m.muted = !audioOn; m.volume = audioOn ? 1.0 : 0.0; }); 
//                             }, ENABLE_STREAM_AUDIO).catch(()=>{}); 
//                         } 
//                     } catch(e) {}
//                 }
//             }
//         }

//         ticks++;
//         if (ticks === 1 || ticks % 15 === 0) {
//             console.log(`\n==================================================`);
//             console.log(`[💓] STREAM HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] -> ${currentUrlStr}`);
//             console.log(`==================================================\n`);
//         }

//         // RELOAD/RECOVERY LOGIC
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'PHASE_CHANGE') {
            
//             strikes = 0; 
            
//             if (isWarmup && (Date.now() - setupTime < WARMUP_MS)) { 
//                 await new Promise(r => setTimeout(r, 2000)); continue; 
//             }

//             console.log(`\n[!] ❌ WATCHDOG ACTION: ${activeStatus.status}. RELOADING PAGE...`);
//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//             if (activeStatus.status !== 'PHASE_CHANGE' && activeStatus.status !== 'FORCE_REFRESH') {
//                 currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
//             }
            
//             currentUrlStr = urlList[currentUrlIndex].url;

//             // try { await page.goto('about:blank'); } catch(e) {}
            
//             // try {
//             //     await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//             //     await initializeVideo(page, false); 
//             //     const activeVisualReady = await waitForActiveVisualReady(page);
//             //     if (activeVisualReady) await hideLoadingUI(page);
//             // } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }

//             try { 
//                 await page.goto('about:blank'); 
//                 // Jaise hi stream mari, screen ko black loading state mein daal do
//                 await showLoadingUI(page, "SWITCHING SERVER", "Connecting to a new stream...");
//             } catch(e) {}
            
//             try {
//                 await page.goto(currentUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                 // Naya URL khulte hi sabse pehle Loading Screen wapas laga do taaki website na dikhe
//                 await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
                
//                 await initializeVideo(page, false); 
                
//                 // Jab tak video asal mein chalna shuru na ho, loading screen mat hatao
//                 const activeVisualReady = await waitForActiveVisualReady(page);
//                 if (activeVisualReady) await hideLoadingUI(page);
//             } catch(e) { console.log(`[❌] Navigation Failed. Retrying next tick.`); }

            
//             setupTime = Date.now(); isWarmup = true; streamStartTime = Date.now(); 
//             lastTime = -1; frozenTimestamp = Date.now();

//             try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//         } 
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio...`); setupOBSConfig();
//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim(); if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     if (ENABLE_BACKGROUND_AUDIO) {
//         const possibleAudioExts = ['.mp3', '.wav', '.m4a', '.aac', '.mp4']; let foundAudioPath = null;
//         for (let ext of possibleAudioExts) { let tempPath = path.join(process.cwd(), `audio804${ext}`); if (fs.existsSync(tempPath)) { foundAudioPath = tempPath; break; } }
        
//         if (foundAudioPath) { 
//             const rawVolume = process.env.BACKGROUND_AUDIO_VOLUME || '100';
//             let volNumber = parseInt(rawVolume, 10); if (isNaN(volNumber)) volNumber = 100;
//             let ffplayVolume = volNumber / 100; 
//             audioProcess = spawn('ffplay', ['-nodisp', '-loop', '0', '-loglevel', 'warning', '-af', `volume=${ffplayVolume}`, foundAudioPath]); 
//         }
//     }

//     console.log('[*] Waiting for OBS to initialize...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))]);
//             isObsConnected = true; console.log('[+] OBS Connected!'); break;
//         } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
//     }

//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

//     browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
//         '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling', '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
//     ];
//     if (PROXY_ENGINE.includes('Cloudflare')) browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');

//     browser = await createBrowserInstance(browserArgs); 
//     page = (await browser.pages())[0];

//     browser.on('targetcreated', async (target) => { if (target.type() === 'page') { const newPage = await target.page(); setTimeout(async () => { if (newPage && newPage !== page) { try { await newPage.close(); } catch(e) {} } }, 500); } });

//     await setupNetworkAdBlocker(page);
//     await applyPreloadFirewall(page);
//     await page.bringToFront(); 

//     try { await page.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) {}
//     await showLoadingUI(page, "STREAM LOADING", "Optimizing live video connection...");
//     await initializeVideo(page, false); 
    
//     const activeVisualReady = await waitForActiveVisualReady(page);
//     if (activeVisualReady) await hideLoadingUI(page); 
    
//     if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {} }

//     console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     phaseEndTime = phases[currentPhaseIndex].durationMs ? Date.now() + phases[currentPhaseIndex].durationMs : null;
//     await startWatchdog();
// }

// async function mainLoop() {
//     await loadAllPictures(); // 🖼️ Pehle images net se download kar lo aur memory mein save kar lo
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error('\n[🚨] FATAL ENGINE ERROR:', error.message);
//             await cleanup();
//             await new Promise(r => setTimeout(r, 3000));
//         }
//     }
// }

// async function cleanup() {
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     if (audioProcess) { try { audioProcess.kill('SIGKILL'); } catch(e) { } audioProcess = null; } 
//     try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); execSync('pkill -9 ffplay || true', { stdio: 'ignore' }); } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const exactDurationMs = parseDurationToMs(process.env.CUSTOM_DURATION || 'None');
// if (exactDurationMs) { setTimeout(async () => { await cleanup(); process.exit(0); }, exactDurationMs); } 
// else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online'; 
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)'; 
//             const server = process.env.SERVER_SELECTION || 'None';
//             const format = process.env.STREAM_FORMAT || 'Original (16:9 Standard)'; 
//             const blackOverlayStatus = process.env.ENABLE_BLACK_OVERLAY || 'OFF'; 
//             const streamAudioStatus = process.env.ENABLE_STREAM_AUDIO || 'ON'; 
//             const bgAudioStatus = process.env.ENABLE_BACKGROUND_AUDIO || 'ON'; 
//             const bgAudioVolumeStatus = process.env.BACKGROUND_AUDIO_VOLUME || '100'; 
//             const picOverlayStatus = process.env.ENABLE_PIC_OVERLAY || 'OFF'; 
//             const textOverlayStatus = process.env.ENABLE_TEXT_OVERLAY || 'ON';
//             const videoOverlayStatus = process.env.ENABLE_VIDEO_OVERLAY || 'OFF'; 
//             const watermarkIconStatus = process.env.WATERMARK_ICON || 'Football ⚽';
//             const videoPositionStatus = process.env.VIDEO_OVERLAY_POSITION || 'Middle Center';
//             const videoShowStatus = process.env.VIDEO_SHOW_TIME || '10';
//             const videoHideStatus = process.env.VIDEO_HIDE_TIME || '5';
            
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_format="${format}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f enable_black_overlay="${blackOverlayStatus}" -f enable_stream_audio="${streamAudioStatus}" -f enable_background_audio="${bgAudioStatus}" -f enable_pic_overlay="${picOverlayStatus}" -f pic_urls="${PIC_URLS_INPUT}" -f enable_text_overlay="${textOverlayStatus}" -f watermark_icon="${watermarkIconStatus}" -f enable_video_overlay="${videoOverlayStatus}" -f video_overlay_position="${videoPositionStatus}" -f video_show_time="${videoShowStatus}" -f video_hide_time="${videoHideStatus}" -f background_audio_volume="${bgAudioVolumeStatus}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => { await cleanup(); process.exit(0); }, 300000); 
//         } catch (err) { }
//     }, 21000000); // 6 hours
// }

// mainLoop();

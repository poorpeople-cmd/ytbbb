const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync, exec } = require('child_process');
const { OBSWebSocket } = require('obs-websocket-js'); 

// =========================================================================================
// 🌟 NEW: CAPTURING OVERLAY VARIABLES FROM GITHUB ACTIONS
// =========================================================================================
const OVERLAY_TITLE = process.env.OVERLAY_TITLE || 'PAKISTAN VS INDIA T20';
const OVERLAY_TIMER = parseInt(process.env.OVERLAY_TIMER) || 7320;
const OVERLAY_MESSAGE = process.env.OVERLAY_MESSAGE || '👇 CHECK THE COMMENT FOR LINK 👇';
const OVERLAY_OPACITY = parseFloat(process.env.OVERLAY_OPACITY) || 0.7;

// =========================================================================================
// 🛡️ GLOBAL CRASH PREVENTION SHIELD
// =========================================================================================
process.on('uncaughtException', (err) => {
    if (err.message && err.message.includes('Requesting main frame too early')) {
        console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
    } else {
        console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    let msg = reason && reason.message ? reason.message : reason;
    if (msg && msg.includes('Protocol error')) {
        console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
    } else {
        console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
    }
});

const obs = new OBSWebSocket(); 

const FORCE_REFRESH_MINUTES = 9; 
const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

const NO_REFRESH_DOMAINS = [
    'youtube.com', 'facebook.com', 'streamed.pk', 'websitestream.netlify.app/?ch=Channel%20HD%2071'
];

const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

let rawUrls = (process.env.TARGET_URLS || '').trim();
let urlList = rawUrls !== '' 
    ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
    : ['https://dadocric.st/player.php?id=starsp3&v=m'];

let currentUrlIndex = 0;
let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

const YT_KEY = process.env.YOUTUBE_KEY || '';
const FB_KEY = process.env.FACEBOOK_KEY || '';

let browser = null; let obsProcess = null; let activePage = null; let backupPage = null;
const FROZEN_THRESHOLD_MS = 8000; 

if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
let pendingScreenshots = [];
let uploadCycleCount = 0;

// =========================================================================================
// 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// =========================================================================================
async function setupNetworkAdBlocker(page) {
    if (!page) return;
    try {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const url = request.url().toLowerCase();
            const type = request.resourceType();
            if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
                const targetUrl = request.url().toLowerCase();
                const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
                if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
                    console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
                    request.abort().catch(()=>{}); return;
                }
            }
            if (url.includes('popads') || url.includes('exoclick') || url.includes('adsterra') || url.includes('onclickads') || url.includes('jerkmate') || url.includes('adrevenue') || url.includes('fanduel') || url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))) {
                request.abort().catch(()=>{});
            } else { request.continue().catch(()=>{}); }
        });
    } catch (e) { }
}

async function applyPreloadFirewall(page) {
    if (!page) return;
    try {
        await page.evaluateOnNewDocument(() => {
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
            style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; }`;
            document.documentElement.appendChild(style);
        });
    } catch (e) {}
}

async function takeAndBatchScreenshot(page, stepName) {
    if (!page) return;
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
        await page.screenshot({ path: filePath });
        pendingScreenshots.push(filePath);
        if (pendingScreenshots.length >= 3) {
            try {
                const tag = 'live-stream-logs';
                try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch(e) {}
                try {
                    const oldAssets = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
                    for (const asset of oldAssets) if (asset) execSync(`gh release delete-asset ${tag} "${asset}" -y`, { stdio: 'ignore' });
                } catch(e) {}
                const fileList = pendingScreenshots.join(' ');
                exec(`gh release upload ${tag} ${fileList} --clobber`, (err) => { if (!err) uploadCycleCount++; });
                pendingScreenshots = []; 
            } catch (err) { }
        }
    } catch (e) { }
}

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
                        #smart-stream-overlay { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; background: #000000 !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; pointer-events: all !important; }
                        .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; }
                        @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; }
                        .stream-sub { font-size: 20px !important; color: #cccccc !important; }
                        .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
                        @keyframes blinker { 50% { opacity: 0.3; } }
                    </style>
                    <div class="stream-spinner"></div>
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
            const overlay = document.getElementById('smart-stream-overlay');
            if (overlay) {
                overlay.style.setProperty('display', 'none', 'important');
                overlay.style.setProperty('opacity', '0', 'important');
                overlay.style.setProperty('z-index', '-9999', 'important');
                overlay.remove();
            }
        });
    } catch (e) {}
}

// =========================================================================================
// 👑 INJECTING THE HYPNOTIC LUXURY OVERLAY (ANTI-BAN + TRANSPARENCY)
// =========================================================================================
async function injectLuxuryOverlay(page) {
    if (!page) return;
    try {
        await page.evaluate((title, timerSeconds, msgText, overlayOpacity) => {
            if (document.getElementById('luxury-master-overlay')) return;

            const overlay = document.createElement('div');
            overlay.id = 'luxury-master-overlay';
            overlay.innerHTML = `
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Montserrat:wght@400;700;900&display=swap');
                    
                    #luxury-master-overlay {
                        position: fixed !important; top: 0 !important; left: 0 !important;
                        width: 100vw !important; height: 100vh !important;
                        z-index: 2147483647 !important; /* Above video */
                        pointer-events: none !important; /* Allows video to be clicked underneath */
                        font-family: 'Cinzel', serif;
                    }

                    .color-shifter {
                        position: absolute; width: 100%; height: 100%;
                        background: rgba(5, 2, 10, ${overlayOpacity}); 
                        display: flex; justify-content: center; align-items: center;
                        animation: infiniteSpectrum 40s linear infinite;
                    }

                    .nebula-fx {
                        position: absolute; width: 200%; height: 200%;
                        background: radial-gradient(circle at 50% 50%, rgba(80, 20, 100, 0.5) 0%, transparent 40%),
                                    radial-gradient(circle at 30% 70%, rgba(20, 60, 120, 0.4) 0%, transparent 50%),
                                    radial-gradient(circle at 70% 30%, rgba(120, 30, 20, 0.4) 0%, transparent 40%);
                        animation: swirlNebula 30s infinite alternate ease-in-out;
                        z-index: 0; opacity: 0.6;
                    }

                    .observatory-rings {
                        position: absolute; width: 1000px; height: 1000px; display: flex; justify-content: center; align-items: center; perspective: 1200px; z-index: 2;
                    }
                    .mech-ring { position: absolute; border-radius: 50%; box-shadow: 0 0 40px rgba(227, 188, 85, 0.3), inset 0 0 40px rgba(227, 188, 85, 0.3); }
                    .ring-1 { width: 950px; height: 950px; border-top: 4px solid #fff3c4; animation: spin3D 20s linear infinite; }
                    .ring-2 { width: 800px; height: 800px; border-right: 3px dashed #e3bc55; animation: spin3DRev 30s linear infinite; }
                    .ring-3 { width: 650px; height: 650px; border-bottom: 5px dotted #b8860b; animation: spin3D 15s linear infinite; }

                    .glass-ui-box {
                        position: relative; z-index: 10; background: rgba(10, 5, 15, 0.4);
                        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
                        border: 1px solid rgba(227, 188, 85, 0.5); border-radius: 30px; padding: 40px 80px; text-align: center;
                        box-shadow: 0 0 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(227, 188, 85, 0.3);
                        animation: floatBox 5s ease-in-out infinite;
                    }

                    .main-overlay-title {
                        font-size: 50px; color: #ffffff; text-transform: uppercase; letter-spacing: 12px; margin-bottom: 20px; font-weight: 900;
                        text-shadow: 0 0 15px rgba(255,255,255,0.8), 0 0 30px #fff3c4, 0 0 50px #e3bc55;
                        animation: titleGlow 2.5s infinite alternate;
                    }

                    .timer-display {
                        font-size: 100px; font-weight: 900; margin: 0;
                        background: linear-gradient(to bottom, #fff3c4 0%, #e3bc55 50%, #b8860b 100%); -webkit-background-clip: text; color: transparent;
                        filter: drop-shadow(0 0 20px rgba(227, 188, 85, 0.6)); letter-spacing: 5px; line-height: 1.1;
                    }

                    .custom-msg-box {
                        margin-top: 20px; padding: 10px 30px; background: linear-gradient(90deg, transparent, rgba(255, 0, 85, 0.4), transparent);
                        border-top: 2px solid #ff0055; border-bottom: 2px solid #ff0055;
                    }
                    .custom-msg-text {
                        font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 22px; color: #ffffff; text-transform: uppercase; letter-spacing: 6px;
                        text-shadow: 0 0 10px #ff0055, 0 0 20px #ff0055, 0 0 40px #ff0055; animation: pulseText 2s infinite alternate;
                    }

                    .particle-star { position: absolute; background: #fff; border-radius: 50%; box-shadow: 0 0 10px #fff, 0 0 20px #fff3c4; pointer-events: none; }

                    @keyframes infiniteSpectrum { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
                    @keyframes swirlNebula { 0% { transform: scale(1) rotate(0deg); } 100% { transform: scale(1.2) rotate(10deg); } }
                    @keyframes spin3D { 0% { transform: rotateX(60deg) rotateY(20deg) rotateZ(0deg); } 100% { transform: rotateX(60deg) rotateY(20deg) rotateZ(360deg); } }
                    @keyframes spin3DRev { 0% { transform: rotateX(40deg) rotateY(-30deg) rotateZ(360deg); } 100% { transform: rotateX(40deg) rotateY(-30deg) rotateZ(0deg); } }
                    @keyframes floatBox { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                    @keyframes titleGlow { 0% { filter: brightness(1); } 100% { filter: brightness(1.3); text-shadow: 0 0 20px #fff, 0 0 40px #fff3c4, 0 0 70px #e3bc55; } }
                    @keyframes pulseText { 0% { letter-spacing: 4px; filter: brightness(1); } 100% { letter-spacing: 8px; filter: brightness(1.5); text-shadow: 0 0 20px #ff0055, 0 0 50px #ff0055; } }
                </style>
                <div class="color-shifter">
                    <div class="nebula-fx"></div>
                    <div id="particles-container"></div>
                    <div class="observatory-rings">
                        <div class="mech-ring ring-1"></div><div class="mech-ring ring-2"></div><div class="mech-ring ring-3"></div>
                    </div>
                    <div class="glass-ui-box">
                        <div class="main-overlay-title">${title}</div>
                        <h1 class="timer-display" id="overlay-timer">00:00:00</h1>
                        <div class="custom-msg-box"><div class="custom-msg-text">${msgText}</div></div>
                    </div>
                </div>
            `;
            document.documentElement.appendChild(overlay);

            let timeLeft = timerSeconds;
            setInterval(() => {
                let h = Math.floor(timeLeft / 3600); let m = Math.floor((timeLeft % 3600) / 60); let s = timeLeft % 60;
                document.getElementById('overlay-timer').innerText = (h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);
                if (timeLeft > 0) timeLeft--; else timeLeft = timerSeconds;
            }, 1000);

            const pLayer = document.getElementById('particles-container');
            for(let i=0; i<80; i++) {
                let star = document.createElement('div'); star.className = 'particle-star';
                let size = Math.random()*3 + 1;
                star.style.width = size+'px'; star.style.height = size+'px';
                star.style.left = Math.random()*100+'vw'; star.style.top = Math.random()*100+'vh';
                pLayer.appendChild(star);
                star.animate([ {transform:'translate(0,0)', opacity:0.2}, {transform:`translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*300}px)`, opacity:1} ], 
                {duration: Math.random()*5000+5000, direction:'alternate', iterations:Infinity, easing:'ease-in-out'});
            }
        }, OVERLAY_TITLE, OVERLAY_TIMER, OVERLAY_MESSAGE, OVERLAY_OPACITY);
        console.log(`[✨] LUXURY OVERLAY INJECTED: Title=[${OVERLAY_TITLE}] Opacity=[${OVERLAY_OPACITY}]`);
    } catch(e) {}
}

function setupOBSConfig() {
    const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
    const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
    const scenesDir = path.join(obsDir, 'basic', 'scenes');

    fs.mkdirSync(profilesDir, { recursive: true });
    fs.mkdirSync(scenesDir, { recursive: true });

    const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
    fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
    const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
    fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

    let rtmpServer = ""; let streamKey = "";
    if (YT_KEY && YT_KEY.trim() !== '') { rtmpServer = "rtmp://a.rtmp.youtube.com/live2/"; streamKey = YT_KEY.trim(); console.log(`[🚀] TARGET PLATFORM: YOUTUBE`); } 
    else if (FB_KEY && FB_KEY.trim() !== '') { rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/"; streamKey = FB_KEY.trim(); console.log(`[🚀] TARGET PLATFORM: FACEBOOK`); } 
    else { console.log(`[❌] ERROR: Stream Key is missing!`); process.exit(1); }

    const serviceJson = { "settings": { "server": rtmpServer, "key": streamKey }, "type": "rtmp_custom" };
    fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

    const sceneJson = {
        "current_scene": "WaitingScene", "current_program_scene": "WaitingScene", "name": "Untitled", "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
        "sources": [
            { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
            { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
            { "id": "scene", "name": "MainScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] } },
            { "id": "scene", "name": "WaitingScene", "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } }
        ]
    };
    fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
}

function attachAntiAdListeners(page) {
    page.on('dialog', async dialog => { try { await dialog.dismiss(); } catch(e){} });
}

async function initializeVideo(page, startMuted, isActivePage) {
    try {
        if (SERVER_SELECTION !== 'None') {
            let serverClicked = false; let serverAttempts = 0;
            while (!serverClicked && serverAttempts < 10) { 
                serverAttempts++;
                try {
                    const clickSuccess = await page.evaluate((serverName) => {
                        const buttons = Array.from(document.querySelectorAll('button'));
                        const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
                        if (targetBtn) { targetBtn.click(); return true; } return false;
                    }, SERVER_SELECTION);

                    if (clickSuccess) { serverClicked = true; await takeAndBatchScreenshot(page, `server-clicked`); await new Promise(r => setTimeout(r, 2000)); if (isActivePage) await page.bringToFront(); } 
                    else await new Promise(r => setTimeout(r, 2000));
                } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
            }
        }

        let isVideoPlaying = false; let attempts = 0;
        while (!isVideoPlaying && attempts < 15) {
            for (const frame of page.frames()) {
                try {
                    const autoPlayed = await frame.evaluate(() => {
                        let playing = false;
                        document.querySelectorAll('video').forEach(v => { if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; playing = true; } });
                        return playing;
                    });
                    if (autoPlayed) { isVideoPlaying = true; break; }

                    const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
                    if (playBtn) {
                        const isVisible = await frame.evaluate(el => { const style = window.getComputedStyle(el); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'; }, playBtn);
                        if (isVisible) { await frame.evaluate(el => el.click(), playBtn); await takeAndBatchScreenshot(page, `play-btn-clicked`); await new Promise(r => setTimeout(r, 3000)); isVideoPlaying = true; break; }
                    }

                    if (!isVideoPlaying && attempts > 5) {
                        const forced = await frame.evaluate(async () => {
                            let played = false; let vids = document.querySelectorAll('video');
                            for(let v of vids) { if (v.clientWidth > 50) { v.muted = false; v.volume = 1.0; try { v.click(); } catch(e){} try { let p = v.play(); if (p !== undefined) p.catch(()=>{}); played = true; } catch(e) {} } }
                            return played;
                        });
                        if (forced) { await takeAndBatchScreenshot(page, `force-play-applied`); isVideoPlaying = true; break; }
                    }
                } catch (err) {}
            }
            if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
            attempts++;
        }

        let targetFrame = null;
        for (const frame of page.frames()) {
            try { const isRealLiveStream = await frame.evaluate(() => { const vid = document.querySelector('video'); return vid && vid.clientWidth > 50 && vid.clientHeight > 50; });
                if (isRealLiveStream) { targetFrame = frame; break; }
            } catch (e) { }
        }
        if (!targetFrame) targetFrame = page.mainFrame();

        await page.evaluate(() => {
            setInterval(() => {
                try {
                    document.documentElement.style.setProperty('background-color', 'black', 'important');
                    document.body.style.setProperty('background-color', 'black', 'important');
                    document.body.style.setProperty('overflow', 'hidden', 'important'); document.documentElement.style.setProperty('overflow', 'hidden', 'important');

                    let iframes = Array.from(document.querySelectorAll('iframe'));
                    let mainIframe = null; let maxArea = 0;
                    iframes.forEach(ifr => { let area = ifr.clientWidth * ifr.clientHeight; if (area > maxArea && area > 5000) { maxArea = area; mainIframe = ifr; } });
                    if (!mainIframe && iframes.length > 0) { mainIframe = iframes.find(ifr => ifr.getAttribute('allowfullscreen') !== null || (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))); }

                    if (mainIframe) {
                        iframes.forEach(ifr => { if (ifr !== mainIframe) { ifr.style.setProperty('display', 'none', 'important'); ifr.style.setProperty('opacity', '0', 'important'); ifr.style.setProperty('z-index', '-9999', 'important'); } });
                        mainIframe.style.setProperty('position', 'fixed', 'important'); mainIframe.style.setProperty('top', '0px', 'important'); mainIframe.style.setProperty('left', '0px', 'important'); mainIframe.style.setProperty('width', '100vw', 'important'); mainIframe.style.setProperty('height', '100vh', 'important'); mainIframe.style.setProperty('z-index', '2147483645', 'important'); mainIframe.style.setProperty('background-color', 'black', 'important'); mainIframe.style.setProperty('border', 'none', 'important'); mainIframe.style.setProperty('opacity', '1', 'important'); mainIframe.style.setProperty('display', 'block', 'important'); mainIframe.style.setProperty('visibility', 'visible', 'important');
                    }

                    const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#luxury-master-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
                    document.querySelectorAll(junkClasses).forEach(el => { try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } });

                    const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
                    document.querySelectorAll('div, section, span, a').forEach(el => {
                        if (el.id === 'smart-stream-overlay' || el.id === 'luxury-master-overlay') return;
                        const style = window.getComputedStyle(el);
                        const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        if (isFloating && el.innerText) {
                            const textLower = el.innerText.toLowerCase();
                            const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
                                try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
                            }
                        }
                    });
                } catch (err) {}
            }, 500); 
        }).catch(() => {});

        await targetFrame.evaluate((muteVideo) => {
            setInterval(() => {
                try {
                    const style = document.createElement('style'); style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`; document.head.appendChild(style);
                    const mediaElements = document.querySelectorAll('video, audio'); const videos = Array.from(document.querySelectorAll('video'));
                    let realVideo = null;
                    mediaElements.forEach(media => { media.muted = muteVideo; media.volume = muteVideo ? 0.0 : 1.0; });
                    if (!muteVideo) { document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} }); }
                    for (const v of videos) { if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; } }
                    if (!realVideo && videos.length > 0) { realVideo = videos[0]; }
                    if (realVideo) { 
                        realVideo.style.setProperty('position', 'fixed', 'important'); realVideo.style.setProperty('top', '0px', 'important'); realVideo.style.setProperty('left', '0px', 'important'); realVideo.style.setProperty('width', '100vw', 'important'); realVideo.style.setProperty('height', '100vh', 'important'); realVideo.style.setProperty('z-index', '2147483646', 'important'); realVideo.style.setProperty('background-color', 'black', 'important'); realVideo.style.setProperty('object-fit', 'contain', 'important'); realVideo.style.setProperty('opacity', '1', 'important'); realVideo.style.setProperty('visibility', 'visible', 'important'); realVideo.style.setProperty('display', 'block', 'important');
                    }
                } catch(err) {}
            }, 500); 
        }, startMuted).catch(() => {});

    } catch (e) { }
    await new Promise(r => setTimeout(r, 1000));
}

async function checkPageStatus(page) {
    if (!page) return { status: 'DEAD' };
    try {
        for (const frame of page.frames()) {
            try {
                if (frame.isDetached()) continue;
                const result = await Promise.race([
                    frame.evaluate(() => {
                        const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        if (bodyText.includes("stream error") || bodyText.includes("not found") || bodyText.includes("domain is blocked") || bodyText.includes("error: forbidden") || bodyText.includes("does not have permission") || bodyText.includes("access denied") || (bodyText.includes("cloudflare") && bodyText.includes("blocked"))) { return { status: 'CRITICAL_ERROR' }; }
                        const videos = Array.from(document.querySelectorAll('video'));
                        let targetV = null;
                        for (const v of videos) { if (v.clientWidth > 0 && v.clientWidth < 100) continue; if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) { targetV = v; break; } }
                        if (!targetV && videos.length > 0) { targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0]; }
                        if (targetV && !targetV.ended && targetV.currentTime > 0) {
                            let frames = 0;
                            if (targetV.getVideoPlaybackQuality) { frames = targetV.getVideoPlaybackQuality().totalVideoFrames; } else if (targetV.webkitDecodedFrameCount !== undefined) { frames = targetV.webkitDecodedFrameCount; }
                            return { status: 'HEALTHY', currentTime: targetV.currentTime, decodedFrames: frames };
                        }
                        return { status: 'DEAD' };
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
                ]);
                if (result && result.status !== 'DEAD') return result;
            } catch (err) {}
        }
    } catch (e) { return { status: 'DEAD' }; }
    return { status: 'DEAD' };
}

async function startWatchdog() {
    let lastActiveTime = -1; let lastDecodedFrames = -1; let frozenCheckTimestamp = Date.now(); let watchdogTicks = 0;
    let streamSetupTime = Date.now(); let isWarmupPhase = true; const WARMUP_MAX_TIME = 15000; 
    let activeUrlStr = urlList[currentUrlIndex]; let backupUrlStr = urlList[backupUrlIndex];
    let currentStreamStartTime = Date.now();

    while (true) {
        if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

        let activeStatus = await checkPageStatus(activePage);

        if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
            let elapsedMs = Date.now() - currentStreamStartTime;
            let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));
            if (elapsedMs > FORCE_REFRESH_MS) {
                if (!isExempted) {
                    console.log(`\n[⏱️ PROACTIVE REFRESH]: Forcing SAME LINK swap to keep connection fresh...`);
                    activeStatus.status = 'FORCE_REFRESH'; 
                }
            }
        }

        if (activeStatus.status === 'HEALTHY') {
            await hideLoadingUI(activePage); 
            isWarmupPhase = false; 

            let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
            let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

            if (isTimeStuck || isFrameStuck) {
                if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) {
                    activeStatus.status = 'FROZEN';
                    if (isFrameStuck && !isTimeStuck) { console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen. Triggering HOT-SWAP.`); }
                }
            } else {
                lastActiveTime = activeStatus.currentTime; lastDecodedFrames = activeStatus.decodedFrames; frozenCheckTimestamp = Date.now();
                for (const frame of activePage.frames()) {
                    try { if (!frame.isDetached()) { frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} }); }).catch(()=>{}); } } catch(e) {}
                }
            }
        }

        if (backupPage) {
            for (const frame of backupPage.frames()) {
                try { if (!frame.isDetached()) { frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }).catch(()=>{}); } } catch(e) {}
            }
        }

        watchdogTicks++;
        if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
            console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
        }
        if (watchdogTicks % 120 === 0) { await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`); }

        if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
                await new Promise(r => setTimeout(r, 2000)); continue; 
            }

            let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

            if (isProactiveRefresh) {
                console.log(`\n[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
                for (const frame of activePage.frames()) { try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {} }
                try { await backupPage.goto('about:blank').catch(()=>{}); await applyPreloadFirewall(backupPage); await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{}); } catch(e) {}
            } else {
                console.log(`\n[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
                await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
            }
            
            let backupStatus = await checkPageStatus(backupPage);

            if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                if (!isProactiveRefresh) {
                    for (const frame of activePage.frames()) { try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {} }
                }
                
                await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
                await backupPage.bringToFront();
                await new Promise(r => setTimeout(r, 1000)); 
                try { await backupPage.mouse.click(10, 10); } catch(e){} 

                console.log(`[*] Initializing Video on the newly active tab...`);
                await initializeVideo(backupPage, false, true); 
                await hideLoadingUI(backupPage);

                // 🌟 INJECTING THE OVERLAY AGAIN AFTER THE SWAP SO IT DOESN'T DISAPPEAR
                await injectLuxuryOverlay(backupPage);

                let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
                lastActiveTime = -1; frozenCheckTimestamp = Date.now();

                if (!isProactiveRefresh) {
                    currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
                    backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
                } 

                console.log(`\n[🔄] SWAP EXECUTED SUCCESSFULLY -> ACTIVE SERVER: [${currentUrlIndex}]\n`);

                try { await backupPage.goto('about:blank').catch(()=>{}); await applyPreloadFirewall(backupPage); backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {}); } catch (e) {}
                
                streamSetupTime = Date.now(); isWarmupPhase = true; currentStreamStartTime = Date.now();
            } else { throw new Error("Both Active and Backup tabs failed."); }
        }

        await new Promise(r => setTimeout(r, 2000)); 
    }
}

async function startDirectStreaming() {
    console.log(`[*] Starting OBS Studio FIRST...`);
    setupOBSConfig();

    obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
    obsProcess.stderr.on('data', (data) => {
        const msg = data.toString().trim();
        if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
    });

    console.log('[*] Waiting for OBS to initialize before launching browser...');
    await new Promise(r => setTimeout(r, 6000));

    let isObsConnected = false;
    for (let attempt = 1; attempt <= 15; attempt++) {
        try { await Promise.race([ obs.connect('ws://127.0.0.1:4455', 'secret'), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000)) ]); isObsConnected = true; console.log('[+] OBS WebSocket Connected Successfully!'); break; } 
        catch (e) { await new Promise(r => setTimeout(r, 2000)); }
    }

    if (isObsConnected) { try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){} }

    let browserArgs = [
        '--no-sandbox', '--disable-setuid-sandbox', `--window-size=${RES_W},${RES_H}`, '--window-position=0,0', '--kiosk', '--start-fullscreen',
        '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--disable-web-security',
        '--ignore-gpu-blocklist', '--use-gl=egl', '--disable-accelerated-video-decode', '--disable-accelerated-video-encode',
        '--disable-smooth-scrolling', '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
        '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'
    ];

    if (PROXY_ENGINE.includes('Cloudflare')) { browserArgs.push('--proxy-server=socks5://127.0.0.1:40000'); }

    browser = await puppeteer.launch({ headless: false, defaultViewport: { width: RES_W, height: RES_H }, ignoreDefaultArgs: ['--enable-automation'], args: browserArgs });

    browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            const newPage = await target.page();
            setTimeout(async () => { if (newPage && newPage !== activePage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
        }
    });

    const pages = await browser.pages();
    activePage = pages[0]; backupPage = await browser.newPage();

    await setupNetworkAdBlocker(activePage); await setupNetworkAdBlocker(backupPage);
    attachAntiAdListeners(activePage); attachAntiAdListeners(backupPage);
    await applyPreloadFirewall(activePage); await applyPreloadFirewall(backupPage);

    await activePage.bringToFront(); 

    console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
    await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
    await initializeVideo(activePage, false, true); 
    await hideLoadingUI(activePage); 

    // 🌟 INJECTING THE LUXURY OVERLAY OVER THE MAIN ACTIVE PAGE 🌟
    await injectLuxuryOverlay(activePage);

    if (isObsConnected) {
        console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
        try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
    }

    console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
    backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
    await activePage.bringToFront();
    try { await activePage.mouse.click(10, 10); } catch(e){} 

    console.log(`\n[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast. Dual-Tab Monitoring is Active.\n`);
    await startWatchdog();
}

async function mainLoop() {
    while (true) {
        try { await startDirectStreaming(); } 
        catch (error) {
            console.error(`\n[!] ALERT: ${error.message}`);
            console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
            await cleanup();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

async function cleanup() {
    console.log('[*] Cleaning up resources...');
    try { await obs.disconnect(); } catch (e) { } 
    if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
    if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
    try { execSync('pkill -9 obs || true', { stdio: 'ignore' }); execSync('pkill -9 chrome || true', { stdio: 'ignore' }); execSync('pkill -9 puppeteer || true', { stdio: 'ignore' }); } catch (e) { }
}

process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

const customDurationStr = process.env.CUSTOM_DURATION || 'None';
function parseDurationToMs(str) {
    if (!str || str.toLowerCase() === 'none') return null;
    let ms = 0; const hMatch = str.match(/(\d+)\s*h/i); const mMatch = str.match(/(\d+)\s*m/i);
    if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
    if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
    return ms > 0 ? ms : null;
}

const exactDurationMs = parseDurationToMs(customDurationStr);
if (exactDurationMs) {
    setTimeout(async () => {
        console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
        await cleanup(); process.exit(0);
    }, exactDurationMs);
} else {
    setTimeout(() => {
        try {
            const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
            const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
            const server = process.env.SERVER_SELECTION || 'None';
            
            // 🌟 PASSING NEW OVERLAY VARIABLES TO THE NEXT WORKFLOW RUN
            const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None" -f overlay_title="${OVERLAY_TITLE}" -f overlay_timer="${OVERLAY_TIMER}" -f overlay_message="${OVERLAY_MESSAGE}" -f overlay_opacity="${OVERLAY_OPACITY}"`;
            
            execSync(cmd, { stdio: 'inherit' });
            setTimeout(async () => { await cleanup(); process.exit(0); }, 300000); 
        } catch (err) { }
    }, 21000000);
}

mainLoop();






































































// ======================== 111111 done alhamdullah for facebook and youtube here woo overlay not ok =======================




// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 9; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== '' 
//     ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// // 🔥 YOUTUBE & FACEBOOK KEYS
// const YT_KEY = process.env.YOUTUBE_KEY || '';
// const FB_KEY = process.env.FACEBOOK_KEY || '';

// let browser = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// const FROZEN_THRESHOLD_MS = 8000; 

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 const isMaliciousAd = adKeywords.some(keyword => targetUrl.includes(keyword));

//                 if (isMaliciousAd) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (
//                 url.includes('popads') || 
//                 url.includes('exoclick') || 
//                 url.includes('adsterra') || 
//                 url.includes('onclickads') || 
//                 url.includes('jerkmate') ||
//                 url.includes('adrevenue') ||
//                 url.includes('fanduel') ||
//                 url.includes('doubleclick') ||
//                 (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))
//             ) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             window.alert = function() {};
//             window.confirm = function() { return true; };
//             window.prompt = function() { return null; };
//             window.open = function() { return null; };
            
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; }`;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         console.log(`[📸] Screenshot saved: ${filePath}`);
//         pendingScreenshots.push(filePath);

//         if (pendingScreenshots.length >= 3) {
//             try {
//                 const tag = 'live-stream-logs';
//                 try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch(e) {}
//                 try {
//                     const oldAssets = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
//                     for (const asset of oldAssets) if (asset) execSync(`gh release delete-asset ${tag} "${asset}" -y`, { stdio: 'ignore' });
//                 } catch(e) {}

//                 const fileList = pendingScreenshots.join(' ');
//                 exec(`gh release upload ${tag} ${fileList} --clobber`, (err) => {
//                     if (!err) uploadCycleCount++;
//                 });
//                 pendingScreenshots = []; 
//             } catch (err) { }
//         }
//     } catch (e) { }
// }

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
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                         @keyframes blinker { 50% { opacity: 0.3; } }
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
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir, { recursive: true });

//     const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
//     fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
//     const basicIniContent = `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Simple
// [SimpleOutput]
// VBitrate=${BITRATE}
// StreamEncoder=x264
// x264Preset=ultrafast
// x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
// `;
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

//     // 🔥 YT / FB Output Logic
//     let rtmpServer = "";
//     let streamKey = "";

//     if (YT_KEY && YT_KEY.trim() !== '') {
//         rtmpServer = "rtmp://a.rtmp.youtube.com/live2/";
//         streamKey = YT_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: YOUTUBE`);
//     } else if (FB_KEY && FB_KEY.trim() !== '') {
//         rtmpServer = "rtmps://live-api-s.facebook.com:443/rtmp/";
//         streamKey = FB_KEY.trim();
//         console.log(`[🚀] TARGET PLATFORM: FACEBOOK`);
//     } else {
//         console.log(`[❌] ERROR: Kam az kam ek Stream Key (YouTube ya Facebook) daalna zaroori hai!`);
//         process.exit(1);
//     }

//     const serviceJson = {
//         "settings": { "server": rtmpServer, "key": streamKey },
//         "type": "rtmp_custom"
//     };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", 
//         "current_program_scene": "WaitingScene", 
//         "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// async function initializeVideo(page, startMuted, isActivePage) {
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await page.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);

//                     if (clickSuccess) {
//                         serverClicked = true; 
//                         console.log(`[+] Server Button clicked successfully!`);
//                         await takeAndBatchScreenshot(page, `server-clicked`);
//                         await new Promise(r => setTimeout(r, 2000)); 
//                         if (isActivePage) await page.bringToFront(); 
//                     } else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; 
//         let attempts = 0;
        
//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of page.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
//                                 v.muted = false; 
//                                 v.volume = 1.0;
//                                 playing = true;
//                             }
//                         });
//                         return playing;
//                     });

//                     if (autoPlayed) {
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => {
//                             const style = window.getComputedStyle(el);
//                             return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
//                         }, playBtn);

//                         if (isVisible) {
//                             await frame.evaluate(el => el.click(), playBtn); 
//                             await takeAndBatchScreenshot(page, `play-btn-clicked`);
//                             await new Promise(r => setTimeout(r, 3000)); 
//                             isVideoPlaying = true;
//                             break; 
//                         }
//                     }

//                     if (!isVideoPlaying && attempts > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let played = false;
//                             let vids = document.querySelectorAll('video');
//                             for(let v of vids) {
//                                 if (v.clientWidth > 50) { 
//                                     v.muted = false; v.volume = 1.0; 
//                                     try { v.click(); } catch(e){}
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(()=>{});
//                                         played = true;
//                                     } catch(e) {}
//                                 }
//                             }
//                             return played;
//                         });

//                         if (forced) {
//                             await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const isRealLiveStream = await frame.evaluate(() => {
//                     const vid = document.querySelector('video');
//                     return vid && vid.clientWidth > 50 && vid.clientHeight > 50;
//                 });
//                 if (isRealLiveStream) { 
//                     targetFrame = frame; 
//                     console.log(`[+] Smart Scanner locked onto video frame!`);
//                     break; 
//                 }
//             } catch (e) { }
//         }

//         if (!targetFrame) targetFrame = page.mainFrame();

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxArea = 0;

//                     iframes.forEach(ifr => {
//                         let area = ifr.clientWidth * ifr.clientHeight;
//                         if (area > maxArea && area > 5000) { maxArea = area; mainIframe = ifr; }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
//         }).catch(() => {});

//         await targetFrame.evaluate((muteVideo) => {
//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = muteVideo; 
//                         media.volume = muteVideo ? 0.0 : 1.0; 
//                     });

//                     if (!muteVideo) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await new Promise(r => setTimeout(r, 1000));
// }

// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         if (
//                             bodyText.includes("stream error") || 
//                             bodyText.includes("not found") || 
//                             bodyText.includes("domain is blocked") ||
//                             bodyText.includes("error: forbidden") ||
//                             bodyText.includes("does not have permission") ||
//                             bodyText.includes("access denied") ||
//                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
//                         ) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = null;

//                         for (const v of videos) {
//                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
//                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
//                                 targetV = v; break;
//                             }
//                         }
                        
//                         if (!targetV && videos.length > 0) {
//                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
//                         }
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
//                             return { status: 'HEALTHY', currentTime: targetV.currentTime, decodedFrames: frames };
//                         }
//                         return { status: 'DEAD' };
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
//                 ]);
//                 if (result && result.status !== 'DEAD') return result;
//             } catch (err) {}
//         }
//     } catch (e) { return { status: 'DEAD' }; }
//     return { status: 'DEAD' };
// }

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1; 
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                     }
//                 }
                
//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

//             } else {
//                 console.error(`[!] ❌ Backup Tab is ALSO DEAD/FROZEN. Hard Restarting System...`);
//                 throw new Error("Both Active and Backup tabs failed.");
//             }
//         }

//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio FIRST...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim();
//         if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     console.log('[*] Waiting for OBS to initialize before launching browser...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([
//                 obs.connect('ws://127.0.0.1:4455', 'secret'),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
//             ]);
//             isObsConnected = true;
//             console.log('[+] OBS WebSocket Connected Successfully!');
//             break;
//         } catch (e) {
//             console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
//             await new Promise(r => setTimeout(r, 2000));
//         }
//     }

//     if (isObsConnected) {
//         try {
//             await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
//         } catch(e){}
//     }

//     let browserArgs = [
//         '--no-sandbox', 
//         '--disable-setuid-sandbox',
//         `--window-size=${RES_W},${RES_H}`, 
//         '--window-position=0,0', 
//         '--kiosk', 
//         '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required',
//         '--disable-dev-shm-usage', 
//         '--ignore-certificate-errors',
//         '--disable-web-security',
//         '--ignore-gpu-blocklist', 
//         '--use-gl=egl',
//         '--disable-accelerated-video-decode', 
//         '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
//         '--disable-background-timer-throttling',
//         '--disable-backgrounding-occluded-windows',
//         '--disable-renderer-backgrounding'
//     ];

//     if (PROXY_ENGINE.includes('Cloudflare')) {
//         browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and [CLOUDFLARE WARP] Proxy...`);
//     } else {
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} using [DIRECT GITHUB IP]...`);
//     }

//     browser = await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: browserArgs
//     });

//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => {
//                 if (newPage && newPage !== activePage && newPage !== backupPage) {
//                     console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
//                     try { await newPage.close(); } catch(e) {}
//                 }
//             }, 500);
//         }
//     });

//     const pages = await browser.pages();
//     activePage = pages[0]; 
//     backupPage = await browser.newPage();

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error(`\n[!] ALERT: ${error.message}`);
//             console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
//             await cleanup();
//             await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     try {
//         execSync('pkill -9 obs || true', { stdio: 'ignore' });
//         execSync('pkill -9 chrome || true', { stdio: 'ignore' });
//         execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
//     } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const customDurationStr = process.env.CUSTOM_DURATION || 'None';
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0;
//     const hMatch = str.match(/(\d+)\s*h/i);
//     const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// const exactDurationMs = parseDurationToMs(customDurationStr);
// if (exactDurationMs) {
//     setTimeout(async () => {
//         console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
//         await cleanup();
//         process.exit(0);
//     }, exactDurationMs);
// } else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
//             const server = process.env.SERVER_SELECTION || 'None';
//             // 🔥 Updated GitHub Action command to pass manual YT/FB keys instead of OKRU channel
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f youtube_stream_key="${YT_KEY}" -f facebook_stream_key="${FB_KEY}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => {
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 300000); 
//         } catch (err) { }
//     }, 21000000);
// }

// mainLoop();

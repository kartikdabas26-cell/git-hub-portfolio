import os
from PIL import Image, ImageDraw, ImageFont

out_dir = r'C:/Users/kavit/.gemini/antigravity/scratch/jack-3d-portfolio/public/marquee'
proj_dir = r'C:/Users/kavit/.gemini/antigravity/scratch/jack-3d-portfolio/public/projects'
os.makedirs(out_dir, exist_ok=True)

W, H = 840, 540

f_title = ImageFont.truetype(r'C:/Windows/Fonts/bahnschrift.ttf', 38)
f_h2 = ImageFont.truetype(r'C:/Windows/Fonts/bahnschrift.ttf', 26)
f_sub = ImageFont.truetype(r'C:/Windows/Fonts/segoeui.ttf', 20)
f_mono = ImageFont.truetype(r'C:/Windows/Fonts/consola.ttf', 19)
f_mono_bold = ImageFont.truetype(r'C:/Windows/Fonts/consolab.ttf', 20)
f_small = ImageFont.truetype(r'C:/Windows/Fonts/consola.ttf', 16)
f_badge = ImageFont.truetype(r'C:/Windows/Fonts/segoeui.ttf', 16)

def make_base_card(title, tag='FRONTEND SYSTEM', glow_color=(20, 35, 60)):
    im = Image.new('RGBA', (W, H), (12, 14, 18, 255))
    draw = ImageDraw.Draw(im)
    for y in range(H):
        ratio = y / H
        r = int(12 + (glow_color[0] - 12) * (1 - ratio * 0.7))
        g = int(14 + (glow_color[1] - 14) * (1 - ratio * 0.7))
        b = int(18 + (glow_color[2] - 18) * (1 - ratio * 0.7))
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    
    draw.rectangle([(0, 0), (W, 52)], fill=(18, 22, 28))
    draw.line([(0, 52), (W, 52)], fill=(40, 48, 62), width=1)
    
    draw.ellipse([(20, 20), (32, 32)], fill=(255, 95, 87))
    draw.ellipse([(42, 20), (54, 32)], fill=(254, 188, 46))
    draw.ellipse([(64, 20), (76, 32)], fill=(40, 201, 64))
    
    draw.text((95, 17), title, font=f_small, fill=(160, 175, 195))
    
    draw.rounded_rectangle([(W - 270, 13), (W - 20, 39)], radius=6, fill=(28, 36, 48), outline=(60, 75, 100))
    draw.text((W - 260, 17), tag, font=f_badge, fill=(140, 190, 240))
    
    draw.rounded_rectangle([(0, 0), (W-1, H-1)], radius=18, outline=(60, 70, 90), width=2)
    return im, draw

def draw_bottom_tags(draw, tags):
    draw.line([(30, H - 56), (W - 30, H - 56)], fill=(35, 42, 56), width=1)
    x = 35
    for t in tags:
        bbox = draw.textbbox((x + 12, H - 42), t, font=f_badge)
        draw.rounded_rectangle([(x, H - 46), (bbox[2] + 12, H - 18)], radius=6, fill=(20, 26, 36), outline=(45, 55, 75))
        draw.text((x + 12, H - 42), t, font=f_badge, fill=(175, 195, 215))
        x = bbox[2] + 24

# 1. MediCycle Card
im1, d1 = make_base_card('medicycle-phi.vercel.app - Unified Medicine UI', 'HEALTHCARE FRONTEND', (10, 45, 38))
med_img = Image.open(os.path.join(proj_dir, 'medicycle-main.png'))
med_w = 780
med_h = int(med_img.height * (780 / med_img.width))
med_thumb = med_img.resize((med_w, med_h), Image.Resampling.LANCZOS)
d1.rounded_rectangle([(28, 70), (28 + med_w + 4, 70 + med_h + 4)], radius=12, fill=(16, 20, 26), outline=(16, 185, 129, 100), width=2)
im1.paste(med_thumb, (30, 72))

d1.rounded_rectangle([(45, 70 + med_h + 20), (410, H - 75)], radius=10, fill=(16, 32, 28, 230), outline=(16, 185, 129, 120))
d1.text((60, 70 + med_h + 28), 'SALVAGE EFFICIENCY: 94.2%', font=f_mono_bold, fill=(52, 211, 153))
d1.text((60, 70 + med_h + 54), 'Domain-Isolated Stakeholder Portals', font=f_small, fill=(200, 220, 215))

d1.rounded_rectangle([(430, 70 + med_h + 20), (795, H - 75)], radius=10, fill=(16, 32, 28, 230), outline=(16, 185, 129, 120))
d1.text((445, 70 + med_h + 28), 'FIREBASE CLUSTER & CLOUD SYNC', font=f_mono_bold, fill=(52, 211, 153))
d1.text((445, 70 + med_h + 54), 'Real-Time Wards Inventory Streams', font=f_small, fill=(200, 220, 215))

draw_bottom_tags(d1, ['React 19', 'TypeScript', 'Tailwind CSS', 'Firebase Firestore', 'Vercel'])
im1.save(os.path.join(out_dir, 'card-medicycle.png'))

# 2. SafeRoute Card
im2, d2 = make_base_card('safe-route-jade.vercel.app - Spatial Safety UI', 'URBAN SPATIAL UI', (12, 38, 65))
sr_img = Image.open(os.path.join(proj_dir, 'saferoute-main.png'))
sr_w = 780
sr_h = int(sr_img.height * (780 / sr_img.width))
if sr_h > 330:
    sr_h = 330
    sr_w = int(sr_img.width * (330 / sr_img.height))
sr_thumb = sr_img.resize((sr_w, sr_h), Image.Resampling.LANCZOS)
x_off = 30 + (780 - sr_w) // 2
d2.rounded_rectangle([(x_off - 2, 70), (x_off + sr_w + 2, 70 + sr_h + 2)], radius=12, fill=(10, 16, 26), outline=(14, 165, 233, 120), width=2)
im2.paste(sr_thumb, (x_off, 72))

d2.rounded_rectangle([(45, 70 + sr_h + 16), (410, H - 75)], radius=10, fill=(10, 26, 45, 230), outline=(14, 165, 233, 140))
d2.text((60, 70 + sr_h + 24), 'DYNAMIC ROUTE SCORE: 82/100', font=f_mono_bold, fill=(56, 189, 248))
d2.text((60, 70 + sr_h + 48), 'Lighting & Density Interactive Map', font=f_small, fill=(190, 215, 235))

d2.rounded_rectangle([(430, 70 + sr_h + 16), (795, H - 75)], radius=10, fill=(10, 26, 45, 230), outline=(14, 165, 233, 140))
d2.text((445, 70 + sr_h + 24), 'INSTANT SOS & PERIMETER BEACON', font=f_mono_bold, fill=(56, 189, 248))
d2.text((445, 70 + sr_h + 48), 'Sub-Second Emergency Distress Dispatch', font=f_small, fill=(190, 215, 235))

draw_bottom_tags(d2, ['Spatial Analytics', 'Route Scoring', 'Mapbox', 'React 19', 'Vercel'])
im2.save(os.path.join(out_dir, 'card-saferoute.png'))

# 3. Data Science Engine Card
im3, d3 = make_base_card('analytics_dashboard.tsx - Visual Data Modeling', 'DATA SCIENCE VISUALS', (45, 18, 65))
d3.rounded_rectangle([(35, 75), (460, H - 75)], radius=12, fill=(16, 14, 26), outline=(168, 85, 247, 100), width=1)
d3.text((55, 95), 'INTERACTIVE LOSS & CLUSTERING UI', font=f_mono_bold, fill=(192, 132, 252))

points = [(60, 360), (100, 320), (150, 260), (200, 210), (260, 180), (320, 160), (380, 145), (440, 138)]
for i in range(len(points)-1):
    d3.line([points[i], points[i+1]], fill=(168, 85, 247), width=3)
    d3.ellipse([(points[i][0]-4, points[i][1]-4), (points[i][0]+4, points[i][1]+4)], fill=(232, 121, 249))
d3.ellipse([(points[-1][0]-4, points[-1][1]-4), (points[-1][0]+4, points[-1][1]+4)], fill=(232, 121, 249))
d3.text((60, 380), 'Epoch 1 -> 50 | Real-Time Canvas Graph', font=f_small, fill=(147, 130, 175))

d3.rounded_rectangle([(480, 75), (805, 185)], radius=12, fill=(22, 16, 36), outline=(168, 85, 247, 120))
d3.text((500, 92), 'PREDICTIVE ACCURACY', font=f_small, fill=(192, 132, 252))
d3.text((500, 118), '98.6% (F1: 0.978)', font=f_title, fill=(245, 240, 255))

d3.rounded_rectangle([(480, 205), (805, 315)], radius=12, fill=(22, 16, 36), outline=(168, 85, 247, 120))
d3.text((500, 222), 'SPATIAL TELEMETRY NODES', font=f_small, fill=(192, 132, 252))
d3.text((500, 248), '1,420 GeoPoints', font=f_title, fill=(245, 240, 255))

d3.rounded_rectangle([(480, 335), (805, H - 75)], radius=12, fill=(22, 16, 36), outline=(168, 85, 247, 120))
d3.text((500, 350), 'FEATURE WEIGHTS', font=f_small, fill=(192, 132, 252))
d3.text((500, 376), 'Lighting 42% - Density 31% - Hazard 27%', font=f_mono, fill=(216, 180, 254))

draw_bottom_tags(d3, ['Python DS', 'Data Dashboards', 'Chart.js', 'Pandas', 'Predictive UI'])
im3.save(os.path.join(out_dir, 'card-datascience.png'))

# 4. Firebase Cloud Architecture Card (Replacing FastAPI backend)
im4, d4 = make_base_card('firebase.config.ts - Realtime Cloud Infrastructure', 'FIREBASE & SERVERLESS', (45, 30, 10))
fb_lines = [
    ('import { initializeApp } from "firebase/app";', (245, 190, 80)),
    ('import { getFirestore, onSnapshot, doc } from "firebase/firestore";', (245, 190, 80)),
    ('import { getAuth, signInWithPopup } from "firebase/auth";', (245, 190, 80)),
    ('', (255, 255, 255)),
    ('// Real-Time MediCycle & SafeRoute Cloud Sync Stream', (120, 140, 160)),
    ('export const db = getFirestore(app);', (52, 211, 153)),
    ('export const subscribeToEmergencyEvents = (userId: string) => {', (56, 189, 248)),
    ('  return onSnapshot(doc(db, "emergency_radar", userId), (snap) => {', (220, 235, 245)),
    ('    updateRouteRisk(snap.data().safetyScore); // Instant Sync', (160, 230, 190)),
    ('  });', (220, 235, 245)),
    ('};', (56, 189, 248))
]
y_code = 80
for line, color in fb_lines:
    d4.text((50, y_code), line, font=f_mono, fill=color)
    y_code += 28

d4.rounded_rectangle([(40, H - 120), (800, H - 70)], radius=10, fill=(36, 24, 12), outline=(245, 158, 11, 120))
d4.text((60, H - 105), 'FIREBASE FIRESTORE  |  REAL-TIME SYNC  |  CLOUD STORAGE  |  EDGE AUTHENTICATION', font=f_mono_bold, fill=(251, 191, 36))

draw_bottom_tags(d4, ['Firebase', 'Cloud Firestore', 'Serverless', 'OAuth Auth', 'Realtime Sync'])
im4.save(os.path.join(out_dir, 'card-fastapi.png'))

# 5. Full-Stack React & TypeScript Card
im5, d5 = make_base_card('src/components/SafeRouteCore.tsx - Strict Typing', 'FRONTEND ARCHITECTURE', (15, 35, 65))
ts_lines = [
    ('interface StakeholderSession {', (110, 190, 255)),
    ('  domainId: "PATIENT" | "HOSPITAL" | "CHEMIST";', (245, 190, 80)),
    ('  verifiedRefills: MedicineBatch[];', (190, 130, 240)),
    ('  securityHash: `0x${string}`;', (160, 230, 190)),
    ('}', (110, 190, 255)),
    ('', (255, 255, 255)),
    ('export const MediCycleNetwork: React.FC<SessionProps> = ({ session }) => {', (245, 190, 80)),
    ('  const [salvageRate, setSalvageRate] = useState<number>(0.942);', (220, 235, 245)),
    ('  const { activeWards, liveInventory } = useClinicalBuffer(session);', (110, 220, 180)),
    ('  return <UnifiedDashboard efficiency={salvageRate} wards={activeWards} />;', (220, 235, 245)),
    ('};', (245, 190, 80))
]
y_ts = 80
for line, color in ts_lines:
    d5.text((50, y_ts), line, font=f_mono, fill=color)
    y_ts += 28

d5.rounded_rectangle([(40, H - 120), (800, H - 70)], radius=10, fill=(14, 28, 48), outline=(56, 189, 248, 120))
d5.text((60, H - 105), 'TYPESCRIPT 5.4  |  REACT 19  |  TAILWIND CSS  |  ZERO TYPE ERRORS  |  BUNDLE: 124KB', font=f_mono_bold, fill=(56, 189, 248))

draw_bottom_tags(d5, ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'])
im5.save(os.path.join(out_dir, 'card-react-ts.png'))

# 6. UI/UX Design System Card (Replacing Docker)
im6, d6 = make_base_card('tailwind.config.js - Custom Design System', 'UI/UX & DESIGN SYSTEMS', (15, 30, 50))
d6.text((50, 80), 'MODERN FRONTEND DESIGN SYSTEM', font=f_title, fill=(240, 245, 255))

nodes = [
    ('FLUID TYPOGRAPHY', 'Clamp Scaling & Dynamic VW', (56, 189, 248)),
    ('GLASSMORPHISM', 'Backdrop Blur & Sub-pixel Borders', (52, 211, 153)),
    ('MICRO-INTERACTIONS', 'Framer Motion Spring Physics', (147, 197, 253)),
    ('ACCESSIBLE PALETTES', 'WCAG AAA High Contrast Dark', (248, 113, 113))
]
x_box = 50
for title, sub, color in nodes:
    d6.rounded_rectangle([(x_box, 150), (x_box + 165, 340)], radius=12, fill=(18, 24, 36), outline=color, width=2)
    d6.text((x_box + 12, 170), title[:11], font=f_mono_bold, fill=color)
    d6.text((x_box + 12, 195), title[11:], font=f_mono_bold, fill=color)
    d6.text((x_box + 12, 240), 'STATUS: OPTIMAL', font=f_small, fill=(220, 230, 240))
    d6.text((x_box + 12, 270), sub[:15], font=f_small, fill=(150, 165, 185))
    d6.text((x_box + 12, 290), sub[15:], font=f_small, fill=(150, 165, 185))
    x_box += 190

d6.rounded_rectangle([(40, H - 120), (800, H - 70)], radius=10, fill=(16, 26, 42), outline=(59, 130, 246, 120))
d6.text((60, H - 105), 'LIGHTHOUSE SCORE: 99/100  |  RESPONSIVE: Mobile to 4K Ultra-Wide  |  FRAMER MOTION', font=f_mono_bold, fill=(96, 165, 250))

draw_bottom_tags(d6, ['UI/UX Design', 'Tailwind CSS', 'Framer Motion', 'Design Systems', 'Responsive'])
im6.save(os.path.join(out_dir, 'card-docker.png'))

# 7. USICT Academic Card
im7, d7 = make_base_card('manifest.edu - USICT Delhi Engineering Identity', 'ACADEMIC FOUNDATION', (30, 15, 55))
d7.text((50, 80), 'UNIVERSITY SCHOOL OF INFORMATION & COMM. TECH', font=f_title, fill=(240, 245, 255))
d7.text((50, 125), 'Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi', font=f_sub, fill=(192, 132, 252))

d7.rounded_rectangle([(50, 180), (410, 340)], radius=12, fill=(24, 18, 42), outline=(168, 85, 247, 120))
d7.text((70, 200), 'B.TECH CSE - DATA SCIENCE', font=f_mono_bold, fill=(216, 180, 254))
d7.text((70, 235), '- Frontend Web Architecture & UI Design', font=f_small, fill=(230, 220, 245))
d7.text((70, 265), '- Data Structures & Algorithm Design', font=f_small, fill=(230, 220, 245))
d7.text((70, 295), '- Applied Data Science & Visualization', font=f_small, fill=(230, 220, 245))

d7.rounded_rectangle([(430, 180), (790, 340)], radius=12, fill=(24, 18, 42), outline=(168, 85, 247, 120))
d7.text((450, 200), 'PROJECTS & COMPETITIONS', font=f_mono_bold, fill=(216, 180, 254))
d7.text((450, 235), '- MediCycle (HealthTech Logistics Prototype)', font=f_small, fill=(230, 220, 245))
d7.text((450, 265), '- SafeRoute (Urban Spatial Safety System)', font=f_small, fill=(230, 220, 245))
d7.text((450, 295), '- Active Hackathon Competitor', font=f_small, fill=(230, 220, 245))

d7.rounded_rectangle([(40, H - 120), (800, H - 70)], radius=10, fill=(28, 18, 48), outline=(168, 85, 247, 120))
d7.text((60, H - 105), 'USICT DELHI  |  B.TECH 1ST YEAR  |  CSE-DATA SCIENCE  |  ENGINEERING EXCELLENCE', font=f_mono_bold, fill=(216, 180, 254))

draw_bottom_tags(d7, ['USICT Delhi', 'CSE Data Science', 'Algorithms', 'Frontend UI', 'Hackathons'])
im7.save(os.path.join(out_dir, 'card-usict.png'))

# 8. Spatial Analytics Card
im8, d8 = make_base_card('spatial_radar.py - Dynamic Path Optimization', 'SPATIAL DATA SCIENCE', (15, 40, 60))
d8.text((50, 80), 'REAL-TIME URBAN RISK CLUSTERING', font=f_title, fill=(240, 245, 255))
d8.text((50, 125), 'A* Search + Multi-Variable Hazard Density Matrix', font=f_sub, fill=(56, 189, 248))

d8.rounded_rectangle([(50, 175), (510, 345)], radius=12, fill=(14, 24, 38), outline=(14, 165, 233, 120))
d8.text((70, 195), 'WAYPOINT EVALUATION MATRIX', font=f_mono_bold, fill=(56, 189, 248))
radar_items = [
    'START: Sector 14 Metro Station (Lat: 28.5921)',
    'DEST:  USICT Campus, Dwarka (Lat: 28.5980)',
    'AVOID: Low-Illumination Corridors (-18 pts)',
    'FAVOR: Verified Commercial Corridors (+24 pts)',
    'RESULT: Path Alpha selected (Safety: 82/100)'
]
y_rad = 225
for item in radar_items:
    d8.text((70, y_rad), item, font=f_small, fill=(210, 230, 245))
    y_rad += 22

d8.rounded_rectangle([(530, 175), (790, 345)], radius=12, fill=(14, 24, 38), outline=(14, 165, 233, 120))
d8.text((550, 195), 'CORE METRICS', font=f_mono_bold, fill=(56, 189, 248))
d8.text((550, 235), 'Transit: 14 mins', font=f_small, fill=(210, 230, 245))
d8.text((550, 265), 'Safety: 82 / 100', font=f_small, fill=(52, 211, 153))
d8.text((550, 295), 'SOS Ready: ACTIVE', font=f_small, fill=(248, 113, 113))

d8.rounded_rectangle([(40, H - 120), (800, H - 70)], radius=10, fill=(14, 24, 40), outline=(14, 165, 233, 120))
d8.text((60, H - 105), 'GEOSPATIAL AI  |  DIJKSTRA & A* SEARCH  |  GEOJSON CLUSTERING  |  LIVE TELEMETRY', font=f_mono_bold, fill=(56, 189, 248))

draw_bottom_tags(d8, ['Geospatial AI', 'A* Algorithm', 'GeoJSON', 'Hazard Clustering', 'Telemetry'])
im8.save(os.path.join(out_dir, 'card-spatial.png'))

print('All 8 frontend-focused cards generated!')

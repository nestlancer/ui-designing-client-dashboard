#!/usr/bin/env python3
"""Blind comparison board (S1): 5 equal-size screenshots, neutral labels A-E,
seeded shuffle. Mapping saved separately - do not open until board notes recorded."""
import sys, json, random, pathlib
from PIL import Image, ImageDraw
fam = sys.argv[1] if len(sys.argv)>1 else "F03"
kind = sys.argv[2] if len(sys.argv)>2 else "desktop-light-top"
LAB = pathlib.Path(__file__).resolve().parents[2]
shots = LAB/"review-evidence"/"screenshots"/fam
versions = [f"V{i}" for i in range(1,6)]
rng = random.Random(20261028 + sum(ord(c) for c in fam))
order = versions[:]; rng.shuffle(order)
labels = ["A","B","C","D","E"]
mapping = {l: v for l, v in zip(labels, order)}
imgs = []
for l, v in zip(labels, order):
    im = Image.open(shots/f"{fam}-{v}-{kind}.png").convert("RGB")
    imgs.append(im)
w = min(i.width for i in imgs)
imgs = [i.crop((0,0,w, min(i.height for i in imgs))) for i in imgs]
h = imgs[0].height
label_h = 48
board = Image.new("RGB", (w*3+16, (h+label_h)*2+8), (30,30,34))
d = ImageDraw.Draw(board)
for idx,(l,im) in enumerate(zip(labels,imgs)):
    x = (idx%3)*(w+8); y = (idx//3)*((h+label_h)+8)
    d.rectangle([x,y,x+w,y+label_h], fill=(245,245,247))
    d.text((x+18,y+12), f"VERSION {l}", fill=(15,15,18))
    board.paste(im, (x, y+label_h))
out = LAB/"review-evidence"/"boards"/f"{fam}-blind-board-{kind}.png"
board.save(out)
mp = LAB/"review-evidence"/"raw"/"blind-mapping.json"
data = json.loads(mp.read_text()) if mp.exists() else {"seed_base":20261028,"families":{}}
data["families"].setdefault(fam,{})[kind]=mapping
mp.write_text(json.dumps(data,indent=2)+"\n")
print("board:", out, "size:", board.size, "(mapping saved separately, not printed)")

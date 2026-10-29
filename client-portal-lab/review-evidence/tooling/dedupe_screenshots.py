from pathlib import Path
from collections import defaultdict
import hashlib,json
E=Path(__file__).resolve().parents[1]; root=E/'screenshots'; groups=defaultdict(list)
for p in root.rglob('*.png'):
 if p.is_file() and not p.is_symlink(): groups[(p.parent,hashlib.sha256(p.read_bytes()).hexdigest())].append(p)
changes=[]
for (_,digest),paths in groups.items():
 if len(paths)<2: continue
 paths.sort(key=lambda p:('task' in p.name,p.name)); canonical=paths[0]
 for p in paths[1:]:
  size=p.stat().st_size; p.unlink(); p.symlink_to(canonical.name)
  changes.append({'path':str(p.relative_to(E)),'target':str(canonical.relative_to(E)),'sha256':digest,'bytes_saved':size})
(E/'raw'/'identical-screenshot-links.json').write_text(json.dumps({'method':'Byte-identical screenshot deduplication; relative symlinks retain original paths and pixels.','links':changes},indent=2)+'\n')
print('linked',len(changes),'saved',sum(x['bytes_saved'] for x in changes),'bytes')

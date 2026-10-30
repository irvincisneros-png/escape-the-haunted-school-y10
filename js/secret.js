// Hidden bonus puzzle: one sleeping bat hangs from the ceiling of every room, tagged with the force it pulls with.
// All six bats tug the mausoleum's 4 kg coffin lid along one line (+ = towards the graveyard, − = back towards the school).
// The mausoleum opens for the lid's acceleration (net force ÷ mass) and reveals a password for Mr. Cisneros.
const BATS = [
  // room, x, room-local depth, force in newtons
  [1, 6.9, 15.2, '+9'],
  [2, 7.2, 0.9, '−2'],
  [3, -7.2, 0.9, '+6'],
  [4, 7.2, 15.2, '−4'],
  [5, -7.2, 15.2, '+8'],
  [6, -7.2, 0.9, '−5'],
];
const OPTIONS = ['1.5', '2', '3', '4', '5.75', '8.5', '12'];
const ANSWER = '3';   // net force = (9 + 6 + 8) − (2 + 4 + 5) = 12 N; a = F ÷ m = 12 ÷ 4 = 3 m/s²
// Kept encoded so a peek at the source doesn't give the treat away.
const SECRET = 'R28gdG8gPGI+TXIuIENpc25lcm9zPC9iPiBhbmQgc2F5IDxiPuKAnEJhbmthaSHigJ08L2I+IG9yIDxiPuKAnERvbWFpbiBFeHBhbnNpb24h4oCdPC9iPiB0byBjbGFpbSB5b3VyIHRyZWF0Lg==';
const reveal = () => new TextDecoder().decode(Uint8Array.from(atob(SECRET), c => c.charCodeAt(0)));

function bat(ctx, x, y, z, n) {
  const { THREE } = ctx, g = new THREE.Group();
  const fur = ctx.mat('#120b1d', { roughness: 0.9 }), eye = ctx.basic('#ff3b3b');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), fur); body.scale.set(1, 1.4, 0.9); g.add(body);
  for (const s of [-1, 1]) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.5, 0.04), fur); w.position.set(s * 0.22, 0.02, 0.06); w.rotation.y = s * 0.7; g.add(w);
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), eye); e.position.set(s * 0.08, -0.2, 0.18); g.add(e);
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 4), fur); ear.position.set(s * 0.1, -0.36, 0); ear.rotation.z = Math.PI; g.add(ear);
  }
  const tex = ctx.canvasTex(128, 96, (c, w, h) => {
    c.fillStyle = '#ffe9a8'; c.shadowColor = '#ffe9a8'; c.shadowBlur = 14;
    c.font = 'bold 50px Creepster, Impact, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(n + 'N', w / 2, h / 2 + 4);
  });
  const tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
  tag.scale.set(1.13, 0.85, 1); tag.position.set(x, y - 0.55, z); ctx.group().add(tag);
  g.position.set(x, y, z);
  g.lookAt(0, y, z + (x > 0 ? -2 : 2));   // face back into the room
  ctx.group().add(g);
  ctx.box(x, y + 0.3, z, 0.03, ctx.WALL_H - y - 0.3, 0.03, fur);   // dangling from a cobweb thread
  ctx.onFrame(t => { g.rotation.z = Math.sin(t * 1.3 + z) * 0.12; });
}

function mausoleum(ctx) {
  const { THREE } = ctx, x = -9.6, z = -102.5;
  const stone = ctx.tmat('stone', '#5a5664', '#24202c', 1, 1), dark = ctx.mat('#0d0a14');
  ctx.box(x, 0, z, 2.6, 2.4, 2.2, stone, { solid: true, cast: true });
  ctx.box(x, 2.4, z, 3.0, 0.3, 2.6, stone);
  ctx.box(x, 2.7, z, 2.2, 0.5, 1.8, stone);
  for (const s of [-1, 1]) ctx.box(x + 1.38, 0, z + s * 0.75, 0.25, 2.4, 0.25, ctx.mat('#7a7682'));
  const door = ctx.box(x + 1.31, 0.05, z, 0.08, 1.9, 1.1, dark);
  const runes = ctx.canvasTex(128, 192, (c, w, h) => {
    c.fillStyle = '#1a1426'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#7dff6a'; c.shadowColor = '#7dff6a'; c.shadowBlur = 10; c.textAlign = 'center';
    c.font = 'bold 26px Creepster, Impact, sans-serif'; c.fillText('6 BATS', w / 2, 60); c.fillText('PULL', w / 2, 92);
    c.font = 'bold 40px Creepster, Impact, sans-serif'; c.fillText('a = ?', w / 2, 158);
  });
  const plate = ctx.plane(x + 1.36, 1.0, z, 1.0, 1.5, new THREE.MeshBasicMaterial({ map: runes }), Math.PI / 2);
  const glow = ctx.light(x + 2.2, 1.6, z, 0x7dff6a, 3, 5, 0.4);
  let sleepUntil = 0;
  const opened = () => ctx.state.isFound('secret-mausoleum');
  const open = () => { door.position.y = -1.6; plate.visible = false; glow.color.set(0xffd24a); };
  if (opened()) open();
  ctx.interact({
    x: x + 2.0, y: 1.0, z, r: 1.8, button: 'Read', label: 'Read the mausoleum door',
    run: async () => {
      if (opened()) { await ctx.note({ kicker: 'Secret found', title: 'The mausoleum is open', html: '<div class="card">' + reveal() + '</div>' }); return; }
      if (Date.now() < sleepUntil) { ctx.toast('The mausoleum is sulking. Try again in a moment.'); return; }
      const pick = await ctx.choose({
        title: 'The sealed mausoleum',
        html: '<p class="clue">Six bats sleep where nobody looks: one in every room of the school, hanging from the ceiling. At midnight they all grab my <b>4 kg</b> coffin lid and pull. Each bat wears the force it pulls with, in newtons: <b>+</b> pulls towards the graveyard, <b>−</b> pulls back towards the school. Tell me the lid\'s <b>acceleration</b> and my door will open.</p>',
        options: OPTIONS.map(o => o + ' m/s²'),
      });
      if (pick < 0) return;
      if (OPTIONS[pick] !== ANSWER) {
        sleepUntil = Date.now() + 45000;
        ctx.sfx('wrong'); ctx.shake(0.25);
        ctx.toast('The door stays shut. Did you find all six bats? Work out the net force first, then use F = m × a.');
        return;
      }
      ctx.state.markFound('secret-mausoleum');
      ctx.sfx('unlock'); ctx.shake(0.4); open();
      await ctx.note({ kicker: 'You found the secret!', title: 'Only the bravest get this far', html: '<div class="card">' + reveal() + '<br><br>Shh! Don\'t tell your classmates. Let them find it themselves.</div>', button: 'My lips are sealed' });
    },
  });
}

export function buildSecret(ctxFor) {
  for (const [r, x, lz, n] of BATS) { const ctx = ctxFor(r); bat(ctx, x, 4.1, ctx.rz(lz), n); }
  mausoleum(ctxFor(7));
}

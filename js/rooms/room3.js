// Room 3 (Dining Hall) extras: goblet puzzle, pantry side room, ghostly dinner guests.
// Puzzle (Year 10 evolution evidence, 5.4.2): the pantry painting is a cliff with four fossil layers. Set the four goblets (1 = oldest ... 4 = youngest layer) to the colour of each fossil -> an arcade coin drops -> insert it in the arcade.
export default {
  side: { side: 1, lz: 12.8, w: 2.6 },
  powerHint: 'The arcade only takes a coin. Check the goblets on the sideboard, and look for fossil clues in the pantry.',
  build(ctx) {
    const { THREE, rz, box, cyl, sph, plane, mat, basic, canvasTex, state, interact, onFrame, candy, dataCard, note, toast, sfx } = ctx;
    const G = ctx.group();
    const ROOM = 3;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const wood = mat('#4a2c16', { roughness: 0.8 }), dwood = mat('#2e1a0e', { roughness: 0.85 });
    const brass = mat('#b8962e', { metalness: 0.6, roughness: 0.4 }), iron = mat('#26242c', { metalness: 0.4, roughness: 0.6 });
    const dark = mat('#0c0806');
    const grp = (x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); G.add(g); return g; };

    // Generic open/close animation: p goes 0 -> 1, apply(p) poses the furniture.
    const openers = [];
    function opener(apply, startOpen) {
      const o = { p: startOpen ? 1 : 0, goal: startOpen ? 1 : 0 };
      apply(o.p); openers.push({ o, apply });
      return o;
    }

    // ------------------------------------------------------------------ goblet puzzle
    const COLS = [{ n: 'Red', c: '#d01830' }, { n: 'Green', c: '#28b82a' }, { n: 'Blue', c: '#2a6ae8' }, { n: 'Gold', c: '#e8b010' }];
    const SOLUTION = [3, 0, 1, 2];            // oldest -> youngest: Trilobite Gold, Dinosaur bone Red, Mammoth tooth Green, Pottery shard Blue
    const solved0 = state.isFound('r3-solved');
    const sbZ = 5.5;
    box(-7.5, 0, rz(sbZ), 0.9, 0.92, 2.2, wood, { solid: true, cam: true });
    box(-7.5, 0.92, rz(sbZ), 1.0, 0.04, 2.3, dwood);
    for (const lz of [4.95, 6.05]) box(-7.04, 0.1, rz(lz), 0.04, 0.7, 0.95, dwood);
    for (const lz of [4.95, 6.05]) sph(-7.01, 0.45, rz(lz - 0.35), 0.04, 0.04, 0.04, brass);
    const gLight = ctx.light(-6.9, 1.7, rz(sbZ), 0xffd9a0, 2, 5, 0.1);
    const gob = [], goblet = SOLUTION.map(() => 0);
    if (solved0) SOLUTION.forEach((v, i) => { goblet[i] = v; });
    const numTex = n => canvasTex(64, 40, (c, w, h) => { c.fillStyle = '#1a0f08'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b8962e'; c.lineWidth = 3; c.strokeRect(2, 2, w - 4, h - 4); c.fillStyle = '#ffe9a8'; c.font = 'bold 28px Nunito, sans-serif'; c.textAlign = 'center'; c.fillText(String(n), w / 2, 30); });
    let solved = solved0;
    for (let i = 0; i < 4; i++) {
      const lz = 4.8 + i * 0.43, x = -7.5, z = rz(lz);
      cyl(x, 0.96, z, 0.075, 0.02, brass, { seg: 8 }); cyl(x, 0.98, z, 0.02, 0.1, brass, { seg: 6 });
      const m = new THREE.MeshStandardMaterial({ color: COLS[goblet[i]].c, emissive: COLS[goblet[i]].c, emissiveIntensity: 0.18, roughness: 0.3 });
      const cup = cyl(x, 1.08, z, 0.085, 0.14, m, { seg: 8 });
      plane(-7.03, 0.55, z, 0.3, 0.19, new THREE.MeshBasicMaterial({ map: numTex(i + 1) }), Math.PI / 2);
      const it = interact({
        x: -7.4, z, y: 1.0, r: 1.3, button: 'Turn',
        label: 'Turn goblet ' + (i + 1) + ' (now ' + COLS[goblet[i]].n + ')',
        active: () => !solved,
        run: async () => {
          goblet[i] = (goblet[i] + 1) % 4;
          m.color.set(COLS[goblet[i]].c); m.emissive.set(COLS[goblet[i]].c);
          it.label = 'Turn goblet ' + (i + 1) + ' (now ' + COLS[goblet[i]].n + ')';
          gob[i].bump = 1; sfx('click');
          if (goblet.every((v, k) => v === SOLUTION[k])) solve();
        },
      });
      gob.push({ cup, bump: 0, y: 1.08 });
    }
    // The coin
    const coin = grp(-7.5, 1.2, rz(6.4));
    cyl(0, -0.02, 0, 0.14, 0.04, brass, { seg: 14, g: coin }); sph(0, 0, 0, 0.08, 0.08, 0.02, mat('#ffe27a', { emissive: '#ffb020', emissiveIntensity: 0.6 }), { g: coin });
    coin.rotation.x = Math.PI / 2; coin.userData.q = 0;
    G.remove(coin);
    const coinHolder = grp(-7.5, 1.2, rz(6.4)); coinHolder.visible = false; coinHolder.add(coin); coin.position.set(0, 0, 0);
    const coinLight = ctx.light(-7.3, 1.6, rz(6.4), 0xffe9b0, 0, 2.5, 0.2);
    let coinT0 = -1, coinOut = false;
    const coinTaken = () => state.isFound('r3-coin-taken') || state.hasItem('r3-coin') || state.hasPower(ROOM);
    function showCoin() { coinOut = true; coinHolder.visible = true; coinLight.i = 1.2; }
    function solve() {
      solved = true; state.markFound('r3-solved'); sfx('unlock'); ctx.shake(0.25);
      toast('The goblets chime together... something falls onto the sideboard!');
      gLight.i = 2.5; coinT0 = -2; showCoin();
    }
    if (solved0 && !coinTaken()) { showCoin(); coinT0 = -1; }
    interact({
      x: -7.3, z: rz(6.4), y: 1.2, r: 1.6, label: 'Take arcade coin', button: 'Take',
      active: () => coinOut && !coinTaken(),
      run: async () => {
        state.markFound('r3-coin-taken'); state.addItem({ id: 'r3-coin', name: 'Arcade coin', emoji: '🪙' });
        coinHolder.visible = false; coinLight.i = 0; coinOut = false; sfx('key');
        toast('You got the arcade coin! Pop it into the arcade machine.');
      },
    });
    // Insert the coin into the arcade (the cabinet itself is built by world.js)
    interact({
      x: -6.1, z: rz(8), y: 1.0, r: 2.0, label: 'Insert the arcade coin', button: 'Insert',
      active: () => state.hasItem('r3-coin') && !state.hasPower(ROOM),
      run: async () => {
        state.useItem('r3-coin'); sfx('unlock'); ctx.shake(0.15);
        state.powerArcade(ROOM);
        toast('Clunk! The arcade machine hums to life. Time to play!');
      },
    });

    // ------------------------------------------------------------------ the table: plates, cloche, candy
    const plates = [];
    const plateM = mat('#e6e0d0', { roughness: 0.3 }), rimM = mat('#b8962e', { metalness: 0.5, roughness: 0.4 });
    for (const [x, lz] of [[-0.5, 5.6], [0.5, 8.0], [-0.5, 9.2], [0.5, 11.6], [-0.5, 11.9], [0.5, 5.2]]) {
      const p = grp(x, 0.98, rz(lz));
      cyl(0, 0, 0, 0.17, 0.025, plateM, { g: p, seg: 12 }); cyl(0, 0.025, 0, 0.1, 0.012, rimM, { g: p, seg: 12 });
      plates.push({ p, x, y: 0.98, z: rz(lz) });
    }
    candy(0.35, 1.25, rz(9.6), 'r3-candy2');
    candy(6.35, 1.5, rz(6.3), 'r3-candy1');          // on the mantelpiece

    // silver cloche
    const clo = grp(0, 0.98, rz(4.95));
    cyl(0, 0, 0, 0.3, 0.03, mat('#c9ccd4', { metalness: 0.7, roughness: 0.3 }), { g: clo, seg: 12 });
    const dome = grp(0, 0.03, 0); clo.add(dome);
    sph(0, 0, 0, 0.28, 0.24, 0.28, mat('#c9ccd4', { metalness: 0.8, roughness: 0.25 }), { g: dome });
    sph(0, 0.26, 0, 0.05, 0.05, 0.05, brass, { g: dome });
    const pea = sph(0, 0.06, 0, 0.05, 0.05, 0.05, mat('#7dff6a', { emissive: '#2a8a1a', emissiveIntensity: 0.6 }), { g: clo });
    const cloOpen = opener(p => { dome.position.y = 0.03 + p * 0.6; dome.rotation.z = p * 0.5; }, state.isFound('r3-cloche'));
    interact({
      x: 0, z: rz(4.95), y: 1.1, r: 1.9, label: 'Lift the silver dish cover', button: 'Lift',
      active: () => !cloOpen.goal,
      run: async () => {
        cloOpen.goal = 1; state.markFound('r3-cloche'); sfx('click');
        toast('Under the cover: a single pea. Fancy dinner... and the pea winks at you.');
      },
    });

    // chest by the entrance
    const chestOpen0 = state.isFound('r3-chest');
    const chestZ = rz(1.5), cb = mat('#5a3418', { roughness: 0.8 });
    box(7.25, 0, chestZ, 0.6, 0.45, 0.9, cb, { solid: true });
    box(7.25, 0.2, chestZ, 0.62, 0.05, 0.92, brass);
    const lid = grp(7.55, 0.45, chestZ);
    box(-0.3, 0, 0, 0.62, 0.14, 0.92, cb, { g: lid }); box(-0.3, 0.14, 0, 0.62, 0.06, 0.2, brass, { g: lid });
    box(7.25, 0.43, chestZ, 0.5, 0.01, 0.8, dark);
    const chestOpen = opener(p => { lid.rotation.z = -1.9 * p; }, chestOpen0);
    const cCandy = candy(7.25, 0.75, chestZ, 'r3-candy3', { hidden: !chestOpen0 });
    interact({
      x: 6.7, z: chestZ, y: 0.6, r: 1.6, label: 'Open the cutlery chest', button: 'Open',
      active: () => !chestOpen.goal,
      run: async () => {
        chestOpen.goal = 1; state.markFound('r3-chest'); sfx('door');
        cCandy.reveal(); toast('Creeeak... a spooky spoon collection, and a candy hiding underneath!');
      },
    });

    // ------------------------------------------------------------------ ghost dinner guests
    const ghosts = [];
    const eyeM = basic(0x0a0a14);
    for (const [x, lz, ry] of [[-1.62, 7.7, Math.PI / 2], [1.62, 9.6, -Math.PI / 2], [-1.62, 11.5, Math.PI / 2], [1.62, 5.8, -Math.PI / 2]]) {
      const g = grp(x, 0, rz(lz)); g.rotation.y = ry;
      const gm = new THREE.MeshBasicMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0, depthWrite: false });
      box(0, 0.58, 0, 0.5, 0.65, 0.34, gm, { g });
      box(-0.3, 0.7, 0.3, 0.13, 0.13, 0.4, gm, { g }); box(0.3, 0.7, 0.3, 0.13, 0.13, 0.4, gm, { g });
      const head = new THREE.Group(); head.position.set(0, 1.5, 0); g.add(head);
      box(-0.17, -0.17, -0.17, 0.34, 0.34, 0.34, gm, { g: head });
      box(-0.1, 0.02, 0.17, 0.07, 0.07, 0.02, eyeM, { g: head }); box(0.03, 0.02, 0.17, 0.07, 0.07, 0.02, eyeM, { g: head });
      box(-0.05, -0.1, 0.17, 0.1, 0.07, 0.02, eyeM, { g: head });
      g.visible = false;
      ghosts.push({ g, gm, head, x, z: rz(lz), ry, ph: Math.random() * 9 });
    }
    let ghostToast = false;

    // ------------------------------------------------------------------ talking portrait (optional ctx.ask)
    const pz = rz(10.9);
    ctx.portrait(ROOM, -7.88, 3.7, pz, Math.PI / 2, 40);
    const pCandy = candy(-7.1, 1.35, pz, 'r3-candy5', { hidden: !state.isFound('r3-portrait') });
    let portraitSays = 0;
    interact({
      x: -6.7, z: pz, y: 1.0, r: 2.2, label: 'Talk to the hungry portrait', button: 'Talk',
      run: async () => {
        if (state.isFound('r3-portrait')) { toast('"Delicious company, dear. Do eat up!" says the portrait.'); return; }
        await note({ kicker: 'Lord Hungry, the portrait', title: 'Psst! Down here!', html: '<p>"I haven\'t eaten since 1853. Answer my little science riddle and I will toss you a sweet. Get it wrong and, well, you may ask again."</p>', button: 'Ask me' });
        const ok = await ctx.ask('Lord Hungry\'s riddle');
        if (ok) {
          state.markFound('r3-portrait'); pCandy.reveal(); sfx('correct');
          toast('"Splendid!" The portrait spits out a candy. It lands in front of the wall.');
        } else {
          portraitSays++; toast(portraitSays > 1 ? '"Tut tut. Try again, I have all night. Forever, actually."' : '"Not quite, dear. Ask me again!"');
        }
      },
    });

    // ------------------------------------------------------------------ PANTRY (side room)
    const b = ctx.sideRoom({ depth: 5.5, lz0: 10.3, lz1: 15.3, wall: ['brick', '#4a3a2c', '#3a2a20'], floor: ['stone', '#6b6672', '#2e2a34'], light: 0xffc890 });
    const zP = lz => rz(lz);
    ctx.light(10.8, 2.6, zP(12.8), 0xffc880, 3, 7, 0.2);
    // doorway welcome candle
    ctx.candle(8.9, 0.9, zP(10.7), ROOM, false, 0.2);
    box(8.7, 0, zP(10.7), 0.4, 0.9, 0.4, dwood, { solid: true });

    // still-life painting (the clue)
    // A cliff with four rock layers (top = youngest). drawForces paints it on any 2D canvas context (base size 360 x 236).
    const LAYERS = [['Pottery shard', '#7a5c3c'], ['Mammoth tooth', '#6a4e48'], ['Dinosaur bone', '#5a4654'], ['Trilobite', '#463a50']];
    function drawForces(c, w, h) {
      c.save(); c.scale(w / 360, h / 236);
      c.fillStyle = '#1a1020'; c.fillRect(0, 0, 360, 236);
      c.fillStyle = '#ffe9a8'; c.font = 'italic bold 15px Nunito, sans-serif'; c.textAlign = 'center'; c.fillText('Still Life: The Cliff at Dead Man\'s Bay', 180, 22);
      c.fillStyle = '#3a7a3a'; c.fillRect(20, 30, 320, 8);
      c.lineCap = 'round'; c.lineJoin = 'round';
      for (let k = 0; k < 4; k++) {
        const y = 38 + k * 46;
        c.fillStyle = LAYERS[k][1]; c.fillRect(20, y, 320, 46);
        c.strokeStyle = '#2a1a22'; c.lineWidth = 2; c.strokeRect(20, y, 320, 46);
        c.fillStyle = '#f3ead8'; c.font = '12px Nunito, sans-serif'; c.textAlign = 'left'; c.fillText(LAYERS[k][0], 150, y + 28);
        const cy = y + 23;
        if (k === 0) {                                  // pottery shard with a zigzag pattern
          c.fillStyle = '#c0703a'; c.beginPath(); c.moveTo(50, cy - 14); c.lineTo(100, cy - 10); c.lineTo(112, cy + 8); c.lineTo(70, cy + 15); c.lineTo(44, cy + 2); c.closePath(); c.fill();
          c.strokeStyle = '#3a1a0a'; c.lineWidth = 2; c.beginPath(); c.moveTo(56, cy); c.lineTo(66, cy - 7); c.lineTo(76, cy); c.lineTo(86, cy - 7); c.lineTo(96, cy); c.stroke();
        } else if (k === 1) {                           // mammoth tooth with ridges
          c.fillStyle = '#e8dcb8'; c.beginPath(); c.moveTo(48, cy - 12); c.lineTo(108, cy - 12); c.lineTo(114, cy + 12); c.lineTo(44, cy + 12); c.closePath(); c.fill();
          c.strokeStyle = '#8a7a58'; c.lineWidth = 2; for (let x = 58; x < 108; x += 10) { c.beginPath(); c.moveTo(x, cy - 12); c.lineTo(x - 2, cy + 12); c.stroke(); }
        } else if (k === 2) {                           // dinosaur bone
          c.fillStyle = '#efe6cc'; c.fillRect(54, cy - 5, 56, 10);
          for (const [bx, by] of [[54, -7], [54, 7], [110, -7], [110, 7]]) { c.beginPath(); c.arc(bx, cy + by, 7, 0, 7); c.fill(); }
        } else {                                        // trilobite: oval body with segments
          c.fillStyle = '#9a8a70'; c.beginPath(); c.ellipse(80, cy, 34, 15, 0, 0, 7); c.fill();
          c.strokeStyle = '#463a50'; c.lineWidth = 2; for (let x = 64; x <= 96; x += 8) { c.beginPath(); c.moveTo(x, cy - 14); c.lineTo(x, cy + 14); c.stroke(); }
          c.fillStyle = '#463a50'; c.beginPath(); c.arc(54, cy - 3, 2, 0, 7); c.fill();
        }
      }
      c.restore();
    }
    const pw = canvasTex(256, 168, (c, w, h) => drawForces(c, w, h));
    const fr = mat('#7a5a22', { metalness: 0.5, roughness: 0.5 });
    box(13.9, 1.55, zP(12.8), 0.12, 1.75, 2.75, fr);
    plane(13.82, 2.42, zP(12.8), 2.5, 1.64, new THREE.MeshBasicMaterial({ map: pw }), -Math.PI / 2);
    const paintingImg = (() => {
      try { const cv = document.createElement('canvas'); cv.width = 720; cv.height = 472; drawForces(cv.getContext('2d'), 720, 472); return '<img src="' + cv.toDataURL() + '" alt="Cliff with four fossil layers" style="width:100%;max-width:420px;display:block;margin:6px auto;border-radius:8px">'; }
      catch (e) { return '<p>A cliff with four rock layers. From the top down: pottery shard, mammoth tooth, dinosaur bone, trilobite.</p>'; }
    })();
    interact({
      x: 11.0, z: zP(12.8), y: 2.0, r: 1.8, label: 'Study the painting', button: 'Look',
      run: async () => {
        sfx('click');
        await note({ kicker: 'Pantry painting', title: 'Still Life: The Cliff at Dead Man\'s Bay', html: '<p>A cliff made of four layers of sedimentary rock. Each layer holds one fossil.</p>' + paintingImg + '<p class="clue">Goblet 1 stands for the <b>oldest</b> layer and goblet 4 for the <b>youngest</b>. Work out the order of the layers. Then find the cook\'s <b>fossil colour chart</b> (in a drawer) to see which colour each fossil needs. Goblet 1 is the one closest to the entrance of the dining hall (where you came in); the goblets are on the sideboard.</p>', button: 'Got it' });
      },
    });

    // prep table with two drawers
    box(13.3, 0, zP(12.8), 0.9, 0.85, 1.9, wood, { solid: true, cam: true });
    box(13.3, 0.85, zP(12.8), 1.0, 0.05, 2.0, dwood);
    const dr = (lz, noteIt) => {
      const d = grp(12.84, 0.5, zP(lz));
      box(-0.02, 0, -0.3, 0.06, 0.25, 0.6, mat('#5a3a1c'), { g: d }); sph(-0.07, 0.12, 0, 0.035, 0.035, 0.035, brass, { g: d });
      box(0.2, -0.04, -0.28, 0.4, 0.05, 0.56, dark, { g: d });
      d.position.z = zP(lz) + 0.3;
      return d;
    };
    const d1 = dr(12.35), d2 = dr(13.25);
    box(12.86, 0.45, zP(12.8), 0.05, 0.02, 1.8, dark);
    const d1o = opener(p => { d1.position.x = 12.84 - p * 0.45; }, state.isFound('r3-drawer1'));
    const d2o = opener(p => { d2.position.x = 12.84 - p * 0.45; }, state.isFound('r3-drawer2'));
    interact({
      x: 12.1, z: zP(12.35), y: 0.7, r: 1.0, label: 'Open the top drawer', button: 'Open',
      run: async () => {
        d1o.goal = 1; state.markFound('r3-drawer1'); sfx('door');
        await note({ kicker: 'Cook\'s old recipe card', title: 'Ghost Stew (serves 13)', html: '<p>Stir three times, never four.</p><p class="clue">PS: To toast the guests properly, set the four goblets on the dining hall sideboard. Goblet 1 is at the entrance end of the hall. Goblet 1 is for the oldest rock layer in the pantry painting and goblet 4 for the youngest. Each goblet gets the colour of the fossil in its layer.</p>' +
          '<div class="card"><p><b>Fossil colour chart</b></p><table class="q-table"><tr><th>Fossil</th><th>Found in</th><th>Colour</th></tr><tr><td>Trilobite</td><td>marine rock</td><td>Gold</td></tr><tr><td>Dinosaur bone</td><td>land rock</td><td>Red</td></tr><tr><td>Mammoth tooth</td><td>cold-land rock</td><td>Green</td></tr><tr><td>Pottery shard</td><td>human site</td><td>Blue</td></tr></table></div>', button: 'Okay' });
      },
    });
    interact({
      x: 12.1, z: zP(13.25), y: 0.7, r: 1.0, label: 'Open the bottom drawer', button: 'Open',
      active: () => !d2o.goal,
      run: async () => {
        d2o.goal = 1; state.markFound('r3-drawer2'); sfx('door');
        toast('Just one sad spoon. It whispers: "I was never a spoon."');
      },
    });

    // oven with a surprise
    const ovZ = 14.8;
    box(10.8, 0, zP(ovZ), 1.5, 1.0, 1.0, iron, { solid: true, cam: true });
    box(10.8, 1.0, zP(ovZ), 1.55, 0.05, 1.05, dwood);
    box(10.8, 0.2, zP(14.3) + 0.02, 1.2, 0.6, 0.03, dark);
    const coals = box(10.8, 0.25, zP(14.35), 1.0, 0.04, 0.2, basic(0xff6a1a));
    coals.visible = state.isFound('r3-oven');
    const odoor = grp(10.8, 0.2, zP(14.3) + 0.035);
    box(0, 0, 0, 1.2, 0.6, 0.05, mat('#34323c', { metalness: 0.4 }), { g: odoor }); box(0, 0.2, 0.03, 0.9, 0.2, 0.01, basic(0x5a2a10), { g: odoor });
    box(-0.5, 0.52, 0.03, 1.0, 0.04, 0.04, brass, { g: odoor });
    const oOpen = opener(p => { odoor.rotation.x = 1.5 * p; }, state.isFound('r3-oven'));
    // the ghost chef
    const chef = grp(10.8, 0.6, zP(ovZ)); chef.visible = false;
    const chefM = new THREE.MeshBasicMaterial({ color: 0xe8f4ff, transparent: true, opacity: 0.8, depthWrite: false });
    box(-0.25, -0.1, -0.2, 0.5, 0.7, 0.4, chefM, { g: chef }); box(-0.2, 0.6, -0.2, 0.4, 0.4, 0.4, chefM, { g: chef }); box(-0.22, 1.0, -0.22, 0.44, 0.35, 0.44, chefM, { g: chef });
    box(-0.12, 0.78, 0.2, 0.08, 0.08, 0.02, eyeM, { g: chef }); box(0.04, 0.78, 0.2, 0.08, 0.08, 0.02, eyeM, { g: chef }); box(-0.1, 0.64, 0.2, 0.2, 0.1, 0.02, eyeM, { g: chef });
    let chefT = -1, tNow = 0;
    interact({
      x: 10.8, z: zP(13.4), y: 0.7, r: 1.3, label: 'Open the oven', button: 'Open',
      active: () => !oOpen.goal,
      run: async () => {
        oOpen.goal = 1; state.markFound('r3-oven'); coals.visible = true; sfx('door');
        setTimeout(() => { sfx('scare'); ctx.shake(0.25); chef.visible = true; chefT = tNow; toast('"WHO TOUCHED MY OVEN?!" The ghost chef vanishes in a puff.'); }, 450);
      },
    });
    // bubbling cauldron on the oven
    cyl(10.8, 1.05, zP(ovZ), 0.38, 0.3, iron, { seg: 10 });
    const brew = cyl(10.8, 1.32, zP(ovZ), 0.32, 0.02, basic(0x5aff4a), { seg: 10 });
    const bubbles = [];
    for (let i = 0; i < 3; i++) bubbles.push(sph(10.8, 1.4, zP(ovZ), 0.06, 0.06, 0.06, basic(0xa8ff8a)));
    const brewLight = ctx.light(10.8, 1.8, zP(ovZ), 0x7dff6a, 3, 5, 0.3);

    // wall cupboard hiding the science card
    const cupOpen0 = state.isFound('r3-cupboard');
    const cx = 11.5, cLz = 10.6;
    box(cx, 0, zP(10.35), 1.5, 2.2, 0.05, dwood); box(cx - 0.72, 0, zP(cLz), 0.06, 2.2, 0.6, wood); box(cx + 0.72, 0, zP(cLz), 0.06, 2.2, 0.6, wood);
    box(cx, 2.2, zP(cLz), 1.56, 0.08, 0.66, wood); box(cx, 0, zP(cLz), 1.4, 0.1, 0.6, wood); box(cx, 1.1, zP(cLz), 1.4, 0.04, 0.58, wood);
    ctx.addSolid(cx, 0, zP(cLz), 1.56, 2.2, 0.66, {});
    for (const [dx, col] of [[-0.45, '#7dff6a'], [0.45, '#c58bff'], [0.0, '#ff7a1a']]) box(cx + dx, 1.14, zP(10.5), 0.22, 0.28, 0.22, mat(col, { emissive: col, emissiveIntensity: 0.3, roughness: 0.4 }));
    const dl = grp(cx - 0.72, 0.1, zP(10.92)), drr = grp(cx + 0.72, 0.1, zP(10.92));
    box(0.37, 0, 0, 0.74, 2.0, 0.05, mat('#5a3a1c'), { g: dl }); sph(0.65, 1.0, -0.05, 0.04, 0.04, 0.04, brass, { g: dl });
    box(-0.37, 0, 0, 0.74, 2.0, 0.05, mat('#5a3a1c'), { g: drr }); sph(-0.65, 1.0, -0.05, 0.04, 0.04, 0.04, brass, { g: drr });
    const cupOpen = opener(p => { dl.rotation.y = 1.9 * p; drr.rotation.y = -1.9 * p; }, cupOpen0);
    const card = dataCard(cx, 1.55, zP(cLz), {
      title: 'Science card: Fossils and genetic variation',
      html: '<p>The <b>Wollemi pine</b> was thought to be extinct, known only from fossils. In 1994 a few living trees were found in a hidden gorge in NSW. Fewer than 100 adult trees live in the wild, and their DNA is almost identical.</p><p>Very little <b>genetic variation</b> means little for natural selection to work on, so one disease could harm them all. Scientists protect the species with a seed bank and by growing seedlings.</p><small>5.2.3, 5.3.2, 5.4.2</small>',
      hidden: !cupOpen0,
    });
    interact({
      x: cx, z: zP(11.8), y: 1.0, r: 1.3, label: 'Open the tall cupboard', button: 'Open',
      active: () => !cupOpen.goal,
      run: async () => {
        cupOpen.goal = 1; state.markFound('r3-cupboard'); sfx('door'); card.reveal();
        toast('Behind the jars, a glowing science card!');
      },
    });

    // barrels, crates and the jump candy
    cyl(9.3, 0, zP(10.9), 0.4, 0.9, mat('#5a3418'), { solid: true, seg: 10 }); cyl(9.3, 0.9, zP(10.9), 0.38, 0.03, iron, { seg: 10 });
    cyl(9.3, 0, zP(15.0), 0.4, 0.9, mat('#5a3418'), { solid: true, seg: 10 }); cyl(9.3, 0.9, zP(15.0), 0.38, 0.03, iron, { seg: 10 });
    const crate = mat('#6a4a22', { roughness: 0.9 });
    box(12.3, 0, zP(14.85), 0.85, 0.6, 0.85, crate, { solid: true, cam: true });
    box(13.35, 0, zP(14.85), 0.85, 1.2, 0.85, crate, { solid: true, cam: true });
    box(13.4, 1.2, zP(14.85), 0.6, 0.6, 0.6, crate, { solid: true, cam: true });
    candy(13.4, 2.35, zP(14.85), 'r3-candy4');

    // hanging pots that sway when you walk in
    box(11.2, 3.4, zP(12.8), 0.06, 0.06, 2.6, iron);
    for (const lz of [11.5, 14.1]) box(11.2, 3.4, zP(lz), 0.05, 2.6, 0.05, iron);
    const pots = [];
    for (const lz of [11.9, 12.8, 13.7]) {
      const p = grp(11.2, 3.4, zP(lz));
      box(0, -0.9, 0, 0.03, 0.9, 0.03, iron, { g: p }); box(-0.14, -1.15, -0.14, 0.28, 0.25, 0.28, iron, { g: p });
      pots.push(p);
    }

    // ------------------------------------------------------------------ per-frame life
    let burst = false;
    onFrame((t, dt) => {
      tNow = t;
      const p = ctx.player();
      // furniture opening
      for (const { o, apply } of openers) {
        if (o.p !== o.goal) { o.p = clamp(o.p + (o.goal ? dt * 2.5 : -dt * 2.5), 0, 1); apply(o.p); }
      }
      // goblet bump + glow
      for (const g of gob) if (g.bump > 0) { g.bump = Math.max(0, g.bump - dt * 4); g.cup.position.y = g.y + 0.07 + Math.sin(g.bump * Math.PI) * 0.08 - 0.07; }
      if (solved) gLight.i = 2 + Math.sin(t * 6) * 0.4;
      // coin drop
      if (coinOut) {
        if (coinT0 === -2) coinT0 = t;
        const tt = coinT0 < 0 ? 99 : t - coinT0;
        let y = 1.2;
        if (tt < 0.63) y = 1.2 + 2.4 - 6 * tt * tt * 1.05; else if (tt < 1.4) y = 1.2 + 0.2 * Math.abs(Math.sin((tt - 0.63) * 7)) * Math.exp(-(tt - 0.63) * 3); else y = 1.25 + Math.sin(t * 2.5) * 0.04;
        coinHolder.position.y = Math.max(1.2, y); coinHolder.rotation.y = t * 3;
        if (tt > 0 && tt < 0.07) sfx('click');
      }
      // ghosts: fade in as you approach, turn heads to watch you
      for (let i = 0; i < ghosts.length; i++) {
        const gh = ghosts[i], d = Math.hypot(p.x - gh.x, p.z - gh.z);
        const target = clamp((6.5 - d) / 3, 0, 1) * (0.42 + Math.sin(t * 3 + gh.ph) * 0.08);
        gh.gm.opacity += (target - gh.gm.opacity) * Math.min(1, dt * 3);
        gh.g.visible = gh.gm.opacity > 0.02;
        if (gh.g.visible) {
          const a = Math.atan2(p.x - gh.x, p.z - gh.z) - gh.ry;
          gh.head.rotation.y = clamp(Math.atan2(Math.sin(a), Math.cos(a)), -1.1, 1.1);
          gh.g.position.y = Math.sin(t * 1.5 + gh.ph) * 0.03;
        }
        if (!ghostToast && gh.gm.opacity > 0.3) { ghostToast = true; toast('A chill... the empty chairs are not so empty. The guests are watching you.'); }
      }
      // plates rattle in bursts when you are near the table
      const nearTable = Math.abs(p.x) < 4.5 && p.z < rz(4) && p.z > rz(12.6);
      const phase = (t + 2) % 8, on = nearTable && phase < 1.5;
      if (on && !burst) { sfx('tick'); }
      burst = on;
      for (let i = 0; i < plates.length; i++) {
        const pl = plates[i];
        if (on) { const a = 1 - phase / 1.5; pl.p.position.x = pl.x + Math.sin(t * 70 + i) * 0.012 * a; pl.p.rotation.z = Math.sin(t * 55 + i * 2) * 0.07 * a; pl.p.position.y = pl.y + Math.abs(Math.sin(t * 40 + i)) * 0.02 * a; }
        else if (pl.p.rotation.z !== 0) { pl.p.rotation.z = 0; pl.p.position.x = pl.x; pl.p.position.y = pl.y; }
      }
      // pantry: bubbling brew, swinging pots, ghost chef
      if (p.x > 8) {
        brewLight.i = 2.5 + Math.sin(t * 7) * 0.8;
        for (let i = 0; i < bubbles.length; i++) { const k = ((t * 0.6 + i / 3) % 1); bubbles[i].position.y = 1.35 + k * 0.5; bubbles[i].position.x = 10.8 + Math.sin(i * 2.1) * 0.15; bubbles[i].scale.setScalar(0.03 + Math.sin(k * Math.PI) * 0.05); }
        const near = clamp((7 - Math.hypot(p.x - 11.2, p.z - rz(12.8))) / 7, 0, 1);
        for (let i = 0; i < pots.length; i++) pots[i].rotation.z = Math.sin(t * 2 + i * 1.3) * (0.05 + near * 0.28);
      }
      if (chefT >= 0) {
        const k = (t - chefT) / 2.6;
        if (k >= 1) { chef.visible = false; chefT = -1; }
        else { chef.position.y = 0.6 + k * 1.2; chef.position.z = zP(ovZ) + k * 1.8; chef.scale.setScalar(0.6 + Math.sin(k * Math.PI) * 0.9); chefM.opacity = 0.85 * (1 - k * k); chef.rotation.y = Math.sin(t * 20) * 0.1; }
      }
    });
  },
};

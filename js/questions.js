// All question data for the Year 10 Science Yearly Exam 2026 revision escape game (Halloween).
// Lock schema and MINI_QUESTIONS format are defined in CONTRACT.md.
// Answers are compared after normalising (lowercase, letters and digits only),
// so '%', '/', '.', spaces and superscripts are stripped. '1/4' becomes '14' and '2.5' becomes '25'.

export const LOCKS = {
  // ---------------------------------------------------------------
  // LOCK 1: Entrance Hall. Data Science 8.1 / 8.2 (investigable questions, pseudoscience, test design).
  // ---------------------------------------------------------------
  1: {
    title: 'The VampStop Scam',
    story: 'The front door is sealed by a science lock. A shop in the hall sells "VampStop" crystals. Think like a scientist and pick the right answer for each item to break the spell.',
    prompt: `
      <p>Read the advert, then choose the best answer for each row.</p>
      <div class="q-post"><span class="who">VampStop Crystal</span><small>advert</small>
        <p>"Wear the VampStop crystal and no vampire will bite you! 9 out of 10 customers say they feel safer. Its quantum energy field balances your aura. It only works if you believe in it."</p>
      </div>`,
    type: 'select',
    items: [
      {
        text: 'Question A: "Does the temperature of the water change how long a glow stick glows?"',
        options: ['Investigable at school', 'Not investigable: it is an opinion', 'Not investigable: we do not have the resources', 'Not investigable: it cannot be measured'],
        answer: 'Investigable at school'
      },
      {
        text: 'Question B: "How quickly does a pumpkin fall on the surface of Mars?"',
        options: ['Investigable at school', 'Not investigable: it is an opinion', 'Not investigable: we do not have the resources', 'Not investigable: it cannot be measured'],
        answer: 'Not investigable: we do not have the resources'
      },
      {
        text: 'The advert says "Its quantum energy field balances your aura." This is an example of:',
        options: ['Precise, measurable science', 'Vague, scientific-sounding words', 'A controlled variable'],
        answer: 'Vague, scientific-sounding words'
      },
      {
        text: 'The advert says "9 out of 10 customers say they feel safer." The advert relies on:',
        options: ['A large random sample', 'Peer review', 'Testimonials instead of a controlled test'],
        answer: 'Testimonials instead of a controlled test'
      },
      {
        text: 'Which is the best plan to test the claim "garlic spray keeps bats away from caves"?',
        options: [
          'Spray one cave and see if the bats leave',
          'Ask five friends if they think it works',
          'Spray 10 randomly chosen caves, leave 10 unsprayed as a control, and count the bats in all 20'
        ],
        answer: 'Spray 10 randomly chosen caves, leave 10 unsprayed as a control, and count the bats in all 20'
      }
    ],
    hints: [
      'An investigable question can be answered by measuring something with equipment you have. Pseudoscience often uses testimonials, vague words and claims that cannot be tested.',
      'Start with Question A: you can change the water temperature and time the glow with a stopwatch. For Question B, ask yourself whether a school could get a pumpkin to Mars.',
      'For the last row, a good test has a control group, groups chosen at random, a large sample and repeats. Words like "quantum" and "aura" sound clever but are never defined.'
    ],
    lesson: {
      title: 'The front door creaks open!',
      text: '<p>An <b>investigable</b> question can be measured and tested with the resources you have. <b>Pseudoscience</b> looks like science but uses testimonials, vague words and claims that cannot be tested. A good test uses a control group, random groups, a large sample and repeats.</p>',
      dot: '8.2.2 Identifying pseudoscience'
    }
  },

  // ---------------------------------------------------------------
  // LOCK 2: Library. Genetics 5.1 / 5.2 (pedigree, Punnett square, DNA base pairing).
  // ---------------------------------------------------------------
  2: {
    title: 'The Gloomhound Family Tree',
    story: 'A family of gloomhounds haunts the library. Some have glowing eyes. Read their family tree to unlock the shelves.',
    prompt: `
      <p>Glowing eyes in gloomhounds is an <b>autosomal recessive</b> trait. <b>G</b> is the normal allele and <b>g</b> is the glowing-eye allele. Filled shapes have glowing eyes. Squares are males and circles are females.</p>
      <svg viewBox="0 0 450 310" width="100%" style="max-width:420px" role="img" aria-label="Pedigree of seven gloomhounds in three generations">
        <g stroke="#f3ead8" stroke-width="2" fill="none">
          <line x1="165" y1="50" x2="255" y2="50"/>
          <line x1="210" y1="50" x2="210" y2="100"/>
          <line x1="90" y1="100" x2="210" y2="100"/>
          <line x1="90" y1="100" x2="90" y2="125"/>
          <line x1="210" y1="100" x2="210" y2="125"/>
          <line x1="225" y1="140" x2="315" y2="140"/>
          <line x1="270" y1="140" x2="270" y2="190"/>
          <line x1="230" y1="190" x2="310" y2="190"/>
          <line x1="230" y1="190" x2="230" y2="215"/>
          <line x1="310" y1="190" x2="310" y2="215"/>
          <rect x="135" y="35" width="30" height="30"/>
          <circle cx="270" cy="50" r="15"/>
          <rect x="75" y="125" width="30" height="30"/>
          <circle cx="210" cy="140" r="15" fill="#ff7a1a"/>
          <rect x="315" y="125" width="30" height="30"/>
          <circle cx="230" cy="230" r="15"/>
          <rect x="295" y="215" width="30" height="30" fill="#ff7a1a"/>
        </g>
        <g fill="#f3ead8" font-size="14" font-family="sans-serif" text-anchor="middle">
          <text x="150" y="82">1</text>
          <text x="270" y="82">2</text>
          <text x="90" y="172">3</text>
          <text x="210" y="172">4</text>
          <text x="330" y="172">5</text>
          <text x="230" y="262">6</text>
          <text x="310" y="262">7</text>
        </g>
        <g fill="#a99fbf" font-size="14" font-family="sans-serif" font-weight="bold">
          <text x="14" y="55">I</text>
          <text x="14" y="145">II</text>
          <text x="14" y="235">III</text>
        </g>
        <g stroke="#f3ead8" stroke-width="2" fill="none">
          <rect x="30" y="282" width="14" height="14"/>
          <rect x="190" y="282" width="14" height="14" fill="#ff7a1a"/>
        </g>
        <g fill="#a99fbf" font-size="12" font-family="sans-serif">
          <text x="50" y="294">Normal eyes</text>
          <text x="210" y="294">Glowing eyes</text>
        </g>
      </svg>
      <p>A <b>Punnett square</b> will help with the probabilities. Use the numbers in the tree.</p>
      <h3>The DNA clue</h3>
      <p>The start of the gene reads <b>A T G C C A</b> on one strand of DNA.</p>`,
    type: 'multi',
    fields: [
      { label: 'How many gloomhounds are definitely carriers (Gg)?', answer: ['4', 'four'] },
      { label: 'Chance (%) that the next pup of 1 and 2 has glowing eyes', answer: ['25', '25percent', '14', '025'] },
      { label: 'Chance (%) that the next pup of 4 and 5 has glowing eyes', answer: ['50', '50percent', '12', '05'] },
      { label: 'Is gloomhound 6 homozygous or heterozygous?', answer: ['heterozygous', 'hetero', 'heterozygote'] },
      { label: 'Complementary DNA strand (6 letters)', answer: ['tacggt'] }
    ],
    hints: [
      'Two unaffected parents with an affected pup must both carry the recessive allele. Use a Punnett square for each couple. In DNA, A pairs with T and C pairs with G.',
      'Gloomhounds 1 and 2 are both Gg, so the square gives GG, Gg, Gg and gg. Gloomhound 4 has glowing eyes, so she is gg. Her pup 7 is also gg, so 5 must be able to pass on a g.',
      'Gloomhound 5 is normal but has a glowing-eyed pup, so he must be Gg. Draw the 4 x 5 square (gg x Gg). Pup 6 is normal, but think about which allele her mother could give her.'
    ],
    lesson: {
      title: 'The shelves slide open!',
      text: '<p>In a pedigree, two unaffected parents with an affected child must both be <b>carriers</b> of a recessive allele. A Punnett square shows the chance of each genotype. Two carriers (Gg x Gg) have a 25% chance of an affected pup, and a carrier with an affected partner (Gg x gg) has a 50% chance. DNA bases pair A with T and C with G.</p>',
      dot: '5.2.5 Pedigrees and Punnett squares'
    }
  },

  // ---------------------------------------------------------------
  // LOCK 3: Dining Hall. Mutation, natural selection and genetic technologies (5.2.3, 5.3.x, 5.4.1).
  // ---------------------------------------------------------------
  3: {
    title: 'The Cursed Banquet',
    story: 'The dinner guests are arguing about how living things change over time. Some are right and some are talking nonsense. Sort their claims to end the feast.',
    prompt: `
      <p>Sort each claim into <b>Correct science</b> or <b>Misconception</b>.</p>`,
    type: 'sort',
    bins: ['Correct science', 'Misconception'],
    items: [
      { text: 'A mutation makes a few cave spiders pale. Pale spiders are harder to see on the pale rock, so more of them survive, breed and pass on the allele.', bin: 0 },
      { text: 'Two groups of the same beetle species are split by a new river. Over many generations they become so different that they can no longer breed together.', bin: 0 },
      { text: 'Farmers choose the biggest pumpkins to breed each year. After many seasons the pumpkins are larger on average.', bin: 0 },
      { text: 'A crow grew thick feathers during winter, so its chicks were born with thick feathers too.', bin: 1 },
      { text: 'Frogs changed their skin colour on purpose because they needed to hide.', bin: 1 },
      { text: 'All mutations are harmful, so they can never help a species.', bin: 1 }
    ],
    hints: [
      'Natural selection works on variation that already exists in a population. The better-suited individuals survive and reproduce more. Isolation can lead to new species.',
      'Ask two things about each claim: where did the variation come from (a mutation or chance, not a wish), and does the trait have to be in the genes to be passed on?',
      'Traits gained during one lifetime are not passed on, and organisms do not change because they "need" to. Three of the six claims are wrong, and one of those talks about all mutations.'
    ],
    lesson: {
      title: 'The candles go out!',
      text: '<p>Mutations create new alleles by chance, and they can be harmful, helpful or have no effect. In <b>natural selection</b>, individuals with helpful variations survive and pass those genes on. <b>Isolation</b> can split a species into two. <b>Selective breeding</b> is natural selection steered by humans, and it is different from genetic modification.</p>',
      dot: '5.4.1 Natural selection and isolation'
    }
  },

  // ---------------------------------------------------------------
  // LOCK 4: Ballroom. Chemical reactions 6.1 / 6.2: decode the password GOBLIN.
  // ---------------------------------------------------------------
  4: {
    title: 'The Goblin Potion Code',
    story: 'A goblin chemist has scrambled the ballroom lock. Solve each potion clue, find the answer in the key, and read the letters in order.',
    prompt: `
      <p>Work out the answer to each clue. Find it in the key. The 6 letters, in clue order, spell the password. Some key entries are decoys.</p>
      <h3>Potion key</h3>
      <ul class="q-key">
        <li><b>S</b> Synthesis</li>
        <li><b>O</b> Decomposition</li>
        <li><b>G</b> CaCl<sub>2</sub></li>
        <li><b>A</b> CaCl</li>
        <li><b>B</b> Hydrogen</li>
        <li><b>E</b> Oxygen</li>
        <li><b>L</b> 5</li>
        <li><b>M</b> 3</li>
        <li><b>T</b> 4</li>
        <li><b>I</b> Basic (alkaline)</li>
        <li><b>U</b> Acidic</li>
        <li><b>D</b> Neutral</li>
        <li><b>N</b> 7 g</li>
        <li><b>R</b> 15 g</li>
      </ul>
      <h3>The clues</h3>
      <ol>
        <li>The formula of the compound made from calcium ions (Ca<sup>2+</sup>) and chloride ions (Cl<sup>−</sup>).</li>
        <li>2H<sub>2</sub>O<sub>2</sub> → 2H<sub>2</sub>O + O<sub>2</sub>. What type of reaction is this?</li>
        <li>Zinc + hydrochloric acid → zinc chloride + ? Name the gas that forms.</li>
        <li>Balance C<sub>3</sub>H<sub>8</sub> + __ O<sub>2</sub> → 3CO<sub>2</sub> + 4H<sub>2</sub>O. What is the missing coefficient?</li>
        <li>A cleaning potion has a pH of 11. Is it acidic, neutral or basic?</li>
        <li>An open beaker holds 85 g of mixture before a fizzing reaction and 78 g after. What mass of gas escaped?</li>
      </ol>`,
    type: 'text',
    answer: ['goblin'],
    hints: [
      'Answer each clue first, then find the answer in the key and write down its letter. Use the data sheet rules, such as acid + metal → salt + hydrogen.',
      'Clue 1: calcium has a 2+ charge and chloride has a 1− charge, so the charges only balance if you swap the numbers over. That gives one calcium and two chlorides. Find that formula in the key.',
      'Clue 4: count the oxygen atoms on the right (3 x 2 from CO2, plus 4 from water), then divide by 2 because each O2 has two atoms. Clue 6: mass lost = mass before − mass after.'
    ],
    lesson: {
      title: 'The ballroom doors swing open!',
      text: '<p>Ionic formulas balance charges: Ca<sup>2+</sup> needs two Cl<sup>−</sup>, so CaCl<sub>2</sub>. In a balanced equation there are the same atoms on both sides, so <b>mass is conserved</b>. If mass seems to be lost in an open beaker, a gas has escaped. A pH below 7 is acidic, 7 is neutral and above 7 is basic.</p>',
      dot: '6.2.2 Balanced chemical equations'
    }
  },

  // ---------------------------------------------------------------
  // LOCK 5: Cellar. Rates of reaction and nuclear reactions 6.3 / 6.4.
  // ---------------------------------------------------------------
  5: {
    title: 'The Glowing Barrels',
    story: 'Barrels of radioactive green goo glow in the cellar. Crack the half-life and decay riddles to stop the glow.',
    prompt: `
      <p>A water company stores a sample of sodium-24, a radioisotope it pumps into pipes to find leaks.</p>
      <table class="q-table">
        <thead><tr><th>Time (hours)</th><th class="n">Mass of Na-24 left (g)</th></tr></thead>
        <tbody>
          <tr><td>0</td><td class="n">320</td></tr>
          <tr><td>15</td><td class="n">160</td></tr>
          <tr><td>30</td><td class="n">80</td></tr>
        </tbody>
      </table>
      <p><b>Alpha decay:</b> radium-226 (atomic number 88) emits an alpha particle (<sup>4</sup><sub>2</sub>He) and becomes radon.<br>
      <b>Beta decay:</b> cobalt-60 (atomic number 27) emits a beta particle and becomes nickel.<br>
      <b>Rates:</b> Barrel tablets fizz faster when they are crushed into powder.</p>`,
    type: 'multi',
    fields: [
      { label: 'Half-life of Na-24 (hours)', answer: ['15', '15h', '15hours', '15hour', '15hrs', '15hr'] },
      { label: 'Mass of Na-24 left after 60 hours (g)', answer: ['20', '20g', '20grams'] },
      { label: 'Mass number of the radon nucleus', answer: ['222'] },
      { label: 'Atomic number of the radon nucleus', answer: ['86'] },
      { label: 'Atomic number of the nickel nucleus', answer: ['28'] },
      { label: 'Which factor increased when the tablets were crushed? (two words)', answer: ['surfacearea', 'increasedsurfacearea', 'thesurfacearea'] }
    ],
    hints: [
      'Half-life is the time for half of the atoms to decay, so the mass halves each time. In alpha decay the nucleus loses 4 from its mass number and 2 from its atomic number. In beta decay the mass number stays the same.',
      'Look at how long the mass takes to go from 320 g to 160 g. Then work out how many half-lives fit into 60 hours. For radium-226, subtract the alpha particle\'s numbers from 226 and 88.',
      '60 hours is 4 half-lives, so halve 320 four times. In beta decay a neutron turns into a proton, so count what that does to cobalt\'s 27 protons. Crushing exposes more of the solid to the liquid.'
    ],
    lesson: {
      title: 'The barrels fall silent!',
      text: '<p>A <b>half-life</b> is the time for half of the atoms in a radioactive sample to decay. In <b>alpha decay</b> the mass number drops by 4 and the atomic number by 2. In <b>beta decay</b> the mass number stays the same and the atomic number goes up by 1. A bigger surface area, higher temperature, higher concentration or a catalyst all speed up a reaction.</p>',
      dot: '6.4.3 Nuclear equations and half-life'
    }
  },

  // ---------------------------------------------------------------
  // LOCK 6: Clock Tower. Waves and motion 7.1 to 7.4 (graph, speed, acceleration, F = ma, v = f x lambda).
  // ---------------------------------------------------------------
  6: {
    title: 'The Midnight Chimes',
    story: 'The clock tower is stuck at 11:59. A ghost races up the stairs and rings the great bell. Do the motion sums to start the clock and escape.',
    prompt: `
      <p>The graph shows how far a ghost travels up the tower stairs.</p>
      <svg viewBox="0 0 450 300" width="100%" style="max-width:420px" role="img" aria-label="Distance-time graph of a ghost on the tower stairs">
        <g stroke="#a99fbf" stroke-opacity="0.35" stroke-width="1">
          <line x1="60" y1="215" x2="420" y2="215"/>
          <line x1="60" y1="180" x2="420" y2="180"/>
          <line x1="60" y1="145" x2="420" y2="145"/>
          <line x1="60" y1="110" x2="420" y2="110"/>
          <line x1="60" y1="75" x2="420" y2="75"/>
          <line x1="60" y1="40" x2="420" y2="40"/>
          <line x1="120" y1="40" x2="120" y2="250"/>
          <line x1="180" y1="40" x2="180" y2="250"/>
          <line x1="240" y1="40" x2="240" y2="250"/>
          <line x1="300" y1="40" x2="300" y2="250"/>
          <line x1="360" y1="40" x2="360" y2="250"/>
          <line x1="420" y1="40" x2="420" y2="250"/>
        </g>
        <g stroke="#f3ead8" stroke-width="2" fill="none">
          <line x1="60" y1="40" x2="60" y2="250"/>
          <line x1="60" y1="250" x2="420" y2="250"/>
        </g>
        <polyline points="60,250 180,180 300,180 420,40" fill="none" stroke="#ff7a1a" stroke-width="3"/>
        <g fill="#7dff6a">
          <circle cx="60" cy="250" r="4"/>
          <circle cx="180" cy="180" r="4"/>
          <circle cx="300" cy="180" r="4"/>
          <circle cx="420" cy="40" r="4"/>
        </g>
        <g fill="#f3ead8" font-size="12" font-family="sans-serif" text-anchor="end">
          <text x="52" y="254">0</text>
          <text x="52" y="219">10</text>
          <text x="52" y="184">20</text>
          <text x="52" y="149">30</text>
          <text x="52" y="114">40</text>
          <text x="52" y="79">50</text>
          <text x="52" y="44">60</text>
        </g>
        <g fill="#f3ead8" font-size="12" font-family="sans-serif" text-anchor="middle">
          <text x="60" y="268">0</text>
          <text x="120" y="268">2</text>
          <text x="180" y="268">4</text>
          <text x="240" y="268">6</text>
          <text x="300" y="268">8</text>
          <text x="360" y="268">10</text>
          <text x="420" y="268">12</text>
        </g>
        <g fill="#a99fbf" font-size="13" font-family="sans-serif" text-anchor="middle">
          <text x="240" y="292">Time (s)</text>
          <text transform="translate(16,145) rotate(-90)">Distance (m)</text>
        </g>
      </svg>
      <p>Then use these formulas: <b>a = (v − u) ÷ t</b>, <b>F = m × a</b> and <b>v = f × λ</b>.</p>
      <ul>
        <li>A bell-ringer's cart (mass 25 kg) speeds up from 4 m/s to 16 m/s in 3 s.</li>
        <li>The great bell makes a sound wave with frequency 170 Hz and wavelength 2.0 m.</li>
      </ul>`,
    type: 'multi',
    fields: [
      { label: 'Speed of the ghost in the last section, 8 s to 12 s (m/s)', answer: ['10', '10ms', '100', '10mps'] },
      { label: 'Distance the ghost travels from 8 s to 12 s (m)', answer: ['40', '40m', '400'] },
      { label: 'Average speed of the ghost over the whole 12 s (m/s)', answer: ['5', '5ms', '50', '5mps'] },
      { label: 'Acceleration of the cart (m/s²)', answer: ['4', '4ms', '4ms2', '40'] },
      { label: 'Net force needed to accelerate the cart (N)', answer: ['100', '100n', '1000'] },
      { label: 'Speed of the bell\'s sound wave (m/s)', answer: ['340', '340ms', '3400', '340mps'] }
    ],
    hints: [
      'Speed = distance ÷ time. On a distance-time graph the slope is the speed. Acceleration = change in speed ÷ time, and force = mass x acceleration. For waves use v = f x λ.',
      'Read the last section: the ghost goes from 20 m at 8 s to 60 m at 12 s. Subtract to get the distance, then divide by the time. For the whole trip, use the total distance and the total time.',
      'The flat part from 4 s to 8 s means the ghost has stopped, but those seconds still count in the average speed. For the cart, find the change in speed before you divide by the time, then use that acceleration in F = m x a.'
    ],
    lesson: {
      title: 'The clock strikes midnight!',
      text: '<p>On a <b>distance-time graph</b> the slope is the speed and a flat line means the object is stopped. <b>Acceleration</b> = (v − u) ÷ t, and <b>net force</b> = mass × acceleration. A wave\'s speed is its frequency times its wavelength.</p>',
      dot: '7.4.7 Motion graphs and formulas'
    }
  }
};

export const MINI_QUESTIONS = [
  // ---- Reactions (6.1 to 6.4) ----
  {
    q: 'Lithium ions are Li⁺ and oxide ions are O²⁻. What is the formula of lithium oxide?',
    options: ['LiO', 'Li₂O₂', 'Li₂O', 'LiO₂'],
    answer: 2,
    explain: 'Two Li⁺ (total +2) balance one O²⁻ (total −2), so the formula is Li₂O.'
  },
  {
    q: 'Balance the equation: N₂ + __ H₂ → __ NH₃. What are the coefficients for H₂ and NH₃?',
    options: ['3 and 2', '2 and 3', '1 and 2', '3 and 3'],
    answer: 0,
    explain: 'N₂ + 3H₂ → 2NH₃ has 2 N and 6 H on both sides.'
  },
  {
    q: 'Silver nitrate solution is mixed with sodium chloride solution. A white solid forms. What type of reaction is this?',
    options: ['Neutralisation', 'Combustion', 'Decomposition', 'Precipitation'],
    answer: 3,
    explain: 'Two solutions swap partners (AB + CD → AD + CB) and form an insoluble solid, a precipitation reaction.'
  },
  {
    q: 'Which products form when hydrochloric acid reacts with calcium carbonate?',
    options: [
      'Calcium chloride and hydrogen',
      'Calcium chloride, water and carbon dioxide',
      'Calcium oxide and water',
      'Calcium chloride and water only'
    ],
    answer: 1,
    explain: 'Acid + carbonate → salt + water + carbon dioxide.'
  },
  {
    q: 'An acid and a base react completely in the right amounts. The final pH of the mixture is closest to:',
    options: ['0', '7', '10', '14'],
    answer: 1,
    explain: 'Neutralisation produces a salt and water. If it is complete, the mixture is neutral, pH 7.'
  },
  {
    q: 'In a sealed flask, 12 g of A reacts with 20 g of B to make C and D. C has a mass of 9 g. What is the mass of D?',
    options: ['3 g', '11 g', '32 g', '23 g'],
    answer: 3,
    explain: 'Mass is conserved: 12 + 20 = 32 g in total. D = 32 − 9 = 23 g.'
  },
  {
    q: 'Which change would make marble chips react with acid more slowly?',
    options: [
      'Using a more dilute acid',
      'Crushing the chips into powder',
      'Warming the acid',
      'Adding a catalyst'
    ],
    answer: 0,
    explain: 'A lower concentration means fewer particles to collide, so the rate drops. The other changes speed it up.'
  },
  {
    q: 'Why does a higher temperature speed up a reaction?',
    options: [
      'The particles become heavier and hit harder',
      'There are more particles in the container',
      'Particles move faster, so more collisions have enough energy',
      'The products become more stable'
    ],
    answer: 2,
    explain: 'Faster particles collide more often and more of the collisions have enough energy to react.'
  },
  {
    q: 'A catalyst is a substance that:',
    options: [
      'Is used up and changes the products',
      'Increases the energy of every particle',
      'Increases the mass of the products',
      'Speeds up a reaction and is not used up'
    ],
    answer: 3,
    explain: 'A catalyst lowers the energy needed for the reaction. It is not used up and the products stay the same.'
  },
  {
    q: 'Which type of nuclear radiation is stopped by a sheet of paper?',
    options: ['Alpha', 'Beta', 'Gamma', 'All three'],
    answer: 0,
    explain: 'Alpha particles are large and are stopped by paper. Beta needs aluminium and gamma needs thick lead or concrete.'
  },
  {
    q: 'Radon-222 (atomic number 86) emits an alpha particle (⁴₂He). What are the mass number and atomic number of the new nucleus?',
    options: ['222 and 87', '218 and 88', '218 and 84', '226 and 84'],
    answer: 2,
    explain: 'Alpha decay subtracts 4 from the mass number (222 − 4 = 218) and 2 from the atomic number (86 − 2 = 84).'
  },
  {
    q: 'Sodium-24 (atomic number 11) undergoes beta decay. What is the new nucleus?',
    options: [
      'Mass number 24, atomic number 10',
      'Mass number 24, atomic number 12',
      'Mass number 23, atomic number 11',
      'Mass number 20, atomic number 9'
    ],
    answer: 1,
    explain: 'In beta decay a neutron becomes a proton. The mass number stays 24 and the atomic number rises to 12.'
  },
  {
    q: 'A radioisotope has a half-life of 3 days. A 48 g sample is stored for 12 days. How much is left?',
    options: ['3 g', '12 g', '6 g', '0 g'],
    answer: 0,
    explain: '12 days is 4 half-lives. 48 → 24 → 12 → 6 → 3 g.'
  },
  {
    q: 'Which statement describes nuclear fusion?',
    options: [
      'A large nucleus splits into two smaller nuclei',
      'A nucleus emits an alpha particle',
      'Small nuclei join to form a larger nucleus, releasing energy',
      'A neutron changes into a proton'
    ],
    answer: 2,
    explain: 'Fusion joins small nuclei, such as hydrogen into helium, and powers the Sun. Splitting a large nucleus is fission.'
  },
  {
    q: 'Which elements were the first to form after the Big Bang?',
    options: ['Carbon and oxygen', 'Iron and nickel', 'Oxygen and nitrogen', 'Hydrogen and helium'],
    answer: 3,
    explain: 'The early Universe cooled enough for protons and neutrons to form hydrogen and helium nuclei. Heavier elements came later in stars.'
  },
  {
    q: 'Which is a use of radioisotopes in medicine?',
    options: [
      'Making fertiliser from nitrogen gas',
      'Using a gamma-emitting tracer to image an organ',
      'Stopping fission reactions in a reactor',
      'Dating rocks by measuring chlorophyll'
    ],
    answer: 1,
    explain: 'Radioisotopes such as technetium-99m give off gamma rays, which cameras detect to make images of organs.'
  },

  // ---- Genetics and evolution (5.1 to 5.4) ----
  {
    q: 'Which list goes from smallest to largest?',
    options: [
      'Genome, chromosome, gene, base',
      'Gene, base, genome, chromosome',
      'Chromosome, gene, base, genome',
      'Base, gene, chromosome, genome'
    ],
    answer: 3,
    explain: 'A base is part of a gene. Genes sit on chromosomes. All the chromosomes together make the genome.'
  },
  {
    q: 'One DNA strand reads T A G C C T. What is the complementary strand?',
    options: ['A U C G G A', 'A T C G G A', 'A T G C C A', 'T A G C C T'],
    answer: 1,
    explain: 'A pairs with T and C pairs with G, so T A G C C T pairs with A T C G G A. DNA has no U.'
  },
  {
    q: 'Why is a mutation in an egg or sperm cell more important for evolution than a mutation in a skin cell?',
    options: [
      'It can be passed on to offspring',
      'It spreads to every cell in the body',
      'It always changes the protein',
      'It is always harmful'
    ],
    answer: 0,
    explain: 'Only mutations in gametes (egg and sperm) can be inherited by offspring.'
  },
  {
    q: 'A strawberry plant grows runners that form new plants. The new plants are:',
    options: [
      'Different, because two parents are involved',
      'Different, because half the DNA is lost',
      'Genetically identical to the parent',
      'Always better adapted than the parent'
    ],
    answer: 2,
    explain: 'Asexual reproduction involves one parent, so the offspring are clones with the same DNA.'
  },
  {
    q: 'Brown fur (B) is dominant to white fur (b). A cat has the genotype Bb. What are its phenotype and genotype type?',
    options: ['White, heterozygous', 'Brown, heterozygous', 'Brown, homozygous', 'White, homozygous'],
    answer: 1,
    explain: 'The dominant allele B shows, so the cat is brown. Two different alleles (B and b) make it heterozygous.'
  },
  {
    q: 'A cross of Rr x rr is made. What percentage of the offspring show the recessive trait?',
    options: ['25%', '75%', '100%', '50%'],
    answer: 3,
    explain: 'The Punnett square gives Rr, Rr, rr, rr. Two of the four boxes (50%) are rr.'
  },
  {
    q: 'In a pedigree, two unaffected parents have an affected child. What does this show about the trait?',
    options: [
      'It is dominant, because the parents carry it',
      'It is caused by the environment only',
      'It is recessive and both parents are carriers',
      'It is recessive and only the mother is a carrier'
    ],
    answer: 2,
    explain: 'The child needs two copies of the recessive allele, so one copy came from each parent. Both are carriers.'
  },
  {
    q: 'Which is an example of genetic modification?',
    options: [
      'Moving a gene from one species into the DNA of another',
      'Breeding the tallest plants together',
      'Growing a plant from a cutting',
      'Crossing two dog breeds'
    ],
    answer: 0,
    explain: 'Genetic modification directly changes an organism\'s DNA, often by inserting a gene. The other options do not.'
  },
  {
    q: 'A genetic test shows a person has a high risk of a disease. Which is an ethical concern?',
    options: [
      'The test changes the person\'s DNA',
      'The result could be used by insurers or employers to discriminate',
      'The test needs a living virus',
      'Genes cannot be tested'
    ],
    answer: 1,
    explain: 'Privacy and discrimination are major concerns with genetic testing.'
  },
  {
    q: 'Why do bacteria become resistant to an antibiotic?',
    options: [
      'Bacteria choose to change to survive',
      'The antibiotic causes helpful mutations on purpose',
      'Each bacterium slowly gets used to the drug',
      'Resistant bacteria survive and reproduce, so the resistance allele becomes more common'
    ],
    answer: 3,
    explain: 'This is natural selection. Bacteria with a chance resistance mutation survive the drug and pass it on.'
  },
  {
    q: 'Two lizard populations are separated by a new mountain range. After many generations they cannot interbreed. This is:',
    options: [
      'Speciation caused by isolation',
      'Cloning',
      'Extinction',
      'Selective breeding by humans'
    ],
    answer: 0,
    explain: 'Separated populations face different pressures and gain different mutations. They can become new species.'
  },
  {
    q: 'In undisturbed rock, fossil X is found in a layer below fossil Y. What does this suggest?',
    options: [
      'Y is older than X',
      'They are the same age',
      'X is older than Y',
      'Their ages cannot be compared'
    ],
    answer: 2,
    explain: 'Lower layers formed first, so fossils in them are usually older.'
  },
  {
    q: 'Most traits, such as height, are influenced by:',
    options: [
      'A single gene only',
      'Many genes and environmental factors',
      'The environment only',
      'Mutations only'
    ],
    answer: 1,
    explain: 'Most traits are polygenic and are also shaped by factors such as diet and climate.'
  },

  // ---- Waves and motion (7.1 to 7.4) ----
  {
    q: 'Sound is best described as which type of wave?',
    options: [
      'Transverse, electromagnetic',
      'Transverse, mechanical',
      'Longitudinal, mechanical',
      'Longitudinal, electromagnetic'
    ],
    answer: 2,
    explain: 'Sound needs a medium (mechanical) and its particles vibrate parallel to the wave direction (longitudinal).'
  },
  {
    q: 'A sound gets both louder and higher in pitch. What changed in the wave?',
    options: [
      'Amplitude increased and frequency increased',
      'Amplitude increased and frequency decreased',
      'Amplitude decreased and frequency increased',
      'Wavelength increased and amplitude decreased'
    ],
    answer: 0,
    explain: 'Bigger amplitude means louder. Higher frequency means higher pitch.'
  },
  {
    q: 'A wave has a frequency of 4 Hz and a wavelength of 2.5 m. Use v = f × λ. What is its speed?',
    options: ['6.5 m/s', '1.6 m/s', '0.625 m/s', '10 m/s'],
    answer: 3,
    explain: 'v = 4 × 2.5 = 10 m/s.'
  },
  {
    q: 'Which list of waves is in order of increasing frequency?',
    options: [
      'Gamma, ultraviolet, visible light, radio',
      'Radio, infrared, visible light, X-ray',
      'Visible light, ultraviolet, microwave, gamma',
      'Microwave, radio, infrared, ultraviolet'
    ],
    answer: 1,
    explain: 'The EM spectrum rises in frequency: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.'
  },
  {
    q: 'An ambulance siren sounds higher in pitch as it moves toward you. Why?',
    options: [
      'The siren gets louder, which raises the pitch',
      'The ambulance speeds up the sound waves in the air',
      'The siren produces a higher frequency as it moves',
      'More wavefronts reach you each second, so the frequency you hear is higher'
    ],
    answer: 3,
    explain: 'This is the Doppler effect. The wavefronts are squashed together in front of the moving source.'
  },
  {
    q: 'Light slows down and bends as it passes from air into water. What is this called?',
    options: ['Reflection', 'Absorption', 'Refraction', 'Scattering'],
    answer: 2,
    explain: 'Refraction is the bending of a wave when its speed changes in a new medium.'
  },
  {
    q: 'A trick-or-treater walks one full 100 m lap and stops where she started. What are her distance and displacement?',
    options: ['100 m and 100 m', '100 m and 0 m', '0 m and 100 m', '0 m and 0 m'],
    answer: 1,
    explain: 'Distance is the total path (100 m). Displacement is the straight line from start to finish, which is 0 m.'
  },
  {
    q: 'A bat flies 240 m in 20 s at a steady speed. What is its speed? (s = d ÷ t)',
    options: ['12 m/s', '4800 m/s', '0.08 m/s', '220 m/s'],
    answer: 0,
    explain: 's = 240 ÷ 20 = 12 m/s.'
  },
  {
    q: 'A scooter speeds up from 2 m/s to 14 m/s in 4 s. What is its acceleration? (a = (v − u) ÷ t)',
    options: ['12 m/s²', '7 m/s²', '3 m/s²', '0.33 m/s²'],
    answer: 2,
    explain: 'a = (14 − 2) ÷ 4 = 12 ÷ 4 = 3 m/s².'
  },
  {
    q: 'What net force is needed to accelerate a 15 kg trolley at 2 m/s²? (F = m × a)',
    options: ['7.5 N', '13 N', '17 N', '30 N'],
    answer: 3,
    explain: 'F = 15 × 2 = 30 N.'
  },
  {
    q: 'A box is pushed right with 50 N. Friction pushes left with 20 N. What is the net force and what happens?',
    options: [
      '30 N right, the box speeds up',
      '70 N right, the box speeds up',
      '30 N left, the box slows down',
      '0 N, the box moves at constant speed'
    ],
    answer: 0,
    explain: 'Forces in opposite directions subtract: 50 − 20 = 30 N to the right, so the box accelerates.'
  },
  {
    q: 'On a distance-time graph, a horizontal line shows that the object is:',
    options: [
      'Moving at constant speed',
      'Stationary',
      'Accelerating',
      'Moving backwards'
    ],
    answer: 1,
    explain: 'The distance is not changing as time passes, so the object is not moving.'
  },

  // ---- Data science (8.1, 8.2) ----
  {
    q: 'Which question can be investigated at school?',
    options: [
      'Which Halloween movie is the best?',
      'Do ghosts live in the school?',
      'What colour is a ghost\'s favourite pumpkin?',
      'Does the amount of light change how quickly bean seeds sprout?'
    ],
    answer: 3,
    explain: 'It has a variable you can change, a variable you can measure, and equipment you have. The others are opinions or cannot be measured.'
  },
  {
    q: 'A good scientific hypothesis must be:',
    options: [
      'Testable and able to be shown wrong',
      'Believed by most scientists',
      'Proven true before it is tested',
      'Based on personal opinion'
    ],
    answer: 0,
    explain: 'A hypothesis is a testable prediction. If it can never be shown wrong, it is not scientific.'
  },
  {
    q: 'What is peer review?',
    options: [
      'Friends reading your report to be nice',
      'Repeating an experiment until the result is what you want',
      'Independent experts check the methods and conclusions before publication',
      'Voting on whether a theory is popular'
    ],
    answer: 2,
    explain: 'Peer review helps catch errors and bias before findings are published.'
  },
  {
    q: 'Which source is most reliable for information about a vaccine?',
    options: [
      'A celebrity blog with a million followers',
      'A government health site that cites studies',
      'A shop selling supplements',
      'A forum of anonymous users'
    ],
    answer: 1,
    explain: 'Reliable sources have expert authors, cite evidence and have no hidden aim to sell.'
  },
  {
    q: 'Which is a sign of pseudoscience?',
    options: [
      'It relies on testimonials and the claim cannot be tested',
      'It uses a control group',
      'It has been peer reviewed',
      'It changes when new evidence appears'
    ],
    answer: 0,
    explain: 'Pseudoscience relies on stories, uses vague terms and avoids testing. Real science tests claims and updates ideas.'
  },
  {
    q: 'A graph\'s y-axis starts at 98 instead of 0, so a tiny difference looks huge. This is:',
    options: [
      'A fair test',
      'A control group',
      'A misleading presentation of data',
      'Random sampling'
    ],
    answer: 2,
    explain: 'Changing the axis scale can exaggerate a difference. Always check the axis.'
  },
  {
    q: 'In a trial, 60 of 100 people improved with a new pill and 54 of 100 improved with a sugar pill. What is the best conclusion?',
    options: [
      'The pill clearly works because 60% is a lot',
      'The sugar pill works better',
      'Data is not needed to judge a pill',
      'The difference is small, so a larger repeat trial is needed'
    ],
    answer: 3,
    explain: 'A 6 percentage-point difference could be chance. A larger sample and repeats would give stronger evidence.'
  }
];

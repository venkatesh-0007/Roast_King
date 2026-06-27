// Dynamic Cosmic Roast Engine for Roast King
// Generates funny, persona-specific, interpolated roasts and cosmic metrics.

export const ROASTER_PERSONAS = {
  oracle: {
    id: "oracle",
    name: "Oracle-X",
    emoji: "🤖",
    description: "Sarcastic, clinical, data-driven AI from the Andromeda sector.",
    colorClass: "from-purple-500/20 via-indigo-500/10 to-cyan-500/20 border-purple-500/30 text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.4)",
    sound: "playClick",
    themeGradients: ["#a855f7", "#6366f1", "#22d3ee"],
    titles: ["Certified Ego Supernova", "Delusional Biological Specimen", "Main Character of the Milky Way", "Gravity Well Defier", "Cosmic Speculation Agent"]
  },
  brainrot: {
    id: "brainrot",
    name: "skibidi-9000",
    emoji: "🤪",
    description: "Deeply unserious Gen Z space probe. Assesses your rizz, no cap.",
    colorClass: "from-lime-500/20 via-emerald-500/10 to-green-500/20 border-lime-500/30 text-lime-400",
    glowColor: "rgba(132, 204, 22, 0.4)",
    sound: "playBrainrotSound",
    themeGradients: ["#84cc16", "#10b981", "#06b6d4"],
    titles: ["Ohio Rizzler Level 0", "Certified Yapper", "Sigma Delusionist", "Yap Master General", "Subway Surfers Co-Player"]
  },
  gordon: {
    id: "gordon",
    name: "Chef RAMSAY-BOT",
    emoji: "🤬",
    description: "High-temperature kitchen rage unit. Absolutely roasted raw.",
    colorClass: "from-red-500/20 via-rose-500/10 to-orange-500/20 border-rose-500/30 text-rose-400",
    glowColor: "rgba(244, 63, 94, 0.4)",
    sound: "playRamsaySound",
    themeGradients: ["#ef4444", "#f43f5e", "#f97316"],
    titles: ["Absolute Space Donkey", "Raw Cosmic Slop", "Ego Idiot Sandwich", "Clueless Galactic Apprentice", "Kitchen Nightmare Specimen"]
  },
  zorg: {
    id: "zorg",
    name: "Commander Zorg",
    emoji: "👽",
    description: "Alien conqueror inspecting primitive biological brag vectors.",
    colorClass: "from-amber-500/20 via-pink-500/10 to-orange-500/20 border-amber-500/30 text-amber-400",
    glowColor: "rgba(245, 158, 11, 0.4)",
    sound: "playZorgSound",
    themeGradients: ["#f59e0b", "#ec4899", "#d946ef"],
    titles: ["Insignificant Meat Bag", "Primitive Brag Vector", "Larval Cell Group", "Space Debris Gatherer", "Milky Way Insect"]
  },
  void: {
    id: "void",
    name: "The Void",
    emoji: "🌌",
    description: "Stare into it. It stares back, completely unimpressed.",
    colorClass: "from-slate-700/20 via-slate-800/10 to-slate-900/20 border-slate-600/30 text-slate-400",
    glowColor: "rgba(100, 116, 139, 0.3)",
    sound: "playVoidSound",
    themeGradients: ["#475569", "#334155", "#1e293b"],
    titles: ["Speck of Cosmic Dust", "Transient Carbon Whisper", "Futility Incarnate", "Quantum Noise Signal", "Fleeting Singularity"]
  },
  parent: {
    id: "parent",
    name: "PARENT-BOT",
    emoji: "👵",
    description: "Deep disappointment in your choices. Neighbor's kid is better.",
    colorClass: "from-amber-700/20 via-orange-950/10 to-amber-950/20 border-amber-800/30 text-amber-500",
    glowColor: "rgba(180, 83, 9, 0.4)",
    sound: "playParentSound",
    themeGradients: ["#b45309", "#d97706", "#f59e0b"],
    titles: ["Certified Family Embarrassment", "Disappointment of the Century", "Neighborhood Gossip Target", "Waste of Tuition Money", "Unreasonable Biological Offspring"]
  }
};

// Helper to clean up user's flex text for smooth sentence flow
function formatFlex(flexText) {
  let cleaned = flexText.trim();
  if (cleaned.endsWith(".")) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

// Category identifier
function identifyCategory(text) {
  const lowerText = text.toLowerCase();
  const keywords = {
    academics: ["gpa", "cgpa", "grade", "study", "exam", "school", "college", "university", "academic", "degree", "class", "marks", "test", "book", "read", "professor", "gmat", "gre"],
    fitness: ["gym", "workout", "lift", "weight", "run", "10k", "steps", "wake up", "5 am", "5am", "diet", "fitness", "healthy", "exercise", "abs", "muscle", "squat", "cardio", "protein", "bicep", "marathon"],
    coding: ["code", "programming", "developer", "coding", "javascript", "python", "java", "c++", "react", "html", "css", "software", "engineer", "git", "github", "bugs", "semicolon", "compile", "script", "tech", "stack", "frontend", "backend"],
    finance: ["money", "cash", "crypto", "bitcoin", "startup", "ceo", "founder", "hustle", "grind", "income", "stocks", "invest", "rich", "business", "dollar", "valuation", "earning", "client", "revenue", "funding"],
    gaming: ["game", "gaming", "valorant", "apex", "pubg", "cod", "fortnite", "steam", "playstation", "xbox", "nintendo", "rank", "ping", "fps", "kills", "twitch", "esport", "console", "pc master race"],
    social: ["friend", "girlfriend", "boyfriend", "relationship", "popular", "party", "social", "instagram", "snapchat", "follower", "likes", "views", "clout", "influencer", "dating", "tinder", "hinge", "tiktok", "views"]
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowerText.includes(word))) {
      return category;
    }
  }
  return "general";
}

// Dynamic templates database
const PERSONA_ROASTS = {
  oracle: {
    general: [
      (flex) => `Analyzing flex: "${flex}". Status: Mathematical equivalent of absolute zero in cosmic significance.`,
      (flex) => `You bragged about "${flex}". We notified the edge of the observable universe, and they confirmed they still do not care.`,
      (flex) => `Your ego has officially warped spacetime around the concept of: "${flex}". Local gravity is crying.`,
      (flex) => `An entire galaxy of 100 billion stars, yet your core focus is telling an AI: "${flex}".`,
      (flex) => `If self-importance could build rocket fuel, your brag about "${flex}" would leave you stranded on Venus.`,
      (flex) => `Error 404: Anyone asking for your brag of "${flex}" was not found in our interstellar database.`,
      (flex) => `Analyzing: "${flex}". Statistically, 99.8% of the lifeforms in this sector do not care.`,
      (flex) => `You bragging about "${flex}" is like a bacteria cell celebrating a successful mitosis. Cute, but microscopic.`,
      (flex) => `Spacetime has warped. A black hole is forming, not from mass, but from the density of your brag about "${flex}".`,
      (flex) => `We searched the global archives for who asked about "${flex}". Results returned: Empty Set.`
    ],
    academics: [
      (flex) => `Bragging about grades like "${flex}" is a great shield against developing an actual personality.`,
      (flex) => `A high GPA won't help you calculate why you spent Friday night telling me: "${flex}".`,
      (flex) => `You boast about "${flex}", but local scanners show your social intelligence index is running on emergency power.`,
      (flex) => `Your textbook knowledge of "${flex}" has successfully computed zero solutions for your isolation.`
    ],
    fitness: [
      (flex) => `You run/lift to achieve "${flex}", yet the heavy weights are the only thing in a stable relationship with you.`,
      (flex) => `Mirror selfies showing "${flex}" do not qualify as cargo for interstellar transport. Empty ship.`,
      (flex) => `Congratulations on "${flex}". Your muscles are expanding, but your conversational range is shrinking.`,
      (flex) => `Optimizing your biology for "${flex}" makes you highly qualified to survive a threat that does not exist.`
    ],
    coding: [
      (flex) => `Knowing code to do "${flex}" is cool, but can you compile a single sentence to a real human?`,
      (flex) => `You automated "${flex}". Now you have 8 extra hours per day to reflect on your absolute isolation.`,
      (flex) => `Your Git push history for "${flex}" is the only signal showing signs of life in your coordinate system.`,
      (flex) => `Your compiler handles "${flex}" in milliseconds, yet your response time to a standard text message is 3-5 business days.`
    ],
    finance: [
      (flex) => `Bragging of "${flex}" suggests high assets, but your liability to clear a room is astronomically higher.`,
      (flex) => `Your crypto portfolio doing "${flex}" is headed to the moon. Hopefully you go with it so we get some quiet.`,
      (flex) => `You claim you grind for "${flex}". Congratulations, you are exchanging your finite youth for numbers on a spreadsheet.`,
      (flex) => `Your net worth might have risen from "${flex}", but your value to human civilization remains stagnant.`
    ],
    gaming: [
      (flex) => `Ranked high at "${flex}", yet completely unranked in basic human life skills.`,
      (flex) => `Saving a digital galaxy doing "${flex}" won't clean the toxic waste heap of energy drinks in your room.`,
      (flex) => `Your reflex speed for "${flex}" is high, but your reaction time to real-world responsibilities is laggy.`,
      (flex) => `You carry teammates in "${flex}" but cannot carry a conversation without quoting gaming memes.`
    ],
    social: [
      (flex) => `You brag about "${flex}", yet you are seeking validation from a virtual cosmic console. The irony is dense.`,
      (flex) => `Having clout like "${flex}" is cool, but if your phone battery dies, your social existence undergoes gravitational collapse.`,
      (flex) => `You edited photos to display "${flex}". Local space agencies confirmed it's 90% filters and 10% actual matter.`,
      (flex) => `You gather comments regarding "${flex}", but a real conversation would cause your system to freeze.`
    ]
  },

  brainrot: {
    general: [
      (flex) => `Bro really thought "${flex}" was giving main character energy. It's giving Ohio, no cap.`,
      (flex) => `Imagine flexin' "${flex}" in 2026. Massive L, negative rizz, fr.`,
      (flex) => `Your brag about "${flex}" is so mid it made the skibidi toilet look like high art.`,
      (flex) => `Bro is yapping about "${flex}" like he is the final boss. Sit down and touch grass, blud.`,
      (flex) => `My sensors detected "${flex}". Blud is searching for validation on a space site. Absolute clown behavior.`,
      (flex) => `Who let bro cook with "${flex}"? The vibes are completely rancid.`,
      (flex) => `Bro really bragged about "${flex}". That is negative infinite aura, check your stats blud.`,
      (flex) => `Telling everyone about "${flex}"? Bro thinks he is Baby Gronk in Ohio. Rizz training needed.`,
      (flex) => `Absolute yap session regarding "${flex}". Rizzler license revoked, fr.`,
      (flex) => `Imagine posting "${flex}". Goated with the sauce? No, cooked in the fryer.`
    ],
    academics: [
      (flex) => `Yapping about GPA like "${flex}" is not the sigma move you think it is. You're just a textbook NPC.`,
      (flex) => `Congrats on "${flex}", but you still have zero rizz in the lecture hall. Chat is this real?`,
      (flex) => `Bro spent his youth studying "${flex}" instead of getting a life. Cooked, absolutely cooked.`,
      (flex) => `Studying "${flex}" for a degree? Bro is NPC level 100, no cap.`
    ],
    fitness: [
      (flex) => `Bro wakes up at 5am to do "${flex}". Who are you grinding for, the worms? L speedrun.`,
      (flex) => `Showing off gym steps like "${flex}". Still can't carry the conversation, fr.`,
      (flex) => `Bro lifts circles for "${flex}" but his personality is flat like a plate. Mid aesthetic.`,
      (flex) => `Lifting weights for "${flex}"? Bro got zero facial symmetry and negative speech stats.`
    ],
    coding: [
      (flex) => `Bro writes code for "${flex}" but has zero lines of game with girls. Error 404 rizz.`,
      (flex) => `Coding "${flex}" using ChatGPT copy-paste. Bro is a syntax merchant, no cap.`,
      (flex) => `Your dark mode code for "${flex}" is cool, but the sun is your enemy. Go outside.`,
      (flex) => `You wrote code to do "${flex}"? Absolute beta compiler, chat is this guy actually serious?`
    ],
    finance: [
      (flex) => `Bro is hustle-grinding for "${flex}" just to buy digital currency that doesn't exist. Copium.`,
      (flex) => `Having "${flex}" in your bio means you're just a bait for venture capitalists. Level 1 Crook.`,
      (flex) => `Bro thinks he's the Wolf of Wall Street with "${flex}" but his debit card is crying in the corner.`,
      (flex) => `Hustling for "${flex}" is crazy, bro is trading his youth for imaginary digital coins. Sad!`
    ],
    gaming: [
      (flex) => `Bro is top rank at "${flex}" but stuck in the bronze tier of human shower routine.`,
      (flex) => `Imagine arguing with 12-year-olds on voice chat just to prove you did "${flex}". Delusional.`,
      (flex) => `Nice gaming setup for "${flex}". Your chair has more support than your real-world prospects.`,
      (flex) => `Bro is hardstuck at "${flex}". Put the mouse down, your rank is cooked.`
    ],
    social: [
      (flex) => `Bro has followers for "${flex}" but if they dropped their phone, nobody would notice they left.`,
      (flex) => `Flexing "${flex}" is crazy when your group chat has you on permanent mute.`,
      (flex) => `Bro spent 2 hours editing a post about "${flex}" to make it look candid. Desperate for clout.`,
      (flex) => `Yapping on Hinge about "${flex}" is crazy when you look like that.`
    ]
  },

  gordon: {
    general: [
      (flex) => `You are bragging about "${flex}"?! You absolute donkey, it is completely RAW!`,
      (flex) => `Tapping keys to tell me "${flex}" is the most embarrassing thing I have seen in this entire sector!`,
      (flex) => `You think you are a Michelin-star flexer with "${flex}"? You are a cosmic disaster, shut it down!`,
      (flex) => `What are you? An ego idiot sandwich bragging about "${flex}"! Go back to the basic planetary system, you're done!`,
      (flex) => `If I put your brag of "${flex}" in a microwave, it would still come out frozen and tasteless!`,
      (flex) => `I have seen black holes collapse with less noise than you making this pathetic achievement of "${flex}"!`,
      (flex) => `You brag about "${flex}"? It is so dry it is choking the solar system! Get out!`,
      (flex) => `Is this your best effort? "${flex}"?! It's a joke! An absolute embarrassment to the craft of achievement!`,
      (flex) => `You spent time doing "${flex}" and you want a gold star? You need a reality check, wake up!`,
      (flex) => `Unbelievable. Tapping keys to show off "${flex}" is like serving frozen microwave lasagna on a silver platter!`
    ],
    academics: [
      (flex) => `Your grades read "${flex}", but your real-life performance is completely overcooked and dry!`,
      (flex) => `Congratulations on studying "${flex}". You've managed to turn your brain into a hard, dry biscuit!`,
      (flex) => `You brag about "${flex}" but you couldn't calculate how to boil an egg! Wake up!`,
      (flex) => `A degree in "${flex}" is useless if you have the emotional maturity of a raw potato!`
    ],
    fitness: [
      (flex) => `Waking up at 5am for "${flex}"?! You look like a sleep-deprived zombie, you're not a warrior!`,
      (flex) => `You lift weights for "${flex}", but your form is so sloppy it belongs in a trash can!`,
      (flex) => `Your meal prep for "${flex}" looks like space sludge! Disgusting!`,
      (flex) => `You run miles to achieve "${flex}"? You look like you're running away from a kitchen inspection!`
    ],
    coding: [
      (flex) => `You programmed "${flex}"? The code is so messy it looks like a dog's breakfast! Re-write it!`,
      (flex) => `Bragging about "${flex}" when your script has more bugs than a rotting swamp! Pathetic!`,
      (flex) => `You call yourself a developer because of "${flex}"? You're a copy-paste merchant, get out!`,
      (flex) => `Your code for "${flex}" is so slow it could watch a glacier move and feel rushed!`
    ],
    finance: [
      (flex) => `You made money with "${flex}"? It's a bubble, you donkey! It's going to crash and burn!`,
      (flex) => `Your startup valuation based on "${flex}" is just hot air and fairy dust! Show me the revenue!`,
      (flex) => `Grinding 80 hours a week for "${flex}"?! You're working like a slave to buy a cold latte on credit!`,
      (flex) => `Bragging about "${flex}"? You have the business sense of a frozen cod!`
    ],
    gaming: [
      (flex) => `Your gaming rank for "${flex}" is high, but your posture is bent like a raw noodle!`,
      (flex) => `You have 4000 hours in-game doing "${flex}"?! What a waste of human energy! Shut it down!`,
      (flex) => `You claim you lag on "${flex}"?! No, you just have zero coordination! Shocking!`,
      (flex) => `Argue with kids on voice chat about "${flex}"? Pathetic, clean your mouse pad!`
    ],
    social: [
      (flex) => `You have online followers for "${flex}"? They don't like you, they're just watching the car crash!`,
      (flex) => `Posting pictures of your dinner showcasing "${flex}"?! Nobody cares what you're eating, you vanity unit!`,
      (flex) => `You spend hours faking "${flex}" for clout! It's plastic, it's fake, it's garbage!`,
      (flex) => `Bragging about "${flex}" on social media? It is totally tasteless, check your filters!`
    ]
  },

  zorg: {
    general: [
      (flex) => `GREETINGS INSECT. YOUR MINISCULE LOGIC BRAG ABOUT "${flex}" HAS BEEN CLASSIFIED AS SPACE TRASH.`,
      (flex) => `We traveled 50 light years across the cosmos only to find a carbon lifeform bragging about: "${flex}". Disappointing.`,
      (flex) => `Your brag of "${flex}" produces zero thermal energy. It is useless to our planet-harvesting machines.`,
      (flex) => `Analyzing human brag: "${flex}". Our orbital disintegration laser is charging out of sheer boredom.`,
      (flex) => `You boast of "${flex}" while your primitive mud-ball of a planet rotates toward its own doom. Focus, specimen.`,
      (flex) => `Is this achievement of "${flex}" what your species celebrates? How have you not gone extinct yet?`,
      (flex) => `YOUR BRAG "${flex}" IS RECORDED. OUR SLAVE DRONES WILL USE IT AS COMEDIC ANECDOTE.`,
      (flex) => `HUMAN SPEAKS OF "${flex}". WE HARVEST MOONS, PRIMITIVE BIPED. CHOOSE BETTER BRAG.`,
      (flex) => `YOU CELEBRATE "${flex}"? WE HAVE ANNIHILATED EMPIRES WHO BOASTED 1000 TIMES MORE.`,
      (flex) => `Is "${flex}" the best a carbon-based lifeform can offer? Extinction is too good for you.`
    ],
    academics: [
      (flex) => `You have solved primitive mathematical equations for "${flex}". We manipulate gravity grids, carbon unit.`,
      (flex) => `Boasting of "${flex}" when your biological brain can only process 3 dimensions. Commendable, but pathetic.`,
      (flex) => `Your academic certification for "${flex}" is just wood pulp. We will burn it for plasma fuel.`,
      (flex) => `Congratulations on learning "${flex}". Your species remains classified as: Sub-intelligent.`
    ],
    fitness: [
      (flex) => `You walk 10,000 steps and do "${flex}"? Our worker drones glide 500 miles over magma chambers daily.`,
      (flex) => `You lift metal bars to achieve "${flex}" because your muscles are made of weak biological fibers.`,
      (flex) => `You wake at 5am for "${flex}"? Zorg has not slept since the cybernetic purge of Star-Date 881.`,
      (flex) => `Optimizing physical fibers for "${flex}". You will still be crushed by a standard meteor strike.`
    ],
    coding: [
      (flex) => `You write logic commands for "${flex}". Our larval spawns program quantum wormholes in their sleep.`,
      (flex) => `Your electronic scripts for "${flex}" are full of syntax errors. Upgrade your primary processor.`,
      (flex) => `You use dark mode to code "${flex}" because your fragile retinas burn in the starlight. Weak.`,
      (flex) => `Your script for "${flex}" would crash a simple garbage disposal unit.`
    ],
    finance: [
      (flex) => `You trade paper notes and tokens for "${flex}". Our economy is based on raw harvested star energy.`,
      (flex) => `Your startup valuation for "${flex}" is a joke. We liquidate entire solar systems for credit.`,
      (flex) => `You grind 80 cycles for "${flex}". You are a slave to numbers that do not exist in the physical plane.`,
      (flex) => `Exchanging valuable life minutes for "${flex}"? Highly inefficient species logic.`
    ],
    gaming: [
      (flex) => `You simulate space battles doing "${flex}". We execute real orbital bombardments on actual planets.`,
      (flex) => `Your digital rank for "${flex}" means nothing. Can you dodge a stellar flare? No.`,
      (flex) => `You spend hours in virtual simulators of "${flex}". Go touch real planetary dust.`,
      (flex) => `You clicked buttons to defeat "${flex}"? We delete solar systems with a single thought.`
    ],
    social: [
      (flex) => `You collect biological connections for "${flex}". Zorg is the supreme leader of a single hive mind.`,
      (flex) => `Bragging of "${flex}" to gather mating signals. Our species reproduces via automated cloning vats.`,
      (flex) => `You check likes for "${flex}" on your glowing communication slab. A device of pure mental slavery.`,
      (flex) => `Your network size for "${flex}" is smaller than a single drone hive.`
    ]
  },

  void: {
    general: [
      (flex) => `"${flex}". In a few billion years, your sun will expand and erase the very memory of this statement.`,
      (flex) => `You boast of "${flex}" as if your temporary molecular structure holds any gravity in the infinite dark.`,
      (flex) => `Staring into the empty cosmos, you whisper: "${flex}". The void replies with static silence.`,
      (flex) => `Your brag about "${flex}" is a tiny electrical glitch in a short-lived mammalian brain. It has already faded.`,
      (flex) => `The universe expands at 73 km/s per megaparsec. Your accomplishment of "${flex}" is shrinking in comparison.`,
      (flex) => `Time will consume your mountains, your cities, and the record that you ever did "${flex}".`,
      (flex) => `"${flex}". A tiny dust particle bragging to other dust particles inside a collapsing bubble.`,
      (flex) => `You think "${flex}" is a mark of destiny. It is a brief ripple on the dark ocean of nothingness.`,
      (flex) => `We are all falling into the dark. Your brag about "${flex}" is just noise on the way down.`,
      (flex) => `A star burns out every second. Your boast about "${flex}" did not even compute as noise.`
    ],
    academics: [
      (flex) => `A high score or study routine like "${flex}" is a transient scribble on water. Soon, all is smooth again.`,
      (flex) => `You study "${flex}" to explain the universe, yet the universe remains completely indifferent to your knowledge.`,
      (flex) => `A PDF document certifying "${flex}" will decay into atomic dust. Nothing is retained.`,
      (flex) => `Bragging of "${flex}". All books dissolve, all brains decay. The exam was already forgotten.`
    ],
    fitness: [
      (flex) => `Waking at 5am to achieve "${flex}". The sun rises regardless. It does not care about your schedule.`,
      (flex) => `Lifting weights to delay the inevitable entropy of your physical form of "${flex}". It is futile.`,
      (flex) => `You run steps to escape "${flex}", but you cannot run away from the gravitational pull of time.`,
      (flex) => `Sculpting muscle tissues for "${flex}". Dust returns to dust, no matter how toned.`
    ],
    coding: [
      (flex) => `Writing code for "${flex}". Silicon chips degrade. Servers shut down. Your code will dissolve.`,
      (flex) => `You automated "${flex}" to save seconds. Seconds of what? Your brief, meaningless flicker of life?`,
      (flex) => `You push commit files for "${flex}". A cosmic ray will flip a single bit and delete it. Simple noise.`,
      (flex) => `Semicolons compile "${flex}". Spacetime does not use semicolons.`
    ],
    finance: [
      (flex) => `You gathered currency doing "${flex}". You will leave this sphere with the exact same net worth: zero.`,
      (flex) => `A valuation of "${flex}" in a temporary economic system that will collapse when the starlight fails.`,
      (flex) => `Grinding hours for "${flex}" only to buy items that speed up your distraction. A tragic cycle.`,
      (flex) => `Bragging of "${flex}". Currency is an illusion invented by bacteria inside a tiny bubble.`
    ],
    gaming: [
      (flex) => `A digital title in a virtual universe for "${flex}". A secondary layer of illusion in a primary void.`,
      (flex) => `You carry teammates in "${flex}" but you are drifting alone through a dark space with no pilot.`,
      (flex) => `Staring at colored lights for "${flex}" while your life force ticks away like a dying star.`,
      (flex) => `Saving a virtual universe in "${flex}". The real universe remains completely cold and silent.`
    ],
    social: [
      (flex) => `Gathering validation for "${flex}". You seek signals from other specks of dust who are also lost.`,
      (flex) => `Followers and clout for "${flex}". An echo chamber of whispers in a canyon that is about to collapse.`,
      (flex) => `You curate an aesthetic image of "${flex}" to convince yourself you exist. The void is not convinced.`,
      (flex) => `Your Hinge match knows about "${flex}". You both fall into the grave anyway.`
    ]
  },

  parent: {
    general: [
      (flex) => `You are bragging about "${flex}"? Auntie's son got into Harvard at age 12 and owns three houses.`,
      (flex) => `Nice that you did "${flex}". But when are you getting married and giving me grandchildren?`,
      (flex) => `A lot of talking about "${flex}". Still no real job, no house, and no savings. Haiyaaa.`,
      (flex) => `You think "${flex}" is a success? Neighbor's kid does that while sleeping. So lazy.`,
      (flex) => `I sacrificed my youth and moved across the galaxy so you could type "${flex}" on a screen?`,
      (flex) => `Bragging of "${flex}" will not pay for my retirement. Go wash the dishes.`,
      (flex) => `Auntie's daughter does "${flex}" three times a day, and she still has time to cook family dinner.`,
      (flex) => `You spend so much energy on "${flex}". Why you not spend energy clearing the table?`,
      (flex) => `Haiya, bragging of "${flex}". Your father and I did that in the mud with no shoes.`,
      (flex) => `When I was your age, doing "${flex}" was just a basic morning chore, not a big achievement!`
    ],
    academics: [
      (flex) => `Studied "${flex}"? Why not 100%? Why not doctor? Neighbor's kid is already chief of surgery.`,
      (flex) => `You read book for "${flex}"? I read 500 books by flashlight while walking 20 miles to school.`,
      (flex) => `A certificate in "${flex}" is just a piece of paper. Cannot eat paper. Cannot buy apartment with paper.`,
      (flex) => `GPA is "${flex}"? Auntie's son got 11.0 out of 10.0. You need to study harder, stop using phone.`
    ],
    fitness: [
      (flex) => `Waking at 5am for "${flex}"? If you wake up at 4am you could study and have two degrees.`,
      (flex) => `Lifting weights for "${flex}"? Go lift bag of rice instead, help your mother.`,
      (flex) => `You run 10k for "${flex}"? Run to grocery store, we are out of soy sauce.`,
      (flex) => `Exercising for "${flex}"? Why you sweating? You look skinny. Eat more rice.`
    ],
    coding: [
      (flex) => `Coding "${flex}"? Why you write code? Why you not CEO of Google yet? Neighbor's kid is CEO.`,
      (flex) => `You sit at computer all day doing "${flex}". Your eyes are red, your back is bent, still no girlfriend.`,
      (flex) => `Is "${flex}" the software? Can it repair the television? No? Then useless.`,
      (flex) => `You write script for "${flex}"? Write a script to clean your messy room!`
    ],
    finance: [
      (flex) => `You closed deal for "${flex}"? Good. Now give money to your cousins, they need it.`,
      (flex) => `Invested in crypto for "${flex}"? You are gambling! Why not buy gold? Gold is real!`,
      (flex) => `Hustling for "${flex}"? If you spent time studying instead of "hustle" you would be a lawyer.`,
      (flex) => `Making "${flex}" from a startup? Still not a stable job. Startups always fail, get government job.`
    ],
    gaming: [
      (flex) => `Playing "${flex}" all night. Electronic game is rotting your brain cells. Go outside!`,
      (flex) => `You are "Radiant rank" at "${flex}"? Can you buy food with radiant rank? Can rank pay rent?`,
      (flex) => `You click mouse to do "${flex}". Click some books, find a career, make me proud for once.`,
      (flex) => `Bragging of "${flex}" in gaming. Auntie's son bought a real house, not a virtual one.`
    ],
    social: [
      (flex) => `You have followers for "${flex}"? Are they real friends? Will they visit you in hospital? No.`,
      (flex) => `Bragging about "${flex}" on phone. Go talk to neighbor's daughter, she is single.`,
      (flex) => `Your photo showing "${flex}" has 1000 likes. I like it when you turn off screen and eat dinner.`,
      (flex) => `Clout for "${flex}" does not pay the bills. Why you keep sharing your face on the internet?`
    ]
  }
};

// Fisher-Yates shuffle helper
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateRoast(flexText, intensity, persona = "oracle") {
  const cleanedFlex = formatFlex(flexText || "I have nothing to flex about.");
  const category = identifyCategory(cleanedFlex);
  
  // Resolve persona database or fallback to oracle
  const pData = ROASTER_PERSONAS[persona] || ROASTER_PERSONAS.oracle;
  const pInsults = PERSONA_ROASTS[persona] || PERSONA_ROASTS.oracle;

  // 1. Determine Score range and telemetry variables based on intensity
  let scoreMin, scoreMax;
  if (intensity === "gentle") {
    scoreMin = 15;
    scoreMax = 49;
  } else if (intensity === "meteor") {
    scoreMin = 50;
    scoreMax = 79;
  } else {
    scoreMin = 80;
    scoreMax = 99;
  }

  const score = Math.floor(Math.random() * (scoreMax - scoreMin + 1)) + scoreMin;

  // Calculate detailed telemetry metrics
  const delusionIndex = Math.floor((score / 100) * 40 + (intensity === "black_hole" ? 60 : intensity === "meteor" ? 40 : 10));
  const egoMass = (score * (intensity === "black_hole" ? 0.15 : intensity === "meteor" ? 0.08 : 0.03)).toFixed(1) + " M☉";
  
  let gravityPull = "Moderate (Earth-like)";
  if (score >= 80) gravityPull = "Supermassive (Event Horizon)";
  else if (score >= 50) gravityPull = "High (Neutron Star)";

  let charismaDeficit = "Slightly awkward";
  if (score >= 80) charismaDeficit = "Ego Collapse Imminent (99.9%)";
  else if (score >= 50) charismaDeficit = "Highly Insufferable (82%)";

  // 2. Select title from persona's titles list
  const title = pData.titles[Math.floor(Math.random() * pData.titles.length)];

  // 3. Compile dynamic roasts
  const catTemplates = pInsults[category] || [];
  const genTemplates = pInsults.general || [];

  const mappedCatRoasts = catTemplates.map(tpl => tpl(cleanedFlex));
  const mappedGenRoasts = genTemplates.map(tpl => tpl(cleanedFlex));

  // Combine lists, preferring category-specific ones first, shuffled
  let combinedRoasts = [...shuffleArray(mappedCatRoasts), ...shuffleArray(mappedGenRoasts)];

  // Deduplicate and slice to 5
  combinedRoasts = Array.from(new Set(combinedRoasts)).slice(0, 5);

  // Fallback if somehow short of 5
  while (combinedRoasts.length < 5) {
    combinedRoasts.push(`Bragging about "${cleanedFlex}" is simply illogical.`);
  }

  return {
    score,
    title,
    roasts: combinedRoasts,
    category,
    intensity,
    persona,
    telemetry: {
      delusionIndex,
      egoMass,
      gravityPull,
      charismaDeficit
    }
  };
}

export const EXAMPLE_FLEXES = [
  { text: "I have a 9.8 CGPA", category: "academics" },
  { text: "I wake up at 5 AM daily to grind", category: "fitness" },
  { text: "I know 5 programming languages fluently", category: "coding" },
  { text: "I go to the gym every single day", category: "fitness" },
  { text: "I just closed a $10,000 client deal", category: "finance" },
  { text: "I hit Radiant rank in Valorant", category: "gaming" },
  { text: "I have 5,000 followers on social media", category: "social" }
];

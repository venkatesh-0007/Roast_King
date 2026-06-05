// Standalone Cosmic Roast Engine for Roast King
// Generates funny, category-specific roasts and scores.

const ROAST_DATABASE = {
  academics: {
    titles: ["Certified Academic Weapon", "GPA Overlord", "Dean's List Legend", "Textbook Titan"],
    intensity: {
      gentle: [
        "Your CGPA is so high, even your textbooks are getting intimidated.",
        "You study so much that your highlighter pens are begging for mercy.",
        "A 9.8 CGPA is cool, but can you use it to calculate why you're still reading this instead of hanging out with friends?",
        "Your brain is running on high-performance mode, but your social life is still on dial-up.",
        "Teachers love you, but your classmates probably have a muted group chat without you."
      ],
      meteor: [
        "Your CGPA is so high your social life got academically disqualified.",
        "Even calculators feel judged when you walk into the room.",
        "You study so much that Google has to ask you if you're a robot.",
        "Congratulations on the GPA. Your reward is being the designated group project carrying-mule forever.",
        "Your grades are stellar, but your resume is 90% fonts and 10% actual human experience."
      ],
      black_hole: [
        "A 9.8 CGPA is just a fancy way of saying you traded your youth for a PDF certificate.",
        "You have solved equations for dark matter, yet you still can't solve the mystery of basic human conversation.",
        "Your academic success is the ultimate shield against having to develop a personality.",
        "Employers will look at your transcript, say 'wow', and then hire the C-student who has charisma.",
        "Your brain is a supercomputer, but your conversational skills are stuck in safe mode."
      ]
    }
  },
  fitness: {
    titles: ["Gym Rat with No Chat", "Iron Temple Disciple", "5 AM Sleep Deprived Warrior", "Cardio Emperor"],
    intensity: {
      gentle: [
        "Waking up at 5 AM is impressive, but mostly to the birds you are waking up.",
        "You go to the gym daily, yet the iron weights are the only ones holding a stable relationship with you.",
        "Mirror selfies in gym lighting do not count as a personality trait, even with the neon glow.",
        "Lifting heavy circles is great, but don't forget to lift your head up and look at the real world.",
        "Your meal prep looks like space food, and probably tastes like it too."
      ],
      meteor: [
        "You wake up at 5 AM just to have 2 extra hours of being insufferable to the rest of the world.",
        "Your muscles are growing, but your attention span is shrinking with every protein shake.",
        "The gym is your therapy, which is convenient because regular therapy is way more expensive.",
        "You run 10k steps a day just to escape the crushing weight of your own thoughts.",
        "You lift weights to carry the burden of trying to make everyone notice you lift weights."
      ],
      black_hole: [
        "Your biceps are larger than your circle of friends, and twice as active.",
        "You wake up at 5 AM because your subconscious knows that if you slept in, you'd have to face who you actually are.",
        "Your pre-workout has so much caffeine it's practically holding your cardiovascular system hostage.",
        "You've optimized your body for survival, but there is absolutely no threat in your air-conditioned gym.",
        "No amount of squats can build a foundation strong enough to support your massive ego."
      ]
    }
  },
  coding: {
    titles: ["Syntax Error Specialist", "StackOverflow Copy-Paster", "Keyboard Warrior", "Semicolon Survivor"],
    intensity: {
      gentle: [
        "Knowing 5 programming languages is great, but can you speak to a human in just one?",
        "Your code is clean, but your desk looks like a cosmic debris field.",
        "You write code all night, but your commit history is the only thing showing signs of life.",
        "Git push origin master is your only form of self-expression.",
        "You use dark mode for everything because light mode reminds you of the sun you never see."
      ],
      meteor: [
        "You know 5 programming languages but your most frequent conversation is with ChatGPT.",
        "Your code has fewer bugs than your social calendar has events.",
        "You automated your entire job, and now you spend 8 hours a day pretending to look busy on Slack.",
        "You write code that runs in milliseconds, but your response time on texts is 3-5 business days.",
        "You wear blue-light glasses to protect your eyes from the screen, but nothing can protect us from your flexes."
      ],
      black_hole: [
        "You call yourself a 'Software Architect' but you can't even configure your own sleep schedule.",
        "Your code is open source, just like your lack of boundaries.",
        "You spent 3 weeks building a custom script to save 5 seconds of work. The math isn't mathing.",
        "You speak JavaScript, Python, C++, and Go, but 'touch grass' is still foreign to you.",
        "You've solved complex algorithms, yet you still get defeated by a simple 'What are we?' text."
      ]
    }
  },
  finance: {
    titles: ["Hustle Culture Victim", "Crypto Astronaut", "LinkedIn Philosopher", "Venture Capitalist Bait"],
    intensity: {
      gentle: [
        "Making money is great, but your bank account is the only thing appreciating you right now.",
        "Your startup is changing the world, or at least changing your LinkedIn bio.",
        "You talk about assets and liabilities, but you are currently the biggest liability at any party.",
        "Hustling 24/7 sounds tiring. Have you tried doing nothing? It's highly rated.",
        "Your crypto portfolio is going to the moon, hopefully it stays there."
      ],
      meteor: [
        "You write 'Forbes 30 Under 30 hopeful' in your bio because 'currently unemployed' sounds too real.",
        "Your passive income is great, but your active personality is highly draining.",
        "You read self-help books like they are holy texts, but you still need help helping yourself.",
        "You think you're a wolf of Wall Street, but you're more like a puppy of paper trading.",
        "Your side hustle is taking up so much time you don't even have a main hustle anymore."
      ],
      black_hole: [
        "You sold an NFT and now you think you're a financial advisor. Sit down, the bubble burst.",
        "Your startup's valuation is entirely based on slides, buzzwords, and the hopes of your rich uncle.",
        "You grind 80 hours a week so your boss can buy a second yacht while you drink free cold brew.",
        "You have 'entrepreneur' in your bio but your biggest transaction this week was buying a latte on credit.",
        "Your net worth might be up, but your self-worth is trading at an all-time low."
      ]
    }
  },
  gaming: {
    titles: ["Radiant in Valorant, Unranked in Life", "Apex Predator of the Sofa", "Boss Fight Bystander", "Ping Warrior"],
    intensity: {
      gentle: [
        "Your gaming reflexes are fast, but your real-life reaction to responsibilities is laggy.",
        "You've saved the galaxy 10 times in RPGs, but your room still looks like a cosmic warzone.",
        "Your rank is high, but your chair's ergonomics are crying for help.",
        "GG WP is your only vocabulary at this point.",
        "You have 500 hours in a simulator. You could have learned a real aircraft by now."
      ],
      meteor: [
        "You have a 240Hz monitor just to miss your shots in ultra-high definition.",
        "Your gaming chair has lumbar support, but nothing can support the weight of your gaming dependency.",
        "You argue with 12-year-olds on voice chat and actually care if you win.",
        "Your Steam library has 300 games and you still play the same buggy one every night.",
        "You claim you lag, but we all know it's just lack of skill."
      ],
      black_hole: [
        "You have 4000 hours in-game. That is 166 days of staring at digital grass instead of touching real grass.",
        "Your highest achievement is a colored badge on a profile page that will be deleted when the servers shut down.",
        "You carry your team, but you can't even carry a bag of groceries up the stairs without panting.",
        "Your K/D ratio is the only stat you've improved in the last five years.",
        "Your virtual house is beautiful, but you still live in your parents' basement."
      ]
    }
  },
  social: {
    titles: ["Social Butterfly with Clout Fever", "Main Character Syndrome Patient", "Influencer in Training", "Popularity Contestant"],
    intensity: {
      gentle: [
        "You have so many friends, yet you spend your evenings submitting flexes to an AI.",
        "Your social calendar is full, but your group chats are mostly muted.",
        "Everyone loves you, but mostly because you agree with everything they say.",
        "Your stories get high views, but your actual interactions are low-key.",
        "You're a social butterfly, but don't fly too close to the sun."
      ],
      meteor: [
        "You post stories of your drinks so people know you have a social life, but you spent the whole night on your phone.",
        "You have 1000 followers but if you needed to move a couch, you'd be renting a U-Haul alone.",
        "Your charisma is great, but it feels like you're performing a one-man show 24/7.",
        "You're the life of the party, which is sad because the party ended two hours ago.",
        "You check your likes more often than your blood pressure, and both are dangerously high."
      ],
      black_hole: [
        "Your entire personality is built on external validation and aesthetic filters.",
        "You are so desperate for attention that you are letting a cosmic-themed AI dissect your ego.",
        "You spend hours editing photos to look 'candid'—the irony is thicker than the atmospheric pressure on Jupiter.",
        "Your friends laugh at your jokes out of habit, not humor.",
        "If your phone died for 24 hours, your social identity would suffer a total gravitational collapse."
      ]
    }
  },
  general: {
    titles: ["Ego Supernova", "Cosmic Flexer", "Main Character of the Milky Way", "Gravity Defier"],
    intensity: {
      gentle: [
        "That's a nice flex, but in the grand scale of the universe, it's just a tiny speck of dust.",
        "We are proud of you, but the laws of physics are still unimpressed.",
        "A solid achievement, but let's keep your feet on the ground before gravity does it for you.",
        "Your confidence is out of this world. Literally, it needs to come back.",
        "A cute flex. Keep it up, and one day it might be actually impressive."
      ],
      meteor: [
        "Your pride is so massive it has its own gravitational pull.",
        "This flex is proof that humans will celebrate literally anything.",
        "I've seen stars collapse with less noise than you making this achievement.",
        "You think you're a shooting star, but you're more like space junk entering the atmosphere.",
        "If self-confidence was rocket fuel, you'd be in another galaxy, but you'd still be alone."
      ],
      black_hole: [
        "Your ego has reached critical mass and is about to undergo gravitational collapse.",
        "This flex is the equivalent of a toddler showing off a mud pie. Cute, but we all know it's garbage.",
        "You are trying so hard to convince yourself that this matters. It's almost cute.",
        "In the theater of life, your flex is a background extra that got cut in editing.",
        "If you spent half the energy improving your life as you do bragging about it, you wouldn't need this roast."
      ]
    }
  }
};

// Simple helper to match text keywords to categories
function identifyCategory(text) {
  const lowerText = text.toLowerCase();

  const keywords = {
    academics: ["gpa", "cgpa", "grade", "study", "exam", "school", "college", "university", "academic", "degree", "class", "marks", "test"],
    fitness: ["gym", "workout", "lift", "weight", "run", "10k", "steps", "wake up", "5 am", "5am", "diet", "fitness", "healthy", "exercise", "abs", "muscle"],
    coding: ["code", "programming", "developer", "coding", "javascript", "python", "java", "c++", "react", "html", "css", "software", "engineer", "git", "github", "bugs", "semicolon"],
    finance: ["money", "cash", "crypto", "bitcoin", "startup", "ceo", "founder", "hustle", "grind", "income", "stocks", "invest", "rich", "business", "dollar"],
    gaming: ["game", "gaming", "valorant", "apex", "pubg", "cod", "fortnite", "steam", "playstation", "xbox", "nintendo", "rank", "ping", "fps"],
    social: ["friend", "girlfriend", "boyfriend", "relationship", "popular", "party", "social", "instagram", "snapchat", "follower", "likes", "views", "clout", "influencer"]
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowerText.includes(word))) {
      return category;
    }
  }

  return "general";
}

// Fisher-Yates shuffle to randomize order
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateRoast(flexText, intensity) {
  if (!flexText || flexText.trim() === "") {
    flexText = "I have nothing to flex about.";
  }

  const category = identifyCategory(flexText);
  const db = ROAST_DATABASE[category] || ROAST_DATABASE.general;

  // 1. Determine Score and Intensity Bucket
  let scoreMin, scoreMax, intensityKey;
  if (intensity === "gentle") {
    scoreMin = 15;
    scoreMax = 49;
    intensityKey = "gentle";
  } else if (intensity === "meteor") {
    scoreMin = 50;
    scoreMax = 79;
    intensityKey = "meteor";
  } else {
    scoreMin = 80;
    scoreMax = 99;
    intensityKey = "black_hole";
  }

  // Generate a random score in the range
  const score = Math.floor(Math.random() * (scoreMax - scoreMin + 1)) + scoreMin;

  // 2. Select a Title
  const titles = db.titles;
  const title = titles[Math.floor(Math.random() * titles.length)];

  // 3. Select 5 roasts
  // If database doesn't have 5, we mix with general database
  let availableRoasts = [...db.intensity[intensityKey]];
  
  if (availableRoasts.length < 5 && category !== "general") {
    const generalRoasts = ROAST_DATABASE.general.intensity[intensityKey];
    availableRoasts = [...availableRoasts, ...generalRoasts];
  }

  // Shuffle and pick 5
  const selectedRoasts = shuffleArray(availableRoasts).slice(0, 5);

  // Return the result packet
  return {
    score,
    title,
    roasts: selectedRoasts,
    category,
    intensity
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

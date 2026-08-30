export interface InsightSection {
  type: "paragraph" | "divider" | "image" | "pullquote" | "aside" | "table" | "formula";
  content?: string;
  src?: string;
  alt?: string;
  label?: string;
  songTitle?: string;
  artist?: string;
  spotifyUrl?: string;
  caption?: string;
  headers?: string[];
  rows?: string[][];
  lines?: string[];
}

export interface Insight {
  id: string;
  title: string;
  subtitle: string;
  teaser: string;
  coverImage: string;
  sections: InsightSection[];
}

export const INSIGHTS: Insight[] = [
  {
    id: "beauty",
    title: "Beauty Will Save the World",
    subtitle: "On objective beauty, pilgrimage, and the flourishing of society",
    teaser:
      "On objective beauty, pilgrimage, and why societies that cultivate it flourish",
    coverImage: "/insights/beauty-cover.jpg",
    sections: [
      {
        type: "paragraph",
        content:
          "Beauty will save the world. As an obvious pointer to the transcendent, beauty stands alongside goodness, truth, and justice. Many superficial, directionlessly optimistic people will insist that beauty is subjective. What you need to show them is how people make pilgrimages to Venice, to Rome, and to countless other beautiful cities, regardless of the culture they come from. You do not see people from all over the world visiting Johor, Malaysia, and it would take considerable effort for almost anyone to pretend it holds the same beauty as Florence. Beauty, black and white, exists, and like morality and goodness, it is objective.",
      },
      { type: "divider" },
      {
        type: "image",
        src: "/insights/beauty-inline.jpg",
        alt: "Classical European architecture in Florence",
      },
      {
        type: "paragraph",
        content:
          "Where beauty of architecture, of minds, of art is abundant within a society, that society flourishes. Beyond the obvious economic benefit (consider how much Venice earns from tourism each year), beauty points toward something greater, something above us that we all long for. It offers us a taste of what a perfect world might look like, a glimpse of heaven.",
      },
      {
        type: "pullquote",
        content:
          "How thrilling, that we might gather ourselves, collaborate, and make our homes, our towns, our cities beautiful.",
      },
      {
        type: "paragraph",
        content:
          "How thrilling, that we might gather ourselves, collaborate, and make our homes, our towns, our cities beautiful, so that they align with the ultimate thing, our ultimate destiny, and turn us toward the best possible good. And when your mind is truly aligned with beauty, how could you act cruelly toward your neighbor?",
      },
      { type: "divider" },
      {
        type: "paragraph",
        content:
          "Imagine a place ablaze with beauty, overwhelmingly so, touching every corner your eye might fall upon. How much thrill would fill that life. How much strength would settle in our bones. How deeply would we long for tomorrow, as much as we long for today, and for yesterday.",
      },
    ],
  },
  {
    id: "music",
    title: "The Miracle of Music",
    subtitle: "On vibration, pattern, and a gift that resists explanation",
    teaser:
      "On vibration, pattern, and a gift that resists explanation",
    coverImage: "/insights/music-cover.jpg",
    sections: [
      {
        type: "paragraph",
        content:
          "Music is like an expression of beauty. We are able to experience different emotions, and sometimes utter joy, purely from the vibration of air in different frequencies and rhythms; that seems odd. How do you explain something like that? There seems to be no evolutionary necessity to feel so strongly purely due to the vibration of air. Sure, you can say that it had utility in primal times, such as singing a lullaby to children so that they sleep instead of cry, and that avoiding making sound was crucial to prevent predation by animals back in those days. You can also say that songs before battle help armies come into unity. But these identify the benefits of being able to enjoy music, not why we are inherently able to enjoy it.",
      },
      { type: "divider" },
      {
        type: "paragraph",
        content:
          "Diagnosing it from another perspective, some music can feel like patterns layered on top of each other that work together harmoniously. This seems analogous to life itself. Human experiences are inherently rich in patterns; like Mark Twain said, history, although it doesn't repeat itself, rhymes. Perhaps music pleases us because it enacts, in miniature, the same rhyming logic that governs a life.",
      },
      {
        type: "image",
        src: "/insights/music-inline.jpg",
        alt: "Sunlight through a lush jungle canopy",
      },
      {
        type: "pullquote",
        content:
          "Like beauty, this is not something to explain away, but a gift for us to enjoy, a miraculous gift.",
      },
      {
        type: "paragraph",
        content:
          "None of these attempts fully explains music sufficiently. After thorough investigation and analysis at all the levels I can think of, I came to the conclusion that, like beauty, this is not something to explain away, but a gift for us to enjoy, a miraculous gift.",
      },
      { type: "divider" },
      {
        type: "aside",
        label: "Songs",
        songTitle: "I'm God",
        artist: "Clams Casino (feat. Imogen Heap)",
        spotifyUrl: "https://open.spotify.com/track/0FVuyC9RP5MACjp4lgU3qZ",
        content:
          "The song is \"I'm God\" by Clams Casino (feat. Imogen Heap). I hate the name of the song — it feels almost sacrilegious attached to something so transcendent — but every time I hear it, the same picture returns. The song reminds me of the jungle. We have gathered the animals, returning to our houses made of palm leaves and straw, our wives looking at us with great passion. A picture recurs, unchanged, every time I hear it: a woman, presumably my spouse, stands on a rock looking towards me. The jungle slopes uphill, the sunlight falls toward where I stand. Maybe my ancestors did have a positive experience with this kind of scenario, and maybe they did have almost the exact same experience multiple times, in a pattern, over generations. Evolutionarily, this positive experience, in association with these elements (jungle, wife, etc.), became significant in the genes of my family, and was passed down to me so that I can similarly experience such joy. It blew me away when I learned that.",
      },
    ],
  },
  {
    id: "synchronicity",
    title: "Testing Synchronicity",
    subtitle: "On Jung, Schopenhauer, and a statistical experiment in meaningful coincidence",
    teaser:
      "Jung's idea, a chi-squared test on friendship and zodiac elements, and the sanity checks that made it honest",
    coverImage: "/insights/synchronicity-cover.jpg",
    sections: [
      {
        type: "paragraph",
        content:
          "Why do fragments of a dream from years ago unexpectedly meet with reality, seemingly without purpose? Why do I see the name of a small city, almost unknown to anyone, twice in the same day, in unconnected contexts? How is it that there are so many improbable coincidences like this? I found at least part of the answer in Carl Jung's book Synchronicity. Jung defines synchronicity as meaningful coincidence in life. He points out that Schopenhauer had previously formulated a version of this idea, with considerable philosophical vision, proposing that all causation operates on a spherical plane, where causal connections flow along the meridian lines, and acausal connections, namely synchronicity, run along the parallel lines.",
      },
      {
        type: "paragraph",
        content:
          "To save time from philosophical rambling, I'll jump to the point where I test this theory. Jung attempted to prove synchronicity's statistical significance, meaning he tried to show that meaningful coincidences aren't merely coincidences, since if they truly were, there would be little point in studying them at all: coincidences are virtually guaranteed given that anything can count as one and there is a near-infinite number of variables in life, so across enough trials they are bound to occur. We're trying to prove that an event like thinking of an old friend and then having their message appear on your social media is not simply a coincidence, and that although the two events are not causally connected, they are also not the product of random chance.",
      },
      {
        type: "paragraph",
        content:
          "Through an experiment he devised using the horoscopes of several hundred married couples, Jung examined whether certain traditional astrological pairings, such as a conjunction between one partner's sun sign and the other's moon sign, appeared among married couples more often than chance alone would predict. He reported a statistically notable correlation in his initial sample, though the effect grew weaker as he expanded the pool of couples, a detail he was candid about and one that later critics have pointed to.",
      },
      {
        type: "pullquote",
        content:
          "This does not amount to a defense of astrology in the traditional sense. It is better understood as a causally disconnected pattern that we classify as synchronicity.",
      },
      {
        type: "paragraph",
        content:
          "I found this experiment's underlying concept a compelling way of testing synchronicity, and, to be clear, this does not amount to a defense of astrology in the traditional sense. It is better understood as a causally disconnected pattern that we classify as synchronicity. So I wanted to improve on this experiment. My sample size is smaller than his, but I've made several improvements over his original methodology, including removing confounding factors and avoiding the p-hacking that weakened his results.",
      },
      { type: "divider" },
      {
        type: "image",
        src: "/insights/synchronicity-inline.jpg",
        alt: "The Milky Way over a mountain landscape",
      },
      {
        type: "paragraph",
        content:
          "My experiment: I obtained a list of all students in my high school (276 names) and used a calculator to generate 60 non-repeating random integers between 1 and 276. I sent each selected student a form asking for their birthday and their best friend's birthday. Of the 60 contacted, 46 responded. After removing troll responses, incomplete entries, nonsensical data, and one reciprocal duplicate pair (where two friends both submitted each other, counting the same friendship twice), I was left with 40 usable friendship pairs.",
      },
      {
        type: "aside",
        label: "Hypotheses",
        content:
          "Null hypothesis (H₀): There is no association between being friends and sharing a zodiac element; any matching elements within friendship pairs occur purely by random chance.\n\nAlternative hypothesis (H₁): There is an association between being friends and sharing a zodiac element; matching elements within friendship pairs do not occur purely by chance.",
      },
      {
        type: "paragraph",
        content:
          "Rather than testing zodiac signs directly (which would produce expected counts below 5 for our sample size), I tested whether friends share the same zodiac element — Earth, Air, Fire, or Water. I then calculated the probability of a same-element match using the actual distribution of elements in our sample: 29 Earth, 24 Air, 16 Fire, and 11 Water birthdays across 80 total birthdays.",
      },
      {
        type: "formula",
        label: "Expected Value",
        lines: [
          "P(Earth match) = (29/80)² = 0.1314",
          "P(Air match)   = (24/80)² = 0.0900",
          "P(Fire match)  = (16/80)² = 0.0400",
          "P(Water match) = (11/80)² = 0.0189",
          "─────────────────────────────────",
          "P(same element) = 0.2803",
          "E(matches) = 40 × 0.2803 = 11.2",
          "E(no match) = 40 − 11.2 = 28.8",
        ],
      },
      {
        type: "table",
        caption: "Observed vs. expected element matches among 40 friendship pairs",
        headers: ["Pair relationship", "Observed", "Expected"],
        rows: [
          ["Same element (match)", "17", "11.2"],
          ["Different element (no match)", "23", "28.8"],
          ["Total", "40", "40"],
        ],
      },
      {
        type: "formula",
        label: "Chi-Squared Goodness of Fit",
        lines: [
          "Observed proportion = 17/40 = 0.425",
          "Significance level α = 0.05, degrees of freedom = 1",
          "χ² = 4.15084",
          "p-value = 0.0416",
        ],
      },
      {
        type: "paragraph",
        content:
          "Assuming there is no special connection between friends' zodiac elements — meaning any matches happen purely by random chance based on the background distribution of birthdays — there is a 0.0416 probability of obtaining a chi-squared statistic as great or greater than 4.15084. At the 0.05 significance level, there is statistically significant evidence that the distribution of matching zodiac elements among friend pairs differs from what is expected by pure chance.",
      },
      {
        type: "aside",
        label: "Sanity Checks",
        content:
          "I pivoted from testing zodiac signs to zodiac elements because sign-level expected counts would fall below 5 for our sample size, violating the conditions for a valid chi-squared test.\n\nI removed a reciprocal duplicate pair (two Gemini friends who both submitted each other), which had artificially inflated the significance of the result.\n\nI adjusted expected values using the actual distribution of birthdays in our sample rather than assuming birthdays are uniformly distributed across the year — a bias that would have skewed the baseline probability of element matches.\n\nI considered the objection that students in the same high school are more likely to share similar ages and therefore similar zodiac elements. This is not a valid confound: zodiac elements depend on the month of birth, not the year.\n\nThe 10% rule for independence was not met in the original sample, but excluding duplicate reciprocal submissions mitigates this concern.",
      },
      {
        type: "paragraph",
        content:
          "The result is modest but honest. With 40 friendship pairs and a p-value of 0.0416, the data suggest something beyond pure chance — though I would not overstate the finding. A larger, independently replicated sample would be needed before drawing any sweeping conclusions about synchronicity. What matters to me is that the experiment was designed to test an idea, not to confirm a belief, and that every methodological weakness I could identify was addressed before the numbers were reported.",
      },
    ],
  },
];

export function getInsightById(id: string): Insight | undefined {
  return INSIGHTS.find((insight) => insight.id === id);
}

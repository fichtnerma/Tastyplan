export function getRandomEmail(): string {
  const adjectives = ["Happy", "Sunny", "Gentle", "Colorful", "Playful"];
  const nouns = ["Cat", "Dog", "Bird", "Tree", "Ocean"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const uuid = self.crypto.randomUUID();

  const randomNameWithUuid = `${randomAdjective}@${randomNoun}${uuid}.com`;

  return randomNameWithUuid;
}

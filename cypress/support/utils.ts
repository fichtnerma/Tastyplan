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

export function authDynamicUser() {
  const randomMail = getRandomEmail();
  console.log(randomMail);
  cy.request({
    method: "POST",
    url: "service/auth/register",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: randomMail,
      password: "1234567",
      role: "user",
    }),
  }).then(() => {
    cy.request({
      method: "POST",
      url: "/api/auth/signin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: randomMail,
        password: "1234567",
      }),
    }).then((resp) => {});
  });
}

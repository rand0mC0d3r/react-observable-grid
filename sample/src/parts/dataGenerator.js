const currencies = ["USD","EUR","GBP"];
const colorList = ['pink','green','blue','deepblue','orange','purple','brown','grey','black','olive']
const flavorsList = [
  'Chocolate', 'Vanilla', 'Strawberry', 'Mint', 'Coffee', 'Cinnamon', 'Peppermint', 'Lemon', 'Hazelnut', 'Coconut',
  'Pistachio', 'Cherry', 'Blueberry', 'Raspberry', 'Cranberry', 'Apricot', 'Peach', 'Pomegranate', 'Papaya', 'Lychee',
].map((flavor, index) => ({
  id: index,
  name: flavor,
  color: colorList[index % colorList.length],
}))

const randomSeed = Math.floor(Math.random() * 1500 + 1)

export const dataGenerator = (count) => count === 0 ? [] : new Array(count).fill().map((_, i) => {
  const randomFlavors = flavorsList.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6 + 1));
  const randomName = `${['Mary', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'][Math.floor(Math.random() * 10)]}`
  const randomSurname = `${['Williams', 'Johnson', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'][Math.floor(Math.random() * 10)]}`
  const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]
  return {
    uuid: `uuid_${i}`,
    name: randomName,
    surname: randomSurname,
    fullName: `${randomName} ${randomSurname}`,
    streetname: `n2_${i + 1}`,
    role: `${['Admin', 'Manager', 'User', 'Guest'][Math.floor(Math.random() * 4)]}`,
    description: `${[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Donec pulvinar nisi pulvinar metus cursus, eget malesuada nunc auctor.',
      'Maecenas vitae suscipit elit, ut varius diam.',
      'Duis consectetur a erat non tempus.',
      'Sed molestie at nibh ut ullamcorper.',
      'Mauris hendrerit egestas quam, vitae dictum tellus condimentum ut.',
      'Suspendisse in lorem pharetra, ornare leo id, condimentum neque. ',
      'Vestibulum odio justo, efficitur at dictum sed, pharetra ac nisi.',
      'Vivamus vel eleifend massa.',
      'Aenean est nunc, iaculis a maximus ut, blandit eget lorem.',
      'Proin et porta arcu.',
      'Curabitur ornare est nulla, in interdum dui lacinia id.',
      'Praesent et nunc eget ipsum blandit venenatis et et est.',
      'Sed bibendum auctor ullamcorper.',
      'Integer at ligula ac neque accumsan tincidunt.',
    ][Math.floor(Math.random() * 14)]}`,
    lastSeen: `${[
      '3w 2d ago',
      '2w 1d ago',
      '1w ago',
      '2d ago',
      '1d ago',
      'today',
      'yesterday',
      '2h ago',
      '1h ago',
      '30m ago',
    ][Math.floor(Math.random() * 10)]}`,
    tiles: randomFlavors,
    tilesHash: randomFlavors.map(({ name }) => name).sort().join(''),
    price: `${Math.floor(Math.random() * randomSeed)} ${randomCurrency}`,
    currency: randomCurrency,
  }
});

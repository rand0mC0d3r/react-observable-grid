
const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "SEK",
  "NZD"
];

const colorList = [
  'pink',
  'green',
  'blue',
  'yellow',
  'orange',
  'purple',
  'brown',
  'grey',
  'black',
  'white',
]

const flavorsList = [
  'Chocolate',
  'Vanilla',
  'Strawberry',
  'Mint',
  'Coffee',
  'Cinnamon',
  'Peppermint',
  'Lemon',
  'Hazelnut',
  'Coconut',
  'Pistachio',
  'Mocha',
  'Toffee',
  'Peanut',
  'Almond',
  'Honey',
  'Cherry',
].map((flavor, index) => ({
  id: index,
  name: flavor,
  color: colorList[index % colorList.length],
}))

export const dataGenerator = (count) => count === 0 ? [] : new Array(count).fill().map((_, i) => {
  const randomFlavors = flavorsList.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 10 + 2));
  return {
    uuid: `uuid_${i}`,
    name: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}.${i + 1}`,
    surname: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}.${i + 1}`,
    nickname: `n1_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)}${i + 1}`,
    streetname: `n2_${i + 1}_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)}`,
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
    ][Math.floor(Math.random() * 14)]} ${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)}`
    ,
    tiles: randomFlavors,
    tilesHash: randomFlavors.map(({ name }) => name).sort().join(''),
    price: `${i + 1}.0${Math.floor(Math.random() * 100)}`,
    currency: currencies[Math.floor(Math.random() * currencies.length)],
  }
});

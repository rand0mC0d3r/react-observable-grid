const currencies = ["USD","EUR","GBP","JPY","CAD","AUD","CHF","SEK","NZD"];
const colorList = ['pink','green','blue','yellow','orange','purple','brown','grey','black','white']
const flavorsList = ['Chocolate','Vanilla','Strawberry','Mint','Coffee','Cinnamon','Peppermint','Lemon','Hazelnut','Coconut'].map((flavor, index) => ({
  id: index,
  name: flavor,
  color: colorList[index % colorList.length],
}))

export const dataGenerator = (count) => count === 0 ? [] : new Array(count).fill().map((_, i) => {
  const randomFlavors = flavorsList.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 10 + 2));
  const randomName = `${['Mary', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'][Math.floor(Math.random() * 10)]}`
  const randomSurname = `${['Williams', 'Johnson', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'][Math.floor(Math.random() * 10)]}`
  const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]

  return {
    uuid: `uuid_${i}`,
    name: randomName,
    surname: randomSurname,
    fullName: `${randomName} ${randomSurname}`,
    streetname: `n2_${i + 1}`,
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
    price: `${i + 1}.0${Math.floor(Math.random() * 100)} ${randomCurrency}`,
    currency: randomCurrency,
  }
});

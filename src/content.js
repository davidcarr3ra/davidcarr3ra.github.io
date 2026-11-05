// Copy for each view, as plain data so the typewriter (Typewriter.jsx) can type
// and delete it character by character. A view is a list of blocks; each block
// is a paragraph ('p') or list item ('li') made of text parts; a part can be
// muted or a link (href).

const BOOKS = [
  ['Antifragile', 'Nassim Taleb'],
  ['Letters from a Stoic', 'Seneca'],
  ['Superintelligence', 'Nick Bostrom'],
  ['Security Analysis', 'Benjamin Graham and David Dodd'],
  ['Deep Work', 'Cal Newport'],
  ['Finance and the Good Society', 'Robert J. Shiller'],
  ['The Alchemist', 'Paulo Coelho'],
];

export const VIEWS = {
  about: [
    {
      type: 'p',
      parts: [
        {
          text:
            'David Carrera was a technical lead at Palantir Technologies. At Palantir, he ' +
            'led AI deployments for enterprise clients across the US and South Korea, ' +
            'including ',
        },
        { text: 'United Airlines', href: 'https://www.youtube.com/watch?v=51OH0x8ZPYQ' },
        { text: ', ' },
        { text: 'PG&E', href: 'https://www.palantir.com/impact/partner-in-crises/' },
        { text: ', and ' },
        { text: 'Hyundai', href: 'https://www.youtube.com/watch?v=ydUdlXftKXI' },
        {
          text:
            ', among others. He holds a B.S. in Computer Science with a concentration in ' +
            'Artificial Intelligence from Columbia University.',
        },
      ],
    },
  ],
  bookshelf: [
    { type: 'p', parts: [{ text: 'Some books that have influenced me over the years:' }] },
    ...BOOKS.map(([title, author]) => ({
      type: 'li',
      parts: [{ text: title }, { text: ` — ${author}`, muted: true }],
    })),
  ],
};

export const blockLength = (block) => block.parts.reduce((n, p) => n + p.text.length, 0);
export const viewLength = (key) => (key ? VIEWS[key].reduce((n, b) => n + blockLength(b), 0) : 0);

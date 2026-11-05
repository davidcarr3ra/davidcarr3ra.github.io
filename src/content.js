// Copy for each view, as plain data so the typewriter (Typewriter.jsx) can type
// and delete it character by character. A view is a list of blocks; each block
// is a paragraph ('p') or list item ('li') made of text parts, optionally muted.

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
            "Hi! My name is David Carrera. I'm a software engineer at Palantir and a CS " +
            'graduate from Columbia University. I love playing guitar, piano, reading, ' +
            'and aimless walks.',
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

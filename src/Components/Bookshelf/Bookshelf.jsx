const BOOKS = [
  { title: 'Antifragile', author: 'Nassim Taleb' },
  { title: 'Letters from a Stoic', author: 'Seneca' },
  { title: 'Superintelligence', author: 'Nick Bostrom' },
  { title: 'Security Analysis', author: 'Benjamin Graham and David Dodd' },
  { title: 'Deep Work', author: 'Cal Newport' },
  { title: 'Finance and the Good Society', author: 'Robert J. Shiller' },
  { title: 'The Alchemist', author: 'Paulo Coelho' },
];

export default function Bookshelf() {
  return (
    <>
      <p>Some books that have influenced me over the years:</p>
      <ul className="books">
        {BOOKS.map((book) => (
          <li key={book.title}>
            {book.title} <span className="muted">— {book.author}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

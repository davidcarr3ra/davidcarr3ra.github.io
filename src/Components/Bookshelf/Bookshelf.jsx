import './Bookshelf.css';

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
    <section id="bookshelf">
      <div className="row_bookshelf">
        <div className="bookshelf_title">
          <h2>BOOKSHELF</h2>
        </div>
        <div className="bookshelf_intro">
          <p>Some books that have influenced me over the years:</p>
        </div>
        <div className="books">
          <ul style={{ listStyleType: 'circle' }}>
            {BOOKS.map((book) => (
              <li key={book.title}>
                <p className="info mb0">
                  {book.title}
                  <span>&bull;</span> <em className="author">{book.author}</em>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

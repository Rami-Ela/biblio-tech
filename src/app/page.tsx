import { getAllBooks } from '@/server/actions/book';
import { getAllAuthors } from '@/server/actions/author';
import BookForm from './bookForm';
import { BookList } from './bookList';

export default async function Home() {
  const books = await getAllBooks();
  const authors = await getAllAuthors();

  return (
    <main className="flex flex-col flex-auto justify-center items-center">
      <h1 className="text-5xl mb-6"> Biblio-Tech </h1>
      <BookForm authors={authors} />
      <div className="w-80">
        <BookList books={books} />
      </div>
    </main>
  );
}

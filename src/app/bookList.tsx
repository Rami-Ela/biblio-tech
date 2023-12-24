'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BookListProps {
  books: {
    title: string;
    id: string;
    author: {
      firstName: string;
      lastName: string;
    };
  }[];
}

export function BookList({ books }: BookListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Auteur</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell>{book.title}</TableCell>
            <TableCell>{`${book.author.firstName} ${book.author.lastName}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

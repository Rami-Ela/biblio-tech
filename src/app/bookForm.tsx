'use client';

import { AutoComplete } from '@/components/ui/autocomplete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addBook } from '@/server/actions/book';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface BookFormProps {
  authors: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
}

export default function BookForm({ authors }: BookFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={async (formData) => {
        await addBook(formData);
        startTransition(() => {
          router.refresh();
        });
      }}
      className="flex flex-col space-y-4 justify-center items-center"
    >
      <Input
        type="text"
        placeholder="Nom du livre"
        className="w-80"
        name="title"
      />
      <AutoComplete
        name="authorId"
        className="w-80"
        options={authors.map((author) => ({
          label: `${author.firstName} ${author.lastName}`,
          value: author.id,
        }))}
        emptyMessage="Aucun résultat"
        placeholder="Séléctionnez un auteur"
      />
      <Button type="submit" disabled={isPending}>
        Ajouter
      </Button>
    </form>
  );
}

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col flex-auto justify-center items-center">
      <h1 className="text-5xl"> Biblio-Tech </h1>
      <Input type='text' placeholder="Nom du livre" className="w-80" />
    </main>
  )
}

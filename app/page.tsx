import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center">
        <Button asChild>
          <Link href="/search">Next</Link>
        </Button>
      </main>
    </div>
  )
}

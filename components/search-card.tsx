"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { keywordResearch, State } from "@/lib/actions"
import { useActionState } from "react"
import { Button } from "./ui/button"
import { Field, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Spinner } from "./ui/spinner"

export function SearchCard() {
  const initialState: State = { message: null, errors: {} }
  const [state, formAction, isPending] = useActionState(
    keywordResearch,
    initialState
  )

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>input to your keyword</CardTitle>
        <CardDescription>
          Please enter the keywords you want to search.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="search">Keyword</FieldLabel>
              <Input
                id="search"
                name="keyword"
                type="string"
                placeholder="buy laptop,cheap laptops for sale,best laptops 2025.etc"
                required
              />
            </Field>
            <div id="url-error" aria-live="polite" aria-atomic="true">
              {state.errors?.keyword &&
                state.errors.keyword.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <div id="result" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="whitespace-pre-wrap pt-4">{state.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

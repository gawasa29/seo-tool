"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "./ui/button"
import { Field, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"

export function SearchCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>input to your keyword</CardTitle>
        <CardDescription>
          Please enter the keywords you want to search.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
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

            <Field>
              <Button type="submit">Search</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

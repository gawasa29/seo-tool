"use server"

import z from "zod"

const keywordSchema = z.object({
  keyword: z.string().min(1, "Keyword is required"),
})

const KeywordResearch = keywordSchema

export type State = {
  errors?: {
    keyword?: string[]
  }
  message?: string | null
}

export async function keywordResearch(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = KeywordResearch.safeParse({
    keyword: formData.get("keyword"),
  })
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    const { fieldErrors } = z.flattenError(validatedFields.error)
    console.log("Validation errors:", fieldErrors)
    return {
      errors: fieldErrors,
      message: fieldErrors.keyword ? fieldErrors.keyword[0] : null,
    }
  }

  return { errors: {}, message: "" }
}

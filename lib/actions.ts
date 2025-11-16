"use server"

import * as client from "dataforseo-client"
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

  try {
    const rawInput = validatedFields.data.keyword
    const keywords = rawInput
      .split(",")
      .map((kw) => kw.trim())
      .filter((kw) => kw.length > 0)
    if (keywords.length === 0) {
      return {
        errors: { keyword: ["Please enter at least one keyword."] },
        message: "At least one keyword is required.",
      }
    }
    const username = "yusei-sagawa@getonereach.app"
    const password = "fce8fbab56a922e9"

    let api = new client.KeywordsDataApi("https://api.dataforseo.com", {
      fetch: (url: RequestInfo, init?: RequestInit): Promise<Response> => {
        const token = btoa(`${username}:${password}`)
        const authHeader = { Authorization: `Basic ${token}` }

        const newInit: RequestInit = {
          ...init,
          headers: {
            ...init?.headers,
            ...authHeader,
          },
        }

        return fetch(url, newInit)
      },
    })

    let task =
      new client.KeywordsDataClickstreamDataDataforseoSearchVolumeLiveRequestInfo()
    task.keywords = keywords
    task.location_code = 2840 // default United States location
    task.language_code = "en"
    task.use_clickstream = true
    let response = await api.clickstreamDataDataforseoSearchVolumeLive([task])

    const resultItems =
      response?.tasks?.[0]?.result?.[0]?.items?.filter(Boolean) ?? undefined

    if (!resultItems || resultItems.length === 0) {
      console.error("Invalid API response:", response)
      return {
        errors: { keyword: ["Invalid response from keyword research API."] },
        message: "An error occurred while processing your request.",
      }
    }

    console.log("API response:", response)

    const formattedResults = resultItems
      .map((item) => {
        const volume =
          item?.search_volume !== undefined ? item.search_volume : "N/A"
        return `• ${item?.keyword ?? "n/a"} | Search volume: ${volume}`
      })
      .join("\n")

    console.log("Keyword research summary:", formattedResults)

    return {
      message: `DataForSEO clickstream volume for "${keywords.join(
        ", "
      )}":\n${formattedResults}`,
    }
  } catch (error) {
    console.error("Error submitting keyword research task:", error)
    return {
      errors: { keyword: ["Failed to submit keyword research task."] },
      message: "An error occurred while processing your request.",
    }
  }
}

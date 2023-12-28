import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  difficulty: z.string(),
  language: z.string(),
  semester: z.number(),
  completed:z.boolean(),
// details: z.string(),
// constraints:z.string(),
// staterCode:z.string()
})

export type Task = z.infer<typeof taskSchema>
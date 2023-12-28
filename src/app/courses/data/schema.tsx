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

// id:'1',
// title: "Write a program to accept the personal information and print",
// language: "C",
// semester: 2,
// completed: true,
// difficulty: "easy",

export type Task = z.infer<typeof taskSchema>
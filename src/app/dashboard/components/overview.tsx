"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"



export function Overview({data}:any) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
///          label={{ value: 'lal', position: 'insideBottom', offset: -15,  }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          label={{ value: 'Number of Students ', angle: -90, position: 'insideLeft', offset: 15  }}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
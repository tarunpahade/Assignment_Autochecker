import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
interface highScorers {
  name: string;
  imageUrl: string;
  rollNo: number;
  score: number
}
export function RecentSales() {
  const highScorers:highScorers[] = [
    {
      name: 'Olivia Martin',
      imageUrl: '/avatars/01.png',
      rollNo: 1,
      score: 9.5
    }, {
      name: 'OM',
      imageUrl: '/avatars/01.png',
      rollNo: 1,
      score: 9.2
    },
    {
      name: 'OM',
      imageUrl: '/avatars/01.png',
      rollNo: 1,
      score: 9.5
    }, {
      name: 'OM',
      imageUrl: '/avatars/01.png',
      rollNo: 1,
      score: 9.5
    }, {
      name: 'OM',
      imageUrl: '/avatars/01.png',
      rollNo: 1,
      score: 9.5
    }
  ]
  return (
    <div className="space-y-8">
      {highScorers.map((x,key) => {
        
          return (

          
        <div key={key} className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{x.name}</p>
          <p className="text-sm text-muted-foreground">
          Roll Number:  {x.rollNo}
          </p>
        </div>
        <div className="ml-auto font-medium">{x.score} CGPA</div>
      </div>
          )
})
      }
    </div>
  )
}
'use client'
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/app/dashboard/components/date-range-picker"
import { OverviewSection } from "@/app/dashboard/components/overviewSection"

import { SetStateAction, useState } from "react"
import { ReportSection } from "@/app/dashboard/components/reportSection"
import { InstructorNav } from "./components/InstructorNav"



export default function DashboardPage() {
  const [button, setbutton] = useState('overview')
  const handleTabClick = (value: SetStateAction<string>) => {
    setbutton(value);
  };
  return (
    <>
<div className=" flex-col md:flex">
   <InstructorNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs value={button} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">
                <div className={`${button === 'overview' ? ('') : ('opacity-50')}`} onClick={() => handleTabClick('overview')}>Overview</div>
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <div className={`${button === 'analytics' ? ('') : ('opacity-50')}`} onClick={() => handleTabClick('analytics')}>Analytics</div>
              </TabsTrigger>
              <TabsTrigger value="reports" >
                <div className={`${button === 'reports' ? ('') : ('opacity-50')}`} onClick={() => handleTabClick('reports')}>Reports</div>
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>

                <div className={`${button === 'notifications' ? ('') : ('opacity-50')}`} onClick={() => handleTabClick('notifications')}>Notifications</div>
              </TabsTrigger>

            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <OverviewSection />
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <div className="grid  ">
                <ReportSection />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
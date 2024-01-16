import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export function DialogDemo({ open, close, addTeacher, loadingNewTeacher }: any) {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    return (
        <Dialog open={open} onOpenChange={close} >

            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Assign Teacher</DialogTitle>
                    <DialogDescription>

                        {loadingNewTeacher ? (
                            <p>Loading ....</p>
                        ) : (
                            <p> Add a new teacher</p>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" required value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">

                        <Label htmlFor="Subject"
                            className="text-right"

                        >
                            Subject
                        </Label>
                        <Input id="Subject" required value={subject} onChange={(e) => { setSubject(e.target.value) }} placeholder="Subject" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => close()} type="submit">Close</Button>
                    <Button onClick={() => addTeacher({ name: name, subject: subject })} type="submit">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

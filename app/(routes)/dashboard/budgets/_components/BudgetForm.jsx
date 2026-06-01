"use client"
import { PlusIcon } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { budgets } from "@/db/schema"
import { Name } from "drizzle-orm"
import { createBudget } from "@/app/actions/budget"
import { toast } from "sonner"
export default function BudgetForm() {

    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName]=useState();
    const [amount, setAmount]=useState();

     const [openDialog, setOpenDialog] = useState(false)

    const onCreateBudget=async()=>{
        if(!name || !amount) return;
        
        try{

            const res=await createBudget({
                name: name,
                amount: amount,
                icon: emojiIcon
                
            })

            if(res.success){
                setName("");
                setAmount("");
                setOpenDialog(false);
                toast("Budget Created Successfully!!")

            }else{
                alert(`Error:${res.error}`)
            }
        }catch(error){
            console.error(error)
        }
        
    }
    return (
        <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <div className="bg-slate-100 p-10 items-center flex flex-col rounded-md border-2 border-dashed 
        cursor-pointer hover:shadow-md ">
                    <div> <PlusIcon /></div>
                    <h2>New Budget</h2>
                </div >
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-5 relative">

                    <Button
                        className="text-2xl"
                        size="lg"
                        variant="outline"
                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    >{emojiIcon}
                    </Button>
                    {openEmojiPicker && (
                        <div className="absolute mt-2 z-50 left-0 shadow-lg ">
                            <EmojiPicker
                                open={openEmojiPicker}
                                onEmojiClick={(e) => {
                                    setEmojiIcon(e.emoji)
                                    setOpenEmojiPicker(false);
                                }}
                            />
                        </div>
                    )}
                    <div className="mt-2">
                        <h2 className="text-black font-medium mb-1">Budget Name</h2>
                        <Input
                        placeholder="e.g. Home Decor"
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <h2 className="text-black font-medium mb-1">Budget Amount</h2>
                        <Input
                        placeholder="e.g. $50"
                        onChange={(e)=>setAmount(e.target.value)}
                        type="number"
                        />
                    </div>
                    <Button
                    disabled={!(name&&amount)}
                    onClick={(e)=>onCreateBudget()}
                    className="mt-5 w-full text-1xl p-3">Create Budget</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

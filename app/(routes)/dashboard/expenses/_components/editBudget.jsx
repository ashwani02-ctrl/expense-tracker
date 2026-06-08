"use client"
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
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
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/app/actions/updateBudget";
import { toast } from "sonner";

export default function EditBudget({expenseData,expenseList, refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState(expenseData?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState(expenseData?.name);
    const [amount, setAmount] = useState(expenseData?.amount);

    const [openDialog, setOpenDialog] = useState(false);

    const onUpdateBudget = async()=>{
        if(!name || !amount ) return;

        try{
            const res = await updateBudget({
                name: name,
                amount: amount,
                icon: emojiIcon
            },
            expenseData?.id
        )

            if(res.success){
                refreshData();
                setOpenDialog(false);
                toast("Budget updated Successfully!!")
            }else{
                alert(`Error:${res.error}`)
            }
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div>
            <Dialog
                open={openDialog}
                onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button className='flex gap-2'> <PenBox />Edit</Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
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
                                defaultValue={expenseData?.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <h2 className="text-black font-medium mb-1">Budget Amount</h2>
                            <Input
                                placeholder="e.g. $50"
                                defaultValue={expenseData?.amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                            />
                        </div>
                        <Button
                            disabled={!(name && amount)}
                            onClick={(e) => onUpdateBudget()}
                            className="mt-5 w-full text-1xl p-3">Update Budget</Button>
                    </div>
                </DialogContent>
            </Dialog></div>
    )
}
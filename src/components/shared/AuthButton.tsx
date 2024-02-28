"use client"

import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Button } from '../ui/button'
import { signIn, signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import Image from 'next/image'


function AuthButton({ userId, userImage }: { userId: string | null | undefined, userImage: string | null | undefined }) {
    return (
        <div className=' mr-6'>
            {
                (userId === null || userId === undefined) ? (
                    <div>
                        <Dialog>
                            <DialogTrigger className=' p-2 px-4 bg-blue-500 rounded-full hover:bg-opacity-10 hover:text-blue-400'>
                                Login
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className=' mb-4'>Login with</DialogTitle>
                                    <DialogDescription className=' grid grid-flow-row gap-2'>
                                        <Button onClick={() => signIn('google')} variant={"outline"}>google</Button>
                                        <Button onClick={() => signIn('github')} variant={"outline"}>github</Button>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                ) : (
                    <div>
                        <HoverCard>
                                <HoverCardTrigger>
                                    <div className=' w-8 h-8 rounded-full overflow-hidden grid place-content-center border-b-2 border-r-2 border-transparent hover:border-blue-500'>
                                        <Image src={userImage!} alt='USER' width={1000} height={1000} className=' w-full h-full'/>
                                    </div>
                            </HoverCardTrigger>
                            <HoverCardContent className='flex font-semibold flex-col gap-2 w-fit'>
                                <Button onClick={()=>signOut()} variant={'outline'} className='flex gap-1 text-red-500 hover:text-red-400'><LogOut/>Logout</Button>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                )
            }
        </div>
    )
}

export default AuthButton
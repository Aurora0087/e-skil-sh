"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    describe: z.string().min(2, {
        message: "Describe must be at least 2 characters.",
    }),
    imageUrl: z.string(),
    videoUrl: z.string(),
    categoryId: z.string(),
})


import React, { useState } from 'react'
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader"
import { useRouter } from "next/navigation"
import { useUploadThing } from "@/utils/uploadthing"
import CatagoryDropDown from "../oneTime/CatagoryDropDown"

function VideoUploaderForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            describe: "",
            imageUrl: "",
            videoUrl: "",
            categoryId: "",
        },
    })

    const [imagefiles, setImageFiles] = useState<File[]>([]);
    const [videoFiles, setVideoFiles] = useState<File[]>([]);

    const { startUpload } = useUploadThing('mediaPost')

    const route = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {

        let uploadImageUrl = values.imageUrl
        let uploadVideoUrl = values.videoUrl

        if (uploadImageUrl.length > 0 && uploadVideoUrl.length > 0) {

            const uploadFiles = await startUpload([imagefiles[0],videoFiles[0]])

            if (!uploadFiles) {
                return
            }

            uploadImageUrl = uploadFiles[0].url
            uploadVideoUrl = uploadFiles[1].url
            console.table([uploadImageUrl,uploadVideoUrl])
        }
    }
    return (
        <div className=' p-6 flex flex-col w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" text-2xl">Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} className=" text-black font-semibold" />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display Title for your video.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CatagoryDropDown value={field.value} onChangeHandeler={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="describe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" text-2xl">Describe</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className=" text-black" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" text-2xl">Thumbnail</FormLabel>
                                    <FormControl>
                                        <FileUploader
                                            onFieldChange={field.onChange}
                                            fileUrl={field.value}
                                            setFiles={setImageFiles}
                                            fileType='image' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="videoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" text-2xl">Video</FormLabel>
                                    <FormControl>
                                        <FileUploader
                                            onFieldChange={field.onChange}
                                            fileUrl={field.value}
                                            setFiles={setVideoFiles}
                                            fileType='video' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className=""
                    >
                        {form.formState.isSubmitting ? ('submitting...') : ('submit')}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default VideoUploaderForm
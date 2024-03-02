'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'

import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'
import { Upload } from 'lucide-react'
import Image from 'next/image'

type FileUploaderProps = {
    onFieldChange: (url: string) => void
    fileUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
    fileType: 'image' | 'video'
}

export function FileUploader({ fileUrl, onFieldChange, setFiles, fileType }: FileUploaderProps) {

    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
        onFieldChange(convertFileToUrl(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: `${fileType}/*` ? generateClientDropzoneAccept([`${fileType}/*`]) : undefined,
    })

    return (
        <div
            {...getRootProps()}
            className="flex-center bg-dark-3 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 border-dashed border">
            <input {...getInputProps()} className="cursor-pointer" />

            {fileUrl ? (
                <div className="flex h-full w-full flex-1 justify-center ">
                    {fileType === 'image' ? (
                        <Image
                            src={fileUrl}
                            alt="image"
                            width={500}
                            height={500}
                            className="w-full object-cover object-center"
                        />
                    ) : (
                        <video
                            src={fileUrl}
                            controls
                            width={250}
                            height={250}
                            className="w-full object-cover object-center"
                        />
                    )}
                </div>
            ) : (
                <div className="flex flex-center justify-center items-center h-full flex-col p-5 text-grey-500 capitalize">
                    <Upload />
                        <h3 className="mb-2 mt-2 text-xl">drag & drop your <span className=' text-blue-500'>{fileType}</span> file</h3>
                    <p className="p-medium-12 mb-4">or</p>
                    <Button type="button" className="rounded-full">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    )
}

'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'

type FileUploaderProps = {
  onChangeHandler: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function Fileuploader({ imageUrl, onChangeHandler, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    onChangeHandler(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center bg-[#F5F5F5] dark:bg-accent h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className=" flex items-center justify-center flex-col py-5 text-grey-500">
          <Image src="/upload.svg" width={200} height={200} alt="file upload" />
          <h3 className="mb-2 mt-2 font-bold">Drag & Drop Image here</h3>
          <p className="mb-4 font-bold">Svg, Png, Jpeg</p>
          <Button type="button" className="rounded-sm bg-blue-600 hover:bg-blue-500">
            Insert an Image
          </Button>
        </div>
      )}
    </div>
  )
}
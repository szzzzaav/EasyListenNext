"use client";

import Modal from "@/hooks/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";

const UploadModal = () => {
  const Upload = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { reset, handleSubmit, register, getValues } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      image: null,
      lyric: null,
    },
  });
  const onChange = () => {
    if (!Upload.isOpen) {
      reset();
    }
    if (Upload.isOpen) {
      return Upload.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {};

  return (
    <div>
      <Modal
        title="Add a Song"
        description="Upload a mp3 file"
        isOpen={Upload.isOpen}
        onChange={onChange}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <Input
            id="title"
            {...register("title", { required: true })}
            disabled={isLoading}
            placeholder="Song title"
          />
          <Input
            id="author"
            {...register("author", { required: true })}
            disabled={isLoading}
            placeholder="Song author"
          />
          <div>
            <div>Select a song file</div>
            <Input
              id="song"
              type="file"
              accept=".mp3"
              {...register("song", { required: true })}
              disabled={isLoading}
              placeholder="choose a mp3 file"
            />
          </div>
          <div>
            <div>Select a image</div>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              disabled={isLoading}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageUrl(URL.createObjectURL(file));
                }
              }}
            />
          </div>
          <div>
            <div>Select a lyric</div>
            <Input
              id="lyric"
              type="file"
              accept=".lrc"
              {...register("lyric", { required: true })}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-3">
            <Button
              disabled={isLoading}
              className="bg-orange-600"
              onClick={() => {
                setOpenPreview(!openPreview);
              }}
            >
              Preview
            </Button>
            <Button disabled={isLoading}>Submit</Button>
          </div>
        </form>
      </Modal>
      <Modal
        title={
          getValues("title") ? getValues("title") : "please input song title"
        }
        description={
          getValues("author") ? getValues("author") : "please input song author"
        }
        isOpen={openPreview}
        onChange={() => {
          setOpenPreview(false);
        }}
      >
        {imageUrl ? (
          <div className="w-[400px] h-[400px] relative">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="rounded-lg bg-transparent object-cover"
            />
          </div>
        ) : (
          <div className="text-center">Please upload an image</div>
        )}
      </Modal>
    </div>
  );
};

export default UploadModal;

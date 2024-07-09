import Modal from "@/hooks/Modal";
import useUploadModal from "@/hooks/useAuthModal copy";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";

const UploadModal = () => {
  const Upload = useUploadModal();
  const onChangeModal = () => {
    if (Upload.isOpen) {
      reset();
      return Upload.onClose();
    }
    if (!Upload.isOpen) {
      return Upload.onOpen();
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { register, getValues, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      lyric: null,
      image: null,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    reset();
  };
  return (
    <div>
      <Modal
        title="Add a song"
        description="upload a mp3 file"
        isOpen={Upload.isOpen}
        onChange={onChangeModal}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <Input
            id="title"
            placeholder="song title"
            disabled={isLoading}
            {...register("title", { required: true })}
          />
          <Input
            id="author"
            placeholder="song author"
            disabled={isLoading}
            {...register("author", { required: true })}
          />
          <div>
            <div>Select a song Cover</div>
            <Input
              id="image"
              type="file"
              accept="image/*"
              disabled={isLoading}
              {...register("image", { required: true })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target?.files?.[0];
                if (file) {
                  setImageUrl(URL.createObjectURL(file));
                }
              }}
            />
          </div>
          <div>
            <div>Select a song File</div>
            <Input
              id="song"
              type="file"
              accept=".mp3"
              disabled={isLoading}
              {...register("song", { required: true })}
            />
          </div>
          <div>
            <div>Select a lyric File</div>
            <Input
              id="lyric"
              type="file"
              accept=".lrc"
              disabled={isLoading}
              {...register("lyric", { required: true })}
            />
          </div>
          <div className="flex flex-row gap-4">
            <Button
              className="bg-orange-600"
              onClick={() => setOpenPreview(true)}
            >
              Preview
            </Button>
            <Button>Create</Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={openPreview}
        onChange={() => setOpenPreview(false)}
        title={
          getValues("title") ? getValues("title") : "Please input song title"
        }
        description={
          getValues("author") ? getValues("author") : "Please input song author"
        }
      >
        {!imageUrl ? (
          <div>Pleas upload an image</div>
        ) : (
          <div className="w-[400px] h-[400px] relative">
            <Image
              alt="Cover"
              src={imageUrl}
              fill
              className="object-cover rounded-2xl"
            ></Image>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UploadModal;

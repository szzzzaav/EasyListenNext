import Modal from "@/hooks/Modal";
import useUploadModal from "@/hooks/useAuthModal copy";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

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
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const chineseRegex = /[\u4e00-\u9fff]/;
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      const lyricFile = values.lyric?.[0];
      const title = values.title;
      const author = values.author;

      if (!user) {
        return toast.error("without user,please log in");
      }

      if (!imageFile || !songFile || !lyricFile) {
        return toast.error("File Missing");
      }

      if (!title || !author) {
        return toast.error("Song information Missing");
      }

      if (
        chineseRegex.test(imageFile.name) ||
        chineseRegex.test(lyricFile) ||
        chineseRegex.test(songFile)
      ) {
        return toast.error("File name cannot include chinese");
      }

      setIsLoading(true);
      const uid = uniqid();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`songs-${songFile.name}-${uid}`, songFile, {
          cacheControl: "3600",
          // 允许更新
          upsert: true,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      const { data: lyricData, error: lyricError } =
        await supabaseClient.storage
          .from("lyrics")
          .upload(`lyrics-${lyricFile.name}-${uid}`, lyricFile, {
            cacheControl: "3600",
            // 允许更新
            upsert: true,
          });

      if (lyricError) {
        console.log(lyricError);
        setIsLoading(false);
        return toast.error("Failed lyric upload");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`images-${imageFile.name}-${uid}`, imageFile, {
            cacheControl: "3600",
            // 允许更新
            upsert: true,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Cover lyric upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
          lyric_path: lyricData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("song created");
      reset();
      Upload.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
            <Button type="submit">Create</Button>
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

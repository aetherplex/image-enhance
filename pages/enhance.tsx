import { CompareSlider } from '@/components/CompareSlider';
import appendNewToName from '@/utils/appendNewToName';
import downloadPhoto from '@/utils/downloadPhoto';
import Image from 'next/image';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { UploadDropzone } from 'react-uploader';
import { Uploader } from 'uploader';

const uploader = Uploader({
    apiKey: 'free',
});

const options = {
    multi: true,
    styles: {
        colors: {
            primary: '#14b8a6',
        },
        fontSizes: {
            base: 16, // Base font size (px).
        },
    },
};

export default function EnhancePage() {
    const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
    const [restoredImage, setRestoredImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
    const [sideBySide, setSideBySide] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [photoName, setPhotoName] = useState<string | null>(null);

    const UploadDropZone = () => (
        <UploadDropzone
            uploader={uploader}
            options={options}
            onUpdate={(file) => {
                if (file.length !== 0) {
                    setPhotoName(file[0].originalFile.originalFileName);
                    setOriginalPhoto(
                        file[0].fileUrl.replace('raw', 'thumbnail')
                    );
                    generatePhoto(file[0].fileUrl.replace('raw', 'thumbnail'));
                }
            }}
            width="670px"
            height="250px"
        />
    );

    async function generatePhoto(fileUrl: string) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLoading(true);
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: fileUrl }),
        });

        let newPhoto = await res.json();
        if (res.status !== 200) {
            setError(newPhoto);
        } else {
            setRestoredImage(newPhoto);
        }
        setLoading(false);
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col gap-12 items-center mt-32">
                <div className="flex flex-col gap-6 items-center">
                    <h1 className="text-4xl font-bold ">Upload an image</h1>
                    <p className="text-gray-400">
                        This should only take a few minutes.
                    </p>
                </div>
                {restoredLoaded && sideBySide && (
                    <CompareSlider
                        original={originalPhoto!}
                        restored={restoredImage!}
                    />
                )}
                {!originalPhoto && <UploadDropZone />}
                {/* {originalPhoto && !restoredImage && (
                    <Image
                        alt="original photo"
                        src={originalPhoto}
                        className="rounded-2xl"
                        width={475}
                        height={475}
                    />
                )} */}
                {originalPhoto && !sideBySide && (
                    <div className="flex sm:space-x-4 sm:flex-row flex-col">
                        <div>
                            <h2 className="mb-1 font-medium text-lg">
                                Original Photo
                            </h2>
                            {originalPhoto && orignaLoaded ? (
                                <Image
                                    alt="original photo"
                                    src={originalPhoto ?? ''}
                                    className="rounded-2xl relative"
                                    width={475}
                                    height={475}
                                />
                            ) : (
                                <div
                                    className="h-64 w rounded-lg bg-white"
                                    style={{
                                        width: '475px',
                                        height: '950px',
                                    }}
                                />
                            )}
                        </div>
                        <div className="sm:mt-0 mt-8">
                            <h2 className="mb-1 font-medium text-lg">
                                Restored Photo
                            </h2>
                            <a
                                href={restoredImage ?? ''}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {restoredImage && restoredLoaded ? (
                                    <Image
                                        alt="restored photo"
                                        src={restoredImage ?? ''}
                                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in"
                                        width={475}
                                        height={475}
                                        onLoadingComplete={() =>
                                            setRestoredLoaded(true)
                                        }
                                    />
                                ) : (
                                    <div
                                        className="h-64 w rounded-lg bg-white"
                                        style={{
                                            width: '475px',
                                        }}
                                    />
                                )}
                            </a>
                        </div>
                    </div>
                )}
                {loading && (
                    <button
                        disabled
                        className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40"
                    >
                        <span className="pt-4">
                            <BeatLoader color="#fff" size={10} />
                        </span>
                    </button>
                )}
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                        role="alert"
                    >
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <div className="flex space-x-2 justify-center">
                    {originalPhoto && !loading && (
                        <button
                            onClick={() => {
                                setOriginalPhoto(null);
                                setRestoredImage(null);
                                setRestoredLoaded(false);
                                setError(null);
                            }}
                            className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 transition"
                        >
                            Upload New Photo
                        </button>
                    )}
                    {restoredLoaded && (
                        <button
                            onClick={() => {
                                downloadPhoto(
                                    restoredImage!,
                                    appendNewToName(photoName!)
                                );
                            }}
                            className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                        >
                            Download Restored Photo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

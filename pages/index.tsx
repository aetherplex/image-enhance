import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-2 flex-1">
            <div className="pt-16 flex flex-col items-center gap-16">
                <div className="flex gap-6 justify-center items-center flex-1 w-full">
                    <div className="flex w-auto rounded-lg overflow-hidden w-1/4 2xl:w-1/2">
                        <Image
                            src={'/leo_old.png'}
                            width={726}
                            height={838}
                            alt="Old image"
                        />
                    </div>
                    <div className="flex  rounded-lg overflow-hidden w-1/4 2xl:w-1/2">
                        <Image
                            src={'/leo_new.png'}
                            width={726}
                            height={838}
                            alt="New image"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-6 items-center">
                    <h1 className="w-3/4 text-4xl 2xl:text-6xl font-bold text-center leading-normal">
                        Enhance the quality of any image{' '}
                        <span
                            className="text-teal-300"
                            style={{
                                textShadow: '#5eead4 1px 0 30px;',
                            }}
                        >
                            using the power of AI.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Simply upload an image and let our AI do the rest.
                    </p>
                    <Button
                        size="xl"
                        iconRight={<FiArrowRight />}
                        onClick={() => router.push('/enhance')}
                    >
                        Get started
                    </Button>
                </div>
            </div>
        </div>
    );
}

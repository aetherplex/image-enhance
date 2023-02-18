import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import Button from './Button';

export default function Header() {
    const [currentTheme, setCurrentTheme] = useState<string>('dark');
    const router = useRouter();

    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(currentTheme);
    }, [currentTheme]);

    return (
        <div className="w-full flex gap-2 justify-between items-center py-8">
            <Link href="/">
                <h1 className="font-bold text-lg">
                    Image <span className="text-teal-400">Enhance</span>
                </h1>
            </Link>
            <div className="flex gap-2">
                <Button
                    size="md"
                    iconRight={<FiArrowRight />}
                    onClick={() => router.push('/enhance')}
                >
                    Get started
                </Button>
            </div>
        </div>
    );
}

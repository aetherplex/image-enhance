import clsx from 'clsx';
import Head from 'next/head';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
    return (
        <div
            className={clsx(
                'w-full min-h-screen flex flex-col bg-white dark:bg-zinc-900',
                className
            )}
            // style={{
            //     backgroundColor: '#141414',
            // }}
        >
            <div className="w-11/12 mx-auto flex flex-col max-w-7xl">
                <Head>
                    <title>Image Enhance</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className="flex flex-col w-full flex-1">
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    );
}

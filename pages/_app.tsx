import Layout from '@/components/Layout';
import '@/styles/main.css';
import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class">
            <Layout className={inter.className}>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

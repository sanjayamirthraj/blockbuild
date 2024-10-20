import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-between p-20">
            <div className="w-full relative flex">

                <div className="w-1/3 relative h-screen justify-center items-center ml-40 mt-52">
                    <Link href="/home">
                        <Image
                            src="/login.svg"
                            alt="Login Illustration"
                            priority
                            className="draggable-none pointer-events-none"
                            width={350}
                            height={100}
                        />
                    </Link>

                </div>

                {/* Pattern SVG */}
                <div className="w-2/3 relative ml-56">
                    <Image
                        src="/pattern.svg"
                        alt="Auth Background Pattern"
                        priority
                        className="draggable-none pointer-events-none"
                        width={1100}
                        height={1100}
                    />
                </div>
            </div>
        </div>
    );
}

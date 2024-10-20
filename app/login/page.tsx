import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'

export default function LoginPage() {
    return (
        <div className=" flex items-center justify-between p-20">
            <div className="w-full relative flex mt-20">

                <div className="w-1/3 relative justify-center items-center ml-40 mt-40">
                    <Link href="/home">
                        <Image
                            src="/XRPLAuth.svg"
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
                        src="/XRPL.svg"
                        alt="XRPL Background Pattern"
                        priority
                        className="draggable-none pointer-events-none"
                        width={1500}
                        height={1500}
                    />
                </div>
            </div>
        </div>
    );
}

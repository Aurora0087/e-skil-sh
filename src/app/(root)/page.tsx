import { auth } from "@/auth";
import { navItem } from "@/components/shared/Header";
import { FloatingNav } from "@/components/ui/NavBar";
import { WavyBackground } from "@/components/ui/Wave-Bg";
import Image from "next/image";

export default async function Home() {

  const session = await auth();
  return (
    <main>
      <WavyBackground backgroundFill="#1e293b">
        <div>
          <h1 className=" font-bold text-9xl text-white/50">eLio</h1>
        </div>
        <FloatingNav userId={session?.user.id} userImage={session?.user.image} navItems={navItem}/>
      </WavyBackground>
      <div className=" w-full h-screen bg-red-500">none</div>
    </main>
  );
}

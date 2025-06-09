

import Chatbot from "@/components/bot/chatbot";
import { MunuLandingPage } from "@/components/LandingPage";
export default function Home() {
  return (
    <div suppressHydrationWarning>
      <MunuLandingPage/>
      <Chatbot/>
    </div>
  );
}

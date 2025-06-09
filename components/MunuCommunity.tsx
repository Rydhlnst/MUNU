import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DiscordFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { TiltButton } from "./gsap/tilt-button"

const faqs = [
  {
    question: "What is MUNU?",
    answer:
      "MUNU is your digital partner for the F&B industry. We help you create interactive digital menus in seconds, publish them with one click, and manage updates automatically—no coding required.",
  },
  {
    question: "Can I try MUNU for free?",
    answer:
      "Absolutely! MUNU offers a free plan that lets you experience our core features. For advanced capabilities, we offer affordable paid plans to help you grow your business.",
  },
  {
    question: "Why does my F&B business need a digital menu?",
    answer:
      "Digital menus reduce printing costs, simplify price and promotion updates, provide a modern experience for customers, and enable integration with online ordering systems for greater efficiency.",
  },
  {
    question: "How do I create a digital menu with MUNU?",
    answer:
      "It's super easy! Just sign up, choose a template you like, enter your menu details, and publish. The entire process is designed to be quick and intuitive, even for beginners.",
  },
  {
    question: "Do I need technical skills to use MUNU?",
    answer:
      "Not at all. MUNU is designed for everyone. If you can use social media, you can definitely use MUNU to create a professional digital menu.",
  },
]

export function MunuCommunity() {
  return (
    <section className="w-full bg-background py-20 px-8 md:px-12 lg:px-16 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Title and CTA Button */}
        <div className="flex flex-col space-y-6">
          <h2 className="font-serif text-2xl italic text-primary">Community</h2>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            Whatever support you need, we&apos;re here for you
          </h1>
          <p className="text-muted-foreground text-lg">
            Join our community of restaurant owners, managers, and F&B enthusiasts to share tips and get the help you need.
          </p>
          <div>
            <TiltButton size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <HugeiconsIcon icon={DiscordFreeIcons} className="mr-2 h-5 w-5" />
              Join Discord
            </TiltButton>
          </div>
        </div>

        {/* Right Column: FAQ with Accordion */}
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

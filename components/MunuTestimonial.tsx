// src/components/MunuTestimonials.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    name: "Andini Lestari",
    handle: "Owner of 'Senja' Café",
    avatar: "https://i.pravatar.cc/150?u=andini",
    content:
      "“I used to struggle separating personal and business finances—cash flow was always messy. Since using MUNU, everything is organized in one dashboard. The advisor also helped me create a healthy business budget. Now I can focus on growing my café with peace of mind.”",
  },
  {
    name: "Chef Rendra",
    handle: "Executive Chef",
    avatar: "https://i.pravatar.cc/150?u=rendra",
    content:
      "“I earn a good salary, but it always seemed to disappear quickly. MUNU helped me track my spending and plan my first investment. Seeing my portfolio grow made me more optimistic about my financial future.”",
  },
  {
    name: "Grace Wijaya",
    handle: "Marketing Manager",
    avatar: "https://i.pravatar.cc/150?u=grace",
    content:
      "“As a busy professional, I never had time to manage investments deeply. MUNU’s onboarding was so efficient. Now I can monitor all my assets and consult an advisor anytime. It’s incredibly convenient!”",
  },
  {
    name: "Budi Santoso",
    handle: "Family Business Owner",
    avatar: "https://i.pravatar.cc/150?u=budi",
    content:
      "“What caught my attention was the long-term planning. MUNU helped me plan for my children’s education and my retirement fund. It feels reassuring to know that my family’s future is well-planned and secure.”",
  },
  {
    name: "David",
    handle: "Project Manager",
    avatar: "https://i.pravatar.cc/150?u=david",
    content:
      "“I used to be afraid of investing because it seemed complicated. MUNU’s advisor explained everything patiently and in simple terms. I started with a small amount, and now investing has become a habit.”",
  },
  {
    name: "Pak Joko",
    handle: "Retiree",
    avatar: "https://i.pravatar.cc/150?u=joko",
    content:
      "“Even though I’m not very tech-savvy, MUNU turned out to be very easy to use. The interface is simple. I can now manage my own retirement fund without relying on others. It’s not as hard as I thought.”",
  },
];

export function MunuTestimonials() {
  return (
    <section className="w-full bg-background py-20 px-8 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl italic text-primary">What They Say</h2>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mt-2">
            Hear From <span className="text-primary">MUNU</span> Users
          </h1>
        </div>

        {/* Testimonials Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.handle}
              className="break-inside-avoid bg-card border-border border shadow-sm transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={`Avatar of ${testimonial.name}`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

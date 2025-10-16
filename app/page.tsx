import SeasonalSection from "@/app/(home)/sections/SeasonalSection";

export const revalidate = 300;

import { DiscountModalWrapper } from "@/components/DiscountModal/DiscountModalWrapper";
import Hero from "./(home)/sections/Hero";
import FeaturedSection from "./(home)/sections/FeaturedSection";
import SpecialDealsSection from "./(home)/sections/SpecialDealsSection";
import MissionSection from "./(home)/sections/MissionSection";
import WhyUsSection from "./(home)/sections/WhyUsSection";
import InspirationSection from "./(home)/sections/InspirationSection";
import TestimonialsSection from "./(home)/sections/TestimonialsSection";
import CtaSection from "./(home)/sections/CtaSection";

export default async function HomePage() {
    return (
        <div className="min-h-screen">
            <DiscountModalWrapper />
            <Hero />
            <MissionSection />
            <SeasonalSection />
            <FeaturedSection />
            <SpecialDealsSection />
            <WhyUsSection />
            <InspirationSection />
            <TestimonialsSection />
            <CtaSection />
        </div>
    );
}

import Navbar from "@/components/Navbar";
import SplitHero from "@/components/SplitHero";
import StreetFoodSection from "@/components/StreetFoodSection";
import MenuSection from "@/components/MenuSection";
import TraiteurQuiz from "@/components/TraiteurQuiz";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <SplitHero />
        <StreetFoodSection />
        <MenuSection />
        <TraiteurQuiz />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

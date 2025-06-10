/* import AuthenticationPage from "./authentication/page"; */
import Benefits from "@/components/benefits";
import ContactCTA from "@/components/contact";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";

{/* <div className="flex h-screen items-center justify-center">
  <AuthenticationPage />
</div> */}
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Benefits Section */}
      <Benefits />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <ContactCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

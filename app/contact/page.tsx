import Contact from "@/components/Contact";
import ContactFooter from "@/components/ContactFooter";
import ContactNavbar from "@/components/ContactNavbar";

export const metadata = {
  title: "Contact - Srikar.dev",
  description: "Get in touch with Srikar for freelance work, collaborations, and full-time opportunities.",
};

export default function ContactPage() {
  return (
    <main className="relative w-full">
      <ContactNavbar />
      <Contact />
      <ContactFooter />
    </main>
  );
}

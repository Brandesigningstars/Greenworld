import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: 'Are your projects DTCP and RERA approved?',
      answer: 'Yes, absolutely! All our projects are either DTCP approved or RERA registered (where applicable). We provide complete documentation including DTCP layout approval certificates, RERA registration details, clear title documents, EC (Encumbrance Certificate), Patta, Chitta, and survey documents. As an ISO 9001:2015 certified company, we ensure 100% legal transparency.',
    },
    {
      question: 'Do you assist with legal documentation?',
      answer: 'Yes, we provide complete legal assistance throughout your property purchase. Our services include sale agreement drafting, title verification, registration support, mutation and Patta transfer, EC verification, and bank loan documentation support. Our dedicated legal team ensures all documents are authentic, verified, and hassle-free.',
    },
    {
      question: 'How can I schedule a site visit?',
      answer: "Scheduling a site visit is very easy! You can click the 'Book a Visit' button on our website and fill in your details, call us directly at 96000 77816, send a WhatsApp message, or email us at greenworldrealtors012@gmail.com. Our team will confirm your visit within 24 hours and arrange a personalized property tour at your convenience.",
    },
    {
      question: 'What are the payment options available?',
      answer: 'We offer flexible payment options to suit your needs: one-time payment with special discounts, installment plans (varies by project), bank loan assistance, and complete documentation support for home loans. The payment process includes a token amount upon booking, agreement signing, installments as per the chosen plan, and registration after final payment.',
    },
    {
      question: 'Do you provide installment facilities?',
      answer: 'Yes, we provide installment facilities for most of our projects. The installment plans are designed to be customer-friendly with flexible tenure options. The terms vary based on the project and payment plan selected. We also assist with bank loan processing and provide all necessary documentation for easy loan approval.',
    },
    {
      question: 'How long does registration take?',
      answer: 'The registration process typically takes 7-15 days after the final payment is completed. This includes document verification, preparation of sale deed, sub-registrar appointment, and final registration. Our team handles all the paperwork and coordinates with the registration office to ensure a smooth and timely process. You will receive clear title with all legal formalities completed.',
    },
    {
      question: 'Can I visit the property before booking?',
      answer: 'Absolutely! We highly encourage site visits before booking. You can schedule a free site visit at your convenience. Our team will give you a comprehensive tour, explain the layout, show amenities, discuss location advantages, and answer all your questions. There is no obligation to book - we want you to make an informed decision.',
    },
    {
      question: 'Do you have farmland or residential projects?',
      answer: 'We specialize in both! We offer DTCP-approved residential layouts with plots for building your dream home, ready-to-move-in apartments and villas, farmland developments in strategic locations, and plotted developments near major infrastructure. Each project is carefully selected for excellent connectivity, appreciation potential, and quality infrastructure.',
    },
  ];

  return (
    <section
  id="faq"
  ref={sectionRef}
  className="py-20 bg-[#aee59c] bg-gradient-to-b from-[#aee59c] via-[#b9f0a9] to-[#d4f5c5] !important overflow-x-hidden"

>

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-green-800">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Find answers to common questions about Green World Realtors
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white border-2 border-gray-200 rounded-xl px-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-lg text-green-800 pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-black pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-black mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:9600077816"
              className="text-green-700 hover:text-green-800 transition-colors"
            >
              Call us: 96000 77816
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a
              href="mailto:greenworldrealtors012@gmail.com"
              className="text-green-700 hover:text-green-800 transition-colors"
            >
            greenworldrealtors012@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

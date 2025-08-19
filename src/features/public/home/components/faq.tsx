import { Link } from '@tanstack/react-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQProps {
  question: string
  answer: string
  value: string
}

const FAQList: FAQProps[] = [
  {
    question: 'Do you offer custom furniture design?',
    answer:
      'Yes, we specialize in custom-made furniture tailored to your preferences in size, finish, materials, and design style.',
    value: 'item-1',
  },
  {
    question: 'Where is your store located?',
    answer:
      'Our showroom is located on Main Road, Kolhapur, Maharashtra. You’re welcome to visit us and explore our collections in person.',
    value: 'item-2',
  },
  {
    question: 'Do you deliver outside Kolhapur?',
    answer:
      'Yes, we deliver across Maharashtra and selected cities in India. Delivery charges may vary depending on the location.',
    value: 'item-3',
  },
  {
    question: 'What materials do you use in your furniture?',
    answer:
      'We use high-quality hardwoods such as teak and sheesham, along with premium plywood and laminates. Upholstery options include fabric, leatherette, and genuine leather.',
    value: 'item-4',
  },
  {
    question: 'Do your products come with a warranty?',
    answer:
      'Yes, all our products come with a standard 1-year warranty covering manufacturing defects. Additional warranty options are available for select items.',
    value: 'item-5',
  },
]

export const FAQ = () => {
  return (
    <section id='faq' className='container py-24 sm:py-32'>
      <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
        Frequently Asked{' '}
        <span className='from-accent-foreground to-primary bg-linear-to-b bg-clip-text text-transparent'>
          Questions
        </span>
      </h2>

      <Accordion type='single' collapsible className='AccordionRoot w-full'>
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className='text-left text-base'>
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className='mt-6 font-medium'>
        Still have questions?{' '}
        <Link
          rel='noreferrer noopener'
          to='/contact'
          className='text-primary border-primary transition-all hover:border-b-2'
        >
          Contact us
        </Link>
      </h3>
    </section>
  )
}

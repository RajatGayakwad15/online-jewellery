import { ContactForm } from './components/contact-form'

const Contact = () => {
  return (
    <>
      <section id='contact'>
        <div className='container py-20'>
          <div className='space-y-2 text-center'>
            <h2 className='text-3xl font-bold lg:text-4xl'>
              Contact{' '}
              <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
                Us
              </span>
            </h2>
            <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
              Got a question or collaboration idea? Drop us a message!
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}

export default Contact

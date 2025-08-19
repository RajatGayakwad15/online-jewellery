import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Message sent!')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto my-12 flex w-full flex-col gap-4 md:w-8/12 lg:w-6/12'
    >
      <div className='flex flex-col gap-4 md:flex-row'>
        <Input
          type='text'
          placeholder='Your Name'
          required
          className='bg-muted/50 dark:bg-muted/80'
        />
        <Input
          type='email'
          placeholder='Your Email'
          required
          className='bg-muted/50 dark:bg-muted/80'
        />
      </div>

      <div className='flex flex-col gap-4 md:flex-row'>
        <Input
          type='tel'
          placeholder='Your Phone Number'
          required
          pattern='^[0-9+\-()\s]*$'
          className='bg-muted/50 dark:bg-muted/80'
        />
        <Input
          type='text'
          placeholder='Subject'
          required
          className='bg-muted/50 dark:bg-muted/80'
        />
      </div>

      <Textarea
        placeholder='Your Message'
        rows={5}
        required
        className='bg-muted/50 dark:bg-muted/80'
      />

      <Button type='submit' className='mt-2'>
        Send Message
      </Button>
    </form>
  )
}

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { apiClient } from '@/lib/apiClient'

export const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await apiClient.post('/contacts', {
        name,
        email,
        phone,
        subject,
        message,
      })

      toast.success('Message sent successfully!')
      setName('')
      setEmail('')
      setPhone('')
      setSubject('')
      setMessage('')
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='bg-muted/50 dark:bg-muted/80'
        />
        <Input
          type='email'
          placeholder='Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='bg-muted/50 dark:bg-muted/80'
        />
      </div>

      <div className='flex flex-col gap-4 md:flex-row'>
        <Input
          type='tel'
          placeholder='Your Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern='^[0-9+\-()\s]*$'
          className='bg-muted/50 dark:bg-muted/80'
        />
        <Input
          type='text'
          placeholder='Subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className='bg-muted/50 dark:bg-muted/80'
        />
      </div>

      <Textarea
        placeholder='Your Message'
        rows={5}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='bg-muted/50 dark:bg-muted/80'
      />

      <Button type='submit' className='mt-2'>
        Send Message
      </Button>
    </form>
  )
}

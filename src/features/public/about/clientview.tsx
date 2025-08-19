import React from "react";
// import { Card } from "@/components/ui/card";
import testimonialsData from "@/features/public/about/clientview.json";
import {
    Card,
    // CardDescription,
    // CardHeader,
    // CardTitle,
  } from '@/components/ui/card'

interface Testimonial {
  id: number;
  name: string;
  testimonial: string;
  rating: number;
  image: string;
}

const Clientreview: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* <h2 className="text-3xl font-bold md:text-4xl text-white mb-12 text-center">
        Happy Customers{" "}
        <span className="from-[#F7C46B] to-[#F29F05] bg-linear-to-r bg-clip-text text-transparent">
          Hear from Our
        </span>
      </h2> */}
        <h2 className='text-3xl font-bold md:text-4xl mb-12'>
            <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
            Happy Customers{" "}
            </span>
            Hear from Our
          </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsData.map((testimonial: Testimonial) => (
          <Card key={testimonial.id}>
            <div className="flex items-start justify-start gap-4 space-y-1 md:flex-row p-6">
              <div className="bg-primary/20 mt-1 rounded-2xl p-2 flex-shrink-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-semibold ">{testimonial.name}</div>
                <div className="text-sm opacity-80 ">Client</div>
                <div className="text-md mt-2  italic">"{testimonial.testimonial}"</div>
                <div className="flex mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-300 text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clientreview;

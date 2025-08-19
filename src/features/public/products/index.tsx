import { Products as P2 } from '../home/components/products'
import frontimage from "@/assets/extra imges/product-front-image.webp"

const Products = () => {
  return (
    <>
     <div>
        <img
          src={frontimage}
          alt="Modern Jewellery Showcase"
          className="h-30 lg:h-80 w-full object-contain md:object-cover transition-all duration-500 ease-out"
        />
      </div>
      <P2 />
      
    </>
  )
}

export default Products

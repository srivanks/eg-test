import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a
import { PromotionsProps } from "./types/types"

const Promotions = ({ promotions }: PromotionsProps) => {
  return (
    <Carousel
      autoPlay
      showIndicators={false}
      infiniteLoop
      stopOnHover={false}
      showStatus={false}
      showArrows={false}
    >
      {promotions.map(d => (
        <div key={d.id} className="m-5">
          <div className="min-w-full flex justify-center items-center">
            {d.name}
          </div>
          <div className="min-w-full flex justify-center items-center">
            {d.definition}
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default Promotions

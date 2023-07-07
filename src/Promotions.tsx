import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a
import { PromotionProps } from "./types/types"
import useFetch from "./hooks/fetch"
import Loader from "./Loader/Loader"

const Promotions = () => {
  let {
    isLoading: isPromotionLoading,
    error: promotionError,
    data: promotions,
  } = useFetch<PromotionProps>(import.meta.env.VITE_PROMOTIONS_API_URL)

  if (promotionError) {
    return <div>Cant load promotion. Please try again later.</div>
  }
  if (isPromotionLoading) return <Loader />
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

import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a
import Loader from "./Loader/Loader"
import useFetch from "./hooks/fetch"
import { PromotionProps } from "./types/types"

const Promotions = () => {
  const { isLoading, error, data } = useFetch<PromotionProps>(
    import.meta.env.VITE_PROMOTIONS_API_URL,
  )
  if (error) {
    return (
      <h3>
        An error occurred when fetching data. Please check the API and try
        again.
      </h3>
    )
  }
  if (isLoading) {
    return <Loader />
  }
  console.log(data)
  return (
    <Carousel
      autoPlay
      showIndicators={false}
      infiniteLoop
      stopOnHover={false}
      showStatus={false}
      showArrows={false}
    >
      {data.map(d => (
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

import { useState } from "react"
import data  from "../data.json"


const Product = ({ onAddToCart }) => {
  // set state for the active product
  const [currentProduct, setCurrentProduct] = useState(0)

  // set state for increasing product quantity
  const [quantity, setQuantity] = useState(1)

  // set state for updating the cart
  const [cart, setCart] = useState([])

  // set state to keep track of active thumbnail and overlay
  const [activeThumbnail, setActiveThumbnail] = useState(-1)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)



  // functions to handle thumbnail click and toggle overlay
  const handleThumbnailClick = (index) => {
    setCurrentProduct(index)
  }

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }

  // fucntion to handle increment
  const increment = () => {
    setQuantity(quantity + 1)
  }

  // function to handle decrement
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  // create function to handle nav buttons
  const handleNext = () =>{
    setCurrentProduct((previousProduct) => (previousProduct + 1) % data.productImage.length)
  }

  const handlePrevious = () => {
    setCurrentProduct((previousProduct) => (previousProduct - 1 + data.productImage.length) % data.productImage.length)
  }

  const handleAddToCart = () => {
    const product = {
      id: data.productImage[currentProduct].id,
      name: data.productImage[currentProduct].name,
      imgURL: data.productImage[currentProduct].imgURL,
      price: 125.0,
      quantity: quantity,
      alt: data.productImage[currentProduct].alt,
    };
    onAddToCart(product);
  };

  return (
    <div className="grid lg:grid-cols-2 lg:place-items-center lg:gap-20 lg:px-16 rela">
      <div className="relative">
        <img 
          onClick={toggleOverlay}
          className="lg:rounded-2xl"
          src={data.productImage[currentProduct].imgURL}
          alt={data.productImage[currentProduct].alt} />

        <div>
          <button 
            onClick={handlePrevious}
            aria-label="go to next image"
            className="absolute top-[45%] left-[5%] lg:hidden bg-white w-12 h-12 grid place-items-center rounded-full" >
            <img src="/images/icon-previous.svg" alt="" />
          </button>
          <button 
          onClick={handleNext}
            aria-label="go to next image"
            className="absolute top-[45%] right-[5%] lg:hidden bg-white w-12 h-12 grid place-items-center rounded-full" >
            <img src="/images/icon-next.svg" alt="" />
          </button>

        </div>

        <div className="lg:flex hidden items-center gap-10 mt-10 justify-between">
          {data.productThumbnail.map((item, index) => (
            <button 
              className={`${index === activeThumbnail ? "border-4 border-orange" : "border-transparent"} rounded-xl hover:opacity-50`} 
              onClick={() => handleThumbnailClick(index)} >
              <div key={index}>
                <img
                  src={item.imgURL}
                  alt={item.alt}
                  className="rounded-lg" />
              </div>
            </button>
          ))}
        </div>
      </div>
      

      {/* Overlay */}
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="relative w-[7 0%] lg:w-[30%]">
            <div className="relative">
              <img
                className="lg:rounded-2xl"
                src={data.productImage[currentProduct].imgURL}
                alt={data.productImage[currentProduct].alt}
              />
              <div>
                <button
                  onClick={handlePrevious}
                  aria-label="go to previous image"
                  className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white w-12 h-12 grid place-items-center rounded-full"
                >
                  <img src="/images/icon-previous.svg" alt="Previous" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="go to next image"
                  className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white w-12 h-12 grid place-items-center rounded-full"
                >
                  <img src="/images/icon-next.svg" alt="Next" />
                </button>
                <button
                  onClick={toggleOverlay}
                  aria-label="close overlay"
                  className="absolute p-4 -top-16 hover:bg-orange rounded-full -right-6  w-12 h-12 grid place-items-center"
                >
                  <img src="/images/icon-close.svg" alt="Close" />
                </button>
              </div>
            </div>


            <div className="w-4/5 mx-auto flex items-center gap-8 mt-8 justify-center">
              {data.productThumbnail.map((item, index) => (
                <button
                  key={index}
                  className={`${index === activeThumbnail ? "border-4 border-orange" : "border-transparent"} rounded-xl hover:opacity-50`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img src={item.imgURL} alt={item.alt} className="rounded-lg" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-dark-grayish-blue p-6">
        <p className="font-bold text-sm tracking-wider mb-4">SNEAKER COMPANY</p>
        <h2 className="text-very-dark-blue mb-4 lg:mb-10 text-3xl lg:text-5xl font-bold leading-tight">Fall Limited Edition <br /> Sneakers</h2>
        <p className="mb-4">These low profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.</p>

        <div  className="flex items-center justify-between mb-4 lg:flex-col lg:items-start lg:mb-8">
          <div>
            <p className="text-very-dark-blue mb-4 text-3xl font-bold leading-tigh">$125.00 <span className="text-sm text-white bg-very-dark-blue p-1 px-2 rounded-lg">50%</span></p>
          </div>

          <p className="font-bold line-through">$250.00</p>
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-light-grayish-blue lg:w-4/5">
            <button
              onClick={decrement}
              aria-label="decrease product number"
              className="p-4" >
              <img src="/images/icon-minus.svg" alt="" />
            </button>
            <div className="no-spinner">
              <input
                id="number"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-5 bg-transparent"
                 />
            </div>
            <button
              className="p-4"
              onClick={increment}
              aria-label="decrease product number">
              <img src="/images/icon-plus.svg" alt="" />
            </button>
          </div>
          <button className="flex items-center gap-4 text-very-dark-blue font-bold bg-orange w-full justify-center p-4 rounded-lg mt-4 lg:m-0">
            <img
              src="/images/icon-cart.svg"
              width={18}
              alt="" />Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
import Navigation from "./components/Navigation";
import Product from "./components/Product";

export default function App() {
  return (
    <main className="text-sans md:max-w-[75rem] mx-auto overflow-x-hidden mb-10">
      <Navigation />
      <Product />
    </main>
  )
}
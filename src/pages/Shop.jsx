import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Carousel from "../components/ui/Carousel";
import { GET_SHOP } from "../../database/graphql/query/feed";
import { useQuery } from "@apollo/client/react";

function Shop({ onNavigateToFeed, onNavigateToProfile, onLogout }) {
  const [activeItem, setActiveItem] = useState('shop')
  const { loading, error, data } = useQuery(GET_SHOP)
  console.log(data)

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId)

    if(itemId === 'feed') 
      onNavigateToFeed?.()
    else if(itemId === 'profile') 
      onNavigateToProfile?.()
    else if(itemId === 'logout')
      onLogout?.()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="md:flex">
        {/* Desktop Sidebar */}
        <Sidebar activeItem={activeItem} onItemClick={handleMenuClick} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="w-full max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-brand-graphite mb-6 hidden md:block">
              Shop
            </h1>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Carregando itens...</div>
              </div>
            )}

            {error && (
              <ErrorMessage
                message={"Erro ao carregar itens"}
                error={error.message}
              />
            )}

            {!loading && !error && (
              <Carousel items={data.allShops}/>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default Shop;

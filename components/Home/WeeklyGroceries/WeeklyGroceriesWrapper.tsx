import CardItem from '@/components/Cards/CardItem'
import { useTypedHomeSelector } from '@/store/home-slice';

const WeeklyGroceriesWrapper = ({ tabIndex }: { tabIndex: number }) => {
    const weeklyProducts = useTypedHomeSelector((state) => state.homePageReducer.homePageData).weeklyProducts;
    
    return (
        <div className="row">
                    <div className="col-lg-12">
                        {tabIndex === 0 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Female')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        liked={item.liked}
                                        image={item.image}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 1 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Male')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        image={item.image}
                                        liked={item.liked}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 2 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Mother & Kid')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        liked={item.liked}
                                        image={item.image}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 3 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Households')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        image={item.image}
                                        liked={item.liked}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 4 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Furnitures')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        liked={item.liked}
                                        image={item.image}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
    )
}

export default WeeklyGroceriesWrapper
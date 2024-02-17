import { createContext, useEffect, useReducer } from 'react';
import productsData from '../../data/productsData';
import { brandsMenu, categoryMenu } from '../../data/filterBarData';
import filtersReducer from './filtersReducer';

const filtersContext = createContext();


const initialState = {
    allProducts: [],
    sortedValue: null,
    updatedBrandsMenu: brandsMenu,
    updatedCategoryMenu: categoryMenu,
    selectedPrice: {
        price: 0,
        minPrice: 0,
        maxPrice: 0
    },
    mobFilterBar: {
        isMobSortVisible: false,
        isMobFilterVisible: false,
    },
};


const FiltersProvider = ({ children }) => {

    const [state, dispatch] = useReducer(filtersReducer, initialState);


    useEffect(() => {

       
        const products = [...productsData];

        const priceArr = products.map(item => item.finalPrice);
        const minPrice = Math.min(...priceArr);
        const maxPrice = Math.max(...priceArr);

        dispatch({
            type: 'LOAD_ALL_PRODUCTS',
            payload: { products, minPrice, maxPrice }
        });

    }, []);


    const applyFilters = () => {

        let updatedProducts = [...productsData];

        if (state.sortedValue) {
            switch (state.sortedValue) {
                case 'Latest':
                    updatedProducts = updatedProducts.slice(0, 6).map(item => item);
                    break;

                case 'Featured':
                    updatedProducts = updatedProducts.filter(item => item.tag === 'featured-product');
                    break;

                case 'Top Rated':
                    updatedProducts = updatedProducts.filter(item => item.rateCount > 4);
                    break;

                case 'Price(Lowest First)':
                    updatedProducts = updatedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
                    break;

                case 'Price(Highest First)':
                    updatedProducts = updatedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
                    break;

                default:
                    throw new Error('Wrong Option Selected');
            }
        }

        const checkedBrandItems = state.updatedBrandsMenu.filter(item => {
            return item.checked;
        }).map(item => item.label.toLowerCase());

        if (checkedBrandItems.length) {
            updatedProducts = updatedProducts.filter(item => checkedBrandItems.includes(item.brand.toLowerCase()));
        }

        const checkedCategoryItems = state.updatedCategoryMenu.filter(item => {
            return item.checked;
        }).map(item => item.label.toLowerCase());

        if (checkedCategoryItems.length) {
            updatedProducts = updatedProducts.filter(item => checkedCategoryItems.includes(item.category.toLowerCase()));
        }

        if (state.selectedPrice) {
            updatedProducts = updatedProducts.filter(item => {
                return item.finalPrice <= state.selectedPrice.price;
            });
        }

        dispatch({
            type: 'FILTERED_PRODUCTS',
            payload: { updatedProducts }
        });
    };

    useEffect(() => {
        applyFilters();
    }, [state.sortedValue, state.updatedBrandsMenu, state.updatedCategoryMenu, state.selectedPrice]);



    const setSortedValue = (sortValue) => {
        return dispatch({
            type: 'SET_SORTED_VALUE',
            payload: { sortValue }
        });
    };

    const handleBrandsMenu = (id) => {
        return dispatch({
            type: 'CHECK_BRANDS_MENU',
            payload: { id }
        });
    };

    const handleCategoryMenu = (id) => {
        return dispatch({
            type: 'CHECK_CATEGORY_MENU',
            payload: { id }
        });
    };

    const handlePrice = (event) => {
        const value = event.target.value;

        return dispatch({
            type: 'HANDLE_PRICE',
            payload: { value }
        });
    };

    const handleMobSortVisibility = (toggle) => {
        return dispatch({
            type: 'MOB_SORT_VISIBILITY',
            payload: { toggle }
        });
    };

    const handleMobFilterVisibility = (toggle) => {
        return dispatch({
            type: 'MOB_FILTER_VISIBILITY',
            payload: { toggle }
        });
    };

    const handleClearFilters = () => {
        return dispatch({
            type: 'CLEAR_FILTERS'
        });
    };


    const values = {
        ...state,
        setSortedValue,
        handleBrandsMenu,
        handleCategoryMenu,
        handlePrice,
        handleMobSortVisibility,
        handleMobFilterVisibility,
        handleClearFilters,
    };


    return (
        <filtersContext.Provider value={values}>
            {children}
        </filtersContext.Provider>
    );
};

export default filtersContext;
export { FiltersProvider };
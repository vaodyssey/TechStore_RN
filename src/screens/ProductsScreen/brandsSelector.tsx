import { ScrollView, View } from "react-native";
import { ActivityIndicator, IconButton, MD3Colors, ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { API_Brands_GetAll } from "../../services/apis/brands";
import { Brand } from "../../entities/Brand";
import { DARK_BLUE } from "../../constants/colors";
import { IconButtonWithURL } from "../../components/iconButtonWithUrl";
import { useDispatch } from "react-redux";
import { setBrandName } from "../../redux/searchSlice";

type BrandSelectorProps = {
    refreshList:()=>void
}
export default function BrandSelector({refreshList}:BrandSelectorProps) {
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState<Brand[]>()
    const dispatch = useDispatch();
    const filterByBrand = (brandName:string) => {
        dispatch(setBrandName(brandName))
        refreshList()
    }

    useEffect(() => {
        API_Brands_GetAll().then((brandsResponse) => {
            setBrands(brandsResponse)
            setLoading(false)
        })

    }, [])
    return (
        <View>
            {loading ? (
                <View>
                    <ActivityIndicator size="large" />
                </View >
            ) : (

                <ScrollView horizontal>
                    {brands?.map((brand, key) => {
                        return (
                            <IconButtonWithURL
                                url={brand.image}
                                onPress={() => { filterByBrand (brand.name)}}
                                key={key}
                            />)
                    })}

                </ScrollView>
            )}
        </View>
    )
}

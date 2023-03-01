import { FlatList, TouchableOpacity } from "react-native";
import { formatCurrency } from "../../Utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";
import {
    ProductContainer,
    ProductImage,
    ProductDetails,
    Separetor,
    AddToCartButton
} from './styles';
import { useState } from "react";
import { Product } from "../../types/Product";

interface MenuProps {
    onAddToCart: (product : Product) => void;
    products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

    function handleOpenModal(product: Product) {
        setIsModalVisible(true);
        setSelectedProduct(product);
    }

    return (
        <>
            <ProductModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct}
                onAddToCart={onAddToCart}
            />


            <FlatList
                data={products}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={product => product._id}
                ItemSeparatorComponent={Separetor}  // Linha separando os elemntos
                renderItem={({ item: product }) => (
                    <ProductContainer onPress={() => handleOpenModal(product)}>
                        <ProductImage
                            source={{
                                uri: `http://192.168.15.12:3001/uploads/${product.imagePath}`,
                            }}
                        />

                        <ProductDetails>
                            <Text weight="600" >{product.name}</Text>
                            <Text color="#666" size={14} style={{ marginVertical: 8 }}>{product.description}</Text>
                            <Text weight="600" size={14}>{formatCurrency(product.price)}</Text>
                        </ProductDetails>

                        <AddToCartButton onPress={() => onAddToCart(product)}>
                            <PlusCircle />
                        </AddToCartButton>
                    </ProductContainer>
                )}
            />
        </>
    );
}
import { Image, StyleSheet, View } from "react-native";

type ImageViewerProps = {
    url: string;
    height: number;
}
export default function ImageViewer({ url, height }: ImageViewerProps) {
    return (
        <View>
            <Image
                source={{ uri: url }}
                height={height}
                width={undefined}
                resizeMode="stretch"
            />
        </View>
    );
};

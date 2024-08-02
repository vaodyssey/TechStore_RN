import { Image, StyleSheet, View } from "react-native";

type ImageViewerProps = {
    url: string;
    height: number;
    width: number;
}
export default function ImageViewer({ url, height,width }: ImageViewerProps) {
    return (
        <View>
            <Image
                source={{ uri: url }}
                height={height}
                width={width}
                resizeMode="stretch"
            />
        </View>
    );
};

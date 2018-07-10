import { PixelRatio, Platform, Dimensions, StatusBar } from 'react-native';

class Util {
    constructor() {
        this.scale = 1;

        let designSize = { width: 750, height: 1334 };
        let dim = 'screen';
        let navHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 64;

        let { width, height } = Dimensions.get(dim);

        console.log(`screen ${width} x ${height}`);
        console.log(`screen ${PixelRatio.getPixelSizeForLayoutSize(width)} x ${PixelRatio.getPixelSizeForLayoutSize(height)}`);

        if (dim != "screen") height -= navHeight;

        this.scale = width / designSize.width;
    }

    dp2px(dp) {
        return PixelRatio.getPixelSizeForLayoutSize(dp);
    }

    px2dp(px) {
        return px * this.scale;
    }
}

export default new Util();
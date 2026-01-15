import React from 'react';
import { View } from 'react-native';

const LinearGradientShim = (props) => {
    const { colors, start, end, style, children, ...rest } = props;

    let direction = 'to bottom';
    if (start && end) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        direction = `${angle}deg`;
    }

    const gradientString = `linear-gradient(${direction}, ${colors.join(', ')})`;

    return (
        <View
            style={[
                style,
                {
                    backgroundImage: gradientString,
                    backgroundColor: colors[0]
                }
            ]}
            {...rest}
        >
            {children}
        </View>
    );
};

export default LinearGradientShim;

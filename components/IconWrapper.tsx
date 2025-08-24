import { View } from 'react-native';

type IconWrapperProps = {
    children: React.ReactNode;
    focused: boolean;
    fillColor: string;
};

export function IconWrapper({ children, focused, fillColor }: IconWrapperProps) {
    return (
        <View
            style={{
                backgroundColor: focused ? fillColor : 'transparent',
                padding: 10,
                borderRadius: 999,
            }}
        >
            {children}
        </View>
    );
}

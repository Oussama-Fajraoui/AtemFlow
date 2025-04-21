import { Slot } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import BottomTabs from '@/components/navigation/BottomTabs'

export default function TabsLayout() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Slot />
            </View>
            <BottomTabs />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
})

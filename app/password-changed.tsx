import { View, StyleSheet } from 'react-native'
import PasswordChanged from '@/components/auth/PasswordChanged'

export default function PasswordChangedScreen() {
    return (
        <View style={styles.container}>
            <PasswordChanged />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
})

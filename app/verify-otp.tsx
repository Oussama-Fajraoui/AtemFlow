import { View, StyleSheet } from 'react-native'
import VerifyOtpForm from '@/components/auth/VerifyOtpForm'

export default function VerifyOtpScreen() {
    return (
        <View style={styles.container}>
            <VerifyOtpForm />
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

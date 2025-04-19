import { View, StyleSheet } from 'react-native'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export default function ForgotPasswordScreen() {
    return (
        <View style={styles.container}>
            <ForgotPasswordForm />
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

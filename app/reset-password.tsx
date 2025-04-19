import { View, StyleSheet } from 'react-native'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordScreen() {
    return (
        <View style={styles.container}>
            <ResetPasswordForm />
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

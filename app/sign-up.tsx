import { View, StyleSheet } from 'react-native'
import SignUpForm from '@/components/auth/SignUpForm'

export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <SignUpForm />
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

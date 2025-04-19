import { View, StyleSheet } from 'react-native'
import SignInForm from '@/components/auth/SignInForm'

export default function Index() {
    return (
        <View style={styles.container}>
            <SignInForm />
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

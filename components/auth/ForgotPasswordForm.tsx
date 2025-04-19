import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const router = useRouter()

    return (
        <View>
            <Text style={styles.title}>Passwort vergessen</Text>

            <Text style={styles.label}>E-Mail</Text>
            <TextInput
                style={styles.input}
                placeholder="example"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/verify-otp')}
            >
                <Text style={styles.buttonText}>Absenden</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Ich habe ein Konto </Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Text style={styles.linkText}>Einloggen</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ForgotPasswordForm

const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: '600', marginBottom: 32 },
    label: { fontSize: 14, marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 14,
        marginBottom: 24,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 24,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    footer: { flexDirection: 'row', justifyContent: 'center' },
    linkText: {
        color: '#000',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
})

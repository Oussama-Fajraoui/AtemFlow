import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useRouter } from 'expo-router'

const SignInForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    return (
        <View>
            <Text style={styles.title}>Anmeldung bei Ihrem Konto</Text>

            <TextInput
                style={styles.input}
                placeholder="E-Mail Adresse"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Passwort eingeben"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => setRemember(!remember)}
                    style={styles.checkboxContainer}
                >
                    <View style={[styles.checkbox, remember && styles.checkboxChecked]} />
                    <Text style={styles.checkboxLabel}>Erinnere mich</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                    <Text style={styles.linkText}>Passwort vergessen?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/welcome')}
            >
                <Text style={styles.buttonText}>Ihr Konto anmelden</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Sie brauchen ein Konto? </Text>
                <TouchableOpacity onPress={() => router.push('/sign-up')}>
                    <Text style={styles.linkText}>Einen erstellen</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignInForm

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 32,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#999',
        marginRight: 8,
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: '#000',
    },
    checkboxLabel: {
        fontSize: 14,
    },
    linkText: {
        color: '#000',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

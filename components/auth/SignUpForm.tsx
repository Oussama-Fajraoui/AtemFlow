import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useRouter } from 'expo-router'

const SignUpForm = () => {
    const router = useRouter()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.replace('/welcome')
        } catch (error: any) {
            alert('Fehler beim Registrieren: ' + error.message)
        }
    }

    return (
        <View>
            <Text style={styles.title}>Ihr Konto erstellen</Text>

            <TextInput
                style={styles.input}
                placeholder="Vorname und Nachname"
                value={fullName}
                onChangeText={setFullName}
            />

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

            <TextInput
                style={styles.input}
                placeholder="Passwort erneut eingeben"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>Konto erstellen</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Sie haben bereits ein Konto? </Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Text style={styles.linkText}>Einloggen</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUpForm

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
    linkText: {
        color: '#000',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
})

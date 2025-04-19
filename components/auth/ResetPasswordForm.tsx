import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useRouter } from 'expo-router'

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

    return (
        <View>
            <Text style={styles.title}>Neues Passwort erstellen</Text>
            <Text style={styles.subtitle}>Geben Sie den Code ein, der an example@gmail.com gesendet wurde</Text>

            <TextInput
                style={styles.input}
                placeholder="Passwort eingeben"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Passwort erneut eingeben"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/password-changed')}
            >
                <Text style={styles.buttonText}>Absenden</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ResetPasswordForm

const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
    subtitle: { fontSize: 14, marginBottom: 24 },
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
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router'

const PasswordChanged = () => {
    const router = useRouter()

    return (
        <View style={styles.wrapper}>
            {/* Replace with your image later */}
            <View style={styles.imagePlaceholder}>
                <Text>✓</Text>
            </View>

            <Text style={styles.title}>Sie haben Ihr Passwort erfolgreich geändert</Text>
            <Text style={styles.subtitle}>Melden Sie sich mit Ihrem neuen Passwort an</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/')}
            >
                <Text style={styles.buttonText}>Einloggen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PasswordChanged

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', flex: 1, justifyContent: 'center' },
    imagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 32 },
    button: {
        backgroundColor: '#000',
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 10,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function WelcomePage() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Willkommen 🎉</Text>
            <Text style={styles.subtitle}>Sie sind jetzt eingeloggt!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.buttonText}>Abmelden</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

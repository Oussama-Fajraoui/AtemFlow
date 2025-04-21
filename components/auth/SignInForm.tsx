import React, {useEffect, useState} from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import facebookLogo from '@/assets/icons/facebook.png'
import googleLogo from '@/assets/icons/google.png'
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, Image,
} from 'react-native'
import { useRouter } from 'expo-router'
const SignInForm = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '5401677338-7stb9u6gumkijapb103jisrapgd4vnre.apps.googleusercontent.com',
        // iosClientId: '5401677338-688rcalm566aibuham0ie6tuics2f2rv.apps.googleusercontent.com',
        // androidClientId: '5401677338-6djnmbm133o41k2mgkvaiml6kshphrug.apps.googleusercontent.com',
        // webClientId: '5401677338-jjne7dp7kk3p6d44v7g52rostues4rjb.apps.googleusercontent.com',
    })

    const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
        clientId: '1026471976116233',
    })

    useEffect(() => {
        if (fbResponse?.type === 'success') {
            const { access_token } = fbResponse.params
            const credential = FacebookAuthProvider.credential(access_token)
            signInWithCredential(auth, credential)
                .then(() => router.replace('/welcome'))
                .catch((error) => alert('Fehler beim Facebook Login: ' + error.message))
        }
    }, [fbResponse])

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential)
                .then(() => router.replace('/welcome'))
                .catch((error) => alert(error.message))
        }
    }, [response])

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.replace('/welcome')
        } catch (error: any) {
            alert('Fehler beim Einloggen: ' + error.message)
        }
    }

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
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Ihr Konto anmelden</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text>Sie brauchen ein Konto? </Text>
                <TouchableOpacity onPress={() => router.push('/sign-up')}>
                    <Text style={styles.linkText}>Einen erstellen</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>Oder</Text>
                <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.socialButton} onPress={() => fbPromptAsync()}>
                <Image source={facebookLogo} style={styles.icon} />
                <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()}>
                <Image source={googleLogo} style={styles.icon} />
                <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignInForm

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        marginRight: 12,
        resizeMode: 'contain',
    },
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
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 12,
        fontSize: 14,
        color: '#888',
    },
    socialButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderColor: '#e0e0e0',
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
})

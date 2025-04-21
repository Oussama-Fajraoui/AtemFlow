import React, { useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import facebookLogo from '@/assets/icons/facebook.png'
import googleLogo from '@/assets/icons/google.png'
import { createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native'
import { useRouter } from 'expo-router'

const SignUpForm = () => {
    const router = useRouter()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '5401677338-7stb9u6gumkijapb103jisrapgd4vnre.apps.googleusercontent.com',
        iosClientId: '5401677338-688rcalm566aibuham0ie6tuics2f2rv.apps.googleusercontent.com',
        androidClientId: '5401677338-6djnmbm133o41k2mgkvaiml6kshphrug.apps.googleusercontent.com',
        webClientId: '5401677338-jjne7dp7kk3p6d44v7g52rostues4rjb.apps.googleusercontent.com',
    })

    const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
        clientId: '1026471976116233',
    })

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.replace('/welcome')
        } catch (error: any) {
            alert('Fehler beim Registrieren: ' + error.message)
        }
    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential)
                .then(() => router.replace('/welcome'))
                .catch((error) => alert('Fehler bei Google Login: ' + error.message))
        }
    }, [response])

    useEffect(() => {
        if (fbResponse?.type === 'success') {
            const { access_token } = fbResponse.params
            const credential = FacebookAuthProvider.credential(access_token)
            signInWithCredential(auth, credential)
                .then(() => router.replace('/welcome'))
                .catch((error) => alert('Fehler bei Facebook Login: ' + error.message))
        }
    }, [fbResponse])


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

export default SignUpForm

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

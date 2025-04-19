import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useRouter } from 'expo-router'

const CELL_COUNT = 6

const VerifyOtpForm = () => {
    const [value, setValue] = useState('')
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue })
    const [timer, setTimer] = useState(20)
    const router = useRouter()

    // Countdown simulation
    React.useEffect(() => {
        if (timer === 0) return
        const interval = setInterval(() => setTimer((t) => t - 1), 1000)
        return () => clearInterval(interval)
    }, [timer])

    return (
        <View>
            <Text style={styles.title}>OTP-Verifizierung</Text>
            <Text style={styles.subtitle}>Geben Sie den Code ein, der an example@gmail.com gesendet wurde</Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={[styles.button, value.length !== 6 && styles.buttonDisabled]}
                onPress={() => router.push('/reset-password')}
                disabled={value.length !== 6}
            >
                <Text style={styles.buttonText}>Verifizieren</Text>
            </TouchableOpacity>

            <Text style={styles.timer}>00:{timer.toString().padStart(2, '0')}</Text>

            <TouchableOpacity onPress={() => setTimer(20)}>
                <Text style={styles.resend}>Code nicht erhalten? <Text style={styles.link}>Code erneut senden</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

export default VerifyOtpForm

const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
    subtitle: { fontSize: 14, marginBottom: 24 },
    codeFieldRoot: { marginBottom: 24, justifyContent: 'center' },
    cell: {
        width: 40,
        height: 50,
        lineHeight: 48,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        borderRadius: 8,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    cellText: {
        fontSize: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    timer: { textAlign: 'center', fontSize: 16, marginBottom: 12 },
    resend: { textAlign: 'center', fontSize: 14 },
    link: {
        fontWeight: '500',
        textDecorationLine: 'underline',
        color: '#000',
    },
})

import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const tabs = [
    { name: 'Sitzungen', icon: <FontAwesome5 name="spa" size={20} />, route: '/sessions' },
    { name: 'Auswahl', icon: <Ionicons name="heart-outline" size={22} />, route: '/selection' },
    { name: 'Start', icon: <MaterialCommunityIcons name="home" size={28} />, route: '/welcome' },
    { name: 'Tageskompass', icon: <MaterialCommunityIcons name="compass-outline" size={22} />, route: '/daily-compass' },
    { name: 'Live', icon: <Ionicons name="flash-outline" size={22} />, route: '/live' },
]

const BottomTabs = () => {
    const router = useRouter()
    const pathname = usePathname()

    const translateValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const index = tabs.findIndex(tab => tab.route === pathname)
        Animated.spring(translateValue, {
            toValue: index,
            useNativeDriver: true,
        }).start()
    }, [pathname])

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                const isActive = pathname === tab.route

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => router.push(tab.route)}
                        style={styles.tab}
                    >
                        <Animated.View style={isActive ? [styles.activeTab, {
                            transform: [{ scale: translateValue.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [1, 1.3, 1],
                                    extrapolate: 'clamp',
                                }) }]
                        }] : styles.inactiveTab}>
                            {React.cloneElement(tab.icon, {
                                color: isActive ? '#C2C78A' : '#885762',
                            })}
                        </Animated.View>
                        <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#C2C78A',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        elevation: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#885762',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        elevation: 5,
        marginBottom: 5,
    },
    inactiveTab: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    label: {
        fontSize: 12,
        color: '#885762',
    },
    activeLabel: {
        fontWeight: 'bold',
        color: '#885762',
    },
})

export default BottomTabs

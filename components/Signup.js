import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

function SignupScreen({ navigation }) {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("error", "Incorrect password");
            return;
        }
        if (!name.trim()) {
            Alert.alert("error", "User name is empty");
            return;
        }
        try {
            const response = await fetch('http://10.0.2.2:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password, email })
            });
            const json = await response.json();
            if (json.status === 'OK') {
                Alert.alert("Successful", "registered！");
                navigation.navigate('Login');
            } else {
                Alert.alert("Registration failure", json.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert("Registration error", "Unable to connect to the server");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="username"
                value={name}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="confirmPassword"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Signup" onPress={handleSignup} />
            <Text onPress={() => navigation.goBack()} style={styles.loginLink}>
            Already have an account? Back to login
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
    },
    loginLink: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center'
    }
});

export default SignupScreen;

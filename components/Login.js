import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails, setUserToken } from '../redux/userActions'; // 确保这个路径正确

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');  // 使用 email 而不是 name
    const [password, setPassword] = useState('');
    const dispatch = useDispatch(); // 使用 useDispatch 钩子
    const userToken = useSelector(state => state.user.token);  // 获取 token
    const userName = useSelector(state => state.user.name);  // 假设在 Redux store 中保存了用户名称
    const userEmail = useSelector(state => state.user.email);  // 假设在 Redux store 中保存了用户邮箱
    const handleSignOut = () => {
        // dispatch(setUserToken(null));  // 清除 token
        dispatch(setUserToken({ name: '', email: '', token: null }));  // 清除用户信息
        // 可能还需要清除其他用户信息
    };

    if (userToken) {
        // 用户已登录，显示用户信息
        return (
            <View style={styles.container}>
                <Text style={styles.title}>User Profile</Text>
                <Text>User Name: {userName}</Text>
                <Text>Email: {userEmail}</Text>
                <Button title="Update" onPress={() => { /* 导航到更新页面等操作 */ }} />
                <Button title="Sign Out" onPress={handleSignOut} />
            </View>
        );
    }


    const handleLogin = async () => {
        console.log("Logging in with:", email, password);
        try {
            const response = await fetch('http://10.0.2.2:3000/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();
            console.log('登录响应:', json);
    
            if (json.status === "OK") {
                console.log('登录成功!', json.token);
                dispatch(setUserToken({ token: json.token, name: json.name, email: json.email }));
                // console.log('setUserDetails:', { token: json.token, name: json.name, email: json.email });
                navigation.navigate('Products');
            } else {
                Alert.alert('Login Failed', json.message || "An unknown error occurred");
            }
        } catch (error) {
            console.error('登录错误:', error);
            Alert.alert('Login Error', 'Unable to connect to the server');
        }
    };
    
    

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}  // 更新此处的处理函数
                style={styles.input}
                keyboardType="email-address"  // 添加此行以提供适当的键盘类型
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="login" onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('Register')}>signup</Text>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default LoginScreen;

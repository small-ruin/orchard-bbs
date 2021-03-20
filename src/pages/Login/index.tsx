import { Button, Form, Input, Item, Text, Toast } from 'native-base';
import React, { useState } from 'react';
import { post } from '../../crawler/api';
import { Urls } from '../../crawler/urls';

export default function Login() {
    const [userName, setUserName] = useState<string | undefined>();
    const [pwd, setPwd] = useState<string | undefined>();
    return (
        <Form>
            <Item>
                <Input placeholder="用户名" onChangeText={setUserName} />
            </Item>
            <Item last>
                <Input placeholder="密码" secureTextEntry onChangeText={setPwd} />
            </Item>
            <Button onPress={() => login()}><Text>登录</Text></Button>
        </Form>
    )

    function login() {
        console.log('login:', userName)

        if (userName && pwd) {
            post(Urls.LOGIN, { user: userName, passwrd: pwd, cookieneverexp: 'on', hash_passwrd: '' })
                .then(res => console.log(res.data))
                .catch(error => Toast.show(error))
        } else {
            Toast.show({ text: '请输入用户名或密码！' });
        }
    }
}
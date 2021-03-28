import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Form, Input, Item, Spinner, Text, Toast } from 'native-base';
import React, { useState } from 'react';
import { post } from '../../crawler/api';
import { Urls } from '../../crawler/urls';
import { RootStackParamList, ScreenName } from '../../types';

type HomeScreenProp = StackNavigationProp<RootStackParamList<undefined>, ScreenName.LOGIN>;
type Props = {
    navigation: HomeScreenProp,
}

export default function Login({ navigation }: Props) {
    const [userName, setUserName] = useState<string | undefined>();
    let [shouldShowSpinner, setShouldShowSpinner] = useState(false)
    const [pwd, setPwd] = useState<string | undefined>();
    return (
        <Form>
            {shouldShowSpinner && <Spinner></Spinner>}
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
            setShouldShowSpinner(true);
            post(Urls.LOGIN, { user: userName, passwrd: pwd, cookieneverexp: 'on', hash_passwrd: '' })
                .then((res: any) => {
                    if (/密码错误/.exec(res.data)) {
                        return Toast.show({text: '密码错误！'});
                    }
                    if (/密码错误|验证提示/.exec(res.data))
                        return Toast.show({text: '登录失败！'});
                    Toast.show({ text: '登录成功，即将跳转' });
                    navigation.popToTop();
                })
                .catch(error => Toast.show(error))
                .finally(() => setShouldShowSpinner(false));
        } else {
            Toast.show({ text: '请输入用户名或密码！' });
        }
    }
}
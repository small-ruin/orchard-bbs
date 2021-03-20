import { Form, Input, Item } from 'native-base';
import React from 'react';

export default function Login() {
    return (
        <Form>
            <Item>
                <Input placeholder="Username" />
            </Item>
            <Item last>
                <Input placeholder="Password" />
            </Item>
        </Form>
    )
}